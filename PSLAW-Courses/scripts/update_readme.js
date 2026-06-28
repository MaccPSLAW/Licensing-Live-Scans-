#!/usr/bin/env node
/**
 * MACCESS INC. — PSLAW Course Suite README Auto-Updater
 * ======================================================
 * Fully automatic. No registry. No manual steps.
 *
 * Called automatically at the end of every module build script.
 * Can also be run standalone at any time.
 *
 * HOW IT WORKS:
 *   1. Scans PSLAW-Courses/final-projects/ live from GitHub
 *   2. Groups files into modules by detecting base filename patterns
 *   3. Derives label, category, hours, authority from a built-in
 *      knowledge map — unknown modules still work, using the filename
 *   4. Assigns module numbers automatically by BSIS ordering rules
 *   5. Regenerates full README with 1a / 1b / 1c structure
 *   6. Pushes README.md back to repo
 *   7. Syncs self to PSLAW-Courses/scripts/update_readme.js
 *
 * USAGE — Standalone:
 *   GITHUB_TOKEN=your_token node update_readme.js
 *
 * USAGE — From build scripts (auto-called after every push):
 *   const { autoUpdateReadme } = require("./update_readme");
 *   await autoUpdateReadme(TOKEN, REPO);
 */

const https = require("https");

const REPO = "MaccPSLAW/Licensing-Live-Scans-";
const DIR  = "PSLAW-Courses/final-projects";

