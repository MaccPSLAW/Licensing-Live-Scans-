/**
 * MACCESS INC. — BSIS Course Test Generator
 * Generates a formatted PPTX test document from any course PowerPoint.
 *
 * Usage:
 *   node generate_test.js "Powers_to_Arrest_BSIS_Certification_MACCESS_INC.pptx"
 *
 * Output:
 *   Powers_to_Arrest_BSIS_Certification_MACCESS_INC-Test.pptx  (+ .pdf)
 *   Pushed to: MaccPSLAW/Licensing-Live-Scans-/PSLAW-Courses/final-projects/
 *
 * The question bank is embedded per course. To add a new course,
 * add its key and question bank to COURSE_BANKS below.
 */

const pptxgen = require("pptxgenjs");
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const https = require("https");

// ── Brand ──────────────────────────────────────────────────
const NAVY  = "1B2B5E";
const GOLD  = "C9A84C";
const WHITE = "FFFFFF";
const LIGHT = "F4F6FB";
const DARK  = "12193A";
const GRAY  = "4A5568";
const RED   = "8B1A1A";
const GREEN = "1A5C3A";

// ── GitHub config ──────────────────────────────────────────
const TOKEN = process.env.GITHUB_TOKEN; // export GITHUB_TOKEN=your_personal_access_token
const REPO  = "MaccPSLAW/Licensing-Live-Scans-";

