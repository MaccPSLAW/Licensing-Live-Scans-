/**
 * MACCESS INC. — BSIS Complete Security Guard Licensing Course Builder
 * Builds all required modules for California Guard Card (40-hour curriculum)
 *
 * MODULES BUILT:
 *   Pre-Registration (8 hrs — required before guard card application):
 *     1. Appropriate Use of Force (5 hrs) — BPC §7583.7 — AUF module
 *
 *   Mandatory Skills Training (4 hrs each — 16 hrs total, required within 6 months):
 *     2. Public Relations & Community (4 hrs) — BPC §7583.6(b)
 *     3. Observation & Documentation (4 hrs) — BPC §7583.6(b)
 *     4. Communication & Its Significance (4 hrs) — BPC §7583.6(b)
 *     5. Liability & Legal Aspects (4 hrs) — BPC §7583.6(b)
 *
 *   High-Value Electives (4 hrs each — count toward 32-hr skills total):
 *     6. Officer Safety (4 hrs) — BPC §7583.6(b)
 *     7. Handling Difficult People (4 hrs) — BPC §7583.6(b)
 *
 * Per module output: [Name].pptx, [Name]-Test.html, [Name]-AnswerKey.pptx, [Name]-AnswerKey.pdf
 * All files pushed to: MaccPSLAW/Licensing-Live-Scans- / PSLAW-Courses/final-projects/
 *
 * Fact-checked against: bsis.ca.gov/industries/g_train.shtml (June 2026)
 * Authority: BPC §7583.6, §7583.7, Title 16 CCR §643(b), SB 652 (eff. Jan 1 2026)
 */

const pptxgen   = require("pptxgenjs");
const { execSync } = require("child_process");
const fs        = require("fs");
const path      = require("path");
const https     = require("https");
const { autoUpdateReadme } = require("./update_readme");

const TOKEN = process.env.GITHUB_TOKEN;
const REPO  = "MaccPSLAW/Licensing-Live-Scans-";

// ── Brand ─────────────────────────────────────────────────────────
const NAVY  = "1B2B5E";
const GOLD  = "C9A84C";
const WHITE = "FFFFFF";
const GRAY  = "4A5568";
const RED   = "8B1A1A";
const GREEN = "1A5C3A";
const LIGHT = "F4F6FB";

// ══════════════════════════════════════════════════════════════════
// LIVE SCAN CONFIG
// ══════════════════════════════════════════════════════════════════
const LIVE_SCAN_CONFIG = {
  enabled:              false,
  certTemplatePath:     "PSLAW-Courses/live-scan/bsis_livescan_cert_template.pdf",
  certTemplateFilename: "bsis_livescan_cert_template.pdf",
  bsisORI:              "",
  atiPrefix:            "",
  notificationEmail:    "admin@gopslaw.com",
  showUploadSlot:       false,
  pendingMessage:       "Live Scan fingerprinting services are coming soon to MACCESS INC. Once active, you will be able to upload your BSIS Live Scan certificate directly here after completing fingerprinting at our facility.",
};

// ══════════════════════════════════════════════════════════════════
// SHARED PPTX HELPERS
// ══════════════════════════════════════════════════════════════════
const ms = () => ({ type:"outer", color:"000000", blur:6, offset:2, angle:45, opacity:0.1 });

function addHeader(sl, pres, title, mod) {
  sl.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.72, fill:{ color:NAVY } });
  sl.addShape(pres.shapes.RECTANGLE, { x:0, y:0.72, w:10, h:0.07, fill:{ color:GOLD } });
  sl.addText(title, { x:0.35, y:0, w:7.8, h:0.72, fontSize:17, bold:true, color:WHITE, fontFace:"Calibri", valign:"middle", margin:0 });
  sl.addText("MACCESS INC.  |  PPO #122729  |  "+mod, { x:8.0, y:0, w:1.85, h:0.72, fontSize:8, color:GOLD, fontFace:"Calibri", valign:"middle", align:"right", margin:0 });
}

function addFooter(sl, pg, total) {
  sl.addShape(pres.shapes.RECTANGLE, { x:0, y:5.45, w:10, h:0.3, fill:{ color:NAVY } });
  sl.addText("MACCESS INC.  |  Private Security LA Worldwide  |  PPO #122729  |  BSIS-Authorized Training Provider", { x:0.3, y:5.45, w:8.5, h:0.3, fontSize:7.5, color:GOLD, fontFace:"Calibri", valign:"middle", margin:0 });
  sl.addText(pg+"/"+total, { x:8.9, y:5.45, w:0.9, h:0.3, fontSize:7.5, color:WHITE, fontFace:"Calibri", valign:"middle", align:"right", margin:0 });
}

function titleSlide(pres, title, subtitle, hours, bpcRef, color) {
  color = color || NAVY;
  let sl = pres.addSlide();
  sl.background = { color };
  sl.addShape(pres.shapes.RECTANGLE, { x:0, y:4.6, w:10, h:1.15, fill:{ color:GOLD } });
  sl.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.1, fill:{ color:GOLD } });
  sl.addShape(pres.shapes.RECTANGLE, { x:0, y:0.1, w:0.5, h:4.5, fill:{ color:GOLD } });
  sl.addText("MACCESS INC.", { x:0.7, y:0.3, w:9, h:0.5, fontSize:13, bold:true, color:GOLD, fontFace:"Calibri", charSpacing:5, margin:0 });
  sl.addText("Private Security LA Worldwide  |  PPO #122729  |  BSIS-Authorized Training Provider", { x:0.7, y:0.8, w:9, h:0.28, fontSize:9, color:"CADCFC", fontFace:"Calibri", margin:0 });
  sl.addText(title, { x:0.7, y:1.2, w:9, h:2.1, fontSize:34, bold:true, color:WHITE, fontFace:"Calibri", margin:0 });
  sl.addText(subtitle, { x:0.7, y:3.35, w:9, h:0.5, fontSize:14, italic:true, color:"CADCFC", fontFace:"Calibri", margin:0 });
  sl.addText("Duration: "+hours+" Hours", { x:0.7, y:3.85, w:3, h:0.38, fontSize:11, color:GOLD, fontFace:"Calibri", margin:0 });
  sl.addText("Authority: "+bpcRef, { x:3.8, y:3.85, w:6, h:0.38, fontSize:11, color:GOLD, fontFace:"Calibri", margin:0 });
  sl.addText("MACCESS INC.", { x:0.7, y:4.68, w:4, h:0.45, fontSize:14, bold:true, color:NAVY, fontFace:"Calibri", valign:"middle", margin:0 });
  sl.addText(new Date().toLocaleDateString("en-US",{year:"numeric",month:"long"}), { x:5, y:4.68, w:4.8, h:0.45, fontSize:11, color:NAVY, fontFace:"Calibri", valign:"middle", align:"right", margin:0 });
  return sl;
}

function divSlide(pres, modNum, modTitle, bpcRef) {
  let sl = pres.addSlide();
  sl.background = { color:LIGHT };
  sl.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:0.55, h:5.625, fill:{ color:NAVY } });
  sl.addShape(pres.shapes.RECTANGLE, { x:0.55, y:0, w:9.45, h:0.08, fill:{ color:GOLD } });
  sl.addShape(pres.shapes.RECTANGLE, { x:0.55, y:5.545, w:9.45, h:0.08, fill:{ color:GOLD } });
  sl.addShape(pres.shapes.OVAL, { x:0.95, y:1.6, w:1.5, h:1.5, fill:{ color:NAVY }, shadow:ms() });
  sl.addText(modNum, { x:0.95, y:1.6, w:1.5, h:1.5, fontSize:36, bold:true, color:GOLD, fontFace:"Calibri", align:"center", valign:"middle", margin:0 });
  sl.addText("MODULE "+modNum, { x:2.7, y:1.55, w:7, h:0.38, fontSize:12, bold:true, color:GOLD, fontFace:"Calibri", charSpacing:4, margin:0 });
  sl.addText(modTitle, { x:2.7, y:1.98, w:7, h:1.3, fontSize:28, bold:true, color:NAVY, fontFace:"Calibri", margin:0 });
  sl.addText(bpcRef, { x:2.7, y:3.35, w:7, h:0.35, fontSize:11, italic:true, color:GRAY, fontFace:"Calibri", margin:0 });
  sl.addText("MACCESS INC.  |  PPO #122729", { x:0.7, y:5.15, w:9, h:0.3, fontSize:8, color:GRAY, fontFace:"Calibri", margin:0 });
  return sl;
}

function bulletCard(sl, pres, x, y, w, h, heading, bullets, headColor) {
  headColor = headColor || NAVY;
  sl.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill:{ color:WHITE }, rectRadius:0.1, shadow:ms() });
  sl.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h:0.38, fill:{ color:headColor }, rectRadius:0.1 });
  sl.addText(heading, { x:x+0.12, y, w:w-0.24, h:0.38, fontSize:11, bold:true, color:WHITE, fontFace:"Calibri", valign:"middle", margin:0 });
  const bText = bullets.map(b => ({ text:b+"\n", options:{ fontSize:10.5, color:"1A1A2E", fontFace:"Calibri", bullet:{ type:"bullet", indent:14 } } }));
  sl.addText(bText, { x:x+0.1, y:y+0.42, w:w-0.2, h:h-0.5, valign:"top", margin:4 });
}

function closingSlide(pres, title, bpcRef, hours) {
  let sl = pres.addSlide();
  sl.background = { color:NAVY };
  sl.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.08, fill:{ color:GOLD } });
  sl.addShape(pres.shapes.RECTANGLE, { x:0, y:5.545, w:10, h:0.08, fill:{ color:GOLD } });
  sl.addText("✓", { x:3.5, y:0.7, w:3, h:1.5, fontSize:72, color:GOLD, fontFace:"Calibri", align:"center", valign:"middle", margin:0 });
  sl.addText("Course Complete", { x:0, y:2.1, w:10, h:0.6, fontSize:28, bold:true, color:WHITE, fontFace:"Calibri", align:"center", margin:0 });
  sl.addText(title, { x:0.5, y:2.72, w:9, h:0.5, fontSize:15, italic:true, color:GOLD, fontFace:"Calibri", align:"center", margin:0 });
  sl.addText("Proceed to the online assessment. A score of 100% is required\nto receive your BSIS Certificate of Completion per "+bpcRef+".", {
    x:1.5, y:3.35, w:7, h:0.9, fontSize:12, color:"CADCFC", fontFace:"Calibri", align:"center", margin:0 });
  sl.addText("MACCESS INC.  |  Private Security LA Worldwide  |  PPO #122729\nBSIS-Authorized Training Provider  |  "+hours+"-Hour Course", {
    x:0, y:4.5, w:10, h:0.7, fontSize:9, color:"8899BB", fontFace:"Calibri", align:"center", margin:0 });
  return sl;
}

// Shared pres variable (reset per module)
let pres;

// ══════════════════════════════════════════════════════════════════
// MODULE 1: APPROPRIATE USE OF FORCE (5 HRS) — BPC §7583.7
// Official syllabus: bsis.ca.gov/industries/g_train.shtml §I.B
// ══════════════════════════════════════════════════════════════════
function buildAUF() {
  pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title  = "Appropriate Use of Force — BSIS Certification | MACCESS INC.";
  pres.author = "MACCESS INC.";

  const T   = "Appropriate Use of Force";
  const MOD = "AUF | BPC §7583.7";
  const REF = "BPC §7583.7 | DCA AUF Manual July 2023";
  const HRS = "5";

  titleSlide(pres, T, "Pre-Registration Training — BSIS Required", HRS, REF);

  // M1: Legal Standards
  divSlide(pres, "1", "Legal Standards for Use of Force", REF);
  let sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Legal Standards — Statutes & Obligations", MOD);
  bulletCard(sl,pres,0.3,0.9,4.5,4.4,"Governing Statutes",[
    "California Penal Code §835a — Legal use of force to effect arrest",
    "PC §836 — Peace officer arrest authority",
    "PC §837 — Citizen arrest authority (security guard standard)",
    "BPC §7583.7 — BSIS training mandate for use of force",
    "Title 16 CCR §643 — Certificate and record-keeping requirements",
    "4th Amendment (US Constitution) — Unreasonable seizure prohibition",
  ], NAVY);
  bulletCard(sl,pres,5.05,0.9,4.5,4.4,"Contractual & Employer Obligations",[
    "PPO (MACCESS INC.) bound by client site use-of-force policies",
    "Guard may NEVER exceed force authorized by contract or law",
    "Employer is vicariously liable for unauthorized force by guards",
    "All incidents reportable to BSIS per BPC §7583.2",
    "On-site supervisor must document and report within 24 hours",
    "Incident reports must be accurate, complete, and timely",
  ], GOLD);

  sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Criminal & Civil Liability for Use of Force", MOD);
  bulletCard(sl,pres,0.3,0.9,4.5,4.4,"Criminal Exposure",[
    "Battery (PC §242) — unlawful use of force against a person",
    "Assault (PC §240) — attempt or threat to apply force",
    "Kidnapping (PC §207) — unlawfully moving a detained person",
    "False imprisonment (PC §236) — unlawful detention",
    "Criminal prosecution is independent of civil suits",
    "Guard card suspension or revocation (BPC §480)",
  ], RED);
  bulletCard(sl,pres,5.05,0.9,4.5,4.4,"Civil Exposure",[
    "Excessive force tort — compensatory and punitive damages",
    "Wrongful death — liability if force results in death",
    "Intentional infliction of emotional distress",
    "Employer (PPO) vicarious liability for guard's actions",
    "Insurance consequences for MACCESS INC.",
    "Loss of guard card, PPO license, and employment",
  ], NAVY);

  // M2: Objectively Reasonable Force (In-Person)
  divSlide(pres, "2", "Objectively Reasonable Force (In-Person)", REF);
  sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "The Objectively Reasonable Standard", MOD);
  bulletCard(sl,pres,0.3,0.9,9.4,2.1,"What Is Objectively Reasonable? — Graham v. Connor (1989)",[
    "Force must be judged from perspective of a reasonable officer on scene — NOT with 20/20 hindsight",
    "Factors: severity of the offense, whether subject poses immediate threat, whether subject is actively resisting",
    "The standard is objective: would a reasonable person in the guard's position have used this level of force?",
  ], NAVY);
  bulletCard(sl,pres,0.3,3.15,4.5,2.1,"Restraint Techniques",[
    "Verbal commands — ALWAYS the first option",
    "Control holds — used only when justified",
    "Handcuffing — only after lawful citizen's arrest",
    "Document all physical contact in incident report",
  ], GOLD);
  bulletCard(sl,pres,5.05,3.15,4.5,2.1,"Force Continuum Options",[
    "1. Officer presence and verbal commands",
    "2. Soft empty-hand techniques (escort, control)",
    "3. Hard empty-hand techniques (strikes — rarely justified)",
    "4. Weapons (only if separately licensed and authorized)",
  ], GREEN);

  sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Force Options & Real-Life Scenarios", MOD);
  bulletCard(sl,pres,0.3,0.9,4.5,4.4,"Force Options — Key Rules",[
    "Force must be proportionate to the specific threat",
    "Escalate only as threat level increases",
    "DE-ESCALATE immediately when threat subsides",
    "Never use force as punishment or retaliation",
    "Never use force against passive resistance alone",
    "Document exact force used and exact reason in report",
    "Notify supervisor immediately after any use of force",
  ], NAVY);
  bulletCard(sl,pres,5.05,0.9,4.5,4.4,"Scenario Analysis (In-Person Discussion)",[
    "Scenario A: Subject verbally refuses to leave — appropriate response?",
    "Scenario B: Subject pushes guard once — escalation options?",
    "Scenario C: Subject flees after being stopped — chase or release?",
    "Scenario D: Subject is visibly intoxicated and combative — steps?",
    "Scenario E: Guard is threatened with an object — justification?",
    "All scenarios evaluated under objectively reasonable standard",
  ], GOLD);

  // M3: Duty to Intercede
  divSlide(pres, "3", "Duty to Intercede & Supervisory Responsibilities", REF);
  sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Duty to Intercede", MOD);
  bulletCard(sl,pres,0.3,0.9,4.5,4.4,"What Is the Duty to Intercede?",[
    "A guard who WITNESSES another guard using excessive force has a duty to intervene",
    "Failure to intercede = complicity in the unlawful act",
    "Applies even if the officer using excessive force is a supervisor",
    "Intercede verbally first: 'Stop — that is excessive force'",
    "Document the incident and report to BSIS per BPC §7583.2",
    "Protect yourself legally: report in writing immediately",
  ], RED);
  bulletCard(sl,pres,5.05,0.9,4.5,4.4,"Supervisory Responsibilities",[
    "Supervisors must report all use-of-force incidents per BPC §7583.2, §7583.4",
    "Required to submit written incident reports within required timeframes",
    "Must review all force incidents for policy compliance",
    "Train officers under them on proper force standards",
    "Supervisors may face personal liability for subordinate misconduct",
    "MACCESS INC. requires immediate supervisor notification",
  ], NAVY);

  // M4: De-escalation (In-Person)
  divSlide(pres, "4", "De-escalation & Interpersonal Communication (In-Person)", REF);
  sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "De-escalation — Four Core Concepts", MOD);
  const deConcepts = [
    ["1. Self-Control", ["Control your own emotions before engaging","Slow your breathing — speak calmly and clearly","Avoid commands that escalate: 'Calm down!' often backfires","Project authority through tone, not volume"]],
    ["2. Effective Communication", ["Use plain language — no jargon or threats","Acknowledge the subject's feelings without agreeing","Ask open questions: 'What can I help you with?'","Active listening reduces perceived threat immediately"]],
    ["3. Scene Assessment", ["Identify weapons, exits, bystanders, escape routes","Position yourself at a safe distance (6-10 feet)","Call for backup before force is needed","Never corner an agitated subject — leave an exit"]],
    ["4. Force Options Awareness", ["Always know your next step if de-escalation fails","Make sure subject knows they have a choice","Use time and distance as tactical tools","Each moment of calm is an opportunity to avoid force"]],
  ];
  deConcepts.forEach(([h,b],i) => {
    const col=i%2, row=Math.floor(i/2);
    bulletCard(sl,pres,0.3+col*4.85,0.88+row*2.45,4.5,2.2,h,b,[NAVY,GOLD,GREEN,RED][i]);
  });

  sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Tactical De-escalation — Time, Distance, Cover & Concealment", MOD);
  bulletCard(sl,pres,0.3,0.9,4.5,4.4,"Tactical Methods",[
    "TIME: Slow things down — rushing increases risk. More time = more options",
    "DISTANCE: Maintain reactionary gap (6+ feet from agitated subject)",
    "COVER: Solid barrier between you and potential threat (car, wall, counter)",
    "CONCEALMENT: Reduces visual target — not the same as cover",
    "Use all four together: create space, call for help, communicate",
    "Document tactical decisions in every incident report",
  ], NAVY);
  bulletCard(sl,pres,5.05,0.9,4.5,4.4,"Common De-escalation Mistakes",[
    "Moving too close — violates reactionary gap, increases threat",
    "Giving too many commands at once — causes confusion and resistance",
    "Using threatening language or challenges — escalates instantly",
    "Ignoring early warning signs of agitation",
    "Failing to request backup before the situation deteriorates",
    "Not documenting de-escalation attempts in incident reports",
  ], RED);

  // M5: Implicit/Explicit Bias & Cultural Competency
  divSlide(pres, "5", "Bias, Cultural Competency & Interactions with People with Disabilities", REF);
  sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Implicit & Explicit Bias — Definitions & Impact", MOD);
  bulletCard(sl,pres,0.3,0.9,4.5,4.4,"Implicit Bias",[
    "Unconscious attitudes or stereotypes that affect decisions",
    "Everyone has implicit biases — recognizing them is the first step",
    "Can affect who a guard stops, detains, or applies force against",
    "Bias-based policing violates civil rights — exposure for MACCESS INC.",
    "Strategy: slow down decisions, apply consistent standards to all",
    "Self-audit: 'Would I treat a different person the same way here?'",
  ], NAVY);
  bulletCard(sl,pres,5.05,0.9,4.5,4.4,"Explicit Bias & Cultural Competency",[
    "Explicit bias: conscious prejudice — strictly prohibited under California law",
    "Discrimination in security actions = civil and criminal liability",
    "Cultural competency: understanding how culture affects behavior",
    "Never interpret unfamiliar cultural behavior as suspicious by itself",
    "Language barriers: use clear simple language, seek interpreter if needed",
    "Diverse communities require diverse communication strategies",
  ], GOLD);

  sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Interacting with People with Disabilities & Behavioral Health Issues", MOD);
  bulletCard(sl,pres,0.3,0.9,4.5,4.4,"Recognizing Disability & Mental Health Situations",[
    "Unusual behavior may indicate disability, not criminal intent",
    "ADA (Americans with Disabilities Act) — guards must make reasonable accommodations",
    "Behavioral health crisis: agitation, confusion, self-talk, erratic movement",
    "Autism spectrum: may not make eye contact, may not respond to verbal commands",
    "Deaf/hard of hearing: may ignore verbal commands — not defiance",
    "Ask yourself: is this a safety threat or a disability manifestation?",
  ], NAVY);
  bulletCard(sl,pres,5.05,0.9,4.5,4.4,"De-escalation for Disabilities & Behavioral Health",[
    "Speak calmly and slowly — loud commands increase fear and agitation",
    "Reduce stimuli: lower voice, ask bystanders to move back",
    "Do NOT rush or physically escalate — can cause panic and injury",
    "Call for appropriate help: medical personnel, mental health response",
    "Document observed behaviors — not diagnoses — in incident report",
    "Respect dignity: treat every person with professionalism",
  ], GREEN);

  // M6: Mental Health, M7: Active Shooter (final content)
  divSlide(pres, "6", "Mental Health, Active Shooter & Force Scenario Training", REF);
  sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Mental Health in Security Work", MOD);
  bulletCard(sl,pres,0.3,0.9,4.5,4.4,"Categories of Mental Illness",[
    "Defined in BPC §631: serious mental conditions including schizophrenia, bipolar disorder, major depressive disorder",
    "Psychosis: may involve hallucinations, paranoia, detachment from reality",
    "Manic episodes: extreme agitation, rapid speech, impulsive behavior",
    "Depression: withdrawal, flat affect — not typically a threat",
    "Substance-induced mental states: may mimic psychiatric symptoms",
    "Guards are NOT mental health professionals — know your limits",
  ], NAVY);
  bulletCard(sl,pres,5.05,0.9,4.5,4.4,"Reducing Bias & Stigma",[
    "Mental illness is NOT the same as dangerousness",
    "Most people with mental illness are NOT violent",
    "Stigma can cause guards to escalate unnecessarily",
    "Approach with compassion — mental health calls require patience",
    "Always call for appropriate medical/mental health backup",
    "Document behaviors observed — not assumptions or diagnoses",
  ], GOLD);

  sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Active Shooter — Roles, Recognition & Response (In-Person)", MOD);
  bulletCard(sl,pres,0.3,0.9,4.5,4.4,"Recognizing an Active Shooter Situation",[
    "Multiple gunshots in rapid succession",
    "Screaming or running people indicating immediate danger",
    "Smell of gunpowder or visible weapon",
    "Reports from witnesses of person with weapon",
    "DO NOT investigate alone — call 911 immediately",
    "Your first priority: protect lives, then contain",
  ], RED);
  bulletCard(sl,pres,5.05,0.9,4.5,4.4,"Guard Responsibilities: Run-Hide-Fight (DHS Protocol)",[
    "RUN: Evacuate yourself and others if possible — leave belongings",
    "HIDE: Barricade in secure room — turn off lights, silence phones",
    "FIGHT: Last resort only — improvise weapons, commit to action",
    "CALL 911: Provide location, description, number of shooters",
    "When police arrive: hands visible, follow all commands",
    "Do NOT attempt to engage shooter unless no other option exists",
  ], NAVY);

  closingSlide(pres, T, REF, HRS);
  return pres;
}