// ─────────────────────────────────────────────────────────────────────────────
// KNOWLEDGE MAP
// Supplies human-readable metadata for known modules.
// The updater works for ANY module not listed here — it just auto-infers
// the label from the filename. Only add entries here to supply richer
// metadata (hours, authority, notes). Never needs to be edited to add a
// new module — that happens automatically.
// ─────────────────────────────────────────────────────────────────────────────
const KNOWLEDGE = {
  // Pre-registration
  "Powers_to_Arrest_BSIS_Certification_MACCESS_INC": {
    label:"Powers to Arrest", hours:"3", authority:"BPC §7583.7", category:"preregistration",
    notes:"First half of the 8-hour pre-registration requirement. Pairs with Module 02.",
  },
  "Appropriate_Use_of_Force_BSIS_Certification_MACCESS_INC": {
    label:"Appropriate Use of Force", hours:"5", authority:"BPC §7583.7", category:"preregistration",
    notes:"Second half of the 8-hour pre-registration requirement. Sections 2, 5, 6, and 9 require in-person delivery per BPC §7583.7.",
  },
  // Mandatory skills
  "Public_Relations_Community_BSIS_Skills_MACCESS_INC": {
    label:"Public Relations & Community", hours:"4", authority:"BPC §7583.6(b)", category:"mandatory",
    notes:"Complete within 30 days of guard card issuance (first two mandatory courses).",
  },
  "Observation_Documentation_BSIS_Skills_MACCESS_INC": {
    label:"Observation & Documentation", hours:"4", authority:"BPC §7583.6(b)", category:"mandatory",
    notes:"Complete within 30 days of guard card issuance (first two mandatory courses).",
  },
  "Communication_Significance_BSIS_Skills_MACCESS_INC": {
    label:"Communication & Its Significance", hours:"4", authority:"BPC §7583.6(b)", category:"mandatory",
    notes:"Complete within 6 months of guard card issuance.",
  },
  "Liability_Legal_Aspects_BSIS_Skills_MACCESS_INC": {
    label:"Liability & Legal Aspects", hours:"4", authority:"BPC §7583.6(b)", category:"mandatory",
    notes:"Complete within 6 months of guard card issuance.",
  },
  // Elective skills
  "Officer_Safety_BSIS_Skills_MACCESS_INC": {
    label:"Officer Safety", hours:"4", authority:"BPC §7583.6(b)", category:"elective",
    notes:"Covers threat assessment (Cooper Color Code), subject contact, blood-borne pathogens (OSHA 29 CFR 1910.1030), and environmental hazards.",
  },
  "Handling_Difficult_People_BSIS_Skills_MACCESS_INC": {
    label:"Handling Difficult People", hours:"4", authority:"BPC §7583.6(b)", category:"elective",
    notes:"Covers communication strategies, conflict management, negotiation, and verbal diffusion.",
  },
  "Baton_Certification_BSIS_MACCESS_INC": {
    label:"Baton Certification", hours:"4", authority:"BPC §§7583.33 | 7585.9 | 7585.13", category:"elective",
    notes:"4-hr elective deliverable by PPO. Full 8-hr baton PERMIT course and permit issuance requires BSIS-certified Baton Training Facility (TFB) and certified instructor.",
  },
  "Workplace_Violence_BSIS_Skills_MACCESS_INC": {
    label:"Workplace Violence", hours:"4", authority:"BPC §7583.6(b)", category:"elective",
    notes:"Covers warning signs, anger management, diversity, personal security, and reporting.",
  },
  "Preserving_the_Incident_Scene_BSIS_Skills_MACCESS_INC": {
    label:"Preserving the Incident Scene", hours:"4", authority:"BPC §7583.6(b)", category:"elective",
    notes:"Identifying evidence, care and handling, securing the area, legal issues with evidence tampering, witness/participant identification.",
  },
  "Arrests_Search_Seizure_BSIS_Skills_MACCESS_INC": {
    label:"Arrests, Search & Seizure", hours:"4", authority:"BPC §7583.6(b)", category:"elective",
    notes:"Advanced arrest topics. PC §§836 and 837, US Constitutional amendments, loss prevention, merchant law, use of force.",
  },
  "Crowd_Control_BSIS_Skills_MACCESS_INC": {
    label:"Crowd Control", hours:"4", authority:"BPC §7583.6(b)", category:"elective",
    notes:"Covers boisterous celebrations, handling disputes, civil disobedience, and labor disputes.",
  },
  "Trespass_BSIS_Skills_MACCESS_INC": {
    label:"Trespass", hours:"4", authority:"BPC §7583.6(b)", category:"elective",
    notes:"Open land, private property, private buildings, public property, and places of public accommodation.",
  },
  "First_Aid_CPR_BSIS_Skills_MACCESS_INC": {
    label:"First Aid / CPR", hours:"4", authority:"BPC §7583.6(b)", category:"elective",
    notes:"American Red Cross or American Heart Association courses. Includes AED training.",
  },
  "Access_Control_BSIS_Skills_MACCESS_INC": {
    label:"Access Control", hours:"2", authority:"BPC §7583.6(b)", category:"elective",
    notes:"Identification procedures, electronic/CCTV use, and non-electronic procedures.",
  },
  "Post_Orders_Assignments_BSIS_Skills_MACCESS_INC": {
    label:"Post Orders & Assignments", hours:"4", authority:"BPC §7583.6(b)", category:"elective",
    notes:"Site-specific training, equipment, emergency response, liability implications, and lost/found articles.",
  },
  "Employer_Policies_Orientation_BSIS_Skills_MACCESS_INC": {
    label:"Employer Policies & Orientation", hours:"4", authority:"BPC §7583.6(b)", category:"elective",
  },
  "Evacuation_Procedures_BSIS_Skills_MACCESS_INC": {
    label:"Evacuation Procedures", hours:"2", authority:"BPC §7583.6(b)", category:"elective",
    notes:"Emergency procedures for life/safety/natural acts, evacuation routes, power outage, and points of contact.",
  },
  "Fire_Safety_BSIS_Skills_MACCESS_INC": {
    label:"Fire Safety", hours:"4", authority:"BPC §7583.6(b)", category:"elective",
  },
  "Chemical_Agents_BSIS_Skills_MACCESS_INC": {
    label:"Chemical Agents", hours:"4", authority:"BPC §7583.6(b)", category:"elective",
    notes:"Tear gas, pepper spray, airborne and waterborne chemical agents. Must be taught at BSIS-licensed facility per BPC §7583.36.",
  },
  "Supervision_BSIS_Skills_MACCESS_INC": {
    label:"Supervision", hours:"4", authority:"BPC §7583.6(b)", category:"elective",
    notes:"Supervisor roles, responsibilities, and legal liability.",
  },
  "Courtroom_Demeanor_BSIS_Skills_MACCESS_INC": {
    label:"Courtroom Demeanor", hours:"4", authority:"BPC §7583.6(b)", category:"elective",
  },
  "Driver_Safety_BSIS_Skills_MACCESS_INC": {
    label:"Driver Safety", hours:"4", authority:"BPC §7583.6(b)", category:"elective",
    notes:"Cars, bicycles, and golf carts.",
  },
  "Radio_Procedures_BSIS_Skills_MACCESS_INC": {
    label:"Radio Procedures", hours:"2", authority:"BPC §7583.6(b)", category:"elective",
  },
  "Parking_Traffic_Control_BSIS_Skills_MACCESS_INC": {
    label:"Parking & Traffic Control", hours:"2", authority:"BPC §7583.6(b)", category:"elective",
  },
  "Laws_Codes_Regulations_BSIS_Skills_MACCESS_INC": {
    label:"Laws, Codes, Regulations & Ordinances", hours:"2", authority:"BPC §7583.6(b)", category:"elective",
    notes:"Specific to post assignment.",
  },
  "WMD_Terrorism_Awareness_BSIS_Skills_MACCESS_INC": {
    label:"WMD & Terrorism Awareness", hours:"4", authority:"BPC §7583.6(b)", category:"elective",
    notes:"Role of security officer, nature of terrorism, weapons of mass destruction, coordinating/sharing critical information.",
  },
  "Introduction_Executive_Protection_BSIS_MACCESS_INC": {
    label:"Introduction to Executive Protection", hours:"4", authority:"BPC §7583.6(b)", category:"elective",
  },
  "School_Security_Guard_Training_BSIS_MACCESS_INC": {
    label:"School Security Guard Training", hours:"8", authority:"BPC §7583.45 | Ed. Code §38001.5", category:"elective",
    notes:"Required for guards in K-12 or community college districts.",
  },
  "Annual_Firearms_Requalification_BSIS_MACCESS_INC": {
    label:"Annual Firearms Requalification", hours:"4", authority:"BPC §7583.28", category:"elective",
    notes:"Required annually for armed guards holding a BSIS Firearms Permit.",
  },
  "Stun_Gun_Air_Taser_BSIS_Skills_MACCESS_INC": {
    label:"Course in the Use of a Stun Gun or Air Taser", hours:"4", authority:"BPC §7583.6(b)", category:"elective",
  },
  // Overview
  "BSIS_Security_Guard_Licensing_Training_2026": {
    label:"BSIS Security Guard Licensing — Complete Training Overview 2026",
    hours:"—", authority:"BPC §7583.6 | §7583.7", category:"overview",
    notes:"Reference deck only. No test or answer key.",
  },
};