// ══════════════════════════════════════════════════════════
// QUESTION BANKS — add new courses here
// Each question: { q, options:[A,B,C,D], answer:"A"|"B"|"C"|"D", ref, module }
// ══════════════════════════════════════════════════════════
const COURSE_BANKS = {

// ─────────────────────────────────────────────────────────
"powers_to_arrest": {
  title: "Powers to Arrest — BSIS Certification Course",
  passingScore: 100,
  totalQuestions: 50,
  questions: [
    // MODULE 1 — Legal Framework
    { module:"Module 1", ref:"BPC §7583.7",
      q:"Which California law requires security guards to complete Power to Arrest training before receiving a guard card?",
      options:["A. California Penal Code §837","B. Business and Professions Code §7583.7","C. Title 16 California Code of Regulations","D. California Penal Code §847"],
      answer:"B" },
    { module:"Module 1", ref:"BPC §7583.7",
      q:"What score must a student achieve on the BSIS Power to Arrest exam to receive a Certificate of Completion?",
      options:["A. 70%","B. 80%","C. 90%","D. 100%"],
      answer:"D" },
    { module:"Module 1", ref:"DCA PTA Manual July 2023",
      q:"Which manual is required to be used for Power to Arrest and Appropriate Use of Force training?",
      options:["A. California Security Officer Handbook 2022","B. DCA Power to Arrest and Appropriate Use of Force Training Manual, July 2023","C. BSIS Regulatory Guide Title 16","D. California Penal Code Annotated"],
      answer:"B" },
    { module:"Module 1", ref:"BPC §7583.7",
      q:"As a security guard in California, your arrest authority comes from the same law that applies to:",
      options:["A. A sworn police officer","B. A private citizen","C. A licensed investigator","D. A government contractor"],
      answer:"B" },
    { module:"Module 1", ref:"BPC §7583.7 | SB 652 (2026)",
      q:"Under SB 652 (effective January 1, 2026), the full 8-hour PTA + AUF training must be delivered by:",
      options:["A. Any two BSIS-approved providers","B. The applicant's employer only","C. A single BSIS-approved course provider","D. An online provider plus a separate in-person facility"],
      answer:"C" },
    { module:"Module 1", ref:"SB 652 | BPC §7583.6",
      q:"How long before a guard card application must the 8-hour PTA/AUF training be completed?",
      options:["A. 30 days","B. 3 months","C. 6 months","D. 1 year"],
      answer:"C" },

    // MODULE 2 — PC §837
    { module:"Module 2", ref:"PC §837",
      q:"California Penal Code §837 lists how many conditions under which a private person may make a citizen's arrest?",
      options:["A. Two","B. Three","C. Four","D. Five"],
      answer:"B" },
    { module:"Module 2", ref:"PC §837(1)",
      q:"Under PC §837(1), a security guard may make a citizen's arrest when a public offense is:",
      options:["A. Reported by a witness","B. Committed or attempted in the guard's presence","C. Captured on CCTV footage","D. Suspected based on prior criminal history"],
      answer:"B" },
    { module:"Module 2", ref:"PC §837(2)",
      q:"Under PC §837(2), a guard may arrest someone for a felony that was NOT committed in their presence if:",
      options:["A. A supervisor authorizes the arrest","B. The guard has a hunch the person is guilty","C. The guard knows the person committed the felony","D. The property owner requests the arrest"],
      answer:"C" },
    { module:"Module 2", ref:"PC §837(3)",
      q:"PC §837(3) requires that for a reasonable-cause felony arrest, a felony must:",
      options:["A. Be suspected but not confirmed","B. Have actually been committed in fact","C. Have been reported to police first","D. Involve violence or weapons"],
      answer:"B" },
    { module:"Module 2", ref:"PC §837",
      q:"A guard receives a report that someone stole from the store yesterday. The guard did not witness the theft. Can the guard make a citizen's arrest for this misdemeanor?",
      options:["A. Yes — any theft justifies arrest","B. Yes — with supervisor approval","C. No — misdemeanor arrest requires personal observation","D. No — only police can arrest for theft"],
      answer:"C" },
    { module:"Module 2", ref:"PC §837(3)",
      q:"Which PC §837 arrest condition carries the greatest risk of personal liability if used incorrectly?",
      options:["A. §837(1) — offense in presence","B. §837(2) — felony by that person","C. §837(3) — reasonable cause for felony","D. All conditions carry equal risk"],
      answer:"C" },
    { module:"Module 2", ref:"PC §837",
      q:"A security guard witnesses a person vandalizing a car in the parking lot. Which PC §837 condition applies?",
      options:["A. §837(1) — public offense in presence","B. §837(2) — felony committed by the person","C. §837(3) — reasonable cause","D. None — vandalism cannot justify arrest"],
      answer:"A" },
    { module:"Module 2", ref:"PC §837",
      q:"\"Reasonable cause\" under PC §837 means:",
      options:["A. A gut feeling the person looks suspicious","B. Objective facts supporting a belief the person committed a felony","C. A witness statement alone","D. Prior criminal history of the person"],
      answer:"B" },

    // MODULE 3 — Limitations
    { module:"Module 3", ref:"PC §538d",
      q:"A security guard who represents themselves as a police officer may face criminal charges under:",
      options:["A. PC §602","B. PC §538d","C. BPC §480","D. PC §836"],
      answer:"B" },
    { module:"Module 3", ref:"PC §837 | 4th Amendment",
      q:"A security guard's authority to search a detained person is:",
      options:["A. The same as a police officer","B. Unlimited on private property","C. Limited to a safety pat-down for weapons during a lawful detention","D. Permitted whenever the guard suspects concealed items"],
      answer:"C" },
    { module:"Module 3", ref:"PC §236 | PC §847",
      q:"Courts generally view a detention lasting more than ___ minutes without police notification as potentially crossing into false imprisonment.",
      options:["A. 5–10 minutes","B. 20–30 minutes","C. 45–60 minutes","D. 2 hours"],
      answer:"B" },
    { module:"Module 3", ref:"PC §837",
      q:"A security guard's arrest authority extends:",
      options:["A. Anywhere in the city they are assigned","B. Only on the property they are hired to protect","C. Throughout the entire county","D. Statewide under their BSIS license"],
      answer:"B" },
    { module:"Module 3", ref:"PC §236 | PC §207",
      q:"Detaining someone without a lawful basis under PC §837 constitutes:",
      options:["A. Lawful preventive detention","B. False imprisonment","C. Authorized security action","D. Investigative detention"],
      answer:"B" },
    { module:"Module 3", ref:"BPC §7583.7",
      q:"Which of the following actions is PROHIBITED for a California security guard?",
      options:["A. Asking a person their name","B. Contacting law enforcement","C. Conducting a general search of a person's bag","D. Observing suspicious activity"],
      answer:"C" },
    { module:"Module 3", ref:"PC §242",
      q:"A security guard handcuffs someone without a lawful basis for arrest. This action could constitute:",
      options:["A. Lawful restraint under BPC §7583.7","B. False imprisonment and assault under California law","C. Authorized preventive security action","D. A civil matter only with no criminal exposure"],
      answer:"B" },
    { module:"Module 3", ref:"PC §837",
      q:"A guard detains a person based solely on the fact that they match a racial description given by a manager. This detention is:",
      options:["A. Lawful under employer authority","B. Lawful if the manager signed a form","C. Unlawful — no reasonable suspicion based on race alone","D. Lawful for 30 minutes pending investigation"],
      answer:"C" },

    // MODULE 4 — Security vs. Law Enforcement
    { module:"Module 4", ref:"PC §830",
      q:"California peace officer authority is derived from:",
      options:["A. Penal Code §837","B. Penal Code §830 et seq.","C. Business and Professions Code §7583.7","D. Title 16 CCR §643"],
      answer:"B" },
    { module:"Module 4", ref:"PC §837 | PC §830",
      q:"Which of the following powers does a peace officer have that a security guard does NOT?",
      options:["A. The power to observe and report","B. The power to make a citizen's arrest","C. The power to conduct lawful searches with probable cause","D. The power to ask a person their name"],
      answer:"C" },
    { module:"Module 4", ref:"PC §847",
      q:"After making a citizen's arrest, a security guard must deliver the arrested person to a peace officer:",
      options:["A. Within 24 hours","B. At the end of the guard's shift","C. Without unnecessary delay","D. After completing an incident report"],
      answer:"C" },
    { module:"Module 4", ref:"PC §538d",
      q:"Impersonating a police officer as a security guard is:",
      options:["A. Permitted in emergencies","B. A violation of BSIS policy only","C. A criminal offense under PC §538d","D. Allowed if wearing a similar uniform"],
      answer:"C" },
    { module:"Module 4", ref:"PC §847",
      q:"When a police officer accepts custody from a security guard who made a citizen's arrest, who is legally the arresting party?",
      options:["A. The police officer","B. The security guard (the private person)","C. Both equally","D. The property owner who authorized the guard"],
      answer:"B" },

    // MODULE 5 — Liability
    { module:"Module 5", ref:"PC §236",
      q:"False imprisonment under California Penal Code §236 is defined as:",
      options:["A. Arresting someone for a misdemeanor","B. The unlawful violation of the personal liberty of another","C. Detaining someone for more than one hour","D. Any physical contact with a detained person"],
      answer:"B" },
    { module:"Module 5", ref:"PC §207",
      q:"If a security guard unlawfully detains someone AND moves them to another location, the charge could escalate to:",
      options:["A. Disorderly conduct","B. Assault","C. Kidnapping under PC §207","D. Trespassing"],
      answer:"C" },
    { module:"Module 5", ref:"BPC §480",
      q:"A guard who makes an unlawful arrest could face BSIS consequences including:",
      options:["A. A written warning only","B. Guard card suspension or revocation under BPC §480","C. Mandatory additional training only","D. No regulatory consequences — only civil liability"],
      answer:"B" },
    { module:"Module 5", ref:"Vicarious Liability",
      q:"MACCESS INC. as the PPO may be held liable for a guard's wrongful arrest under the doctrine of:",
      options:["A. Strict product liability","B. Vicarious liability","C. Contributory negligence","D. Qualified immunity"],
      answer:"B" },
    { module:"Module 5", ref:"PC §242",
      q:"A guard uses excessive force during a detention. Which criminal charge might apply?",
      options:["A. Trespassing","B. Vandalism","C. Battery under PC §242","D. Disturbing the peace"],
      answer:"C" },
    { module:"Module 5", ref:"BPC §7583.2",
      q:"BSIS must be notified when a security guard is involved in certain incidents including use of force. This requirement is found in:",
      options:["A. PC §837","B. BPC §7583.2","C. Title 16 CCR §600","D. PC §242"],
      answer:"B" },

    // MODULE 6 — Trespass
    { module:"Module 6", ref:"PC §602",
      q:"Under California Penal Code §602, trespass is generally classified as a:",
      options:["A. Felony","B. Misdemeanor","C. Infraction only","D. Civil violation only"],
      answer:"B" },
    { module:"Module 6", ref:"PC §602",
      q:"A person refuses to leave private property after being lawfully ordered to do so. Under PC §837(1), the guard may now make an arrest because:",
      options:["A. The property owner requested it","B. The refusal to leave constitutes a public offense committed in the guard's presence","C. Guards always have authority to arrest trespassers","D. BSIS license authorizes this action"],
      answer:"B" },
    { module:"Module 6", ref:"PC §490.5",
      q:"The Shopkeeper's Privilege under PC §490.5 allows a merchant or their agent to detain a suspect for shoplifting if:",
      options:["A. A manager suspects them based on appearance","B. There is probable cause based on direct observation","C. Another customer reports the theft","D. The person matches a description from a prior incident"],
      answer:"B" },
    { module:"Module 6", ref:"PC §602",
      q:"When removing someone from a public accommodation (such as a mall), a security guard must:",
      options:["A. Have the same authority as on private property","B. Have a specific, legitimate reason unrelated to protected characteristics","C. Obtain written authorization from the property owner","D. Call police before making any request"],
      answer:"B" },
    { module:"Module 6", ref:"PC §602",
      q:"For trespass enforcement on open land, which of the following is generally required before detaining a person?",
      options:["A. A written order from a judge","B. A prior BSIS incident report","C. Clear posting or fencing and a verbal warning","D. Police authorization"],
      answer:"C" },

    // MODULE 7 — Ethics & Documentation
    { module:"Module 7", ref:"Title 16 CCR §643(b)",
      q:"Per Title 16 CCR §643(b), a Certificate of Completion must be issued for each course completed by:",
      options:["A. BSIS directly","B. The applicant's attorney","C. The training entity or company providing the training","D. The property owner"],
      answer:"C" },
    { module:"Module 7", ref:"BSIS PTA Manual §8",
      q:"An incident report should ideally be completed:",
      options:["A. At the end of the guard's shift","B. Within 1 hour of the incident","C. The following business day","D. Only when requested by a supervisor"],
      answer:"B" },
    { module:"Module 7", ref:"BSIS Ethics Standards",
      q:"A security guard who falsifies an incident report may face:",
      options:["A. A verbal warning only","B. Termination and BSIS license revocation","C. A civil fine only","D. No consequences if the incident was minor"],
      answer:"B" },
    { module:"Module 7", ref:"BSIS PTA Manual §8",
      q:"When a security guard announces a citizen's arrest, they should:",
      options:["A. Remain silent to avoid legal exposure","B. Clearly state the basis for the arrest in plain language","C. Wait for police to make any statement","D. Only announce after police arrive"],
      answer:"B" },
    { module:"Module 7", ref:"BSIS PTA Manual §8",
      q:"Which of the following should a security guard do when identifying witnesses to an incident?",
      options:["A. Ask witnesses to leave the area to preserve the scene","B. Record their name, contact information, and what they observed","C. Wait for police to collect witness information","D. Witness statements are not needed for incident reports"],
      answer:"B" },
    { module:"Module 7", ref:"BSIS Ethics Standards",
      q:"A security guard's arrest or enforcement decisions must be:",
      options:["A. Based on the guard's professional intuition","B. Consistent with employer policies regardless of law","C. Free from bias based on race, gender, appearance, or other protected characteristics","D. Approved in advance by the property owner"],
      answer:"C" },

    // MODULE 8 — Emergency Response
    { module:"Module 8", ref:"BSIS PTA Manual §9",
      q:"When a security guard discovers a medical emergency, their first action should be:",
      options:["A. Notify their supervisor","B. Begin medical treatment immediately","C. Assess the scene for their own safety, then call 911","D. Secure the area and wait for police"],
      answer:"C" },
    { module:"Module 8", ref:"DHS Run-Hide-Fight | BSIS PTA Manual §9",
      q:"In an active shooter situation, the recommended priority order of actions is:",
      options:["A. Hide, Fight, Run","B. Run, Hide, Fight","C. Fight, Hide, Run","D. Call 911, Hide, Fight"],
      answer:"B" },
    { module:"Module 8", ref:"BSIS PTA Manual §10",
      q:"Blood-borne pathogen precautions require a security guard to:",
      options:["A. Refuse all physical contact with subjects","B. Wear gloves before any physical contact that may involve blood or bodily fluids","C. Request a hazmat team for all incidents","D. Document exposure only after the fact"],
      answer:"B" },
    { module:"Module 8", ref:"BSIS PTA Manual §10",
      q:"Which principle of officer safety involves knowing your exits and maintaining awareness of your surroundings at all times?",
      options:["A. Threat interdiction","B. Situational awareness","C. Environmental compliance","D. Tactical advantage"],
      answer:"B" },
    { module:"Module 8", ref:"BSIS PTA Manual §10",
      q:"When law enforcement arrives at a scene where a security guard is present, the guard should:",
      options:["A. Continue managing the situation until relieved","B. Verbally announce their authority under BSIS","C. Keep hands visible and follow all officer commands","D. Present their guard card immediately and speak first"],
      answer:"C" },

    // MODULE 9 — Review / Application
    { module:"Module 9", ref:"PC §847",
      q:"A security guard makes a lawful citizen's arrest. How long may the guard hold the person before law enforcement must be contacted?",
      options:["A. Up to 4 hours","B. Until the end of the shift","C. Without unnecessary delay — no extended holding permitted","D. Up to 24 hours if police are unavailable"],
      answer:"C" },
    { module:"Module 9", ref:"PC §837 | PC §836",
      q:"Which of the following BEST distinguishes a security guard's arrest authority from a police officer's?",
      options:["A. Guards can only arrest on weekdays","B. Guards cannot use handcuffs","C. Guards have no authority to investigate crimes or arrest based on probable cause developed through investigation","D. Guards must have a supervisor present for all arrests"],
      answer:"C" },
    { module:"Module 9", ref:"PC §837(1) | PC §602",
      q:"A guard observes a person shoplifting in real time. The person drops the item and tries to walk away. What is the BEST course of action?",
      options:["A. Physically tackle the person to prevent escape","B. Follow the person into the parking lot and make an arrest there","C. Detain the person on the property using reasonable force and call police immediately","D. Take no action — only managers can stop shoplifters"],
      answer:"C" },
    { module:"Module 9", ref:"BPC §7583.7",
      q:"MACCESS INC.'s PPO license number is:",
      options:["A. #112233","B. #122729","C. #133445","D. #100001"],
      answer:"B" },
  ]
},

// ─────────────────────────────────────────────────────────
// BSIS COMPLETE OVERVIEW — add questions here when needed
"bsis_overview": {
  title: "California BSIS Security Guard Licensing Training",
  passingScore: 100,
  totalQuestions: 50,
  questions: [] // Populated when that course test is generated
}

}; // end COURSE_BANKS

