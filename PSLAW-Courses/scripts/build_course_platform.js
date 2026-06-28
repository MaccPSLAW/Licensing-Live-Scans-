/**
 * MACCESS INC. / PSLAW — Course Platform Builder
 * Generates a complete purchasable, sequential course delivery page per module.
 *
 * Each HTML file includes:
 *  1. Sales landing page (pricing, curriculum, instructor, testimonials, buy CTA)
 *  2. Enrollment gate (name + email collected, "enroll" unlocks the course)
 *  3. Sequential slide-by-slide content delivery with NEXT button gating
 *  4. Module progress tracker (sidebar, like PSI's curriculum list)
 *  5. Knowledge check quiz per module section
 *  6. Final BSIS assessment (full question bank, 100% required)
 *  7. Printable BSIS Certificate of Completion
 *
 * Usage: called at end of every build script, or standalone:
 *   node build_course_platform.js
 */

// ═══════════════════════════════════════════════════════════════════════════════
// COURSE CATALOG
// Each entry defines one module's full content — slides, questions, and metadata.
// Add new entries here when a new module is built.
// ═══════════════════════════════════════════════════════════════════════════════
const CATALOG = {

  Workplace_Violence_BSIS_Skills_MACCESS_INC: {
    title:     "Workplace Violence",
    subtitle:  "BSIS Elective Skills Course — 4 Credit Hours",
    price:     "49",
    hours:     "4",
    bpcRef:    "BPC §7583.6(b)",
    authority: "BPC §7583.6(b) | CA Labor Code §6401.9 (SB 553)",
    category:  "Elective",
    badge:     "BSIS APPROVED",
    outcomes: [
      "Identify all four types of workplace violence defined by Cal/OSHA",
      "Recognize worker-to-worker, client, and supervisor warning signs",
      "Apply anger de-escalation strategies in live scenarios",
      "Understand California SB 553 Violent Incident Log requirements",
      "Execute Run-Hide-Fight protocol for active shooter situations",
      "File compliant incident reports per CA Labor Code §6401.9",
    ],
    modules: [
      {
        num: 1,
        title: "California Law & Violence Types",
        duration: "25 min",
        icon: "⚖️",
        slides: [
          {
            heading: "California Workplace Violence Law — SB 553",
            subheading: "CA Labor Code §6401.9 | Effective July 1, 2024",
            content: [
              { type:"alert", text:"Effective July 1, 2024: Every California employer must establish, implement, and maintain a written Workplace Violence Prevention Plan (WVPP) under CA Labor Code §6401.9." },
              { type:"h3", text:"What SB 553 Requires" },
              { type:"bullets", items:[
                "Written Workplace Violence Prevention Plan (WVPP) — site-specific",
                "Annual employee training — must be repeated every year",
                "Violent Incident Log documenting every threat or violent event",
                "Plan review after every incident and annually at minimum",
                "No retaliation against employees who report threats or contact law enforcement",
              ]},
              { type:"callout", label:"Penalties", text:"Up to $25,000 for serious violations. Up to $158,727 for willful violations. Cal/OSHA enforces." },
            ],
          },
          {
            heading: "Four Types of Workplace Violence",
            subheading: "Cal/OSHA Classification | CA Labor Code §6401.9",
            content: [
              { type:"h3", text:"Know Your Risk Category" },
              { type:"typecards", items:[
                { label:"Type 1 — External / Criminal", text:"Violence by persons with no legitimate relationship to the workplace. Robbery, trespass, active shooter.", color:"#8B1A1A" },
                { label:"Type 2 — Customer / Client", text:"Violence directed at employees by clients, patients, customers, or students. MOST COMMON type — security guards face elevated risk.", color:"#7B4500" },
                { label:"Type 3 — Worker on Worker", text:"Violence by a current or former employee, supervisor, or manager against another employee.", color:"#1B2B5E" },
                { label:"Type 4 — Personal Relationship", text:"Domestic violence or personal relationship conflict that enters the workplace.", color:"#005C5C" },
              ]},
              { type:"callout", label:"Your Risk", text:"Security guards face elevated risk of Type 1 (external criminal) and Type 2 (client/customer) violence. Your training must reflect this." },
            ],
          },
        ],
        quiz: [
          { q:"Which type of workplace violence is most common and represents the highest risk for security guards?", options:["Type 1 — External Criminal","Type 2 — Customer/Client","Type 3 — Worker on Worker","Type 4 — Personal Relationship"], answer:1 },
          { q:"California SB 553 became effective and enforceable on:", options:["January 1, 2024","July 1, 2024","January 1, 2025","July 1, 2025"], answer:1 },
        ],
      },
      {
        num: 2,
        title: "Detecting Warning Signs",
        duration: "30 min",
        icon: "👁️",
        slides: [
          {
            heading: "Worker-to-Worker Warning Signs",
            subheading: "BSIS Syllabus §11.1 | Behavioral Indicators",
            content: [
              { type:"h3", text:"Behavioral Red Flags" },
              { type:"bullets", items:[
                "Repeated expressions of grievance — feeling targeted, disrespected, or unfairly treated",
                "Direct or indirect threats: 'Someone is going to pay,' 'I know where they live'",
                "Fixation on prior conflicts, disciplinary actions, or personal grudges",
                "Statements suggesting hopelessness: 'I have nothing left to lose'",
                "History of violence or aggressive behavior in prior employment",
                "Withdrawal from coworkers combined with extreme mood changes",
              ]},
              { type:"rule", text:"Document ALL observations objectively and report immediately. Never confront alone." },
            ],
          },
          {
            heading: "Client/Customer & Supervisor Warning Signs",
            subheading: "BSIS Syllabus §11.1 | Type 2 & Type 3 Indicators",
            content: [
              { type:"twocol", left:{
                heading:"Client / Customer (Type 2)",
                items:[
                  "Escalating verbal aggression not responding to de-escalation",
                  "Physical intimidation — blocking exits, invading personal space",
                  "Repeated targeted contacts with the same employee",
                  "Visible intoxication combined with agitation",
                  "'You'll regret this' — entitlement plus threat",
                ]
              }, right:{
                heading:"Supervisor to Subordinate (Type 3)",
                items:[
                  "Patterns of public humiliation or belittling of specific employees",
                  "Disproportionate or selective disciplinary action",
                  "Threats of termination used as control",
                  "Retaliation against employees who raise safety concerns",
                  "Creating a climate where employees are afraid to report",
                ]
              }},
              { type:"rule", text:"Guard's role: document and report to MACCESS INC. management. Do not take sides in personnel matters." },
            ],
          },
        ],
        quiz: [
          { q:"A coworker repeatedly states 'I have nothing left to lose' and makes indirect references to knowing where management lives. The guard should:", options:["Dismiss it as typical workplace venting","Confront the coworker privately","Document precisely and report to a supervisor immediately","Wait to see if behavior escalates"], answer:2 },
          { q:"A client repeatedly seeks out and confronts the same security officer in a manner that feels personally threatening. This is most likely an indicator of:", options:["Type 1 — external criminal violence","Type 4 — personal relationship violence","Type 2 — client/customer targeted violence toward an employee","Normal occupational friction"], answer:2 },
        ],
      },
      {
        num: 3,
        title: "Anger Management",
        duration: "25 min",
        icon: "🧠",
        slides: [
          {
            heading: "The Anger Escalation Cycle",
            subheading: "BSIS Syllabus §11.2 | Understanding Escalation",
            content: [
              { type:"h3", text:"Five Stages — Intervene Early" },
              { type:"stagelist", items:[
                { num:"1", label:"TRIGGER", text:"Perceived injustice, frustration, or threat — the starting point", color:"#1A5C3A" },
                { num:"2", label:"ESCALATION", text:"Rising tension — voice louder, reasoning impaired, body language aggressive", color:"#7B4500" },
                { num:"3", label:"CRISIS", text:"Peak of anger — violence risk is HIGHEST — de-escalation still possible", color:"#8B1A1A" },
                { num:"4", label:"RECOVERY", text:"Tension drops — person may feel embarrassed — do not resume confrontation", color:"#1B4A8A" },
                { num:"5", label:"POST-CRISIS", text:"Relative calm — document the incident — follow up through proper channels", color:"#1A5C3A" },
              ]},
            ],
          },
          {
            heading: "De-escalation Strategies & Guard's Limits",
            subheading: "BSIS Syllabus §11.2 | BPC §7583.7(b)(6)",
            content: [
              { type:"twocol", left:{
                heading:"De-escalation Strategies",
                items:[
                  "Lower your voice when they raise theirs — model the calm you want",
                  "Use their name if known — humanizes the contact",
                  "Validate emotion without validating behavior: 'I can see you're frustrated'",
                  "Give them a face-saving choice — let them de-escalate without defeat",
                  "Use time: 'Let me get someone who can help' buys space",
                  "Create distance — do not crowd",
                ]
              }, right:{
                heading:"Guard's Limits — When to Escalate",
                items:[
                  "You are NOT a therapist — don't attempt to resolve deep grievances",
                  "After 2-3 minutes with no progress: request backup, notify supervisor",
                  "If physical threat appears imminent: create distance, call 911",
                  "Never argue about who is 'right'",
                  "Document every significant angry encounter within 1 hour",
                ]
              }},
            ],
          },
        ],
        quiz: [
          { q:"The stage of the anger escalation cycle where violence risk is highest is:", options:["The trigger stage","The escalation stage","The crisis stage","The recovery stage"], answer:2 },
          { q:"When a person is speaking loudly and angrily, the guard's most effective initial response is to:", options:["Raise their voice to establish authority","Match the person's energy","Lower their voice and speak calmly, modeling the response they want","Step back and say nothing"], answer:2 },
        ],
      },
      {
        num: 4,
        title: "Valuing Diversity & Personal Security",
        duration: "30 min",
        icon: "🛡️",
        slides: [
          {
            heading: "Diversity in Workplace Violence Prevention",
            subheading: "BSIS Syllabus §11.3 | FEHA | Equitable Enforcement",
            content: [
              { type:"bullets", items:[
                "Conflict expression varies across cultures — loudness alone does not equal threat",
                "Language barriers can escalate apparent conflict — use translation tools, stay patient",
                "Document observed behaviors only — never document cultural background as a risk factor",
                "Apply identical enforcement standards to every person regardless of race, ethnicity, religion, or national origin",
                "Disparate enforcement of workplace violence policies is a FEHA violation",
                "Every employee has the right to report workplace violence — ensure language access",
              ]},
              { type:"rule", text:"FEHA Violation: Applying different scrutiny to employees or clients based on race or national origin creates civil liability for MACCESS INC. and the guard personally." },
            ],
          },
          {
            heading: "Personal Security & Active Shooter Response",
            subheading: "BSIS Syllabus §11.4 | DHS Run-Hide-Fight | Cal/OSHA",
            content: [
              { type:"bullets", items:[
                "CPTED (Crime Prevention Through Environmental Design): lighting, sightlines, access control, eliminate blind spots",
                "Yellow alert at all times on duty — relaxed awareness, know who is around you",
                "Reactionary gap: maintain 6-10 feet from agitated or unknown persons",
                "Know the location of every panic button, AED, and first aid kit at your post",
              ]},
              { type:"rhf", items:[
                { label:"RUN", text:"Evacuate yourself and others if a safe exit exists. Leave belongings. Call 911 from a safe distance.", color:"#1A5C3A" },
                { label:"HIDE", text:"Lock/barricade the door. Silence phone. Turn off lights. Stay low. Wait for law enforcement clearance.", color:"#1B2B5E" },
                { label:"FIGHT", text:"Absolute last resort only — when life is in imminent danger and no other option exists.", color:"#8B1A1A" },
              ]},
              { type:"rule", text:"Security guards: PRIMARY role is protecting lives and evacuating civilians — not engaging the threat." },
            ],
          },
        ],
        quiz: [
          { q:"CPTED stands for:", options:["California Protocols for Threat Evaluation and Detection","Crime Prevention Through Environmental Design","Comprehensive Physical Training and Emergency Drill","Command Presence Training for Emergency Deployment"], answer:1 },
          { q:"In an active shooter situation, a security guard's FIRST priority is:", options:["Drawing any authorized weapon and moving toward the threat","Locking down the facility","Evacuating themselves and others if a safe exit is available — the RUN protocol","Calling MACCESS INC. management to request authorization"], answer:2 },
        ],
      },
      {
        num: 5,
        title: "Reporting & Incident Documentation",
        duration: "25 min",
        icon: "📋",
        slides: [
          {
            heading: "What Must Be Reported & When",
            subheading: "BSIS Syllabus §11.5 | CA Labor Code §6401.9",
            content: [
              { type:"h3", text:"Reportable Events — Zero Exceptions" },
              { type:"bullets", items:[
                "Any threat of violence — direct or indirect — made to or by anyone at the post",
                "Any physical act of violence regardless of injury outcome",
                "Any situation where an employee feared for their safety",
                "Any weapon observed on premises by an unauthorized person",
                "Active shooter or armed threat — call 911 FIRST, then notify supervisor",
              ]},
              { type:"h3", text:"Chain of Command" },
              { type:"stagelist", items:[
                { num:"1", label:"SAFETY FIRST", text:"Remove yourself and others from immediate danger before anything else", color:"#8B1A1A" },
                { num:"2", label:"CALL 911", text:"Any immediate threat to life — do not delay for paperwork", color:"#7B4500" },
                { num:"3", label:"NOTIFY SUPERVISOR", text:"Verbal immediately, written incident report within 1 hour", color:"#1B2B5E" },
                { num:"4", label:"WRITTEN REPORT", text:"Date, time, location, parties, exactly what was said/done, witnesses, actions taken", color:"#1A5C3A" },
              ]},
            ],
          },
          {
            heading: "SB 553 Violent Incident Log",
            subheading: "CA Labor Code §6401.9 | Required Elements | 5-Year Retention",
            content: [
              { type:"h3", text:"Required Log Elements" },
              { type:"bullets", items:[
                "Date, time, and location of the incident",
                "Type of workplace violence (Type 1 / 2 / 3 / 4)",
                "Description of the incident — what occurred, what was threatened",
                "Classification of who perpetrated the violence",
                "Circumstances at the time — staffing levels, activities, location characteristics",
                "Consequences — injuries, medical treatment, law enforcement response",
                "Employee names replaced with job titles only — to protect confidentiality",
              ]},
              { type:"callout", label:"Retention", text:"Log must be maintained for 5 years minimum and made available to employees and Cal/OSHA on request. Your incident report is the source document that feeds the log." },
              { type:"callout", label:"Anti-Retaliation", text:"CA Labor Code §6401.9: Employers may NOT punish employees for reporting threats or seeking law enforcement assistance." },
            ],
          },
        ],
        quiz: [
          { q:"CA Labor Code §6401.9 requires the Violent Incident Log to be retained for a minimum of:", options:["1 year","2 years","3 years","5 years"], answer:3 },
          { q:"SB 553 prohibits employers from:", options:["Requiring employees to report incidents within 24 hours","Sharing log data with Cal/OSHA","Retaliating against employees who report threats or seek law enforcement help","Maintaining records for more than 2 years"], answer:2 },
        ],
      },
    ],
    // Full BSIS final exam questions
    exam: [
      { module:"Module 1 — Law & Violence Types", ref:"CA Labor Code §6401.9", q:"Which type of workplace violence does Cal/OSHA identify as the MOST COMMON and a primary risk for security guards?", options:["Type 1 — External Criminal","Type 2 — Customer/Client","Type 3 — Worker on Worker","Type 4 — Personal Relationship"], answer:1 },
      { module:"Module 1 — Law & Violence Types", ref:"CA Labor Code §6401.9 | SB 553", q:"California SB 553 (Labor Code §6401.9) became effective and enforceable on:", options:["January 1, 2024","July 1, 2024","January 1, 2025","July 1, 2025"], answer:1 },
      { module:"Module 1 — Law & Violence Types", ref:"CA Labor Code §6401.9", q:"Under SB 553, a Workplace Violence Prevention Plan must be reviewed at minimum:", options:["Every 6 months","Once per year AND after every violent incident","Every 2 years","Only when a new employee is hired"], answer:1 },
      { module:"Module 2 — Warning Signs", ref:"BSIS Syllabus §11.1", q:"A coworker repeatedly states 'I have nothing left to lose.' The guard should:", options:["Dismiss it as venting","Confront the coworker privately","Document precisely and report to a supervisor immediately","Wait to see if it escalates"], answer:2 },
      { module:"Module 2 — Warning Signs", ref:"BSIS Syllabus §11.1", q:"A client repeatedly seeks out the same officer, making personally threatening comments. This is most likely:", options:["Type 1 violence","Type 4 violence","Type 2 — client/customer targeted violence","Normal occupational friction"], answer:2 },
      { module:"Module 2 — Warning Signs", ref:"BSIS Syllabus §11.1", q:"A supervisor publicly humiliates a specific employee repeatedly and threatens termination as a control tactic. The guard should:", options:["Take the employee's side and confront the supervisor","Document observations and report to MACCESS INC. management without taking sides","Ignore it — supervisor-subordinate matters are outside a guard's role","Advise the employee to file HR paperwork"], answer:1 },
      { module:"Module 3 — Anger Management", ref:"BSIS Syllabus §11.2", q:"The stage of the anger cycle where violence risk is highest is:", options:["The trigger stage","The escalation stage","The crisis stage","The recovery stage"], answer:2 },
      { module:"Module 3 — Anger Management", ref:"BSIS Syllabus §11.2 | BPC §7583.7(b)(6)", q:"When a person is shouting and angry, a guard's most effective initial response is to:", options:["Raise their own voice to establish authority","Match the person's energy level","Lower their voice and speak calmly, modeling the response they want","Step back and say nothing until they finish"], answer:2 },
      { module:"Module 3 — Anger Management", ref:"BSIS Syllabus §11.2", q:"Validating a person's emotion during a tense interaction means:", options:["Agreeing with their position","Acknowledging how they feel without condoning their behavior","Telling them their anger is justified","Remaining silent to avoid inflaming the situation"], answer:1 },
      { module:"Module 3 — Anger Management", ref:"BSIS Policy | MACCESS INC.", q:"A guard has attempted de-escalation for 2 minutes with no progress. The correct next step is:", options:["Continue indefinitely — it always works eventually","Apply physical restraint preemptively","Request backup, notify supervisor, and increase distance","Issue a formal trespass warning immediately"], answer:2 },
      { module:"Module 4 — Diversity & Personal Security", ref:"BSIS Syllabus §11.3 | FEHA", q:"Applying different levels of scrutiny to employees based on race or national origin when enforcing workplace violence policies is:", options:["Acceptable based on statistical risk assessment","A reasonable exercise of professional judgment","A FEHA violation that creates civil liability","Permissible when directed by the property owner"], answer:2 },
      { module:"Module 4 — Diversity & Personal Security", ref:"BSIS Syllabus §11.3 | CA Labor Code §6401.9", q:"An employee with limited English attempts to report a threatening incident. The guard should:", options:["Direct them to return when an English speaker is available","Document 'language barrier' and continue patrol","Use a translation app or bilingual colleague — every employee has the right to report","Accept only written reports from non-English speakers"], answer:2 },
      { module:"Module 4 — Diversity & Personal Security", ref:"BSIS Syllabus §11.4 | DHS", q:"CPTED stands for:", options:["California Protocols for Threat Evaluation and Detection","Crime Prevention Through Environmental Design","Comprehensive Physical Training and Emergency Drill","Command Presence Training for Emergency Deployment"], answer:1 },
      { module:"Module 4 — Diversity & Personal Security", ref:"BSIS Syllabus §11.4 | DHS Run-Hide-Fight", q:"In an active shooter situation, a security guard's FIRST priority is:", options:["Drawing an authorized weapon toward the threat","Locking down the facility","Evacuating themselves and others if a safe exit is available — the RUN protocol","Calling MACCESS INC. for authorization"], answer:2 },
      { module:"Module 4 — Diversity & Personal Security", ref:"DHS Run-Hide-Fight", q:"The FIGHT protocol should be used:", options:["As a first response to assert authority","When directed by law enforcement","Only as an absolute last resort when escape and hiding are impossible and life is in imminent danger","Whenever a clear view of the threat exists"], answer:2 },
      { module:"Module 5 — Reporting", ref:"BSIS Syllabus §11.5 | CA Labor Code §6401.9", q:"After witnessing a violent incident, a guard's FIRST action should be:", options:["Complete a detailed written report before anything else","Ensure immediate safety of all persons — call 911 if there is any threat to life — THEN notify supervisor","Photograph the scene before calling anyone","Notify the client property manager before contacting MACCESS INC."], answer:1 },
      { module:"Module 5 — Reporting", ref:"CA Labor Code §6401.9", q:"The Violent Incident Log required by CA Labor Code §6401.9 must be retained for a minimum of:", options:["1 year","2 years","3 years","5 years"], answer:3 },
      { module:"Module 5 — Reporting", ref:"CA Labor Code §6401.9 | SB 553", q:"SB 553 prohibits employers from:", options:["Requiring employees to report incidents within 24 hours","Sharing log data with Cal/OSHA","Retaliating against employees who report threats or seek law enforcement help","Maintaining records for more than 2 years"], answer:2 },
      { module:"Module 5 — Reporting", ref:"BSIS Syllabus §11.5", q:"Guard observes early warning signs of a potential violent situation — no immediate threat. They should:", options:["Wait until an actual threat occurs before reporting","Document specific observed behaviors and report to supervisor as soon as safely possible","Confront the individual to assess the concern","Only report if witnessed by at least one other person"], answer:1 },
      { module:"Review", ref:"CA Labor Code §6401.9 | BSIS Syllabus §11", q:"A security guard discovers a CCTV camera at a critical access point has been vandalized. The guard should:", options:["Attempt to repair it before reporting","Document the outage, notify supervisor immediately, and increase patrol frequency of that area","Report it at end of shift in the standard log","Wait for the property owner to notice"], answer:1 },
      { module:"Review", ref:"BSIS Syllabus §11", q:"The BSIS Workplace Violence elective course covers all of the following EXCEPT:", options:["Detecting unusual behavior and warning signs","Anger management","Firearms qualification and use","Valuing diversity"], answer:2 },
      { module:"Review", ref:"BPC §7583.6(b) | PPO License", q:"MACCESS INC.'s California Private Patrol Operator license number, required on all BSIS Certificates of Completion, is:", options:["#112233","#100001","#133445","#122729"], answer:3 },
    ],
  },


  // ═══════════════════════════════════════════════════════════════════
  // POWERS TO ARREST
  // ═══════════════════════════════════════════════════════════════════
  Powers_to_Arrest_BSIS_Certification_MACCESS_INC: {
    title:"Powers to Arrest", subtitle:"BSIS Pre-Registration Course — 3 Credit Hours",
    price:"39", hours:"3", bpcRef:"BPC §7583.7", authority:"BPC §7583.7 | PC §837 | SB 652",
    category:"Pre-Registration", badge:"BSIS REQUIRED",
    outcomes:[
      "Understand the three conditions for a lawful citizen's arrest under PC §837",
      "Distinguish between a security guard's authority and a peace officer's authority",
      "Identify criminal, civil, and administrative liability for unlawful arrests",
      "Apply PC §490.5 Shopkeeper's Privilege correctly",
      "Recognize limitations on search and detention",
      "Complete Part 1 of the 8-hour pre-registration requirement",
    ],
    modules:[
      { num:1, title:"Legal Framework & Authority", duration:"30 min", icon:"⚖️",
        slides:[
          { heading:"Powers to Arrest — Legal Foundation", subheading:"BPC §7583.7 | PC §837 | California Law",
            content:[
              { type:"alert", text:"BPC §7583.7: Every security guard must complete Power to Arrest training and pass a 100% exam before a guard card is issued. This course fulfills the 3-hour PTA requirement." },
              { type:"h3", text:"Your Authority as a Security Guard" },
              { type:"bullets", items:["Security guards derive arrest authority from PC §837 — the same statute that applies to any private citizen","You are NOT a peace officer. Your badge and uniform do not grant additional legal authority","Your authority exists only on your assigned post, during your assigned shift","MACCESS INC. PPO #122729 authorizes your assignment — it does not expand your legal authority"] },
              { type:"callout", label:"Key Rule", text:"When in doubt about any enforcement action, call MACCESS INC. management before acting. A wrong arrest is worse than no arrest." },
            ]},
          { heading:"PC §837 — Three Conditions for Citizen's Arrest", subheading:"PC §837(1)(2)(3) | The Only Legal Basis",
            content:[
              { type:"stagelist", items:[
                { num:"1", label:"PC §837(1) — In Your Presence", text:"A public offense is committed or attempted in your direct personal presence and observation", color:"#1A5C3A" },
                { num:"2", label:"PC §837(2) — Felony You Know Was Committed", text:"You have personal knowledge (not just a report) that a felony was committed by this specific person", color:"#1B2B5E" },
                { num:"3", label:"PC §837(3) — Reasonable Cause (Felony)", text:"Reasonable cause to believe the person committed a felony that actually occurred in fact. Highest liability risk.", color:"#8B1A1A" },
              ]},
              { type:"rule", text:"Misdemeanor arrests REQUIRE personal observation (§837(1)). You cannot arrest for a misdemeanor you did not personally witness — even on a report from management." },
            ]},
        ],
        quiz:[
          { q:"Under PC §837, a security guard may arrest for a misdemeanor ONLY when:", options:["A manager reports the offense","The offense is captured on CCTV","The guard personally witnesses the offense","The property owner authorizes the arrest"], answer:2 },
          { q:"Which PC §837 condition carries the greatest liability risk if used incorrectly?", options:["§837(1) — offense in presence","§837(2) — felony by that person","§837(3) — reasonable cause for felony","All carry equal risk"], answer:2 },
        ],
      },
      { num:2, title:"Limitations & Liability", duration:"25 min", icon:"🛡️",
        slides:[
          { heading:"What Security Guards Cannot Do", subheading:"PC §538d | 4th Amendment | PC §236",
            content:[
              { type:"bullets", items:[
                "Cannot represent themselves as a police officer — PC §538d (criminal offense)",
                "Cannot conduct a full search — limited to a safety pat-down for weapons during lawful detention",
                "Cannot detain without a lawful basis — unlawful detention is false imprisonment (PC §236)",
                "Cannot act outside the property they are assigned to protect",
                "Cannot hold a citizen's arrest subject for longer than necessary — deliver to police without unnecessary delay (PC §847)",
              ]},
              { type:"callout", label:"False Imprisonment", text:"PC §236: Detaining someone without a lawful basis is false imprisonment — a crime and civil tort. Courts view detentions over 20-30 minutes without police notification as potentially unlawful." },
            ]},
          { heading:"Criminal, Civil & Administrative Liability", subheading:"PC §242 | BPC §480 | Respondeat Superior",
            content:[
              { type:"typecards", items:[
                { label:"Criminal Liability", text:"Battery (PC §242), assault, false imprisonment, kidnapping (PC §207 — if you move the person). Criminal charges against you personally.", color:"#8B1A1A" },
                { label:"Civil Liability", text:"False arrest tort — compensatory and punitive damages. Wrongful death. Intentional infliction of emotional distress.", color:"#7B4500" },
                { label:"Administrative", text:"BSIS guard card suspension or revocation under BPC §480. Civil penalties and fines.", color:"#1B2B5E" },
                { label:"PPO Liability", text:"MACCESS INC. may be vicariously liable for your wrongful acts under respondeat superior doctrine.", color:"#005C5C" },
              ]},
            ]},
        ],
        quiz:[
          { q:"A guard detains someone for 45 minutes without calling police after a citizen's arrest because the supervisor is unreachable. This may result in:", options:["No liability — waiting for authorization is justified","False imprisonment charges and BSIS action","Only an internal policy violation","Commendation for thoroughness"], answer:1 },
          { q:"Representing yourself as a police officer while on duty as a security guard violates:", options:["BPC §7583.6","PC §538d — a criminal offense","Title 16 CCR §643","BPC §480 only"], answer:1 },
        ],
      },
      { num:3, title:"Trespass, Ethics & Emergency Response", duration:"25 min", icon:"📋",
        slides:[
          { heading:"Trespass Law & Shopkeeper's Privilege", subheading:"PC §602 | PC §490.5 | Property Rights",
            content:[
              { type:"h3", text:"Trespass — PC §602" },
              { type:"bullets", items:["Trespass is generally a misdemeanor — permits a citizen's arrest under §837(1) if you observe the refusal to leave","Clear posting or fencing required for open land before detention","Private property: a lawful order to leave must be given before trespass occurs","Detention for trespass must be brief — call police promptly"] },
              { type:"h3", text:"Shopkeeper's Privilege — PC §490.5" },
              { type:"callout", label:"PC §490.5", text:"When working for a retail merchant, you may detain a shoplifting suspect when you have PROBABLE CAUSE based on your own DIRECT PERSONAL OBSERVATION. A report from another employee alone is NOT sufficient." },
            ]},
          { heading:"Ethics, Communications & Emergency Response", subheading:"BSIS Ethics | BPC §7583.7 | Emergency Procedures",
            content:[
              { type:"bullets", items:[
                "Document every arrest in writing within 1 hour — date, time, parties, basis for arrest, force used, outcome",
                "When announcing a citizen's arrest: clearly state the basis in plain language",
                "Medical emergency: assess scene for personal safety first, then call 911 immediately",
                "Active threat: your first duty is protecting lives — call 911, do not put yourself in danger unnecessarily",
                "Ethics: your enforcement decisions must be free from bias based on race, gender, religion, or any protected characteristic",
              ]},
              { type:"rule", text:"Falsifying any incident report or arrest record is a crime and grounds for immediate BSIS revocation." },
            ]},
        ],
        quiz:[
          { q:"Under PC §490.5, a guard may detain a shoplifting suspect when:", options:["A manager reports the theft","Any store employee witnesses the theft","The guard has probable cause based on their own direct personal observation","The loss prevention system flags the person"], answer:2 },
          { q:"After making a lawful citizen's arrest, the guard must deliver the subject to police:", options:["Within 4 hours","At the end of the shift","Without unnecessary delay","After completing the written report"], answer:2 },
        ],
      },
    ],
    exam:[
      { module:"Legal Framework", ref:"BPC §7583.7", q:"The passing score required to receive a BSIS Powers to Arrest Certificate of Completion is:", options:["70%","80%","90%","100%"], answer:3 },
      { module:"Legal Framework", ref:"PC §837", q:"A security guard's arrest authority in California comes from:", options:["Their BSIS guard card","BPC §7583.7 only","PC §837 — the citizen's arrest statute","Their employer's authorization"], answer:2 },
      { module:"PC §837 Conditions", ref:"PC §837(1)", q:"Under PC §837(1), a guard may make a citizen's arrest when a public offense is:", options:["Reported by a witness","Suspected based on prior history","Captured on CCTV only","Committed or attempted in the guard's direct personal presence"], answer:3 },
      { module:"PC §837 Conditions", ref:"PC §837(2)", q:"Under PC §837(2), a guard may arrest someone for a felony not committed in their presence if:", options:["A supervisor authorizes the arrest","The guard has personal knowledge the person committed the felony","The property owner requests the arrest","The guard has a strong suspicion"], answer:1 },
      { module:"PC §837 Conditions", ref:"PC §837(3)", q:"PC §837(3) requires that for a reasonable-cause felony arrest:", options:["The offense is suspected but unconfirmed","A felony must have actually been committed in fact","Police must be notified first","Violence or weapons must be involved"], answer:1 },
      { module:"Limitations", ref:"PC §837 | Misdemeanors", q:"A guard receives a report that someone stole from the store yesterday but did not witness it. Can they make a citizen's arrest for this misdemeanor?", options:["Yes — any theft justifies arrest","Yes — with supervisor approval","No — misdemeanor arrest requires personal observation","No — only police can arrest for theft"], answer:2 },
      { module:"Limitations", ref:"PC §538d", q:"A guard who represents themselves as a police officer may face charges under:", options:["PC §602","BPC §480","PC §538d — a criminal offense","PC §836"], answer:2 },
      { module:"Limitations", ref:"PC §236 | 4th Amendment", q:"A security guard's search authority during a lawful detention is limited to:", options:["A full search of clothing and bags","An unlimited search on private property","A safety pat-down for weapons only","Any search authorized by the property owner"], answer:2 },
      { module:"Liability", ref:"PC §236", q:"Detaining someone without a lawful basis under PC §837 constitutes:", options:["Lawful preventive detention","False imprisonment — PC §236","Authorized security action","An investigative detention"], answer:1 },
      { module:"Liability", ref:"Respondeat Superior", q:"MACCESS INC. as the PPO may be held liable for a guard's wrongful arrest under:", options:["Strict product liability","Qualified immunity","Vicarious liability — respondeat superior","Contributory negligence"], answer:2 },
      { module:"Trespass", ref:"PC §602", q:"For a trespass arrest to be lawful, the guard must have:", options:["Written authorization from the property owner","Personally witnessed the refusal to leave after a lawful order","Police authorization in advance","A prior written trespass warning on file"], answer:1 },
      { module:"Shopkeeper's Privilege", ref:"PC §490.5", q:"The Shopkeeper's Privilege allows detention for shoplifting when there is:", options:["Suspicion based on appearance","Probable cause based on the guard's direct personal observation","A manager's verbal authorization","A description matching prior reports"], answer:1 },
      { module:"After Arrest", ref:"PC §847", q:"After making a citizen's arrest, a guard must deliver the person to a peace officer:", options:["Within 24 hours","At end of shift","After completing an incident report","Without unnecessary delay"], answer:3 },
      { module:"Ethics", ref:"BSIS Ethics", q:"A guard who falsifies an incident report may face:", options:["A verbal warning only","A civil fine only","No consequences if the incident was minor","Termination and BSIS license revocation"], answer:3 },
      { module:"Review", ref:"BPC §7583.7 | PC §837", q:"MACCESS INC.'s California Private Patrol Operator license number, required on all BSIS Certificates of Completion, is:", options:["#112233","#100001","#133445","#122729"], answer:3 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // APPROPRIATE USE OF FORCE
  // ═══════════════════════════════════════════════════════════════════
  Appropriate_Use_of_Force_BSIS_Certification_MACCESS_INC: {
    title:"Appropriate Use of Force", subtitle:"BSIS Pre-Registration Course — 5 Credit Hours",
    price:"49", hours:"5", bpcRef:"BPC §7583.7", authority:"BPC §7583.7 | DCA AUF Manual July 2023",
    category:"Pre-Registration", badge:"BSIS REQUIRED",
    outcomes:[
      "Apply the objectively reasonable force standard in real-time situations",
      "Execute the four core concepts of de-escalation under pressure",
      "Identify implicit and explicit bias and their impact on enforcement decisions",
      "Recognize duty to intercede when witnessing excessive force",
      "Respond correctly to active shooter situations using DHS Run-Hide-Fight",
      "Complete Part 2 of the 8-hour pre-registration requirement",
    ],
    modules:[
      { num:1, title:"Legal Standards & Force Continuum", duration:"30 min", icon:"⚖️",
        slides:[
          { heading:"Legal Standards for Use of Force", subheading:"BPC §7583.7 | Graham v. Connor | Objectively Reasonable Standard",
            content:[
              { type:"callout", label:"The Standard", text:"Force must be OBJECTIVELY REASONABLE — evaluated from the perspective of a reasonable officer at the scene with the same information. Not judged in hindsight." },
              { type:"bullets", items:["BPC §7583.7 mandates AUF training for all California security guards","PC §242 Battery, PC §236 False Imprisonment, PC §245 Assault with deadly weapon — all apply","4th Amendment unreasonable seizure standards apply","Force must be proportionate to the specific threat and stepped down as threat decreases","Document every use of force — even if no contact is made"] },
            ]},
          { heading:"Force Options Continuum", subheading:"Proportionality | Escalation & De-escalation",
            content:[
              { type:"stagelist", items:[
                { num:"1", label:"Presence & Communication", text:"Uniform, calm demeanor, verbal commands — ALWAYS the first option", color:"#1A5C3A" },
                { num:"2", label:"Soft Empty-Hand Control", text:"Guiding, escort techniques — compliant subjects only", color:"#1B4A8A" },
                { num:"3", label:"Hard Empty-Hand Control", text:"Joint locks, control holds — actively resistant subjects", color:"#7B4500" },
                { num:"4", label:"Less-Lethal Force", text:"Baton (permit required), OC spray — active aggression, imminent threat", color:"#7B4500" },
                { num:"5", label:"Lethal Force — Last Resort", text:"Only when facing imminent death or serious bodily injury", color:"#8B1A1A" },
              ]},
              { type:"rule", text:"Force must be stepped DOWN immediately as the threat level decreases. Using force after submission is excessive — and criminal." },
            ]},
        ],
        quiz:[
          { q:"'Objectively reasonable force' is evaluated from the perspective of:", options:["A legal expert reviewing the incident afterward","The guard's supervisor on CCTV","A reasonable officer at the scene with the same information","The property owner who hired the guard"], answer:2 },
          { q:"Force used against a person must be reduced or stopped when:", options:["The subject verbally protests","The guard's supervisor arrives","The threat that justified the force no longer exists","The guard has documented the incident"], answer:2 },
        ],
      },
      { num:2, title:"De-escalation — Four Core Concepts", duration:"30 min", icon:"🧠",
        slides:[
          { heading:"De-escalation — Four Core Concepts", subheading:"BPC §7583.7(b)(6) | In-Person Required for Sections 5, 6, 9",
            content:[
              { type:"typecards", items:[
                { label:"1. Self-Control", text:"Control your own emotions before engaging. Slow your breathing. Respond — don't react. You set the tone.", color:"#1A5C3A" },
                { label:"2. Effective Communication", text:"Use plain, calm, respectful language. Ask open questions. Acknowledge feelings without agreeing with behavior.", color:"#1B2B5E" },
                { label:"3. Scene Assessment", text:"Identify weapons, exits, bystanders. Position for safety. Call backup before force is needed.", color:"#7B4500" },
                { label:"4. Force Options Awareness", text:"Know your options before you need them. Always start at the lowest effective level. Step down as threat decreases.", color:"#8B1A1A" },
              ]},
              { type:"callout", label:"Tactical Methods", text:"Time, Distance, Cover, and Concealment — use all four together to create space, call for help, and avoid force." },
            ]},
          { heading:"When Force IS and IS NOT Justified", subheading:"BPC §7583.7(b)(2) | Proportionality",
            content:[
              { type:"twocol",
                left:{ heading:"Force IS Justified", items:["Active physical aggression toward you or another person","Imminent threat of serious bodily injury — objectively reasonable belief","Subject is armed and threatening imminent attack","Threat level exceeds what verbal and soft control can address"] },
                right:{ heading:"Force Is NOT Justified", items:["Passive resistance alone — refusal to move","Verbal abuse or profanity — words alone","Property protection alone — baton cannot be used solely for property","After the threat has ended and subject is controlled","Punishment or intimidation after control is established"] }
              },
            ]},
        ],
        quiz:[
          { q:"De-escalation is NOT appropriate as a primary response when:", options:["A subject is verbally hostile but not threatening","A subject refuses to show identification","The subject poses an immediate physical threat requiring defensive action","A subject is crying or upset"], answer:2 },
          { q:"Which tactical de-escalation method uses physical barriers and distance to reduce threat?", options:["Restraint","Escalation of force","Time, distance, cover, and concealment","Verbal confrontation"], answer:2 },
        ],
      },
      { num:3, title:"Duty to Intercede, Bias & Active Shooter", duration:"25 min", icon:"🛡️",
        slides:[
          { heading:"Duty to Intercede & Supervisory Responsibilities", subheading:"BPC §7583.7(b)(3)-(4) | BPC §§7583.2, 7574.37",
            content:[
              { type:"callout", label:"Duty to Intercede", text:"Every security guard has a duty to intervene when witnessing clearly excessive force by a coworker or fellow officer. Failure to intercede when physically able = complicity." },
              { type:"bullets", items:["Intervene verbally first: 'Stop — that is excessive force'","Physical intervention if necessary to stop ongoing excessive force","After interceding: separate parties, preserve scene, report immediately","PPO must report use-of-force incidents to BSIS per BPC §§7583.2, 7574.37","Guard: complete written incident report within 1 hour for every use of force"] },
            ]},
          { heading:"Bias, Disability Interaction & Active Shooter", subheading:"BPC §7583.7(b)(7)-(11) | DHS Protocol",
            content:[
              { type:"bullets", items:[
                "Implicit bias: unconscious attitudes that affect decisions — apply consistent standards, document objective behaviors only",
                "ADA: reasonable accommodation required — one command at a time, plain language, extra processing time",
                "Behavioral health crisis: de-escalate first, call 911 for appropriate support — force is last resort",
                "Mental illness ≠ dangerousness — stigma causes over-reaction and excessive force",
              ]},
              { type:"rhf", items:[
                { label:"RUN", text:"Evacuate yourself and others if a safe exit exists. Call 911 from a safe distance.", color:"#1A5C3A" },
                { label:"HIDE", text:"Barricade, silence phone, stay low. Wait for law enforcement clearance.", color:"#1B2B5E" },
                { label:"FIGHT", text:"Absolute last resort only — when life is in imminent danger and no other option exists.", color:"#8B1A1A" },
              ]},
            ]},
        ],
        quiz:[
          { q:"A guard witnesses a coworker continuing to strike a handcuffed, compliant subject. The guard should:", options:["Document and raise at next staff meeting","Intervene immediately to stop the force and report the incident","Defer to the senior guard's judgment","Notify the client only"], answer:1 },
          { q:"Implicit bias in security work is best described as:", options:["Conscious prejudice guards are aware of","Automatic unconscious attitudes that affect perceptions and decisions","Bias found only in law enforcement","A type of bias training completely eliminates"], answer:1 },
        ],
      },
    ],
    exam:[
      { module:"Legal Standards", ref:"BPC §7583.7", q:"The standard for evaluating a security guard's use of force under California law is:", options:["Whatever the guard personally felt was necessary","Objectively reasonable under the circumstances","Whatever the property owner authorizes","Whatever force stops the situation"], answer:1 },
      { module:"Legal Standards", ref:"BPC §7583.7", q:"The AUF passing score required per BPC §7583.7 is:", options:["70%","80%","90%","100%"], answer:3 },
      { module:"Force Continuum", ref:"Use of Force Continuum", q:"In the force continuum, which response should always be attempted first?", options:["Physical restraint","Verbal commands and de-escalation","Drawing any authorized weapon","Calling police before taking any action"], answer:1 },
      { module:"De-escalation", ref:"BPC §7583.7(b)(6)", q:"The four core concepts of de-escalation per BSIS training are:", options:["Run, Hide, Fight, Report","Self-control, Effective Communication, Scene Assessment, Force Options","Observe, Orient, Decide, Act","Approach, Contain, Communicate, Resolve"], answer:1 },
      { module:"De-escalation", ref:"BPC §7583.7(b)(6)", q:"Which tactical methods are specifically listed in BSIS AUF training for de-escalation?", options:["Restraint and containment","Force, command, distance, exit","Time, distance, cover, and concealment","Radio, backup, cover, and reporting"], answer:2 },
      { module:"De-escalation", ref:"BPC §7583.7(b)(6)", q:"De-escalation is NOT appropriate as the primary response when:", options:["A subject is verbally hostile but non-threatening","A subject refuses to show identification","The subject poses an immediate physical threat requiring defensive action","A subject is upset or crying"], answer:2 },
      { module:"Duty to Intercede", ref:"BPC §7583.7(b)(3)", q:"The duty to intercede requires a guard to:", options:["Intervene in any physical altercation on the post","Report all uses of force to BSIS within 24 hours","Stop or attempt to stop another guard who is using clearly excessive force","Contact law enforcement before taking any action involving force"], answer:2 },
      { module:"Supervisory Responsibilities", ref:"BPC §7574.37", q:"Which statute requires a PPO to report use-of-force incidents to BSIS?", options:["BPC §480","PC §837","BPC §7574.37","Title 16 CCR §640"], answer:2 },
      { module:"Bias", ref:"BPC §7583.7(b)(7)", q:"Implicit bias in security work is best described as:", options:["Conscious deliberate prejudice","Automatic unconscious attitudes that affect perceptions and decisions","Bias found only in law enforcement","A type of bias training completely eliminates"], answer:1 },
      { module:"Bias", ref:"BPC §7583.7(b)(7)", q:"Cultural competency requires guards to:", options:["Treat all cultures identically","Recognize and adapt communication strategies for diverse communities while maintaining equal enforcement","Apply stricter scrutiny to unfamiliar cultures","Defer all cross-cultural contacts to a supervisor"], answer:1 },
      { module:"Disability & Mental Health", ref:"BPC §7583.7(b)(8)", q:"The ADA requires security guards to:", options:["Apply identical enforcement without modification","Provide reasonable accommodation and modified communication for persons with disabilities","Refer all ADA questions to the property owner","Restrict trespass enforcement against persons with disabilities"], answer:1 },
      { module:"Active Shooter", ref:"BPC §7583.7(b)(11) | DHS", q:"In an active shooter situation, a security guard's primary role is:", options:["Confront and neutralize the shooter","Protect lives, coordinate evacuation, and support law enforcement","Conduct a perimeter search before police arrive","Pursue the shooter through the facility"], answer:1 },
      { module:"Active Shooter", ref:"DHS Run-Hide-Fight", q:"The FIGHT protocol should be used:", options:["As first response to assert authority","When directed by law enforcement","Only as an absolute last resort when escape and hiding are impossible and life is in imminent danger","Whenever a clear view of the threat exists"], answer:2 },
      { module:"Force Application", ref:"BPC §7583.7 | Proportionality", q:"A guard uses a pain compliance hold on a cooperative subject who simply declined to show ID. This is:", options:["Lawful — compliance with ID checks can be enforced physically","Potentially excessive — the situation did not justify that level of force","Lawful if the client contract permits it","Required protocol per BSIS for non-compliant subjects"], answer:1 },
      { module:"Review", ref:"BPC §7583.7 | PPO License", q:"MACCESS INC.'s California Private Patrol Operator license number is:", options:["#112233","#100001","#133445","#122729"], answer:3 },
    ],
  },

  // ═══ MANDATORY & ELECTIVE MODULES (shared compact format) ════════════
  Public_Relations_Community_BSIS_Skills_MACCESS_INC: {
    title:"Public Relations & Community", subtitle:"BSIS Mandatory Skills Course — 4 Credit Hours",
    price:"39", hours:"4", bpcRef:"BPC §7583.6(b)", authority:"BPC §7583.6(b) | FEHA | Title 16 CCR §643",
    category:"Mandatory", badge:"BSIS MANDATORY",
    outcomes:["Recognize gender and racial harassment and discrimination","Apply verbal crisis intervention techniques","Value diversity in enforcement decisions","Identify signs of substance abuse and mental health crisis","Maintain BSIS ethical and professional standards","Complete within 30 days of guard card issuance"],
    modules:[
      { num:1, title:"Harassment, Discrimination & Respect", duration:"30 min", icon:"⚖️",
        slides:[
          { heading:"Harassment & Discrimination Recognition", subheading:"FEHA | California Government Code §12940",
            content:[
              { type:"bullets", items:["Gender harassment: unwelcome sexual comments, gestures, physical contact, or quid pro quo conditions","Racial harassment: slurs, stereotypes, hostile conduct based on race or ethnicity","FEHA prohibits all workplace harassment — guards are covered as employees AND in public interactions","Stereotyping: applying group-based assumptions to individuals — never a basis for enforcement decisions","Racial profiling is prohibited under California Penal Code §13519.4","Document only specific observed behaviors — never document race as a reason for contact"] },
              { type:"rule", text:"Disparate enforcement of security policies based on protected characteristics = FEHA violation + civil liability for MACCESS INC. and the guard personally." },
            ]},
          { heading:"Respect, Attitude & Command Presence", subheading:"BSIS Ethics | Professional Standards",
            content:[
              { type:"bullets", items:["Command presence: projecting calm authority through posture and demeanor — not aggression","Treat every person with equal dignity regardless of appearance, behavior, or perceived status","Apply the same enforcement standard to everyone — consistency is your legal protection","Your appearance reflects MACCESS INC., the client, and the profession — clean uniform required","Ethics: honest in all reports, minimum necessary force, no conflicts of interest, no gratuities","Falsifying a report = crime + BSIS revocation + personal perjury exposure in legal proceedings"] },
            ]},
        ],
        quiz:[
          { q:"A guard whose enforcement decisions are influenced by a person's race or appearance is:", options:["Exercising professional judgment","Violating PC §13519.4 and FEHA — creating civil liability","Applying post orders correctly","Acting within their discretion as a security professional"], answer:1 },
          { q:"Command presence means:", options:["Being physically intimidating and aggressive","Projecting calm authority through posture and demeanor","Always having a hand near your baton","Speaking loudly in all situations"], answer:1 },
        ],
      },
      { num:2, title:"Verbal Skills, Diversity & Ethics", duration:"30 min", icon:"🗣️",
        slides:[
          { heading:"Verbal Crisis Intervention & Diversity", subheading:"BSIS Training Manual | BPC §7583.6(b)",
            content:[
              { type:"stagelist", items:[
                { num:"1", label:"Approach Calmly", text:"Slow walk, hands visible, safe distance, non-threatening posture", color:"#1A5C3A" },
                { num:"2", label:"Introduce Yourself", text:"'I'm [Name] with MACCESS INC. security. I'm here to help.'", color:"#1B2B5E" },
                { num:"3", label:"Acknowledge the Emotion", text:"'I can see you're upset.' Validation reduces defensiveness without agreement.", color:"#7B4500" },
                { num:"4", label:"Ask Open-Ended Questions", text:"'Can you tell me what's going on?' Let them talk — listening de-escalates faster than commanding.", color:"#005C5C" },
                { num:"5", label:"Offer a Path Forward", text:"Provide choices where possible. Avoid ultimatums early in the contact.", color:"#1A5C3A" },
              ]},
            ]},
          { heading:"Substance Abuse, Mental Illness & Professional Ethics", subheading:"BSIS Training Manual | BSIS Code of Ethics",
            content:[
              { type:"twocol",
                left:{ heading:"Recognizing Impairment", items:["Stimulants (meth/cocaine): rapid speech, agitation, dilated pupils, excessive energy","CNS depressants (alcohol/opioids): slurred speech, staggering, pinpoint pupils, slow response","Mental health crisis: disorganized speech, paranoia, responding to things others can't perceive","Document behaviors — never diagnose","Call 911 for mental health support — do not try to manage crisis alone"] },
                right:{ heading:"Professional Ethics", items:["Honest in all reports — no falsification ever","Minimum necessary force — always","No gifts or gratuities from clients or vendors","Social media: never post client, incident, or post location information","When in doubt: call MACCESS INC. management before acting","You represent MACCESS INC. and the profession 24/7 while in uniform"] }
              },
            ]},
        ],
        quiz:[
          { q:"A person shows rapid speech, dilated pupils, and extreme agitation. These signs are most consistent with:", options:["Alcohol intoxication","Stimulant drug use","A mental health crisis requiring immediate detention","Normal emotional distress"], answer:1 },
          { q:"If a supervisor instructs a guard to falsify an incident report, the guard should:", options:["Comply — supervisors have authority over reports","Comply only if the incident was minor","Refuse and report the request to MACCESS INC. management","Complete as directed but note it privately"], answer:2 },
        ],
      },
    ],
    exam:[
      { module:"Harassment & Discrimination", ref:"FEHA | PC §13519.4", q:"A guard whose enforcement decisions are influenced by a visitor's race or national origin is:", options:["Exercising professional judgment","Violating PC §13519.4 and FEHA — creating civil and potentially criminal liability","Applying statistically informed risk assessment","Acting within their authorized discretion"], answer:1 },
      { module:"Harassment & Discrimination", ref:"FEHA", q:"A guard witnesses sexual harassment of a coworker by a client and is required to:", options:["Ignore it — it is between the coworker and the client","Report it to their supervisor and document the incident","Intervene only if the coworker asks for help","Allow the property manager to handle it without reporting"], answer:1 },
      { module:"Respect & Stereotyping", ref:"BSIS Ethics | PC §13519.4", q:"Stereotyping in security work occurs when a guard:", options:["Enforces post orders consistently","Applies more scrutiny based on race, religion, dress, or group characteristics","Reviews incident reports carefully","Documents all visitor interactions"], answer:1 },
      { module:"Command Presence", ref:"BSIS Ethics", q:"Command presence does NOT mean:", options:["Projecting confidence and professionalism","Being physically imposing and aggressive","Maintaining a calm, authoritative demeanor","Wearing a clean professional uniform"], answer:1 },
      { module:"Verbal Crisis Intervention", ref:"BSIS Training Manual", q:"Active listening during a crisis interaction requires the guard to:", options:["Wait for their turn to speak while preparing their next command","Focus primarily on identifying grounds for arrest","Fully attend to the person, acknowledge concerns, and confirm understanding","Document the conversation in real time rather than engaging"], answer:2 },
      { module:"Diversity", ref:"BPC §7583.6(b)", q:"A guard who speaks only English works where many visitors speak Spanish. The professional response to a language barrier is:", options:["Require all visitors to communicate in English","Direct non-English speakers to a different area until an interpreter arrives","Use translation tools, simple language, and respectful non-verbal communication","Refer them to a phone number and continue patrol"], answer:2 },
      { module:"Substance Abuse", ref:"BSIS Training Manual", q:"Signs of stimulant intoxication (methamphetamine, cocaine) include:", options:["Slurred speech, drooping eyelids, and slow reaction time","Rapid speech, heightened agitation, dilated pupils, and excessive energy","Calm demeanor with marked disorientation","Confusion and extremely slow response"], answer:1 },
      { module:"Mental Illness", ref:"BSIS Training Manual", q:"When encountering a person showing signs of a mental health episode, the guard's BEST initial response is:", options:["Immediately detain them for their own safety","Apply early physical restraint to prevent escalation","Approach calmly, reduce stimuli, speak slowly, and contact appropriate support","Ignore the situation unless property damage occurs"], answer:2 },
      { module:"Ethics", ref:"BSIS Code of Ethics", q:"Accepting gifts or favors from a client vendor in exchange for overlooking a violation is:", options:["Acceptable as a professional courtesy","A BSIS ethics violation and potentially bribery","Permissible if the value is under $25","At the guard's professional discretion"], answer:1 },
      { module:"Ethics", ref:"BSIS Code of Ethics | BPC §7583.6", q:"A security guard's uniform and professional appearance reflect on:", options:["Only the guard personally","Only MACCESS INC.","The guard, MACCESS INC., and the client — all three","The property owner only"], answer:2 },
      { module:"Review", ref:"BPC §7583.6(b) | PPO License", q:"MACCESS INC.'s California Private Patrol Operator license number is:", options:["#112233","#100001","#133445","#122729"], answer:3 },
    ],
  },

  Observation_Documentation_BSIS_Skills_MACCESS_INC: {
    title:"Observation & Documentation", subtitle:"BSIS Mandatory Skills Course — 4 Credit Hours",
    price:"39", hours:"4", bpcRef:"BPC §7583.6(b)", authority:"BPC §7583.6(b) | Title 16 CCR §643(b)",
    category:"Mandatory", badge:"BSIS MANDATORY",
    outcomes:["Write BSIS-compliant incident reports meeting all five standards","Apply effective patrol and observation techniques","Ask legally sound questions without compelling answers","Document suspicious persons and activity correctly","Prepare BOLO descriptions law enforcement can act on","Complete within 30 days of guard card issuance"],
    modules:[
      { num:1, title:"Report Writing & Documentation Standards", duration:"35 min", icon:"📝",
        slides:[
          { heading:"The Five Standards of a BSIS-Compliant Report", subheading:"BSIS Training Standards | Legal Documentation Requirements",
            content:[
              { type:"typecards", items:[
                { label:"FACTUAL", text:"Only what you personally saw, heard, or did. No speculation, no assumptions, no conclusions about guilt or motive.", color:"#1B2B5E" },
                { label:"ACCURATE", text:"Correct times, dates, locations, names, descriptions. Verify before submitting.", color:"#1A5C3A" },
                { label:"COMPLETE", text:"All relevant persons, actions, outcomes, and witnesses included.", color:"#7B4500" },
                { label:"CLEAR", text:"Plain English, chronological order, no undefined abbreviations.", color:"#005C5C" },
                { label:"TIMELY", text:"Completed as close to the incident as possible — ideally within 1 hour.", color:"#8B1A1A" },
              ]},
              { type:"rule", text:"NEVER erase or white-out an error. Draw a single line through it, initial it, and date it. Reports are legal documents — falsification is a crime." },
            ]},
          { heading:"What to Include — Required Report Elements", subheading:"BSIS Standards | Legal Documentation",
            content:[
              { type:"bullets", items:["Date, time, and exact location (address, floor, area)","Description of events in chronological order","Parties involved: sex, race, approximate age, height, weight, hair, clothing, distinctive marks","Witnesses: names and contact information if available","Actions taken by the guard: verbal commands, physical actions, calls made, persons notified","Evidence observed or secured — describe, do not move unless for safety","Outcome: subject detained, released, turned over to police, medical response","Your name, guard card number, and MACCESS INC. PPO #122729 on every report"] },
            ]},
        ],
        quiz:[
          { q:"Which should NEVER appear in a security incident report?", options:["The time and date of the incident","Verbatim quotes from witnesses","The guard's personal opinions and conclusions about guilt","The physical description of the subject"], answer:2 },
          { q:"A guard discovers a factual error in a report already submitted. They should:", options:["Destroy it and write a new one","Draw a single line through the error, write the correction, initial and date it — never erase","Leave the error in place","Ask a colleague to correct it on their behalf"], answer:1 },
        ],
      },
      { num:2, title:"Patrol, Questioning & Suspicious Activity", duration:"25 min", icon:"👁️",
        slides:[
          { heading:"Patrol Techniques & Observation", subheading:"BSIS Training Manual | Effective Security Patrol",
            content:[
              { type:"bullets", items:["Vary patrol route AND timing — predictable patrols are exploitable","Know the baseline: what is normal so anomalies stand out","Use all senses: sight, sound, smell (smoke, gas, chemicals)","Log every round: start/end time, route, all observations — 'nothing to report' must still be logged","Report immediately: propped doors, broken locks, unfamiliar vehicles, unusual odors, unauthorized persons","Night observation: use peripheral vision, not direct stare"] },
              { type:"rule", text:"Vary patrol route AND timing every single round. Same-time same-route patrols advertise your schedule to anyone watching." },
            ]},
          { heading:"Questioning Techniques & Documenting Suspicious Activity", subheading:"BSIS Training Manual | Legal Limits on Questioning",
            content:[
              { type:"twocol",
                left:{ heading:"Questioning — Do's", items:["Open-ended first: 'What brings you here today?'","Confirm with closed: 'Were you here yesterday?'","Neutral framing: 'Can you help me understand what happened?'","Document exact quotes: He said, 'I was just looking around'","You cannot compel answers — questioning is voluntary"] },
                right:{ heading:"BOLO Description Format", items:["Sex | Race | Age | Height | Weight","Hair: color, length, style","Eyes: color if observed","Clothing: colors, brands, footwear","Distinctive features: tattoos, scars, glasses","Direction of travel","Vehicle: make, model, color, plate state + number"] }
              },
              { type:"rule", text:"Never document race as the reason for suspicion. Document specific observed behaviors only. A BOLO must be as specific and accurate as possible." },
            ]},
        ],
        quiz:[
          { q:"Effective security patrol technique requires a guard to:", options:["Follow the identical route at the same time every round","Vary both the timing and route to avoid a predictable pattern","Minimize movement to preserve energy","Stay at a central observation point"], answer:1 },
          { q:"When a witness speaks limited English, a guard should:", options:["Skip documenting the witness account","Use an interpreter or translation aids and document the method used","Write the account based on assumption","Require the witness to return when a bilingual guard is available"], answer:1 },
        ],
      },
    ],
    exam:[
      { module:"Report Writing", ref:"BSIS Training Standards", q:"Which should NEVER appear in a BSIS-compliant security incident report?", options:["The precise time and date","Direct quotes from witnesses","The guard's personal opinions, speculation, or conclusions","A physical description of persons involved"], answer:2 },
      { module:"Report Writing", ref:"BSIS Training Standards", q:"An incident report should be completed:", options:["At the end of the shift","Within 72 hours","As close to the incident as possible — ideally within 1 hour","Only after consulting with a supervisor"], answer:2 },
      { module:"Report Writing", ref:"BSIS | Legal", q:"A guard discovers a factual error in a submitted report. They should:", options:["Destroy it and start over","Draw a single line through the error, write the correction, initial and date — never erase","Leave it in place","Have a colleague correct it"], answer:1 },
      { module:"Report Writing", ref:"BSIS Training Standards", q:"Security incident reports must be written in:", options:["First person — 'I observed...', 'I heard...'","Third person only to appear objective","Passive voice throughout to avoid blame","Abbreviated shorthand for efficiency"], answer:0 },
      { module:"English Documentation", ref:"BSIS Training Standards", q:"A guard whose primary language is not English must write official BSIS reports:", options:["In their native language for accuracy","In English — all BSIS documentation must be in English","In either language if accurate","In both languages"], answer:1 },
      { module:"Patrol", ref:"BSIS Training Manual", q:"Effective patrol technique requires a guard to:", options:["Follow the exact same route every round to demonstrate consistency","Vary both timing and route to prevent establishing a predictable pattern","Minimize movement to preserve energy","Remain at a central observation point"], answer:1 },
      { module:"Patrol", ref:"BSIS Training Manual", q:"A guard discovers a propped emergency exit that is normally secured. The correct response is:", options:["Assume it was left open accidentally and continue patrol","Close the door, document it in the shift log, and notify the supervisor","Leave it and report only if still open at end of shift","Alert law enforcement immediately"], answer:1 },
      { module:"Questioning", ref:"BSIS Training Manual", q:"An open-ended question is designed to:", options:["Confirm a specific fact with yes or no","Limit the subject to a defined set of responses","Encourage a detailed narrative response that provides maximum information","Allow the guard to direct the subject toward a predetermined answer"], answer:2 },
      { module:"Questioning", ref:"BSIS Training Manual | PC §837", q:"Guards have no legal obligation to share information gathered during questioning with anyone except:", options:["The property owner on any request","Law enforcement acting in an official capacity during a lawful investigation","MACCESS INC. only","BSIS upon annual renewal"], answer:1 },
      { module:"Suspicious Activity", ref:"BSIS Training Manual", q:"Which should NOT be documented as suspicious activity?", options:["A person photographing security cameras and access points","An unattended bag in an unusual location","A regular known employee entering through the main entrance","A vehicle circling the property multiple times"], answer:2 },
      { module:"Review", ref:"BPC §7583.6(b) | PPO", q:"MACCESS INC.'s California Private Patrol Operator license number is:", options:["#112233","#100001","#133445","#122729"], answer:3 },
    ],
  },

  Communication_Significance_BSIS_Skills_MACCESS_INC: {
    title:"Communication & Its Significance", subtitle:"BSIS Mandatory Skills Course — 4 Credit Hours",
    price:"39", hours:"4", bpcRef:"BPC §7583.6(b)", authority:"BPC §7583.6(b) | Title 16 CCR §643(b)",
    category:"Mandatory", badge:"BSIS MANDATORY",
    outcomes:["Apply internal radio and technology protocols correctly","Brief law enforcement and EMS with precision on arrival","Navigate external communications with city and government agencies","Use non-verbal communication to project professional authority","Maintain proper chain of command for all incidents","Complete within 6 months of guard card issuance"],
    modules:[
      { num:1, title:"Internal Communication Protocols", duration:"30 min", icon:"📡",
        slides:[
          { heading:"Internal Protocols — Chain of Command & Radio", subheading:"BSIS Training Manual | Post Orders | Technology",
            content:[
              { type:"bullets", items:["Know your chain of command before your first shift: lead guard → site supervisor → MACCESS INC. dispatch","Radio protocol: listen before transmitting — do not interrupt ongoing communications","Identify yourself on every transmission: '[Post/Name] to [Recipient]...' — keep it brief and professional","CCTV: log timestamps and camera IDs for any incident footage","Alarm systems: know each alarm type, required response, and reset authority","Access control: verify credentials for every person — never allow tailgating through secured doors","Technology failure: know the manual backup procedure for every system at your post"] },
              { type:"callout", label:"Log Everything", text:"Every contact must be logged: who, when, what was communicated, and the response. Verbal-only reports are insufficient." },
            ]},
          { heading:"Calling 911 & Briefing Law Enforcement", subheading:"911 Protocol | Law Enforcement Arrival",
            content:[
              { type:"stagelist", items:[
                { num:"1", label:"LOCATION FIRST", text:"Full address, building, floor, exact area — location before anything else", color:"#8B1A1A" },
                { num:"2", label:"NATURE OF EMERGENCY", text:"Crime in progress, medical, fire, active shooter — be specific", color:"#7B4500" },
                { num:"3", label:"PERSONS INVOLVED", text:"Number, location, suspect description, any weapons visible", color:"#1B2B5E" },
                { num:"4", label:"YOUR IDENTITY", text:"Your name and callback number — STAY ON THE LINE until dispatcher releases you", color:"#1A5C3A" },
              ]},
              { type:"rule", text:"When law enforcement arrives: hands visible at all times. Brief officers: situation, parties, hazards, actions taken. Transfer custody of any citizen's arrest subject immediately." },
            ]},
        ],
        quiz:[
          { q:"When placing a 911 call, the guard must provide which information FIRST?", options:["Their BSIS license number and PPO name","Location — full address, building, floor, and specific area","Only their name and company","A complete incident report summary"], answer:1 },
          { q:"Before transmitting on a radio, a guard should:", options:["Speak immediately — delays waste time","Listen to confirm the channel is clear, press PTT, wait one second, then speak","Announce their full name and location before every transmission","Contact dispatch for permission"], answer:1 },
        ],
      },
      { num:2, title:"External Communications & Non-Verbal Skills", duration:"30 min", icon:"🤝",
        slides:[
          { heading:"Medical Personnel, City Services & Government", subheading:"BSIS Training Manual | External Agency Protocols",
            content:[
              { type:"twocol",
                left:{ heading:"Medical Personnel (EMS)", items:["Call 911 immediately for any medical emergency — no delay","Clear path to the patient — move bystanders back","Brief EMS on scene: what you observed, time of onset, any known conditions","Limit patient information to only what responders need — confidentiality","If patient is also a detainee: notify police before EMS departs"] },
                right:{ heading:"City & Government Agencies", items:["Code enforcement: allow entry, notify property manager immediately, document visit","Fire department: execute evacuation plan, meet at command post","Utilities emergency (gas, water, power): call emergency line + 911, evacuate if directed","All government agency visits must be logged in your shift report","Media: no comments — refer all media inquiries to MACCESS INC. management"] }
              },
            ]},
          { heading:"Non-Verbal Communication & Professional Presence", subheading:"BSIS Training Manual | Body Language as a Security Tool",
            content:[
              { type:"bullets", items:["Posture: upright and alert — signals confidence and authority","Eye contact: professional, not aggressive staring — avoiding eye contact signals uncertainty","Hands: visible and open — closed fists or crossed arms signal aggression","Proximity: maintain appropriate distance — do not crowd","Tone of voice: calm, controlled, even — never match an agitated person's energy","Facial expression: neutral and professional — visible contempt escalates every situation","Announce movements in tense situations: 'I'm going to step back now'"] },
            ]},
        ],
        quiz:[
          { q:"When law enforcement arrives at a security incident, the guard should:", options:["Continue managing until officers formally request handoff","Present the written report before briefing verbally","Provide a brief accurate verbal briefing: situation, parties, hazards, actions taken","Step back entirely and have no further communication"], answer:2 },
          { q:"A guard discovers a strong odor of natural gas at their post. The correct immediate action is:", options:["Locate and attempt to seal the leak","Use the radio to report while investigating the source","Evacuate immediately without using any electrical switches or radio — call 911 from a safe distance","Document in the shift log and notify the property manager at next opportunity"], answer:2 },
        ],
      },
    ],
    exam:[
      { module:"Internal Communication", ref:"BSIS Training Manual", q:"Internal security communication protocols define:", options:["How guards communicate with the media","Who to contact, when to contact them, and which methods to use within the security operation","How to file BSIS license applications","The format of court testimony"], answer:1 },
      { module:"Radio Protocol", ref:"BSIS Training Manual", q:"A guard's radio communication should be:", options:["As comprehensive as possible to document everything","Casual and conversational to reduce tension","Clear, concise, and use established codes and protocols","Plain English only — BSIS prohibits codes"], answer:2 },
      { module:"911 Protocol", ref:"BSIS Training Manual | 911", q:"When placing a 911 call, the guard must provide which information first?", options:["Their BSIS license number and PPO name","Location — full address, building, floor, specific area","Only their name and company","A complete incident report before calling"], answer:1 },
      { module:"Law Enforcement", ref:"BSIS Training Manual | PC §847", q:"When transferring a citizen's arrest subject to law enforcement, the guard should communicate:", options:["Only the person's name — let police gather the rest","The reason for the arrest, observations made, and any evidence secured","Nothing until an attorney is present","Only information in the written incident report"], answer:1 },
      { module:"Law Enforcement", ref:"BSIS Training Manual", q:"A guard should NEVER communicate information about an ongoing police investigation to:", options:["Paramedics on scene","The person being investigated or their associates","The PPO supervisor","A second law enforcement officer on scene"], answer:1 },
      { module:"Medical Personnel", ref:"BSIS Training Manual", q:"When paramedics arrive at a scene, a security guard's role is to:", options:["Continue providing first aid alongside paramedics","Clear the area, brief paramedics on the situation, and stand by for instructions","Take over crowd control only — do not speak to medical personnel","Document the paramedics' actions in full detail"], answer:1 },
      { module:"City Services", ref:"BSIS Training Manual", q:"When a city code enforcement officer arrives to inspect the property, the guard should:", options:["Deny access until the property manager authorizes in writing","Allow access and immediately notify the property manager or supervisor","Accompany without notifying anyone","Request a certified copy of the inspection order first"], answer:1 },
      { module:"City Services", ref:"BSIS Training Manual", q:"A guard receives a noise ordinance complaint. The guard should:", options:["Issue a formal written warning to the alleged violating party","Immediately call code enforcement without speaking to anyone","Attempt internal resolution first, document, and escalate to authorities if unresolved","Decline to intervene — noise ordinances are outside security scope"], answer:2 },
      { module:"Non-Verbal", ref:"BSIS Training Manual", q:"A security guard's body language on post should convey:", options:["Physical dominance to deter potential threats","Professional alertness, calm confidence, and an approachable demeanor","Deliberate disengagement to reduce confrontations","Visible deference to reduce escalation risk"], answer:1 },
      { module:"Non-Verbal", ref:"BSIS Training Manual", q:"Non-verbal communication in security work primarily includes:", options:["Radio transmissions and written reports only","Body language, posture, eye contact, facial expression, and physical proximity","Hand signals in high-noise environments only","Written shift logs and CCTV footage"], answer:1 },
      { module:"Review", ref:"BPC §7583.6(b) | PPO", q:"MACCESS INC.'s California Private Patrol Operator license number is:", options:["#112233","#100001","#133445","#122729"], answer:3 },
    ],
  },

  Liability_Legal_Aspects_BSIS_Skills_MACCESS_INC: {
    title:"Liability & Legal Aspects", subtitle:"BSIS Mandatory Skills Course — 4 Credit Hours",
    price:"39", hours:"4", bpcRef:"BPC §7583.6(b)", authority:"BPC §7583.6(b) | PC §§236,242 | Title 16 CCR §643",
    category:"Mandatory", badge:"BSIS MANDATORY",
    outcomes:["Understand personal, contractor, and employer liability exposure","Distinguish criminal, civil, and administrative liability","Know all key BSIS statutes and their requirements by section number","Define the legal role of a security guard under BPC §7582.1","Apply Shopkeeper's Privilege correctly under PC §490.5","Complete within 6 months of guard card issuance"],
    modules:[
      { num:1, title:"Three Tiers of Liability", duration:"30 min", icon:"⚖️",
        slides:[
          { heading:"Personal, Contractor & Employer Liability", subheading:"Respondeat Superior | Negligent Hiring | PC §§236, 242",
            content:[
              { type:"typecards", items:[
                { label:"Personal (Guard)", text:"You are personally liable for your own wrongful acts — employer authorization does NOT shield personal liability for crimes or intentional torts. PC §242 Battery, PC §236 False Imprisonment, PC §207 Kidnapping.", color:"#8B1A1A" },
                { label:"Contractor (MACCESS INC.)", text:"MACCESS INC. as PPO may be vicariously liable under respondeat superior for acts within scope of employment. Negligent hiring (failure to vet) and negligent training create additional exposure.", color:"#1B2B5E" },
                { label:"Property Owner / Client", text:"Client may share liability if they directed the guard's actions or failed to maintain safe conditions. Contractual indemnification clauses typically shift liability back to the PPO.", color:"#005C5C" },
              ]},
            ]},
          { heading:"Criminal, Civil & Administrative Liability", subheading:"PC §§236, 242, 207 | BPC §480 | Title 16 CCR",
            content:[
              { type:"twocol",
                left:{ heading:"Criminal & Civil", items:["PC §242 Battery: willful unlawful use of force on another person","PC §240 Assault: unlawful attempt to commit violent injury","PC §236 False Imprisonment: unlawful restraint","PC §207 Kidnapping: forcibly moving a person","PC §538d Impersonating a peace officer — criminal + BSIS revocation","Civil: compensatory + punitive damages, ADA/FEHA violations"] },
                right:{ heading:"Administrative (BSIS)", items:["Guard card suspension or revocation — BPC §480","Civil penalties under Title 16 CCR","PPO license discipline for negligent training or hiring","Mandatory incident reporting — BPC §7583.2","All three types can arise simultaneously from a single incident","BSIS may audit records at any time — maintain all documentation"] }
              },
            ]},
        ],
        quiz:[
          { q:"A PPO that fails to conduct required background checks before hiring a guard may face liability for:", options:["False imprisonment only","Negligent hiring if the guard causes harm the check would have predicted","Statutory violations only — no civil liability","BSIS administrative penalties only"], answer:1 },
          { q:"'Respondeat superior' establishes that:", options:["Guards are personally liable for all use-of-force incidents","Employers may be vicariously liable for wrongful acts by employees acting within scope of employment","Property owners are responsible for all incidents on their premises","BSIS bears liability for improperly trained guards"], answer:1 },
        ],
      },
      { num:2, title:"BSIS Regulations & Guard's Legal Role", duration:"30 min", icon:"📋",
        slides:[
          { heading:"Key BSIS Statutes — What You Must Know", subheading:"BPC §7583 et seq. | Title 16 CCR | SB 652",
            content:[
              { type:"bullets", items:["BPC §7583.6: Training requirements — 8 hrs PTA/AUF pre-registration; 32 hrs skills within 6 months; 8 hrs annual CE","BPC §7583.7: PTA and AUF — 100% exam score required. Single provider per SB 652 (eff. Jan 1, 2026)","BPC §7583.9: Criminal history background check — DOJ + FBI via Live Scan required for all applicants","BPC §7583.20: Guard card renewal — must renew within 60 days of expiration or registration is canceled ($44 fee)","BPC §480: Grounds for denial/revocation — certain criminal convictions disqualify applicants","Title 16 CCR §643(b): Certificate requirements — provider name, BSIS license number, course name, dates, hours, serial number"] },
            ]},
          { heading:"The Legal Role of a Security Guard", subheading:"BPC §7582.1 | PC §837 | PC §490.5",
            content:[
              { type:"twocol",
                left:{ heading:"What Guards CAN Do", items:["Protect persons and property on assigned post (BPC §7582.1)","Make citizen's arrests under PC §837 when lawful conditions are met","Detain shoplifting suspects under PC §490.5 with probable cause from personal observation","Use reasonable proportionate force during lawful citizen's arrest","Observe and document incidents for law enforcement"] },
                right:{ heading:"What Guards CANNOT Do", items:["Claim or imply peace officer authority — PC §538d (criminal)","Conduct searches beyond safety pat-down during lawful detention","Compel answers to questions","Hold a citizen's arrest subject longer than necessary before delivering to police","Act outside their assigned post or off-duty","Annual CE: 8 hours/year including 2 hours AUF review — required for license maintenance"] }
              },
            ]},
        ],
        quiz:[
          { q:"Under BPC §7582.1, a security guard is employed to:", options:["Enforce municipal laws and ordinances","Arrest persons suspected of crimes on public property","Protect persons or property or prevent theft for a licensed PPO","Conduct criminal investigations for law enforcement"], answer:2 },
          { q:"A security guard's registration is valid for how long before renewal is required?", options:["1 year","2 years","3 years","5 years"], answer:1 },
        ],
      },
    ],
    exam:[
      { module:"Personal Liability", ref:"PC §236 | Tort Law", q:"Personal liability for a security guard arises when the guard:", options:["Follows post orders accurately","Acts within their authorized scope","Commits a wrongful act that causes harm to another person","Reports a safety hazard to their supervisor"], answer:2 },
      { module:"Respondeat Superior", ref:"Respondeat Superior", q:"'Respondeat superior' establishes that:", options:["Guards are personally liable for all use-of-force incidents","Employers may be vicariously liable for employee wrongful acts within scope of employment","Property owners are responsible for all security incidents on their premises","BSIS bears liability for improperly trained guards"], answer:1 },
      { module:"Criminal Liability", ref:"PC §242", q:"Battery under California Penal Code §242 is defined as:", options:["A threat to commit violence","Any willful and unlawful use of force or violence upon the person of another","Excessive use of force during a lawful arrest","Unlawful restraint of a person's physical movement"], answer:1 },
      { module:"Criminal Liability", ref:"PC §538d", q:"A guard who represents themselves as a police officer violates:", options:["BPC §7583.6 only","PC §538d — a criminal offense","Title 16 CCR §643 only","BPC §480 only"], answer:1 },
      { module:"Administrative Liability", ref:"BPC §480", q:"BSIS administrative liability can result in all of the following EXCEPT:", options:["Suspension of the guard card","Revocation of the guard card","A civil judgment for damages awarded to the injured party","Assessment of civil penalties against the guard or PPO"], answer:2 },
      { module:"BSIS Regulations", ref:"BPC §7583.6", q:"The required annual continuing education for a registered security guard is:", options:["4 hours","6 hours","8 hours — including 2 hours AUF review","16 hours"], answer:2 },
      { module:"BSIS Regulations", ref:"BPC §7583.9", q:"A California guard card is valid for how long before renewal is required?", options:["1 year","2 years","3 years","5 years"], answer:1 },
      { module:"BSIS Regulations", ref:"BPC §7583.20", q:"A guard card may be renewed with a delinquency fee within how many days of expiration?", options:["30 days","60 days","90 days","120 days"], answer:1 },
      { module:"BSIS Regulations", ref:"Title 16 CCR §643(b)", q:"Which is required to appear on a valid BSIS Certificate of Completion?", options:["The guard's residential address","Provider name, BSIS license number, course name, dates, hours, and a unique serial number","The property owner's authorization signature","The guard's Social Security Number"], answer:1 },
      { module:"Guard's Legal Role", ref:"BPC §7582.1", q:"Under BPC §7582.1, a security guard is employed to:", options:["Enforce municipal laws and ordinances","Arrest persons suspected of crimes on public property","Protect persons or property or prevent theft for a licensed PPO","Conduct criminal investigations for law enforcement"], answer:2 },
      { module:"Shopkeeper's Privilege", ref:"PC §490.5", q:"Under PC §490.5, a guard may detain a shoplifting suspect when:", options:["A manager reports the theft","The guard has probable cause based on their own direct personal observation","The loss prevention system flags the person","Any store employee reports the theft"], answer:1 },
      { module:"Review", ref:"BPC §7583.6(b) | PPO", q:"MACCESS INC.'s California Private Patrol Operator license number is:", options:["#112233","#100001","#133445","#122729"], answer:3 },
    ],
  },

  Baton_Certification_BSIS_MACCESS_INC: {
    title:"Baton Certification", subtitle:"BSIS Elective Skills Course — 4 Credit Hours",
    price:"59", hours:"4", bpcRef:"BPC §§7583.33 | 7585.9 | 7585.13", authority:"BPC §§7583.33 | 7585.9 | PC §22001",
    category:"Elective", badge:"BSIS APPROVED",
    outcomes:["Understand all legal requirements for baton carry under BPC §7583.33 and PC §22001","Identify all four authorized baton types for California security guards","Name all seven vital areas that must be avoided — exam requirement","Understand criminal, civil, and employer liability for baton use","Apply the force continuum correctly with baton-level force","Comply with BSIS reporting requirements for every baton deployment"],
    modules:[
      { num:1, title:"Legal Basis, Liability & Permit Requirements", duration:"30 min", icon:"⚖️",
        slides:[
          { heading:"Who May Carry a Baton in California", subheading:"BPC §7583.33 | PC §22001 | Permit Requirements",
            content:[
              { type:"alert", text:"PC §22001: Carrying a baton without a BSIS Baton Permit is a FELONY. BPC §7583.33 requires every guard who carries a baton on duty to hold BOTH a valid guard card AND a valid BSIS Baton Permit." },
              { type:"bullets", items:["Baton permit expires every 2 years — renewal requires an 8-hour refresher course","Off-duty: you may NOT carry a baton — the permit is for on-duty carry only","A firearms permit does NOT authorize baton carry — separate permit required","Baton permits are issued ONLY by BSIS-certified Baton Training Facilities (TFB license)","PPO that allows a guard to carry without a permit may be fined by BSIS","MACCESS INC. must verify each guard's permit before any baton-authorized assignment"] },
              { type:"rule", text:"The baton is a DEFENSIVE tool — to protect yourself and others. Using it offensively as a weapon or for intimidation is a crime." },
            ]},
          { heading:"Criminal, Civil & Vicarious Liability", subheading:"PC §§242, 245 | BPC §7585.19 | Respondeat Superior",
            content:[
              { type:"typecards", items:[
                { label:"Criminal", text:"PC §242 Battery, PC §245 Assault with deadly weapon (baton qualifies), PC §22001 carrying without permit (felony). Criminal prosecution is independent of civil suits.", color:"#8B1A1A" },
                { label:"Civil", text:"Excessive force tort — compensatory and punitive damages. Wrongful death if baton use results in death. Intentional infliction of emotional distress.", color:"#7B4500" },
                { label:"PPO (MACCESS INC.)", text:"Vicariously liable for guard's actions in scope of employment. Negligent hiring (not verifying permit) and negligent training create additional exposure. BPC §7585.19: $100–$1,000 fines per violation.", color:"#1B2B5E" },
              ]},
            ]},
        ],
        quiz:[
          { q:"A guard who carries a baton without a BSIS Baton Permit may be charged with:", options:["A misdemeanor and $100 fine","A felony violation of PC §22001","Only a BSIS administrative penalty","Nothing — the guard card is sufficient authorization"], answer:1 },
          { q:"The baton is defined under California law as:", options:["An offensive weapon","A defensive tool — to protect yourself and others","A less-lethal firearm alternative","Standard security guard equipment authorized by the guard card"], answer:1 },
        ],
      },
      { num:2, title:"Baton Types, Vital Areas & Force Continuum", duration:"30 min", icon:"🔩",
        slides:[
          { heading:"Baton Types & Vital Areas", subheading:"BSIS Baton Manual Ch. 3 & 5 | Authorized Types for California Guards",
            content:[
              { type:"h3", text:"Four Authorized Baton Types" },
              { type:"bullets", items:["Straight Baton: single-grip straight, 22-26 inches, solid or hollow. Ring carrier required.","Straight Expandable (ASP): telescoping — collapses for carry, expands on deployment. Holster required.","Side-Handle Baton (PR-24): T-shaped — perpendicular handle allows blocking techniques. Side-handle ring required.","Side-Handle Expandable: combines side-handle blocking with compact expandable design.","Guards may only carry the type for which they were trained. Switching types requires additional training."] },
              { type:"alert", text:"VITAL AREAS — PROHIBITED STRIKE ZONES (unless facing imminent death or serious bodily injury): A-Head | B-Throat/Neck | C-Spine | D-Kidneys | E-Groin | F-Sternum/Solar Plexus | G-Knees. All 7 must be correctly named on the permit exam." },
            ]},
          { heading:"Force Continuum with Baton & Authorized Target Areas", subheading:"BSIS Baton Manual Ch. 2 & 5 | Proportionality",
            content:[
              { type:"bullets", items:["Baton use is justified ONLY at active aggression level or above — always exhaust verbal and soft control first","Authorized target areas: common peroneal nerve (outer thigh/knee), radial nerve (outer forearm), inner thigh, upper arms, calf/lower leg","Baton use must stop immediately when the threat stops — continuing after submission is excessive force and criminal","Every deployment of the baton — even if no contact is made — must be reported in writing within 1 hour","Call 911 immediately for ANY baton contact resulting in visible injury or loss of consciousness"] },
              { type:"callout", label:"Exam Requirement", text:"BSIS Baton Written Exam: 24 questions, pass ≥ 20/24 AND correctly identify all 7 vital areas. Both components required. Issued only by BSIS-certified Baton Training Facility (TFB)." },
            ]},
        ],
        quiz:[
          { q:"During a non-life-threatening situation, the baton should NOT be used to strike above the:", options:["Waist","Shoulders","Groin","Knees"], answer:1 },
          { q:"The BSIS Baton Written Exam passing requirement is:", options:["100% on all 24 questions","At least 20/24 AND correctly identify all 7 vital areas","At least 20/24 — vital areas identification is optional","At least 18/24"], answer:1 },
        ],
      },
    ],
    exam:[
      { module:"Legal Requirements", ref:"BPC §7583.33 | PC §22001", q:"A guard who carries a baton without a BSIS Baton Permit may be:", options:["Fined $100 by BSIS only","Charged with a felony violation of PC §22001","Charged with a misdemeanor and given a warning","Nothing — the guard card is sufficient"], answer:1 },
      { module:"Legal Requirements", ref:"BPC §7583.33", q:"When you are not on duty, you may carry your baton as long as you have your baton permit with you.", options:["True","False"], answer:1 },
      { module:"Legal Requirements", ref:"BPC §7583.33", q:"A firearms permit authorizes baton carry on duty.", options:["True","False"], answer:1 },
      { module:"Moral Responsibility", ref:"BSIS Baton Manual", q:"The baton is an offensive weapon.", options:["True","False"], answer:1 },
      { module:"Force — Target Areas", ref:"BSIS Baton Manual Ch. 5", q:"During a non-life-threatening situation, the baton should NOT be used to strike above the:", options:["Waist","Shoulders","Groin","Knees"], answer:1 },
      { module:"Vital Areas", ref:"BSIS Baton Manual Ch. 5", q:"A baton strike to the head, throat, or spine:", options:["Is usually fatal","Could be fatal","Always causes paralysis","Is always fatal"], answer:1 },
      { module:"Vital Areas", ref:"BSIS Baton Manual Ch. 5", q:"The head, spine, and kidneys are vital areas to be avoided unless there is a deadly attack on you or another person.", options:["True","False"], answer:0 },
      { module:"Liability", ref:"BPC §7585.19", q:"If MACCESS INC. allows a guard to carry a baton before completing training and receiving a permit, the company may be fined by BSIS:", options:["$100","$300","$2,500","Nothing — the PPO's license is automatically revoked"], answer:2 },
      { module:"De-escalation", ref:"BSIS Baton Manual Ch. 2", q:"When first confronted with a situation that could escalate, you should first:", options:["Arrest the suspect without getting hurt","Look for a telephone to call for help","Remain calm and attempt to control the situation verbally","Find a witness before taking any action"], answer:2 },
      { module:"Off-Duty Carry", ref:"BPC §7583.33", q:"When you are off duty, you may NOT carry a baton even if you have your permit.", options:["True","False"], answer:0 },
      { module:"Use of Force Decision", ref:"BSIS Baton Manual Ch. 2", q:"Which factor would you NOT consider when deciding whether to use your baton?", options:["Size of the subject","Whether the subject may be under the influence of drugs","Whether you will have to write a report","Whether the subject is armed"], answer:2 },
      { module:"Battery", ref:"PC §242", q:"Battery is any willful and unlawful use of force or violence upon another person.", options:["True","False"], answer:0 },
      { module:"Deadly Force", ref:"BSIS Baton Manual Ch. 2", q:"If someone trespasses onto property you are protecting, you would be justified in using deadly force.", options:["True","False"], answer:1 },
      { module:"Reporting", ref:"BPC §7583.2", q:"If you are arrested after using your baton in a physical altercation, your employer must report the incident to BSIS within seven days.", options:["True","False"], answer:0 },
      { module:"Review", ref:"BPC §§7583.33 | 7585.13 | PPO", q:"MACCESS INC.'s California Private Patrol Operator license number is:", options:["#112233","#100001","#133445","#122729"], answer:3 },
    ],
  },


  Officer_Safety_BSIS_Skills_MACCESS_INC: {
    title:"Officer Safety", subtitle:"BSIS Elective Skills Course — 4 Credit Hours",
    price:"39", hours:"4", bpcRef:"BPC §7583.6(b)", authority:"BPC §7583.6(b) | OSHA 29 CFR 1910.1030 | Cal/OSHA",
    category:"Elective", badge:"BSIS APPROVED",
    outcomes:["Apply the Cooper Color Code situational awareness system on post","Approach unknown subjects safely with correct distance and positioning","Distinguish cover from concealment and use each appropriately","Follow blood-borne pathogen precautions under OSHA 29 CFR 1910.1030","Identify environmental and hazardous material hazards and respond correctly","Recognize pre-incident threat indicators before an event occurs"],
    modules:[
      { num:1, title:"Threat Assessment & Safe Subject Contact", duration:"35 min", icon:"👁️",
        slides:[
          { heading:"Situational Awareness — Cooper Color Code", subheading:"BSIS Syllabus §4.1 | Threat Assessment",
            content:[
              { type:"typecards", items:[
                { label:"WHITE — Unaware", text:"Relaxed, unprepared, oblivious to surroundings. NEVER appropriate on duty.", color:"#A0AEC0" },
                { label:"YELLOW — Relaxed Alert", text:"Baseline for all on-duty guards. Aware of surroundings without fixating on any specific threat. Safe default.", color:"#1A5C3A" },
                { label:"ORANGE — Focused Alert", text:"A specific person or situation has been identified as a potential threat. Watch and assess — prepare to act.", color:"#7B4500" },
                { label:"RED — Ready to Act", text:"Threat confirmed. Response initiated. Act decisively with your training.", color:"#8B1A1A" },
              ]},
              { type:"bullets", items:["Pre-incident threat indicators: photographing security cameras, testing locked doors, loitering without purpose, vehicles circling property","Most important initial observation: a subject's HANDS — hands are where threats originate","Trust your trained instincts — document and report before a threat materializes","Contact your supervisor or 911 based on threat level — do not underreact or over-commit"] },
            ]},
          { heading:"Safe Subject Contact — Approach & Positioning", subheading:"BSIS Syllabus §4.2 | Subject Contact Procedures",
            content:[
              { type:"bullets", items:["Maintain reactionary gap: 6-10 feet from unknown or agitated subjects","Approach at 45-degree angle — reduces your target profile and improves reactionary options","Announce yourself clearly: 'MACCESS INC. Security — may I speak with you?'","Never approach a potentially hostile subject without a means of communication and a clear exit","Tactical L positioning: two guards should never align in a straight line — reduces dual exposure to a single threat","COVER stops projectiles (car engine block, concrete wall). CONCEALMENT hides you from view but does NOT stop projectiles.","Re-holster / stand down only after the threat has fully resolved — keep eyes on subject"] },
            ]},
        ],
        quiz:[
          { q:"The baseline level of situational awareness a guard should maintain at all times on duty is:", options:["White — relaxed and at ease","Yellow — relaxed alertness, aware of surroundings without fixating on a specific threat","Orange — focused attention on a specific identified threat","Red — prepared to immediately take action"], answer:1 },
          { q:"The critical distinction between cover and concealment is that:", options:["Cover hides you from view but does not stop projectiles; concealment provides ballistic protection","Concealment hides you from view but does not stop projectiles; cover provides a barrier that can stop projectiles","Cover and concealment are functionally identical","Cover applies only to firearms threats; concealment is effective against all other threats"], answer:1 },
        ],
      },
      { num:2, title:"Blood-Borne Pathogens & Environmental Hazards", duration:"25 min", icon:"🧤",
        slides:[
          { heading:"Blood-Borne Pathogens — OSHA 29 CFR 1910.1030", subheading:"BSIS Syllabus §4.4 | BBP Precautions | MACCESS INC. Policy",
            content:[
              { type:"alert", text:"OSHA 29 CFR 1910.1030: Assume ALL blood and body fluids from any person may be infectious — HIV, Hepatitis B, Hepatitis C, and others. Standard precautions apply universally." },
              { type:"bullets", items:["Minimum PPE before any contact with blood or body fluids: disposable gloves — always","Do not touch eyes, nose, or mouth until hands are washed with soap and water","If exposed: wash area immediately with soap and water, notify supervisor, seek prompt medical evaluation","MACCESS INC. is required to provide BBP training and PPE at no cost to guards","Avoid touching any blood-stained materials without gloves — even dried blood can be infectious","Document all BBP exposure incidents immediately — OSHA recordkeeping required"] },
            ]},
          { heading:"Environmental & Hazardous Materials Hazards", subheading:"BSIS Syllabus §4.5 | Cal/OSHA | OSHA",
            content:[
              { type:"stagelist", items:[
                { num:"1", label:"GAS ODOR", text:"Do NOT use radio or any electrical switches — evacuate immediately and call 911 from a safe distance", color:"#8B1A1A" },
                { num:"2", label:"CHEMICAL SPILL", text:"Do not enter without proper PPE and training — isolate the area, call 911 HazMat", color:"#7B4500" },
                { num:"3", label:"SUSPICIOUS SUBSTANCE", text:"Do not touch — isolate the area, keep others away, call 911 immediately", color:"#1B2B5E" },
                { num:"4", label:"POWER OUTAGE", text:"Know manual backup procedures for every system at your post before your first shift", color:"#005C5C" },
              ]},
              { type:"rule", text:"Know the location of every Safety Data Sheet (SDS/MSDS) for chemicals at your post. Cal/OSHA requires guards to report workplace hazards they observe." },
            ]},
        ],
        quiz:[
          { q:"Under OSHA blood-borne pathogen standards, a guard must assume that:", options:["Only visibly blood-stained materials pose a transmission risk","All blood and body fluids from any person may be infectious — standard precautions apply universally","Gloves are only required when direct contact with blood is likely","HIV is the only blood-borne pathogen of practical concern in security work"], answer:1 },
          { q:"A guard detects a strong odor of natural gas at their post. The correct immediate action is:", options:["Locate the source and attempt to seal it","Use the radio to report the odor while investigating","Evacuate immediately without using any electrical switches or radio — call 911 from a safe distance","Document in the shift log and notify the property manager at the next opportunity"], answer:2 },
        ],
      },
    ],
    exam:[
      { module:"Threat Assessment", ref:"Situational Awareness | Cooper Color Code", q:"The baseline situational awareness level for all on-duty guards is:", options:["White — relaxed and unaware","Yellow — relaxed alertness with environmental awareness","Orange — focused on a specific potential threat","Red — prepared to immediately take action"], answer:1 },
      { module:"Threat Assessment", ref:"Pre-Incident Indicators", q:"Observable pre-incident threat indicators include:", options:["Wearing weather-appropriate clothing","Entering through the main public entrance without stopping","Photographing security cameras and documenting guard patrol patterns","Proceeding directly to a destination without hesitation"], answer:2 },
      { module:"Subject Contact", ref:"BSIS Training Manual", q:"The recommended distance a guard should maintain from an unknown subject during initial contact is:", options:["1-2 feet — close enough to maintain physical control","6-10 feet — a reactionary gap that provides time to respond","15 or more feet — maximum distance to minimize risk","At the guard's discretion based on intuition"], answer:1 },
      { module:"Subject Contact", ref:"BSIS Training Manual", q:"The critical distinction between cover and concealment is:", options:["Cover hides you from view; concealment stops projectiles","Concealment hides you from view but does not stop projectiles; cover can stop projectiles","Cover and concealment are functionally identical","Cover applies only to firearms threats"], answer:1 },
      { module:"Subject Contact", ref:"BSIS Training Manual", q:"The most important initial indicator to observe when approaching an unknown subject is:", options:["The subject's facial expression and emotional state","The subject's hands — hands are the primary source of potential threats","The subject's clothing style and appearance","The subject's race and gender"], answer:1 },
      { module:"Blood-Borne Pathogens", ref:"OSHA 29 CFR 1910.1030", q:"Under OSHA blood-borne pathogen standards, a guard must assume:", options:["Only visibly blood-stained materials pose a transmission risk","All blood and body fluids from any person may be infectious","Gloves are only required when contact with blood is likely","HIV is the only BBP of concern in security work"], answer:1 },
      { module:"Blood-Borne Pathogens", ref:"OSHA 29 CFR 1910.1030", q:"The minimum PPE a guard must use before any contact with blood or body fluids is:", options:["A full-face shield and protective gown","Disposable gloves","Safety glasses only","No PPE required unless blood is confirmed infectious"], answer:1 },
      { module:"Blood-Borne Pathogens", ref:"OSHA | Cal/OSHA", q:"If a guard is exposed to blood during an incident, they should immediately:", options:["Complete the incident report and note the exposure as a footnote","Wait until end of shift to report to their supervisor","Wash the affected area thoroughly with soap and water, notify supervisor, and seek prompt medical evaluation","Disinfect with hand sanitizer and continue the shift"], answer:2 },
      { module:"Environmental Hazards", ref:"Cal/OSHA", q:"A guard detects a strong odor of natural gas at their post. The correct immediate action is:", options:["Locate the source and attempt to seal it","Use the radio to report while investigating","Evacuate immediately without using any electrical switches or radio — call 911 from a safe distance","Document in the shift log and notify the property manager at the next opportunity"], answer:2 },
      { module:"Safety Awareness", ref:"BSIS Training Manual", q:"Before beginning any shift, a security guard should:", options:["Arrive at the post and begin patrol immediately","Complete a pre-shift check of all assigned equipment and confirm radio communication functionality","Wait for the outgoing guard to complete a full briefing","Review only the written post orders — verbal briefings are not required"], answer:1 },
      { module:"Review", ref:"BPC §7583.6(b) | PPO", q:"MACCESS INC.'s California Private Patrol Operator license number is:", options:["#112233","#100001","#133445","#122729"], answer:3 },
    ],
  },

  Handling_Difficult_People_BSIS_Skills_MACCESS_INC: {
    title:"Handling Difficult People", subtitle:"BSIS Elective Skills Course — 4 Credit Hours",
    price:"39", hours:"4", bpcRef:"BPC §7583.6(b)", authority:"BPC §7583.6(b) | Title 16 CCR §643(b)",
    category:"Elective", badge:"BSIS APPROVED",
    outcomes:["Apply communication strategies that defuse hostile interactions before escalation","Navigate all five stages of conflict escalation with targeted interventions","Negotiate peacefully without making unauthorized concessions","Use verbal diffusion techniques modeled by field-tested security professionals","Value cultural diversity as a de-escalation asset","Document all difficult person contacts for legal protection"],
    modules:[
      { num:1, title:"Communication Strategies & Conflict Management", duration:"30 min", icon:"🗣️",
        slides:[
          { heading:"Communication Strategies with Difficult Individuals", subheading:"BSIS Syllabus §10.1 | De-escalation Through Communication",
            content:[
              { type:"bullets", items:[
                "Separate the person from the problem — address the behavior, not their character or identity",
                "Lead with empathy: 'I understand this is frustrating' — disarms defensiveness before issuing directives",
                "Use 'I' statements: 'I need you to lower your voice' vs. 'You are being disruptive' — reduces adversarial framing",
                "Let difficult people vent briefly — interrupting increases hostility; a short controlled vent reduces it",
                "Paraphrase what you heard: 'What I hear you saying is...' — confirms understanding and reduces misunderstanding",
                "Watch for underlying needs: anger often masks fear, humiliation, or helplessness — address the need, not the behavior",
                "Never argue about who is 'right' — focus on the next step forward, not the grievance",
              ]},
            ]},
          { heading:"Stages of Conflict Escalation", subheading:"BSIS Syllabus §10.2 | Intervene Early",
            content:[
              { type:"stagelist", items:[
                { num:"1", label:"POTENTIAL", text:"Tension exists but conflict has not erupted. BEST time to intervene — easiest resolution available.", color:"#1A5C3A" },
                { num:"2", label:"PERCEIVED", text:"Parties believe conflict exists. Clarify misunderstandings before emotions rise.", color:"#1B4A8A" },
                { num:"3", label:"FELT", text:"Emotional — hostility rising. Active listening and empathy required. De-escalation must be active.", color:"#7B4500" },
                { num:"4", label:"MANIFEST", text:"Open conflict. Requires structured intervention. Consider requesting backup.", color:"#8B1A1A" },
                { num:"5", label:"AFTERMATH", text:"Conflict subsided. Document, follow up through proper channels, debrief.", color:"#005C5C" },
              ]},
              { type:"rule", text:"Every minute you intervene earlier in the escalation cycle reduces the need for force by an order of magnitude. Intervene at Potential or Perceived every time." },
            ]},
        ],
        quiz:[
          { q:"The earliest and most effective stage to intervene in a conflict escalation cycle is:", options:["Manifest — when open conflict has erupted","Felt — when emotions have heightened","Perceived — when parties believe conflict exists","Potential — when tension is present but conflict has not yet developed"], answer:3 },
          { q:"Which communication approach leads with empathy before issuing directives?", options:["'Stop that behavior immediately or there will be consequences.'","'I understand this is frustrating. Here is what I can do to help resolve this.'","'You always cause problems at this location.'","'I am not going to discuss this further until you calm down.'"], answer:1 },
        ],
      },
      { num:2, title:"Diversity, Negotiation & Verbal Diffusion", duration:"30 min", icon:"🤝",
        slides:[
          { heading:"Valuing Diversity & Negotiating Peaceful Outcomes", subheading:"BSIS Syllabus §10.4 & 10.5 | FEHA",
            content:[
              { type:"twocol",
                left:{ heading:"Valuing Diversity in Conflict", items:["Cultural norms: some cultures express disagreement loudly — loudness alone is not a threat indicator","Language barriers: slow down, simplify, seek interpreter or translation tool — never assume non-cooperation","Age: older persons may respond differently to authority — adjust tone accordingly","Disability: behavioral differences may not indicate hostility — assess context before responding","Apply identical standards to every person regardless of background — FEHA requires this"] },
                right:{ heading:"Basic Negotiation", items:["Find common ground: 'We both want this to be resolved calmly' — reframes from adversarial to collaborative","Offer choices: 'You can wait calmly, or I will need to ask you to leave' — giving choices reduces resistance","Know your limits: you cannot negotiate away post orders or the law","When negotiation fails: escalate to supervisor — never make unauthorized concessions","Follow through: empty threats permanently destroy your credibility with future difficult encounters"] }
              },
            ]},
          { heading:"Verbal Diffusion Techniques", subheading:"BSIS Syllabus §10.6 | When Talking Fails",
            content:[
              { type:"bullets", items:["Lower your own voice when they raise theirs — people unconsciously mirror the tone of those they speak with","Name the emotion: 'It sounds like you are really frustrated right now' — demonstrates the person is being heard","Redirect: 'Let's focus on how we can fix this' — moves from the past grievance to the future solution","Strategic agreement: agree on minor points to reduce overall tension before addressing the main issue","Create distance: if verbal diffusion is not working, step back, change location, reduce environmental stimuli","Request backup: do not handle escalating situations alone — call for support before force becomes necessary","Document: record all verbal diffusion attempts in the incident report — protects you legally if force is later needed"] },
              { type:"callout", label:"When Verbal Diffusion Has Failed", text:"Recognize the point of no return. Disengage without capitulating: 'I am going to give you a moment to think about this.' Create distance. Request backup. Establish a perimeter. Do not continue verbal engagement that is escalating the situation." },
            ]},
        ],
        quiz:[
          { q:"When a guard deliberately lowers their own voice in response to an agitated person speaking loudly, the intended effect is:", options:["To signal to the person that the guard is also becoming agitated","To demonstrate professional control to bystanders","To model calm behavior — people often unconsciously mirror the tone and volume of those they speak with","To reduce the chance of a third party overhearing the exchange"], answer:2 },
          { q:"A guard is negotiating with a difficult person who demands an exception to a clearly stated post rule. The guard's response should be:", options:["Grant the exception to restore peace","Make the exception if the person seems reasonable","Explain that the post rule cannot be negotiated — and offer to escalate to a supervisor who may be able to assist","Threaten consequences and repeat the rule until the person complies"], answer:2 },
        ],
      },
    ],
    exam:[
      { module:"Communication", ref:"BSIS Syllabus §10.1", q:"The most effective opening strategy when approaching a difficult or uncooperative person is to:", options:["Immediately establish authority by stating consequences of continued non-compliance","Lead with empathy — acknowledge the situation before giving directives","State the policy violation clearly and firmly","Step back and allow the person to resolve their own situation independently"], answer:1 },
      { module:"Communication", ref:"BSIS Syllabus §10.1", q:"Using 'I' statements in a difficult interaction is preferable because:", options:["'I' statements are more legally defensible","'I' statements express personal responsibility without creating an adversarial framing","'I' statements are always more authoritative","'I' statements are required by BSIS protocol"], answer:1 },
      { module:"Communication", ref:"BSIS Syllabus §10.1", q:"Allowing a difficult person to vent briefly before responding is effective because:", options:["It is passive disengagement to reduce tension","A short controlled vent reduces hostility — interrupting increases it","It is a BSIS-mandated conflict resolution protocol","It lets the guard formulate their response without interruption"], answer:1 },
      { module:"Conflict Management", ref:"BSIS Syllabus §10.2", q:"The earliest and most effective stage to intervene in the escalation cycle is:", options:["Manifest — when open conflict has erupted","Felt — when emotions have heightened","Perceived — when parties believe conflict exists","Potential — when tension is present but conflict has not yet developed"], answer:3 },
      { module:"Conflict Management", ref:"BSIS Syllabus §10.2", q:"Following through on stated consequences is critical because:", options:["It satisfies BSIS documentation requirements","Empty threats permanently destroy the guard's credibility and make future escalations more likely","It creates a legal record that fair warning was given before taking action","Following through is not always necessary — situational judgment allows flexibility"], answer:1 },
      { module:"Conflict Management", ref:"BSIS Syllabus §10.2", q:"Which statement best reflects effective constructive speaking during a conflict interaction?", options:["'You always cause problems at this location — this is not the first time.'","'If you do not stop right now I will be forced to take immediate action against you.'","'I understand this is frustrating. Here is what I can do to help resolve this.'","'I am not going to discuss this until you calm yourself down completely.'"], answer:2 },
      { module:"Diversity", ref:"BSIS Syllabus §10.4 | FEHA", q:"A guard observes a person expressing disagreement loudly in what appears to be a cultural norm from their background. The guard should:", options:["Treat the loud speech as an immediate threat indicator","Recognize that loudness alone may not indicate hostility or danger — observe for actual threatening behaviors","Apply the same threat response as for any other loud confrontation","Contact law enforcement immediately"], answer:1 },
      { module:"Diversity", ref:"BSIS Syllabus §10.4 | FEHA", q:"When a language barrier creates difficulty during a conflict interaction, the recommended approach is:", options:["Speak more loudly and repeat commands with greater firmness","Immediately call law enforcement — language barriers make security contact unsafe","Slow down, use simpler language, and seek an interpreter or translation tool","Assume non-cooperation and document as a refusal to comply"], answer:2 },
      { module:"Negotiation", ref:"BSIS Syllabus §10.5", q:"A guard finds common ground with a difficult person — 'We both want this to be resolved calmly.' This technique is called:", options:["Collaborative framing — reorienting from adversarial to cooperative","Tactical deception — legally questionable","Operational capitulation — surrendering ground for compliance","Position bargaining — exchanging concessions"], answer:0 },
      { module:"Negotiation", ref:"BSIS Syllabus §10.5", q:"A guard is negotiating with a difficult person who demands an exception to a post rule. The guard should:", options:["Grant the exception to restore peace","Make the exception if the person seems reasonable and compliant","Explain the rule cannot be negotiated — offer to escalate to a supervisor who may be able to assist","Threaten consequences and repeat the rule until the person complies"], answer:2 },
      { module:"Verbal Diffusion", ref:"BSIS Syllabus §10.6", q:"When a guard deliberately lowers their own voice in response to an agitated person, the intended effect is:", options:["To signal the guard is also becoming agitated","To demonstrate professional control to bystanders","To model calm behavior — people often unconsciously mirror the tone and volume of those they speak with","To reduce the chance of a third party overhearing"], answer:2 },
      { module:"Review", ref:"BPC §7583.6(b) | PPO", q:"MACCESS INC.'s California Private Patrol Operator license number is:", options:["#112233","#100001","#133445","#122729"], answer:3 },
    ],
  },


};

// ═══════════════════════════════════════════════════════════════════════════════
// HTML RENDERER — builds the complete course platform page
// ═══════════════════════════════════════════════════════════════════════════════
function renderContent(items) {
  return items.map(item => {
    switch(item.type) {
      case 'h3':
        return `<h3 class="sect-h3">${item.text}</h3>`;
      case 'alert':
        return `<div class="content-alert"><span class="alert-icon">⚠️</span><span>${item.text}</span></div>`;
      case 'callout':
        return `<div class="content-callout"><strong>${item.label}:</strong> ${item.text}</div>`;
      case 'rule':
        return `<div class="content-rule">${item.text}</div>`;
      case 'bullets':
        return `<ul class="content-bullets">${item.items.map(b=>`<li>${b}</li>`).join('')}</ul>`;
      case 'typecards':
        return `<div class="type-cards">${item.items.map(t=>`
          <div class="type-card" style="border-left:4px solid ${t.color}">
            <div class="type-card-label" style="color:${t.color}">${t.label}</div>
            <div class="type-card-text">${t.text}</div>
          </div>`).join('')}</div>`;
      case 'twocol':
        return `<div class="two-col">
          <div class="col-block"><div class="col-heading">${item.left.heading}</div><ul class="content-bullets">${item.left.items.map(b=>`<li>${b}</li>`).join('')}</ul></div>
          <div class="col-block"><div class="col-heading">${item.right.heading}</div><ul class="content-bullets">${item.right.items.map(b=>`<li>${b}</li>`).join('')}</ul></div>
        </div>`;
      case 'stagelist':
        return `<div class="stage-list">${item.items.map(s=>`
          <div class="stage-row">
            <div class="stage-num" style="background:${s.color}">${s.num}</div>
            <div class="stage-body"><span class="stage-label" style="color:${s.color}">${s.label}</span><span class="stage-text"> — ${s.text}</span></div>
          </div>`).join('')}</div>`;
      case 'rhf':
        return `<div class="rhf-grid">${item.items.map(r=>`
          <div class="rhf-card" style="border-top:4px solid ${r.color}">
            <div class="rhf-label" style="color:${r.color}">${r.label}</div>
            <div class="rhf-text">${r.text}</div>
          </div>`).join('')}</div>`;
      default:
        return '';
    }
  }).join('\n');
}

function buildPlatformHTML(courseKey, course) {
  const today = new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
  const modulesJ = JSON.stringify(course.modules).replace(/\\/g,'\\\\').replace(/`/g,'\\`').replace(/\$/g,'\\$');
  const examJ    = JSON.stringify(course.exam).replace(/\\/g,'\\\\').replace(/`/g,'\\`').replace(/\$/g,'\\$');

  // Pre-render slide HTML for each module
  const slideHTML = course.modules.map(mod =>
    mod.slides.map(slide => `
      <div class="slide-content">
        <div class="slide-heading">${slide.heading}</div>
        <div class="slide-subheading">${slide.subheading}</div>
        <div class="slide-body">${renderContent(slide.content)}</div>
      </div>`).join('')
  );

  // Quiz HTML for each module
  const quizHTML = course.modules.map(mod => `
    <div class="quiz-block">
      <div class="quiz-title">✓ Module ${mod.num} Knowledge Check</div>
      ${mod.quiz.map((q,qi) => `
        <div class="quiz-q" id="mq-${mod.num-1}-${qi}">
          <div class="quiz-qtext">${q.q}</div>
          <div class="quiz-opts">
            ${q.options.map((opt,oi) => `
              <div class="quiz-opt" onclick="pickModQ(${mod.num-1},${qi},${oi},${q.answer})">
                <div class="quiz-ol">${['A','B','C','D'][oi]}</div>
                <span>${opt}</span>
              </div>`).join('')}
          </div>
          <div class="quiz-fb" id="mqfb-${mod.num-1}-${qi}"></div>
        </div>`).join('')}
    </div>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${course.title} | MACCESS INC. / PSLAW</title>
<style>
/* ── Design tokens ── */
:root {
  --navy:#1B2B5E; --gold:#C9A84C; --red:#8B1A1A; --green:#1A5C3A;
  --light:#F4F6FB; --gray:#4A5568; --white:#fff; --dark:#12193A;
  --border:#dde4f0; --r:10px;
  --gold-lt:#FFF8E1; --red-lt:#FFECEC; --green-lt:#EAF3DE;
}
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Segoe UI',Arial,sans-serif;background:var(--light);color:#1A1A2E;line-height:1.6;}

/* ── Screens ── */
.screen{display:none;} .screen.active{display:block;}

/* ═══════════════════════════════════════
   SALES PAGE
════════════════════════════════════════ */
.site-header{background:var(--navy);padding:14px 24px;display:flex;align-items:center;justify-content:space-between;}
.site-logo{color:var(--gold);font-size:18px;font-weight:700;letter-spacing:.05em;}
.site-meta{color:#CADCFC;font-size:11px;text-align:right;line-height:1.5;}
.gold-stripe{height:5px;background:var(--gold);}

/* Hero */
.hero{background:var(--dark);color:var(--white);padding:60px 24px 48px;}
.hero-inner{max-width:900px;margin:0 auto;}
.hero-badge{display:inline-block;background:var(--red);color:var(--white);font-size:11px;font-weight:700;letter-spacing:.1em;padding:5px 14px;border-radius:4px;margin-bottom:18px;text-transform:uppercase;}
.hero-title{font-size:42px;font-weight:800;line-height:1.1;margin-bottom:12px;}
.hero-sub{font-size:18px;color:#CADCFC;margin-bottom:28px;}
.hero-meta{display:flex;gap:24px;flex-wrap:wrap;margin-bottom:36px;}
.hero-chip{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);border-radius:6px;padding:8px 16px;font-size:13px;color:var(--white);}
.hero-chip strong{color:var(--gold);display:block;font-size:10px;text-transform:uppercase;letter-spacing:.06em;margin-bottom:2px;}
.hero-cta{display:inline-block;background:var(--gold);color:var(--navy);font-size:17px;font-weight:700;padding:16px 36px;border-radius:8px;cursor:pointer;border:none;text-decoration:none;}
.hero-cta:hover{background:#b8962a;}
.hero-trust{margin-top:14px;font-size:12px;color:#8899BB;}

/* Outcomes */
.outcomes-section{background:var(--white);padding:56px 24px;}
.outcomes-inner{max-width:900px;margin:0 auto;}
.section-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--gold);margin-bottom:8px;}
.section-title{font-size:28px;font-weight:700;color:var(--navy);margin-bottom:32px;}
.outcomes-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.outcome-item{display:flex;align-items:flex-start;gap:12px;padding:14px;background:var(--light);border-radius:8px;}
.outcome-check{width:24px;height:24px;border-radius:50%;background:var(--green);color:var(--white);font-size:13px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;}
.outcome-text{font-size:14px;color:#1A1A2E;}

/* Curriculum */
.curriculum-section{background:var(--light);padding:56px 24px;}
.curriculum-inner{max-width:900px;margin:0 auto;display:grid;grid-template-columns:1fr 320px;gap:40px;align-items:start;}
.curriculum-list{display:flex;flex-direction:column;gap:10px;}
.curr-item{background:var(--white);border-radius:var(--r);border:1px solid var(--border);padding:16px 20px;display:flex;align-items:center;gap:16px;cursor:default;}
.curr-item.active-curr{border-color:var(--navy);background:#F0F4FB;}
.curr-icon{font-size:22px;width:42px;height:42px;background:var(--light);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.curr-body{flex:1;}
.curr-num{font-size:10px;font-weight:700;color:var(--gray);text-transform:uppercase;letter-spacing:.06em;}
.curr-name{font-size:15px;font-weight:600;color:var(--navy);margin:2px 0;}
.curr-dur{font-size:12px;color:var(--gray);}
.curr-lock{color:var(--gray);font-size:16px;}

/* Pricing card */
.price-card{background:var(--white);border-radius:var(--r);border:2px solid var(--navy);padding:28px;position:sticky;top:24px;}
.price-card-title{font-size:14px;font-weight:700;color:var(--gray);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;}
.price-amount{font-size:40px;font-weight:800;color:var(--navy);}
.price-period{font-size:14px;color:var(--gray);margin-bottom:20px;}
.price-btn{display:block;width:100%;background:var(--gold);color:var(--navy);font-size:16px;font-weight:700;padding:15px;border-radius:8px;border:none;cursor:pointer;text-align:center;margin-bottom:12px;}
.price-btn:hover{background:#b8962a;}
.price-btn.outline{background:var(--white);color:var(--navy);border:2px solid var(--navy);}
.price-includes{margin-top:20px;font-size:13px;}
.price-includes li{padding:7px 0;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:8px;list-style:none;}
.price-includes li:last-child{border-bottom:none;}
.price-check{color:var(--green);font-weight:700;}
.pay-logos{display:flex;gap:8px;margin-top:14px;flex-wrap:wrap;}
.pay-logo{background:var(--light);border:1px solid var(--border);border-radius:4px;padding:4px 10px;font-size:11px;font-weight:600;color:var(--gray);}
.guarantee{margin-top:14px;padding:10px;background:var(--green-lt);border-radius:6px;font-size:12px;color:var(--green);text-align:center;}

/* Instructor */
.instructor-section{background:var(--navy);color:var(--white);padding:56px 24px;}
.instructor-inner{max-width:900px;margin:0 auto;display:grid;grid-template-columns:120px 1fr;gap:32px;align-items:start;}
.instructor-avatar{width:100px;height:100px;border-radius:50%;background:var(--gold);display:flex;align-items:center;justify-content:center;font-size:36px;border:3px solid var(--gold);}
.instructor-name{font-size:22px;font-weight:700;color:var(--gold);margin-bottom:4px;}
.instructor-title{font-size:13px;color:#CADCFC;margin-bottom:16px;}
.instructor-bio{font-size:14px;color:#CADCFC;line-height:1.7;margin-bottom:16px;}
.instructor-creds{display:flex;flex-wrap:wrap;gap:8px;}
.cred-chip{background:rgba(255,255,255,.1);border-radius:4px;padding:4px 10px;font-size:11px;color:var(--white);}

/* Testimonials */
.testimonials-section{background:var(--white);padding:56px 24px;}
.testimonials-inner{max-width:900px;margin:0 auto;}
.testimonials-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px;margin-top:28px;}
.testimonial{background:var(--light);border-radius:var(--r);padding:20px;border-left:4px solid var(--gold);}
.t-stars{color:var(--gold);font-size:14px;margin-bottom:8px;}
.t-text{font-size:13px;color:var(--gray);line-height:1.6;margin-bottom:12px;font-style:italic;}
.t-name{font-size:12px;font-weight:700;color:var(--navy);}

/* Bottom CTA */
.bottom-cta{background:var(--gold);padding:48px 24px;text-align:center;}
.bottom-cta h2{font-size:28px;font-weight:800;color:var(--navy);margin-bottom:8px;}
.bottom-cta p{font-size:15px;color:var(--dark);margin-bottom:24px;}
.bottom-cta-btn{display:inline-block;background:var(--navy);color:var(--white);font-size:17px;font-weight:700;padding:16px 40px;border-radius:8px;border:none;cursor:pointer;}

/* Footer */
.site-footer{background:var(--dark);color:#8899BB;padding:20px 24px;text-align:center;font-size:12px;}

/* ═══════════════════════════════════════
   ENROLLMENT GATE
════════════════════════════════════════ */
.gate-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--light);padding:24px;}
.gate-card{background:var(--white);border-radius:var(--r);border:1px solid var(--border);padding:40px;max-width:480px;width:100%;}
.gate-logo{color:var(--navy);font-size:13px;font-weight:700;letter-spacing:.05em;margin-bottom:6px;}
.gate-title{font-size:24px;font-weight:700;color:var(--navy);margin-bottom:4px;}
.gate-sub{font-size:13px;color:var(--gray);margin-bottom:24px;}
.gate-label{display:block;font-size:12px;font-weight:600;color:var(--gray);margin:14px 0 5px;}
.gate-input{width:100%;padding:11px 14px;border:1.5px solid var(--border);border-radius:8px;font-size:15px;outline:none;}
.gate-input:focus{border-color:var(--navy);}
.gate-btn{display:block;width:100%;background:var(--gold);color:var(--navy);font-size:16px;font-weight:700;padding:14px;border-radius:8px;border:none;cursor:pointer;margin-top:20px;text-align:center;}
.gate-notice{font-size:12px;color:var(--gray);margin-top:14px;text-align:center;line-height:1.6;}

/* ═══════════════════════════════════════
   COURSE PLAYER
════════════════════════════════════════ */
.player-wrap{display:grid;grid-template-columns:280px 1fr;min-height:100vh;}

/* Sidebar */
.sidebar{background:var(--navy);color:var(--white);padding:0;position:sticky;top:0;height:100vh;overflow-y:auto;display:flex;flex-direction:column;}
.sidebar-header{padding:20px;border-bottom:1px solid rgba(255,255,255,.1);}
.sidebar-logo{font-size:13px;font-weight:700;color:var(--gold);letter-spacing:.05em;}
.sidebar-course{font-size:14px;color:#CADCFC;margin-top:4px;line-height:1.4;}
.sidebar-progress-bar{height:4px;background:rgba(255,255,255,.15);margin:14px 20px 0;}
.sidebar-progress-fill{height:100%;background:var(--gold);transition:width .4s;}
.sidebar-progress-label{font-size:11px;color:#8899BB;padding:4px 20px 14px;border-bottom:1px solid rgba(255,255,255,.1);}
.sidebar-modules{flex:1;padding:14px 0;}
.sidebar-mod{padding:12px 20px;cursor:pointer;border-left:3px solid transparent;transition:all .15s;}
.sidebar-mod:hover{background:rgba(255,255,255,.05);}
.sidebar-mod.active{border-left-color:var(--gold);background:rgba(201,168,76,.1);}
.sidebar-mod.done{border-left-color:var(--green);}
.sidebar-mod.locked{opacity:.45;cursor:default;}
.sidebar-mod-header{display:flex;align-items:center;gap:10px;}
.sidebar-mod-icon{font-size:16px;width:28px;text-align:center;}
.sidebar-mod-num{font-size:10px;font-weight:700;color:var(--gold);text-transform:uppercase;letter-spacing:.06em;}
.sidebar-mod-name{font-size:13px;color:var(--white);margin:2px 0;}
.sidebar-mod-dur{font-size:11px;color:#8899BB;}
.sidebar-mod-status{margin-left:auto;font-size:14px;}
.sidebar-exam{padding:14px 20px;border-top:1px solid rgba(255,255,255,.1);margin-top:auto;}
.sidebar-exam-item{padding:10px 0;cursor:pointer;display:flex;align-items:center;gap:10px;font-size:13px;color:#CADCFC;}
.sidebar-exam-item.locked-exam{opacity:.4;cursor:default;}

/* Main player area */
.player-main{display:flex;flex-direction:column;}
.player-topbar{background:var(--white);border-bottom:1px solid var(--border);padding:14px 28px;display:flex;align-items:center;justify-content:space-between;}
.player-breadcrumb{font-size:13px;color:var(--gray);}
.player-breadcrumb strong{color:var(--navy);}
.player-slide-counter{font-size:12px;color:var(--gray);background:var(--light);padding:4px 12px;border-radius:20px;}
.player-content{flex:1;padding:36px 40px;max-width:820px;}

/* Slide */
.slide-content{animation:fadeIn .25s ease;}
@keyframes fadeIn{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:none;}}
.slide-heading{font-size:26px;font-weight:700;color:var(--navy);margin-bottom:6px;line-height:1.25;}
.slide-subheading{font-size:13px;color:var(--gray);margin-bottom:24px;padding-bottom:18px;border-bottom:2px solid var(--gold);}
.slide-body{font-size:15px;}
.sect-h3{font-size:16px;font-weight:700;color:var(--navy);margin:20px 0 10px;}
.content-alert{background:#FFF3CD;border:1px solid #F9C757;border-radius:8px;padding:14px 16px;margin:16px 0;display:flex;gap:12px;align-items:flex-start;font-size:14px;color:#7B4F00;}
.alert-icon{font-size:18px;flex-shrink:0;}
.content-callout{background:var(--green-lt);border-left:4px solid var(--green);border-radius:0 8px 8px 0;padding:12px 16px;margin:16px 0;font-size:14px;color:#1A4A2A;}
.content-rule{background:#F0F4FB;border-left:4px solid var(--navy);border-radius:0 8px 8px 0;padding:12px 16px;margin:16px 0;font-size:14px;font-weight:600;color:var(--navy);}
.content-bullets{padding-left:4px;margin:12px 0;}
.content-bullets li{padding:6px 0 6px 20px;position:relative;font-size:14px;border-bottom:1px solid #f0f0f0;}
.content-bullets li:last-child{border:none;}
.content-bullets li::before{content:"▸";position:absolute;left:0;color:var(--gold);font-size:12px;top:9px;}
.type-cards{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:16px 0;}
.type-card{background:var(--white);border-radius:8px;padding:14px;border:1px solid var(--border);}
.type-card-label{font-size:12px;font-weight:700;margin-bottom:6px;}
.type-card-text{font-size:13px;color:var(--gray);}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:16px 0;}
.col-block{background:var(--light);border-radius:8px;padding:14px;}
.col-heading{font-size:13px;font-weight:700;color:var(--navy);margin-bottom:10px;}
.stage-list{display:flex;flex-direction:column;gap:8px;margin:14px 0;}
.stage-row{display:flex;align-items:center;gap:14px;background:var(--white);border-radius:8px;padding:12px 16px;border:1px solid var(--border);}
.stage-num{width:32px;height:32px;border-radius:50%;color:var(--white);font-size:14px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.stage-label{font-weight:700;font-size:14px;}
.stage-text{font-size:13px;color:var(--gray);}
.rhf-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin:16px 0;}
.rhf-card{background:var(--white);border-radius:8px;padding:14px;border:1px solid var(--border);}
.rhf-label{font-size:18px;font-weight:800;margin-bottom:8px;}
.rhf-text{font-size:13px;color:var(--gray);}

/* Player nav */
.player-nav{background:var(--white);border-top:1px solid var(--border);padding:16px 40px;display:flex;justify-content:space-between;align-items:center;}
.nav-btn{padding:11px 28px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;border:none;}
.nav-back{background:var(--white);color:var(--navy);border:1.5px solid var(--navy);}
.nav-next{background:var(--navy);color:var(--white);}
.nav-next:hover{background:#243a7a;}
.nav-next:disabled{background:#A0AEC0;cursor:not-allowed;}
.slide-dots{display:flex;gap:6px;}
.dot{width:8px;height:8px;border-radius:50%;background:var(--border);}
.dot.active{background:var(--navy);}
.dot.done{background:var(--gold);}

/* Knowledge check */
.quiz-block{margin:28px 0;background:var(--white);border-radius:var(--r);border:2px solid var(--gold);padding:24px;}
.quiz-title{font-size:15px;font-weight:700;color:var(--navy);margin-bottom:18px;display:flex;align-items:center;gap:8px;}
.quiz-q{margin-bottom:20px;}
.quiz-qtext{font-size:15px;font-weight:600;color:var(--navy);margin-bottom:12px;line-height:1.5;}
.quiz-opts{display:flex;flex-direction:column;gap:8px;}
.quiz-opt{display:flex;align-items:center;gap:10px;padding:10px 14px;border:1.5px solid var(--border);border-radius:8px;cursor:pointer;font-size:14px;transition:all .15s;}
.quiz-opt:hover{border-color:var(--navy);background:#F0F4FB;}
.quiz-opt.picked-ok{border-color:var(--green)!important;background:var(--green-lt)!important;color:var(--green);}
.quiz-opt.picked-no{border-color:var(--red)!important;background:var(--red-lt)!important;color:var(--red);}
.quiz-opt.disabled{pointer-events:none;}
.quiz-ol{width:26px;height:26px;border-radius:50%;background:var(--light);font-weight:700;font-size:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--navy);border:1.5px solid var(--border);}
.quiz-opt.picked-ok .quiz-ol{background:var(--green);color:#fff;border-color:var(--green);}
.quiz-opt.picked-no .quiz-ol{background:var(--red);color:#fff;border-color:var(--red);}
.quiz-fb{font-size:13px;margin-top:8px;padding:8px 12px;border-radius:6px;display:none;}
.quiz-fb.show-ok{display:block;background:var(--green-lt);color:var(--green);}
.quiz-fb.show-no{display:block;background:var(--red-lt);color:var(--red);}

/* ═══════════════════════════════════════
   FINAL ASSESSMENT
════════════════════════════════════════ */
.exam-wrap{max-width:820px;padding:36px 40px;}
.exam-header{margin-bottom:28px;}
.exam-title{font-size:26px;font-weight:700;color:var(--navy);margin-bottom:6px;}
.exam-sub{font-size:14px;color:var(--gray);}
.exam-warn{background:#FFF3CD;border:1px solid #F9C757;border-radius:8px;padding:13px 16px;font-size:13px;color:#7B4F00;margin:16px 0;line-height:1.6;}
.exam-pw{background:var(--white);border-radius:8px;padding:12px 16px;margin-bottom:18px;display:flex;align-items:center;gap:12px;border:1px solid var(--border);}
.exam-pb{flex:1;height:6px;background:#E8EDF6;border-radius:3px;overflow:hidden;}
.exam-pf{height:100%;background:var(--navy);border-radius:3px;transition:width .3s;}
.exam-pt{font-size:12px;color:var(--gray);white-space:nowrap;}
.exam-q-block{background:var(--white);border-radius:var(--r);border:1px solid var(--border);padding:24px 28px;margin-bottom:18px;}
.exam-mod-badge{display:inline-block;background:var(--light);border:1px solid var(--border);border-radius:5px;font-size:10px;font-weight:600;color:var(--navy);padding:3px 10px;margin-bottom:10px;}
.exam-ref{font-size:10px;color:var(--gray);margin-left:8px;font-style:italic;}
.exam-qnum{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--gold);margin-bottom:6px;}
.exam-qtext{font-size:15px;font-weight:600;line-height:1.5;margin-bottom:16px;}
.exam-opts{display:flex;flex-direction:column;gap:8px;}
.exam-opt{display:flex;align-items:center;gap:10px;padding:10px 14px;border:1.5px solid var(--border);border-radius:8px;cursor:pointer;font-size:14px;transition:all .15s;}
.exam-opt:hover{border-color:var(--navy);background:#F0F4FB;}
.exam-opt.sel{border-color:var(--navy);background:#EBF0FB;}
.exam-opt.ok{border-color:var(--green)!important;background:var(--green-lt)!important;color:var(--green);}
.exam-opt.no{border-color:var(--red)!important;background:var(--red-lt)!important;color:var(--red);}
.exam-ol{width:26px;height:26px;border-radius:50%;background:var(--light);font-weight:700;font-size:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--navy);border:1.5px solid var(--border);}
.exam-opt.sel .exam-ol{background:var(--navy);color:#fff;border-color:var(--navy);}
.exam-opt.ok .exam-ol{background:var(--green);color:#fff;border-color:var(--green);}
.exam-opt.no .exam-ol{background:var(--red);color:#fff;border-color:var(--red);}
.exam-fb{margin-top:10px;padding:9px 13px;border-radius:7px;font-size:13px;line-height:1.6;display:none;}
.exam-fb.show{display:block;}
.exam-fb-ok{background:var(--green-lt);color:var(--green);}
.exam-fb-no{background:var(--red-lt);color:var(--red);}
.exam-nav{display:flex;justify-content:space-between;align-items:center;margin-top:8px;padding:16px 0;}
.exam-btn{padding:11px 28px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;border:none;}
.exam-back{background:var(--white);color:var(--navy);border:1.5px solid var(--navy);}
.exam-fwd{background:var(--navy);color:#fff;}

/* ═══════════════════════════════════════
   RESULTS + CERTIFICATE
════════════════════════════════════════ */
.results-wrap{max-width:760px;padding:40px;margin:0 auto;}
.results-card{background:var(--white);border-radius:var(--r);border:1px solid var(--border);padding:40px;text-align:center;}
.score-ring{width:140px;height:140px;border-radius:50%;margin:0 auto 24px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:32px;font-weight:800;}
.ring-pass{background:var(--green-lt);color:var(--green);border:5px solid var(--green);}
.ring-fail{background:var(--red-lt);color:var(--red);border:5px solid var(--red);}
.ring-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-top:4px;}
.results-title{font-size:24px;font-weight:700;margin-bottom:8px;}
.rt-pass{color:var(--green);} .rt-fail{color:var(--red);}
.results-sub{font-size:14px;color:var(--gray);margin-bottom:24px;line-height:1.6;}
.breakdown{background:var(--light);border-radius:8px;padding:18px;margin-bottom:24px;text-align:left;}
.breakdown h3{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--navy);margin-bottom:12px;}
.bd-row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--border);font-size:13px;}
.bd-row:last-child{border:none;font-weight:700;}
.bd-pass{color:var(--green);font-weight:600;} .bd-fail{color:var(--red);font-weight:600;}
.results-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:18px;}
.r-btn{padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;border:none;}
.r-primary{background:var(--gold);color:var(--navy);}
.r-outline{background:var(--white);color:var(--navy);border:1.5px solid var(--navy);}
.bsis-note{background:#EBF0FB;border-radius:8px;padding:14px 18px;font-size:12px;color:var(--navy);line-height:1.7;text-align:left;}

/* Certificate */
@media print{.no-print{display:none!important;}.cert-wrap{margin:0;max-width:100%;}}
.cert-page{padding:32px;}
.cert-wrap{background:var(--white);border:3px double var(--navy);border-radius:4px;padding:50px 60px;max-width:820px;margin:0 auto;text-align:center;position:relative;}
.cert-wrap::before{content:'';position:absolute;inset:10px;border:1px solid var(--gold);border-radius:2px;pointer-events:none;}
.cert-eyebrow{font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--navy);margin-bottom:6px;}
.cert-stripe{height:5px;background:var(--gold);border-radius:3px;margin:12px auto;width:80px;}
.cert-co{font-size:24px;font-weight:800;color:var(--navy);margin-bottom:2px;}
.cert-ppo{font-size:12px;color:var(--gray);margin-bottom:24px;}
.cert-certifies{font-size:13px;color:var(--gray);margin-bottom:8px;}
.cert-name{font-size:32px;font-weight:800;color:var(--navy);border-bottom:2px solid var(--navy);display:inline-block;min-width:300px;padding-bottom:4px;margin-bottom:20px;}
.cert-body{font-size:14px;color:var(--gray);line-height:1.8;margin-bottom:8px;}
.cert-course{font-size:18px;font-weight:700;color:var(--navy);margin-bottom:14px;}
.cert-badge{display:inline-block;background:var(--green-lt);color:var(--green);border-radius:6px;padding:5px 16px;font-size:13px;font-weight:700;margin-bottom:22px;}
.cert-sigs{display:flex;justify-content:space-around;margin-top:36px;gap:20px;}
.cert-sig{flex:1;text-align:center;}
.cert-sig-line{border-top:1.5px solid var(--navy);margin-bottom:6px;}
.cert-sig-label{font-size:12px;color:var(--gray);}

/* Responsive */
@media(max-width:768px){
  .outcomes-grid,.type-cards,.two-col,.rhf-grid,.testimonials-grid{grid-template-columns:1fr;}
  .curriculum-inner{grid-template-columns:1fr;}
  .price-card{position:static;}
  .player-wrap{grid-template-columns:1fr;}
  .sidebar{height:auto;position:relative;}
  .instructor-inner{grid-template-columns:1fr;}
  .hero-title{font-size:28px;}
}
</style>
</head>
<body>

<!-- ═══════════════ SCREEN 1: SALES PAGE ═══════════════ -->
<div class="screen active" id="sc-sales">
  <header class="site-header">
    <div class="site-logo">MACCESS INC. / PSLAW</div>
    <div class="site-meta">PPO License #122729 | BSIS-Authorized Training Provider<br/>gopslaw.com</div>
  </header>
  <div class="gold-stripe"></div>

  <!-- Hero -->
  <section class="hero">
    <div class="hero-inner">
      <div class="hero-badge">${course.badge}</div>
      <h1 class="hero-title">${course.title}</h1>
      <p class="hero-sub">${course.subtitle} — California Guard Card Training</p>
      <div class="hero-meta">
        <div class="hero-chip"><strong>Credit Hours</strong>${course.hours} Hours</div>
        <div class="hero-chip"><strong>Authority</strong>${course.bpcRef}</div>
        <div class="hero-chip"><strong>Category</strong>BSIS ${course.category}</div>
        <div class="hero-chip"><strong>Certificate</strong>BSIS Compliant</div>
      </div>
      <button class="hero-cta" onclick="goEnroll()">Enroll Now — $${course.price}</button>
      <div class="hero-trust">🔒 BSIS-Authorized Training &nbsp;|&nbsp; Certificate of Completion Included &nbsp;|&nbsp; PPO License #122729</div>
    </div>
  </section>

  <!-- Outcomes -->
  <section class="outcomes-section">
    <div class="outcomes-inner">
      <div class="section-label">What You'll Learn</div>
      <h2 class="section-title">Course Learning Outcomes</h2>
      <div class="outcomes-grid">
        ${course.outcomes.map(o=>`<div class="outcome-item"><div class="outcome-check">✓</div><div class="outcome-text">${o}</div></div>`).join('')}
      </div>
    </div>
  </section>

  <!-- Curriculum + Pricing -->
  <section class="curriculum-section">
    <div class="curriculum-inner">
      <div>
        <div class="section-label">Course Curriculum</div>
        <h2 class="section-title" style="margin-bottom:20px;">What's Inside</h2>
        <div class="curriculum-list">
          ${course.modules.map((mod,i)=>`
            <div class="curr-item ${i===0?'active-curr':''}">
              <div class="curr-icon">${mod.icon}</div>
              <div class="curr-body">
                <div class="curr-num">Module ${mod.num}</div>
                <div class="curr-name">${mod.title}</div>
                <div class="curr-dur">${mod.duration} · ${mod.slides.length} lessons · ${mod.quiz.length} knowledge checks</div>
              </div>
              <div class="curr-lock">${i===0?'▶':'🔒'}</div>
            </div>`).join('')}
          <div class="curr-item">
            <div class="curr-icon">📝</div>
            <div class="curr-body">
              <div class="curr-num">Final Assessment</div>
              <div class="curr-name">BSIS Written Examination</div>
              <div class="curr-dur">${course.exam.length} questions · 100% required · Certificate on pass</div>
            </div>
            <div class="curr-lock">🔒</div>
          </div>
        </div>
      </div>

      <!-- Pricing -->
      <div>
        <div class="price-card">
          <div class="price-card-title">Full Course Access</div>
          <div class="price-amount">$${course.price}</div>
          <div class="price-period">one-time · lifetime access</div>
          <button class="price-btn" onclick="goEnroll()">Get Started Now</button>
          <ul class="price-includes">
            <li><span class="price-check">✓</span> All ${course.modules.length} course modules</li>
            <li><span class="price-check">✓</span> ${course.exam.length}-question BSIS assessment</li>
            <li><span class="price-check">✓</span> BSIS Certificate of Completion</li>
            <li><span class="price-check">✓</span> Instant access — start today</li>
            <li><span class="price-check">✓</span> Counts toward 32-hr BSIS requirement</li>
          </ul>
          <div class="pay-logos">
            <div class="pay-logo">Klarna</div>
            <div class="pay-logo">Afterpay</div>
            <div class="pay-logo">Affirm</div>
            <div class="pay-logo">PayPal</div>
          </div>
          <div class="guarantee">✓ BSIS Certificate on completion</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Instructor -->
  <section class="instructor-section">
    <div class="instructor-inner">
      <div class="instructor-avatar">👮</div>
      <div>
        <div class="instructor-name">James K. McMichael</div>
        <div class="instructor-title">CEO, MACCESS INC. | Lead Instructor, PSLAW</div>
        <p class="instructor-bio">MACCESS INC. is a California-licensed Private Patrol Operator (PPO #122729) with 14+ years of executive protection and private security operational experience in the Los Angeles market. Our instructors bring real-world field experience to every module — not just compliance checkboxes. Every course is built directly from the official BSIS syllabus at bsis.ca.gov and fact-checked against current California law.</p>
        <div class="instructor-creds">
          <div class="cred-chip">PPO License #122729</div>
          <div class="cred-chip">BSIS-Authorized</div>
          <div class="cred-chip">14+ Years EP Experience</div>
          <div class="cred-chip">Philosophy — UC Riverside</div>
          <div class="cred-chip">Los Angeles, CA</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="testimonials-section">
    <div class="testimonials-inner">
      <div class="section-label">Student Reviews</div>
      <h2 class="section-title">What Our Graduates Say</h2>
      <div class="testimonials-grid">
        <div class="testimonial">
          <div class="t-stars">★★★★★</div>
          <p class="t-text">"Clear, thorough, and exactly what I needed to understand California workplace violence law. The SB 553 section alone was worth it — my employer had no idea about the Violent Incident Log requirement."</p>
          <div class="t-name">PSLAW Graduate · Los Angeles</div>
        </div>
        <div class="testimonial">
          <div class="t-stars">★★★★★</div>
          <p class="t-text">"Finally a security course that treats you like a professional. The content is built from the actual BSIS syllabus, not watered down. The knowledge checks after each module kept me sharp."</p>
          <div class="t-name">PSLAW Graduate · Inglewood</div>
        </div>
        <div class="testimonial">
          <div class="t-stars">★★★★★</div>
          <p class="t-text">"Completed this before my first day on post. Supervisor was impressed I already knew the four Cal/OSHA violence types and the reporting chain. This is real preparation."</p>
          <div class="t-name">PSLAW Graduate · Compton</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Bottom CTA -->
  <section class="bottom-cta">
    <h2>Start Your Training Today</h2>
    <p>BSIS-compliant certificate. Real-world content. Start immediately.</p>
    <button class="bottom-cta-btn" onclick="goEnroll()">Enroll Now — $${course.price}</button>
  </section>

  <footer class="site-footer">
    MACCESS INC. / Private Security LA Worldwide (PSLAW) &nbsp;|&nbsp; PPO License #122729 &nbsp;|&nbsp; BSIS-Authorized Training Provider &nbsp;|&nbsp; gopslaw.com
    <br/>© ${new Date().getFullYear()} MACCESS INC. All rights reserved. &nbsp;|&nbsp; <a href="#" style="color:#8899BB;">Terms</a> &nbsp;|&nbsp; <a href="#" style="color:#8899BB;">Privacy Policy</a>
  </footer>
</div>

<!-- ═══════════════ SCREEN 2: ENROLLMENT GATE ═══════════════ -->
<div class="screen" id="sc-gate">
  <div class="gate-wrap">
    <div class="gate-card">
      <div class="gate-logo">MACCESS INC. / PSLAW</div>
      <h2 class="gate-title">You're Almost In</h2>
      <p class="gate-sub">Enter your details to access <strong>${course.title}</strong>. Your certificate will be issued to this name.</p>
      <label class="gate-label">Full Legal Name * <span style="font-size:11px;font-weight:400;">(as it will appear on your certificate)</span></label>
      <input class="gate-input" type="text" id="g-name" placeholder="First Middle Last"/>
      <label class="gate-label">Email Address *</label>
      <input class="gate-input" type="email" id="g-email" placeholder="your@email.com"/>
      <button class="gate-btn" onclick="startCourse()">Start Course →</button>
      <p class="gate-notice">🔒 Your information is used only to issue your BSIS Certificate of Completion. MACCESS INC. PPO #122729.</p>
      <p style="text-align:center;margin-top:12px;font-size:12px;color:var(--gray);cursor:pointer;" onclick="show('sc-sales')">← Back to course details</p>
    </div>
  </div>
</div>

<!-- ═══════════════ SCREEN 3: COURSE PLAYER ═══════════════ -->
<div class="screen" id="sc-player">
  <div class="player-wrap">

    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo">MACCESS INC. / PSLAW</div>
        <div class="sidebar-course">${course.title}</div>
        <div class="sidebar-progress-bar"><div class="sidebar-progress-fill" id="sb-fill" style="width:0%"></div></div>
        <div class="sidebar-progress-label" id="sb-label">0% complete</div>
      </div>
      <div class="sidebar-modules" id="sb-modules">
        ${course.modules.map((mod,i)=>`
          <div class="sidebar-mod ${i===0?'active':'locked'}" id="sbm-${i}" onclick="jumpModule(${i})">
            <div class="sidebar-mod-header">
              <div class="sidebar-mod-icon">${mod.icon}</div>
              <div>
                <div class="sidebar-mod-num">Module ${mod.num}</div>
                <div class="sidebar-mod-name">${mod.title}</div>
                <div class="sidebar-mod-dur">${mod.duration}</div>
              </div>
              <div class="sidebar-mod-status" id="sbms-${i}">🔒</div>
            </div>
          </div>`).join('')}
      </div>
      <div class="sidebar-exam">
        <div class="sidebar-exam-item locked-exam" id="sb-exam-link" onclick="jumpExam()">
          <span>📝</span> <span>Final BSIS Assessment</span>
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <div class="player-main">
      <div class="player-topbar">
        <div class="player-breadcrumb" id="player-bc"><strong>${course.title}</strong></div>
        <div class="player-slide-counter" id="player-sc">Slide 1</div>
      </div>
      <div class="player-content" id="player-content">
        <!-- Injected by JS -->
      </div>
      <div class="player-nav">
        <button class="nav-btn nav-back" id="nav-back" onclick="navBack()">← Back</button>
        <div class="slide-dots" id="slide-dots"></div>
        <button class="nav-btn nav-next" id="nav-next" onclick="navNext()">Next →</button>
      </div>
    </div>
  </div>
</div>

<!-- ═══════════════ SCREEN 4: FINAL EXAM ═══════════════ -->
<div class="screen" id="sc-exam">
  <div class="player-wrap">
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo">MACCESS INC. / PSLAW</div>
        <div class="sidebar-course">Final BSIS Assessment</div>
        <div class="sidebar-progress-bar"><div class="sidebar-progress-fill" id="ex-sb-fill" style="width:0%"></div></div>
        <div class="sidebar-progress-label" id="ex-sb-label">0 of ${course.exam.length} answered</div>
      </div>
      <div class="sidebar-modules" style="padding:16px;">
        <div style="font-size:12px;color:#CADCFC;line-height:1.7;">
          <strong style="color:var(--gold);">BSIS Written Examination</strong><br/>
          ${course.exam.length} questions<br/>
          100% required to pass<br/>
          ${course.bpcRef}<br/><br/>
          Answer every question. Your Certificate of Completion is issued upon passing.
        </div>
      </div>
    </aside>
    <div class="player-main">
      <div class="player-topbar">
        <div class="player-breadcrumb"><strong>${course.title}</strong> — Final Assessment</div>
        <div class="player-slide-counter" id="exam-sc">Q 1 of ${course.exam.length}</div>
      </div>
      <div class="exam-wrap">
        <div class="exam-header">
          <h2 class="exam-title">BSIS Written Examination</h2>
          <div class="exam-sub">${course.title} · ${course.exam.length} questions · Pass: 100%</div>
          <div class="exam-warn">⚠️ A score of 100% is required per ${course.bpcRef}. Each incorrect answer shows the correct response — review it before continuing. Full retake required if you do not pass.</div>
        </div>
        <div class="exam-pw"><div class="exam-pb"><div class="exam-pf" id="exam-fill" style="width:0%"></div></div><div class="exam-pt" id="exam-pt">Q 1 of ${course.exam.length}</div></div>
        <div id="exam-qa"></div>
        <div class="exam-nav">
          <button class="exam-btn exam-back" id="exam-back" onclick="examPrev()" style="display:none">← Previous</button>
          <button class="exam-btn exam-fwd" id="exam-fwd" onclick="examNext()">Next →</button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ═══════════════ SCREEN 5: RESULTS ═══════════════ -->
<div class="screen" id="sc-results">
  <div style="background:var(--navy);padding:14px 24px;">
    <div style="color:var(--gold);font-size:16px;font-weight:700;">MACCESS INC. / PSLAW</div>
  </div>
  <div class="results-wrap">
    <div class="results-card">
      <div class="score-ring" id="res-ring"><span id="res-pct"></span><span class="ring-label" id="res-label"></span></div>
      <h2 class="results-title" id="res-title"></h2>
      <p class="results-sub" id="res-sub"></p>
      <div class="breakdown" id="res-breakdown"></div>
      <div class="results-btns" id="res-btns"></div>
      <div class="bsis-note" id="res-note"></div>
    </div>
  </div>
</div>

<!-- ═══════════════ SCREEN 6: CERTIFICATE ═══════════════ -->
<div class="screen" id="sc-cert">
  <div class="no-print" style="background:var(--navy);padding:14px 24px;display:flex;justify-content:space-between;align-items:center;">
    <div style="color:var(--gold);font-size:16px;font-weight:700;">MACCESS INC. / PSLAW — Certificate</div>
    <div style="display:flex;gap:12px;">
      <button onclick="window.print()" style="background:var(--gold);color:var(--navy);border:none;padding:9px 20px;border-radius:7px;font-weight:700;cursor:pointer;">🖨️ Print Certificate</button>
      <button onclick="show('sc-results')" style="background:transparent;color:var(--white);border:1.5px solid var(--white);padding:9px 20px;border-radius:7px;font-weight:600;cursor:pointer;">← Results</button>
    </div>
  </div>
  <div class="cert-page">
    <div class="cert-wrap" id="cert-area"></div>
  </div>
</div>

<script>
// ── Course data ────────────────────────────────────────────────────────
const MODULES = JSON.parse(\`${modulesJ}\`);
const EXAM    = JSON.parse(\`${examJ}\`);
const LT      = ['A','B','C','D'];

// ── State ──────────────────────────────────────────────────────────────
let studentName  = '';
let studentEmail = '';
let curMod       = 0;   // current module index
let curSlide     = 0;   // slide within module (before quiz)
let modDone      = new Array(MODULES.length).fill(false);
let modQuizDone  = new Array(MODULES.length).fill(false);
let modQuizScore = new Array(MODULES.length).fill(0);

// Exam state
let examCur    = 0;
let examAns    = new Array(EXAM.length).fill(null);
let examDone   = new Array(EXAM.length).fill(false);

// ── Screen switching ───────────────────────────────────────────────────
function show(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0,0);
}

function goEnroll(){ show('sc-gate'); }

function startCourse(){
  const nm = document.getElementById('g-name').value.trim();
  const em = document.getElementById('g-email').value.trim();
  if(!nm){ alert('Please enter your full legal name.'); return; }
  if(!em||!em.includes('@')){ alert('Please enter a valid email address.'); return; }
  studentName  = nm;
  studentEmail = em;
  // Unlock first module sidebar entry
  const el0 = document.getElementById('sbm-0');
  if(el0){ el0.classList.remove('locked'); el0.classList.add('active'); }
  document.getElementById('sbms-0').textContent = '▶';
  show('sc-player');
  renderPlayer();
}

// ── Sidebar helpers ────────────────────────────────────────────────────
function updateSidebar(){
  const total  = MODULES.length + 1; // +1 for exam
  const done   = modDone.filter(Boolean).length;
  const pct    = Math.round((done / total) * 100);
  document.getElementById('sb-fill').style.width  = pct + '%';
  document.getElementById('sb-label').textContent = pct + '% complete';

  MODULES.forEach((_,i)=>{
    const el = document.getElementById('sbm-'+i);
    const st = document.getElementById('sbms-'+i);
    if(!el||!st)return;
    el.className = 'sidebar-mod';
    if(i===curMod) el.classList.add('active');
    else if(modDone[i]) el.classList.add('done');
    else if(i>0 && !modDone[i-1]) el.classList.add('locked');
    st.textContent = modDone[i]?'✓':(i===curMod?'▶':(i===0||modDone[i-1])?'▶':'🔒');
  });

  const examLink = document.getElementById('sb-exam-link');
  if(examLink){
    const allModsDone = modDone.every(Boolean);
    examLink.className = 'sidebar-exam-item' + (allModsDone?'':' locked-exam');
  }
}

function jumpModule(i){
  if(i>0 && !modDone[i-1]) return; // locked
  curMod   = i;
  curSlide = 0;
  show('sc-player');
  renderPlayer();
}

function jumpExam(){
  if(!modDone.every(Boolean)) return;
  show('sc-exam');
  renderExamQ();
}

// ── Player ─────────────────────────────────────────────────────────────
function renderPlayer(){
  updateSidebar();
  const mod    = MODULES[curMod];
  const slides = mod.slides;
  const inQuiz = curSlide >= slides.length;

  // Breadcrumb + counter
  document.getElementById('player-bc').innerHTML =
    \`<strong>\${mod.icon} Module \${mod.num}: \${mod.title}</strong>\`;

  if(inQuiz){
    document.getElementById('player-sc').textContent = 'Knowledge Check';
    document.getElementById('nav-next').textContent  = modQuizDone[curMod] ? 'Continue →' : 'Submit';
    document.getElementById('nav-back').style.display = 'inline-block';
    document.getElementById('slide-dots').innerHTML  = '';
    renderQuiz();
  } else {
    document.getElementById('player-sc').textContent =
      \`Slide \${curSlide+1} of \${slides.length}\`;
    const isLast = curSlide === slides.length - 1;
    document.getElementById('nav-next').textContent =
      isLast ? 'Knowledge Check →' : 'Next →';
    document.getElementById('nav-back').style.display =
      curSlide === 0 && curMod === 0 ? 'none' : 'inline-block';
    renderDots(slides.length, curSlide);
    renderSlide(slides[curSlide]);
  }
}

function renderSlide(slide){
  document.getElementById('player-content').innerHTML = \`
    <div class="slide-content">
      <div class="slide-heading">\${slide.heading}</div>
      <div class="slide-subheading">\${slide.subheading}</div>
      <div class="slide-body">\${slide.renderedHTML||''}</div>
    </div>\`;
}

function renderDots(total, current){
  document.getElementById('slide-dots').innerHTML =
    Array.from({length:total},(_,i)=>
      \`<div class="dot \${i<current?'done':i===current?'active':''}"></div>\`
    ).join('');
}

// Quiz within module
function renderQuiz(){
  const mod = MODULES[curMod];
  let html = \`<div class="quiz-block">
    <div class="quiz-title">✓ Module \${mod.num} Knowledge Check</div>\`;
  mod.quiz.forEach((q,qi)=>{
    html += \`<div class="quiz-q">
      <div class="quiz-qtext">\${q.q}</div>
      <div class="quiz-opts">\`;
    q.options.forEach((opt,oi)=>{
      html += \`<div class="quiz-opt \${modQuizDone[curMod]?(oi===q.answer?'picked-ok':(modQuizPicks[curMod]&&modQuizPicks[curMod][qi]===oi?'picked-no':'')):''}
        \${modQuizDone[curMod]?'disabled':''}"
        onclick="pickMQ(\${curMod},\${qi},\${oi},\${q.answer})">
        <div class="quiz-ol">\${LT[oi]}</div><span>\${opt}</span>
      </div>\`;
    });
    const fb = modQuizDone[curMod] && modQuizPicks[curMod] ?
      (modQuizPicks[curMod][qi]===q.answer
        ? \`<div class="quiz-fb show-ok">✓ Correct — \${q.ref||''}</div>\`
        : \`<div class="quiz-fb show-no">✗ Correct answer: \${LT[q.answer]}. \${q.options[q.answer]}</div>\`)
      : \`<div class="quiz-fb"></div>\`;
    html += \`</div>\${fb}</div>\`;
  });
  html += '</div>';

  if(modQuizDone[curMod]){
    html += \`<div style="margin-top:16px;padding:14px;background:var(--green-lt);border-radius:8px;font-size:14px;color:var(--green);font-weight:600;">
      ✓ Knowledge check complete. Click "Continue →" to proceed.\`;
    if(curMod === MODULES.length-1){
      html += \` All modules complete — proceed to the Final BSIS Assessment.\`;
    }
    html += '</div>';
  }

  document.getElementById('player-content').innerHTML = html;
  // Re-attach scroll position
  document.getElementById('player-content').scrollTop = 0;
}

// Track quiz picks
let modQuizPicks = new Array(MODULES.length).fill(null).map(()=>({}));

function pickMQ(modIdx, qi, picked, correct){
  if(modQuizDone[modIdx]) return;
  modQuizPicks[modIdx][qi] = picked;
  const mod = MODULES[modIdx];
  const allPicked = mod.quiz.every((_,i)=>modQuizPicks[modIdx][i]!==undefined);
  if(!allPicked) return renderQuizPartial(modIdx, qi, picked, correct);
  // All answered — mark done
  const score = mod.quiz.filter((_,i)=>modQuizPicks[modIdx][i]===mod.quiz[i].answer).length;
  modQuizScore[modIdx] = score;
  modQuizDone[modIdx]  = true;
  modDone[modIdx]      = true;
  renderPlayer();
}

function renderQuizPartial(modIdx, qi, picked, correct){
  // Just re-render to show current state without marking complete
  const mod = MODULES[modIdx];
  const opts = document.querySelectorAll(\`.quiz-opt\`);
  // Simpler: just re-render the quiz
  renderQuiz();
}

function navNext(){
  const mod    = MODULES[curMod];
  const inQuiz = curSlide >= mod.slides.length;

  if(inQuiz){
    if(!modQuizDone[curMod]){
      // Force complete — mark remaining answers as wrong
      mod.quiz.forEach((_,i)=>{ if(modQuizPicks[curMod][i]===undefined) modQuizPicks[curMod][i]=-1; });
      const score = mod.quiz.filter((_,i)=>modQuizPicks[curMod][i]===mod.quiz[i].answer).length;
      modQuizScore[curMod]=score; modQuizDone[curMod]=true; modDone[curMod]=true;
      renderPlayer(); return;
    }
    // Advance to next module or exam
    if(curMod < MODULES.length - 1){
      curMod++; curSlide=0;
      const nxt = document.getElementById('sbm-'+curMod);
      if(nxt){ nxt.classList.remove('locked'); }
      renderPlayer();
    } else {
      // All modules done — go to exam
      const examLink = document.getElementById('sb-exam-link');
      if(examLink) examLink.className='sidebar-exam-item';
      show('sc-exam');
      renderExamQ();
    }
  } else {
    curSlide++;
    renderPlayer();
  }
}

function navBack(){
  if(curSlide > 0){ curSlide--; renderPlayer(); }
  else if(curMod > 0){ curMod--; curSlide=MODULES[curMod].slides.length; renderPlayer(); }
}

// ── Exam ────────────────────────────────────────────────────────────────
function renderExamQ(){
  const q   = EXAM[examCur];
  const pct = Math.round((examCur / EXAM.length)*100);
  document.getElementById('exam-fill').style.width = pct + '%';
  document.getElementById('exam-pt').textContent   = \`Q \${examCur+1} of \${EXAM.length}\`;
  document.getElementById('exam-sc').textContent   = \`Q \${examCur+1} of \${EXAM.length}\`;
  document.getElementById('exam-back').style.display = examCur>0?'inline-block':'none';
  document.getElementById('exam-fwd').textContent =
    examCur===EXAM.length-1 ? 'Submit Assessment' : 'Next →';
  const ex  = examDone[examCur];
  const sel = examAns[examCur];
  const oh  = q.options.map((opt,oi)=>{
    let cl='exam-opt';
    if(ex){ if(oi===q.answer)cl+=' ok'; else if(oi===sel&&oi!==q.answer)cl+=' no'; }
    else if(oi===sel) cl+=' sel';
    const clk = ex?'':('onclick="pickExam('+oi+')"');
    return \`<div class="\${cl}" \${clk}><div class="exam-ol">\${LT[oi]}</div><span>\${opt}</span></div>\`;
  }).join('');
  let fb='';
  if(ex){ if(sel===q.answer) fb=\`<div class="exam-fb show exam-fb-ok">✓ Correct — \${q.ref}</div>\`;
    else fb=\`<div class="exam-fb show exam-fb-no">✗ Correct: <strong>\${LT[q.answer]}. \${q.options[q.answer]}</strong> — \${q.ref}</div>\`; }
  document.getElementById('exam-qa').innerHTML =\`
    <div class="exam-q-block">
      <span class="exam-mod-badge">\${q.module}<span class="exam-ref">\${q.ref}</span></span>
      <div class="exam-qnum">Question \${examCur+1} of \${EXAM.length}</div>
      <div class="exam-qtext">\${q.q}</div>
      <div class="exam-opts">\${oh}</div>
      \${fb}
    </div>\`;
  // Update sidebar progress
  const answered = examDone.filter(Boolean).length;
  document.getElementById('ex-sb-fill').style.width = Math.round((answered/EXAM.length)*100)+'%';
  document.getElementById('ex-sb-label').textContent = answered+' of '+EXAM.length+' answered';
}

function pickExam(oi){
  if(examDone[examCur]) return;
  examAns[examCur]=oi; examDone[examCur]=true;
  renderExamQ();
}

function examNext(){
  if(!examDone[examCur]){ alert('Please select an answer before continuing.'); return; }
  if(examCur<EXAM.length-1){ examCur++; renderExamQ(); }
  else showResults();
}

function examPrev(){
  if(examCur>0){ examCur--; renderExamQ(); }
}

// ── Results ─────────────────────────────────────────────────────────────
function showResults(){
  show('sc-results');
  let correct=0;
  const mm={};
  EXAM.forEach((q,i)=>{
    if(examAns[i]===q.answer) correct++;
    if(!mm[q.module]) mm[q.module]={c:0,t:0};
    mm[q.module].t++;
    if(examAns[i]===q.answer) mm[q.module].c++;
  });
  const pct  = Math.round((correct/EXAM.length)*100);
  const pass = pct===100;

  const ring = document.getElementById('res-ring');
  ring.className = 'score-ring '+(pass?'ring-pass':'ring-fail');
  document.getElementById('res-pct').textContent   = correct+'/'+EXAM.length;
  document.getElementById('res-label').textContent = pass?'PASSED':'NOT PASSED';

  const rt = document.getElementById('res-title');
  rt.className = 'results-title '+(pass?'rt-pass':'rt-fail');
  rt.textContent = pass ? '✓ Assessment Passed' : '✗ Assessment Not Passed';

  document.getElementById('res-sub').innerHTML = pass
    ? \`Congratulations, <strong>\${studentName}</strong>. You scored \${correct}/\${EXAM.length} (100%) and have satisfied the BSIS assessment requirement per ${course.bpcRef}.\`
    : \`You scored \${correct}/\${EXAM.length} (\${pct}%). A score of 100% is required per ${course.bpcRef}. Review incorrect answers and retake the full assessment.\`;

  let bh='<h3>Score by Module</h3>';
  for(const[m,d] of Object.entries(mm)){
    const mp=Math.round((d.c/d.t)*100);
    bh+=\`<div class="bd-row"><span style="color:var(--gray)">\${m}</span><span class="\${d.c===d.t?'bd-pass':'bd-fail'}">\${d.c}/\${d.t} (\${mp}%)</span></div>\`;
  }
  bh+=\`<div class="bd-row"><span>Overall</span><span class="\${pass?'bd-pass':'bd-fail'}">\${correct}/\${EXAM.length} (\${pct}%)</span></div>\`;
  document.getElementById('res-breakdown').innerHTML=bh;

  let btns = pass
    ? \`<button class="r-btn r-primary" onclick="showCert()">View Certificate →</button>\` : '';
  btns += \`<button class="r-btn r-outline" onclick="retakeExam()">\${pass?'Retake':'↺ Retake Assessment'}</button>\`;
  document.getElementById('res-btns').innerHTML=btns;

  document.getElementById('res-note').innerHTML = pass
    ? \`<strong>BSIS Compliance:</strong> This certificate satisfies the ${course.hours}-hour training requirement under ${course.bpcRef} and CA Labor Code §6401.9 (SB 553). Print and retain until your guard card expires — Title 16 CCR §643(b). MACCESS INC. PPO #122729 maintains your training record.\`
    : \`<strong>BSIS Requirement:</strong> 100% is required per ${course.bpcRef}. Full retake required. Review the feedback on incorrect answers in the assessment.\`;
}

function retakeExam(){
  examCur=0;
  examAns=new Array(EXAM.length).fill(null);
  examDone=new Array(EXAM.length).fill(false);
  show('sc-exam');
  renderExamQ();
}

// ── Certificate ──────────────────────────────────────────────────────────
function showCert(){
  const d = new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
  document.getElementById('cert-area').innerHTML=\`
    <div class="cert-eyebrow">Certificate of Completion</div>
    <div class="cert-stripe"></div>
    <div class="cert-co">MACCESS INC.</div>
    <div class="cert-ppo">Private Patrol Operator &nbsp;|&nbsp; PPO License #122729 &nbsp;|&nbsp; BSIS-Authorized Training Provider</div>
    <div class="cert-certifies">This certifies that</div>
    <div class="cert-name">\${studentName}</div>
    <div class="cert-body">has successfully completed the BSIS-compliant training course:</div>
    <div class="cert-course">${course.title}</div>
    <div class="cert-badge">Score: 100% ✓ Passing</div>
    <div class="cert-body">This completion satisfies the ${course.hours}-hour elective training requirement under ${course.bpcRef} and California BSIS training standards. This course also satisfies the annual employee training requirement of California Labor Code §6401.9 (SB 553, eff. July 1, 2024).<br/>Retain until guard card expires or is canceled — Title 16 CCR §643(b).</div>
    <div class="cert-stripe"></div>
    <div class="cert-sigs">
      <div class="cert-sig"><div class="cert-sig-line"></div><div class="cert-sig-label">Student Signature</div></div>
      <div class="cert-sig"><div class="cert-sig-line"></div><div class="cert-sig-label">Date: \${d}</div></div>
      <div class="cert-sig"><div class="cert-sig-line"></div><div class="cert-sig-label">Instructor — MACCESS INC.</div></div>
    </div>\`;
  show('sc-cert');
}

// ── Init: pre-render slide HTML ────────────────────────────────────────
// Inject server-side rendered HTML into module slides so the JS renderer
// doesn't need to duplicate the content rendering logic.
${course.modules.map((mod,mi) =>
  mod.slides.map((sl,si) => {
    const rendered = renderContent(sl.content)
      .replace(/\\/g,'\\\\').replace(/`/g,'\\`').replace(/\$/g,'\\$')
      .replace(/\n/g,' ');
    return `MODULES[${mi}].slides[${si}].renderedHTML = \`${rendered}\`;`;
  }).join('\n')
).join('\n')}

// Initialize first module sidebar
document.getElementById('sbms-0').textContent = '▶';
document.getElementById('sbm-0').classList.remove('locked');
</script>
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// BUILD + EXPORT
// ═══════════════════════════════════════════════════════════════════════════════
const fs   = require('fs');
const path = require('path');

function buildAll(outputDir) {
  outputDir = outputDir || '/home/claude';
  const results = [];
  for (const [key, course] of Object.entries(CATALOG)) {
    const html     = buildPlatformHTML(key, course);
    const outPath  = path.join(outputDir, `${key}-Test.html`);
    fs.writeFileSync(outPath, html);
    const kb = Math.round(fs.statSync(outPath).size / 1024);
    console.log(`  ✓ ${key}-Test.html (${kb} KB)`);
    results.push({ key, outPath });
  }
  return results;
}

module.exports = { buildAll, buildPlatformHTML, CATALOG };

// Standalone run
if (require.main === module) {
  console.log('\nMACCESS INC. — Course Platform Builder');
  console.log('Building purchasable course pages...\n');
  buildAll('/home/claude');
  console.log('\nDone. Open any -Test.html to preview the full platform.\n');
}
