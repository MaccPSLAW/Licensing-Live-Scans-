#!/usr/bin/env node
/**
 * MACCESS INC. — PSLAW Course Suite README Auto-Updater
 * ======================================================
 * Scans PSLAW-Courses/final-projects/ on GitHub, detects all modules,
 * and regenerates the README with the 1a / 1b / 1c structure.
 *
 * Usage:
 *   GITHUB_TOKEN=your_token node update_readme.js
 *
 * Run this every time a new module is added to final-projects/.
 * The script is self-healing: it reads live repo state every time —
 * no manual edits needed.
 *
 * Module naming convention (used to detect and sort modules):
 *   [Base].pptx            → 1a  Course Module (PowerPoint)
 *   [Base]-Test.html       → 1b  Assessment (Interactive HTML)
 *   [Base]-AnswerKey.pptx  → 1c  Answer Key (PowerPoint)
 *   [Base].pdf             → companion PDF for course
 *   [Base]-AnswerKey.pdf   → companion PDF for answer key
 */

const https = require("https");

// ── Config ────────────────────────────────────────────────────────────────────
const TOKEN = process.env.GITHUB_TOKEN;
const REPO  = "MaccPSLAW/Licensing-Live-Scans-";
const PATH  = "PSLAW-Courses/final-projects";

if (!TOKEN) {
  console.error("Error: GITHUB_TOKEN environment variable is not set.");
  process.exit(1);
}

// ── Module registry ───────────────────────────────────────────────────────────
// Maps base filename → display metadata.
// When a new module is built and pushed to final-projects/, add one entry here.
// The script will auto-detect the files; this registry supplies the human label,
// module number, category, hours, and legal authority.
//
// FORMAT:
//   key:      exact base filename (no extension, no suffix like -Test or -AnswerKey)
//   num:      module number (controls sort order and section headings)
//   label:    full human-readable course title
//   hours:    credit hours as string
//   authority: BSIS statutory reference
//   category: one of "preregistration" | "mandatory" | "elective" | "overview"
//   notes:    optional compliance or delivery note shown in the README
const MODULE_REGISTRY = [
  // ── OVERVIEW ─────────────────────────────────────────────────────────────
  {
    key:       "BSIS_Security_Guard_Licensing_Training_2026",
    num:       0,
    label:     "BSIS Security Guard Licensing — Complete Training Overview 2026",
    hours:     "—",
    authority: "BPC §7583.6 | §7583.7",
    category:  "overview",
    notes:     "Reference deck. Not a sellable standalone module — does not include a test or answer key.",
  },
  // ── PRE-REGISTRATION (required before guard card application) ─────────────
  {
    key:       "Powers_to_Arrest_BSIS_Certification_MACCESS_INC",
    num:       1,
    label:     "Powers to Arrest",
    hours:     "3",
    authority: "BPC §7583.7",
    category:  "preregistration",
    notes:     "First half of the 8-hour pre-registration requirement. Pairs with Appropriate Use of Force (Module 2).",
  },
  {
    key:       "Appropriate_Use_of_Force_BSIS_Certification_MACCESS_INC",
    num:       2,
    label:     "Appropriate Use of Force",
    hours:     "5",
    authority: "BPC §7583.7",
    category:  "preregistration",
    notes:     "Second half of the 8-hour pre-registration requirement. Sections 2, 5, 6, and 9 require in-person delivery per BPC §7583.7.",
  },
  // ── MANDATORY SKILLS (all 4 required within 6 months; first 2 within 30 days) ──
  {
    key:       "Public_Relations_Community_BSIS_Skills_MACCESS_INC",
    num:       3,
    label:     "Public Relations & Community",
    hours:     "4",
    authority: "BPC §7583.6(b)",
    category:  "mandatory",
    notes:     "Complete within 30 days of guard card issuance (one of the first two mandatory courses).",
  },
  {
    key:       "Observation_Documentation_BSIS_Skills_MACCESS_INC",
    num:       4,
    label:     "Observation & Documentation",
    hours:     "4",
    authority: "BPC §7583.6(b)",
    category:  "mandatory",
    notes:     "Complete within 30 days of guard card issuance (one of the first two mandatory courses).",
  },
  {
    key:       "Communication_Significance_BSIS_Skills_MACCESS_INC",
    num:       5,
    label:     "Communication & Its Significance",
    hours:     "4",
    authority: "BPC §7583.6(b)",
    category:  "mandatory",
    notes:     "Complete within 6 months of guard card issuance.",
  },
  {
    key:       "Liability_Legal_Aspects_BSIS_Skills_MACCESS_INC",
    num:       6,
    label:     "Liability & Legal Aspects",
    hours:     "4",
    authority: "BPC §7583.6(b)",
    category:  "mandatory",
    notes:     "Complete within 6 months of guard card issuance.",
  },
  // ── ELECTIVE SKILLS (count toward the 32-hour skills total) ──────────────
  {
    key:       "Officer_Safety_BSIS_Skills_MACCESS_INC",
    num:       7,
    label:     "Officer Safety",
    hours:     "4",
    authority: "BPC §7583.6(b)",
    category:  "elective",
    notes:     "Covers threat assessment, subject contact, blood-borne pathogens (OSHA 29 CFR 1910.1030), and environmental hazards.",
  },
  {
    key:       "Handling_Difficult_People_BSIS_Skills_MACCESS_INC",
    num:       8,
    label:     "Handling Difficult People",
    hours:     "4",
    authority: "BPC §7583.6(b)",
    category:  "elective",
    notes:     "Covers communication strategies, conflict management, negotiation, and verbal diffusion.",
  },
  {
    key:       "Baton_Certification_BSIS_MACCESS_INC",
    num:       9,
    label:     "Baton Certification",
    hours:     "4",
    authority: "BPC §§7583.33 | 7585.9 | 7585.13",
    category:  "elective",
    notes:     "4-hr elective classroom module deliverable by PPO. Full 8-hr baton PERMIT course and permit issuance requires a BSIS-certified Baton Training Facility (TFB license) and certified instructor. Exam: 24 official BSIS questions + vital areas identification.",
  },
  // ── ADD NEW MODULES BELOW THIS LINE ──────────────────────────────────────
  // Copy any entry above as a template. The script picks up the rest automatically.
  // Example:
  // {
  //   key:       "Workplace_Violence_BSIS_Skills_MACCESS_INC",
  //   num:       10,
  //   label:     "Workplace Violence",
  //   hours:     "4",
  //   authority: "BPC §7583.6(b)",
  //   category:  "elective",
  //   notes:     "Covers warning signs, anger management, diversity, personal security, and reporting.",
  // },
];