const CAT_ORDER = ["preregistration","mandatory","elective","overview"];
const CAT_DISPLAY = {
  preregistration:{
    heading:"## PRE-REGISTRATION TRAINING",
    rule:"> Required before guard card application. Must be completed within 6 months of application by a single BSIS-approved provider per **SB 652 (eff. Jan 1, 2026)**. Exam: 100% passing score required per BPC §7583.7.",
  },
  mandatory:{
    heading:"## MANDATORY SKILLS TRAINING",
    rule:"> **BPC §7583.6(b):** All 4 mandatory courses required within 6 months of registration. First 2 must be completed within 30 days.",
  },
  elective:{
    heading:"## ELECTIVE SKILLS TRAINING",
    rule:"> Count toward the 32-hour total skills requirement (BPC §7583.6(b)).",
  },
  overview:{
    heading:"## OVERVIEW & REFERENCE",
    rule:"> Reference materials — no assessment or answer key.",
  },
};

// BSIS canonical sort order within pre-registration and mandatory categories
const CANONICAL = [
  "Powers_to_Arrest_BSIS_Certification_MACCESS_INC",
  "Appropriate_Use_of_Force_BSIS_Certification_MACCESS_INC",
  "Public_Relations_Community_BSIS_Skills_MACCESS_INC",
  "Observation_Documentation_BSIS_Skills_MACCESS_INC",
  "Communication_Significance_BSIS_Skills_MACCESS_INC",
  "Liability_Legal_Aspects_BSIS_Skills_MACCESS_INC",
];