// ══════════════════════════════════════════════════════════════════
// MODULE 2: PUBLIC RELATIONS & COMMUNITY (4 HRS) — BPC §7583.6(b)
// Official syllabus: g_train.shtml — Mandatory Course #1
// ══════════════════════════════════════════════════════════════════
function buildPR() {
  pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title  = "Public Relations & Community — BSIS Mandatory Course | MACCESS INC.";
  pres.author = "MACCESS INC.";

  const T   = "Public Relations & Community";
  const MOD = "PR | BPC §7583.6(b)";
  const REF = "BPC §7583.6(b) | Title 16 CCR §643(b)";
  const HRS = "4";

  titleSlide(pres, T, "Mandatory Skills Training — BSIS Required", HRS, REF, "1B3A60");

  // M1: Harassment & Discrimination
  divSlide(pres, "1", "Recognizing Gender & Racial Harassment & Discrimination", REF);
  let sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Harassment & Discrimination — Definitions & California Law", MOD);
  bulletCard(sl,pres,0.3,0.9,4.5,4.4,"Legal Definitions",[
    "Harassment: unwelcome conduct based on protected characteristic that creates hostile environment",
    "Racial harassment: slurs, stereotypes, hostile conduct based on race or ethnicity",
    "Gender harassment: unwelcome conduct based on sex, gender identity, or pregnancy",
    "California FEHA (Gov. Code §12940) prohibits all forms of workplace harassment",
    "Security guards are covered — as employees AND in their interactions with the public",
    "Bystander liability: failing to stop harassment can create employer liability",
  ], NAVY);
  bulletCard(sl,pres,5.05,0.9,4.5,4.4,"Guard's Responsibilities",[
    "NEVER engage in harassment or discriminatory enforcement",
    "Do not allow harassment of the public on your post",
    "Document and report all observed harassment incidents",
    "Treat all persons equally regardless of race, gender, religion, age, disability, national origin",
    "Enforcement decisions must be based on observed behavior ONLY",
    "Disparate enforcement = civil rights violation and liability for MACCESS INC.",
  ], RED);

  // M2: Respect, Stereotyping & Attitude
  divSlide(pres, "2", "Respect — Stereotyping, Attitude & Professionalism", REF);
  sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Respect in Security Work — Stereotyping & Professional Attitude", MOD);
  bulletCard(sl,pres,0.3,0.9,4.5,4.4,"Understanding Stereotyping",[
    "Stereotyping: applying generalized beliefs about a group to an individual",
    "Race, age, dress, or neighborhood are NEVER reasonable bases for suspicion",
    "Stereotyping increases civil liability and reduces effectiveness",
    "Every contact must be based on specific, articulable, observed behavior",
    "Racial profiling is prohibited under California law — Penal Code §13519.4",
    "Document the specific behavior — not the person's appearance or race",
  ], NAVY);
  bulletCard(sl,pres,5.05,0.9,4.5,4.4,"Professional Attitude Standards",[
    "Approach every contact professionally — first impressions matter",
    "Remain calm under pressure — your attitude sets the tone",
    "Treat every person as you would wish to be treated",
    "Command respect through professionalism — not intimidation",
    "Arrogance and aggression increase conflict and liability",
    "Your behavior reflects MACCESS INC. and the security profession",
  ], GOLD);

  // M3: Verbal Skills & Crisis Intervention
  divSlide(pres, "3", "Verbal Skills & Crisis Intervention", REF);
  sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Verbal Skills — Effective Communication in Crisis Situations", MOD);
  bulletCard(sl,pres,0.3,0.9,4.5,4.4,"Core Verbal Skills for Guards",[
    "Active listening: acknowledge what the person said before responding",
    "Paraphrasing: 'What I hear you saying is...' — confirms understanding",
    "Open-ended questions: 'What seems to be the problem?' vs. 'Stop!'",
    "Neutral tone: even, calm, non-threatening regardless of situation",
    "Avoid ultimatums early — leave room for the subject to comply voluntarily",
    "Use the person's name if known — humanizes the interaction",
  ], NAVY);
  bulletCard(sl,pres,5.05,0.9,4.5,4.4,"Crisis Intervention Principles",[
    "Slow the situation: rapid response often accelerates crises",
    "Establish rapport before giving directives",
    "Validate feelings: 'I can see you're frustrated' — does not mean agreement",
    "Offer choices: giving options restores a sense of control",
    "Know when to call for backup: do not try to manage crisis alone",
    "Document all crisis contacts — including what verbal tools were used",
  ], GREEN);

  // M4: Diversity
  divSlide(pres, "4", "Introduction to Diversity", REF);
  sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Diversity in Security — Los Angeles Context", MOD);
  bulletCard(sl,pres,0.3,0.9,4.5,4.4,"Understanding Diversity",[
    "Los Angeles is one of the most diverse cities in the world — guards serve everyone",
    "Diversity: race, ethnicity, religion, gender, age, disability, national origin, language",
    "Cultural competence: ability to interact respectfully with diverse populations",
    "Language barriers: use simple language, seek interpreter, use written communication",
    "Non-verbal communication varies across cultures — do not misinterpret",
    "Diversity awareness reduces conflict and improves public relations",
  ], NAVY);
  bulletCard(sl,pres,5.05,0.9,4.5,4.4,"Practical Application",[
    "Treat every person with dignity regardless of their background",
    "Do not make assumptions about criminal behavior based on language or appearance",
    "Recognize that unfamiliar behaviors may be cultural — not suspicious",
    "When uncertain: ask respectfully, do not demand",
    "Use professional interpreters or translation apps when available",
    "Build community trust by being fair, consistent, and respectful to all",
  ], GOLD);

  // M5: Substance Abuse & Mental Illness
  divSlide(pres, "5", "Substance Abuse & Mental Illness in the Field", REF);
  sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Recognizing Substance Abuse & Mental Illness on Post", MOD);
  bulletCard(sl,pres,0.3,0.9,4.5,4.4,"Signs of Substance Abuse",[
    "Slurred speech, unsteady gait, dilated or pinpoint pupils",
    "Extreme agitation or extreme sedation",
    "Smell of alcohol, unusual odors",
    "Erratic, unpredictable behavior",
    "Unconsciousness or unresponsiveness — call 911 immediately",
    "California Good Samaritan Law (HS §11376.5): protects callers reporting overdose",
  ], NAVY);
  bulletCard(sl,pres,5.05,0.9,4.5,4.4,"Signs of Mental Health Crisis",[
    "Incoherent or disorganized speech",
    "Responding to stimuli others cannot see (hallucinations)",
    "Extreme fear, paranoia, or aggression without apparent cause",
    "Repetitive movements or statements",
    "Approach: calm voice, slow movements, no sudden actions",
    "Call 911 or mobile crisis team — do not try to diagnose or treat",
  ], GOLD);

  // M6: Ethics & Professionalism
  divSlide(pres, "6", "Ethics & Professionalism", REF);
  sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Ethics, Appearance & Command Presence", MOD);
  bulletCard(sl,pres,0.3,0.9,4.5,2.1,"Professional Appearance Standards",[
    "Uniform clean, pressed, complete — no personal modifications without authorization",
    "Badge, patch, and cap insignia worn per MACCESS INC. BPCI policy",
    "Grooming: neat, professional at all times",
    "Appearance conveys authority and builds public trust",
  ], NAVY);
  bulletCard(sl,pres,5.05,0.9,4.5,2.1,"Command Presence",[
    "Command presence: non-verbal projection of professionalism and authority",
    "Posture, eye contact, calm demeanor — not aggression",
    "Gained through preparation, training, and consistent professionalism",
    "Reduces need for force: people comply with authority they respect",
  ], GOLD);
  bulletCard(sl,pres,0.3,3.15,9.4,2.1,"Ethical Standards for MACCESS INC. Guards",[
    "Honesty: never falsify reports, logs, or certificates | Integrity: act the same whether watched or not",
    "Accountability: own your mistakes and report them | Fairness: consistent enforcement for all persons equally",
    "Loyalty: to the law first, then MACCESS INC., then client | Compassion: professional care for public wellbeing",
  ], RED);

  closingSlide(pres, T, REF, HRS);
  return pres;
}


// ══════════════════════════════════════════════════════════════════
// MODULE 3: OBSERVATION & DOCUMENTATION (4 HRS) — BPC §7583.6(b)
// Official syllabus: g_train.shtml — Mandatory Course #2
// ══════════════════════════════════════════════════════════════════
function buildOD() {
  pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title  = "Observation & Documentation — BSIS Mandatory Course | MACCESS INC.";
  pres.author = "MACCESS INC.";

  const T   = "Observation & Documentation";
  const MOD = "OD | BPC §7583.6(b)";
  const REF = "BPC §7583.6(b) | Title 16 CCR §643(b)";
  const HRS = "4";

  titleSlide(pres, T, "Mandatory Skills Training — BSIS Required", HRS, REF, "1A3A2A");

  // M1: Report Writing
  divSlide(pres, "1", "Report Writing", REF);
  let sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Report Writing — Standards & Legal Requirements", MOD);
  bulletCard(sl,pres,0.3,0.9,4.5,4.4,"Five Standards of a BSIS-Compliant Report",[
    "FACTUAL — Only what you personally saw, heard, or did. No speculation.",
    "ACCURATE — Correct times, dates, names, descriptions. Verify before submitting.",
    "COMPLETE — All relevant persons, actions, outcomes, and witnesses included.",
    "CLEAR — Plain English, logical order, no undefined abbreviations.",
    "TIMELY — Written as close to the incident as possible, ideally within 1 hour.",
  ], NAVY);
  bulletCard(sl,pres,5.05,0.9,4.5,4.4,"Report Integrity Rules",[
    "Write in first person: 'I observed...', 'I heard...', 'I did...'",
    "Never speculate: 'Subject appeared nervous' ✓  |  'Subject was guilty' ✗",
    "Correct errors by single line through, initials, date — never erase or white-out",
    "Reports are legal documents — may be used in civil or criminal proceedings",
    "Never alter a submitted report without supervisor authorization",
    "Falsifying a report is a crime and grounds for BSIS revocation",
  ], RED);

  sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "What to Include in an Incident Report", MOD);
  bulletCard(sl,pres,0.3,0.9,9.4,4.4,"Required Elements — Every Security Incident Report",[
    "Date, time, exact location of the incident (address, floor, area)",
    "Description of events in chronological order — what happened first, second, third",
    "Parties involved: full descriptions (sex, race, approximate age, height, weight, hair, clothing, distinctive marks)",
    "Witnesses: names and contact information if available",
    "Actions taken by the guard: verbal commands given, physical actions, calls made, persons notified",
    "Evidence observed or secured: describe in detail, do not move unless necessary for safety",
    "Outcome: subject detained, released, turned over to police, medical response, etc.",
    "Your name, guard card number, and MACCESS INC. PPO #122729 on every report",
  ], NAVY);

  // M2: English as a Second Language
  divSlide(pres, "2", "English Language Documentation Requirements", REF);
  sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Documentation Language & Witness Communication", MOD);
  bulletCard(sl,pres,0.3,0.9,4.5,4.4,"English-Language Documentation",[
    "All official BSIS reports must be written in English",
    "If your primary language is not English, you are still required to document in English",
    "Seek assistance from a bilingual supervisor if needed — do not omit information",
    "Translation apps may be used to assist communication — document their use",
    "Quotes from non-English speakers: document in English, note original language used",
    "BSIS audit may review reports — non-English documentation may be rejected",
  ], NAVY);
  bulletCard(sl,pres,5.05,0.9,4.5,4.4,"Communicating with Non-English Speakers",[
    "Use simple, clear language — avoid jargon and complex commands",
    "Non-verbal communication: slow gestures, pointing, written notes",
    "Translation apps (Google Translate, etc.) — useful but imperfect, note their use",
    "Never assume non-English speakers are suspicious or uncooperative",
    "Seek a bilingual colleague or professional interpreter for critical communications",
    "Document the method used and the best understanding of what was communicated",
  ], GOLD);

  // M3: Observation & Patrol
  divSlide(pres, "3", "Observation & Patrol Techniques", REF);
  sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Patrol Techniques — Effectiveness & Documentation", MOD);
  bulletCard(sl,pres,0.3,0.9,4.5,4.4,"Effective Patrol Strategies",[
    "Vary patrol route and timing — predictable patrols are easily exploited",
    "Know the baseline: what is normal at your post so anomalies stand out",
    "Use all senses: sight, sound, smell (smoke, gas, chemicals)",
    "Document patrol rounds: log start/end time, route, and all observations",
    "Key checkpoints: all access points, parking areas, critical assets, blind spots",
    "Report anomalies immediately — propped doors, unfamiliar vehicles, broken locks",
  ], NAVY);
  bulletCard(sl,pres,5.05,0.9,4.5,4.4,"Observation Best Practices",[
    "Scan systematically — do not focus on a single point",
    "Distance observation before approach — assess before committing",
    "Look for the '6 Ps': People, Positions, Patterns, Problems, Property, Processes",
    "Night observation: use peripheral vision, not direct stare",
    "Use available technology: CCTV, monitors — document camera IDs and timestamps",
    "If something feels wrong, trust your training — investigate and document",
  ], GOLD);

  // M4: Asking Appropriate Questions
  divSlide(pres, "4", "Asking Appropriate Questions", REF);
  sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Questioning Techniques for Security Guards", MOD);
  bulletCard(sl,pres,0.3,0.9,4.5,4.4,"Open vs. Closed Questions",[
    "Open-ended: 'What brings you here today?' — encourages narrative, gathers more information",
    "Closed: 'Were you here yesterday?' — confirms specific facts",
    "Use open questions first, then closed to confirm details",
    "Avoid leading questions: 'You were trying to steal, weren't you?' — inadmissible",
    "Neutral framing: 'Can you help me understand what happened?' — non-accusatory",
    "Document: record exact quotes in your report — 'He said: I was just looking around'",
  ], NAVY);
  bulletCard(sl,pres,5.05,0.9,4.5,4.4,"Legal Limits on Questioning",[
    "Security guards CANNOT compel anyone to answer questions",
    "Refusal to answer is NOT reasonable suspicion for detention",
    "Do not threaten consequences for refusing to answer",
    "Miranda rights do NOT apply to private security — but coercive tactics create liability",
    "Share information with law enforcement when acting in official capacity",
    "All questioning of suspects should be documented in the incident report",
  ], RED);

  // M5: Observing Suspects & Suspicious Activity
  divSlide(pres, "5", "Observing Suspects & Suspicious Activity", REF);
  sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Documenting Suspicious Persons & Activity", MOD);
  bulletCard(sl,pres,0.3,0.9,4.5,4.4,"Suspect Description — Standard Format",[
    "Sex — Male, Female, Non-binary (as apparent)",
    "Race/ethnicity — as observed, non-judgmentally",
    "Approximate age",
    "Height and weight (estimate if not known)",
    "Hair: color, length, style",
    "Eyes: color if observed",
    "Clothing: colors, brands, distinctive items, footwear",
    "Distinctive features: tattoos, scars, piercings, glasses",
    "Direction of travel or last known location",
  ], NAVY);
  bulletCard(sl,pres,5.05,0.9,4.5,4.4,"What Counts as Suspicious Activity?",[
    "Photographing or mapping security equipment, cameras, or access points",
    "Testing locked doors or probing entry points repeatedly",
    "Loitering without apparent purpose near sensitive areas",
    "Vehicles circling the property multiple times",
    "Persons who do not belong and cannot explain their presence",
    "Unattended bags or packages left in unusual locations",
    "Individuals watching guard patrol patterns closely",
    "Document behavior only — never document race as the reason for suspicion",
  ], GOLD);

  closingSlide(pres, T, REF, HRS);
  return pres;
}

