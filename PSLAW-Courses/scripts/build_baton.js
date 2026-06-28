/**
 * MACCESS INC. — BSIS Baton Certification Course Builder
 * Fact-checked against: bsis.ca.gov/forms_pubs/bat_adminman.pdf (BSIS Baton Training Manual, Jan 2020)
 * and bsis.ca.gov/forms_pubs/baton_fact_sheet.pdf
 *
 * Legal authority: BPC §§7583.33, 7585.3–7585.19, PC §22001 (formerly PC §12002)
 * Course: 4-hr elective (skills training) + 8-hr baton permit training (separate BPC §7585.13)
 * Exam: 24 official BSIS questions — passing = 20/24 AND correct vital areas identification
 *
 * IMPORTANT COMPLIANCE NOTE (included in course and certificate):
 * A PPO may deliver the 4-hr elective classroom module.
 * The full 8-hr baton PERMIT course and issuance of a BSIS Baton Permit requires a
 * BSIS-certified Baton Training Facility (TFB license) and BSIS-certified Baton Instructor.
 * MACCESS INC. must obtain TFB certification before issuing baton permits.
 */

const pptxgen    = require("pptxgenjs");
const { execSync } = require("child_process");
const fs         = require("fs");
const https      = require("https");

const TOKEN = process.env.GITHUB_TOKEN;
const REPO  = "MaccPSLAW/Licensing-Live-Scans-";
const DIR   = "PSLAW-Courses/final-projects";

// Brand
const NAVY  = "1B2B5E", GOLD  = "C9A84C", WHITE = "FFFFFF";
const LIGHT = "F4F6FB", GRAY  = "4A5568", RED   = "8B1A1A";
const GREEN = "1A5C3A", DARK  = "12193A", STEEL = "2E3A4A";
const AMBER = "7B4500";

const ms = () => ({ type:"outer", color:"000000", blur:6, offset:2, angle:45, opacity:0.1 });

// ── GitHub push ──────────────────────────────────────────
function pushGH(localPath, repoPath, message) {
  return new Promise(resolve => {
    const data = fs.readFileSync(localPath);
    const enc  = data.toString("base64");
    const getO = { hostname:"api.github.com", path:`/repos/${REPO}/contents/${encodeURIComponent(repoPath)}`, method:"GET", headers:{"Authorization":`token ${TOKEN}`,"User-Agent":"MACCESS"} };
    https.request(getO, r => {
      let b=""; r.on("data",d=>b+=d);
      r.on("end",() => {
        let sha=""; try{sha=JSON.parse(b).sha||"";}catch{}
        const pay=JSON.stringify({message,content:enc,branch:"main",...(sha&&{sha})});
        const putO={hostname:"api.github.com",path:`/repos/${REPO}/contents/${encodeURIComponent(repoPath)}`,method:"PUT",headers:{"Authorization":`token ${TOKEN}`,"Content-Type":"application/json","User-Agent":"MACCESS","Content-Length":Buffer.byteLength(pay)}};
        const pr=https.request(putO,r2=>{let b2="";r2.on("data",d=>b2+=d);r2.on("end",()=>{try{resolve("content" in JSON.parse(b2));}catch{resolve(false);}});});
        pr.write(pay);pr.end();
      });
    }).end();
  });
}

// ══════════════════════════════════════════════════════════
// PPTX HELPERS
// ══════════════════════════════════════════════════════════
function hdr(sl, pres, title, mod, color) {
  sl.addShape(pres.shapes.RECTANGLE, {x:0,y:0,w:10,h:0.75,fill:{color:color||NAVY}});
  sl.addShape(pres.shapes.RECTANGLE, {x:0,y:0.75,w:10,h:0.06,fill:{color:GOLD}});
  sl.addText(title, {x:0.35,y:0,w:7.8,h:0.75,fontSize:18,bold:true,color:WHITE,fontFace:"Calibri",valign:"middle",margin:0});
  sl.addText(mod, {x:8.0,y:0,w:1.85,h:0.75,fontSize:8,color:GOLD,fontFace:"Calibri",valign:"middle",align:"right",margin:0});
}
function ftr(sl, pres, pg, tot) {
  sl.addShape(pres.shapes.RECTANGLE, {x:0,y:5.45,w:10,h:0.3,fill:{color:DARK}});
  sl.addText("MACCESS INC.  |  PPO #122729  |  BSIS Baton Certification — BPC §7583.33 | §7585.9", {x:0.3,y:5.45,w:8.5,h:0.3,fontSize:7.5,color:GOLD,fontFace:"Calibri",valign:"middle",margin:0});
  sl.addText(pg+"/"+tot, {x:8.9,y:5.45,w:0.9,h:0.3,fontSize:7.5,color:WHITE,fontFace:"Calibri",valign:"middle",align:"right",margin:0});
}
function card(sl, pres, x, y, w, h, heading, bullets, hc) {
  sl.addShape(pres.shapes.ROUNDED_RECTANGLE,{x,y,w,h,fill:{color:WHITE},rectRadius:0.09,shadow:ms()});
  sl.addShape(pres.shapes.ROUNDED_RECTANGLE,{x,y,w,h:0.4,fill:{color:hc||NAVY},rectRadius:0.09});
  sl.addText(heading,{x:x+0.12,y,w:w-0.24,h:0.4,fontSize:11,bold:true,color:WHITE,fontFace:"Calibri",valign:"middle",margin:0});
  const bt=bullets.map(b=>({text:b+"\n",options:{fontSize:10.5,color:"1A1A2E",fontFace:"Calibri",bullet:{type:"bullet",indent:14}}}));
  sl.addText(bt,{x:x+0.1,y:y+0.44,w:w-0.2,h:h-0.52,valign:"top",margin:4});
}
function divSl(pres, num, title, sub, color) {
  let sl=pres.addSlide(); sl.background={color:color||DARK};
  sl.addShape(pres.shapes.RECTANGLE,{x:0,y:4.15,w:10,h:1.475,fill:{color:GOLD}});
  sl.addShape(pres.shapes.RECTANGLE,{x:0,y:0,w:0.5,h:4.15,fill:{color:NAVY}});
  sl.addText("MODULE "+num,{x:0.65,y:0.45,w:9,h:0.45,fontSize:13,bold:true,color:GOLD,fontFace:"Calibri",charSpacing:5,margin:0});
  sl.addText(title,{x:0.65,y:0.95,w:9,h:1.9,fontSize:32,bold:true,color:WHITE,fontFace:"Calibri",margin:0});
  sl.addText(sub,{x:0.65,y:2.9,w:9,h:0.85,fontSize:13,color:"CADCFC",fontFace:"Calibri",margin:0});
  sl.addText("MACCESS INC.  |  PPO #122729",{x:0.65,y:4.23,w:9,h:0.45,fontSize:12,bold:true,color:NAVY,fontFace:"Calibri",valign:"middle",margin:0});
  return sl;
}