// ══════════════════════════════════════════════════════════
// TEST BUILDER
// ══════════════════════════════════════════════════════════
function detectCourse(filename) {
  const lower = filename.toLowerCase();
  if (lower.includes("powers_to_arrest") || lower.includes("power_to_arrest") || lower.includes("pta")) {
    return "powers_to_arrest";
  }
  if (lower.includes("bsis_security_guard_licensing") || lower.includes("overview")) {
    return "bsis_overview";
  }
  return null;
}

function makeShadow() {
  return { type:"outer", color:"000000", blur:6, offset:2, angle:45, opacity:0.1 };
}

async function buildTest(courseKey, bank, outputBase) {
  const questions = bank.questions;
  if (!questions || questions.length === 0) {
    console.log("No questions in bank for:", courseKey);
    return;
  }

  let pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "MACCESS INC.";
  pres.title = bank.title + " — Course Assessment";

  // ── SLIDE 1: Cover ─────────────────────────────────────
  let cover = pres.addSlide();
  cover.background = { color: DARK };
  cover.addShape(pres.shapes.RECTANGLE, { x:0, y:4.5, w:10, h:1.125, fill:{ color:GOLD } });
  cover.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:0.45, h:4.5, fill:{ color:NAVY } });
  cover.addText("COURSE ASSESSMENT", {
    x:0.6, y:0.4, w:9, h:0.6, fontSize:18, bold:true,
    color:GOLD, fontFace:"Calibri", align:"left", charSpacing:5, margin:0
  });
  cover.addText(bank.title, {
    x:0.6, y:1.05, w:9, h:1.4, fontSize:32, bold:true,
    color:WHITE, fontFace:"Calibri", align:"left", margin:0
  });
  cover.addText(
    `${questions.length} Questions  |  Passing Score: ${bank.passingScore}%  |  BSIS-Compliant Evaluation`,
    { x:0.6, y:2.55, w:9, h:0.45, fontSize:14,
      color:"CADCFC", fontFace:"Calibri", align:"left", margin:0 }
  );
  cover.addText(
    "Read each question carefully. Select the single best answer. This assessment must be completed independently without reference materials.",
    { x:0.6, y:3.1, w:9, h:0.9, fontSize:12,
      color:"9AAFCC", fontFace:"Calibri", align:"left", margin:0 }
  );
  cover.addText("MACCESS INC.", {
    x:0.6, y:4.6, w:4, h:0.5, fontSize:14, bold:true,
    color:NAVY, fontFace:"Calibri", align:"left", valign:"middle", margin:0
  });
  cover.addText("PPO License #122729  |  BSIS-Authorized Training Provider  |  " + new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}), {
    x:0.6, y:5.05, w:9, h:0.3, fontSize:9, italic:true,
    color:NAVY, fontFace:"Calibri", align:"left", margin:0
  });

  // ── SLIDE 2: Instructions ──────────────────────────────
  let inst = pres.addSlide();
  inst.background = { color: LIGHT };
  inst.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:1.05, fill:{ color:NAVY } });
  inst.addText("ASSESSMENT INSTRUCTIONS", {
    x:0.45, y:0.12, w:9, h:0.8, fontSize:26, bold:true,
    color:WHITE, fontFace:"Calibri", align:"left", margin:0
  });

  const instructions = [
    ["Format", `${questions.length} multiple-choice questions — select ONE best answer per question (A, B, C, or D)`],
    ["Time", "No time limit. Take the time you need to read each question carefully."],
    ["Passing Score", `${bank.passingScore}% — all questions must be answered correctly to receive a Certificate of Completion per BPC §7583.7`],
    ["Materials", "This is a closed-book assessment. No notes, course materials, or electronic devices may be used."],
    ["Retake Policy", "Students who do not achieve a passing score must retake the full assessment. Additional review of course material is recommended."],
    ["Certificate", "Students who pass will receive a MACCESS INC. Certificate of Completion. This certificate must be retained until your guard card registration expires or is canceled per Title 16 CCR §643(b)."],
    ["Honesty", "By beginning this assessment, you affirm that your responses are your own and that you have not received unauthorized assistance."],
  ];

  instructions.forEach(([label, text], i) => {
    const y = 1.15 + i * 0.62;
    inst.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x:0.35, y, w:9.3, h:0.54, fill:{ color:WHITE }, rectRadius:0.07, shadow:makeShadow()
    });
    inst.addText(label, {
      x:0.45, y, w:1.55, h:0.54,
      fontSize:10.5, bold:true, color:NAVY, fontFace:"Calibri",
      valign:"middle", align:"left", margin:4
    });
    inst.addShape(pres.shapes.RECTANGLE, {
      x:2.05, y:y+0.1, w:0.02, h:0.34, fill:{ color:"D0D8E8" }
    });
    inst.addText(text, {
      x:2.15, y, w:7.4, h:0.54,
      fontSize:10, color:"1A1A2E", fontFace:"Calibri",
      valign:"middle", align:"left", margin:4
    });
  });

  // ── QUESTION SLIDES — 2 per slide ─────────────────────
  for (let i = 0; i < questions.length; i += 2) {
    let slide = pres.addSlide();
    slide.background = { color: LIGHT };

    // Header
    const pageNum = Math.floor(i/2) + 1;
    const totalPages = Math.ceil(questions.length/2);
    slide.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.52, fill:{ color:NAVY } });
    slide.addText(bank.title + " — Assessment", {
      x:0.35, y:0, w:7.5, h:0.52,
      fontSize:10, color:WHITE, fontFace:"Calibri", valign:"middle", align:"left", margin:0
    });
    slide.addText(`Page ${pageNum} of ${totalPages}`, {
      x:7.9, y:0, w:1.85, h:0.52,
      fontSize:10, bold:true, color:GOLD, fontFace:"Calibri",
      valign:"middle", align:"right", margin:0
    });

    const qPairs = [questions[i], questions[i+1]].filter(Boolean);
    qPairs.forEach((q, qi) => {
      const qNum = i + qi + 1;
      const yBase = 0.62 + qi * 2.48;
      const cardH = 2.35;

      slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x:0.3, y:yBase, w:9.4, h:cardH,
        fill:{ color:WHITE }, rectRadius:0.1, shadow:makeShadow()
      });

      // Question number badge
      slide.addShape(pres.shapes.OVAL, {
        x:0.42, y:yBase+0.14, w:0.58, h:0.58, fill:{ color:NAVY }
      });
      slide.addText(String(qNum), {
        x:0.42, y:yBase+0.14, w:0.58, h:0.58,
        fontSize:13, bold:true, color:WHITE, fontFace:"Calibri",
        align:"center", valign:"middle", margin:0
      });

      // Module + ref tag
      slide.addText(`${q.module}  |  ${q.ref}`, {
        x:1.1, y:yBase+0.12, w:8.48, h:0.28,
        fontSize:8.5, italic:true, color:GRAY, fontFace:"Calibri", margin:0
      });

      // Question text
      slide.addText(q.q, {
        x:1.1, y:yBase+0.38, w:8.48, h:0.65,
        fontSize:12, bold:true, color:"1A1A2E", fontFace:"Calibri", margin:0
      });

      // Answer options — 2 per row
      const optLetters = ["A","B","C","D"];
      optLetters.forEach((letter, oi) => {
        const col = oi % 2;
        const row = Math.floor(oi / 2);
        const ox = 1.1 + col * 4.25;
        const oy = yBase + 1.1 + row * 0.57;

        slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
          x:ox, y:oy, w:4.05, h:0.5,
          fill:{ color:"F4F6FB" }, rectRadius:0.06
        });
        slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
          x:ox, y:oy, w:0.38, h:0.5,
          fill:{ color:"E0E7F3" }, rectRadius:0.06
        });
        slide.addText(letter, {
          x:ox, y:oy, w:0.38, h:0.5,
          fontSize:11, bold:true, color:NAVY, fontFace:"Calibri",
          align:"center", valign:"middle", margin:0
        });
        slide.addText(q.options[oi] ? q.options[oi].replace(/^[A-D]\.\s*/,"") : "", {
          x:ox+0.44, y:oy, w:3.55, h:0.5,
          fontSize:10, color:"1A1A2E", fontFace:"Calibri",
          valign:"middle", align:"left", margin:0
        });
      });

      // Answer line
      slide.addText(`Answer: _______`, {
        x:1.1, y:yBase+2.1, w:2.5, h:0.22,
        fontSize:10, bold:true, color:GRAY, fontFace:"Calibri", margin:0
      });
    });
  }

  // ── ANSWER KEY (instructor copy) ──────────────────────
  let akSlide = pres.addSlide();
  akSlide.background = { color: DARK };
  akSlide.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.85, fill:{ color:RED } });
  akSlide.addText("ANSWER KEY — INSTRUCTOR COPY ONLY", {
    x:0.35, y:0, w:9.3, h:0.85,
    fontSize:18, bold:true, color:WHITE, fontFace:"Calibri",
    valign:"middle", align:"left", margin:8
  });
  akSlide.addText("Do not distribute to students. For instructor and administrator use only.", {
    x:0.35, y:0.88, w:9.3, h:0.3,
    fontSize:10, italic:true, color:"CADCFC", fontFace:"Calibri", margin:0
  });

  // Print answers in a grid
  const cols = 5;
  questions.forEach((q, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = 0.35 + col * 1.92;
    const y = 1.28 + row * 0.72;
    akSlide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w:1.82, h:0.62,
      fill:{ color: q.answer==="A"?"1A5C3A":q.answer==="B"?NAVY:q.answer==="C"?"7B3F00":"4A1A8A" },
      rectRadius:0.07
    });
    akSlide.addText(`Q${i+1}`, {
      x, y, w:0.62, h:0.62,
      fontSize:11, bold:true, color:WHITE, fontFace:"Calibri",
      align:"center", valign:"middle", margin:0
    });
    akSlide.addText(q.answer, {
      x:x+0.62, y, w:1.2, h:0.62,
      fontSize:22, bold:true, color:GOLD, fontFace:"Calibri",
      align:"center", valign:"middle", margin:0
    });
  });

  akSlide.addText(`MACCESS INC.  |  PPO #122729  |  ${bank.title}  |  Total: ${questions.length} Questions`, {
    x:0.35, y:5.3, w:9.3, h:0.28,
    fontSize:8, italic:true, color:GRAY, fontFace:"Calibri", align:"center", margin:0
  });

  // ── CERTIFICATE TEMPLATE ───────────────────────────────
  let cert = pres.addSlide();
  cert.background = { color: WHITE };
  cert.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.45, fill:{ color:NAVY } });
  cert.addShape(pres.shapes.RECTANGLE, { x:0, y:5.175, w:10, h:0.45, fill:{ color:NAVY } });
  cert.addShape(pres.shapes.RECTANGLE, { x:0, y:0.45, w:10, h:0.18, fill:{ color:GOLD } });
  cert.addShape(pres.shapes.RECTANGLE, { x:0, y:4.995, w:10, h:0.18, fill:{ color:GOLD } });

  cert.addText("CERTIFICATE OF COMPLETION", {
    x:0.5, y:0.72, w:9, h:0.55, fontSize:22, bold:true,
    color:NAVY, fontFace:"Calibri", align:"center", charSpacing:3, margin:0
  });
  cert.addText("This certifies that", {
    x:0.5, y:1.35, w:9, h:0.35, fontSize:13, italic:true,
    color:GRAY, fontFace:"Calibri", align:"center", margin:0
  });
  cert.addText("_________________________________________________", {
    x:1.5, y:1.72, w:7, h:0.45, fontSize:22,
    color:NAVY, fontFace:"Calibri", align:"center", margin:0
  });
  cert.addText("(Student Full Name)", {
    x:1.5, y:2.08, w:7, h:0.28, fontSize:9, italic:true,
    color:GRAY, fontFace:"Calibri", align:"center", margin:0
  });
  cert.addText("has successfully completed the MACCESS INC. course:", {
    x:0.5, y:2.45, w:9, h:0.35, fontSize:13, italic:true,
    color:GRAY, fontFace:"Calibri", align:"center", margin:0
  });
  cert.addText(bank.title, {
    x:0.5, y:2.85, w:9, h:0.6, fontSize:17, bold:true,
    color:NAVY, fontFace:"Calibri", align:"center", margin:0
  });
  cert.addText(`and has achieved a passing score of ${bank.passingScore}% on the course assessment,\nsatisfying the BSIS training requirement under Business and Professions Code §7583.7.`, {
    x:0.8, y:3.5, w:8.4, h:0.75, fontSize:11,
    color:GRAY, fontFace:"Calibri", align:"center", margin:0
  });

  cert.addText("Date: ______________________", {
    x:1, y:4.35, w:3.5, h:0.35, fontSize:11, color:GRAY, fontFace:"Calibri", margin:0
  });
  cert.addText("Instructor Signature: ______________________", {
    x:5.5, y:4.35, w:4, h:0.35, fontSize:11, color:GRAY, fontFace:"Calibri", margin:0
  });
  cert.addText("MACCESS INC.  |  PPO License #122729  |  BSIS-Authorized Training Provider", {
    x:0.5, y:4.78, w:9, h:0.22, fontSize:9, bold:true,
    color:NAVY, fontFace:"Calibri", align:"center", margin:0
  });

  // Write files
  await pres.writeFile({ fileName: outputBase + ".pptx" });
  console.log("Written: " + outputBase + ".pptx");
}