// ══════════════════════════════════════════════════════════════════
// MODULE 4: COMMUNICATION & ITS SIGNIFICANCE (4 HRS) — BPC §7583.6(b)
// Official syllabus: g_train.shtml — Mandatory Course #3
// ══════════════════════════════════════════════════════════════════
function buildComm() {
  pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title  = "Communication & Its Significance — BSIS Mandatory Course | MACCESS INC.";
  pres.author = "MACCESS INC.";

  const T   = "Communication & Its Significance";
  const MOD = "COMM | BPC §7583.6(b)";
  const REF = "BPC §7583.6(b) | Title 16 CCR §643(b)";
  const HRS = "4";

  titleSlide(pres, T, "Mandatory Skills Training — BSIS Required", HRS, REF, "1A2A4A");

  // M1: Internal — Protocols
  divSlide(pres, "1", "Internal Communication — Protocols, Radio & Technology", REF);
  let sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Internal Communication Protocols — Chain of Command", MOD);
  bulletCard(sl,pres,0.3,0.9,4.5,4.4,"Who to Contact & When",[
    "Post orders specify the exact chain of command for your assignment",
    "Always know before shift: supervisor name, contact number, escalation path",
    "Immediate supervisor: routine contacts, minor incidents, scheduling",
    "Site manager / MACCESS INC. dispatch: use-of-force incidents, arrests, media",
    "Emergency (911): any threat to life, active crime, medical emergency",
    "Log every contact: who, when, what was said, what action was taken",
  ], NAVY);
  bulletCard(sl,pres,5.05,0.9,4.5,4.4,"Technology: Radios, CCTV & Monitors",[
    "Radio protocol: listen before transmitting — do not interrupt",
    "Identify yourself on every transmission: '[Post/Name] to [Recipient]...'",
    "Keep transmissions brief and professional — radios are monitored",
    "CCTV: log timestamps and camera IDs for any incident footage",
    "Access control panels: know your assigned codes and reset procedures",
    "Alarm systems: know each alarm type, required response, and reset authority",
    "Technology failure: know the manual backup procedure for every system",
  ], GOLD);

  // M2: External — Emergency / First Responders
  divSlide(pres, "2", "External Communication — Emergency & First Responders", REF);
  sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Calling 911 & Briefing Law Enforcement", MOD);
  bulletCard(sl,pres,0.3,0.9,4.5,4.4,"911 Protocol — What to Communicate",[
    "1. YOUR LOCATION first: address, building, floor, exact area",
    "2. Nature of emergency: crime in progress, medical, fire, active shooter",
    "3. Number of persons involved and their location",
    "4. Suspect description if applicable",
    "5. Any weapons visible or reported",
    "6. Your name and callback number — STAY ON THE LINE",
    "Do not hang up until dispatcher tells you to",
  ], RED);
  bulletCard(sl,pres,5.05,0.9,4.5,4.4,"Briefing Law Enforcement on Arrival",[
    "Hands visible at all times — announce yourself clearly",
    "Provide brief verbal briefing: situation, parties, hazards, what you have done",
    "Transfer custody of any citizen's arrest subject immediately",
    "Make your notes and observations available to officers",
    "Do not give opinions — give facts and let officers investigate",
    "After handoff: complete your incident report and notify MACCESS INC.",
  ], NAVY);

  // M3: External — Medical Personnel
  divSlide(pres, "3", "External Communication — Medical Personnel & City Services", REF);
  sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Working with Medical Personnel & City / Government Services", MOD);
  bulletCard(sl,pres,0.3,0.9,4.5,4.4,"Medical Personnel (EMS/Paramedics)",[
    "Call 911 immediately for any medical emergency — do not delay",
    "Clear a path for paramedics — move bystanders back",
    "Brief EMS on scene: what you observed, time of onset, any known conditions",
    "Do NOT share patient information with bystanders or media",
    "If patient is also a detainee: notify police before EMS departs",
    "After EMS arrives: your role is crowd control and scene security",
  ], NAVY);
  bulletCard(sl,pres,5.05,0.9,4.5,4.4,"City & Government Services",[
    "Code enforcement: allow entry, notify property manager immediately, document",
    "Fire department: execute evacuation plan, meet at command post, provide building info",
    "Utilities (gas, water, power): call utility emergency line + 911, evacuate if directed",
    "Health inspectors, building inspectors: cooperative access, notify management",
    "All government agency visits must be logged in your shift report",
    "Media: no comments — refer all media inquiries to MACCESS INC. management",
  ], GOLD);

  // M4: Police/Sheriff & Communication Principles
  divSlide(pres, "4", "Communication with Law Enforcement & Non-Verbal Communication", REF);
  sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Law Enforcement Communication & Non-Verbal Skills", MOD);
  bulletCard(sl,pres,0.3,0.9,4.5,4.4,"Communicating with Police & Sheriff",[
    "Always identify yourself as a security guard — not a police officer",
    "Transferring a citizen's arrest: state the basis for the arrest clearly",
    "Provide written notes or incident report draft if available",
    "Never impede a law enforcement investigation",
    "If asked to do something you believe is unlawful, comply and document",
    "Follow-up: note officer name, badge number, agency, and report number",
  ], NAVY);
  bulletCard(sl,pres,5.05,0.9,4.5,4.4,"Non-Verbal Communication",[
    "Body language accounts for majority of communication impact",
    "Posture: upright and alert — signals confidence and authority",
    "Eye contact: professional, not aggressive staring",
    "Hands: visible and open — closed fists or crossed arms = escalation",
    "Proximity: maintain appropriate distance — do not crowd",
    "Tone of voice: calm, controlled, even — never match agitated energy",
    "Facial expression: neutral and professional — avoid contempt",
  ], GOLD);

  closingSlide(pres, T, REF, HRS);
  return pres;
}

// ══════════════════════════════════════════════════════════════════
// MODULE 5: LIABILITY & LEGAL ASPECTS (4 HRS) — BPC §7583.6(b)
// Official syllabus: g_train.shtml — Mandatory Course #4
// ══════════════════════════════════════════════════════════════════
function buildLiability() {
  pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title  = "Liability & Legal Aspects — BSIS Mandatory Course | MACCESS INC.";
  pres.author = "MACCESS INC.";

  const T   = "Liability & Legal Aspects";
  const MOD = "LAW | BPC §7583.6(b)";
  const REF = "BPC §7583.6(b) | PC §837 | Title 16 CCR §643(b)";
  const HRS = "4";

  titleSlide(pres, T, "Mandatory Skills Training — BSIS Required", HRS, REF, "3A1A1A");

  // M1: Personal / Contractor / Employer Liability
  divSlide(pres, "1", "Personal, Contractor & Employer Liability", REF);
  let sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Three Tiers of Liability in Private Security", MOD);
  bulletCard(sl,pres,0.3,0.9,2.95,4.4,"PERSONAL LIABILITY",[
    "Guard is personally liable for their own wrongful acts",
    "Employer authorization does NOT shield personal liability for crimes",
    "False arrest, battery, and defamation are personal torts",
    "BSIS guard card can be individually revoked",
    "Criminal charges against the guard personally",
  ], RED);
  bulletCard(sl,pres,3.4,0.9,2.95,4.4,"CONTRACTOR / PPO",[
    "MACCESS INC. as PPO: vicariously liable under respondeat superior",
    "Negligent hiring: failure to vet leads to liability",
    "Negligent training: failure to certify = increased exposure",
    "PPO license can be disciplined or revoked",
    "Client contracts: PPO indemnifies client for guard acts",
  ], NAVY);
  bulletCard(sl,pres,6.5,0.9,3.05,4.4,"PROPERTY OWNER",[
    "Client may share liability if they directed the guard's actions",
    "Unsafe premises that contribute to incident = owner liability",
    "Contractual indemnification may shift liability back to PPO",
    "Client may be sued directly if guard is employee vs. contractor",
    "Joint and several liability in multi-party incidents",
  ], GOLD);

  // M2: Criminal, Civil, Administrative Liability
  divSlide(pres, "2", "Criminal, Civil & Administrative Liability", REF);
  sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Types of Legal Liability — Criminal, Civil & BSIS Administrative", MOD);
  bulletCard(sl,pres,0.3,0.9,4.5,4.4,"Criminal Liability",[
    "PC §242 — Battery: willful unlawful use of force or violence on another person",
    "PC §240 — Assault: unlawful attempt to commit violent injury",
    "PC §236 — False Imprisonment: unlawful restraint of personal liberty",
    "PC §207 — Kidnapping: forcible, unlawful movement of a person",
    "PC §538d — Impersonating a peace officer — serious criminal offense",
    "Theft by a guard of subject's property during detention",
  ], RED);
  bulletCard(sl,pres,5.05,0.9,4.5,4.4,"Civil & Administrative Liability",[
    "Civil: false arrest, battery, emotional distress, invasion of privacy — compensatory + punitive damages",
    "ADA violations: discrimination against persons with disabilities — federal civil rights exposure",
    "FEHA violations: discriminatory enforcement in California — state civil rights exposure",
    "BSIS Administrative: guard card suspension or revocation under BPC §480",
    "PPO license: discipline, conditions, suspension, or revocation",
    "All three types can arise simultaneously from a single incident",
  ], NAVY);

  // M3: BSIS Code & Regulations
  divSlide(pres, "3", "BSIS Code & Regulations", REF);
  sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "BSIS Code — Key Statutes & Regulations Every Guard Must Know", MOD);
  const regs = [
    ["BPC §7583.6","Training requirements: 8-hr PTA/AUF pre-registration; 32-hr skills within 6 months (16 within 30 days); 8-hr annual CE"],
    ["BPC §7583.7","Powers to Arrest and Appropriate Use of Force — 100% exam score required. Single provider, within 6 months of application (SB 652, eff. Jan 1 2026)"],
    ["BPC §7583.9","Criminal history background check — DOJ + FBI via Live Scan required for all applicants"],
    ["BPC §7583.20","Guard card renewal — must renew within 60 days of expiration or registration is canceled; $44 renewal fee"],
    ["BPC §480","Grounds for denial / revocation of guard card — certain criminal convictions"],
    ["BPC §7583.2","Incident reporting — PPO must report use-of-force incidents to BSIS"],
    ["Title 16 CCR §643(b)","Certificate of Completion — must include: provider name, BSIS license number, course name, dates, hours, and unique serial number"],
    ["BPC §7582.1","Definition of security guard and licensed PPO — scope of employment"],
  ];
  regs.forEach(([code, desc], i) => {
    const y = 0.92 + i * 0.56;
    sl.addShape(pres.shapes.ROUNDED_RECTANGLE, { x:0.3, y, w:9.4, h:0.5, fill:{ color: i%2===0 ? WHITE : LIGHT }, rectRadius:0.06 });
    sl.addText(code, { x:0.4, y, w:1.7, h:0.5, fontSize:9.5, bold:true, color:NAVY, fontFace:"Calibri", valign:"middle", margin:3 });
    sl.addText(desc, { x:2.2, y, w:7.4, h:0.5, fontSize:9.5, color:"1A1A2E", fontFace:"Calibri", valign:"middle", margin:3 });
  });

  // M4: Role of a Security Guard
  divSlide(pres, "4", "The Role of a Security Guard Under California Law", REF);
  sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Legal Role, Authority & Limitations — BPC §7582.1 | PC §837", MOD);
  bulletCard(sl,pres,0.3,0.9,4.5,4.4,"What Security Guards CAN Do",[
    "Protect persons and property on assigned post (BPC §7582.1)",
    "Make citizen's arrests under PC §837 when lawful conditions are met",
    "Detain shoplifting suspects under PC §490.5 (Shopkeeper's Privilege) with probable cause from personal observation",
    "Use reasonable and proportionate force during lawful citizen's arrest",
    "Observe and document incidents for law enforcement",
    "Request that persons leave private property — and arrest for trespass if they refuse (PC §602 in your presence)",
  ], GREEN);
  bulletCard(sl,pres,5.05,0.9,4.5,4.4,"What Security Guards CANNOT Do",[
    "Claim or imply peace officer authority — PC §538d (criminal offense)",
    "Conduct warrantless searches beyond safety pat-down during lawful detention",
    "Compel answers to questions",
    "Hold a citizen's arrest subject longer than necessary before delivering to police",
    "Carry firearms without a separate BSIS Firearms Permit and training",
    "Act outside their assigned post or off-duty (no authority beyond assigned scope)",
    "Use force as punishment or after threat has ended",
  ], RED);

  closingSlide(pres, T, REF, HRS);
  return pres;
}

// ══════════════════════════════════════════════════════════════════
// MODULE 6: OFFICER SAFETY (4 HRS) — BSIS Elective
// Official syllabus: g_train.shtml — Elective Course #4
// ══════════════════════════════════════════════════════════════════
function buildOfficerSafety() {
  pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title  = "Officer Safety — BSIS Elective Course | MACCESS INC.";
  pres.author = "MACCESS INC.";

  const T   = "Officer Safety";
  const MOD = "OS | BPC §7583.6(b)";
  const REF = "BPC §7583.6(b) | OSHA | Cal/OSHA";
  const HRS = "4";

  titleSlide(pres, T, "Elective Skills Training — Counts Toward 32-Hour Requirement", HRS, REF, "1A1A3A");

  // M1: Threat Assessment
  divSlide(pres, "1", "Threat Assessment", REF);
  let sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Threat Assessment — Recognizing & Evaluating Risk", MOD);
  bulletCard(sl,pres,0.3,0.9,4.5,4.4,"Situational Awareness Levels (Cooper Color Code)",[
    "WHITE — Unaware, relaxed, unprepared: never appropriate on duty",
    "YELLOW — Relaxed alertness: baseline for all on-duty guards",
    "ORANGE — Focused alert: specific person or situation identified as potential threat",
    "RED — Ready to act: threat confirmed, response initiated",
    "Always return to Yellow after a threat resolves — avoid over-vigilance",
  ], NAVY);
  bulletCard(sl,pres,5.05,0.9,4.5,4.4,"Pre-Incident Threat Indicators",[
    "Behavioral indicators: pacing, excessive sweating, avoidance of eye contact",
    "Physical indicators: concealed bulge, unusual clothing for weather",
    "Environmental indicators: unfamiliar vehicle, unattended items, surveillance behavior",
    "Verbal indicators: direct or indirect threats, statements about violence",
    "Trust your trained instincts — document and report before a threat materializes",
    "Contact your supervisor or 911 based on threat level — do not underreact",
  ], GOLD);

  // M2: Subject Contact
  divSlide(pres, "2", "Subject Contact — Safe Approach & Positioning", REF);
  sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Safe Subject Contact Procedures", MOD);
  bulletCard(sl,pres,0.3,0.9,4.5,4.4,"Approach Principles",[
    "Never approach a potentially hostile subject alone if backup is available",
    "Maintain reactionary gap: 6-10 feet from unknown subject",
    "Position at 45-degree angle — not directly in front of subject",
    "Keep dominant hand free and available",
    "Announce yourself clearly: 'MACCESS INC. Security — may I speak with you?'",
    "Scan the subject's hands first — hands are where threats originate",
  ], NAVY);
  bulletCard(sl,pres,5.05,0.9,4.5,4.4,"Positioning & Cover",[
    "Cover: solid barrier that stops projectiles (car engine block, concrete wall)",
    "Concealment: hides you from view but does not stop projectiles",
    "Use cover whenever threat level elevates — do not expose yourself unnecessarily",
    "Interview stance: feet shoulder-width, weight balanced, non-confrontational",
    "Tactical L: position yourself so two guards are not aligned — reduces dual exposure",
    "Always have an exit: never position yourself where you cannot withdraw",
  ], GOLD);

  // M3: Safety Awareness
  divSlide(pres, "3", "Safety Awareness — Everyday Guard Safety Practices", REF);
  sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Personal Safety Awareness on Post", MOD);
  bulletCard(sl,pres,0.3,0.9,9.4,4.4,"Daily Safety Practices Every Guard Must Follow",[
    "Pre-shift briefing: know current threats, incidents, and persons of interest before starting patrol",
    "Equipment check: verify radio, flashlight, PPE, and any authorized equipment before every shift",
    "Buddy system: for high-risk contacts, always request backup before approaching",
    "Never turn your back on an uncontrolled subject",
    "Know the location of every first aid kit and AED at your post",
    "Notify dispatch before and after any significant contact — do not go silent",
    "Hydration and fatigue: impaired guards create safety risks — rest and hydrate between shifts",
    "Personal safety extends off-duty: do not wear uniform unnecessarily in public post-shift",
  ], NAVY);

  // M4: Blood Borne Pathogens
  divSlide(pres, "4", "Blood Borne Pathogens & Hazardous Materials", REF);
  sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Blood Borne Pathogens (BBP) & Environmental Hazards", MOD);
  bulletCard(sl,pres,0.3,0.9,4.5,4.4,"Blood Borne Pathogen Precautions (OSHA 29 CFR 1910.1030)",[
    "BBPs include: HIV, Hepatitis B, Hepatitis C, and others — transmitted via blood or body fluids",
    "Assume all blood and body fluids are potentially infectious",
    "Standard precautions: gloves before any contact with blood or body fluids",
    "Avoid touching eyes, nose, or mouth until hands are washed",
    "If exposed: wash area immediately with soap and water, report to supervisor, seek medical evaluation",
    "MACCESS INC. is required to provide BBP training and PPE at no cost",
  ], NAVY);
  bulletCard(sl,pres,5.05,0.9,4.5,4.4,"Environmental & Hazardous Materials",[
    "Know the location of MSDSs (Safety Data Sheets) for chemicals at your post",
    "Do not enter a chemical spill area without proper PPE and training",
    "Gas odor: do not use radio or electrical switches — evacuate and call 911",
    "Suspicious substances: do not touch — isolate the area and call 911 HazMat",
    "Cal/OSHA requires guards to report workplace hazards they observe",
    "Document all hazardous materials incidents in your shift report",
  ], RED);

  closingSlide(pres, T, REF, HRS);
  return pres;
}

