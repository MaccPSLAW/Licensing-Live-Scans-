/**
 * MACCESS INC. — Interactive BSIS Course Test Builder
 * Generates per-course:
 *   1. [Course]-Test.html        — Interactive browser test (self-scoring, retake, certificate)
 *   2. [Course]-AnswerKey.pptx   — Instructor/company answer key (retain internally)
 * Pushed to: MaccPSLAW/Licensing-Live-Scans-/PSLAW-Courses/final-projects/
 */

const pptxgen = require("pptxgenjs");
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const https = require("https");

const TOKEN = process.env.GITHUB_TOKEN; // export GITHUB_TOKEN=your_token
const REPO  = "MaccPSLAW/Licensing-Live-Scans-";

// ── Brand ──────────────────────────────────────────────────────────────
const NAVY  = "1B2B5E";
const GOLD  = "C9A84C";
const WHITE = "FFFFFF";
const GRAY  = "4A5568";
const RED   = "8B1A1A";
const GREEN = "1A5C3A";

// ══════════════════════════════════════════════════════════════════════
// COURSE QUESTION BANKS
// ══════════════════════════════════════════════════════════════════════
const COURSE_BANKS = {

"powers_to_arrest": {
  title: "Powers to Arrest — BSIS Certification Course",
  subtitle: "California Security Guard Licensing | MACCESS INC.",
  hours: "3",
  passingScore: 100,
  bpcRef: "BPC §7583.7",
  questions: [
    // ── MODULE 1: Legal Framework ───────────────────────────────────
    { module:"Module 1 — Legal Framework", ref:"BPC §7583.7",
      q:"Which California law requires security guards to complete Power to Arrest training before receiving a guard card?",
      options:["California Penal Code §837","Business and Professions Code §7583.7","Title 16 California Code of Regulations §643","California Penal Code §847"],
      answer:1 },
    { module:"Module 1 — Legal Framework", ref:"BPC §7583.7",
      q:"What score must a student achieve on the BSIS Power to Arrest exam to receive a Certificate of Completion?",
      options:["70%","80%","90%","100%"],
      answer:3 },
    { module:"Module 1 — Legal Framework", ref:"DCA PTA Manual July 2023",
      q:"Which manual is required to be used for Power to Arrest and Appropriate Use of Force training?",
      options:["California Security Officer Handbook 2022","DCA Power to Arrest and Appropriate Use of Force Training Manual, July 2023","BSIS Regulatory Guide Title 16","California Penal Code Annotated"],
      answer:1 },
    { module:"Module 1 — Legal Framework", ref:"BPC §7583.7",
      q:"As a security guard in California, your arrest authority comes from the same law that applies to:",
      options:["A sworn police officer","A licensed investigator","A private citizen","A government contractor"],
      answer:2 },
    { module:"Module 1 — Legal Framework", ref:"SB 652 (Jan 1 2026)",
      q:"Under SB 652 effective January 1, 2026, the full 8-hour PTA + AUF training must be delivered by:",
      options:["Any two BSIS-approved providers","The applicant's employer only","A single BSIS-approved course provider","An online provider plus a separate in-person facility"],
      answer:2 },
    { module:"Module 1 — Legal Framework", ref:"SB 652 | BPC §7583.6",
      q:"How long before a guard card application must the 8-hour PTA/AUF training be completed?",
      options:["30 days","3 months","6 months","1 year"],
      answer:2 },
    { module:"Module 1 — Legal Framework", ref:"BPC §7583.7",
      q:"MACCESS INC. is authorized to deliver this certification as a licensed:",
      options:["Peace officer agency","Private Patrol Operator — PPO #122729","Federal security contractor","BSIS examination center"],
      answer:1 },

    // ── MODULE 2: PC §837 Three Conditions ─────────────────────────
    { module:"Module 2 — Citizen Arrest Authority (PC §837)", ref:"PC §837",
      q:"California Penal Code §837 lists how many conditions under which a private person may make a citizen's arrest?",
      options:["Two","Three","Four","Five"],
      answer:1 },
    { module:"Module 2 — Citizen Arrest Authority (PC §837)", ref:"PC §837(1)",
      q:"Under PC §837(1), a security guard may make a citizen's arrest when a public offense is:",
      options:["Reported by a witness","Suspected based on prior criminal history","Captured on CCTV footage only","Committed or attempted in the guard's direct presence"],
      answer:3 },
    { module:"Module 2 — Citizen Arrest Authority (PC §837)", ref:"PC §837(2)",
      q:"Under PC §837(2), a guard may arrest someone for a felony not committed in their presence if:",
      options:["A supervisor authorizes the arrest","The guard has a hunch the person is guilty","The guard knows the person committed the felony","The property owner requests the arrest"],
      answer:2 },
    { module:"Module 2 — Citizen Arrest Authority (PC §837)", ref:"PC §837(3)",
      q:"PC §837(3) requires that for a reasonable-cause felony arrest, a felony must:",
      options:["Be suspected but not confirmed","Have actually been committed in fact","Have been reported to police first","Involve violence or weapons"],
      answer:1 },
    { module:"Module 2 — Citizen Arrest Authority (PC §837)", ref:"PC §837",
      q:"A guard receives a report that someone stole from the store yesterday. The guard did not witness it. Can the guard make a citizen's arrest for this misdemeanor?",
      options:["Yes — any theft justifies arrest","Yes — with supervisor approval","No — misdemeanor arrest requires personal observation","No — only police can arrest for theft"],
      answer:2 },
    { module:"Module 2 — Citizen Arrest Authority (PC §837)", ref:"PC §837(3)",
      q:"Which PC §837 arrest condition carries the greatest risk of personal liability if used incorrectly?",
      options:["§837(1) — offense in presence","§837(2) — felony committed by that person","§837(3) — reasonable cause for felony","All conditions carry equal risk"],
      answer:2 },
    { module:"Module 2 — Citizen Arrest Authority (PC §837)", ref:"PC §837",
      q:"A security guard witnesses a person vandalizing a car in the parking lot. Which PC §837 condition applies?",
      options:["§837(1) — public offense in presence","§837(2) — felony committed by the person","§837(3) — reasonable cause","None — vandalism cannot justify arrest"],
      answer:0 },
    { module:"Module 2 — Citizen Arrest Authority (PC §837)", ref:"PC §837",
      q:"\"Reasonable cause\" under PC §837 means:",
      options:["A gut feeling the person looks suspicious","Objective facts supporting a belief the person committed a felony","A witness statement alone","Prior criminal history of the person"],
      answer:1 },
    { module:"Module 2 — Citizen Arrest Authority (PC §837)", ref:"PC §837 | PC §490.5",
      q:"The Shopkeeper's Privilege under PC §490.5 allows detention for shoplifting when there is:",
      options:["Suspicion based on appearance","Probable cause based on direct observation","A manager's verbal authorization","A description matching prior theft reports"],
      answer:1 },

    // ── MODULE 3: Limitations ───────────────────────────────────────
    { module:"Module 3 — Limitations & Prohibited Actions", ref:"PC §538d",
      q:"A security guard who represents themselves as a police officer may face criminal charges under:",
      options:["PC §602","BPC §480","PC §538d","PC §836"],
      answer:2 },
    { module:"Module 3 — Limitations & Prohibited Actions", ref:"PC §837 | 4th Amendment",
      q:"A security guard's search authority during a lawful detention is limited to:",
      options:["A full search of the person's clothing and bags","An unlimited search on private property","A safety pat-down for weapons only","Any search authorized by the property owner"],
      answer:2 },
    { module:"Module 3 — Limitations & Prohibited Actions", ref:"PC §236 | PC §847",
      q:"Courts generally view a detention lasting more than ___ minutes without police notification as potentially false imprisonment.",
      options:["5–10 minutes","20–30 minutes","45–60 minutes","2 hours"],
      answer:1 },
    { module:"Module 3 — Limitations & Prohibited Actions", ref:"PC §837",
      q:"A security guard's arrest authority extends:",
      options:["Anywhere in the city they are assigned","Throughout the entire county","Statewide under their BSIS license","Only on the property they are hired to protect"],
      answer:3 },
    { module:"Module 3 — Limitations & Prohibited Actions", ref:"PC §236",
      q:"Detaining someone without a lawful basis under PC §837 constitutes:",
      options:["Lawful preventive detention","False imprisonment","Authorized security action","Investigative detention"],
      answer:1 },
    { module:"Module 3 — Limitations & Prohibited Actions", ref:"PC §242",
      q:"A security guard handcuffs someone without a lawful basis for arrest. This action could constitute:",
      options:["Lawful restraint under BPC §7583.7","False imprisonment and assault under California law","Authorized preventive security action","A civil matter only with no criminal exposure"],
      answer:1 },
    { module:"Module 3 — Limitations & Prohibited Actions", ref:"PC §837",
      q:"A guard detains a person based solely on their race and a manager's vague concern. This detention is:",
      options:["Lawful under employer authority","Lawful if the manager signed a form","Unlawful — race alone is never reasonable suspicion","Lawful for 30 minutes pending investigation"],
      answer:2 },

    // ── MODULE 4: Security vs. Law Enforcement ──────────────────────
    { module:"Module 4 — Security vs. Law Enforcement", ref:"PC §830",
      q:"California peace officer authority is derived from:",
      options:["Penal Code §837","Business and Professions Code §7583.7","Penal Code §830 et seq.","Title 16 CCR §643"],
      answer:2 },
    { module:"Module 4 — Security vs. Law Enforcement", ref:"PC §837 | PC §830",
      q:"Which power does a peace officer have that a security guard does NOT?",
      options:["The power to observe and report","The power to make a citizen's arrest","The power to conduct lawful searches based on probable cause developed through investigation","The power to ask a person their name"],
      answer:2 },
    { module:"Module 4 — Security vs. Law Enforcement", ref:"PC §847",
      q:"After making a citizen's arrest, a security guard must deliver the person to a peace officer:",
      options:["Within 24 hours","At the end of the guard's shift","After completing an incident report","Without unnecessary delay"],
      answer:3 },
    { module:"Module 4 — Security vs. Law Enforcement", ref:"PC §847",
      q:"When a police officer accepts custody from a security guard who made a citizen's arrest, who is legally the arresting party?",
      options:["The police officer","Both equally","The property owner who authorized the guard","The security guard — the private person"],
      answer:3 },
    { module:"Module 4 — Security vs. Law Enforcement", ref:"BPC §7582.1",
      q:"California security guards are classified under the law as:",
      options:["Peace officers with limited jurisdiction","Private persons — no additional authority from their badge","Federal contractors","Agents of the property owner with police powers on private property"],
      answer:1 },

    // ── MODULE 5: Liability ─────────────────────────────────────────
    { module:"Module 5 — Liability", ref:"PC §236",
      q:"False imprisonment under California Penal Code §236 is defined as:",
      options:["Arresting someone for a misdemeanor","Detaining someone for more than one hour","The unlawful violation of the personal liberty of another","Any physical contact with a detained person"],
      answer:2 },
    { module:"Module 5 — Liability", ref:"PC §207",
      q:"If a security guard unlawfully detains someone AND moves them to another location, the charge could escalate to:",
      options:["Disorderly conduct","Assault","Kidnapping under PC §207","Trespassing"],
      answer:2 },
    { module:"Module 5 — Liability", ref:"BPC §480",
      q:"A guard who makes an unlawful arrest could face BSIS consequences including:",
      options:["A written warning only","Guard card suspension or revocation under BPC §480","Mandatory additional training only","No regulatory consequences — only civil liability"],
      answer:1 },
    { module:"Module 5 — Liability", ref:"Vicarious Liability",
      q:"MACCESS INC. as the PPO may be held liable for a guard's wrongful arrest under the doctrine of:",
      options:["Strict product liability","Qualified immunity","Vicarious liability","Contributory negligence"],
      answer:2 },
    { module:"Module 5 — Liability", ref:"PC §242",
      q:"A guard uses excessive force during a detention. Which criminal charge most directly applies?",
      options:["Trespassing","Battery under PC §242","Vandalism","Disturbing the peace"],
      answer:1 },
    { module:"Module 5 — Liability", ref:"BPC §7583.2",
      q:"BSIS must be notified when a security guard is involved in certain incidents including use of force per:",
      options:["PC §837","Title 16 CCR §600","BPC §7583.2","PC §242"],
      answer:2 },

    // ── MODULE 6: Trespass ──────────────────────────────────────────
    { module:"Module 6 — Trespass & Property Law", ref:"PC §602",
      q:"Under California Penal Code §602, trespass is generally classified as a:",
      options:["Felony","Infraction only","Civil violation only","Misdemeanor"],
      answer:3 },
    { module:"Module 6 — Trespass & Property Law", ref:"PC §602 | PC §837(1)",
      q:"A person refuses to leave private property after a lawful order. Under PC §837(1), an arrest may be lawful because:",
      options:["The property owner requested it","Guards always have authority to arrest trespassers","The refusal constitutes a public offense in the guard's presence","BSIS license authorizes this action"],
      answer:2 },
    { module:"Module 6 — Trespass & Property Law", ref:"Civil Rights Law",
      q:"When removing someone from a public accommodation, a security guard must have a reason that is:",
      options:["The same authority as on private property","Written and approved by the property manager","Specific and legitimate — unrelated to any protected characteristic","Approved by law enforcement in advance"],
      answer:2 },
    { module:"Module 6 — Trespass & Property Law", ref:"PC §602",
      q:"For trespass enforcement on open land, what is generally required before detaining a person?",
      options:["A written order from a judge","A prior BSIS incident report","Police authorization in writing","Clear posting or fencing and a verbal warning first"],
      answer:3 },

    // ── MODULE 7: Ethics & Documentation ───────────────────────────
    { module:"Module 7 — Ethics, Communication & Documentation", ref:"Title 16 CCR §643(b)",
      q:"Per Title 16 CCR §643(b), a Certificate of Completion must be issued for each course completed by:",
      options:["BSIS directly to the guard","The applicant's attorney","The property owner","The training entity or company providing the training"],
      answer:3 },
    { module:"Module 7 — Ethics, Communication & Documentation", ref:"BSIS PTA Manual §8",
      q:"An incident report should ideally be completed:",
      options:["At the end of the guard's shift","The following business day","Only when requested by a supervisor","Within 1 hour of the incident"],
      answer:3 },
    { module:"Module 7 — Ethics, Communication & Documentation", ref:"BSIS Ethics Standards",
      q:"A security guard who falsifies an incident report may face:",
      options:["A verbal warning only","A civil fine only","No consequences if the incident was minor","Termination and BSIS license revocation"],
      answer:3 },
    { module:"Module 7 — Ethics, Communication & Documentation", ref:"BSIS Ethics Standards",
      q:"A security guard's enforcement decisions must be free from bias based on:",
      options:["The guard's professional intuition","Employer policies regardless of law","Race, gender, appearance, or other protected characteristics","The property owner's personal preferences"],
      answer:2 },
    { module:"Module 7 — Ethics, Communication & Documentation", ref:"BSIS PTA Manual §8",
      q:"When a security guard announces a citizen's arrest, they should:",
      options:["Remain silent to avoid legal exposure","Wait for police to make any statement","Only announce after police arrive","Clearly state the basis for the arrest in plain language"],
      answer:3 },
    { module:"Module 7 — Ethics, Communication & Documentation", ref:"Title 16 CCR §643(b)",
      q:"Training records must be maintained by the PPO and made available to BSIS for:",
      options:["6 months","1 year","Audit upon request — for the duration of employment","5 years after termination"],
      answer:2 },

    // ── MODULE 8: Emergency Response ───────────────────────────────
    { module:"Module 8 — Emergency Response & Officer Safety", ref:"BSIS PTA Manual §9",
      q:"When a security guard discovers a medical emergency, their FIRST action should be:",
      options:["Notify their supervisor","Begin medical treatment immediately regardless of training","Assess the scene for personal safety, then call 911","Secure the area and wait for police"],
      answer:2 },
    { module:"Module 8 — Emergency Response & Officer Safety", ref:"DHS Run-Hide-Fight",
      q:"In an active shooter situation, the recommended priority order of actions is:",
      options:["Hide, Fight, Run","Fight, Hide, Run","Call 911, Hide, Fight","Run, Hide, Fight"],
      answer:3 },
    { module:"Module 8 — Emergency Response & Officer Safety", ref:"BSIS PTA Manual §10",
      q:"Blood-borne pathogen precautions require a security guard to:",
      options:["Refuse all physical contact with subjects","Request a hazmat team for all incidents","Document exposure only after the fact","Wear gloves before any physical contact that may involve blood or bodily fluids"],
      answer:3 },
    { module:"Module 8 — Emergency Response & Officer Safety", ref:"BSIS PTA Manual §10",
      q:"When law enforcement arrives at a scene where a security guard has made a citizen's arrest, the guard should:",
      options:["Continue managing the situation until formally relieved","Announce their BSIS authority first","Keep hands visible and follow all officer commands","Present their guard card immediately and speak first"],
      answer:2 },
    { module:"Module 8 — Emergency Response & Officer Safety", ref:"BSIS PTA Manual §10",
      q:"Situational awareness means:",
      options:["Watching only the primary entry point","Knowing your exits and continuously monitoring your environment for threats","Focusing on the most suspicious-looking individual","Staying stationary to observe from one position"],
      answer:1 },

    // ── MODULE 9: Application & Review ─────────────────────────────
    { module:"Module 9 — Knowledge Check & Exam Prep", ref:"PC §847",
      q:"A security guard makes a lawful citizen's arrest. How long may the guard hold the person before law enforcement must be contacted?",
      options:["Up to 4 hours","Until the end of the shift","Up to 24 hours if police are unavailable","Without unnecessary delay — no extended holding permitted"],
      answer:3 },
    { module:"Module 9 — Knowledge Check & Exam Prep", ref:"PC §837 | PC §836",
      q:"Which BEST distinguishes a security guard's arrest authority from a police officer's?",
      options:["Guards can only arrest on weekdays","Guards cannot use handcuffs under any circumstances","Guards must have a supervisor present for all arrests","Guards cannot arrest based on probable cause developed through their own investigation"],
      answer:3 },
    { module:"Module 9 — Knowledge Check & Exam Prep", ref:"PC §837(1) | PC §602",
      q:"A guard observes shoplifting in real time. The person drops the item and tries to leave. Best course of action?",
      options:["Physically tackle the person to prevent escape","Follow the person into the parking lot and arrest there","Take no action — only managers can stop shoplifters","Detain on property with reasonable force and immediately call police"],
      answer:3 },
    { module:"Module 9 — Knowledge Check & Exam Prep", ref:"PC §837 | BPC §7583.7",
      q:"A security guard may NEVER make a citizen's arrest for a misdemeanor if:",
      options:["The offense occurred on private property","The person is not a repeat offender","The guard did not personally witness the offense","The offense occurred after business hours"],
      answer:2 },
    { module:"Module 9 — Knowledge Check & Exam Prep", ref:"BPC §7583.7",
      q:"MACCESS INC.'s California Private Patrol Operator license number is:",
      options:["#112233","#100001","#133445","#122729"],
      answer:3 },
    { module:"Module 9 — Knowledge Check & Exam Prep", ref:"PC §847 | BSIS Training Standards",
      q:"After a citizen's arrest, a guard who holds the subject for 2 hours without calling police may face:",
      options:["No consequences if the arrest was lawful","Praise for thorough documentation","False imprisonment charges and BSIS disciplinary action","A supervisor review only"],
      answer:1 },
  ]
},

}; // end COURSE_BANKS