// ── GitHub helpers ────────────────────────────────────────────────────────────
function ghRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const options = {
      hostname: "api.github.com",
      path: `/repos/${REPO}/contents/${encodeURIComponent(path)}`,
      method,
      headers: {
        Authorization: `token ${TOKEN}`,
        "User-Agent":  "MACCESS-README-Updater",
        Accept:        "application/vnd.github.v3+json",
        ...(payload ? { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(payload) } : {}),
      },
    };
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on("error", reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function listFolder(folderPath) {
  const res = await ghRequest("GET", folderPath);
  if (res.status !== 200 || !Array.isArray(res.body)) {
    throw new Error(`Failed to list ${folderPath}: HTTP ${res.status}`);
  }
  return res.body;
}

async function getFileSHA(filePath) {
  const res = await ghRequest("GET", filePath);
  if (res.status === 200 && res.body.sha) return res.body.sha;
  return null;
}

async function putFile(filePath, content, message, sha) {
  const body = {
    message,
    content: Buffer.from(content, "utf-8").toString("base64"),
    branch:  "main",
    ...(sha ? { sha } : {}),
  };
  const res = await ghRequest("PUT", filePath, body);
  if (res.status !== 200 && res.status !== 201) {
    throw new Error(`Failed to push ${filePath}: HTTP ${res.status} — ${JSON.stringify(res.body)}`);
  }
  return res.body;
}

// ── File detection logic ──────────────────────────────────────────────────────
// Given the list of filenames in the repo, determine which parts each module has.
function detectModuleParts(registry, repoFiles) {
  const fileSet = new Set(repoFiles);

  return registry.map((mod) => {
    const base = mod.key;
    const parts = {
      course_pptx:  fileSet.has(`${base}.pptx`),
      course_pdf:   fileSet.has(`${base}.pdf`),
      test_html:    fileSet.has(`${base}-Test.html`),
      ak_pptx:      fileSet.has(`${base}-AnswerKey.pptx`),
      ak_pdf:       fileSet.has(`${base}-AnswerKey.pdf`),
    };
    const complete =
      mod.category === "overview"
        ? parts.course_pptx && parts.course_pdf
        : parts.course_pptx && parts.course_pdf &&
          parts.test_html   && parts.ak_pptx    && parts.ak_pdf;
    return { ...mod, parts, complete };
  });
}

// ── Unregistered file detector ─────────────────────────────────────────────────
// Any .pptx or .html file in the repo that is NOT covered by the registry is flagged.
function findUnregisteredFiles(registry, repoFiles) {
  const knownBases = new Set(registry.map((m) => m.key));
  const unregistered = [];
  for (const fname of repoFiles) {
    if (fname === "README.md") continue;
    // Strip known suffixes to get the base
    const base = fname
      .replace(/-AnswerKey\.(pptx|pdf)$/, "")
      .replace(/-Test\.(html|pptx|pdf)$/, "")
      .replace(/\.(pptx|pdf|html)$/, "");
    if (!knownBases.has(base)) {
      unregistered.push(fname);
    }
  }
  return [...new Set(unregistered)];
}

// ── Training hours summary ─────────────────────────────────────────────────────
function buildHoursSummary(modules) {
  const cats = {
    preregistration: { label: "Pre-Registration (PTA + AUF)", mods: [], hrs: 0 },
    mandatory:       { label: "Mandatory Skills",              mods: [], hrs: 0 },
    elective:        { label: "Elective Skills",               mods: [], hrs: 0 },
    overview:        { label: "Overview / Reference",          mods: [], hrs: 0 },
  };
  for (const mod of modules) {
    if (!mod.complete) continue;
    const h = parseFloat(mod.hours);
    cats[mod.category].mods.push(mod);
    if (!isNaN(h)) cats[mod.category].hrs += h;
  }
  const rows = Object.values(cats)
    .filter((c) => c.mods.length > 0)
    .map((c) => `| ${c.label} | ${c.mods.length} | ${c.hrs > 0 ? c.hrs + " hrs" : "—"} |`)
    .join("\n");
  const total = Object.values(cats).reduce((a, c) => a + c.hrs, 0);
  return rows + `\n| **Total Hours Covered** | **${modules.filter(m=>m.complete && m.category!=="overview").length}** | **${total} hrs** |`;
}

// ── README generator ───────────────────────────────────────────────────────────
function buildReadme(modules, unregistered) {
  const today  = new Date().toISOString().slice(0, 10);
  const catOrder = ["preregistration", "mandatory", "elective", "overview"];

  const catHeaders = {
    preregistration: "## PRE-REGISTRATION TRAINING\n> Required before guard card application. Must be completed within 6 months of application date by a single BSIS-approved provider per SB 652 (eff. Jan 1, 2026). Exam: 100% passing score required.",
    mandatory:       "## MANDATORY SKILLS TRAINING\n> BPC §7583.6(b): All 4 mandatory courses required within 6 months of registration. First 2 must be completed within 30 days.",
    elective:        "## ELECTIVE SKILLS TRAINING\n> Count toward the 32-hour total skills requirement (BPC §7583.6(b)). Guards may choose from any approved elective topics.",
    overview:        "## OVERVIEW & REFERENCE",
  };

  let sections = "";
  for (const cat of catOrder) {
    const catMods = modules
      .filter((m) => m.category === cat)
      .sort((a, b) => a.num - b.num);
    if (catMods.length === 0) continue;

    sections += `\n${catHeaders[cat]}\n\n`;

    for (const mod of catMods) {
      const num   = mod.num === 0 ? "—" : String(mod.num);
      const numPad = mod.num === 0 ? "—" : mod.num.toString().padStart(2, "0");
      const status = mod.complete ? "✅ Complete" : "⚠️ Incomplete";

      sections += `---\n\n`;
      sections += `### Module ${numPad} — ${mod.label}\n\n`;
      sections += `| Field | Value |\n`;
      sections += `|-------|-------|\n`;
      sections += `| **Status** | ${status} |\n`;
      sections += `| **Training Hours** | ${mod.hours} |\n`;
      sections += `| **Authority** | \`${mod.authority}\` |\n`;
      sections += `| **Category** | ${cat.charAt(0).toUpperCase() + cat.slice(1)} |\n`;
      if (mod.notes) sections += `| **Note** | ${mod.notes} |\n`;
      sections += `\n`;

      if (mod.category === "overview") {
        // Overview: no 1a/1b/1c structure — just the two files
        sections += `| File | Description | Available |\n`;
        sections += `|------|-------------|:---------:|\n`;
        sections += `| \`${mod.key}.pptx\` | Reference Deck (PowerPoint) | ${mod.parts.course_pptx ? "✅" : "❌"} |\n`;
        sections += `| \`${mod.key}.pdf\`  | Reference Deck (PDF)        | ${mod.parts.course_pdf  ? "✅" : "❌"} |\n`;
        sections += `\n`;
      } else {
        // Standard: 1a / 1b / 1c
        sections += `#### ${numPad}a — Course Module (PowerPoint + PDF)\n\n`;
        sections += `| File | Available |\n`;
        sections += `|------|-----------|\n`;
        sections += `| \`${mod.key}.pptx\` | ${mod.parts.course_pptx ? "✅" : "❌"} |\n`;
        sections += `| \`${mod.key}.pdf\`  | ${mod.parts.course_pdf  ? "✅" : "❌"} |\n`;
        sections += `\n`;

        sections += `#### ${numPad}b — Assessment / Test (Interactive HTML)\n\n`;
        sections += `| File | Available |\n`;
        sections += `|------|-----------|\n`;
        sections += `| \`${mod.key}-Test.html\` | ${mod.parts.test_html ? "✅" : "❌"} |\n`;
        sections += `\n`;
        sections += `> Online assessment — one question at a time, instant feedback with legal citation, live score tracking by module, 100% required to pass, print-ready Certificate of Completion on pass, BSIS Live Scan stub included.\n\n`;

        sections += `#### ${numPad}c — Answer Key (Instructor Copy — Confidential)\n\n`;
        sections += `| File | Available |\n`;
        sections += `|------|-----------|\n`;
        sections += `| \`${mod.key}-AnswerKey.pptx\` | ${mod.parts.ak_pptx ? "✅" : "❌"} |\n`;
        sections += `| \`${mod.key}-AnswerKey.pdf\`  | ${mod.parts.ak_pdf  ? "✅" : "❌"} |\n`;
        sections += `\n`;
        sections += `> Internal use only. Includes quick-reference answer grid, full Q&A with correct answers highlighted, and scoring/compliance guide. Do not distribute to students.\n\n`;
      }
    }
  }

  // Unregistered files section
  let unregSection = "";
  if (unregistered.length > 0) {
    unregSection = `\n---\n\n## ⚠️ UNREGISTERED FILES\nThe following files are in final-projects/ but are not in the module registry in \`update_readme.js\`. Add them to MODULE_REGISTRY to include them in the README.\n\n`;
    for (const f of unregistered) {
      unregSection += `- \`${f}\`\n`;
    }
    unregSection += `\n`;
  }

  return `# PSLAW-Courses / final-projects
## MACCESS INC. — BSIS Security Guard Licensing Course Suite

**PPO License:** \`#122729\` | **Provider:** Private Security LA Worldwide (PSLAW)
**Authority:** BPC §7583.6 | §7583.7 | §7585.9 | Title 16 CCR §643(b)
**Source of truth:** [bsis.ca.gov/industries/g_train.shtml](https://www.bsis.ca.gov/industries/g_train.shtml)
**Last updated:** ${today} (auto-generated by \`PSLAW-Courses/scripts/update_readme.js\`)

---

## HOW THIS FOLDER IS ORGANIZED

Every completed module follows the **1a / 1b / 1c** structure:

| Sub-file | Description |
|----------|-------------|
| **[Module]a** — \`[Base].pptx\` + \`[Base].pdf\` | Branded course PowerPoint and PDF |
| **[Module]b** — \`[Base]-Test.html\` | Interactive browser-based assessment |
| **[Module]c** — \`[Base]-AnswerKey.pptx\` + \`[Base]-AnswerKey.pdf\` | Instructor answer key (confidential) |

To add a new module: push all five files to this folder, then run:
\`\`\`bash
GITHUB_TOKEN=your_token node PSLAW-Courses/scripts/update_readme.js
\`\`\`

---

## TRAINING HOURS SUMMARY

| Category | Modules Complete | Hours |
|----------|:----------------:|-------|
${buildHoursSummary(modules)}

> **Remaining to reach 40-hour BSIS requirement:** guards must complete additional electives to reach 32 total skills hours. The 8-hour PTA/AUF pre-registration counts separately.

---
${sections}${unregSection}---

## CERTIFICATE COMPLIANCE (Title 16 CCR §643(b))

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

Live Scan fingerprinting stub is embedded in all \`-Test.html\` files.
Activation when BSIS equipment and DOJ ORI are received:

1. Drop BSIS cert template → \`PSLAW-Courses/live-scan/bsis_livescan_cert_template.pdf\`
2. Edit \`PSLAW-Courses/scripts/build_interactive_test_v2.js\` → update \`LIVE_SCAN_CONFIG\`:
   - \`enabled: true\`
   - \`bsisORI: "CA________"\` (your DOJ-issued ORI)
   - \`atiPrefix: "ATG-____"\` (your ATI prefix)
   - \`showUploadSlot: true\`
3. Rebuild the relevant module's HTML test and push
4. See \`PSLAW-Courses/live-scan/README.md\` for full checklist

---

*Auto-generated by \`PSLAW-Courses/scripts/update_readme.js\` | MACCESS INC. | PPO #122729 | gopslaw.com*
`;
}

// ── Main ───────────────────────────────────────────────────────────────────────
async function main() {
  console.log("\nMACCESS INC. — README Auto-Updater");
  console.log("Repo:", REPO);
  console.log("Path:", PATH);
  console.log("─".repeat(50));

  // 1. Fetch current file list from repo
  console.log("\n1. Scanning final-projects/...");
  const repoItems = await listFolder(PATH);
  const repoFiles = repoItems.map((f) => f.name);
  console.log(`   Found ${repoFiles.length} files`);

  // 2. Detect which modules are present and which parts each has
  console.log("\n2. Matching files to module registry...");
  const modules = detectModuleParts(MODULE_REGISTRY, repoFiles);
  const complete = modules.filter((m) => m.complete);
  const incomplete = modules.filter((m) => !m.complete);

  console.log(`   ✅ Complete modules: ${complete.length}`);
  complete.forEach((m) =>
    console.log(`      • Module ${String(m.num).padStart(2,"0")} — ${m.label}`)
  );

  if (incomplete.length > 0) {
    console.log(`   ⚠️  Incomplete modules: ${incomplete.length}`);
    incomplete.forEach((m) => {
      const missing = [];
      if (!m.parts.course_pptx) missing.push("course.pptx");
      if (!m.parts.course_pdf)  missing.push("course.pdf");
      if (m.category !== "overview") {
        if (!m.parts.test_html) missing.push("Test.html");
        if (!m.parts.ak_pptx)  missing.push("AnswerKey.pptx");
        if (!m.parts.ak_pdf)   missing.push("AnswerKey.pdf");
      }
      console.log(`      • ${m.label}: missing [${missing.join(", ")}]`);
    });
  }

  // 3. Flag any unregistered files
  const unregistered = findUnregisteredFiles(MODULE_REGISTRY, repoFiles);
  if (unregistered.length > 0) {
    console.log(`\n   ⚠️  Unregistered files (not in MODULE_REGISTRY):`);
    unregistered.forEach((f) => console.log(`      - ${f}`));
  }

  // 4. Build README content
  console.log("\n3. Generating README...");
  const readmeContent = buildReadme(modules, unregistered);
  console.log(`   Generated ${readmeContent.length.toLocaleString()} characters`);

  // 5. Get current SHA (needed to update existing file)
  console.log("\n4. Fetching current README SHA...");
  const sha = await getFileSHA(`${PATH}/README.md`);
  console.log(`   SHA: ${sha || "(new file)"}`);

  // 6. Push updated README
  console.log("\n5. Pushing README.md to GitHub...");
  await putFile(
    `${PATH}/README.md`,
    readmeContent,
    `docs: auto-update README — ${complete.filter(m=>m.category!=="overview").length} modules, ${new Date().toISOString().slice(0,10)}`,
    sha
  );
  console.log("   ✅ README.md updated successfully");

  // 7. Also push updated script to repo so it lives alongside the courses
  console.log("\n6. Pushing update_readme.js to scripts/...");
  const fs   = require("fs");
  const self = fs.readFileSync(__filename, "utf-8");
  const scriptSHA = await getFileSHA("PSLAW-Courses/scripts/update_readme.js");
  await putFile(
    "PSLAW-Courses/scripts/update_readme.js",
    self,
    `chore: update README auto-updater script`,
    scriptSHA
  );
  console.log("   ✅ update_readme.js pushed to PSLAW-Courses/scripts/");

  console.log("\n" + "─".repeat(50));
  console.log("Done. README reflects current repo state.");
  console.log("\nTo add a new module:");
  console.log("  1. Push [Base].pptx, [Base].pdf, [Base]-Test.html,");
  console.log("     [Base]-AnswerKey.pptx, [Base]-AnswerKey.pdf to final-projects/");
  console.log("  2. Add one entry to MODULE_REGISTRY in update_readme.js");
  console.log("  3. Run: GITHUB_TOKEN=your_token node update_readme.js\n");
}

main().catch((err) => {
  console.error("\nFATAL:", err.message || err);
  process.exit(1);
});