// ══════════════════════════════════════════════════════════
// GITHUB PUSH
// ══════════════════════════════════════════════════════════
function pushToGitHub(localPath, repoPath, message) {
  return new Promise((resolve) => {
    const data = fs.readFileSync(localPath);
    const encoded = data.toString("base64");

    // First check existing SHA
    const options = {
      hostname: "api.github.com",
      path: `/repos/${REPO}/contents/${encodeURIComponent(repoPath)}`,
      method: "GET",
      headers: { "Authorization": `token ${TOKEN}`, "User-Agent": "MACCESS-TestGen" }
    };

    const getReq = https.request(options, (res) => {
      let body = "";
      res.on("data", d => body += d);
      res.on("end", () => {
        let sha = "";
        try { sha = JSON.parse(body).sha || ""; } catch {}

        const payload = JSON.stringify({ message, content: encoded, branch:"main", ...(sha && { sha }) });
        const putOptions = {
          hostname: "api.github.com",
          path: `/repos/${REPO}/contents/${encodeURIComponent(repoPath)}`,
          method: "PUT",
          headers: {
            "Authorization": `token ${TOKEN}`,
            "Content-Type": "application/json",
            "User-Agent": "MACCESS-TestGen",
            "Content-Length": Buffer.byteLength(payload)
          }
        };
        const putReq = https.request(putOptions, (res2) => {
          let body2 = "";
          res2.on("data", d => body2 += d);
          res2.on("end", () => {
            try {
              const r = JSON.parse(body2);
              resolve("content" in r);
            } catch { resolve(false); }
          });
        });
        putReq.write(payload);
        putReq.end();
      });
    });
    getReq.end();
  });
}