// ─────────────────────────────────────────────────────────────────────────────
// GITHUB HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function ghReq(method, path, body, token) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const opts = {
      hostname:"api.github.com",
      path:`/repos/${REPO}/contents/${encodeURIComponent(path)}`,
      method,
      headers:{
        Authorization:`token ${token}`,
        "User-Agent":"MACCESS-README-Updater",
        Accept:"application/vnd.github.v3+json",
        ...(payload?{"Content-Type":"application/json","Content-Length":Buffer.byteLength(payload)}:{}),
      },
    };
    const req = https.request(opts, (res) => {
      let d=""; res.on("data",(c)=>(d+=c));
      res.on("end",()=>{try{resolve({status:res.statusCode,body:JSON.parse(d)});}catch{resolve({status:res.statusCode,body:d});}});
    });
    req.on("error",reject);
    if(payload)req.write(payload);
    req.end();
  });
}
async function listFolder(p,t){const r=await ghReq("GET",p,null,t);if(r.status!==200||!Array.isArray(r.body))throw new Error(`Cannot list ${p}: HTTP ${r.status}`);return r.body;}
async function getSHA(p,t){const r=await ghReq("GET",p,null,t);return r.status===200&&r.body.sha?r.body.sha:null;}
async function putFile(p,content,msg,sha,t){const b={message:msg,content:Buffer.from(content,"utf-8").toString("base64"),branch:"main",...(sha?{sha}:{})};const r=await ghReq("PUT",p,b,t);if(r.status!==200&&r.status!==201)throw new Error(`Cannot push ${p}: HTTP ${r.status}`);return r.body;}

// ─────────────────────────────────────────────────────────────────────────────
// FILE → MODULE GROUPING
// Strips known suffixes to find base names, groups all files sharing a base.
// ─────────────────────────────────────────────────────────────────────────────
function groupFiles(fileNames) {
  const SUFFIXES=["-AnswerKey.pptx","-AnswerKey.pdf","-Test.html","-Test.pptx","-Test.pdf",".pptx",".pdf",".html"];
  const mods={};
  for(const fname of fileNames){
    if(fname==="README.md")continue;
    let base=fname;
    for(const s of SUFFIXES){if(fname.endsWith(s)){base=fname.slice(0,-s.length);break;}}
    if(!mods[base])mods[base]={base,files:new Set()};
    mods[base].files.add(fname);
  }
  return Object.values(mods);
}