// ══════════════════════════════════════════════════════════════════
// MODULE 7: HANDLING DIFFICULT PEOPLE (4 HRS) — BSIS Elective
// Official syllabus: g_train.shtml — Elective Course #10
// ══════════════════════════════════════════════════════════════════
function buildHDP() {
  pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title  = "Handling Difficult People — BSIS Elective Course | MACCESS INC.";
  pres.author = "MACCESS INC.";

  const T   = "Handling Difficult People";
  const MOD = "HDP | BPC §7583.6(b)";
  const REF = "BPC §7583.6(b) | Title 16 CCR §643(b)";
  const HRS = "4";

  titleSlide(pres, T, "Elective Skills Training — Counts Toward 32-Hour Requirement", HRS, REF, "3A1A3A");

  // M1: Communications
  divSlide(pres, "1", "Communication Strategies with Difficult Individuals", REF);
  let sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Communication Fundamentals — Difficult Person Interactions", MOD);
  bulletCard(sl,pres,0.3,0.9,4.5,4.4,"Communication Principles",[
    "Separate the person from the problem — address behavior, not character",
    "Lead with empathy: 'I understand this is frustrating' — disarms defensiveness",
    "Use 'I' statements: 'I need you to lower your voice' vs. 'You are being disruptive'",
    "Avoid 'You always' or 'You never' — generalizations escalate conflict",
    "Silence is a tool: pause after speaking — do not fill every gap",
    "Speak to the adult: treat everyone as capable of making a better choice",
  ], NAVY);
  bulletCard(sl,pres,5.05,0.9,4.5,4.4,"Listening Under Pressure",[
    "Let difficult people vent briefly — interrupting increases hostility",
    "Acknowledge what was said before responding: 'I hear you. Here is what I can do...'",
    "Avoid interrupting — even when you disagree",
    "Watch for underlying needs: anger often masks fear, humiliation, or helplessness",
    "Paraphrase what you heard to show understanding and reduce misunderstanding",
    "Take notes — visible note-taking signals that you are taking the person seriously",
  ], GOLD);

  // M2: Conflict Management
  divSlide(pres, "2", "Conflict Management & Speaking Constructively", REF);
  sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Conflict Management — De-fusing & Resolution", MOD);
  bulletCard(sl,pres,0.3,0.9,4.5,4.4,"Stages of Conflict Escalation",[
    "POTENTIAL: tension exists but conflict has not erupted — intervene here",
    "PERCEIVED: parties believe conflict exists — clarify before it escalates",
    "FELT: emotional — hostility rising — active listening and empathy needed",
    "MANIFEST: open conflict — requires structured de-escalation",
    "AFTERMATH: conflict subsided — document, follow up, and debrief",
    "Best outcomes: intervene at Potential or Perceived stage",
  ], NAVY);
  bulletCard(sl,pres,5.05,0.9,4.5,4.4,"Speaking Constructively",[
    "Focus on behavior, not identity: 'That action is a problem' vs. 'You are a problem'",
    "State expectations clearly: 'I need you to step back to this line'",
    "Give a reason: 'For everyone's safety, I need you to wait here'",
    "Offer a realistic choice: 'You can wait calmly, or I will need to ask you to leave'",
    "Follow through: empty threats destroy credibility and escalate next encounter",
    "Debrief after difficult interactions — identify what worked and what to improve",
  ], GREEN);

  // M3: Valuing Diversity & Negotiating
  divSlide(pres, "3", "Valuing Diversity & Negotiating Peaceful Outcomes", REF);
  sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Diversity in Difficult Encounters & Negotiation Principles", MOD);
  bulletCard(sl,pres,0.3,0.9,4.5,4.4,"Valuing Diversity in Conflict",[
    "Cultural norms: some cultures express disagreement loudly — not necessarily threatening",
    "Language barriers in conflict: slow down, simplify, do not raise your voice",
    "Age: older persons may respond differently to authority — adjust tone accordingly",
    "Gender dynamics: be aware of perception in same-gender vs. cross-gender conflicts",
    "Disability: behavioral differences may not indicate hostility — assess context",
    "Neutral, consistent enforcement: apply the same standards to everyone",
  ], NAVY);
  bulletCard(sl,pres,5.05,0.9,4.5,4.4,"Basic Negotiation for Security Guards",[
    "Interests vs. positions: understand what the person actually needs, not just what they are demanding",
    "Find common ground: 'We both want to resolve this calmly'",
    "Offer options: giving choices reduces resistance and increases compliance",
    "Avoid win/lose framing: outcomes where both parties feel heard are more durable",
    "Know your limits: you cannot negotiate away the law or post orders",
    "When negotiation fails: escalate to supervisor — do not make unauthorized concessions",
  ], GOLD);

  // M4: Verbal Diffusion
  divSlide(pres, "4", "Verbal Diffusion — Defusing Hostile & Aggressive Behavior", REF);
  sl = pres.addSlide(); sl.background={color:LIGHT};
  addHeader(sl, pres, "Verbal Diffusion Techniques", MOD);
  bulletCard(sl,pres,0.3,0.9,4.5,4.4,"Verbal Diffusion Techniques",[
    "Lower your own voice when the other person raises theirs — modeling calm",
    "Name the emotion: 'It sounds like you are really frustrated right now'",
    "Validate without agreeing: 'I understand why you would feel that way'",
    "Redirect: 'Let's focus on how we can fix this' — moves from past to future",
    "Strategic agreement: agree on minor points to reduce overall tension",
    "Humor (carefully): light humor from a calm guard can break tension — never sarcasm",
  ], NAVY);
  bulletCard(sl,pres,5.05,0.9,4.5,4.4,"When Verbal Diffusion Is Not Working",[
    "Recognize the point of no return: continued verbal engagement may escalate",
    "Create distance: step back, change location, reduce stimuli",
    "Disengage without capitulating: 'I am going to give you a moment to think about this'",
    "Request backup: do not handle escalating situations alone",
    "Establish a perimeter: keep bystanders away from the conflict zone",
    "Document: record all verbal attempts to diffuse in your incident report",
  ], RED);

  closingSlide(pres, T, REF, HRS);
  return pres;
}