// ══════════════════════════════════════════════════════════
// BUILD COURSE PPTX
// ══════════════════════════════════════════════════════════
async function buildCoursePPTX(outPath) {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title  = "Baton Certification — BSIS Course | MACCESS INC.";
  pres.author = "MACCESS INC.";
  const TOT   = 22; // total slides estimate for footer
  let pg = 0;

  // ── TITLE SLIDE ──────────────────────────────────────
  let sl = pres.addSlide(); sl.background={color:DARK};
  sl.addShape(pres.shapes.RECTANGLE,{x:0,y:4.55,w:10,h:1.075,fill:{color:GOLD}});
  sl.addShape(pres.shapes.RECTANGLE,{x:0,y:0,w:10,h:0.08,fill:{color:GOLD}});
  sl.addShape(pres.shapes.RECTANGLE,{x:0,y:0.08,w:0.5,h:4.47,fill:{color:NAVY}});
  sl.addText("MACCESS INC.",{x:0.65,y:0.28,w:9,h:0.42,fontSize:12,bold:true,color:GOLD,fontFace:"Calibri",charSpacing:5,margin:0});
  sl.addText("Private Security LA Worldwide  |  PPO #122729  |  BSIS-Authorized Training Provider",{x:0.65,y:0.7,w:9,h:0.26,fontSize:9,color:"CADCFC",fontFace:"Calibri",margin:0});
  sl.addText("BATON CERTIFICATION\nCOURSE",{x:0.65,y:1.08,w:9,h:2.0,fontSize:36,bold:true,color:WHITE,fontFace:"Calibri",margin:0});
  sl.addText("BSIS Certified Training — Baton Permit Qualification",{x:0.65,y:3.12,w:9,h:0.42,fontSize:15,italic:true,color:GOLD,fontFace:"Calibri",margin:0});
  sl.addText("Authority: BPC §§7583.33 | 7585.9 | 7585.13  |  4-Hr Elective + 8-Hr Permit Course",{x:0.65,y:3.65,w:9,h:0.35,fontSize:10,color:"9AAFCC",fontFace:"Calibri",margin:0});
  sl.addText("MACCESS INC.",{x:0.65,y:4.65,w:4,h:0.46,fontSize:14,bold:true,color:NAVY,fontFace:"Calibri",valign:"middle",margin:0});
  sl.addText(new Date().toLocaleDateString("en-US",{year:"numeric",month:"long"}),{x:5,y:4.65,w:4.8,h:0.46,fontSize:11,color:NAVY,fontFace:"Calibri",valign:"middle",align:"right",margin:0});

  // ── COMPLIANCE NOTICE SLIDE ───────────────────────────
  sl = pres.addSlide(); sl.background={color:LIGHT};
  hdr(sl,pres,"BSIS Compliance Notice — Who May Issue Baton Permits","BPC §§7585.3–7585.14",RED); pg++;
  sl.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:0.3,y:0.92,w:9.4,h:1.18,fill:{color:"FFF3CD"},rectRadius:0.09});
  sl.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:0.3,y:0.92,w:0.5,h:1.18,fill:{color:AMBER},rectRadius:0.09});
  sl.addText("⚠",{x:0.3,y:0.92,w:0.5,h:1.18,fontSize:22,color:WHITE,fontFace:"Calibri",align:"center",valign:"middle",margin:0});
  sl.addText("IMPORTANT — READ BEFORE ADMINISTERING THIS COURSE",{x:0.9,y:0.98,w:8.7,h:0.35,fontSize:11,bold:true,color:AMBER,fontFace:"Calibri",margin:0});
  sl.addText("This 4-hour module is a BSIS elective course (BPC §7583.6(b)) that may be delivered by MACCESS INC. as a licensed PPO. However, the full 8-hour Baton Permit course and the issuance of a BSIS Baton Permit requires a BSIS-certified Baton Training Facility (TFB license) and a BSIS-certified Baton Instructor. MACCESS INC. must obtain TFB certification before issuing BSIS baton permits.",{x:0.9,y:1.34,w:8.7,h:0.68,fontSize:10.5,color:"5A3E00",fontFace:"Calibri",margin:0});
  card(sl,pres,0.3,2.2,4.55,3.05,"This 4-Hr Module Covers (PPO-Deliverable)",[
    "Moral & legal aspects of baton use",
    "Use of force continuum — baton in context",
    "Baton types: side-handle, straight, expandable, ASP",
    "Target areas and prohibited strike zones",
    "Officer safety and baton handling fundamentals",
    "Carrying requirements, permit rules, recordkeeping",
    "Counts toward 32-hr BSIS elective credit",
  ],NAVY);
  card(sl,pres,5.05,2.2,4.5,3.05,"For Full BSIS Baton Permit Requires (TFB Only)",[
    "8 hours total instruction (BPC §7585.13)",
    "BSIS-certified Baton Training Facility (TFB license)",
    "BSIS-certified Baton Instructor on site",
    "Official 24-question BSIS written exam (pass ≥ 20/24)",
    "Correct identification of all vital body areas",
    "BSIS baton permit issued by certified instructor",
    "Roster submitted to BSIS within 5 working days",
  ],RED);
  ftr(sl,pres,pg,TOT);

  // ── MODULE 1: Moral & Legal Aspects ──────────────────
  divSl(pres,"1","Moral & Legal Aspects\nof Baton Use","Guard and employer responsibilities | Criminal, civil, and vicarious liability | BPC §7583.33 | PC §22001",NAVY);
  sl = pres.addSlide(); sl.background={color:LIGHT}; pg++;
  hdr(sl,pres,"Legal Basis — Who May Carry a Baton in California","BPC §7583.33 | PC §22001 (formerly PC §12002)");
  card(sl,pres,0.3,0.9,4.5,4.35,"California Law — Baton Carry Requirements",[
    "PC §22001 (formerly §12002): strictly limits who may lawfully carry a baton to specially trained individuals",
    "BPC §7583.33: any security guard who carries a baton on duty MUST have: (1) a valid BSIS security guard registration, AND (2) a valid BSIS baton permit",
    "Carrying without permit: criminal violation of PC §22001 — a felony charge",
    "PPO liability: a PPO that allows a guard to carry a baton without a permit may be fined by BSIS",
    "In-house/proprietary guards: also required to have both a guard card and baton permit (BPC §7585.14)",
    "Baton permit expires every 2 years — renewal requires 8-hr refresher (recent BSIS update)",
  ],NAVY);
  card(sl,pres,5.05,0.9,4.5,4.35,"Moral Responsibility of Armed Security",[
    "The baton is a defensive tool — to protect yourself and others, NOT to punish or intimidate",
    "Discretion: a guard must exercise restraint and judgment — the ability to use force does not mean it is appropriate",
    "Public trust: guards who carry batons are held to a higher standard — misuse damages the entire profession",
    "The baton is NOT an offensive weapon — using it offensively is a crime",
    "Consider: is this the minimum force needed? Will force be proportionate to the threat?",
    "Always attempt verbal de-escalation before drawing or using your baton",
  ],AMBER);
  ftr(sl,pres,pg,TOT);

  sl = pres.addSlide(); sl.background={color:LIGHT}; pg++;
  hdr(sl,pres,"Criminal, Civil & Vicarious Liability","BPC §§7583.15 | 7585.19 | PC §§242 | 245");
  card(sl,pres,0.3,0.9,2.9,4.35,"Criminal Liability",[
    "PC §242 — Battery: unlawful use of force on a person",
    "PC §245 — Assault with a deadly weapon (baton can qualify)",
    "PC §22001 — Carrying baton without permit: felony",
    "Criminal prosecution is independent of civil suits",
    "Excessive force: guard card suspension or revocation (BPC §7583.15)",
    "BPC §7583.15: Director of DCA may immediately suspend a guard deemed a public safety hazard",
  ],RED);
  card(sl,pres,3.38,0.9,2.9,4.35,"Civil Liability",[
    "Excessive force tort: compensatory + punitive damages",
    "Wrongful death: if baton use results in death",
    "Intentional infliction of emotional distress",
    "ADA violations: improper use against person with disability",
    "Civil liability does not require criminal conviction",
    "Documentation: failure to document use of force increases civil exposure",
  ],STEEL);
  card(sl,pres,6.46,0.9,3.09,4.35,"Vicarious Liability (PPO)",[
    "Respondeat superior: MACCESS INC. may be liable for guard's actions within scope of employment",
    "Negligent hiring: failure to verify baton permit before assignment",
    "Negligent training: failure to ensure proper baton training",
    "BPC §7585.19: facility/instructor fines — $100–$1,000 per violation",
    "PPO must report certain use-of-force incidents to BSIS per BPC §§7583.2 and 7574.37",
  ],NAVY);
  ftr(sl,pres,pg,TOT);

  // ── MODULE 2: Use of Force ────────────────────────────
  divSl(pres,"2","Use of Force","The force continuum | When the baton is justified | Avoidance | De-escalation | Deadly force | BPC §7583.7",RED);
  sl = pres.addSlide(); sl.background={color:LIGHT}; pg++;
  hdr(sl,pres,"Use of Force Continuum — Baton in Context","BPC §7583.7 | Objectively Reasonable Standard",RED);
  // Visual force continuum
  const levels=[
    ["1","PRESENCE & COMMUNICATION","Uniform, calm demeanor, verbal commands — always first",GREEN,""],
    ["2","VERBAL DIRECTION","Clear, direct instructions: 'Stop. Step back. Leave the area.'","1A7A4A",""],
    ["3","SOFT CONTROL","Guiding, escort techniques — compliant subject only","1B4A8A",""],
    ["4","HARD CONTROL","Joint locks, control holds — actively resistant subject",STEEL,""],
    ["5","BATON — LESS LETHAL","Proportionate baton use — active aggression, imminent threat",AMBER,"⚠"],
    ["6","DEADLY FORCE — LAST RESORT","Life or serious bodily injury imminent — only if no other option",RED,"⛔"],
  ];
  levels.forEach((lv,i)=>{
    const y=0.88+i*0.78;
    sl.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:0.3,y,w:9.4,h:0.7,fill:{color:WHITE},rectRadius:0.07,shadow:ms()});
    sl.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:0.3,y,w:0.55,h:0.7,fill:{color:lv[3]},rectRadius:0.07});
    sl.addText(lv[0],{x:0.3,y,w:0.55,h:0.7,fontSize:15,bold:true,color:WHITE,fontFace:"Calibri",align:"center",valign:"middle",margin:0});
    sl.addText(lv[4]+" "+lv[1],{x:1.0,y:y+0.08,w:3.0,h:0.32,fontSize:10.5,bold:true,color:"1A1A2E",fontFace:"Calibri",margin:0});
    sl.addText(lv[2],{x:1.0,y:y+0.4,w:8.55,h:0.25,fontSize:9.5,color:GRAY,fontFace:"Calibri",margin:0});
  });
  sl.addText("Baton use is justified only at Level 5 or above — ALWAYS attempt lower levels first. De-escalate immediately when threat subsides.",{x:0.3,y:5.35,w:9.4,h:0.22,fontSize:9,bold:true,color:RED,fontFace:"Calibri",align:"center",margin:0});
  ftr(sl,pres,pg,TOT);

  sl = pres.addSlide(); sl.background={color:LIGHT}; pg++;
  hdr(sl,pres,"De-escalation, Avoidance & Justification for Baton Use","BPC §7583.7(b)(6) | BSIS Baton Manual Ch. 2",RED);
  card(sl,pres,0.3,0.9,4.5,4.3,"When Baton Use IS Justified",[
    "Active physical aggression toward you or another person",
    "Imminent threat of serious bodily injury — objectively reasonable belief",
    "Subject is armed with an object and threatening imminent attack",
    "Multiple subjects creating an elevated threat that verbal/soft control cannot address",
    "All justifications evaluated by the 'objectively reasonable officer' standard",
    "AFTER the threat stops: baton use must stop immediately",
  ],RED);
  card(sl,pres,5.05,0.9,4.5,4.3,"When Baton Use Is NOT Justified",[
    "Passive resistance alone — refusal to move, sitting, etc.",
    "Verbal abuse or profanity — words alone do not justify force",
    "Property protection alone — baton cannot be used solely to protect property",
    "Trespassing without physical threat — call police; use verbal commands",
    "After the threat has ended — baton use post-submission is excessive",
    "Punishing or intimidating a subject after control is established",
  ],NAVY);
  ftr(sl,pres,pg,TOT);

  sl = pres.addSlide(); sl.background={color:LIGHT}; pg++;
  hdr(sl,pres,"Avoidance of Deadly Force & Escalation/De-escalation","BSIS Baton Manual Ch. 2 | BPC §7583.7",RED);
  card(sl,pres,0.3,0.9,9.4,4.3,"Avoidance, Escalation, and De-escalation of Force",[
    "AVOIDANCE: The best use-of-force outcome is avoiding force entirely — situational awareness, positioning, and early verbal intervention prevent most escalations",
    "DE-ESCALATION: When a situation begins to escalate, your first tool is ALWAYS verbal de-escalation — speak calmly, use time and distance, call for backup, avoid cornering the subject",
    "ESCALATION (when necessary): If de-escalation fails and a physical threat develops, escalate proportionately — do not jump to baton use without exhausting lower levels of the force continuum",
    "DEADLY FORCE AND THE BATON: Strikes to the head, throat, spine, kidneys, and groin CAN cause death. Any strike to a vital area constitutes potential deadly force — only justified when you or another person faces imminent death or serious bodily injury",
    "POST-FORCE: Once the subject is controlled, DE-ESCALATE immediately — no further force. Call for medical assistance if the subject is injured. Document everything.",
    "DOCUMENTATION: Every use of the baton — even if contact is not made — must be documented in a written incident report within 1 hour. Notify your supervisor immediately.",
  ],STEEL);
  ftr(sl,pres,pg,TOT);

  // ── MODULE 3: Baton Familiarization ──────────────────
  divSl(pres,"3","Baton Familiarization\nand Its Uses","Types of batons | Physical characteristics | Authorized types for California security guards | BSIS Baton Manual Ch. 3",STEEL);
  sl = pres.addSlide(); sl.background={color:LIGHT}; pg++;
  hdr(sl,pres,"Baton Types — California Authorized for Security Guards","BSIS Baton Manual Ch. 3 | PC §22001");
  // Baton type cards
  const types=[
    ["Straight Baton","Classic single-grip straight baton. Solid or hollow construction. Standard lengths: 22\"–26\". Grip is at one end. Requires straight-baton ring carrier.",NAVY,"📏"],
    ["Straight Expandable (ASP)","Telescoping straight baton — collapses for carry, expands on deployment. Common models: ASP, Monadnock Auto-Lock. Requires holster or specific ring.",STEEL,"🔩"],
    ["Side-Handle Baton","'T'-shaped baton with perpendicular handle. Allows blocking techniques not possible with straight baton. Requires side-handle ring. Common: PR-24®.",GREEN,"🔤"],
    ["Side-Handle Expandable","Telescoping version of the side-handle baton. Combines side-handle blocking capability with compact expandable design.",AMBER,"🔀"],
  ];
  types.forEach((t,i)=>{
    const col=i%2, row=Math.floor(i/2);
    const x=0.3+col*4.85, y=0.9+row*2.25;
    sl.addShape(pres.shapes.ROUNDED_RECTANGLE,{x,y,w:4.55,h:2.1,fill:{color:WHITE},rectRadius:0.09,shadow:ms()});
    sl.addShape(pres.shapes.ROUNDED_RECTANGLE,{x,y,w:4.55,h:0.45,fill:{color:t[2]},rectRadius:0.09});
    sl.addText(t[3]+"  "+t[0],{x:x+0.1,y,w:4.35,h:0.45,fontSize:12,bold:true,color:WHITE,fontFace:"Calibri",align:"left",valign:"middle",margin:6});
    sl.addText(t[1],{x:x+0.12,y:y+0.5,w:4.3,h:1.55,fontSize:10.5,color:"1A1A2E",fontFace:"Calibri",margin:0});
  });
  sl.addText("Guards may only carry the baton type for which they were trained and certified. Switching types requires additional training.",{x:0.3,y:5.35,w:9.4,h:0.22,fontSize:9,bold:true,color:NAVY,fontFace:"Calibri",align:"center",margin:0});
  ftr(sl,pres,pg,TOT);

  sl = pres.addSlide(); sl.background={color:LIGHT}; pg++;
  hdr(sl,pres,"Carrying Requirements & Permit Rules","BPC §7583.33 | BPC §7585.14 | BSIS Baton Fact Sheet");
  card(sl,pres,0.3,0.9,4.5,4.3,"Carrying Requirements",[
    "Guard must have VALID guard card on their person at all times while on duty",
    "Guard must have VALID BSIS baton permit in possession while carrying on duty",
    "Baton must be carried in an approved ring, holster, or carrier — never tucked in waistband",
    "Off-duty: guards may NOT carry a baton — the permit is for on-duty carry only",
    "A firearms permit does NOT authorize baton carry — separate permit required",
    "Baton permit expires every 2 years — renewal = 8-hr refresher course before expiration",
  ],NAVY);
  card(sl,pres,5.05,0.9,4.5,4.3,"Permit Rules & Recordkeeping",[
    "Baton permits issued only by BSIS-certified Baton Training Facilities (TFB license)",
    "Permit issued by the instructor, hand-delivered to student on completion",
    "Roster must be submitted to BSIS within 5 working days of course completion (BPC §7585.14)",
    "Lost permit: apply to BSIS directly with roster copy and $25 fee (BPC §7585.16)",
    "Expired permit: cannot be renewed — must apply for new initial permit",
    "MACCESS INC. must verify each guard's permit before any baton-authorized assignment",
  ],RED);
  ftr(sl,pres,pg,TOT);

  // ── MODULE 4: First Aid for Baton Injuries ────────────
  divSl(pres,"4","First Aid for\nBaton Injuries","Managing baton-related injuries in the field | When to call EMS | Documentation | BSIS Baton Manual Ch. 4","1A3A1A");
  sl = pres.addSlide(); sl.background={color:LIGHT}; pg++;
  hdr(sl,pres,"First Aid for Baton Injuries","BSIS Baton Manual Ch. 4 | OSHA | Cal/OSHA","1A3A1A");
  card(sl,pres,0.3,0.9,4.5,4.3,"Immediate Response — Baton Injury",[
    "Call 911 immediately for ANY baton contact resulting in visible injury or loss of consciousness",
    "Do NOT move an injured subject unless they are in immediate additional danger",
    "Check for responsiveness: verbal, then gentle shoulder tap",
    "Open airway: head-tilt/chin-lift — check for breathing",
    "Control bleeding: apply direct pressure with clean cloth or gloves",
    "Strikes to head, spine, throat: assume spinal injury — do not move, call 911 immediately",
    "Blood-borne pathogen precaution: ALWAYS glove up before contact with blood",
  ],GREEN);
  card(sl,pres,5.05,0.9,4.5,4.3,"Documentation & Post-Incident Steps",[
    "Notify supervisor immediately after any baton contact — even if no visible injury",
    "Complete written incident report within 1 hour — describe: threat, force used, target area, outcome",
    "Note: did you call EMS? When? What was the subject's condition when EMS arrived?",
    "Preserve the scene: do not alter or clean up until law enforcement clears the area",
    "Cooperate with law enforcement — provide factual account, reference your written notes",
    "BSIS reporting: PPO must report per BPC §7583.2 if injury occurred",
    "Retain all records: BSIS may audit per BPC §7585.15",
  ],RED);
  ftr(sl,pres,pg,TOT);

  // ── MODULE 5: Fundamentals of Baton Handling ─────────
  divSl(pres,"5","Fundamentals of\nBaton Handling","Stances | Grips | Target zones | Prohibited areas | Defensive techniques | BSIS Baton Manual Ch. 5",AMBER);
  sl = pres.addSlide(); sl.background={color:LIGHT}; pg++;
  hdr(sl,pres,"Stances, Grips & Drawing the Baton","BSIS Baton Manual Ch. 5 | In-Person Practical Training",AMBER);
  card(sl,pres,0.3,0.9,4.5,4.3,"Basic Stances",[
    "Interview stance: feet shoulder-width, weight balanced, non-confrontational — baton in ring, hands visible",
    "Defensive stance: dominant foot back, weight shifted, baton accessible but not drawn",
    "Active deployment: baton drawn, non-dominant side forward, baton in dominant hand",
    "Positioning: stay outside of arm's reach — maintain reactionary gap of 6+ feet when possible",
    "Never turn your back on an active threat",
    "Back against wall or corner = poor tactical positioning — always maintain exit options",
  ],AMBER);
  card(sl,pres,5.05,0.9,4.5,4.3,"Grips & Drawing",[
    "Straight baton grip: dominant hand grasps handle firmly — thumb and fingers wrap fully",
    "Side-handle grip: primary grip on main shaft, thumb on side handle for blocking",
    "Expandable (ASP): firm flick of the wrist to deploy — check deployment before every shift",
    "Draw: smooth, controlled — do not fumble or drop during draw",
    "Retention: baton must stay in your control — do not allow subject to grab and disarm",
    "Re-holstering: only after threat has fully resolved — keep eyes on subject",
  ],STEEL);
  ftr(sl,pres,pg,TOT);

  sl = pres.addSlide(); sl.background={color:LIGHT}; pg++;
  hdr(sl,pres,"Target Zones & Vital Areas to AVOID","BSIS Baton Manual Ch. 5 — CRITICAL COMPLIANCE REQUIREMENT",RED);
  sl.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:0.3,y:0.88,w:9.4,h:0.65,fill:{color:"FFECEC"},rectRadius:0.08});
  sl.addText("⛔  VITAL AREAS — PROHIBITED STRIKE ZONES (unless facing imminent death or serious bodily injury)",{x:0.4,y:0.88,w:9.2,h:0.65,fontSize:13,bold:true,color:RED,fontFace:"Calibri",valign:"middle",margin:4});
  const vital=[["A","HEAD","Temple, skull, jaw — can cause brain injury, skull fracture, death"],["B","THROAT / NECK","Carotid, trachea — can cause asphyxiation, cardiac arrest, death"],["C","SPINE","Cervical, thoracic, lumbar — can cause permanent paralysis or death"],["D","KIDNEYS","Posterior lower back — organ rupture, internal bleeding, shock"],["E","GROIN","Can cause severe injury, nerve damage, shock"],["F","STERNUM / SOLAR PLEXUS","Can cause cardiac arrhythmia, respiratory arrest"],["G","KNEES (joints)","Can cause permanent structural damage, disability"]];
  vital.forEach((v,i)=>{
    const y=1.65+i*0.52;
    sl.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:0.3,y,w:9.4,h:0.46,fill:{color:i%2===0?"FFF0F0":WHITE},rectRadius:0.06});
    sl.addShape(pres.shapes.OVAL,{x:0.38,y:y+0.07,w:0.34,h:0.34,fill:{color:RED}});
    sl.addText(v[0],{x:0.38,y:y+0.07,w:0.34,h:0.34,fontSize:11,bold:true,color:WHITE,fontFace:"Calibri",align:"center",valign:"middle",margin:0});
    sl.addText(v[1],{x:0.82,y,w:2.0,h:0.46,fontSize:10,bold:true,color:RED,fontFace:"Calibri",valign:"middle",margin:0});
    sl.addText(v[2],{x:2.9,y,w:6.7,h:0.46,fontSize:10,color:"1A1A2E",fontFace:"Calibri",valign:"middle",margin:0});
  });
  ftr(sl,pres,pg,TOT);

  sl = pres.addSlide(); sl.background={color:LIGHT}; pg++;
  hdr(sl,pres,"Authorized Target Areas & Defensive Techniques","BSIS Baton Manual Ch. 5 — In-Person Practical Required",STEEL);
  card(sl,pres,0.3,0.9,4.5,4.3,"Authorized Target Strike Areas",[
    "COMMON PERONEAL NERVE: outer thigh/knee area — effective motor-nerve strike, low injury risk",
    "RADIAL NERVE: outer forearm — to disarm subject or break grip",
    "INNER THIGH: effective for motor disruption — avoid groin area",
    "UPPER ARMS: bicep/tricep area — motor disruption, lower injury risk",
    "CALF / LOWER LEG: good target for subject who is fleeing or kicking",
    "All strikes must remain proportionate to the threat — even authorized targets require justification",
  ],GREEN);
  card(sl,pres,5.05,0.9,4.5,4.3,"Defensive & Control Techniques",[
    "Blocking: use baton to deflect incoming strike — side-handle baton excels at forearm blocks",
    "Control holds: baton as leverage tool to control a resisting subject after lawful arrest",
    "Jabbing: front-thrust strike — useful for maintaining distance from advancing subject",
    "Pushing: baton used to create space — not a strike, less force",
    "Striking: only when blocking and control techniques have failed or threat escalated",
    "ALL techniques must be demonstrated in in-person practical session (BPC §7585.9)",
  ],STEEL);
  ftr(sl,pres,pg,TOT);

  // ── MODULE 6: Carrying, Documentation, Recordkeeping ─
  divSl(pres,"6","On-Duty Conduct, Documentation\n& Recordkeeping","Baton on-post conduct | Incident reporting | BSIS records | Annual refresher | BPC §§7583.2 | 7585.15",NAVY);
  sl = pres.addSlide(); sl.background={color:LIGHT}; pg++;
  hdr(sl,pres,"On-Duty Conduct & Professional Standards","BPC §7583.15 | BSIS Ethics | MACCESS INC. Policy");
  card(sl,pres,0.3,0.9,4.5,4.3,"On-Duty Standards for Baton-Carrying Guards",[
    "Never display or brandish the baton to intimidate — only draw when justified by threat level",
    "Do not tap baton against palm, surfaces, or equipment as a warning gesture — this is intimidation",
    "Maintain the baton in serviceable condition — inspect before every shift (expandable: test deployment)",
    "Never loan your baton to another guard — the permit is individual",
    "Observe client site baton policies in post orders — some sites prohibit visible baton carry",
    "Maintain professional demeanor at all times — the baton does not change your authority or your limits",
  ],NAVY);
  card(sl,pres,5.05,0.9,4.5,4.3,"Incident Reporting — Baton Use",[
    "Any deployment of the baton — even if no contact is made — must be reported in writing",
    "Report content: date/time/location, nature of threat, level of force used, area of contact if any, outcome",
    "Notify supervisor immediately — MACCESS INC. policy and BPC §7583.2 require prompt reporting",
    "PPO must report to BSIS if injury occurred or if suspect was arrested (BPC §§7583.2, 7574.37)",
    "Retain all incident reports at the post level — available to BSIS auditors on request",
    "Falsifying a baton incident report: $1,000 fine per violation (BPC §7585.19)",
  ],RED);
  ftr(sl,pres,pg,TOT);

  // ── EXAM PREP SLIDE ───────────────────────────────────
  sl = pres.addSlide(); sl.background={color:LIGHT}; pg++;
  hdr(sl,pres,"Written Examination — Overview & Requirements","BSIS Baton Training Manual — Administrative Procedures",NAVY);
  card(sl,pres,0.3,0.9,4.5,4.3,"BSIS Written Examination — Structure",[
    "24 questions total — each question worth 1 point",
    "Passing score: minimum 20/24 (83%) PLUS correct identification of all vital body areas",
    "Both conditions must be met — passing the written alone is insufficient",
    "Not an open-book examination",
    "Must be administered by a BSIS-certified Baton Training Instructor",
    "Re-test may be granted at instructor's discretion (failing score must be recorded)",
    "Answer sheets retained by facility for 2 years (BPC §7585.15)",
  ],NAVY);
  card(sl,pres,5.05,0.9,4.5,4.3,"Vital Areas — What You Must Identify",[
    "A — Head (temple, skull, jaw)",
    "B — Throat / Neck (carotid, trachea)",
    "C — Spine (cervical, thoracic, lumbar)",
    "D — Kidneys (posterior lower back)",
    "E — Groin",
    "F — Sternum / Solar Plexus",
    "G — Knees (joint area)",
    "Failure to correctly name ALL seven vital areas = automatic exam failure, regardless of written score",
  ],RED);
  ftr(sl,pres,pg,TOT);

  // ── CLOSING SLIDE ─────────────────────────────────────
  sl = pres.addSlide(); sl.background={color:DARK};
  sl.addShape(pres.shapes.RECTANGLE,{x:0,y:0,w:10,h:0.08,fill:{color:GOLD}});
  sl.addShape(pres.shapes.RECTANGLE,{x:0,y:5.545,w:10,h:0.08,fill:{color:GOLD}});
  sl.addText("✓",{x:3.5,y:0.6,w:3,h:1.4,fontSize:68,color:GOLD,fontFace:"Calibri",align:"center",valign:"middle",margin:0});
  sl.addText("Course Complete",{x:0,y:1.95,w:10,h:0.6,fontSize:28,bold:true,color:WHITE,fontFace:"Calibri",align:"center",margin:0});
  sl.addText("Baton Certification — BSIS Elective Module",{x:0.5,y:2.58,w:9,h:0.45,fontSize:15,italic:true,color:GOLD,fontFace:"Calibri",align:"center",margin:0});
  sl.addText("Proceed to the written assessment. Pass = 20/24 + correct vital areas identification.\nFull 8-hr Baton Permit course and permit issuance requires BSIS-certified TFB and instructor.",{x:1.5,y:3.15,w:7,h:0.9,fontSize:11,color:"CADCFC",fontFace:"Calibri",align:"center",margin:0});
  sl.addText("MACCESS INC.  |  PPO #122729  |  BPC §§7583.33 | 7585.9 | 7585.13",{x:0,y:4.55,w:10,h:0.55,fontSize:9,color:"8899BB",fontFace:"Calibri",align:"center",margin:0});

  await pres.writeFile({ fileName: outPath });
}