// ─────────────────────────────────────────────────────────────────────────────
// MODULE ENRICHMENT
// Merges file presence with KNOWLEDGE map. Auto-infers everything for unlisted.
// ─────────────────────────────────────────────────────────────────────────────
function enrich(mod) {
  const {base,files}=mod;
  const k=KNOWLEDGE[base]||{};

  // Infer label from filename when not in KNOWLEDGE
  const inferred=base
    .replace(/_BSIS_(Certification|Skills)_MACCESS_INC$/i,"")
    .replace(/_BSIS_MACCESS_INC$/i,"")
    .replace(/_MACCESS_INC$/i,"")
    .replace(/_/g," ").trim();

  const label    = k.label    || inferred;
  const hours    = k.hours    || "4";
  const authority= k.authority|| "BPC §7583.6(b)";
  const notes    = k.notes    || null;

  // Auto-detect category from filename when not in KNOWLEDGE
  let category = k.category;
  if(!category){
    const u=base.toUpperCase();
    if(u.includes("POWERS_TO_ARREST")||u.includes("APPROPRIATE_USE_OF_FORCE")) category="preregistration";
    else if(u.includes("2026")||u.includes("OVERVIEW")||u.includes("LICENSING_TRAINING")) category="overview";
    else if(u.includes("PUBLIC_RELATIONS")||u.includes("OBSERVATION_DOCUMENTATION")||u.includes("COMMUNICATION_SIGNIFICANCE")||u.includes("LIABILITY_LEGAL")) category="mandatory";
    else category="elective";
  }

  // File presence
  const has=(s)=>files.has(`${base}${s}`);
  const parts={
    course_pptx: has(".pptx"),
    course_pdf:  has(".pdf"),
    test_html:   has("-Test.html"),
    ak_pptx:     has("-AnswerKey.pptx"),
    ak_pdf:      has("-AnswerKey.pdf"),
  };
  const complete=category==="overview"
    ?parts.course_pptx&&parts.course_pdf
    :parts.course_pptx&&parts.course_pdf&&parts.test_html&&parts.ak_pptx&&parts.ak_pdf;

  return {base,label,hours,authority,category,notes,parts,complete};
}

// ─────────────────────────────────────────────────────────────────────────────
// MODULE NUMBERING
// Assigns numbers by category priority then BSIS canonical order within category.
// Stable as long as filenames don't change.
// ─────────────────────────────────────────────────────────────────────────────
function assignNumbers(modules) {
  const sorted=[...modules].sort((a,b)=>{
    const ao=CAT_ORDER.indexOf(a.category), bo=CAT_ORDER.indexOf(b.category);
    if(ao!==bo)return ao-bo;
    const ai=CANONICAL.indexOf(a.base), bi=CANONICAL.indexOf(b.base);
    if(ai!==-1&&bi!==-1)return ai-bi;
    if(ai!==-1)return -1;
    if(bi!==-1)return 1;
    return a.label.localeCompare(b.label);
  });
  let n=1;
  return sorted.map(m=>m.category==="overview"?{...m,num:0}:{...m,num:n++});
}

// ─────────────────────────────────────────────────────────────────────────────
// README BUILDER
// ─────────────────────────────────────────────────────────────────────────────
function buildHoursSummary(modules) {
  const cats={};
  for(const c of CAT_ORDER)cats[c]={mods:[],hrs:0};
  for(const m of modules){
    if(!m.complete||m.category==="overview")continue;
    const h=parseFloat(m.hours);
    cats[m.category].mods.push(m);
    if(!isNaN(h))cats[m.category].hrs+=h;
  }
  const rows=CAT_ORDER.filter(c=>c!=="overview"&&cats[c].mods.length>0).map(c=>{
    const lbl=CAT_DISPLAY[c].heading.replace("## ","");
    return `| ${lbl} | ${cats[c].mods.length} | ${cats[c].hrs} hrs |`;
  });
  const totalHrs=Object.values(cats).reduce((a,c)=>a+c.hrs,0);
  const totalMods=modules.filter(m=>m.complete&&m.category!=="overview").length;
  rows.push(`| **TOTAL** | **${totalMods} modules** | **${totalHrs} hrs** |`);
  return rows.join("\n");
}