// ══════════════════════════════════════════════════════════════════
// QUESTION BANKS (one per module)
// All questions verified against official BSIS syllabus bsis.ca.gov
// ══════════════════════════════════════════════════════════════════
const BANKS = {

AUF: { title:"Appropriate Use of Force — BSIS Certification", subtitle:"Pre-Registration Training (5 Hrs) | MACCESS INC.", hours:"5", passingScore:100, bpcRef:"BPC §7583.7",
questions:[
{module:"Legal Standards",ref:"BPC §7583.7",q:"The standard applied to evaluate a security guard's use of force under California law is:",options:["Whatever force the guard personally deemed necessary","Objectively reasonable force under the circumstances","Whatever force the client contract authorizes","Whatever force prevents injury to the guard"],answer:1},
{module:"Legal Standards",ref:"BPC §7583.7",q:"Which of the following creates BOTH criminal and civil liability for a guard's use of force?",options:["Any use of physical contact","Force that is excessive or unreasonable under the circumstances","Force authorized in writing by the property owner","Force used to stop property theft"],answer:1},
{module:"Legal Standards",ref:"BPC §§7583.2,7583.4,7574.37",q:"After a use-of-force incident, a security guard is required to:",options:["Notify the client and take no further action","Wait for the supervisor to file all paperwork","Complete a written incident report and notify their PPO supervisor","File the report within 72 hours at their discretion"],answer:2},
{module:"Legal Standards",ref:"Contractual Obligations",q:"A security guard's use-of-force authority may be FURTHER RESTRICTED (beyond California law) by:",options:["The guard's personal level of training","The property owner's contract with the PPO","BSIS directly overriding any contract","State law — contracts cannot restrict authorized force"],answer:1},
{module:"Objectively Reasonable Force",ref:"Graham v. Connor",q:"'Objectively reasonable force' is evaluated from the perspective of:",options:["A legal expert reviewing the incident afterward","The supervisor who approved the guard's assignment","A reasonable officer at the scene with the same information","The property owner who contracted for security services"],answer:2},
{module:"Objectively Reasonable Force",ref:"BPC §7583.7(b)(2)",q:"In the force continuum, which response should always be attempted first?",options:["Physical restraint to gain immediate control","Verbal commands and de-escalation communication","Drawing any available weapon to establish compliance","Calling law enforcement before taking any action"],answer:1},
{module:"Objectively Reasonable Force",ref:"BPC §7583.7(b)(2)",q:"A guard applies a pain compliance hold on a cooperative subject who simply declined to show ID. This force is:",options:["Lawful — compliance with ID checks can be enforced physically","Potentially excessive — the situation did not justify that level of force","Lawful if permitted in the client contract","Required protocol for non-compliant subjects per BSIS"],answer:1},
{module:"Objectively Reasonable Force",ref:"Force Continuum",q:"Force used against a person must be reduced or stopped when:",options:["The subject verbally protests the force being used","The guard's supervisor arrives on scene","The threat that justified the force no longer exists","The guard has documented the incident in their radio log"],answer:2},
{module:"Duty to Intercede",ref:"BPC §7583.7(b)(3)",q:"The duty to intercede requires a security guard to:",options:["Step in to manage any physical altercation that occurs on their post","Report all use-of-force incidents to BSIS within 24 hours","Stop or attempt to stop another guard who is using clearly excessive force","Contact law enforcement before personally taking any action involving force"],answer:2},
{module:"Duty to Intercede",ref:"BPC §7583.7(b)(3)",q:"A guard witnesses their coworker continue striking a handcuffed, compliant subject. The correct response is to:",options:["Document the incident and raise it in the next staff meeting","Intervene immediately to stop the excessive force, then report the incident","Defer to the senior guard's judgment — they may know something you do not","Notify only the client — BSIS reporting is the PPO's responsibility"],answer:1},
{module:"Supervisory Responsibilities",ref:"BPC §§7583.2,7583.4",q:"A supervisor's obligation after a guard under their command uses force includes:",options:["Reviewing the report at end of week only if injury occurred","Filing a full incident report per BPC §§7583.2 and 7583.4 requirements","Notifying the client only — BSIS reporting is optional for minor incidents","Verbal documentation — written reports are only needed for firearms"],answer:1},
{module:"Supervisory Responsibilities",ref:"BPC §7574.37",q:"Which statute requires a PPO to report use-of-force incidents to BSIS?",options:["BPC §480","PC §837","BPC §7574.37","Title 16 CCR §640"],answer:2},
{module:"De-escalation — 4 Concepts",ref:"BPC §7583.7(b)(6)",q:"The four core concepts of de-escalation per BSIS training are:",options:["Run, Hide, Fight, Report","Self-control, Effective Communication, Scene Assessment and Management, Force Options","Observe, Orient, Decide, Act","Approach, Contain, Communicate, Resolve"],answer:1},
{module:"De-escalation — 4 Concepts",ref:"BPC §7583.7(b)(6)",q:"Which tactical methods are specifically listed in the BSIS AUF syllabus for de-escalation?",options:["Restraint and containment as primary tools","Force, command, distance, and exit strategy","Time, distance, cover, and concealment","Radio, backup, cover, and reporting"],answer:2},
{module:"De-escalation — 4 Concepts",ref:"BPC §7583.7(b)(6)",q:"A guard is facing an agitated but non-threatening subject who is yelling. The BEST first response is:",options:["Immediately request police and do not engage","Apply restraint before the situation escalates further","Use verbal de-escalation: speak calmly, give space, listen actively","Request backup and assume a defensive posture without speaking"],answer:2},
{module:"De-escalation — 4 Concepts",ref:"BPC §7583.7(b)(6)",q:"De-escalation techniques are NOT a safe primary option when:",options:["A subject is verbally hostile but not physically threatening","A subject refuses to show identification when asked","The subject poses an immediate physical threat requiring defensive action","A subject is crying or appears emotionally distressed"],answer:2},
{module:"Bias & Cultural Competency",ref:"BPC §7583.7(b)(7)",q:"Implicit bias in security work is best described as:",options:["Conscious, deliberate prejudice that guards are aware of","Automatic, unconscious attitudes that can affect perceptions and decisions","Bias found only in law enforcement — not private security","A form of bias that training completely eliminates"],answer:1},
{module:"Bias & Cultural Competency",ref:"BPC §7583.7(b)(7)",q:"Cultural competency requires security guards to:",options:["Apply identical procedures to all persons without modification","Recognize and adapt communication strategies for diverse communities while maintaining equal enforcement","Apply heightened scrutiny to individuals from unfamiliar cultural backgrounds","Defer all cross-cultural contacts to a supervisor"],answer:1},
{module:"Bias & Cultural Competency",ref:"BPC §7583.7(b)(7)",q:"Explicit bias in the security context refers to:",options:["Unconscious attitudes that affect decision-making without awareness","Deliberate, conscious prejudice that guides enforcement decisions","Cultural sensitivity and awareness training requirements","De-escalation techniques designed for diverse populations"],answer:1},
{module:"Disability & Behavioral Health",ref:"BPC §7583.7(b)(8)",q:"When a security guard encounters a person experiencing a behavioral health crisis, the FIRST priority is:",options:["Immediately contact law enforcement and maintain distance","Approach calmly, use de-escalation, and avoid physical force unless there is immediate danger","Apply early restraint to prevent the situation from escalating","Treat the encounter identically to a standard criminal contact"],answer:1},
{module:"Disability & Behavioral Health",ref:"ADA | BPC §7583.7(b)(8)",q:"The Americans with Disabilities Act (ADA) requires security guards to:",options:["Apply an identical enforcement standard to all persons without any modification","Provide reasonable accommodation and modified communication approaches for persons with disabilities","Refer all ADA-related questions directly to the property owner","Restrict application of trespass law to persons with disabilities"],answer:1},
{module:"Disability & Behavioral Health",ref:"BPC §7583.7(b)(8)",q:"A key communication strategy when interacting with a person who may have a cognitive disability is:",options:["Use precise legal terminology to clearly define their obligations","Speak more loudly and repeat commands with increasing firmness","Use plain language, be patient, and avoid issuing multiple commands at once","Immediately request police assistance for any interaction involving a disability"],answer:2},
{module:"Scenario Training",ref:"BPC §7583.7(b)(9)",q:"The primary purpose of shoot/don't-shoot scenario training is to develop a guard's ability to:",options:["Improve aim and accuracy with a firearm","Make real-time, accurate force decisions under stress with available information","Practice verbal command delivery in high-stress settings","Demonstrate de-escalation to an evaluating instructor"],answer:1},
{module:"Scenario Training",ref:"BPC §7583.7(b)(9)",q:"Before using force in a dynamic situation, a guard should consider all of the following EXCEPT:",options:["The immediacy and nature of the threat","Distance available and availability of cover","The property owner's stated preference for how force is handled at this location","Whether a lower level of force would resolve the situation effectively"],answer:2},
{module:"Mental Health & Active Shooter",ref:"BPC §7583.7(b)(10)-(11)",q:"In an active shooter situation, a security guard's primary role is to:",options:["Confront and neutralize the shooter to protect the property","Protect lives, coordinate evacuation, and support law enforcement response","Conduct a perimeter search to locate the shooter before police arrive","Pursue the shooter throughout the facility to prevent harm"],answer:1},
{module:"Mental Health & Active Shooter",ref:"BPC §7583.7(b)(11)",q:"The first priority when an active shooter situation is confirmed is:",options:["Securing the building perimeter","Protecting and evacuating occupants — prioritizing the RUN protocol","Drawing a firearm and moving toward the threat","Waiting for explicit police instructions before taking any action"],answer:1},
{module:"Mental Health & Active Shooter",ref:"BPC §7583.7(b)(10)",q:"Mental health stigma in security contexts can cause guards to:",options:["Under-respond to persons with mental illness by assuming they are less dangerous","Over-respond and use excessive force based on unfounded assumptions about mental illness","Have no obligation to consider a subject's mental health in a use-of-force analysis","Apply an identical force response to all persons regardless of mental state"],answer:1},
{module:"Mental Health & Active Shooter",ref:"BPC §7583.7 | BPC §631",q:"The categories of mental illness that security guards must be familiar with per BSIS training are defined in:",options:["PC §836","BPC §7583.7 — Section 631","Title 16 CCR §643","BPC §480"],answer:1},
{module:"Review",ref:"BPC §7583.7",q:"A guard observes two persons arguing loudly near the building entrance. Neither person has made a physical threat. The BEST initial response is:",options:["Call 911 immediately — loud arguments are a public safety threat","Walk toward both persons aggressively to establish authority","Approach calmly, introduce yourself, and attempt verbal de-escalation","Stay inside and monitor via CCTV without engaging"],answer:2},
{module:"Review",ref:"BPC §7583.7 | Proportionality",q:"A subject spits on a security guard. The guard responds with a takedown and pain compliance hold. This use of force:",options:["Is clearly justified — battery occurred and the guard may respond with force","May constitute excessive force — proportionality and totality of circumstances must be carefully evaluated","Is always lawful when a battery against the guard has occurred","Is prohibited — the guard must call police rather than use any physical response"],answer:1},
{module:"Review",ref:"BPC §7583.7 | Documentation",q:"After every use-of-force incident without exception, a security guard must:",options:["Contact their union representative before completing any paperwork","Document only if injuries were sustained by any party","Complete an incident report documenting circumstances, force applied, and outcome","Notify the client only — internal PPO reporting is optional for minor incidents"],answer:2},
{module:"Review",ref:"BPC §7583.7 | Passing Score",q:"The minimum passing score required to receive a BSIS Appropriate Use of Force Certificate of Completion is:",options:["70%","80%","90%","100%"],answer:3},
]},

PR: { title:"Public Relations & Community — BSIS Skills Course", subtitle:"Mandatory Training (4 Hrs) | MACCESS INC.", hours:"4", passingScore:100, bpcRef:"BPC §7583.6(b)",
questions:[
{module:"Harassment & Discrimination",ref:"FEHA | Gov. Code §12940",q:"A security guard observes a colleague making repeated unwanted sexual comments to a coworker. The guard is required to:",options:["Ignore it — it is a personal matter between the two colleagues","Report it to their supervisor and document the incident","Intervene only if the targeted coworker requests help","Allow the property owner to manage personnel matters without guard involvement"],answer:1},
{module:"Harassment & Discrimination",ref:"FEHA | Civil Rights",q:"Racial discrimination in security enforcement occurs when a guard:",options:["Applies post orders consistently to all persons regardless of background","Selects which individuals to approach or detain based on race or ethnicity","Maintains uniform patrol schedules without adjustment for post conditions","Verifies identification credentials for all persons entering a controlled area"],answer:1},
{module:"Harassment & Discrimination",ref:"FEHA | BPC §7583.6",q:"A guard's enforcement decisions must be based exclusively on:",options:["The property manager's standing preferences about who should be monitored","Race and prior criminal history — the most relevant risk factors","Specific, observed behaviors — never on appearance or demographic characteristics","The guard's professional experience and instincts about risk"],answer:2},
{module:"Respect & Stereotyping",ref:"BPC §7583.6 | PC §13519.4",q:"Under California law (PC §13519.4), which type of law enforcement action is explicitly prohibited?",options:["Use of force against resisting subjects","Detention based on race, gender, sexual orientation, religion, or national origin","Enforcement of trespass law on private property","Video recording of incidents involving use of force"],answer:1},
{module:"Respect & Stereotyping",ref:"BSIS Ethics",q:"A security guard who maintains a professional, non-aggressive command presence accomplishes all of the following EXCEPT:",options:["Reducing the likelihood of physical confrontation","Building public confidence in the security operation","Communicating authority through professionalism","Maximizing the guard's personal use-of-force options"],answer:3},
{module:"Respect & Stereotyping",ref:"BSIS Ethics",q:"Which behavior is INCONSISTENT with the BSIS professional conduct standard for security guards?",options:["Maintaining consistent enforcement regardless of a person's appearance","Projecting calm authority through posture and demeanor","Applying more scrutiny to individuals whose appearance the guard finds suspicious","Documenting only observable, objective behaviors in incident reports"],answer:2},
{module:"Verbal Skills & Crisis Intervention",ref:"BSIS Training Manual",q:"Verbal crisis intervention is most effective when a guard:",options:["Raises their voice to establish authority and signal seriousness","Speaks slowly and calmly, using the person's name when known","Issues clear ultimatums with immediate stated consequences","Steps back and avoids any verbal engagement to prevent escalation"],answer:1},
{module:"Verbal Skills & Crisis Intervention",ref:"BSIS Training Manual",q:"Active listening during a difficult interaction requires the guard to:",options:["Wait for their turn to speak and prepare their response while the person talks","Focus primarily on identifying grounds for arrest","Fully attend to the person, acknowledge their concerns, and confirm understanding","Document the conversation in real time rather than engaging verbally"],answer:2},
{module:"Verbal Skills & Crisis Intervention",ref:"BSIS Training Manual",q:"When a person becomes emotionally distressed at a security post, the guard's FIRST goal is to:",options:["Identify whether the distress indicates criminal intent","Establish grounds for detention if the behavior disrupts operations","Establish rapport and stabilize the situation before issuing directives","Contact law enforcement immediately and maintain distance"],answer:2},
{module:"Introduction to Diversity",ref:"BPC §7583.6",q:"Valuing diversity in a security operation means:",options:["Treating every person exactly the same regardless of context or individual needs","Recognizing and respectfully adapting to differences in background, culture, and identity","Applying statistically informed risk assessments to persons from higher-crime demographics","Concentrating diversity awareness efforts on race and gender only"],answer:1},
{module:"Introduction to Diversity",ref:"BPC §7583.6 | FEHA",q:"A guard is stationed at a location with many non-English-speaking visitors. The professional response to a language barrier is to:",options:["Require all visitors to communicate in English before receiving assistance","Direct non-English speakers to a separate area until an interpreter arrives","Use translation tools, simple language, and respectful non-verbal communication to assist","Refer non-English speakers to a phone number and continue patrol"],answer:2},
{module:"Introduction to Diversity",ref:"FEHA | Title VII",q:"Religious expression — including wearing religious clothing or symbols — in a public or commercial setting is protected under:",options:["BPC §7583.7 only","The California Fair Employment and Housing Act and Title VII of the Civil Rights Act","BSIS administrative code only, not federal civil rights law","The property owner's discretion on a site-by-site basis"],answer:1},
{module:"Substance Abuse & Mental Illness",ref:"BSIS Training Manual",q:"Common observable signs of stimulant drug intoxication (methamphetamine, cocaine) include:",options:["Slurred speech, drooping eyelids, and extremely slow reaction time","Rapid speech, heightened agitation, dilated pupils, and excessive energy","Calm demeanor accompanied by marked disorientation","Confusion, extremely slow response, and drooping facial features"],answer:1},
{module:"Substance Abuse & Mental Illness",ref:"BSIS Training Manual",q:"When encountering a person showing signs of a mental health episode on post, the guard's BEST initial response is to:",options:["Immediately detain the person for their own safety and the safety of others","Apply early physical restraint to prevent escalation before it becomes dangerous","Approach calmly, reduce environmental stimuli, speak slowly, and contact appropriate support","Ignore the situation unless property damage or a physical assault occurs"],answer:2},
{module:"Substance Abuse & Mental Illness",ref:"BSIS Training Manual",q:"A person under the influence of a central nervous system depressant (alcohol, opioids) is most likely to display:",options:["Hyperactivity, extreme suspicion, and rapid eye movement","Excessive energy, dilated pupils, and rapid, pressured speech","Slurred speech, impaired coordination, and slow or absent response","Aggressive behavior combined with disorganized, rapid speech"],answer:2},
{module:"Ethics & Professionalism",ref:"BSIS Code of Ethics | BPC §7583.6",q:"A security guard's uniform and professional appearance reflect on:",options:["Only the individual guard's personal reputation","Only MACCESS INC. as the employing PPO","The guard personally, MACCESS INC. as the PPO, and the client — all three parties","The property owner exclusively — the guard is just following orders"],answer:2},
{module:"Ethics & Professionalism",ref:"BSIS Code of Ethics",q:"Which of the following behaviors is INCOMPATIBLE with BSIS ethical standards for security guards?",options:["Treating all members of the public with equal courtesy and professionalism","Using only the minimum level of force reasonably necessary for the situation","Accepting gifts or favors from vendors or clients in exchange for overlooking a violation","Maintaining complete and accurate incident logs and reports"],answer:2},
{module:"Ethics & Professionalism",ref:"BSIS Code of Ethics",q:"A supervisor instructs a guard to make a false statement in an incident report. The guard should:",options:["Comply with the supervisor's instruction — they have authority over report content","Comply only if the underlying incident was minor and unlikely to be reviewed","Refuse the instruction and report the request to MACCESS INC. management","Complete the report as directed but make a private written note of the discrepancy"],answer:2},
{module:"Review",ref:"BPC §7583.6",q:"A visitor at the front desk becomes verbally aggressive over a building access policy. The guard's BEST initial response is to:",options:["Match the person's energy and volume to establish authority","Immediately direct the person to leave and call law enforcement","Remain calm, acknowledge the visitor's frustration, attempt verbal de-escalation, and involve a supervisor if needed","Step away without engagement and allow the person to calm down independently"],answer:2},
{module:"Review",ref:"BPC §7583.6 | Ethics",q:"Which conduct most clearly reflects BSIS professional standards for a security guard?",options:["Using position and authority to benefit personal or professional relationships","Treating every person consistently with respect and fairness regardless of their identity","Enforcing post orders more strictly during periods of high-visibility observation","Engaging in extended personal conversations while assigned to a post"],answer:1},
{module:"Review",ref:"PPO License | BPC §7583.6",q:"MACCESS INC.'s California Private Patrol Operator license number — required on all BSIS Certificates of Completion — is:",options:["#112233","#100001","#133445","#122729"],answer:3},
]},

OD: { title:"Observation & Documentation — BSIS Skills Course", subtitle:"Mandatory Training (4 Hrs) | MACCESS INC.", hours:"4", passingScore:100, bpcRef:"BPC §7583.6(b)",
questions:[
{module:"Report Writing",ref:"BSIS Training Standards",q:"Which of the following best describes the required standard for a BSIS-compliant security incident report?",options:["Written from memory at the end of the guard's shift using general recollections","Factual, accurate, complete, clear, and completed as close to the incident as possible","Based on the guard's professional assessment of what most likely occurred","A brief summary focusing on only the most significant elements of the incident"],answer:1},
{module:"Report Writing",ref:"BSIS Training Standards",q:"Security incident reports must be written in which grammatical form?",options:["First person — 'I observed...', 'I heard...', 'I responded by...'","Third person — 'The officer observed...' to create an appearance of objectivity","Passive voice throughout — 'The door was found unlocked' — to avoid assigning blame","Abbreviated shorthand to maximize efficiency and reduce report time"],answer:0},
{module:"Report Writing",ref:"BSIS Training Standards",q:"When should a security incident report ideally be completed?",options:["At the conclusion of the guard's shift, after all events of the day have occurred","Within 72 hours of the incident per BSIS administrative requirements","As close to the time of the incident as possible — ideally within one hour","Only after consulting with a supervisor to confirm the facts"],answer:2},
{module:"Report Writing",ref:"BSIS | Legal Standards",q:"Which of the following content should NEVER be included in a security incident report?",options:["The precise time and date the incident occurred","Direct quotes from witnesses, attributed clearly","The guard's personal opinions, speculation, or conclusions about guilt or motive","A physical description of any person involved in the incident"],answer:2},
{module:"Report Writing",ref:"BSIS Training Standards",q:"A guard discovers a factual error in an incident report they submitted earlier in the shift. The correct action is to:",options:["Destroy the original report and prepare a corrected version from scratch","Draw a single line through the error, write the correction, and add initials and date — never erase","Leave the error in place, as the report is already submitted and cannot be changed","Ask a colleague or supervisor to correct the report on the guard's behalf"],answer:1},
{module:"English Language Documentation",ref:"BSIS Training Standards",q:"A guard whose primary language is not English must write all official BSIS incident reports:",options:["In their primary language to ensure accuracy of the documented facts","In English — all BSIS documentation must be in English for legal purposes","In either English or their primary language, provided the content is factually accurate","In both languages simultaneously to ensure maximum comprehension"],answer:1},
{module:"English Language Documentation",ref:"BSIS Training Standards",q:"When a witness speaks limited English, a guard's documentation obligation requires:",options:["Omitting the witness account from the report if full communication was not possible","Using an interpreter, translation application, or other aid — and documenting the method used","Writing the witness account based on what the guard believed the witness intended to communicate","Requiring the witness to return at a later time when a bilingual guard is available"],answer:1},
{module:"Observation & Patrol",ref:"BSIS Training Manual",q:"Effective security patrol technique requires that a guard:",options:["Follow the identical route at the same time each round to demonstrate consistency","Vary both the timing and the route of patrol to prevent establishing a predictable pattern","Minimize unnecessary movement to preserve energy and readiness for emergencies","Remain at a central observation point to maximize coverage of the post area"],answer:1},
{module:"Observation & Patrol",ref:"BSIS Training Manual",q:"During a routine patrol, a guard discovers an emergency exit that is propped open but is normally kept secured. The correct response is:",options:["Assume it was opened accidentally and continue patrol without intervention","Close the door, document the anomaly in the shift log, and notify the supervisor","Leave the exit as found and report it only if it is still open at the end of the shift","Alert law enforcement immediately — propped emergency exits are a criminal matter"],answer:1},
{module:"Observation & Patrol",ref:"BSIS Training Manual",q:"The primary purpose of security patrol observation is:",options:["To maximize the number of public contacts and interactions during a shift","To detect and deter security threats, safety hazards, and policy violations at the post","To enforce parking regulations and unauthorized vehicle violations","To generate documentation for potential future litigation"],answer:1},
{module:"Questioning Techniques",ref:"BSIS Training Manual",q:"When approaching a person who appears to be behaving suspiciously, the guard's questioning should:",options:["Demand immediate answers — security guards have authority to require responses","Use open-ended, neutral questions that do not presuppose guilt or wrongdoing","Consist exclusively of yes-or-no questions to maintain control of the interaction","Include covert recording of the subject's responses for documentation purposes"],answer:1},
{module:"Questioning Techniques",ref:"BSIS Training Manual",q:"An open-ended question is specifically designed to:",options:["Confirm a specific fact and can be answered with yes or no","Establish control by limiting the subject to a defined set of possible responses","Encourage a detailed, narrative response that provides maximum information","Allow the guard to direct the subject toward a predetermined answer"],answer:2},
{module:"Questioning Techniques",ref:"BSIS Training Manual | PC §837",q:"A security guard has no legal obligation to share information gathered during questioning with anyone, with the exception of:",options:["The property owner, upon any request for information","Law enforcement acting in an official capacity during a lawful investigation","MACCESS INC. management exclusively — all information is proprietary","BSIS auditors upon annual license renewal"],answer:1},
{module:"Documenting Suspicious Activity",ref:"BSIS Training Manual",q:"A BSIS-compliant written description of a suspect or person of interest must include:",options:["The subject's name only, if it was obtained during the contact","Sex, race, age, height, weight, hair color, eye color, clothing, and any distinctive identifying features","Only the two or three details the guard considers most relevant to the incident","Primarily photographic documentation — written descriptions are considered insufficient"],answer:1},
{module:"Documenting Suspicious Activity",ref:"BSIS Training Manual",q:"Which of the following should NOT be documented as suspicious activity?",options:["A person systematically photographing security cameras and door access panels","An unattended bag or package found in an unusual location within the facility","A regular, known employee entering the building through the main entrance","A vehicle that has circled the property multiple times without an apparent purpose"],answer:2},
{module:"Documenting Suspicious Activity",ref:"BSIS Training Manual",q:"After observing suspicious behavior, a security guard's recommended first action is to:",options:["Immediately confront the person to establish authority and deter the behavior","Continue observation, carefully document all details, and contact a supervisor or law enforcement if the situation warrants","Disregard the observation unless an overt criminal act is committed","Broadcast a general alert to all staff via radio immediately"],answer:1},
{module:"Documenting Suspicious Activity",ref:"BSIS Training Manual",q:"A 'be on the lookout' (BOLO) description that a security guard provides to law enforcement should be:",options:["Kept confidential within the security team until law enforcement makes a formal written request","As specific and accurate as possible — and relayed to officers as promptly as the situation permits","General and non-specific to avoid any potential profiling concern","Provided only after the guard has formally submitted a written incident report"],answer:1},
{module:"Review",ref:"BPC §7583.6",q:"A security guard's shift log is required to be completed:",options:["At the conclusion of each shift in a single consolidated entry","Continuously throughout the shift — significant observations and events recorded as they occur","Only when a reportable incident occurs that requires formal documentation","Weekly during the scheduled Monday morning post briefing"],answer:1},
{module:"Review",ref:"Title 16 CCR §643(b)",q:"Training certificates and documentation of completed training must be retained by the PPO and made available to BSIS for how long?",options:["Six months from the date of completion","For the duration of the guard's employment, and available to BSIS upon request","One year from the date of completion only","Five years following the guard's last day of employment"],answer:1},
{module:"Review",ref:"BPC §7583.6",q:"A guard observes two persons arguing near the building entrance. The argument is verbal only — no physical contact has occurred. The guard's recommended action is to:",options:["Ignore the situation, as no crime is being committed","Approach immediately and attempt to mediate the dispute directly","Observe from a safe position, be prepared to intervene if it escalates, and document the incident","Call law enforcement immediately — verbal arguments are a public safety concern"],answer:2},
{module:"Review",ref:"PPO License",q:"MACCESS INC.'s California Private Patrol Operator license number — required on all BSIS Certificates of Completion — is:",options:["#112233","#100001","#133445","#122729"],answer:3},
]},

COMM: { title:"Communication & Its Significance — BSIS Skills Course", subtitle:"Mandatory Training (4 Hrs) | MACCESS INC.", hours:"4", passingScore:100, bpcRef:"BPC §7583.6(b)",
questions:[
{module:"Internal Communication",ref:"BSIS Training Manual",q:"Internal security communication protocols define:",options:["How security guards communicate with external media representatives","Who to contact, when to contact them, and which methods to use within the security operation","How to complete a BSIS guard card renewal application","The required format for court testimony by security personnel"],answer:1},
{module:"Internal Communication",ref:"BSIS Training Manual",q:"Radio communication by a security guard should be:",options:["As comprehensive as possible to capture all relevant details in real time","Casual and conversational in tone to reduce perceived tension during contacts","Clear, concise, and conducted using established codes and protocols","In plain English only — BSIS prohibits the use of any codes or abbreviations"],answer:2},
{module:"Internal Communication",ref:"BSIS Training Manual",q:"Before transmitting a message on a two-way radio, a guard should:",options:["Transmit immediately — delays in communication create operational risk","Listen to confirm the channel is clear, press push-to-talk, wait one second, then speak","Announce their location and full name at the beginning of every transmission","Contact the dispatch center to request authorization before each transmission"],answer:1},
{module:"Internal Communication",ref:"BSIS Training Manual",q:"Upon observing a serious incident at their post, a guard should notify their supervisor:",options:["After completing and submitting the full written incident report","At the end of the guard's shift during the standard shift handoff","As soon as it is safely possible — immediately for any urgent or dangerous situation","Only if the client property owner or manager specifically requests a notification"],answer:2},
{module:"Internal Communication",ref:"BSIS Training Manual",q:"Security technology such as CCTV systems, alarm panels, and access control units are classified as:",options:["Optional tools that guards may use at their individual discretion","Internal communication and operational tools that guards must understand and use per post duties","Law enforcement equipment that requires a separate BSIS or government certification to operate","Exclusively the property owner's equipment that guards should not interact with or report on"],answer:1},
{module:"External — Emergency Responders",ref:"BSIS Training Manual | 911",q:"When placing a 911 call to report an active security incident, the guard must provide which information first?",options:["Their BSIS license number and the PPO company name","Their current location — building address, floor, and specific area within the facility","Only their name and company name — dispatchers are trained to gather additional details","A complete written incident report before placing the call to ensure accuracy"],answer:1},
{module:"External — Emergency Responders",ref:"BSIS Training Manual",q:"When law enforcement arrives at an active incident managed by a security guard, the guard should:",options:["Continue managing the situation independently until officers formally request a handoff","Present their written incident report to officers before providing any verbal briefing","Give officers a brief, accurate verbal briefing: situation, parties, any hazards, and actions taken","Withdraw entirely from the scene and have no further communication with officers"],answer:2},
{module:"External — Emergency Responders",ref:"BSIS Training Manual",q:"A guard discovers a person who is unconscious at their post. The appropriate action regarding 911 is:",options:["After completing the incident report, if the situation is not obviously an emergency","Only if explicitly directed to do so by a supervisor","Call 911 immediately — life safety calls are always the highest priority","Only after all available on-site first aid measures have been exhausted"],answer:2},
{module:"External — Medical Personnel",ref:"BSIS Training Manual",q:"When emergency medical services (paramedics or EMTs) arrive at a scene, a security guard's role is to:",options:["Continue providing first aid concurrently alongside the medical professionals","Clear bystanders, provide access to the scene, brief medical personnel on the situation, and stand by","Assume full crowd and scene control without communicating directly with medical personnel","Document the paramedics' clinical actions in full detail for the incident report"],answer:1},
{module:"External — Medical Personnel",ref:"BSIS Training Manual",q:"Patient confidentiality obligations require a security guard to:",options:["Share the patient's identifying and medical information openly with any bystander who might assist","Limit disclosure of patient information strictly to what is necessary for first responders to do their job","Photograph the patient for documentation purposes in the incident report","Record the patient's verbatim statements and observations in full in the incident report"],answer:1},
{module:"External — Police / Enforcement",ref:"BSIS Training Manual | PC §847",q:"When transferring custody of a citizen's arrest subject to law enforcement, the guard must communicate:",options:["Only the subject's name — law enforcement will conduct their own independent investigation","The reason for the arrest, the guard's specific observations, and any evidence that was secured","Nothing until an attorney for either party is present","Only information that is already reflected in the written incident report"],answer:1},
{module:"External — Police / Enforcement",ref:"BSIS Training Manual",q:"Information gathered during a security investigation must NEVER be communicated to:",options:["Paramedics who are treating an injured party at the scene","The person being investigated or their known associates","The PPO supervisor who is responsible for the post","A second law enforcement officer who arrives to assist"],answer:1},
{module:"External — Police / Enforcement",ref:"BSIS Training Manual",q:"The most effective approach to ensuring accurate communication with law enforcement during a handoff is to:",options:["Provide a detailed personal interpretation and analysis of the events","Rely entirely on memory to deliver a comprehensive verbal account","Present observable facts only, using precise times and locations, with reference to written notes","Share your personal conclusions about the suspect's motivation and likely future behavior"],answer:2},
{module:"External — City & Government Services",ref:"BSIS Training Manual",q:"A guard discovers a broken fire hydrant actively leaking on the property. The appropriate notification is to:",options:["The property owner's insurance carrier to initiate a damage claim","Local law enforcement — they are responsible for all public infrastructure issues","The city's water department or utility emergency services line","BSIS — all significant infrastructure incidents at a post must be reported to the Bureau"],answer:2},
{module:"External — City & Government Services",ref:"BSIS Training Manual",q:"When a city code enforcement officer arrives to conduct an inspection of the property, the guard should:",options:["Deny access until the property owner or manager provides written authorization","Allow access to the facility and immediately notify the property manager or supervisor","Accompany the officer on the full inspection without notifying anyone in the management chain","Request a certified copy of the inspection order before taking any action whatsoever"],answer:1},
{module:"External — City & Government Services",ref:"BSIS Training Manual",q:"A visitor lodges a formal complaint about a noise ordinance violation occurring on the premises. The guard should:",options:["Issue a formal written warning to the party allegedly violating the ordinance","Immediately contact the city noise enforcement line without speaking to the parties involved","Attempt to resolve the matter internally first, document the outcome, and escalate to appropriate city authorities only if unresolved","Decline to intervene, as noise ordinance enforcement is outside the scope of security guard duties"],answer:2},
{module:"Non-Verbal Communication",ref:"BSIS Training Manual",q:"Non-verbal communication in a security context primarily includes:",options:["Radio transmissions and written incident reports — the official record of all guard communication","Body language, posture, eye contact, facial expression, and physical proximity","Hand signals used exclusively in high-noise environments where radio communication is unavailable","Written shift logs and CCTV footage review"],answer:1},
{module:"Non-Verbal Communication",ref:"BSIS Training Manual",q:"A security guard's body language while on post should project:",options:["Physical dominance and visible readiness for confrontation to deter potential threats","Professional alertness, calm confidence, and an approachable demeanor","Deliberate disengagement to reduce the likelihood of unwanted confrontations","Visible deference and submission to reduce the risk of escalating difficult situations"],answer:1},
{module:"Review",ref:"BPC §7583.6",q:"A person approaches the front desk and requests to speak with a manager about a complaint. The guard is unfamiliar with the appropriate manager for that type of issue. The BEST response is:",options:["Direct the person to come back at a later time when the appropriate manager is available","Treat the complaint as a potential security concern and contact law enforcement","Acknowledge the concern professionally, obtain the visitor's contact information, and relay it to the appropriate supervisor promptly","Refer the person to the company's public website for contact information"],answer:2},
{module:"Review",ref:"PPO License | BPC §7583.6",q:"MACCESS INC.'s California Private Patrol Operator license number — which is required to appear on all BSIS Certificates of Completion — is:",options:["#112233","#100001","#133445","#122729"],answer:3},
]},

LAW: { title:"Liability & Legal Aspects — BSIS Skills Course", subtitle:"Mandatory Training (4 Hrs) | MACCESS INC.", hours:"4", passingScore:100, bpcRef:"BPC §7583.6(b)",
questions:[
{module:"Personal/Contractor/Employer Liability",ref:"PC §236 | Tort Law",q:"Personal liability for a security guard arises when the guard:",options:["Follows post orders accurately and acts within their authorized scope","Operates within the scope of their lawful authority while on duty","Commits a wrongful act — intentional or negligent — that causes harm to another person","Reports a safety hazard to their supervisor and documents it in the shift log"],answer:2},
{module:"Personal/Contractor/Employer Liability",ref:"Respondeat Superior",q:"The legal doctrine of 'respondeat superior' establishes that:",options:["Guards are personally liable for all use-of-force incidents regardless of scope","Employers may be vicariously liable for wrongful acts by employees acting within the scope of employment","Property owners are responsible for all security incidents that occur on their premises","BSIS bears liability for harm caused by improperly trained guards it licensed"],answer:1},
{module:"Personal/Contractor/Employer Liability",ref:"Negligent Training | Contractor Liability",q:"MACCESS INC., as the licensed PPO, may face contractor liability specifically when:",options:["A guard acts outside the scope of their employment on personal time","The PPO's negligent training or inadequate supervision contributes to a guard's wrongful act","Only when the PPO directly and personally commits the wrongful act in question","The property owner fails to maintain safe conditions at the client site"],answer:1},
{module:"Personal/Contractor/Employer Liability",ref:"Indemnification",q:"A standard security services contract indemnification clause generally:",options:["Eliminates all liability for the individual guard regardless of the nature of the act","Transfers liability from the property owner/client to the PPO for incidents occurring within the guard's scope of duties","Makes the individual guard personally responsible for all losses suffered by the client","Provides legal protection exclusively to the property owner against third-party claims"],answer:1},
{module:"Criminal/Civil/Administrative Liability",ref:"PC §236 | PC §242",q:"A security guard who conducts a false or unlawful arrest may face liability in which categories?",options:["Criminal liability only — false arrest is not recognized as a civil tort","Civil liability only — false arrest does not constitute a criminal offense","Criminal, civil, and BSIS administrative liability simultaneously arising from the same act","BSIS administrative liability only — criminal charges require law enforcement to make the arrest"],answer:2},
{module:"Criminal/Civil/Administrative Liability",ref:"PC §242",q:"Battery under California Penal Code §242 is legally defined as:",options:["A threat or attempt to use violence against another person","Any willful and unlawful use of force or violence upon the person of another","The use of excessive force during an otherwise lawful arrest","The unlawful restraint of a person's physical movement without consent"],answer:1},
{module:"Criminal/Civil/Administrative Liability",ref:"BPC §480",q:"BSIS administrative liability can result in all of the following EXCEPT:",options:["Suspension of the individual's security guard registration card","Revocation of the individual's security guard registration card","A civil judgment for monetary damages awarded to the injured party","Assessment of civil penalties and regulatory fines against the guard or PPO"],answer:2},
{module:"Criminal/Civil/Administrative Liability",ref:"Negligent Hiring",q:"A PPO that fails to conduct required background checks before hiring a guard may face liability under the doctrine of:",options:["False imprisonment — if the guard conducts an unlawful arrest","Negligent hiring — if the guard causes harm that a proper background check would have predicted","Statutory violation only — negligent hiring does not create civil exposure","BSIS administrative penalties exclusively — no civil liability attaches to hiring decisions"],answer:1},
{module:"BSIS Code & Regulations",ref:"Title 16 CCR §643(b)",q:"Which of the following is required to appear on a valid BSIS Certificate of Completion?",options:["The guard's residential address and Social Security Number","The training provider's name and BSIS license number, course name, dates of training, hours, and a unique sequential serial number","The property owner's authorization signature confirming the guard completed training on site","The guard's Social Security Number and DOJ fingerprint ATI number"],answer:1},
{module:"BSIS Code & Regulations",ref:"Title 16 CCR §643(b)",q:"Under Title 16 CCR §643(b), a security guard is required to retain their Certificate of Completion:",options:["For one year from the date of course completion","Until the guard's registration expires or is canceled","For five years following the last date of their security employment","Only for the duration of their employment with the issuing PPO"],answer:1},
{module:"BSIS Code & Regulations",ref:"BPC §7583.9",q:"A California security guard registration (guard card) is valid for how long before renewal is required?",options:["One year","Two years","Three years","Five years"],answer:1},
{module:"BSIS Code & Regulations",ref:"BPC §7583.20",q:"Under BPC §7583.20, a guard card that has lapsed past its expiration date may still be renewed — with a delinquency fee — within how many days of expiration?",options:["30 days from expiration","60 days from expiration","90 days from expiration","120 days from expiration"],answer:1},
{module:"BSIS Code & Regulations",ref:"BPC §7583.6",q:"The California agency responsible for enforcing security guard licensing requirements and standards is:",options:["The California Highway Patrol (CHP)","The California Department of Justice (DOJ)","The Bureau of Security and Investigative Services (BSIS)","The California Attorney General's Office"],answer:2},
{module:"Role of a Security Guard",ref:"BPC §7582.1",q:"Under BPC §7582.1, the defined purpose for which a licensed PPO employs security guards is to:",options:["Enforce municipal laws, ordinances, and regulations on behalf of local government","Arrest persons suspected of criminal activity on public property","Protect persons or property or prevent theft for the PPO's clients","Conduct criminal investigations on behalf of law enforcement agencies"],answer:2},
{module:"Role of a Security Guard",ref:"BPC §7582.1 | PC §830",q:"The most fundamental legal distinction between a security guard and a California peace officer is that a security guard:",options:["Is authorized to use no level of physical force under any circumstance","Cannot carry or use a firearm regardless of any permit, license, or authorization","Derives all law enforcement authority from PC §837 as a private citizen — not from statutory peace officer powers","Possesses the same law enforcement authority as a sworn officer while operating on private property"],answer:2},
{module:"Role of a Security Guard",ref:"PC §490.5 | BPC §7582.1",q:"Under the Shopkeeper's Privilege (PC §490.5), a security guard working for a retail merchant may detain a suspected shoplifter when the guard has:",options:["Reasonable suspicion based on a report from another store employee","Probable cause based on their own direct personal observation of the theft","A loss prevention alert generated by the store's automated monitoring system","A verbal report of the theft from any person present in the store at the time"],answer:1},
{module:"Role of a Security Guard",ref:"BPC §7583.6 | Annual CE",q:"The minimum number of continuing education hours a registered security guard must complete annually after the first year of registration is:",options:["4 hours","6 hours","8 hours","16 hours"],answer:2},
{module:"Role of a Security Guard",ref:"BPC §7583.6(e)",q:"The mandatory annual 8-hour continuing education requirement must include a minimum of how many hours specifically covering Appropriate Use of Force topics?",options:["1 hour","2 hours","4 hours","The full 8 hours must cover AUF"],answer:1},
{module:"Review",ref:"BPC §7583.6 | PC §236",q:"A guard makes a lawful citizen's arrest and holds the subject for 45 minutes without contacting law enforcement because their supervisor is temporarily unreachable. This action could result in:",options:["No liability — the guard was acting in good faith while attempting to contact their supervisor","False imprisonment charges and potential BSIS administrative action for unlawful detention","Only an internal policy violation with no resulting legal or regulatory consequences","A positive performance notation for thorough and persistent documentation"],answer:1},
{module:"Review",ref:"PPO License | BPC §7583.6",q:"MACCESS INC.'s California Private Patrol Operator license number — required to appear on all BSIS Certificates of Completion per Title 16 CCR §643(b) — is:",options:["#112233","#100001","#133445","#122729"],answer:3},
]},

OS: { title:"Officer Safety — BSIS Elective Course", subtitle:"Elective Skills Training (4 Hrs) | MACCESS INC.", hours:"4", passingScore:100, bpcRef:"BPC §7583.6(b)",
questions:[
{module:"Threat Assessment",ref:"Situational Awareness",q:"The baseline level of situational awareness that a security guard should maintain at all times while on duty is:",options:["White — relaxed and at ease, conserving energy between incidents","Yellow — relaxed alertness, aware of surroundings without fixating on a specific threat","Orange — focused attention on a specific identified potential threat","Red — prepared to immediately take action against a confirmed threat"],answer:1},
{module:"Threat Assessment",ref:"Pre-Incident Indicators",q:"Observable behavioral pre-incident threat indicators include:",options:["Wearing clothing that is appropriate for the weather and the location","Entering through the main public entrance without stopping","Photographing the building's security cameras and documenting guard patrol patterns","Proceeding directly to a destination without any apparent hesitation or delay"],answer:2},
{module:"Threat Assessment",ref:"BSIS Training Manual",q:"When a guard identifies a credible potential threat at their post, the first priority is:",options:["Independently confront the identified threat to resolve it before it escalates","Notify dispatch or their supervisor and request backup before engaging","Document the observation in the shift log and continue patrol without intervening","Wait for the threat to escalate to a confirmed incident before reporting"],answer:1},
{module:"Threat Assessment",ref:"BSIS Training Manual",q:"The most important initial indicator to observe when approaching an unknown subject is:",options:["The subject's facial expression and apparent emotional state","The subject's hands — hands are the primary source of potential threats","The subject's clothing style and apparent socioeconomic status","The subject's race and gender — the statistically highest risk factors"],answer:1},
{module:"Safe Subject Contact",ref:"BSIS Training Manual",q:"The recommended distance a guard should maintain from an unknown subject during an initial contact is:",options:["1 to 2 feet — close enough to maintain full physical control if needed","6 to 10 feet — a reactionary gap that provides time to respond to a threat","15 or more feet — maximum distance to minimize all physical risk","At the guard's discretion — distance should be adjusted based on intuition"],answer:1},
{module:"Safe Subject Contact",ref:"BSIS Training Manual",q:"When approaching a potentially hostile subject, a guard should position themselves:",options:["Directly in front of the subject — a commanding frontal stance establishes authority","Directly behind the subject — reduces the subject's ability to see the guard's approach","At a 45-degree angle to the subject — reduces target profile and improves reactionary options","Beside the subject with a hand placed on their shoulder to establish physical control"],answer:2},
{module:"Safe Subject Contact",ref:"BSIS Training Manual",q:"A guard should NEVER approach a potentially threatening subject without first:",options:["Completing a full written incident report documenting the basis for the contact","Obtaining explicit written authorization from the property owner or client","Ensuring they have a means of communication, a clear exit, and backup available or requested","Reviewing the subject's prior incident history with the property management team"],answer:2},
{module:"Cover & Concealment",ref:"BSIS Training Manual",q:"The critical distinction between cover and concealment is that:",options:["Cover hides you from view but does not stop projectiles; concealment provides ballistic protection","Concealment hides you from view but does not stop projectiles; cover provides a barrier that can stop projectiles","Cover and concealment are functionally identical — both provide equivalent protection","Cover applies only to firearms threats; concealment is effective against all other types of threats"],answer:1},
{module:"Blood Borne Pathogens",ref:"OSHA 29 CFR 1910.1030",q:"Under OSHA blood borne pathogen standards, a security guard must assume that:",options:["Only visibly blood-stained materials pose a transmission risk","All blood and body fluids from any person may be infectious — standard precautions apply universally","Gloves are only required when direct contact with blood is highly likely","HIV is the only blood borne pathogen of practical concern in a security context"],answer:1},
{module:"Blood Borne Pathogens",ref:"OSHA 29 CFR 1910.1030",q:"The minimum personal protective equipment (PPE) a guard must use before any contact with blood or body fluids is:",options:["A full-face shield and protective gown","Disposable gloves","Safety glasses only","No PPE is required unless the blood is confirmed to be from an infected person"],answer:1},
{module:"Blood Borne Pathogens",ref:"OSHA | Cal/OSHA",q:"If a guard is exposed to blood or body fluids during an incident, they should immediately:",options:["Complete the incident report and mention the exposure as a footnote","Wait until the end of shift to report the exposure to their supervisor","Wash the affected area thoroughly with soap and water, notify their supervisor, and seek prompt medical evaluation","Disinfect the area with hand sanitizer and continue their shift without interruption"],answer:2},
{module:"Environmental Hazards",ref:"Cal/OSHA",q:"A guard detects a strong odor of natural gas at their post. The correct immediate action is:",options:["Locate the source of the leak and attempt to seal it to prevent further dispersal","Use the radio to report the odor while simultaneously investigating the source","Evacuate the area immediately without using any electrical switches or radio — then call 911 from a safe distance","Document the observation in the shift log and notify the property manager at the next available opportunity"],answer:2},
{module:"Safety Awareness",ref:"BSIS Training Manual",q:"Before beginning any shift, a security guard should:",options:["Arrive at the post and begin patrol immediately to maximize coverage time","Complete a pre-shift check of all assigned equipment and confirm radio communication functionality","Wait for the outgoing guard to complete a comprehensive verbal and written shift briefing","Review only the written post orders — verbal briefings from outgoing guards are not required"],answer:1},
{module:"Safety Awareness",ref:"BSIS Training Manual",q:"The tactical practice of never allowing two guards in the same patrol area to position themselves in a straight line is called:",options:["Situational mirroring","Tactical distancing","Tactical L positioning — reduces the risk of both guards being affected by a single threat","Zone suppression protocol"],answer:2},
{module:"Review",ref:"BPC §7583.6 | Officer Safety",q:"A guard observing a person engaging in pre-incident surveillance behavior — photographing access points and watching patrol patterns — should:",options:["Confront the person immediately to deter the behavior before it progresses","Document the specific behaviors observed and contact their supervisor to determine the appropriate response","Ignore the behavior unless the person commits an overt act that constitutes a crime","Wait for confirmation of criminal intent before documenting or reporting the observation"],answer:1},
{module:"Review",ref:"PPO License | BPC §7583.6",q:"MACCESS INC.'s California Private Patrol Operator license number — required to appear on all BSIS Certificates of Completion — is:",options:["#112233","#100001","#133445","#122729"],answer:3},
]},

HDP: { title:"Handling Difficult People — BSIS Elective Course", subtitle:"Elective Skills Training (4 Hrs) | MACCESS INC.", hours:"4", passingScore:100, bpcRef:"BPC §7583.6(b)",
questions:[
{module:"Communication Strategies",ref:"BSIS Training Manual",q:"The most effective opening strategy when approaching a person who is behaving in a difficult or uncooperative manner is to:",options:["Immediately establish authority by stating the consequences of continued non-compliance","Lead with empathy — acknowledge the situation before giving directives","State the post rule or policy that the person is violating, clearly and firmly","Step back and allow the person to resolve their own situation independently"],answer:1},
{module:"Communication Strategies",ref:"BSIS Training Manual",q:"Using 'I' statements in a difficult interaction — such as 'I need you to lower your voice' — is preferable because:",options:["'I' statements are more legally defensible in incident documentation","'I' statements express personal responsibility without creating an adversarial framing","'I' statements are always perceived as more authoritative than 'You' statements","'I' statements are required by BSIS protocol for all verbal contacts"],answer:1},
{module:"Communication Strategies",ref:"BSIS Training Manual",q:"A guard working a difficult interaction allows the person to speak for a minute before responding. This technique is known as:",options:["Passive disengagement — withdrawing from the conflict to reduce tension","Controlled venting — allowing brief emotional expression reduces hostility","Tactical silence — a use-of-force de-escalation tool requiring supervisor authorization","Permissive engagement — allowing the subject to control the interaction"],answer:1},
{module:"Communication Strategies",ref:"BSIS Training Manual",q:"When a difficult person's underlying need — rather than their stated demand — is identified and addressed, the conflict:",options:["Typically intensifies because addressing needs is perceived as weakness","Often de-escalates, as the person feels heard and their core concern has been recognized","Becomes a legal matter that requires supervisor escalation","Remains unchanged — underlying needs are not a security guard's concern"],answer:1},
{module:"Conflict Management",ref:"BSIS Training Manual",q:"The earliest stage of conflict escalation — and the stage where intervention is most effective — is:",options:["Manifest conflict — when parties openly engage in the dispute","Felt conflict — when emotions have begun to heighten","Perceived conflict — when parties believe conflict exists but it has not erupted","Potential conflict — when tension is present but conflict has not yet developed"],answer:3},
{module:"Conflict Management",ref:"BSIS Training Manual",q:"Which statement best reflects effective constructive speaking during a conflict interaction?",options:["'You always cause problems at this location — this is not the first time.'","'If you don't stop right now, I will be forced to take immediate action against you.'","'I understand this is frustrating. Here is what I can do to help resolve this.'","'I am not going to discuss this further until you calm yourself down completely.'"],answer:2},
{module:"Conflict Management",ref:"BSIS Training Manual",q:"Following through on stated consequences is critical in conflict management because:",options:["It satisfies BSIS documentation requirements for conflict interactions","Empty threats permanently destroy the guard's credibility and make future escalations more likely","It creates a clear legal record that the guard provided fair warning before taking action","Following through is not always necessary — situational judgment allows for flexibility"],answer:1},
{module:"Valuing Diversity",ref:"BPC §7583.6",q:"A security guard encounters a person who is speaking loudly in what appears to be an emotional cultural expression that is normal in their background. The guard should:",options:["Treat the loud speech as an immediate threat indicator and prepare for escalation","Recognize that loudness alone — without threatening content — may not indicate hostility or danger","Apply the same threat response that would be used for any other loud verbal confrontation","Contact law enforcement immediately — loud verbal behavior is a public safety concern"],answer:1},
{module:"Valuing Diversity",ref:"BPC §7583.6",q:"When a language barrier creates difficulty during a conflict interaction, the recommended approach is to:",options:["Speak more loudly and repeat commands with greater force — volume improves comprehension","Immediately call law enforcement — language barriers make security contact unsafe","Slow down, use simpler language, and seek an interpreter or translation tool if available","Assume non-cooperation and document the interaction as a refusal to comply"],answer:2},
{module:"Valuing Diversity",ref:"BPC §7583.6",q:"Offering realistic choices to a difficult person during a conflict interaction is effective because:",options:["It eliminates the guard's liability for any outcome the person chooses","Choices are a BSIS-mandated conflict resolution protocol for all difficult contacts","Providing choices restores the person's sense of control and reduces the psychological need to resist","Choices make the interaction proceed faster, which reduces the risk of escalation"],answer:2},
{module:"Negotiation",ref:"BSIS Training Manual",q:"When a guard finds common ground with a difficult person — such as 'We both want this to be resolved calmly' — this technique is known as:",options:["Collaborative framing — reorienting from adversarial to cooperative","Tactical deception — a legally questionable technique in California","Operational capitulation — surrendering ground to achieve compliance","Position bargaining — exchanging concessions to reach a mutually acceptable outcome"],answer:0},
{module:"Negotiation",ref:"BSIS Training Manual",q:"A guard is negotiating with a difficult person who demands an exception to a clearly stated post rule. The guard's response should be:",options:["Grant the exception to resolve the conflict and restore peace at the post","Make the exception if the person seems genuinely reasonable and likely to comply","Explain that the post rule cannot be negotiated — and offer to escalate to a supervisor who can assist","Threaten consequences and repeat the rule until the person complies"],answer:2},
{module:"Verbal Diffusion",ref:"BSIS Training Manual",q:"When a guard deliberately lowers their own voice in response to an agitated person speaking loudly, the intended effect is:",options:["To signal to the person that the guard is also becoming agitated","To demonstrate to bystanders that the guard is maintaining professional control","To model calm behavior — people often unconsciously mirror the tone and volume of those they are speaking with","To reduce the chance of a third party overhearing the exchange and intervening"],answer:2},
{module:"Verbal Diffusion",ref:"BSIS Training Manual",q:"Naming the emotion during a difficult interaction — such as 'It sounds like you are really frustrated right now' — is effective because:",options:["It shifts legal responsibility for the interaction to the subject","It demonstrates that the guard is taking the person seriously, which reduces perceived threat and defensiveness","It classifies the interaction as an emotional crisis, which changes the applicable BSIS protocol","It creates a formal record that the subject acknowledged the emotional statement"],answer:1},
{module:"Review",ref:"BPC §7583.6",q:"A guard observes that verbal de-escalation attempts are no longer reducing tension with a difficult subject — the subject is becoming more agitated. The appropriate next step is:",options:["Increase the intensity and firmness of verbal commands until compliance is achieved","Immediately apply physical restraint before the situation escalates further","Create distance, request backup, and allow the situation to stabilize before re-engaging","Continue the same de-escalation approach — consistency eventually produces compliance"],answer:2},
{module:"Review",ref:"PPO License | BPC §7583.6",q:"MACCESS INC.'s California Private Patrol Operator license number — which must appear on all BSIS Certificates of Completion — is:",options:["#112233","#100001","#133445","#122729"],answer:3},
]},

};