// ══════════════════════════════════════════════════════════
// QUESTION BANK
// Official BSIS exam: 24 questions from bat_adminman.pdf
// Plus 16 supplemental curriculum questions for fuller coverage
// Exam scoring: 20/24 pass + correct vital areas
// ══════════════════════════════════════════════════════════
const BANK = {
  title:       "Baton Certification — BSIS Written Examination",
  subtitle:    "BSIS Baton Permit Training (4-Hr Elective) | MACCESS INC.",
  hours:       "4",
  passingScore: 84,   // 20/24 = 83.3% → 84% threshold enforced in logic
  passingRaw:   20,   // must get at least 20/24
  bpcRef:      "BPC §§7583.33 | 7585.9 | 7585.13",
  // BSIS official vital areas (must identify all 7 on permit exam)
  vitalAreas:  ["Head (temple, skull, jaw)", "Throat / Neck (carotid, trachea)", "Spine (cervical, thoracic, lumbar)", "Kidneys (posterior lower back)", "Groin", "Sternum / Solar Plexus", "Knees (joint area)"],
  questions: [
    // ── OFFICIAL BSIS EXAM QUESTIONS (bat_adminman.pdf, pp. 13-16) ──
    { module:"Legal Responsibility", ref:"BPC §7583.33 | PC §22001",
      q:"If you use your baton, you should remember that you might be required to justify your actions in:",
      options:["Criminal court only","Civil court only","To your employer only","All of the above — criminal court, civil court, and to your employer"],
      answer:3 },
    { module:"Vital Areas", ref:"BSIS Baton Manual Ch. 5",
      q:"A baton strike to the head, throat, or spine:",
      options:["Is usually fatal","Could be fatal","Always causes paralysis","Is always fatal"],
      answer:1 },
    { module:"Permit Requirements", ref:"BPC §7583.33 | PC §22001",
      q:"A guard who carries a baton without a baton permit may be:",
      options:["Fined $100 by the Bureau for the first offense","Fined $200 by the Bureau for the second and all future offenses","Charged with a criminal violation of Penal Code §22001 (formerly §12020(a)), which is a felony","All of the above"],
      answer:3 },
    { module:"Continuing Education", ref:"BSIS Baton Policy",
      q:"The Bureau encourages continuous baton training so that you may carry the baton with confidence to effectively and legally defend yourself.",
      options:["True","False"],
      answer:0 },
    { module:"Use of Force — Target Areas", ref:"BSIS Baton Manual Ch. 5",
      q:"During a non-life-threatening situation, the baton should not be used to strike above the:",
      options:["Waist","Shoulders","Groin","Knees"],
      answer:1 },
    { module:"PPO Liability", ref:"BPC §7585.19",
      q:"If a private patrol operator allows you to carry a baton before you complete baton training and receive a baton permit, the company may be fined by the Bureau in the amount of:",
      options:["$100","$300","$2,500","Nothing — the PPO's license is automatically revoked"],
      answer:2 },
    { module:"De-escalation", ref:"BSIS Baton Manual Ch. 2",
      q:"When you are first confronted with a situation that could escalate, you should first consider:",
      options:["Arresting the suspect without getting hurt","Looking for a telephone to call for help","Remaining calm and attempting to control the situation by talking to the person","Finding a witness"],
      answer:2 },
    { module:"Tactical Response", ref:"BSIS Baton Manual Ch. 2",
      q:"A man somewhat smaller than you is having an argument with your client and it looks like the situation is escalating. You should first:",
      options:["Tell the man he has 10 seconds to leave","Make your presence known and be prepared to act defensively","Call the police and tell them you have a suspect under surveillance","Draw your baton out of the ring and tap it in the palm of your hand"],
      answer:1 },
    { module:"Use of Force Decision", ref:"BSIS Baton Manual Ch. 2",
      q:"Which factor would you NOT consider when deciding whether to use your baton?",
      options:["Size of the subject","Whether the subject may be under the influence of drugs","Whether you will have to make a report","Whether the subject is armed"],
      answer:2 },
    { module:"Off-Duty Carry", ref:"BPC §7583.33",
      q:"When you are not on duty, you may wear your baton as long as you have your baton permit in your possession.",
      options:["True","False"],
      answer:1 },
    { module:"Permit Types", ref:"BPC §7583.33",
      q:"You may carry a baton on duty as long as you have a firearms permit in your possession.",
      options:["True","False"],
      answer:1 },
    { module:"Legal Definitions", ref:"PC §242",
      q:"Battery is any willful and unlawful use of force or violence upon another person.",
      options:["True","False"],
      answer:0 },
    { module:"Baton Purpose", ref:"BSIS Baton Manual Preface",
      q:"The baton is an offensive weapon.",
      options:["True","False"],
      answer:1 },
    { module:"Vital Areas", ref:"BSIS Baton Manual Ch. 5",
      q:"The head, spine, and kidneys are vital areas to be avoided when using a baton, unless there is a deadly attack on you or another person.",
      options:["True","False"],
      answer:0 },
    { module:"Registration Requirement", ref:"BPC §7583.33 | BPC §7585.14",
      q:"You may carry a baton on duty without a security guard registration in your possession.",
      options:["True","False"],
      answer:1 },
    { module:"Justification for Force", ref:"BSIS Baton Manual Ch. 2",
      q:"You are escorting an unruly rock concert patron to the exit. He screams and insults you, using profanity. You would be justified in jabbing him with your baton.",
      options:["True","False"],
      answer:1 },
    { module:"Use of Force — Proportionality", ref:"BPC §7583.7 | Objectively Reasonable Standard",
      q:"You should meet physical force with only that amount of force reasonable to defend yourself and control the situation.",
      options:["True","False"],
      answer:0 },
    { module:"Suspension Procedures", ref:"BPC §7583.15",
      q:"If you use too much force with your baton and the Director of the Department of Consumer Affairs determines that you are a hazard to public safety, your permit may be suspended and your employer will be notified of the suspension.",
      options:["True","False"],
      answer:0 },
    { module:"Legal Definitions", ref:"Tort Law | Civil Liability",
      q:"Criminal liability means you have to pay damages after being sued.",
      options:["True","False"],
      answer:1 },
    { module:"Employer Reporting", ref:"BPC §7583.2",
      q:"If you are arrested after using your baton in a physical altercation, your employer must report the incident to the Bureau within seven days.",
      options:["True","False"],
      answer:0 },
    { module:"In-House Guard Requirements", ref:"BPC §7585.14",
      q:"In-house or proprietary guards are required to have both a guard card and baton permit if they carry a baton on duty.",
      options:["True","False"],
      answer:0 },
    { module:"Deadly Force Limits", ref:"BSIS Baton Manual Ch. 2 | PC §22001",
      q:"If someone trespasses onto property that you are protecting, you would be justified in using deadly force.",
      options:["True","False"],
      answer:1 },
    { module:"Training Practices", ref:"BSIS Baton Manual Ch. 5",
      q:"Practicing baton techniques in front of a mirror is a good idea.",
      options:["True","False"],
      answer:0 },
    { module:"Baton Carry Side", ref:"BSIS Baton Manual Ch. 5",
      q:"A baton may be carried on your weak or your strong side.",
      options:["True","False"],
      answer:0 },
    // ── SUPPLEMENTAL CURRICULUM QUESTIONS ──
    { module:"Permit Validity", ref:"BSIS Baton Fact Sheet 2024",
      q:"How long is a BSIS Baton Permit valid before renewal is required?",
      options:["1 year","2 years — permit now expires and requires renewal","Baton permits do not expire","5 years"],
      answer:1 },
    { module:"Permit Issuance", ref:"BPC §7585.14",
      q:"A BSIS Baton Permit may be issued by:",
      options:["Any BSIS-licensed Private Patrol Operator","The BSIS Bureau directly to the guard via mail","A BSIS-certified Baton Training Facility with a certified instructor on site","Any BSIS-approved security guard instructor"],
      answer:2 },
    { module:"Roster Requirements", ref:"BPC §7585.14(c)",
      q:"After completing a baton training class, a baton training facility must submit a roster of students to BSIS within:",
      options:["24 hours","3 working days","5 working days","30 days"],
      answer:2 },
    { module:"Exam Requirements", ref:"BSIS Baton Manual Admin. Procedures",
      q:"To pass the BSIS baton written examination, a student must:",
      options:["Score 100% on all 24 questions","Score at least 20 out of 24 AND correctly identify all vital areas of the body","Score at least 20 out of 24 — vital areas are optional","Score at least 18 out of 24"],
      answer:1 },
    { module:"Training Facility", ref:"BPC §7585.3 | BPC §7585.11",
      q:"To legally teach and certify the full BSIS baton permit course, a business entity must hold:",
      options:["Only a standard PPO license","A BSIS Baton Training Facility (TFB) certificate and employ a certified baton instructor","Any BSIS security training approval","A firearms training facility certificate (TFF) which includes baton authorization"],
      answer:1 },
    { module:"Force Justification", ref:"BSIS Baton Manual Ch. 2",
      q:"Baton use is justified against a subject who is:",
      options:["Verbally abusive but not physically threatening","Passively refusing to leave private property","Actively physically aggressive and posing an imminent threat of serious bodily injury","Trespassing and refusing to answer questions"],
      answer:2 },
    { module:"Vital Areas", ref:"BSIS Baton Manual Ch. 5",
      q:"Strikes to vital areas of the body may ONLY be justified when:",
      options:["The subject is larger than the guard","The guard is in any physical confrontation","The subject is actively resisting arrest","The guard or another person faces imminent death or serious bodily injury"],
      answer:3 },
    { module:"Record Retention", ref:"BPC §7585.15",
      q:"Under BPC §7585.15, baton training answer sheets must be retained by the training facility for at least:",
      options:["6 months","1 year","2 years","5 years"],
      answer:2 },
    { module:"MACCESS INC. PPO", ref:"PPO License #122729",
      q:"MACCESS INC.'s California Private Patrol Operator license number, which must appear on all BSIS Certificates of Completion, is:",
      options:["#112233","#100001","#133445","#122729"],
      answer:3 },
  ]
};