// ══════════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════════
async function main() {
  const inputFile = process.argv[2] || "Powers_to_Arrest_BSIS_Certification_MACCESS_INC.pptx";
  const courseKey = detectCourse(inputFile);

  if (!courseKey || !COURSE_BANKS[courseKey]) {
    console.error("Unknown course file:", inputFile);
    console.error("Supported courses:", Object.keys(COURSE_BANKS).join(", "));
    process.exit(1);
  }

  const bank = COURSE_BANKS[courseKey];
  if (!bank.questions || bank.questions.length === 0) {
    console.error("No questions found for course:", courseKey);
    process.exit(1);
  }

  // Output filename = course name + "-Test"
  const baseName = path.basename(inputFile, ".pptx");
  const outputBase = "/home/claude/" + baseName + "-Test";
  const outputPptx = outputBase + ".pptx";
  const outputPdf  = outputBase + ".pdf";

  console.log(`\nBuilding test for: ${bank.title}`);
  console.log(`Questions: ${bank.questions.length} | Pass: ${bank.passingScore}%`);

  // Build PPTX
  await buildTest(courseKey, bank, outputBase);

  // Rezip
  try {
    execSync(`python3 /mnt/skills/public/pptx/scripts/rezip.py "${outputPptx}"`, { stdio:"inherit" });
  } catch(e) { console.warn("Rezip warning:", e.message); }

  // Convert to PDF
  try {
    execSync(`python3 /mnt/skills/public/pptx/scripts/office/soffice.py --headless --convert-to pdf "${outputPptx}"`, { stdio:"inherit" });
    console.log("PDF generated:", outputPdf);
  } catch(e) { console.warn("PDF warning:", e.message); }

  // Push both to GitHub
  const repoBase = `PSLAW-Courses/final-projects/${path.basename(outputBase)}`;
  console.log("\nPushing to GitHub...");

  const pptxOK = await pushToGitHub(outputPptx, repoBase + ".pptx",
    `feat: ${bank.title} — Course Assessment Test (${bank.questions.length}Q)`);
  console.log(`  ${pptxOK?"✅":"❌"} ${repoBase}.pptx`);

  if (fs.existsSync(outputPdf)) {
    const pdfOK = await pushToGitHub(outputPdf, repoBase + ".pdf",
      `feat: ${bank.title} — Course Assessment Test PDF`);
    console.log(`  ${pdfOK?"✅":"❌"} ${repoBase}.pdf`);
  }

  console.log(`\nDone. Test ready: ${path.basename(outputPptx)}`);
}

main().catch(console.error);