// ══════════════════════════════════════════════════════════════════
// ANSWER KEY BUILDER (shared)
// ══════════════════════════════════════════════════════════════════
function buildAnswerKey(bank, baseName) {
  const akPres = new pptxgen();
  akPres.layout = "LAYOUT_16x9";
  akPres.author = "MACCESS INC. — CONFIDENTIAL";
  akPres.title  = bank.title + " — INSTRUCTOR ANSWER KEY";

  const qs    = bank.questions;
  const LET   = ["A","B","C","D"];
  const CMAP  = { A:"1A5C3A", B:"1B2B5E", C:"7B3F00", D:"8B1A1A" };
  const today = new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});

  // Cover
  let sl = akPres.addSlide();
  sl.background = { color: NAVY };
  sl.addShape(akPres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.55, fill:{ color:RED } });
  sl.addText("CONFIDENTIAL — INSTRUCTOR USE ONLY — DO NOT DISTRIBUTE TO STUDENTS", {
    x:0, y:0, w:10, h:0.55, fontSize:11, bold:true, color:WHITE, fontFace:"Calibri", align:"center", valign:"middle", margin:0
  });
  sl.addShape(akPres.shapes.RECTANGLE, { x:0, y:4.65, w:10, h:1.0, fill:{ color:GOLD } });
  sl.addText("ANSWER KEY", { x:0.55, y:0.75, w:9, h:0.5, fontSize:16, bold:true, color:GOLD, fontFace:"Calibri", charSpacing:6, margin:0 });
  sl.addText(bank.title, { x:0.55, y:1.3, w:9, h:1.3, fontSize:28, bold:true, color:WHITE, fontFace:"Calibri", margin:0 });
  sl.addText("Instructor Copy — Retain Securely — Do Not Leave Unattended", { x:0.55, y:2.72, w:9, h:0.45, fontSize:13, italic:true, color:"CADCFC", fontFace:"Calibri", margin:0 });
  sl.addText(`${qs.length} Questions  |  Pass: ${bank.passingScore}%  |  ${bank.bpcRef}`, {
    x:0.55, y:3.3, w:9, h:0.35, fontSize:11, color:"9AAFCC", fontFace:"Calibri", margin:0
  });
  sl.addText("MACCESS INC.  |  PPO #122729", { x:0.55, y:4.72, w:5, h:0.5, fontSize:13, bold:true, color:NAVY, fontFace:"Calibri", valign:"middle", margin:0 });
  sl.addText(today, { x:5.65, y:4.72, w:4.2, h:0.5, fontSize:11, color:NAVY, fontFace:"Calibri", valign:"middle", align:"right", margin:0 });

  // Quick-reference answer grid
  let gr = akPres.addSlide();
  gr.background = { color: LIGHT };
  gr.addShape(akPres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{ color:NAVY } });
  gr.addText("QUICK REFERENCE — ALL ANSWERS", { x:0.4, y:0, w:7, h:0.82, fontSize:20, bold:true, color:WHITE, fontFace:"Calibri", valign:"middle", margin:0 });
  gr.addText(`${qs.length} Q  |  Pass: ${bank.passingScore}%`, { x:7.1, y:0, w:2.7, h:0.82, fontSize:12, color:GOLD, fontFace:"Calibri", valign:"middle", align:"right", margin:0 });
  qs.forEach((q, i) => {
    const col = i % 5, row = Math.floor(i / 5);
    const x = 0.28 + col * 1.9, y = 0.98 + row * 0.78;
    const al = LET[q.answer];
    gr.addShape(akPres.shapes.ROUNDED_RECTANGLE, { x, y, w:1.78, h:0.68, fill:{ color:WHITE }, rectRadius:0.07, shadow:ms() });
    gr.addShape(akPres.shapes.ROUNDED_RECTANGLE, { x, y, w:0.58, h:0.68, fill:{ color:CMAP[al]||NAVY }, rectRadius:0.07 });
    gr.addText(`Q${i+1}`, { x, y, w:0.58, h:0.68, fontSize:9, bold:true, color:WHITE, fontFace:"Calibri", align:"center", valign:"middle", margin:0 });
    gr.addText(al, { x:x+0.58, y, w:1.2, h:0.68, fontSize:22, bold:true, color:CMAP[al]||NAVY, fontFace:"Calibri", align:"center", valign:"middle", margin:0 });
  });
  gr.addText("MACCESS INC.  |  PPO #122729  |  INSTRUCTOR COPY — CONFIDENTIAL", {
    x:0, y:5.35, w:10, h:0.25, fontSize:8, italic:true, color:GRAY, fontFace:"Calibri", align:"center", margin:0
  });

  // Full Q&A — 3 per slide
  for (let i = 0; i < qs.length; i += 3) {
    let sl2 = akPres.addSlide();
    sl2.background = { color: LIGHT };
    sl2.addShape(akPres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.48, fill:{ color:RED } });
    sl2.addText("INSTRUCTOR ANSWER KEY — CONFIDENTIAL", {
      x:0.3, y:0, w:6.5, h:0.48, fontSize:10, bold:true, color:WHITE, fontFace:"Calibri", valign:"middle", margin:0
    });
    sl2.addText(bank.title, { x:6.8, y:0, w:3, h:0.48, fontSize:8, color:WHITE, fontFace:"Calibri", valign:"middle", align:"right", margin:0 });
    [qs[i], qs[i+1], qs[i+2]].filter(Boolean).forEach((q, qi) => {
      const qn = i + qi + 1, al = LET[q.answer], yb = 0.56 + qi * 1.68;
      sl2.addShape(akPres.shapes.ROUNDED_RECTANGLE, { x:0.25, y:yb, w:9.5, h:1.56, fill:{ color:WHITE }, rectRadius:0.09, shadow:ms() });
      sl2.addShape(akPres.shapes.OVAL, { x:0.32, y:yb+0.14, w:0.52, h:0.52, fill:{ color:NAVY } });
      sl2.addText(String(qn), { x:0.32, y:yb+0.14, w:0.52, h:0.52, fontSize:12, bold:true, color:WHITE, fontFace:"Calibri", align:"center", valign:"middle", margin:0 });
      sl2.addText(q.module||"", { x:0.95, y:yb+0.09, w:5.5, h:0.25, fontSize:7.5, italic:true, color:GRAY, fontFace:"Calibri", margin:0 });
      sl2.addText(q.ref||"", { x:6.55, y:yb+0.09, w:3.0, h:0.25, fontSize:7.5, italic:true, color:GRAY, fontFace:"Calibri", align:"right", margin:0 });
      sl2.addText(q.q, { x:0.95, y:yb+0.36, w:8.5, h:0.48, fontSize:10.5, bold:true, color:"1A1A2E", fontFace:"Calibri", margin:0 });
      q.options.forEach((opt, oi) => {
        const isC = oi === q.answer;
        const col = oi % 2, row2 = Math.floor(oi / 2);
        sl2.addText((isC ? "✓ " : "   ") + LET[oi] + ". " + opt, {
          x:0.95 + col * 4.35, y:yb + 0.94 + row2 * 0.27, w:4.1, h:0.24,
          fontSize:9, bold:isC, color:isC ? GREEN : GRAY, fontFace:"Calibri", margin:0
        });
      });
      sl2.addShape(akPres.shapes.ROUNDED_RECTANGLE, { x:8.9, y:yb+0.88, w:0.7, h:0.56, fill:{ color:GREEN }, rectRadius:0.06 });
      sl2.addText(al, { x:8.9, y:yb+0.88, w:0.7, h:0.56, fontSize:22, bold:true, color:WHITE, fontFace:"Calibri", align:"center", valign:"middle", margin:0 });
    });
  }

  // Scoring guide
  let sg = akPres.addSlide();
  sg.background = { color: LIGHT };
  sg.addShape(akPres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.82, fill:{ color:NAVY } });
  sg.addText("SCORING GUIDE & INSTRUCTOR NOTES", {
    x:0.4, y:0, w:9, h:0.82, fontSize:20, bold:true, color:WHITE, fontFace:"Calibri", valign:"middle", margin:0
  });
  const sgRows = [
    ["Passing Score",     `${bank.passingScore}% — all ${qs.length} questions correct required per ${bank.bpcRef}`],
    ["Failed Assessment", "Full retake required. Student must review all course modules before retaking."],
    ["Certificate",       "Issue Certificate of Completion ONLY upon 100% score. Sign, date, and retain a copy."],
    ["Record Retention",  "Retain each student's assessment record for duration of employment. Available to BSIS on request per Title 16 CCR §643(b)."],
    ["Confidentiality",   "This answer key is for MACCESS INC. instructor use only. Never share with students before, during, or after assessment."],
    ["Live Scan",         "Live Scan integration is pending equipment acquisition. When active, completed LS records will be stored alongside training records."],
  ];
  sgRows.forEach(([lbl, txt], i) => {
    const y = 1.0 + i * 0.78;
    sg.addShape(akPres.shapes.ROUNDED_RECTANGLE, { x:0.3, y, w:9.4, h:0.7, fill:{ color:WHITE }, rectRadius:0.08, shadow:ms() });
    sg.addText(lbl, { x:0.4, y, w:2.0, h:0.7, fontSize:10, bold:true, color:NAVY, fontFace:"Calibri", valign:"middle", margin:4 });
    sg.addText(txt, { x:2.5, y, w:7.1, h:0.7, fontSize:9.5, color:"1A1A2E", fontFace:"Calibri", valign:"middle", margin:4 });
  });

  return akPres;
}