// ══════════════════════════════════════════════════════════
// BUILD INTERACTIVE HTML TEST
// Official BSIS exam logic: pass = 20+/24 AND vital areas
// ══════════════════════════════════════════════════════════
function buildHTMLTest(bank) {
  const qs    = bank.questions;
  const today = new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});
  const qsJ   = JSON.stringify(qs).replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/\$/g,"\\$");
  const vaJ   = JSON.stringify(bank.vitalAreas).replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/\$/g,"\\$");

  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Baton Certification Assessment | MACCESS INC.</title>
<style>
:root{--n:#1B2B5E;--g:#C9A84C;--r:#8B1A1A;--ok:#1A5C3A;--l:#F4F6FB;--gr:#4A5568;--am:#7B4500;}
*{box-sizing:border-box;margin:0;padding:0;}body{font-family:'Segoe UI',Arial,sans-serif;background:var(--l);color:#1A1A2E;}
.hd{background:var(--n);color:#fff;padding:14px 28px;display:flex;justify-content:space-between;align-items:center;}
.hl{font-size:20px;font-weight:700;}.hm{font-size:11px;color:#CADCFC;text-align:right;line-height:1.55;}
.gb{height:5px;background:var(--g);}
.sc{display:none;max-width:860px;margin:0 auto;padding:26px 18px;}.sc.on{display:block;}
.cd{background:#fff;border-radius:10px;border:1px solid #dde4f0;padding:30px 38px;margin-top:20px;}
.cd h1{font-size:22px;color:var(--n);margin-bottom:6px;}.sub{color:var(--gr);font-size:13px;margin-bottom:18px;}
.ig{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:18px;}
.ic{background:var(--l);border-radius:8px;padding:11px 14px;}.ib{font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:var(--gr);margin-bottom:2px;}.iv{font-size:16px;font-weight:700;color:var(--n);}
.wn{background:#FFF8E1;border-radius:8px;padding:12px 15px;font-size:13px;color:#7B4F00;margin-bottom:14px;line-height:1.65;}
.wn2{background:#FFECEC;border-radius:8px;padding:12px 15px;font-size:13px;color:var(--r);margin-bottom:14px;line-height:1.65;}
.fl{display:block;font-size:12px;font-weight:600;color:var(--gr);margin:11px 0 4px;}
input[type=text],input[type=email]{width:100%;padding:9px 12px;border:1.5px solid #D0D8E8;border-radius:8px;font-size:14px;outline:none;transition:border .2s;}input:focus{border-color:var(--n);}
.btn{display:block;width:100%;padding:11px;border-radius:8px;font-size:15px;font-weight:600;cursor:pointer;border:none;margin-top:14px;text-align:center;}
.bp{background:var(--n);color:#fff;}.bg{background:var(--g);color:var(--n);}.bo{background:#fff;color:var(--n);border:1.5px solid var(--n);}.bs{display:inline-block;width:auto;padding:9px 20px;}
.pw{background:#fff;border-radius:10px;padding:12px 16px;margin-bottom:14px;border:1px solid #dde4f0;display:flex;align-items:center;gap:12px;}
.pb{flex:1;height:8px;background:#E8EDF6;border-radius:4px;overflow:hidden;}.pf{height:100%;background:var(--n);border-radius:4px;transition:width .3s;}.pt{font-size:12px;color:var(--gr);white-space:nowrap;}
.mb{background:var(--l);border:1px solid #D0D8E8;border-radius:6px;padding:4px 10px;font-size:10px;font-weight:600;color:var(--n);margin-bottom:8px;display:inline-block;}.rf{font-size:10px;color:var(--gr);margin-left:6px;font-style:italic;}
.qc{background:#fff;border-radius:10px;border:1px solid #dde4f0;padding:22px 26px;margin-bottom:14px;}
.qn{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--g);margin-bottom:7px;}.qt{font-size:15px;font-weight:600;line-height:1.5;margin-bottom:16px;}
.opts{display:flex;flex-direction:column;gap:8px;}
.op{display:flex;align-items:center;gap:10px;padding:9px 13px;border:1.5px solid #D0D8E8;border-radius:8px;cursor:pointer;font-size:13px;transition:all .15s;}
.op:hover{border-color:var(--n);background:#F0F4FB;}.op.sl{border-color:var(--n);background:#EBF0FB;}.op.ok{border-color:var(--ok)!important;background:#EAF3DE!important;color:var(--ok);}.op.no{border-color:var(--r)!important;background:#FCEBEB!important;color:var(--r);}
.ol{width:26px;height:26px;border-radius:50%;background:var(--l);font-weight:700;font-size:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--n);border:1.5px solid #D0D8E8;}
.op.sl .ol{background:var(--n);color:#fff;border-color:var(--n);}.op.ok .ol{background:var(--ok);color:#fff;border-color:var(--ok);}.op.no .ol{background:var(--r);color:#fff;border-color:var(--r);}
.fb{margin-top:11px;padding:9px 13px;border-radius:8px;font-size:13px;line-height:1.6;}.fb-ok{background:#EAF3DE;color:var(--ok);}.fb-no{background:#FCEBEB;color:var(--r);}
.nr{display:flex;justify-content:space-between;align-items:center;margin-top:8px;}
.bn{padding:9px 20px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;}.bn-o{background:#fff;color:var(--n);border:1.5px solid var(--n);}.bn-p{background:var(--n);color:#fff;border:none;}
/* Vital areas section */
.va-section{background:#fff;border-radius:10px;border:2px solid var(--r);padding:24px 28px;margin-top:20px;}
.va-title{font-size:17px;font-weight:700;color:var(--r);margin-bottom:6px;}
.va-sub{font-size:13px;color:var(--gr);margin-bottom:18px;line-height:1.6;}
.va-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.va-item{display:flex;flex-direction:column;gap:4px;}
.va-label{font-size:11px;font-weight:700;color:var(--n);text-transform:uppercase;letter-spacing:.06em;}
.va-input{padding:8px 11px;border:1.5px solid #D0D8E8;border-radius:7px;font-size:13px;outline:none;}
.va-input:focus{border-color:var(--r);}
.va-input.va-ok{border-color:var(--ok);background:#EAF3DE;}
.va-input.va-no{border-color:var(--r);background:#FCEBEB;}
/* Results */
.rc{background:#fff;border-radius:10px;border:1px solid #dde4f0;padding:34px 38px;margin-top:20px;text-align:center;}
.sr{width:130px;height:130px;border-radius:50%;margin:0 auto 18px;display:flex;align-items:center;justify-content:center;flex-direction:column;font-size:28px;font-weight:700;}
.sr-ok{background:#EAF3DE;color:var(--ok);border:4px solid var(--ok);}.sr-no{background:#FCEBEB;color:var(--r);border:4px solid var(--r);}
.sl2{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-top:2px;}
.r2{font-size:21px;font-weight:700;margin-bottom:7px;}.rp{color:var(--ok);}.rn{color:var(--r);}
.rs{color:var(--gr);font-size:13px;margin-bottom:20px;line-height:1.6;}
.score-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:20px;text-align:left;}
.sc2{background:var(--l);border-radius:8px;padding:14px 16px;}.sc2 .sl3{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--gr);margin-bottom:4px;}.sc2 .sv{font-size:22px;font-weight:700;}
.sv-ok{color:var(--ok);}.sv-no{color:var(--r);}
.bd{background:var(--l);border-radius:8px;padding:15px 18px;margin-bottom:20px;text-align:left;}
.bd h3{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--n);margin-bottom:9px;}
.br{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #dde4f0;font-size:13px;}.br:last-child{border-bottom:none;}
.sp{color:var(--ok);font-weight:600;}.sf{color:var(--r);font-weight:600;}
.brow{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:14px;}
.bn2{background:#EBF0FB;border-radius:8px;padding:11px 14px;font-size:12px;color:var(--n);line-height:1.6;text-align:left;}
@media print{.np{display:none!important;}.sc{padding:0;max-width:100%;}}
.cw{background:#fff;border:3px double var(--n);border-radius:4px;padding:40px 48px;margin:20px 0;text-align:center;position:relative;}.cw::before{content:'';position:absolute;inset:8px;border:1px solid var(--g);border-radius:2px;pointer-events:none;}
.ch{font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--n);margin-bottom:5px;}
.cc{font-size:21px;font-weight:700;color:var(--n);margin-bottom:2px;}.cp{font-size:11px;color:var(--gr);margin-bottom:20px;}
.cn{font-size:27px;font-weight:700;color:var(--n);border-bottom:2px solid var(--n);display:inline-block;min-width:260px;padding-bottom:3px;margin-bottom:14px;}
.cb{font-size:13px;color:var(--gr);line-height:1.8;margin-bottom:4px;}.cco{font-size:15px;font-weight:700;color:var(--n);margin-bottom:11px;}
.csb{display:inline-block;background:#EAF3DE;color:var(--ok);border-radius:6px;padding:4px 13px;font-size:12px;font-weight:600;margin-bottom:12px;}
.cno{display:block;background:#FFF8E1;color:var(--am);border-radius:6px;padding:6px 13px;font-size:11px;margin-bottom:18px;line-height:1.5;}
.cgb{height:5px;background:var(--g);border-radius:3px;margin:14px 0;}
.css{display:flex;justify-content:space-around;margin-top:24px;gap:16px;}.csi{flex:1;text-align:center;}.csi .ln{border-top:1.5px solid var(--n);margin-bottom:4px;}.csi .sl3{font-size:11px;color:var(--gr);}
.ft{background:var(--n);color:#CADCFC;text-align:center;padding:12px;font-size:11px;margin-top:30px;}
</style></head><body>
<div class="hd"><div class="hl">MACCESS INC.</div><div class="hm">PPO License #122729 | BSIS Baton Certification<br/>Secure Written Assessment</div></div>
<div class="gb"></div>

<!-- COVER -->
<div class="sc on" id="sc-cover"><div class="cd">
  <h1>Baton Certification — BSIS Written Examination</h1>
  <div class="sub">BSIS Certified Baton Training | MACCESS INC. | BPC §§7583.33 | 7585.9</div>
  <div class="ig">
    <div class="ic"><div class="ib">Questions</div><div class="iv">${qs.length}</div></div>
    <div class="ic"><div class="ib">Pass (Written)</div><div class="iv">20 / 24</div></div>
    <div class="ic"><div class="ib">Authority</div><div class="iv" style="font-size:11px;">BPC §7585.13</div></div>
  </div>
  <div class="wn">&#9888; <strong>BSIS Passing Standard:</strong> You must score <strong>at least 20 out of the 24 official exam questions</strong> AND correctly identify all <strong>7 vital areas</strong> of the body. Both conditions must be met. This assessment includes all 24 official BSIS questions plus supplemental curriculum questions.</div>
  <div class="wn2">&#128274; <strong>Compliance Notice:</strong> The full 8-hour Baton Permit course and issuance of a BSIS Baton Permit requires a BSIS-certified Baton Training Facility (TFB license) and BSIS-certified Baton Instructor. MACCESS INC. must obtain TFB certification before issuing baton permits.</div>
  <label class="fl">Full Legal Name * (as it appears on your guard registration)</label>
  <input type="text" id="iname" placeholder="First Middle Last"/>
  <label class="fl">Guard Registration Number *</label>
  <input type="text" id="ireg" placeholder="CA-XXXXXXXX"/>
  <label class="fl">Email Address *</label>
  <input type="email" id="iemail" placeholder="your@email.com"/>
  <label class="fl">Date</label>
  <input type="text" id="idate" value="${today}" readonly/>
  <button class="btn bp" onclick="start()">Begin Written Examination &#8594;</button>
</div></div>

<!-- TEST -->
<div class="sc" id="sc-test">
  <div class="pw"><div class="pb"><div class="pf" id="pf" style="width:0%"></div></div><div class="pt" id="pt">Q 1 of ${qs.length}</div></div>
  <div id="qa"></div>
  <div class="nr">
    <button class="bn bn-o" id="bprev" onclick="prev()" style="display:none">&#8592; Previous</button>
    <button class="bn bn-p" id="bnext" onclick="nxt()">Next &#8594;</button>
  </div>
</div>

<!-- VITAL AREAS SECTION -->
<div class="sc" id="sc-vital">
  <div class="va-section">
    <div class="va-title">&#9888; Vital Areas Identification — Required for Passing</div>
    <div class="va-sub">Per BSIS Baton Training Manual, you must correctly identify all <strong>7 vital areas</strong> of the body that must be avoided when using a baton (unless facing imminent death or serious bodily injury). Enter the full name of each vital area in the boxes below. Partial credit is not awarded — all 7 must be correctly identified.</div>
    <div class="va-grid" id="va-grid"></div>
    <button class="btn bp" onclick="submitVital()" style="margin-top:18px">Submit Vital Areas &#8594;</button>
  </div>
</div>

<!-- RESULTS -->
<div class="sc" id="sc-res"><div class="rc">
  <div class="sr" id="sring"><span id="spct"></span><span class="sl2" id="slbl">Score</span></div>
  <div class="r2" id="rtitle"></div><div class="rs" id="rsub"></div>
  <div class="score-grid" id="sgrid"></div>
  <div class="bd" id="bdown"></div>
  <div class="brow" id="rbtns"></div>
  <div class="bn2" id="rbsis"></div>
</div></div>

<!-- CERTIFICATE -->
<div class="sc" id="sc-cert">
  <div class="np" style="text-align:center;margin-bottom:14px;display:flex;gap:10px;justify-content:center;">
    <button class="btn bg bs" onclick="window.print()">&#128438; Print Certificate</button>
    <button class="btn bo bs" onclick="show('sc-res')">&#8592; Results</button>
  </div>
  <div class="cw" id="ca"></div>
</div>

<div class="ft">MACCESS INC. | Private Security LA Worldwide (PSLAW) | PPO License #122729 | BSIS Baton Certification | BPC §§7583.33 | 7585.9</div>

<script>
const QS=JSON.parse(\`${qsJ}\`);
const VA_CORRECT=JSON.parse(\`${vaJ}\`);
const LT=['A','B','C','D'];
// First 24 questions are the official BSIS exam; rest are supplemental
const OFFICIAL_COUNT=24;
const PASS_RAW=20; // must get 20 out of first 24

let cur=0,ans=new Array(QS.length).fill(null),dn=new Array(QS.length).fill(false);
let nm='',reg='',em='',dt='';
let vaAnswers=new Array(VA_CORRECT.length).fill('');
let vaChecked=false;

function show(id){document.querySelectorAll('.sc').forEach(s=>s.classList.remove('on'));document.getElementById(id).classList.add('on');window.scrollTo(0,0);}

function start(){
  nm=document.getElementById('iname').value.trim();
  reg=document.getElementById('ireg').value.trim();
  em=document.getElementById('iemail').value.trim();
  dt=document.getElementById('idate').value;
  if(!nm){alert('Please enter your full legal name.');return;}
  if(!reg){alert('Please enter your guard registration number.');return;}
  if(!em||!em.includes('@')){alert('Please enter a valid email address.');return;}
  show('sc-test');renderQ();
}

function renderQ(){
  const q=QS[cur];
  document.getElementById('pf').style.width=Math.round((cur/QS.length)*100)+'%';
  document.getElementById('pt').textContent='Question '+(cur+1)+' of '+QS.length+(cur<OFFICIAL_COUNT?' (Official BSIS Exam)':' (Supplemental)');
  document.getElementById('bprev').style.display=cur>0?'inline-block':'none';
  document.getElementById('bnext').textContent=cur===QS.length-1?'Proceed to Vital Areas &#8594;':'Next &#8594;';
  const c=dn[cur],s=ans[cur];
  const isYN=q.options.length===2;
  const oh=q.options.map((o,i)=>{
    let cl='op';
    if(c){if(i===q.answer)cl+=' ok';else if(i===s&&i!==q.answer)cl+=' no';}
    else if(i===s)cl+=' sl';
    const oc=c?'':('onclick="pick('+i+')"');
    const lbl=isYN?(i===0?'T':'F'):LT[i];
    return '<div class="'+cl+'" '+oc+'><div class="ol">'+lbl+'</div><span>'+o+'</span></div>';
  }).join('');
  let fb='';
  if(c){
    const lbl=isYN?(q.answer===0?'True':'False'):LT[q.answer];
    if(s===q.answer)fb='<div class="fb fb-ok">&#10003; Correct \u2014 '+q.ref+'</div>';
    else fb='<div class="fb fb-no">&#10007; Incorrect. Correct answer: <strong>'+lbl+'. '+q.options[q.answer]+'</strong> \u2014 '+q.ref+'</div>';
  }
  document.getElementById('qa').innerHTML='<div class="mb">'+q.module+'<span class="rf">'+q.ref+'</span></div>'+(cur<OFFICIAL_COUNT?'<div class="mb" style="background:#FFF3CD;color:#7B4F00;border-color:#F9C757">Official BSIS Exam Q'+(cur+1)+'/24</div>':'')+'<div class="qc"><div class="qn">Question '+(cur+1)+' of '+QS.length+'</div><div class="qt">'+q.q+'</div><div class="opts">'+oh+'</div>'+fb+'</div>';
}

function pick(i){if(dn[cur])return;ans[cur]=i;dn[cur]=true;renderQ();}
function nxt(){if(!dn[cur]){alert('Please select an answer.');return;}if(cur<QS.length-1){cur++;renderQ();}else showVital();}
function prev(){if(cur>0){cur--;renderQ();}}

function showVital(){
  show('sc-vital');
  const grid=document.getElementById('va-grid');
  grid.innerHTML=VA_CORRECT.map((_,i)=>\`
    <div class="va-item">
      <div class="va-label">Area \${String.fromCharCode(65+i)}</div>
      <input class="va-input" id="va\${i}" type="text" placeholder="Name this vital area..." oninput="vaAnswers[\${i}]=this.value.trim()"/>
    </div>
  \`).join('');
}

function submitVital(){
  vaChecked=true;
  let correct=0;
  VA_CORRECT.forEach((va,i)=>{
    const inp=document.getElementById('va'+i);
    const entered=(inp.value||'').trim().toLowerCase();
    const expected=va.toLowerCase();
    // Accept if the answer contains the key anatomical word
    const keyWords=expected.split(/[\s\/,()]+/).filter(w=>w.length>3);
    const matched=keyWords.some(kw=>entered.includes(kw));
    if(matched){correct++;inp.classList.add('va-ok');}
    else inp.classList.add('va-no');
    vaAnswers[i]=inp.value.trim();
  });
  setTimeout(()=>showResults(correct),600);
}

function showResults(vaCorrect){
  show('sc-res');
  // Score official 24 questions
  let officialCorrect=0,suppCorrect=0;
  const mm={};
  QS.forEach((q,i)=>{
    const hit=ans[i]===q.answer;
    if(i<OFFICIAL_COUNT&&hit)officialCorrect++;
    if(i>=OFFICIAL_COUNT&&hit)suppCorrect++;
    if(!mm[q.module])mm[q.module]={c:0,t:0,official:i<OFFICIAL_COUNT};
    mm[q.module].t++;
    if(hit)mm[q.module].c++;
  });
  const vaAllCorrect=vaCorrect===VA_CORRECT.length;
  const officialPass=officialCorrect>=PASS_RAW;
  const overallPass=officialPass&&vaAllCorrect;
  const pct=Math.round((officialCorrect/OFFICIAL_COUNT)*100);

  const ring=document.getElementById('sring');
  ring.className='sr '+(overallPass?'sr-ok':'sr-no');
  document.getElementById('spct').textContent=officialCorrect+'/'+OFFICIAL_COUNT;
  document.getElementById('slbl').textContent=overallPass?'PASSED':'NOT PASSED';

  const rt=document.getElementById('rtitle');
  rt.className='r2 '+(overallPass?'rp':'rn');
  rt.textContent=overallPass?'\u2713 Examination Passed':'\u2717 Examination Not Passed';

  document.getElementById('rsub').innerHTML=overallPass
    ?'Congratulations, <strong>'+nm+'</strong>. You scored <strong>'+officialCorrect+'/'+OFFICIAL_COUNT+'</strong> on the written exam and correctly identified <strong>'+vaCorrect+'/'+VA_CORRECT.length+'</strong> vital areas, satisfying BSIS requirements per BPC §7585.13.'
    :'Written score: <strong>'+officialCorrect+'/'+OFFICIAL_COUNT+'</strong> ('+pct+'%) | Vital areas: <strong>'+vaCorrect+'/'+VA_CORRECT.length+'</strong>. BSIS requires a minimum of <strong>20/24</strong> on the written exam AND all 7 vital areas correctly identified. A retake is required for any failed component.';

  // Score grid
  document.getElementById('sgrid').innerHTML=\`
    <div class="sc2"><div class="sl3">Written (Official 24 Q)</div><div class="sv \${officialPass?'sv-ok':'sv-no'}">\${officialCorrect}/24</div><div style="font-size:11px;color:var(--gr);margin-top:3px;">\${officialPass?'\u2713 Pass (need \u226520)':'\u2717 Fail (need \u226520)'}</div></div>
    <div class="sc2"><div class="sl3">Vital Areas (7 Required)</div><div class="sv \${vaAllCorrect?'sv-ok':'sv-no'}">\${vaCorrect}/7</div><div style="font-size:11px;color:var(--gr);margin-top:3px;">\${vaAllCorrect?'\u2713 All identified':'\u2717 Must identify all 7'}</div></div>
  \`;

  // Module breakdown
  let bh='<h3>Score by Module (Written)</h3>';
  for(const[m,d] of Object.entries(mm)){
    const mp=Math.round((d.c/d.t)*100);
    bh+='<div class="br"><span style="color:var(--gr)">'+m+(d.official?' <span style=\\'font-size:10px;color:#7B4F00;\\'>[Official]</span>':'')+' </span><span class="'+(d.c===d.t?'sp':'sf')+'">'+d.c+'/'+d.t+' ('+mp+'%)</span></div>';
  }
  document.getElementById('bdown').innerHTML=bh;

  let btns=overallPass?'<button class="btn bg bs" onclick="showCert()">View Certificate \u2192</button>':'';
  btns+='<button class="btn bo bs" onclick="retake()">'+(overallPass?'Retake':'&#8635; Retake Examination')+'</button>';
  document.getElementById('rbtns').innerHTML=btns;

  document.getElementById('rbsis').innerHTML=overallPass
    ?'<strong>BSIS Compliance:</strong> This assessment record satisfies the written examination requirement per BPC §7585.13. The instructor must attest under penalty of perjury that you completed the classroom portion and correctly named all vital areas. Retain your Certificate of Completion per Title 16 CCR §643(b). Note: BSIS Baton Permit issuance requires a BSIS-certified TFB facility and instructor.'
    :'<strong>BSIS Requirement:</strong> Both passing the written (20+/24) AND identifying all 7 vital areas are required. Review the failed components before retesting. Vital areas: Head, Throat/Neck, Spine, Kidneys, Groin, Sternum/Solar Plexus, Knees.';
}

function retake(){
  cur=0;ans=new Array(QS.length).fill(null);dn=new Array(QS.length).fill(false);
  vaAnswers=new Array(VA_CORRECT.length).fill('');vaChecked=false;
  show('sc-test');renderQ();
}

function showCert(){
  const d=new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
  document.getElementById('ca').innerHTML=\`
    <div class="ch">Certificate of Completion</div>
    <div class="cgb"></div>
    <div class="cc">MACCESS INC.</div>
    <div class="cp">Private Patrol Operator | PPO License #122729 | BSIS Baton Certification Program</div>
    <div class="cb">This certifies that</div>
    <div class="cn">\${nm}</div>
    <div class="cb">Guard Registration No: \${reg} &nbsp;|&nbsp; Date: \${d}</div>
    <div class="cb" style="margin-bottom:10px;">has successfully completed the written assessment for:</div>
    <div class="cco">Baton Certification — BSIS Training Course</div>
    <div class="csb">Written Score: &#10003; Passing &nbsp;|&nbsp; Vital Areas: &#10003; All Identified</div>
    <div class="cno">&#9888; Compliance Note: Issuance of a BSIS Baton Permit requires completion of the full 8-hour course at a BSIS-certified Baton Training Facility (TFB) by a certified Baton Instructor. This certificate documents completion of the MACCESS INC. 4-hour elective classroom module only. Contact your supervisor regarding enrollment in a BSIS-certified TFB for permit issuance.</div>
    <div class="cb">This completion satisfies the BSIS elective course requirement (BPC §7583.6(b)) and the written examination component of BPC §7585.13. Retain this certificate per Title 16 CCR §643(b).</div>
    <div class="cgb"></div>
    <div class="css">
      <div class="csi"><div class="ln"></div><div class="sl3">Student Signature</div></div>
      <div class="csi"><div class="ln"></div><div class="sl3">Instructor Signature</div></div>
      <div class="csi"><div class="ln"></div><div class="sl3">Date: \${d}</div></div>
    </div>
  \`;
  show('sc-cert');
}
</script></body></html>`;
}

// ══════════════════════════════════════════════════════════
// BUILD ANSWER KEY PPTX
// ══════════════════════════════════════════════════════════
async function buildAnswerKey(outPath) {
  // OFFICIAL_COUNT = 24 (defined at module scope)
  const bank = BANK;
  const qs   = bank.questions;
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "MACCESS INC. — CONFIDENTIAL";
  pres.title  = "Baton Certification — INSTRUCTOR ANSWER KEY";
  const CMAP  = { A:"1A5C3A", B:"1B2B5E", C:"7B3F00", D:"8B1A1A", T:"1A5C3A", F:"8B1A1A" };
  const today = new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});

  // Cover
  let sl = pres.addSlide(); sl.background={color:NAVY};
  sl.addShape(pres.shapes.RECTANGLE,{x:0,y:0,w:10,h:0.55,fill:{color:RED}});
  sl.addText("CONFIDENTIAL — INSTRUCTOR USE ONLY — DO NOT DISTRIBUTE TO STUDENTS",{x:0,y:0,w:10,h:0.55,fontSize:11,bold:true,color:WHITE,fontFace:"Calibri",align:"center",valign:"middle",margin:0});
  sl.addShape(pres.shapes.RECTANGLE,{x:0,y:4.65,w:10,h:1.0,fill:{color:GOLD}});
  sl.addText("ANSWER KEY",{x:0.55,y:0.75,w:9,h:0.5,fontSize:16,bold:true,color:GOLD,fontFace:"Calibri",charSpacing:6,margin:0});
  sl.addText("Baton Certification — BSIS Written Examination",{x:0.55,y:1.32,w:9,h:0.85,fontSize:28,bold:true,color:WHITE,fontFace:"Calibri",margin:0});
  sl.addText("Instructor Copy — Retain Securely",{x:0.55,y:2.28,w:9,h:0.4,fontSize:13,italic:true,color:"CADCFC",fontFace:"Calibri",margin:0});
  sl.addText(`${qs.length} Questions (${OFFICIAL_COUNT} Official BSIS Exam + ${qs.length-OFFICIAL_COUNT} Supplemental)  |  Pass: 20/24 + All 7 Vital Areas  |  ${bank.bpcRef}`,{x:0.55,y:2.78,w:9,h:0.35,fontSize:10,color:"9AAFCC",fontFace:"Calibri",margin:0});
  sl.addText("MACCESS INC.  |  PPO #122729",{x:0.55,y:4.72,w:5,h:0.5,fontSize:13,bold:true,color:NAVY,fontFace:"Calibri",valign:"middle",margin:0});
  sl.addText(today,{x:5.65,y:4.72,w:4.2,h:0.5,fontSize:11,color:NAVY,fontFace:"Calibri",valign:"middle",align:"right",margin:0});

  // Vital areas answer slide
  let va = pres.addSlide(); va.background={color:LIGHT};
  va.addShape(pres.shapes.RECTANGLE,{x:0,y:0,w:10,h:0.82,fill:{color:RED}});
  va.addText("VITAL AREAS — REQUIRED ANSWERS (All 7 Must Be Identified)",{x:0.4,y:0,w:9,h:0.82,fontSize:18,bold:true,color:WHITE,fontFace:"Calibri",valign:"middle",margin:0});
  va.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:0.3,y:0.95,w:9.4,h:0.55,fill:{color:"FFF3CD"},rectRadius:0.08});
  va.addText("Student must correctly identify ALL 7 areas. Failure to identify any one area = exam failure, regardless of written score.",{x:0.45,y:0.95,w:9.1,h:0.55,fontSize:11,bold:true,color:AMBER,fontFace:"Calibri",valign:"middle",margin:0});
  const vitalAns=[
    ["A","Head (temple, skull, jaw)","Strikes can cause brain injury, skull fracture, or death"],
    ["B","Throat / Neck (carotid, trachea)","Strikes can cause asphyxiation, cardiac arrest, or death"],
    ["C","Spine (cervical, thoracic, lumbar)","Strikes can cause permanent paralysis or death"],
    ["D","Kidneys (posterior lower back)","Organ rupture, internal bleeding, shock"],
    ["E","Groin","Severe injury, nerve damage, shock"],
    ["F","Sternum / Solar Plexus","Cardiac arrhythmia, respiratory arrest"],
    ["G","Knees (joint area)","Permanent structural damage, disability"],
  ];
  vitalAns.forEach(([lt,name,risk],i)=>{
    const y=1.62+i*0.54;
    va.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:0.3,y,w:9.4,h:0.48,fill:{color:i%2===0?"FFF0F0":WHITE},rectRadius:0.06});
    va.addShape(pres.shapes.OVAL,{x:0.38,y:y+0.08,w:0.34,h:0.34,fill:{color:RED}});
    va.addText(lt,{x:0.38,y:y+0.08,w:0.34,h:0.34,fontSize:12,bold:true,color:WHITE,fontFace:"Calibri",align:"center",valign:"middle",margin:0});
    va.addText(name,{x:0.83,y,w:3.3,h:0.48,fontSize:10.5,bold:true,color:RED,fontFace:"Calibri",valign:"middle",margin:0});
    va.addText(risk,{x:4.2,y,w:5.38,h:0.48,fontSize:10,color:GRAY,fontFace:"Calibri",valign:"middle",margin:0});
  });

  // Official exam quick-ref grid
  // OFFICIAL_COUNT = 24 (defined at module scope)
  let gr = pres.addSlide(); gr.background={color:LIGHT};
  gr.addShape(pres.shapes.RECTANGLE,{x:0,y:0,w:10,h:0.82,fill:{color:NAVY}});
  gr.addText("OFFICIAL BSIS EXAM — 24 QUESTIONS — QUICK ANSWER REFERENCE",{x:0.4,y:0,w:7.5,h:0.82,fontSize:17,bold:true,color:WHITE,fontFace:"Calibri",valign:"middle",margin:0});
  gr.addText("Pass: 20/24",{x:7.8,y:0,w:2,h:0.82,fontSize:13,color:GOLD,fontFace:"Calibri",valign:"middle",align:"right",margin:0});
  qs.slice(0,OFFICIAL_COUNT).forEach((q,i)=>{
    const col=i%6, row=Math.floor(i/6);
    const x=0.28+col*1.58, y=1.0+row*1.1;
    const isYN=q.options.length===2;
    const al=isYN?(q.answer===0?"T":"F"):["A","B","C","D"][q.answer];
    const color=isYN?(q.answer===0?GREEN:RED):(CMAP[al]||NAVY);
    gr.addShape(pres.shapes.ROUNDED_RECTANGLE,{x,y,w:1.48,h:0.98,fill:{color:WHITE},rectRadius:0.08,shadow:ms()});
    gr.addShape(pres.shapes.ROUNDED_RECTANGLE,{x,y,w:1.48,h:0.42,fill:{color:color},rectRadius:0.08});
    gr.addText("Q"+(i+1),{x,y,w:1.48,h:0.42,fontSize:12,bold:true,color:WHITE,fontFace:"Calibri",align:"center",valign:"middle",margin:0});
    gr.addText(al,{x,y:y+0.44,w:1.48,h:0.52,fontSize:24,bold:true,color:color,fontFace:"Calibri",align:"center",valign:"middle",margin:0});
  });
  gr.addText("MACCESS INC.  |  PPO #122729  |  INSTRUCTOR COPY — CONFIDENTIAL",{x:0,y:5.35,w:10,h:0.25,fontSize:8,italic:true,color:GRAY,fontFace:"Calibri",align:"center",margin:0});

  // Full Q&A slides — 3 per slide
  const allQs = qs;
  for (let i = 0; i < allQs.length; i += 3) {
    let sl2 = pres.addSlide(); sl2.background={color:LIGHT};
    sl2.addShape(pres.shapes.RECTANGLE,{x:0,y:0,w:10,h:0.48,fill:{color:i<OFFICIAL_COUNT?RED:STEEL}});
    sl2.addText(i<OFFICIAL_COUNT?"OFFICIAL BSIS EXAM — INSTRUCTOR ANSWER KEY":"SUPPLEMENTAL — INSTRUCTOR ANSWER KEY",{x:0.3,y:0,w:6.5,h:0.48,fontSize:10,bold:true,color:WHITE,fontFace:"Calibri",valign:"middle",margin:0});
    sl2.addText("CONFIDENTIAL",{x:6.8,y:0,w:3,h:0.48,fontSize:8,color:WHITE,fontFace:"Calibri",valign:"middle",align:"right",margin:0});
    [allQs[i],allQs[i+1],allQs[i+2]].filter(Boolean).forEach((q,qi)=>{
      const qn=i+qi+1;
      const isYN=q.options.length===2;
      const al=isYN?(q.answer===0?"T":"F"):["A","B","C","D"][q.answer];
      const aColor=isYN?(q.answer===0?GREEN:RED):(CMAP[al]||NAVY);
      const yb=0.56+qi*1.68;
      sl2.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:0.25,y:yb,w:9.5,h:1.56,fill:{color:WHITE},rectRadius:0.09,shadow:ms()});
      sl2.addShape(pres.shapes.OVAL,{x:0.32,y:yb+0.14,w:0.52,h:0.52,fill:{color:qn<=OFFICIAL_COUNT?NAVY:STEEL}});
      sl2.addText(String(qn)+(qn<=OFFICIAL_COUNT?" ★":""),{x:0.32,y:yb+0.14,w:0.52,h:0.52,fontSize:9,bold:true,color:WHITE,fontFace:"Calibri",align:"center",valign:"middle",margin:0});
      sl2.addText(q.module||"",{x:0.95,y:yb+0.09,w:5.5,h:0.25,fontSize:7.5,italic:true,color:GRAY,fontFace:"Calibri",margin:0});
      sl2.addText(q.ref||"",{x:6.55,y:yb+0.09,w:3.0,h:0.25,fontSize:7.5,italic:true,color:GRAY,fontFace:"Calibri",align:"right",margin:0});
      sl2.addText(q.q,{x:0.95,y:yb+0.36,w:8.5,h:0.48,fontSize:10.5,bold:true,color:"1A1A2E",fontFace:"Calibri",margin:0});
      if(isYN){
        ["True","False"].forEach((opt,oi)=>{
          const isC=oi===q.answer;
          sl2.addText((isC?"✓ ":"   ")+(oi===0?"T":"F")+". "+opt,{x:0.95+oi*3.5,y:yb+0.93,w:3.3,h:0.24,fontSize:9.5,bold:isC,color:isC?(oi===0?GREEN:RED):GRAY,fontFace:"Calibri",margin:0});
        });
      } else {
        q.options.forEach((opt,oi)=>{
          const isC=oi===q.answer;
          const c=oi%2, r2=Math.floor(oi/2);
          sl2.addText((isC?"✓ ":"   ")+["A","B","C","D"][oi]+". "+opt,{x:0.95+c*4.35,y:yb+0.93+r2*0.27,w:4.1,h:0.24,fontSize:9,bold:isC,color:isC?GREEN:GRAY,fontFace:"Calibri",margin:0});
        });
      }
      sl2.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:8.9,y:yb+0.88,w:0.7,h:0.56,fill:{color:aColor},rectRadius:0.06});
      sl2.addText(al,{x:8.9,y:yb+0.88,w:0.7,h:0.56,fontSize:22,bold:true,color:WHITE,fontFace:"Calibri",align:"center",valign:"middle",margin:0});
    });
  }

  // Scoring guide
  let sg = pres.addSlide(); sg.background={color:LIGHT};
  sg.addShape(pres.shapes.RECTANGLE,{x:0,y:0,w:10,h:0.82,fill:{color:NAVY}});
  sg.addText("SCORING GUIDE & INSTRUCTOR OBLIGATIONS",{x:0.4,y:0,w:9,h:0.82,fontSize:20,bold:true,color:WHITE,fontFace:"Calibri",valign:"middle",margin:0});
  const sgRows=[
    ["Written Pass Score","20 out of 24 official questions — partial credit not awarded"],
    ["Vital Areas Pass","ALL 7 vital areas correctly identified — failure to name any one = exam failure"],
    ["Both Required","Student must pass BOTH components simultaneously. Passing one does not hold."],
    ["Re-Test","Allowed at instructor's discretion. Failing score must be recorded before re-test."],
    ["Answer Sheets","Retain for minimum 2 years per BPC §7585.15 — available to BSIS on request"],
    ["★ = Official BSIS Q","Questions marked ★ are from the official BSIS Baton Training Written Examination"],
    ["Permit Issuance","BSIS Baton Permit issued by certified instructor at BSIS-certified TFB only (not PPO alone)"],
    ["Roster","Submit roster to BSIS within 5 working days of class completion (BPC §7585.14)"],
  ];
  sgRows.forEach(([lbl,txt],i)=>{
    const y=1.0+i*0.58;
    sg.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:0.3,y,w:9.4,h:0.52,fill:{color:i%2===0?WHITE:LIGHT},rectRadius:0.07});
    sg.addText(lbl,{x:0.4,y,w:2.2,h:0.52,fontSize:10,bold:true,color:NAVY,fontFace:"Calibri",valign:"middle",margin:4});
    sg.addText(txt,{x:2.7,y,w:6.9,h:0.52,fontSize:9.5,color:"1A1A2E",fontFace:"Calibri",valign:"middle",margin:4});
  });

  await pres.writeFile({ fileName: outPath });
}

// ══════════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════════
const BASE  = "Baton_Certification_BSIS_MACCESS_INC";
const pptxOut = `/home/claude/${BASE}.pptx`;
const pptxPdf = `/home/claude/${BASE}.pdf`;
const htmlOut = `/home/claude/${BASE}-Test.html`;
const akOut   = `/home/claude/${BASE}-AnswerKey.pptx`;
const akPdf   = `/home/claude/${BASE}-AnswerKey.pdf`;

const OFFICIAL_COUNT = 24;
async function main() {
  console.log("\n" + "═".repeat(60));
  console.log("  MACCESS INC. — BSIS Baton Certification Builder");
  console.log("  Fact-checked against: bsis.ca.gov/forms_pubs/bat_adminman.pdf");
  console.log("=" .repeat(60));

  console.log("\n  Building Course PPTX...");
  await buildCoursePPTX(pptxOut);
  try{execSync(`python3 /mnt/skills/public/pptx/scripts/rezip.py "${pptxOut}"`,{stdio:"pipe"});}catch{}
  try{execSync(`python3 /mnt/skills/public/pptx/scripts/office/soffice.py --headless --convert-to pdf "${pptxOut}"`,{stdio:"pipe"});}catch{}
  console.log("  ✓ Course PPTX" + (fs.existsSync(pptxPdf)?" + PDF":""));

  console.log("\n  Building Interactive HTML Test...");
  console.log("    All 24 official BSIS exam questions included");
  console.log("    + " + (BANK.questions.length - OFFICIAL_COUNT) + " supplemental curriculum questions");
  console.log("    Vital areas identification module included");
  fs.writeFileSync(htmlOut, buildHTMLTest(BANK));
  console.log("  ✓ HTML Test (" + BANK.questions.length + " total questions + vital areas section)");

  console.log("\n  Building Answer Key PPTX...");
  await buildAnswerKey(akOut);
  try{execSync(`python3 /mnt/skills/public/pptx/scripts/rezip.py "${akOut}"`,{stdio:"pipe"});}catch{}
  try{execSync(`python3 /mnt/skills/public/pptx/scripts/office/soffice.py --headless --convert-to pdf "${akOut}"`,{stdio:"pipe"});}catch{}
  console.log("  ✓ Answer Key PPTX" + (fs.existsSync(akPdf)?" + PDF":""));

  console.log("\n  Pushing to GitHub...");
  const uploads=[
    [pptxOut,`${DIR}/${BASE}.pptx`,`feat: Baton Certification — Course PPTX (BSIS BPC §7583.33)`],
    ...(fs.existsSync(pptxPdf)?[[pptxPdf,`${DIR}/${BASE}.pdf`,`feat: Baton Certification — Course PDF`]]:[]),
    [htmlOut,`${DIR}/${BASE}-Test.html`,`feat: Baton Certification — Interactive Test (24 official BSIS + vital areas)`],
    [akOut,`${DIR}/${BASE}-AnswerKey.pptx`,`feat: Baton Certification — Instructor Answer Key PPTX`],
    ...(fs.existsSync(akPdf)?[[akPdf,`${DIR}/${BASE}-AnswerKey.pdf`,`feat: Baton Certification — Instructor Answer Key PDF`]]:[]),
  ];
  for(const[local,remote,msg] of uploads){
    if(!fs.existsSync(local)){console.log("  ⚠️  Missing: "+local);continue;}
    const ok=await pushGH(local,remote,msg);
    console.log(`    ${ok?"✅":"❌"} ${remote.split("/").pop()}`);
  }

  console.log("\n" + "═".repeat(60));
  console.log("  BATON CERTIFICATION MODULE COMPLETE");
  console.log("  Repo: MaccPSLAW/Licensing-Live-Scans-");
  console.log("  Path: PSLAW-Courses/final-projects/");
  console.log("\n  Files generated:");
  console.log("  • Course PPTX + PDF (6 modules, compliance notice, exam prep)");
  console.log("  • Interactive HTML Test (24 official + 9 supplemental questions,");
  console.log("    vital areas identification section, BSIS-compliant pass logic)");
  console.log("  • Instructor Answer Key PPTX + PDF (vital areas, quick-ref grid,");
  console.log("    full Q&A, scoring guide, instructor obligations)");
  console.log("\n  ⚠️  COMPLIANCE REMINDER:");
  console.log("  The full 8-hr baton PERMIT course + permit issuance requires a");
  console.log("  BSIS-certified Baton Training Facility (TFB) and certified instructor.");
  console.log("  MACCESS INC. must obtain TFB certification before issuing permits.\n");

  // Auto-update README
  await autoUpdateReadme(TOKEN);
}

main().catch(console.error);