function buildReadme(modules) {
  const today=new Date().toISOString().slice(0,10);
  const byCat={};
  for(const c of CAT_ORDER)byCat[c]=[];
  for(const m of modules)byCat[m.category].push(m);

  let body="";
  for(const cat of CAT_ORDER){
    const mods=byCat[cat];
    if(mods.length===0)continue;
    const {heading,rule}=CAT_DISPLAY[cat];
    body+=`\n${heading}\n\n${rule}\n\n`;

    for(const mod of mods){
      const pad=mod.num===0?"00":String(mod.num).padStart(2,"0");
      const status=mod.complete?"✅ Complete":"⚠️ Incomplete";
      body+=`---\n\n`;
      body+=`### Module ${pad} — ${mod.label}\n\n`;
      body+=`| | |\n|---|---|\n`;
      body+=`| **Status** | ${status} |\n`;
      body+=`| **Hours** | ${mod.hours} |\n`;
      body+=`| **Authority** | \`${mod.authority}\` |\n`;
      if(mod.notes)body+=`| **Note** | ${mod.notes} |\n`;
      body+=`\n`;

      if(cat==="overview"){
        body+=`| File | |\n|------|:---:|\n`;
        body+=`| \`${mod.base}.pptx\` — Reference Deck (PowerPoint) | ${mod.parts.course_pptx?"✅":"❌"} |\n`;
        body+=`| \`${mod.base}.pdf\` — Reference Deck (PDF) | ${mod.parts.course_pdf?"✅":"❌"} |\n\n`;
      } else {
        // 1a
        body+=`#### ${pad}a — Course Module\n\n`;
        body+=`| File | |\n|------|:---:|\n`;
        body+=`| \`${mod.base}.pptx\` | ${mod.parts.course_pptx?"✅":"❌"} |\n`;
        body+=`| \`${mod.base}.pdf\` | ${mod.parts.course_pdf?"✅":"❌"} |\n\n`;
        // 1b
        body+=`#### ${pad}b — Assessment\n\n`;
        body+=`| File | |\n|------|:---:|\n`;
        body+=`| \`${mod.base}-Test.html\` | ${mod.parts.test_html?"✅":"❌"} |\n\n`;
        body+=`> Interactive browser assessment — one question at a time, instant feedback with legal citation, live score by module, 100% to pass, printable Certificate of Completion, BSIS Live Scan stub.\n\n`;
        // 1c
        body+=`#### ${pad}c — Answer Key *(Instructor Copy — Confidential)*\n\n`;
        body+=`| File | |\n|------|:---:|\n`;
        body+=`| \`${mod.base}-AnswerKey.pptx\` | ${mod.parts.ak_pptx?"✅":"❌"} |\n`;
        body+=`| \`${mod.base}-AnswerKey.pdf\` | ${mod.parts.ak_pdf?"✅":"❌"} |\n\n`;
        body+=`> Internal instructor use only. Quick-reference answer grid, full Q&A, scoring guide. Do not distribute to students.\n\n`;
      }
    }
  }

  return `# PSLAW-Courses / final-projects
## MACCESS INC. — BSIS Security Guard Licensing Course Suite

**PPO License:** \`#122729\` &nbsp;|&nbsp; **Provider:** Private Security LA Worldwide (PSLAW)
**Authority:** BPC §7583.6 | §7583.7 | §7585.9 | Title 16 CCR §643(b)
**Source:** [bsis.ca.gov/industries/g_train.shtml](https://www.bsis.ca.gov/industries/g_train.shtml)
**Last updated:** ${today} *(auto-generated — do not edit manually)*

---

## MODULE STRUCTURE — Every Completed Module

| Sub-file | Contents |
|----------|----------|
| **[Module]a** | \`[Base].pptx\` + \`[Base].pdf\` — Branded course PowerPoint and PDF |
| **[Module]b** | \`[Base]-Test.html\` — Interactive browser assessment |
| **[Module]c** | \`[Base]-AnswerKey.pptx\` + \`[Base]-AnswerKey.pdf\` — Instructor answer key (confidential) |

The README updates itself automatically every time a new module is built and pushed. No manual steps required.

---

## TRAINING HOURS SUMMARY

| Category | Modules Complete | Hours |
|----------|:----------------:|:-----:|
${buildHoursSummary(modules)}

---
${body}
---

## CERTIFICATE COMPLIANCE — Title 16 CCR §643(b)

Every MACCESS INC. Certificate of Completion must include:

| Required Field | Value |
|----------------|-------|
| Training provider name | MACCESS INC. |
| BSIS PPO license number | \`#122729\` |
| Course name | (per module) |
| Dates of training | (date completed) |
| Hours of instruction | (per module) |
| Unique sequential serial number | (issued per student) |

---

## LIVE SCAN INTEGRATION

All \`-Test.html\` files include a Live Scan stub — inactive until DOJ equipment and ORI arrive.

**Activation:** \`PSLAW-Courses/live-scan/README.md\`

---

*Auto-generated by \`PSLAW-Courses/scripts/update_readme.js\` | MACCESS INC. | PPO #122729 | gopslaw.com*
`;
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT — called from build scripts automatically after every push
// ─────────────────────────────────────────────────────────────────────────────
async function autoUpdateReadme(token) {
  console.log("\n  📋 Auto-updating README...");
  const items    = await listFolder(DIR, token);
  const raw      = groupFiles(items.map(f=>f.name));
  const enriched = raw.map(enrich);
  const modules  = assignNumbers(enriched);

  const complete   = modules.filter(m=>m.complete);
  const incomplete = modules.filter(m=>!m.complete);
  console.log(`     Detected ${modules.length} modules (${complete.length} complete${incomplete.length?", "+incomplete.length+" incomplete":""})`);

  if(incomplete.length>0){
    incomplete.forEach(m=>{
      const miss=[];
      if(!m.parts.course_pptx)miss.push("pptx");
      if(!m.parts.course_pdf) miss.push("pdf");
      if(m.category!=="overview"){
        if(!m.parts.test_html)miss.push("Test.html");
        if(!m.parts.ak_pptx) miss.push("AnswerKey.pptx");
        if(!m.parts.ak_pdf)  miss.push("AnswerKey.pdf");
      }
      console.log(`     ⚠️  Incomplete: ${m.label} — missing [${miss.join(", ")}]`);
    });
  }

  const readme   = buildReadme(modules);
  const rmSHA    = await getSHA(`${DIR}/README.md`, token);
  await putFile(
    `${DIR}/README.md`, readme,
    `docs: auto-update README — ${complete.filter(m=>m.category!=="overview").length} modules, ${new Date().toISOString().slice(0,10)}`,
    rmSHA, token
  );
  console.log(`     ✅ README.md updated — ${modules.filter(m=>m.category!=="overview").length} modules indexed`);

  // Self-sync script to repo
  const fs      = require("fs");
  const self    = fs.readFileSync(__filename,"utf-8");
  const scriptSHA = await getSHA("PSLAW-Courses/scripts/update_readme.js", token);
  await putFile("PSLAW-Courses/scripts/update_readme.js", self, "chore: sync README updater script", scriptSHA, token);
  console.log("     ✅ update_readme.js synced to repo");

  return modules;
}

// ─────────────────────────────────────────────────────────────────────────────
// STANDALONE MODE
// ─────────────────────────────────────────────────────────────────────────────
if(require.main===module){
  const token=process.env.GITHUB_TOKEN;
  if(!token){console.error("Error: GITHUB_TOKEN not set.");process.exit(1);}
  console.log(`\nMACCESS INC. — README Auto-Updater | Repo: ${REPO}`);
  autoUpdateReadme(token)
    .then(mods=>{
      const done=mods.filter(m=>m.complete&&m.category!=="overview").length;
      console.log(`\nDone. ${done} modules fully indexed.\n`);
    })
    .catch(err=>{console.error("\nFATAL:",err.message||err);process.exit(1);});
}

module.exports={autoUpdateReadme};