// ══════════════════════════════════════════════════════════════════
// HTML TEST BUILDER (shared — all modules)
// ══════════════════════════════════════════════════════════════════
function buildHTMLTest(bank) {
  const qs    = bank.questions;
  const today = new Date().toLocaleDateString("en-US", { year:"numeric", month:"long", day:"numeric" });
  const qsJ   = JSON.stringify(qs)
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$");
  const lsJ   = JSON.stringify(LIVE_SCAN_CONFIG)
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$");

  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${bank.title} | MACCESS INC. BSIS Assessment</title>
<style>
:root{--n:#1B2B5E;--g:#C9A84C;--r:#8B1A1A;--ok:#1A5C3A;--l:#F4F6FB;--gr:#4A5568;--wh:#fff;}
*{box-sizing:border-box;margin:0;padding:0;}body{font-family:'Segoe UI',Arial,sans-serif;background:var(--l);color:#1A1A2E;}
.hd{background:var(--n);color:#fff;padding:14px 28px;display:flex;justify-content:space-between;align-items:center;}
.hl{font-size:20px;font-weight:700;letter-spacing:.04em;}.hm{font-size:11px;color:#CADCFC;text-align:right;line-height:1.55;}
.gb{height:5px;background:var(--g);}
.sc{display:none;max-width:860px;margin:0 auto;padding:26px 18px;}.sc.on{display:block;}
.cd{background:var(--wh);border-radius:10px;border:1px solid #dde4f0;padding:30px 38px;margin-top:20px;}
.cd h1{font-size:22px;color:var(--n);margin-bottom:6px;}.sub{color:var(--gr);font-size:13px;margin-bottom:18px;}
.ig{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:18px;}
.ic{background:var(--l);border-radius:8px;padding:11px 14px;}.ib{font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:var(--gr);margin-bottom:2px;}.iv{font-size:17px;font-weight:700;color:var(--n);}
.wn{background:#FFF8E1;border-radius:8px;padding:12px 15px;font-size:13px;color:#7B4F00;margin-bottom:16px;line-height:1.6;}
.fl{display:block;font-size:12px;font-weight:600;color:var(--gr);margin:11px 0 4px;}
input{width:100%;padding:9px 12px;border:1.5px solid #D0D8E8;border-radius:8px;font-size:14px;outline:none;}input:focus{border-color:var(--n);}
.btn{display:block;width:100%;padding:11px;border-radius:8px;font-size:15px;font-weight:600;cursor:pointer;border:none;margin-top:14px;text-align:center;}
.bp{background:var(--n);color:#fff;}.bg{background:var(--g);color:var(--n);}.bo{background:var(--wh);color:var(--n);border:1.5px solid var(--n);}.bs{display:inline-block;width:auto;padding:9px 20px;}
.pw{background:var(--wh);border-radius:10px;padding:12px 16px;margin-bottom:14px;border:1px solid #dde4f0;display:flex;align-items:center;gap:12px;}
.pb{flex:1;height:8px;background:#E8EDF6;border-radius:4px;overflow:hidden;}.pf{height:100%;background:var(--n);border-radius:4px;transition:width .3s;}.pt{font-size:12px;color:var(--gr);white-space:nowrap;}
.mb{background:var(--l);border:1px solid #D0D8E8;border-radius:6px;padding:4px 10px;font-size:10px;font-weight:600;color:var(--n);margin-bottom:8px;display:inline-block;}.rf{font-size:10px;color:var(--gr);margin-left:6px;font-style:italic;}
.qc{background:var(--wh);border-radius:10px;border:1px solid #dde4f0;padding:22px 26px;margin-bottom:14px;}
.qn{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--g);margin-bottom:7px;}.qt{font-size:15px;font-weight:600;line-height:1.5;margin-bottom:16px;}
.opts{display:flex;flex-direction:column;gap:8px;}
.op{display:flex;align-items:center;gap:10px;padding:9px 13px;border:1.5px solid #D0D8E8;border-radius:8px;cursor:pointer;font-size:13px;transition:all .15s;}
.op:hover{border-color:var(--n);background:#F0F4FB;}.op.sl{border-color:var(--n);background:#EBF0FB;}.op.ok{border-color:var(--ok)!important;background:#EAF3DE!important;color:var(--ok);}.op.no{border-color:var(--r)!important;background:#FCEBEB!important;color:var(--r);}
.ol{width:26px;height:26px;border-radius:50%;background:var(--l);font-weight:700;font-size:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--n);border:1.5px solid #D0D8E8;}
.op.sl .ol{background:var(--n);color:#fff;border-color:var(--n);}.op.ok .ol{background:var(--ok);color:#fff;border-color:var(--ok);}.op.no .ol{background:var(--r);color:#fff;border-color:var(--r);}
.fb{margin-top:11px;padding:9px 13px;border-radius:8px;font-size:13px;line-height:1.6;}.fb-ok{background:#EAF3DE;color:var(--ok);}.fb-no{background:#FCEBEB;color:var(--r);}
.nr{display:flex;justify-content:space-between;align-items:center;margin-top:8px;}
.bn{padding:9px 20px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;}.bn-o{background:var(--wh);color:var(--n);border:1.5px solid var(--n);}.bn-p{background:var(--n);color:#fff;border:none;}
.rc{background:var(--wh);border-radius:10px;border:1px solid #dde4f0;padding:34px 38px;margin-top:20px;text-align:center;}
.sr{width:130px;height:130px;border-radius:50%;margin:0 auto 18px;display:flex;align-items:center;justify-content:center;flex-direction:column;font-size:30px;font-weight:700;}
.sr-ok{background:#EAF3DE;color:var(--ok);border:4px solid var(--ok);}.sr-no{background:#FCEBEB;color:var(--r);border:4px solid var(--r);}
.sl2{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-top:2px;}
.r2{font-size:21px;font-weight:700;margin-bottom:7px;}.rp{color:var(--ok);}.rn{color:var(--r);}
.rs{color:var(--gr);font-size:13px;margin-bottom:20px;line-height:1.6;}
.bd{background:var(--l);border-radius:8px;padding:15px 18px;margin-bottom:20px;text-align:left;}
.bd h3{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--n);margin-bottom:9px;}
.br{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #dde4f0;font-size:13px;}.br:last-child{border-bottom:none;}
.sp{color:var(--ok);font-weight:600;}.sf{color:var(--r);font-weight:600;}
.brow{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:14px;}
.bn2{background:#EBF0FB;border-radius:8px;padding:11px 14px;font-size:12px;color:var(--n);line-height:1.6;text-align:left;}
/* Live Scan section */
.lss{margin-top:24px;border:2px dashed var(--g);border-radius:10px;padding:24px 28px;background:#FFFDF5;}
.lsh{display:flex;align-items:center;gap:10px;margin-bottom:12px;}
.lsb{background:var(--n);color:var(--g);font-size:10px;font-weight:700;padding:3px 10px;border-radius:5px;letter-spacing:.04em;}
.lst{font-size:16px;font-weight:700;color:var(--n);}.lsc{font-size:13px;color:var(--gr);line-height:1.7;margin-bottom:14px;}
.lspend{background:#FFF8E1;border:1px solid var(--g);border-radius:8px;padding:13px 16px;font-size:13px;color:#7B4F00;line-height:1.6;}
/* Certificate */
@media print{.np{display:none!important;}.sc{padding:0;max-width:100%;}}
.cw{background:var(--wh);border:3px double var(--n);border-radius:4px;padding:40px 48px;margin:20px 0;text-align:center;position:relative;}
.cw::before{content:'';position:absolute;inset:8px;border:1px solid var(--g);border-radius:2px;pointer-events:none;}
.ch{font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--n);margin-bottom:5px;}
.cc{font-size:21px;font-weight:700;color:var(--n);margin-bottom:2px;}.cp{font-size:11px;color:var(--gr);margin-bottom:20px;}
.cn{font-size:27px;font-weight:700;color:var(--n);border-bottom:2px solid var(--n);display:inline-block;min-width:260px;padding-bottom:3px;margin-bottom:14px;}
.cb{font-size:13px;color:var(--gr);line-height:1.8;margin-bottom:4px;}.cco{font-size:15px;font-weight:700;color:var(--n);margin-bottom:11px;}
.csb{display:inline-block;background:#EAF3DE;color:var(--ok);border-radius:6px;padding:4px 13px;font-size:12px;font-weight:600;margin-bottom:18px;}
.cgb{height:5px;background:var(--g);border-radius:3px;margin:14px 0;}
.css{display:flex;justify-content:space-around;margin-top:24px;gap:16px;}.csi{flex:1;text-align:center;}.csi .ln{border-top:1.5px solid var(--n);margin-bottom:4px;}.csi .sl3{font-size:11px;color:var(--gr);}
.ft{background:var(--n);color:#CADCFC;text-align:center;padding:12px;font-size:11px;margin-top:30px;}
</style></head><body>
<div class="hd"><div class="hl">MACCESS INC.</div><div class="hm">PPO License #122729 | BSIS-Authorized Training Provider<br/>Secure Course Assessment Platform</div></div>
<div class="gb"></div>

<!-- COVER SCREEN -->
<div class="sc on" id="sc-cover"><div class="cd">
  <h1>${bank.title}</h1><div class="sub">${bank.subtitle}</div>
  <div class="ig">
    <div class="ic"><div class="ib">Questions</div><div class="iv">${qs.length}</div></div>
    <div class="ic"><div class="ib">Passing Score</div><div class="iv">${bank.passingScore}%</div></div>
    <div class="ic"><div class="ib">Training Hours</div><div class="iv">${bank.hours} Hrs</div></div>
    <div class="ic"><div class="ib">Authority</div><div class="iv" style="font-size:12px;">${bank.bpcRef}</div></div>
  </div>
  <div class="wn">&#9888; <strong>BSIS Requirement:</strong> A score of <strong>${bank.passingScore}%</strong> is required per ${bank.bpcRef}. Full retake required below ${bank.passingScore}%.</div>
  <label class="fl">Full Legal Name * (as it appears on your certificate)</label>
  <input type="text" id="iname" placeholder="First Middle Last"/>
  <label class="fl">Email Address *</label>
  <input type="email" id="iemail" placeholder="your@email.com"/>
  <label class="fl">Date</label>
  <input type="text" id="idate" value="${today}" readonly/>
  <button class="btn bp" onclick="start()">Begin Assessment &#8594;</button>
</div></div>

<!-- TEST SCREEN -->
<div class="sc" id="sc-test">
  <div class="pw"><div class="pb"><div class="pf" id="pf" style="width:0%"></div></div><div class="pt" id="pt">Q 1 of ${qs.length}</div></div>
  <div id="qa"></div>
  <div class="nr">
    <button class="bn bn-o" id="bprev" onclick="prev()" style="display:none">&#8592; Previous</button>
    <button class="bn bn-p" id="bnext" onclick="nxt()">Next &#8594;</button>
  </div>
</div>

<!-- RESULTS SCREEN -->
<div class="sc" id="sc-res"><div class="rc">
  <div class="sr" id="sring"><span id="spct">0%</span><span class="sl2" id="slbl">Score</span></div>
  <div class="r2" id="rtitle"></div><div class="rs" id="rsub"></div>
  <div class="bd" id="bdown"></div>
  <div class="brow" id="rbtns"></div>
  <div class="bn2" id="rbsis"></div>
  <div class="lss" id="lss" style="display:none">
    <div class="lsh"><div class="lsb">LIVE SCAN</div><div class="lst">BSIS Live Scan Fingerprinting — MACCESS INC.</div></div>
    <div class="lsc" id="lsc"></div>
    <div id="lscontent"></div>
  </div>
</div></div>

<!-- CERTIFICATE SCREEN -->
<div class="sc" id="sc-cert">
  <div class="np" style="text-align:center;margin-bottom:14px;display:flex;gap:10px;justify-content:center;">
    <button class="btn bg bs" onclick="window.print()">&#128438; Print Certificate</button>
    <button class="btn bo bs" onclick="show('sc-res')">&#8592; Results</button>
  </div>
  <div class="cw" id="ca"></div>
</div>

<div class="ft">MACCESS INC. | Private Security LA Worldwide (PSLAW) | PPO License #122729 | BSIS-Authorized Training Provider</div>

<script>
const QS=JSON.parse(\`${qsJ}\`);
const PASS=${bank.passingScore};
const LS=JSON.parse(\`${lsJ}\`);
const LT=['A','B','C','D'];
let cur=0,ans=new Array(QS.length).fill(null),dn=new Array(QS.length).fill(false),nm='',em='';
function show(id){document.querySelectorAll('.sc').forEach(s=>s.classList.remove('on'));document.getElementById(id).classList.add('on');window.scrollTo(0,0);}
function start(){nm=document.getElementById('iname').value.trim();em=document.getElementById('iemail').value.trim();if(!nm){alert('Please enter your full legal name.');return;}if(!em||!em.includes('@')){alert('Please enter a valid email.');return;}show('sc-test');renderQ();}
function renderQ(){const q=QS[cur];document.getElementById('pf').style.width=Math.round((cur/QS.length)*100)+'%';document.getElementById('pt').textContent='Question '+(cur+1)+' of '+QS.length;document.getElementById('bprev').style.display=cur>0?'inline-block':'none';document.getElementById('bnext').textContent=cur===QS.length-1?'Submit Assessment':'Next \u2192';const c=dn[cur],s=ans[cur];const oh=q.options.map((o,i)=>{let cl='op';if(c){if(i===q.answer)cl+=' ok';else if(i===s&&i!==q.answer)cl+=' no';}else if(i===s)cl+=' sl';const oc=c?'':('onclick="pick('+i+')"');return '<div class="'+cl+'" '+oc+'><div class="ol">'+LT[i]+'</div><span>'+o+'</span></div>';}).join('');let fb='';if(c){if(s===q.answer)fb='<div class="fb fb-ok">\u2713 Correct \u2014 '+q.ref+'</div>';else fb='<div class="fb fb-no">\u2717 Incorrect. Correct: <strong>'+LT[q.answer]+'. '+q.options[q.answer]+'</strong> \u2014 '+q.ref+'</div>';}document.getElementById('qa').innerHTML='<div class="mb">'+q.module+'<span class="rf">'+q.ref+'</span></div><div class="qc"><div class="qn">Question '+(cur+1)+' of '+QS.length+'</div><div class="qt">'+q.q+'</div><div class="opts">'+oh+'</div>'+fb+'</div>';}
function pick(i){if(dn[cur])return;ans[cur]=i;dn[cur]=true;renderQ();}
function nxt(){if(!dn[cur]){alert('Please select an answer.');return;}if(cur<QS.length-1){cur++;renderQ();}else showRes();}
function prev(){if(cur>0){cur--;renderQ();}}
function showRes(){show('sc-res');let co=0;const mm={};QS.forEach((q,i)=>{if(ans[i]===q.answer)co++;if(!mm[q.module])mm[q.module]={c:0,t:0};mm[q.module].t++;if(ans[i]===q.answer)mm[q.module].c++;});const pct=Math.round((co/QS.length)*100),pass=pct>=PASS;const ring=document.getElementById('sring');ring.className='sr '+(pass?'sr-ok':'sr-no');document.getElementById('spct').textContent=pct+'%';document.getElementById('slbl').textContent=pass?'PASSED':'NOT PASSED';const rt=document.getElementById('rtitle');rt.className='r2 '+(pass?'rp':'rn');rt.textContent=pass?'\u2713 Assessment Passed':'\u2717 Assessment Not Passed';document.getElementById('rsub').innerHTML=pass?'Congratulations, <strong>'+nm+'</strong>. You answered '+co+' of '+QS.length+' correctly and satisfied the BSIS requirement per ${bank.bpcRef}.':'You answered '+co+' of '+QS.length+' ('+pct+'%). A score of ${bank.passingScore}% is required per ${bank.bpcRef}. Review all modules and retake the full assessment.';let bh='<h3>Score by Module</h3>';for(const[m,d] of Object.entries(mm)){const mp=Math.round((d.c/d.t)*100);bh+='<div class="br"><span style="color:var(--gr)">'+m+'</span><span class="'+(mp===100?'sp':'sf')+'">'+d.c+'/'+d.t+' ('+mp+'%)</span></div>';}bh+='<div class="br" style="font-weight:700"><span>Overall</span><span class="'+(pass?'sp':'sf')+'">'+co+'/'+QS.length+' ('+pct+'%)</span></div>';document.getElementById('bdown').innerHTML=bh;let btns=pass?'<button class="btn bg bs" onclick="showCert()">View Certificate \u2192</button>':'';btns+='<button class="btn bo bs" onclick="retake()">'+(pass?'Retake':'&#8635; Retake Assessment')+'</button>';document.getElementById('rbtns').innerHTML=btns;document.getElementById('rbsis').innerHTML=pass?'<strong>BSIS Compliance:</strong> This certificate satisfies the ${bank.hours}-hour training requirement under ${bank.bpcRef}. Print and retain. MACCESS INC. maintains your record per Title 16 CCR \u00a7643(b).':'<strong>BSIS Requirement:</strong> ${bank.passingScore}% is the minimum per ${bank.bpcRef}. Full retake required. Review all modules before retaking.';if(pass){document.getElementById('lss').style.display='block';document.getElementById('lsc').textContent=LS.enabled?'You have passed. If you have completed BSIS Live Scan fingerprinting at a MACCESS INC. facility, you may upload your receipt below.':LS.pendingMessage;document.getElementById('lscontent').innerHTML=LS.showUploadSlot?'<p style="color:#1A5C3A;font-size:13px;font-weight:600;">Upload slot active \u2014 contact system administrator to configure.</p>':'<div class="lspend">\uD83D\uDCCB <strong>Coming Soon:</strong> '+LS.pendingMessage+'</div>';}}
function retake(){cur=0;ans=new Array(QS.length).fill(null);dn=new Array(QS.length).fill(false);show('sc-test');renderQ();}
function showCert(){const d=new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});document.getElementById('ca').innerHTML='<div class="ch">Certificate of Completion</div><div class="cgb"></div><div class="cc">MACCESS INC.</div><div class="cp">Private Patrol Operator | PPO License #122729 | BSIS-Authorized Training Provider</div><div class="cb">This certifies that</div><div class="cn">'+nm+'</div><div class="cb">has successfully completed the BSIS-compliant training course:</div><div class="cco">${bank.title}</div><div class="csb">Score: ${bank.passingScore}% \u2713 Passing</div><div class="cb">This completion satisfies the ${bank.hours}-hour training requirement under ${bank.bpcRef} and California BSIS training standards.<br/>Retain until guard card expires or is canceled \u2014 Title 16 CCR \u00a7643(b).</div><div class="cgb"></div><div class="css"><div class="csi"><div class="ln"></div><div class="sl3">Student Signature</div></div><div class="csi"><div class="ln"></div><div class="sl3">Date: '+d+'</div></div><div class="csi"><div class="ln"></div><div class="sl3">Instructor \u2014 MACCESS INC.</div></div></div>';show('sc-cert');}
</script></body></html>`;
}

// ══════════════════════════════════════════════════════════════════
// GITHUB PUSH
// ══════════════════════════════════════════════════════════════════
function pushGH(localPath, repoPath, message) {
  return new Promise(resolve => {
    const data = fs.readFileSync(localPath);
    const enc  = data.toString("base64");
    const getO = { hostname:"api.github.com", path:`/repos/${REPO}/contents/${encodeURIComponent(repoPath)}`, method:"GET", headers:{"Authorization":`token ${TOKEN}`,"User-Agent":"MACCESS"} };
    https.request(getO, r => {
      let b=""; r.on("data", d=>b+=d);
      r.on("end", () => {
        let sha=""; try{sha=JSON.parse(b).sha||"";}catch{}
        const pay=JSON.stringify({message,content:enc,branch:"main",...(sha&&{sha})});
        const putO={hostname:"api.github.com",path:`/repos/${REPO}/contents/${encodeURIComponent(repoPath)}`,method:"PUT",headers:{"Authorization":`token ${TOKEN}`,"Content-Type":"application/json","User-Agent":"MACCESS","Content-Length":Buffer.byteLength(pay)}};
        const pr=https.request(putO,r2=>{let b2="";r2.on("data",d=>b2+=d);r2.on("end",()=>{try{resolve("content" in JSON.parse(b2));}catch{resolve(false);}});});
        pr.write(pay);pr.end();
      });
    }).end();
  });
}

// ══════════════════════════════════════════════════════════════════
// BUILD ONE MODULE
// ══════════════════════════════════════════════════════════════════
async function buildModule(baseName, pptxBuilder, bank) {
  const DIR    = "PSLAW-Courses/final-projects";
  const pptxOut = `/home/claude/${baseName}.pptx`;
  const pptxPdf = `/home/claude/${baseName}.pdf`;
  const htmlOut = `/home/claude/${baseName}-Test.html`;
  const akOut   = `/home/claude/${baseName}-AnswerKey.pptx`;
  const akPdf   = `/home/claude/${baseName}-AnswerKey.pdf`;

  console.log(`\n${"═".repeat(64)}`);
  console.log(`  ${baseName}`);
  console.log(`  ${bank.questions.length} questions | ${bank.hours} hrs | ${bank.bpcRef}`);
  console.log(`${"═".repeat(64)}`);

  // 1. Course PPTX
  const coursePres = pptxBuilder();
  await coursePres.writeFile({ fileName: pptxOut });
  try { execSync(`python3 /mnt/skills/public/pptx/scripts/rezip.py "${pptxOut}"`, { stdio:"pipe" }); } catch{}
  try { execSync(`python3 /mnt/skills/public/pptx/scripts/office/soffice.py --headless --convert-to pdf "${pptxOut}"`, { stdio:"pipe" }); } catch(e){}
  console.log(`  ✓ Course PPTX${fs.existsSync(pptxPdf)?" + PDF":""}`);

  // 2. HTML Test
  fs.writeFileSync(htmlOut, buildHTMLTest(bank));
  console.log(`  ✓ Interactive HTML Test (${bank.questions.length} questions, Live Scan stub)`);

  // 3. Answer Key PPTX
  const akPres = buildAnswerKey(bank, baseName);
  await akPres.writeFile({ fileName: akOut });
  try { execSync(`python3 /mnt/skills/public/pptx/scripts/rezip.py "${akOut}"`, { stdio:"pipe" }); } catch{}
  try { execSync(`python3 /mnt/skills/public/pptx/scripts/office/soffice.py --headless --convert-to pdf "${akOut}"`, { stdio:"pipe" }); } catch{}
  console.log(`  ✓ Answer Key PPTX${fs.existsSync(akPdf)?" + PDF":""}`);

  // 4. Push all to GitHub
  const uploads = [
    [pptxOut, `${DIR}/${baseName}.pptx`,           `feat: ${bank.title} — Course PPTX`],
    ...(fs.existsSync(pptxPdf)?[[pptxPdf,`${DIR}/${baseName}.pdf`,`feat: ${bank.title} — Course PDF`]]:[]),
    [htmlOut, `${DIR}/${baseName}-Test.html`,       `feat: ${bank.title} — Interactive Test (Live Scan stub)`],
    [akOut,   `${DIR}/${baseName}-AnswerKey.pptx`,  `feat: ${bank.title} — Answer Key PPTX`],
    ...(fs.existsSync(akPdf)?[[akPdf,`${DIR}/${baseName}-AnswerKey.pdf`,`feat: ${bank.title} — Answer Key PDF`]]:[]),
  ];
  console.log("  Pushing to GitHub...");
  for (const [local, remote, msg] of uploads) {
    if (!fs.existsSync(local)) continue;
    const ok = await pushGH(local, remote, msg);
    console.log(`    ${ok?"✅":"❌"} ${remote.split("/").pop()}`);
  }
}

// ══════════════════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════════════════
async function main() {
  const modules = [
    { base:"Appropriate_Use_of_Force_BSIS_Certification_MACCESS_INC",       builder:buildAUF,          bank:BANKS.AUF },
    { base:"Public_Relations_Community_BSIS_Skills_MACCESS_INC",             builder:buildPR,           bank:BANKS.PR  },
    { base:"Observation_Documentation_BSIS_Skills_MACCESS_INC",              builder:buildOD,           bank:BANKS.OD  },
    { base:"Communication_Significance_BSIS_Skills_MACCESS_INC",             builder:buildComm,         bank:BANKS.COMM},
    { base:"Liability_Legal_Aspects_BSIS_Skills_MACCESS_INC",                builder:buildLiability,    bank:BANKS.LAW },
    { base:"Officer_Safety_BSIS_Skills_MACCESS_INC",                         builder:buildOfficerSafety,bank:BANKS.OS  },
    { base:"Handling_Difficult_People_BSIS_Skills_MACCESS_INC",              builder:buildHDP,          bank:BANKS.HDP },
  ];

  console.log("\nMACCESS INC. — BSIS Complete Module Suite Builder");
  console.log(`Building ${modules.length} modules — ${modules.reduce((a,m)=>a+m.bank.questions.length,0)} total questions\n`);

  for (const m of modules) {
    await buildModule(m.base, m.builder, m.bank);
  }

  console.log(`\n${"═".repeat(64)}`);
  console.log("  ALL MODULES COMPLETE");
  console.log(`${"═".repeat(64)}`);
  console.log("  Repo: MaccPSLAW/Licensing-Live-Scans-");
  console.log("  Path: PSLAW-Courses/final-projects/");
  console.log("");
  console.log("  Modules built:");
  modules.forEach(m => console.log(`  • ${m.bank.title}`));
  console.log("");
  console.log("  Live Scan stub active in all HTML tests.");
  console.log("  Activate: update LIVE_SCAN_CONFIG in this script when equipment arrives.\n");

  // Auto-update README — no manual step needed
  await autoUpdateReadme(TOKEN);
}

main().catch(console.error);