// ══════════════════════════════════════════════════════════════════════
// 1. BUILD INTERACTIVE HTML TEST
// ══════════════════════════════════════════════════════════════════════
function buildHTML(bank, courseName) {
  const qs = bank.questions;
  const qsJSON = JSON.stringify(qs);
  const today  = new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${bank.title} — Course Assessment | MACCESS INC.</title>
<style>
:root{--navy:#1B2B5E;--gold:#C9A84C;--red:#8B1A1A;--green:#1A5C3A;--light:#F4F6FB;--gray:#4A5568;--white:#FFFFFF;--radius:10px;}
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Segoe UI',Arial,sans-serif;background:var(--light);color:#1A1A2E;min-height:100vh;}

/* HEADER */
.site-header{background:var(--navy);color:#fff;padding:14px 32px;display:flex;align-items:center;justify-content:space-between;}
.site-header .logo{font-size:20px;font-weight:700;letter-spacing:.04em;}
.site-header .meta{font-size:11px;color:#CADCFC;text-align:right;}
.gold-bar{height:5px;background:var(--gold);}

/* SCREENS */
.screen{display:none;max-width:860px;margin:0 auto;padding:32px 20px;}
.screen.active{display:block;}

/* COVER */
.cover-box{background:#fff;border-radius:var(--radius);border:1px solid #dde4f0;padding:40px 44px;margin-top:24px;}
.cover-box h1{font-size:28px;color:var(--navy);margin-bottom:8px;}
.cover-box .sub{color:var(--gray);font-size:14px;margin-bottom:28px;}
.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:28px;}
.info-card{background:var(--light);border-radius:8px;padding:14px 18px;}
.info-card .label{font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:var(--gray);margin-bottom:4px;}
.info-card .value{font-size:18px;font-weight:700;color:var(--navy);}
.warning-box{background:#FFF8E1;border:1px solid #F9C75740;border-radius:8px;padding:14px 18px;font-size:13px;color:#7B4F00;margin-bottom:28px;line-height:1.6;}
.student-form label{display:block;font-size:12px;font-weight:600;color:var(--gray);margin-bottom:5px;margin-top:14px;}
.student-form input{width:100%;padding:10px 14px;border:1.5px solid #D0D8E8;border-radius:8px;font-size:14px;outline:none;transition:border .2s;}
.student-form input:focus{border-color:var(--navy);}
.btn{display:inline-block;padding:12px 32px;border-radius:8px;font-size:15px;font-weight:600;cursor:pointer;border:none;transition:background .18s,transform .1s;}
.btn:active{transform:scale(.98);}
.btn-primary{background:var(--navy);color:#fff;width:100%;margin-top:24px;text-align:center;}
.btn-primary:hover{background:#243a7a;}

/* PROGRESS */
.progress-wrap{background:#fff;border-radius:var(--radius);padding:14px 20px;margin-bottom:18px;border:1px solid #dde4f0;display:flex;align-items:center;gap:14px;}
.progress-bar-bg{flex:1;height:8px;background:#E8EDF6;border-radius:4px;overflow:hidden;}
.progress-bar-fill{height:100%;background:var(--navy);border-radius:4px;transition:width .3s;}
.progress-text{font-size:12px;color:var(--gray);white-space:nowrap;}
.module-badge{background:var(--light);border:1px solid #D0D8E8;border-radius:6px;padding:5px 12px;font-size:11px;font-weight:600;color:var(--navy);margin-bottom:10px;display:inline-block;}
.ref-badge{font-size:10px;color:var(--gray);margin-left:8px;font-style:italic;}

/* QUESTION CARD */
.q-card{background:#fff;border-radius:var(--radius);border:1px solid #dde4f0;padding:28px 32px;margin-bottom:20px;}
.q-number{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--gold);margin-bottom:10px;}
.q-text{font-size:17px;font-weight:600;color:#1A1A2E;line-height:1.5;margin-bottom:22px;}
.options{display:flex;flex-direction:column;gap:10px;}
.opt{display:flex;align-items:center;gap:12px;padding:12px 16px;border:1.5px solid #D0D8E8;border-radius:8px;cursor:pointer;transition:all .18s;font-size:14px;}
.opt:hover{border-color:var(--navy);background:#F0F4FB;}
.opt.selected{border-color:var(--navy);background:#EBF0FB;}
.opt.correct{border-color:var(--green)!important;background:#EAF3DE!important;color:var(--green);}
.opt.wrong{border-color:var(--red)!important;background:#FCEBEB!important;color:var(--red);}
.opt-letter{width:28px;height:28px;border-radius:50%;background:var(--light);font-weight:700;font-size:13px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--navy);border:1.5px solid #D0D8E8;}
.opt.selected .opt-letter{background:var(--navy);color:#fff;border-color:var(--navy);}
.opt.correct .opt-letter{background:var(--green);color:#fff;border-color:var(--green);}
.opt.wrong .opt-letter{background:var(--red);color:#fff;border-color:var(--red);}
.feedback{margin-top:14px;padding:12px 16px;border-radius:8px;font-size:13px;display:none;line-height:1.6;}
.feedback.correct{background:#EAF3DE;color:var(--green);display:block;}
.feedback.wrong{background:#FCEBEB;color:var(--red);display:block;}
.nav-row{display:flex;justify-content:space-between;align-items:center;margin-top:8px;}
.btn-nav{padding:11px 26px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;border:1.5px solid var(--navy);background:#fff;color:var(--navy);}
.btn-nav:hover{background:var(--light);}
.btn-nav.primary{background:var(--navy);color:#fff;border-color:var(--navy);}
.btn-nav.primary:hover{background:#243a7a;}

/* RESULTS */
.results-box{background:#fff;border-radius:var(--radius);border:1px solid #dde4f0;padding:40px 44px;margin-top:24px;text-align:center;}
.score-ring{width:140px;height:140px;border-radius:50%;margin:0 auto 24px;display:flex;align-items:center;justify-content:center;flex-direction:column;font-size:36px;font-weight:700;}
.score-ring.pass{background:#EAF3DE;color:var(--green);border:4px solid var(--green);}
.score-ring.fail{background:#FCEBEB;color:var(--red);border:4px solid var(--red);}
.score-ring .label{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-top:2px;}
.result-title{font-size:24px;font-weight:700;margin-bottom:8px;}
.result-title.pass{color:var(--green);}
.result-title.fail{color:var(--red);}
.result-sub{color:var(--gray);font-size:14px;margin-bottom:28px;line-height:1.6;}
.breakdown{background:var(--light);border-radius:8px;padding:20px 24px;margin-bottom:28px;text-align:left;}
.breakdown h3{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--navy);margin-bottom:14px;}
.breakdown-row{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #dde4f0;font-size:13px;}
.breakdown-row:last-child{border-bottom:none;}
.breakdown-row .mod{color:var(--gray);}
.breakdown-row .score{font-weight:600;}
.score-pass{color:var(--green);}
.score-fail{color:var(--red);}
.btn-row{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}
.btn-cert{background:var(--gold);color:var(--navy);padding:13px 28px;border-radius:8px;font-size:15px;font-weight:700;cursor:pointer;border:none;}
.btn-retake{background:#fff;color:var(--navy);padding:13px 28px;border-radius:8px;font-size:15px;font-weight:700;cursor:pointer;border:1.5px solid var(--navy);}
.bsis-note{background:#EBF0FB;border-radius:8px;padding:14px 18px;font-size:12px;color:var(--navy);margin-top:20px;line-height:1.6;text-align:left;}

/* CERTIFICATE */
@media print{.no-print{display:none!important;}.screen{padding:0;}.cert-wrap{box-shadow:none;}}
.cert-wrap{background:#fff;border:3px double var(--navy);border-radius:4px;padding:48px 56px;margin:24px 0;text-align:center;position:relative;}
.cert-wrap::before{content:'';position:absolute;inset:8px;border:1px solid var(--gold);border-radius:2px;pointer-events:none;}
.cert-header{color:var(--navy);font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;margin-bottom:6px;}
.cert-company{font-size:26px;font-weight:700;color:var(--navy);margin-bottom:4px;}
.cert-ppo{font-size:11px;color:var(--gray);margin-bottom:28px;}
.cert-title{font-size:14px;color:var(--gray);margin-bottom:6px;}
.cert-name{font-size:32px;font-weight:700;color:var(--navy);border-bottom:2px solid var(--navy);display:inline-block;min-width:320px;padding-bottom:4px;margin-bottom:20px;}
.cert-body{font-size:13px;color:var(--gray);line-height:1.8;margin-bottom:6px;}
.cert-course{font-size:18px;font-weight:700;color:var(--navy);margin-bottom:16px;}
.cert-score{display:inline-block;background:#EAF3DE;color:var(--green);border-radius:6px;padding:5px 18px;font-size:13px;font-weight:600;margin-bottom:24px;}
.cert-sigs{display:flex;justify-content:space-around;margin-top:36px;gap:24px;}
.cert-sig{flex:1;text-align:center;}
.cert-sig .line{border-top:1.5px solid var(--navy);margin-bottom:6px;}
.cert-sig .slabel{font-size:11px;color:var(--gray);}
.cert-gold-bar{height:6px;background:var(--gold);border-radius:3px;margin:20px 0;}

/* FOOTER */
.site-footer{background:var(--navy);color:#CADCFC;text-align:center;padding:14px;font-size:11px;margin-top:40px;}
</style>
</head>
<body>

<div class="site-header">
  <div class="logo">MACCESS INC.</div>
  <div class="meta">PPO License #122729 | BSIS-Authorized Training Provider<br/>Course Assessment Platform</div>
</div>
<div class="gold-bar"></div>

<!-- ── SCREEN 1: COVER ─────────────────────────────────── -->
<div class="screen active" id="screen-cover">
  <div style="max-width:860px;margin:0 auto;padding:32px 20px;">
    <div class="cover-box">
      <h1>${bank.title}</h1>
      <div class="sub">${bank.subtitle}</div>
      <div class="info-grid">
        <div class="info-card"><div class="label">Total Questions</div><div class="value">${qs.length}</div></div>
        <div class="info-card"><div class="label">Passing Score</div><div class="value">${bank.passingScore}%</div></div>
        <div class="info-card"><div class="label">Training Hours</div><div class="value">${bank.hours} Hours</div></div>
        <div class="info-card"><div class="label">Regulatory Basis</div><div class="value" style="font-size:14px;">${bank.bpcRef}</div></div>
      </div>
      <div class="warning-box">
        ⚠️ <strong>BSIS Requirement:</strong> A score of <strong>${bank.passingScore}%</strong> is required to receive your Certificate of Completion per ${bank.bpcRef}. Students who do not achieve ${bank.passingScore}% must retake the full assessment. No partial credit is awarded.
      </div>
      <div class="student-form">
        <label>Full Legal Name (as it will appear on your certificate)</label>
        <input type="text" id="studentName" placeholder="First Middle Last"/>
        <label>Date</label>
        <input type="text" id="testDate" value="${today}" readonly/>
      </div>
      <button class="btn btn-primary" onclick="startTest()">Begin Assessment →</button>
    </div>
  </div>
</div>

<!-- ── SCREEN 2: TEST ──────────────────────────────────── -->
<div class="screen" id="screen-test">
  <div style="max-width:860px;margin:0 auto;padding:28px 20px;">
    <div class="progress-wrap">
      <div class="progress-bar-bg"><div class="progress-bar-fill" id="progress-fill" style="width:0%"></div></div>
      <div class="progress-text" id="progress-text">Question 1 of ${qs.length}</div>
    </div>
    <div id="question-area"></div>
    <div class="nav-row">
      <button class="btn-nav" id="btn-prev" onclick="prevQ()" style="display:none;">← Previous</button>
      <button class="btn-nav primary" id="btn-next" onclick="nextQ()">Next →</button>
    </div>
  </div>
</div>

<!-- ── SCREEN 3: RESULTS ───────────────────────────────── -->
<div class="screen" id="screen-results">
  <div style="max-width:860px;margin:0 auto;padding:32px 20px;">
    <div class="results-box">
      <div class="score-ring" id="score-ring"><span id="score-pct">0%</span><span class="label" id="score-label">Score</span></div>
      <div class="result-title" id="result-title">Result</div>
      <div class="result-sub" id="result-sub"></div>
      <div class="breakdown" id="breakdown"></div>
      <div class="btn-row" id="result-btns"></div>
      <div class="bsis-note" id="bsis-note"></div>
    </div>
  </div>
</div>

<!-- ── SCREEN 4: CERTIFICATE ──────────────────────────── -->
<div class="screen" id="screen-cert">
  <div style="max-width:860px;margin:0 auto;padding:32px 20px;">
    <div class="no-print" style="text-align:center;margin-bottom:20px;">
      <button class="btn-cert" onclick="window.print()">🖨️ Print Certificate</button>
      <button class="btn-retake" style="margin-left:12px;" onclick="showScreen('screen-results')">← Back to Results</button>
    </div>
    <div class="cert-wrap" id="cert-content"></div>
  </div>
</div>

<div class="site-footer">
  MACCESS INC. &nbsp;|&nbsp; Private Security LA Worldwide (PSLAW) &nbsp;|&nbsp; PPO License #122729 &nbsp;|&nbsp; BSIS-Authorized Training Provider
</div>

<script>
const QUESTIONS = ${qsJSON};
const PASSING   = ${bank.passingScore};
const LETTERS   = ['A','B','C','D'];

let current   = 0;
let answers   = new Array(QUESTIONS.length).fill(null);
let confirmed = new Array(QUESTIONS.length).fill(false);
let studentName = '';
let testDate    = '';

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0,0);
}

function startTest() {
  studentName = document.getElementById('studentName').value.trim();
  testDate    = document.getElementById('testDate').value.trim();
  if (!studentName) { alert('Please enter your full legal name before beginning.'); return; }
  showScreen('screen-test');
  renderQ();
}

function renderQ() {
  const q   = QUESTIONS[current];
  const pct = Math.round((current / QUESTIONS.length) * 100);
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-text').textContent = 'Question ' + (current+1) + ' of ' + QUESTIONS.length;
  document.getElementById('btn-prev').style.display = current > 0 ? 'inline-block' : 'none';
  const isLast = current === QUESTIONS.length - 1;
  const btnNext = document.getElementById('btn-next');
  btnNext.textContent = isLast ? 'Submit Assessment' : 'Next →';

  const conf = confirmed[current];
  const sel  = answers[current];

  let optsHTML = q.options.map((opt, i) => {
    let cls = 'opt';
    if (conf) {
      if (i === q.answer) cls += ' correct';
      else if (i === sel && i !== q.answer) cls += ' wrong';
    } else if (i === sel) cls += ' selected';
    const onclick = conf ? '' : \`onclick="selectOpt(\${i})"\`;
    return \`<div class="\${cls}" \${onclick}>
      <div class="opt-letter">\${LETTERS[i]}</div>
      <span>\${opt}</span>
    </div>\`;
  }).join('');

  let feedbackHTML = '';
  if (conf) {
    if (sel === q.answer) {
      feedbackHTML = \`<div class="feedback correct">✓ Correct. \${q.ref}</div>\`;
    } else {
      feedbackHTML = \`<div class="feedback wrong">✗ Incorrect. The correct answer is <strong>\${LETTERS[q.answer]}. \${q.options[q.answer]}</strong>. Ref: \${q.ref}</div>\`;
    }
  }

  document.getElementById('question-area').innerHTML = \`
    <div class="module-badge">\${q.module} <span class="ref-badge">\${q.ref}</span></div>
    <div class="q-card">
      <div class="q-number">Question \${current+1} of \${QUESTIONS.length}</div>
      <div class="q-text">\${q.q}</div>
      <div class="options">\${optsHTML}</div>
      \${feedbackHTML}
    </div>\`;
}

function selectOpt(i) {
  if (confirmed[current]) return;
  answers[current] = i;
  confirmed[current] = true;
  renderQ();
}

function nextQ() {
  if (!confirmed[current]) {
    alert('Please select an answer before continuing.');
    return;
  }
  if (current < QUESTIONS.length - 1) {
    current++;
    renderQ();
  } else {
    showResults();
  }
}

function prevQ() {
  if (current > 0) { current--; renderQ(); }
}

function showResults() {
  showScreen('screen-results');

  let correct = 0;
  const modMap = {};
  QUESTIONS.forEach((q, i) => {
    if (answers[i] === q.answer) correct++;
    if (!modMap[q.module]) modMap[q.module] = {correct:0, total:0};
    modMap[q.module].total++;
    if (answers[i] === q.answer) modMap[q.module].correct++;
  });

  const pct  = Math.round((correct / QUESTIONS.length) * 100);
  const pass = pct >= PASSING;

  const ring = document.getElementById('score-ring');
  ring.className = 'score-ring ' + (pass ? 'pass' : 'fail');
  document.getElementById('score-pct').textContent = pct + '%';
  document.getElementById('score-label').textContent = pass ? 'PASSED' : 'NOT PASSED';

  const title = document.getElementById('result-title');
  title.className = 'result-title ' + (pass ? 'pass' : 'fail');
  title.textContent = pass ? '✓ Assessment Passed' : '✗ Assessment Not Passed';

  document.getElementById('result-sub').innerHTML = pass
    ? \`Congratulations, <strong>\${studentName}</strong>. You answered \${correct} of \${QUESTIONS.length} questions correctly and have satisfied the BSIS course assessment requirement per ${bank.bpcRef}. Your Certificate of Completion is ready below.\`
    : \`You answered \${correct} of \${QUESTIONS.length} questions correctly. A score of ${bank.passingScore}% (\${QUESTIONS.length}/\${QUESTIONS.length} correct) is required per ${bank.bpcRef}. Please review the course material and retake the full assessment.\`;

  // Module breakdown
  let bHTML = '<h3>Score by Module</h3>';
  for (const [mod, data] of Object.entries(modMap)) {
    const modPct = Math.round((data.correct / data.total) * 100);
    const cls    = modPct === 100 ? 'score-pass' : 'score-fail';
    bHTML += \`<div class="breakdown-row"><span class="mod">\${mod}</span><span class="score \${cls}">\${data.correct}/\${data.total} (\${modPct}%)</span></div>\`;
  }
  bHTML += \`<div class="breakdown-row" style="margin-top:6px;font-weight:700;"><span>Overall</span><span class="\${pass?'score-pass':'score-fail'}">\${correct}/\${QUESTIONS.length} (\${pct}%)</span></div>\`;
  document.getElementById('breakdown').innerHTML = bHTML;

  // Buttons
  let btnsHTML = '';
  if (pass) {
    btnsHTML = \`<button class="btn-cert" onclick="showCertificate()">View Certificate →</button>\`;
  }
  btnsHTML += \`<button class="btn-retake" onclick="retake()">\${pass ? 'Retake Assessment' : '↺ Retake Assessment'}</button>\`;
  document.getElementById('result-btns').innerHTML = btnsHTML;

  // BSIS note
  document.getElementById('bsis-note').innerHTML = pass
    ? '<strong>BSIS Compliance:</strong> This Certificate of Completion satisfies the course assessment requirement under ${bank.bpcRef}. Print and retain your certificate. Your employer (MACCESS INC.) is required to maintain your training record per Title 16 CCR §643(b).'
    : '<strong>BSIS Requirement:</strong> ${bank.passingScore}% is the minimum passing score per ${bank.bpcRef}. You must retake the full assessment. Answers are shown for questions you attempted. Please review all course material before retaking.';
}

function retake() {
  current   = 0;
  answers   = new Array(QUESTIONS.length).fill(null);
  confirmed = new Array(QUESTIONS.length).fill(false);
  showScreen('screen-test');
  renderQ();
}

function showCertificate() {
  const today = new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
  document.getElementById('cert-content').innerHTML = \`
    <div class="cert-header">Certificate of Completion</div>
    <div class="cert-gold-bar"></div>
    <div class="cert-company">MACCESS INC.</div>
    <div class="cert-ppo">Private Patrol Operator &nbsp;|&nbsp; PPO License #122729 &nbsp;|&nbsp; BSIS-Authorized Training Provider</div>
    <div class="cert-title">This certifies that</div>
    <div class="cert-name">\${studentName}</div>
    <div class="cert-body">has successfully completed the BSIS-compliant course:</div>
    <div class="cert-course">${bank.title}</div>
    <div class="cert-score">Assessment Score: 100% &nbsp;✓&nbsp; Passing</div>
    <div class="cert-body">This completion satisfies the ${bank.hours}-hour training requirement under ${bank.bpcRef} and the California Bureau of Security and Investigative Services (BSIS) training standards.<br/>Retain this certificate until your guard card registration expires or is canceled per Title 16 CCR §643(b).</div>
    <div class="cert-gold-bar"></div>
    <div class="cert-sigs">
      <div class="cert-sig"><div class="line"></div><div class="slabel">Student Signature</div></div>
      <div class="cert-sig"><div class="line"></div><div class="slabel">Date: \${today}</div></div>
      <div class="cert-sig"><div class="line"></div><div class="slabel">Instructor Signature &nbsp;|&nbsp; MACCESS INC.</div></div>
    </div>\`;
  showScreen('screen-cert');
}
</script>
</body>
</html>`;
}

// ══════════════════════════════════════════════════════════════════════
// 2. BUILD ANSWER KEY PPTX (instructor/company copy)
// ══════════════════════════════════════════════════════════════════════
async function buildAnswerKey(bank, outputPath) {
  const qs = bank.questions;
  let pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "MACCESS INC. — INTERNAL";
  pres.title = bank.title + " — Answer Key (Instructor Copy)";

  const makeShadow = () => ({ type:"outer", color:"000000", blur:6, offset:2, angle:45, opacity:0.1 });

  // Cover
  let cover = pres.addSlide();
  cover.background = { color: NAVY };
  cover.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.6, fill:{ color:RED } });
  cover.addText("CONFIDENTIAL — INTERNAL USE ONLY — DO NOT DISTRIBUTE TO STUDENTS", {
    x:0, y:0, w:10, h:0.6, fontSize:11, bold:true, color:WHITE,
    fontFace:"Calibri", align:"center", valign:"middle", margin:0
  });
  cover.addShape(pres.shapes.RECTANGLE, { x:0, y:4.6, w:10, h:1.025, fill:{ color:GOLD } });
  cover.addShape(pres.shapes.RECTANGLE, { x:0, y:0.6, w:0.45, h:4.0, fill:{ color:RED } });
  cover.addText("ANSWER KEY", {
    x:0.6, y:0.85, w:9, h:0.65, fontSize:18, bold:true,
    color:GOLD, fontFace:"Calibri", align:"left", charSpacing:6, margin:0
  });
  cover.addText(bank.title, {
    x:0.6, y:1.5, w:9, h:1.3, fontSize:32, bold:true,
    color:WHITE, fontFace:"Calibri", align:"left", margin:0
  });
  cover.addText("Instructor & Company Copy\nRetain securely — not for student distribution", {
    x:0.6, y:2.9, w:9, h:0.8, fontSize:14, color:"CADCFC",
    fontFace:"Calibri", align:"left", margin:0
  });
  cover.addText(`${qs.length} Questions  |  Passing Score: ${bank.passingScore}%  |  ${bank.bpcRef}`, {
    x:0.6, y:3.8, w:9, h:0.45, fontSize:12, italic:true, color:"9AAFCC",
    fontFace:"Calibri", align:"left", margin:0
  });
  cover.addText("MACCESS INC.", {
    x:0.6, y:4.68, w:4, h:0.5, fontSize:14, bold:true,
    color:NAVY, fontFace:"Calibri", align:"left", valign:"middle", margin:0
  });
  cover.addText("PPO License #122729  |  BSIS-Authorized Training Provider  |  " + new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}), {
    x:0.6, y:5.06, w:9, h:0.25, fontSize:8, italic:true,
    color:NAVY, fontFace:"Calibri", align:"left", margin:0
  });

  // Quick-reference grid (all answers on one slide)
  let gridSlide = pres.addSlide();
  gridSlide.background = { color: "F4F6FB" };
  gridSlide.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.9, fill:{ color:NAVY } });
  gridSlide.addText("QUICK REFERENCE — ALL ANSWERS", {
    x:0.4, y:0, w:7, h:0.9, fontSize:22, bold:true,
    color:WHITE, fontFace:"Calibri", valign:"middle", margin:0
  });
  gridSlide.addText(`${qs.length} Questions`, {
    x:7.5, y:0, w:2.3, h:0.9, fontSize:13, color:GOLD,
    fontFace:"Calibri", valign:"middle", align:"right", margin:0
  });

  const LETTERS = ["A","B","C","D"];
  const cols = 5;
  qs.forEach((q, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = 0.28 + col * 1.9;
    const y = 1.05 + row * 0.75;
    const ansLetter = LETTERS[q.answer];
    const colorMap = { A:"1A5C3A", B:"1B2B5E", C:"7B3F00", D:"4A1A8A" };
    const bg = colorMap[ansLetter] || NAVY;

    gridSlide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w:1.78, h:0.65, fill:{ color:WHITE }, rectRadius:0.07, shadow:makeShadow()
    });
    gridSlide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w:0.58, h:0.65, fill:{ color:bg }, rectRadius:0.07
    });
    gridSlide.addText(`Q${i+1}`, {
      x, y, w:0.58, h:0.65,
      fontSize:9.5, bold:true, color:WHITE, fontFace:"Calibri",
      align:"center", valign:"middle", margin:0
    });
    gridSlide.addText(ansLetter, {
      x:x+0.58, y, w:1.2, h:0.65,
      fontSize:22, bold:true, color:bg, fontFace:"Calibri",
      align:"center", valign:"middle", margin:0
    });
  });
  gridSlide.addText("MACCESS INC.  |  PPO #122729  |  INSTRUCTOR COPY — DO NOT DISTRIBUTE", {
    x:0, y:5.3, w:10, h:0.28, fontSize:8, italic:true, color:GRAY,
    fontFace:"Calibri", align:"center", margin:0
  });

  // Full Q&A — 3 per slide
  for (let i = 0; i < qs.length; i += 3) {
    let slide = pres.addSlide();
    slide.background = { color:"F4F6FB" };
    slide.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.55, fill:{ color:RED } });
    slide.addText("INSTRUCTOR ANSWER KEY — CONFIDENTIAL", {
      x:0.35, y:0, w:7, h:0.55,
      fontSize:11, bold:true, color:WHITE, fontFace:"Calibri", valign:"middle", margin:0
    });
    slide.addText(`${bank.title}`, {
      x:7, y:0, w:2.85, h:0.55,
      fontSize:9, color:WHITE, fontFace:"Calibri", valign:"middle", align:"right", margin:0
    });

    const batch = [qs[i], qs[i+1], qs[i+2]].filter(Boolean);
    batch.forEach((q, qi) => {
      const qNum = i + qi + 1;
      const ansLetter = LETTERS[q.answer];
      const yBase = 0.65 + qi * 1.62;
      const cardH = 1.52;

      slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x:0.28, y:yBase, w:9.44, h:cardH,
        fill:{ color:WHITE }, rectRadius:0.09, shadow:makeShadow()
      });

      // Q number + module
      slide.addShape(pres.shapes.OVAL, {
        x:0.36, y:yBase+0.14, w:0.55, h:0.55, fill:{ color:NAVY }
      });
      slide.addText(String(qNum), {
        x:0.36, y:yBase+0.14, w:0.55, h:0.55,
        fontSize:13, bold:true, color:WHITE, fontFace:"Calibri",
        align:"center", valign:"middle", margin:0
      });
      slide.addText(q.module, {
        x:1.02, y:yBase+0.1, w:5.5, h:0.3,
        fontSize:8.5, italic:true, color:GRAY, fontFace:"Calibri", margin:0
      });
      slide.addText(q.ref, {
        x:6.6, y:yBase+0.1, w:2.9, h:0.3,
        fontSize:8.5, italic:true, color:GRAY, fontFace:"Calibri", align:"right", margin:0
      });

      // Question
      slide.addText(q.q, {
        x:1.02, y:yBase+0.38, w:8.6, h:0.52,
        fontSize:11, bold:true, color:"1A1A2E", fontFace:"Calibri", margin:0
      });

      // All 4 options with correct one highlighted
      q.options.forEach((opt, oi) => {
        const isCorrect = oi === q.answer;
        const col = oi % 2;
        const row = Math.floor(oi / 2);
        const ox = 1.02 + col * 4.3;
        const oy = yBase + 0.96 + row * 0.27;
        slide.addText(
          (isCorrect ? "✓ " : "   ") + LETTERS[oi] + ". " + opt,
          {
            x:ox, y:oy, w:4.0, h:0.24,
            fontSize:9, bold:isCorrect, margin:0,
            color:isCorrect ? GREEN : GRAY, fontFace:"Calibri"
          }
        );
      });

      // Correct answer badge
      slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x:8.88, y:yBase+0.88, w:0.72, h:0.55, fill:{ color:GREEN }, rectRadius:0.06
      });
      slide.addText(ansLetter, {
        x:8.88, y:yBase+0.88, w:0.72, h:0.55,
        fontSize:22, bold:true, color:WHITE, fontFace:"Calibri",
        align:"center", valign:"middle", margin:0
      });
    });
  }

  // Scoring guide
  let sg = pres.addSlide();
  sg.background = { color:"F4F6FB" };
  sg.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.9, fill:{ color:NAVY } });
  sg.addText("SCORING GUIDE & INSTRUCTOR INSTRUCTIONS", {
    x:0.4, y:0, w:9, h:0.9, fontSize:20, bold:true,
    color:WHITE, fontFace:"Calibri", valign:"middle", margin:0
  });

  const sgItems = [
    ["Passing Score", `${bank.passingScore}% — all ${qs.length} questions must be answered correctly per ${bank.bpcRef}`],
    ["Scoring Method", "1 point per correct answer. No partial credit. No penalty for wrong answers beyond the failed score."],
    ["Retake Policy", "Students who fail must retake the full assessment. Recommend review of specific modules where errors occurred."],
    ["Certificate", "Issue MACCESS INC. Certificate of Completion only to students achieving 100%. Sign and date each certificate."],
    ["Record Keeping", "Retain a copy of each student's completed assessment and certificate per Title 16 CCR §643(b). Records subject to BSIS audit."],
    ["Answer Key Security", "This document is for MACCESS INC. instructor and administrative use only. Do not share with students before, during, or after the assessment."],
    ["Module Weighting", `Questions are distributed across ${Object.keys(bank.questions.reduce((a,q)=>{a[q.module]=1;return a},{})).length} modules. Review incorrect answers by module to identify knowledge gaps.`],
  ];

  sgItems.forEach(([label, text], i) => {
    const y = 1.05 + i * 0.65;
    sg.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x:0.35, y, w:9.3, h:0.58, fill:{ color:WHITE }, rectRadius:0.08, shadow:makeShadow()
    });
    sg.addText(label, {
      x:0.45, y, w:1.9, h:0.58,
      fontSize:10, bold:true, color:NAVY, fontFace:"Calibri", valign:"middle", margin:4
    });
    sg.addText(text, {
      x:2.45, y, w:7.1, h:0.58,
      fontSize:10, color:"1A1A2E", fontFace:"Calibri", valign:"middle", margin:4
    });
  });

  await pres.writeFile({ fileName: outputPath });
  console.log("Answer key written:", outputPath);
}

// ══════════════════════════════════════════════════════════════════════
// GITHUB PUSH
// ══════════════════════════════════════════════════════════════════════
function pushToGitHub(localPath, repoPath, message) {
  return new Promise((resolve) => {
    const data = fs.readFileSync(localPath);
    const encoded = data.toString("base64");
    const getOpts = {
      hostname:"api.github.com",
      path:`/repos/${REPO}/contents/${encodeURIComponent(repoPath)}`,
      method:"GET",
      headers:{"Authorization":`token ${TOKEN}`,"User-Agent":"MACCESS-TestGen"}
    };
    https.request(getOpts, res => {
      let body = "";
      res.on("data", d => body += d);
      res.on("end", () => {
        let sha = "";
        try { sha = JSON.parse(body).sha || ""; } catch {}
        const payload = JSON.stringify({ message, content:encoded, branch:"main", ...(sha&&{sha}) });
        const putOpts = {
          hostname:"api.github.com",
          path:`/repos/${REPO}/contents/${encodeURIComponent(repoPath)}`,
          method:"PUT",
          headers:{"Authorization":`token ${TOKEN}`,"Content-Type":"application/json","User-Agent":"MACCESS-TestGen","Content-Length":Buffer.byteLength(payload)}
        };
        const pr = https.request(putOpts, res2 => {
          let b2 = "";
          res2.on("data", d => b2 += d);
          res2.on("end", () => {
            try { resolve("content" in JSON.parse(b2)); }
            catch { resolve(false); }
          });
        });
        pr.write(payload); pr.end();
      });
    }).end();
  });
}

// ══════════════════════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════════════════════
async function main() {
  const inputFile = process.argv[2] || "Powers_to_Arrest_BSIS_Certification_MACCESS_INC.pptx";
  const courseKey = inputFile.toLowerCase().includes("powers_to_arrest") || inputFile.toLowerCase().includes("pta")
    ? "powers_to_arrest" : null;

  if (!courseKey || !COURSE_BANKS[courseKey]) {
    console.error("Unknown course:", inputFile);
    process.exit(1);
  }

  const bank     = COURSE_BANKS[courseKey];
  const baseName = path.basename(inputFile, ".pptx");
  const htmlOut  = `/home/claude/${baseName}-Test.html`;
  const akOut    = `/home/claude/${baseName}-AnswerKey.pptx`;
  const akPdf    = `/home/claude/${baseName}-AnswerKey.pdf`;

  console.log(`\nCourse: ${bank.title}`);
  console.log(`Questions: ${bank.questions.length} | Pass: ${bank.passingScore}%`);

  // 1. Build interactive HTML test
  console.log("\nBuilding interactive HTML test...");
  fs.writeFileSync(htmlOut, buildHTML(bank, baseName));
  console.log("HTML written:", htmlOut);

  // 2. Build answer key PPTX
  console.log("\nBuilding answer key PPTX...");
  await buildAnswerKey(bank, akOut);

  // Rezip answer key
  try { execSync(`python3 /mnt/skills/public/pptx/scripts/rezip.py "${akOut}"`, {stdio:"inherit"}); }
  catch(e) { console.warn("Rezip:", e.message); }

  // PDF of answer key
  try {
    execSync(`python3 /mnt/skills/public/pptx/scripts/office/soffice.py --headless --convert-to pdf "${akOut}"`, {stdio:"inherit"});
    console.log("Answer key PDF:", akPdf);
  } catch(e) { console.warn("PDF:", e.message); }

  // 3. Push all to GitHub
  const repoDir = `PSLAW-Courses/final-projects`;
  console.log("\nPushing to GitHub...");

  const files = [
    [htmlOut,  `${repoDir}/${path.basename(htmlOut)}`,  `feat: ${bank.title} — Interactive Test Module`],
    [akOut,    `${repoDir}/${path.basename(akOut)}`,    `feat: ${bank.title} — Answer Key (Instructor Copy)`],
  ];
  if (fs.existsSync(akPdf)) {
    files.push([akPdf, `${repoDir}/${path.basename(akPdf)}`, `feat: ${bank.title} — Answer Key PDF`]);
  }

  for (const [local, remote, msg] of files) {
    if (!fs.existsSync(local)) { console.log(`  ⚠️  Missing: ${local}`); continue; }
    const ok = await pushToGitHub(local, remote, msg);
    console.log(`  ${ok?"✅":"❌"} ${path.basename(remote)}`);
  }

  console.log(`\nComplete.\n  Test: ${path.basename(htmlOut)}\n  Answer Key: ${path.basename(akOut)}`);
}

main().catch(console.error);
