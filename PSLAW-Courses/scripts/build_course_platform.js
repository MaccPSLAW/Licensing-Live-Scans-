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
          quiz:[
            {q:"California SB 553 (Labor Code \u00a76401.9) became effective on:",options:["January 1, 2024", "July 1, 2024", "January 1, 2025", "July 1, 2025"],answer:1,ref:"CA Labor Code \u00a76401.9 | SB 553"},
            {q:"Type 2 workplace violence is violence directed at employees by:",options:["Current or former coworkers", "Clients, patients, customers, or students", "Domestic partners entering the workplace", "Strangers with no legitimate relationship to the workplace"],answer:1,ref:"CA Labor Code \u00a76401.9 | Cal/OSHA"},
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
          quiz:[
            {q:"Which violence type does Cal/OSHA identify as a primary risk for security guards?",options:["Type 3 — worker-on-worker only", "Type 1 (external/criminal) and Type 2 (customer/client)", "Type 4 — personal relationship violence", "Type 2 and Type 3 only"],answer:1,ref:"CA Labor Code \u00a76401.9 | Cal/OSHA"},
            {q:"Domestic violence that enters the workplace is classified as:",options:["Type 1 — External/Criminal", "Type 2 — Customer/Client", "Type 3 — Worker on Worker", "Type 4 — Personal Relationship"],answer:3,ref:"CA Labor Code \u00a76401.9"},
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
          quiz:[
            {q:"A coworker repeatedly states 'I have nothing left to lose.' The guard should:",options:["Dismiss it as typical venting", "Confront the coworker privately", "Document precisely and report to a supervisor immediately", "Wait to see if the behavior escalates"],answer:2,ref:"BSIS Syllabus \u00a711.1"},
            {q:"A supervisor publicly humiliates a specific employee repeatedly and threatens their job. The guard should:",options:["Take the employee's side and confront the supervisor", "Document observations and report to MACCESS INC. management — do not take sides in personnel matters", "Ignore it — this is outside a security guard's role", "Advise the employee to file HR paperwork independently"],answer:1,ref:"BSIS Syllabus \u00a711.1"},
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
          quiz:[
            {q:"A client repeatedly seeks out and confronts the same security officer in a personally threatening manner. This is most likely:",options:["Type 1 — external criminal violence", "Type 4 — personal relationship violence", "Type 2 — client/customer targeted violence toward an employee", "Normal occupational friction"],answer:2,ref:"BSIS Syllabus \u00a711.1"},
            {q:"Applying different levels of scrutiny to employees based on race when enforcing workplace violence policies is:",options:["Acceptable based on statistical risk assessment", "A FEHA violation that creates civil liability", "A reasonable exercise of professional judgment", "Permissible when directed by the property owner"],answer:1,ref:"BSIS Syllabus \u00a711.3 | FEHA"},
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
          quiz:[
            {q:"The stage of the anger cycle where violence risk is highest is:",options:["The trigger stage", "The escalation stage", "The crisis stage", "The recovery stage"],answer:2,ref:"BSIS Syllabus \u00a711.2"},
            {q:"At which stage is conflict intervention MOST effective?",options:["Manifest — when open conflict is already occurring", "Felt — when emotions have heightened", "Potential — before conflict has erupted", "Crisis — at the peak of the escalation"],answer:2,ref:"BSIS Syllabus \u00a711.2"},
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
          quiz:[
            {q:"When a person is visibly angry and speaking loudly, a guard's most effective initial response is to:",options:["Raise their own voice to establish authority", "Match the person's energy level", "Lower their own voice and speak calmly — modeling the response they want", "Step back and say nothing until they finish"],answer:2,ref:"BSIS Syllabus \u00a711.2 | BPC \u00a77583.7(b)(6)"},
            {q:"After 2-3 minutes of verbal de-escalation with no progress, the correct next step is:",options:["Continue indefinitely — it always works eventually", "Apply physical restraint preemptively", "Request backup, notify a supervisor, and increase distance", "Issue a formal trespass warning immediately"],answer:2,ref:"BSIS Syllabus \u00a711.2 | MACCESS INC. Policy"},
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
          quiz:[
            {q:"A guard observes two employees having a heated argument. One employee's culture expresses disagreement loudly as a cultural norm. The guard should:",options:["Intervene immediately — loud voices always indicate danger", "Observe for actual threatening behaviors rather than assuming danger based on volume alone", "Contact law enforcement immediately", "Separate the employees preemptively"],answer:1,ref:"BSIS Syllabus \u00a711.3 | FEHA"},
            {q:"An employee with limited English attempts to report a threatening incident. The guard should:",options:["Direct the employee to return when an English speaker is available", "Document 'language barrier' and continue patrol", "Use a translation app, seek a bilingual colleague, or use visual aids — every employee has the right to report", "Accept only written reports from non-English speakers"],answer:2,ref:"BSIS Syllabus \u00a711.3 | CA Labor Code \u00a76401.9"},
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
          quiz:[
            {q:"In an active shooter situation, a security guard's FIRST priority is:",options:["Drawing any authorized weapon and moving toward the shooter", "Locking down the facility", "Evacuating themselves and others if a safe exit is available — the RUN protocol", "Calling MACCESS INC. management for authorization to respond"],answer:2,ref:"BSIS Syllabus \u00a711.4 | DHS Run-Hide-Fight"},
            {q:"CPTED stands for:",options:["California Protocols for Threat Evaluation and Detection", "Crime Prevention Through Environmental Design", "Comprehensive Physical Training and Emergency Drill", "Command Presence Training for Emergency Deployment"],answer:1,ref:"BSIS Syllabus \u00a711.4 | Cal/OSHA"},
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
          quiz:[
            {q:"After witnessing a violent incident, a guard's FIRST action should be:",options:["Complete a detailed written report before anything else", "Ensure immediate safety of all persons — call 911 if there is any threat to life — THEN notify supervisor", "Photograph the scene to preserve evidence", "Notify the client property manager before contacting MACCESS INC."],answer:1,ref:"BSIS Syllabus \u00a711.5"},
            {q:"SB 553 prohibits employers from:",options:["Requiring employees to report incidents within 24 hours", "Sharing Violent Incident Log data with Cal/OSHA", "Retaliating against employees who report threats or seek law enforcement help", "Maintaining records for more than 2 years"],answer:2,ref:"CA Labor Code \u00a76401.9 | SB 553"},
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
          quiz:[
            {q:"The Violent Incident Log required by CA Labor Code \u00a76401.9 must be retained for a minimum of:",options:["1 year", "2 years", "3 years", "5 years"],answer:3,ref:"CA Labor Code \u00a76401.9"},
            {q:"The Violent Incident Log must be made available to:",options:["Only BSIS auditors upon request", "Only law enforcement with a valid warrant", "Employees and Cal/OSHA on request", "Only the employer's insurance carrier"],answer:2,ref:"CA Labor Code \u00a76401.9"},
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
            ],
          quiz:[
            {q:"Your authority as a security guard comes from:",options:["Your BSIS guard card", "BPC §7583.7 training completion", "PC §837 — the citizen's arrest statute", "Your employer's PPO license"],answer:2,ref:"PC \u00a7837"},
            {q:"A security guard's arrest authority exists:",options:["Statewide under their BSIS license", "Only on their assigned post during their assigned shift", "Anywhere in the county they are assigned", "Wherever the property owner directs them"],answer:1,ref:"BPC \u00a77582.1"},
          ],
        },
          { heading:"PC §837 — Three Conditions for Citizen's Arrest", subheading:"PC §837(1)(2)(3) | The Only Legal Basis",
            content:[
              { type:"stagelist", items:[
                { num:"1", label:"PC §837(1) — In Your Presence", text:"A public offense is committed or attempted in your direct personal presence and observation", color:"#1A5C3A" },
                { num:"2", label:"PC §837(2) — Felony You Know Was Committed", text:"You have personal knowledge (not just a report) that a felony was committed by this specific person", color:"#1B2B5E" },
                { num:"3", label:"PC §837(3) — Reasonable Cause (Felony)", text:"Reasonable cause to believe the person committed a felony that actually occurred in fact. Highest liability risk.", color:"#8B1A1A" },
              ]},
              { type:"rule", text:"Misdemeanor arrests REQUIRE personal observation (§837(1)). You cannot arrest for a misdemeanor you did not personally witness — even on a report from management." },
            ],
          quiz:[
            {q:"PC \u00a7837(1) allows a citizen's arrest when a public offense is:",options:["Reported by a witness", "Suspected based on prior history", "Committed or attempted in the guard's direct personal presence", "Captured on CCTV footage"],answer:2,ref:"PC \u00a7837(1)"},
            {q:"A guard can NEVER make a citizen's arrest for a misdemeanor if:",options:["The offense occurred on private property", "The person is not a repeat offender", "The guard did not personally witness the offense", "The offense occurred after business hours"],answer:2,ref:"PC \u00a7837 | Misdemeanors"},
          ],
        },
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
            ],
          quiz:[
            {q:"A guard who represents themselves as a police officer may be charged under:",options:["BPC §7583.6", "PC §538d — a criminal offense", "Title 16 CCR §643", "BPC §480 only"],answer:1,ref:"PC \u00a7538d"},
            {q:"A security guard's search authority during a lawful detention is limited to:",options:["A full search of clothing and bags", "An unlimited search on private property", "A safety pat-down for weapons only", "Any search authorized by the property owner"],answer:2,ref:"4th Amendment | PC \u00a7837"},
          ],
        },
          { heading:"Criminal, Civil & Administrative Liability", subheading:"PC §242 | BPC §480 | Respondeat Superior",
            content:[
              { type:"typecards", items:[
                { label:"Criminal Liability", text:"Battery (PC §242), assault, false imprisonment, kidnapping (PC §207 — if you move the person). Criminal charges against you personally.", color:"#8B1A1A" },
                { label:"Civil Liability", text:"False arrest tort — compensatory and punitive damages. Wrongful death. Intentional infliction of emotional distress.", color:"#7B4500" },
                { label:"Administrative", text:"BSIS guard card suspension or revocation under BPC §480. Civil penalties and fines.", color:"#1B2B5E" },
                { label:"PPO Liability", text:"MACCESS INC. may be vicariously liable for your wrongful acts under respondeat superior doctrine.", color:"#005C5C" },
              ]},
            ],
          quiz:[
            {q:"All three types of liability \u2014 criminal, civil, and administrative \u2014 can arise:",options:["Only from the most serious incidents involving death or injury", "From a single incident simultaneously", "From separate incidents only — they cannot all apply at once", "Only from incidents reported to BSIS within 24 hours"],answer:1,ref:"PC \u00a7\u00a7236,242 | BPC \u00a7480 | Tort Law"},
            {q:"BSIS administrative liability under BPC \u00a7480 can result in:",options:["Criminal prosecution only", "Only a written warning for first offenses", "Suspension or revocation of the guard card", "A civil judgment for damages"],answer:2,ref:"BPC \u00a7480"},
          ],
        },
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
            ],
          quiz:[
            {q:"Under PC \u00a7490.5, a guard may detain a shoplifting suspect when:",options:["A manager reports the theft", "The guard has probable cause from direct personal observation", "The loss prevention system flags the person", "Any store employee reports the theft"],answer:1,ref:"PC \u00a7490.5"},
            {q:"For a trespass arrest to be lawful, the guard must have:",options:["Written authorization from the property owner", "Personally witnessed the refusal to leave after a lawful order", "Police authorization in advance", "A prior written trespass warning on file"],answer:1,ref:"PC \u00a7602"},
          ],
        },
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
            ],
          quiz:[
            {q:"Falsifying an incident report may result in:",options:["A verbal warning only", "A civil fine only", "Termination and BSIS license revocation", "No consequences if the incident was minor"],answer:2,ref:"BSIS Ethics"},
            {q:"After making a citizen's arrest, the guard must deliver the subject to police:",options:["Within 4 hours", "At the end of the shift", "Without unnecessary delay", "After completing the written report"],answer:2,ref:"PC \u00a7847"},
          ],
        },
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
            ],
          quiz:[
            {q:"The standard for evaluating a security guard's use of force under California law is:",options:["Whatever the guard personally felt was necessary", "Objectively reasonable under the circumstances", "Whatever the property owner authorizes", "Whatever force stops the situation"],answer:1,ref:"BPC \u00a77583.7 | Graham v. Connor"},
            {q:"Force must be reduced or stopped when:",options:["The subject verbally protests", "The guard's supervisor arrives", "The threat that justified the force no longer exists", "The guard has documented the incident"],answer:2,ref:"BPC \u00a77583.7 | Proportionality"},
          ],
        },
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
            ],
          quiz:[
            {q:"In the force continuum, which response should always be attempted first?",options:["Physical restraint", "Verbal commands and de-escalation", "Drawing any authorized weapon", "Calling police before any action"],answer:1,ref:"Use of Force Continuum"},
            {q:"Using force after a subject has submitted and the threat has ended is:",options:["Acceptable to ensure full compliance", "Required for documentation purposes", "Excessive force — and potentially criminal", "At the guard's discretion"],answer:2,ref:"BPC \u00a77583.7 | Proportionality"},
          ],
        },
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
            ],
          quiz:[
            {q:"The four core concepts of de-escalation per BSIS training are:",options:["Run, Hide, Fight, Report", "Self-control, Effective Communication, Scene Assessment, Force Options", "Observe, Orient, Decide, Act", "Approach, Contain, Communicate, Resolve"],answer:1,ref:"BPC \u00a77583.7(b)(6)"},
            {q:"Which tactical method uses distance and barriers to reduce threat and buy time?",options:["Restraint", "Escalation of force", "Time, distance, cover, and concealment", "Verbal confrontation"],answer:2,ref:"BPC \u00a77583.7(b)(6)"},
          ],
        },
          { heading:"When Force IS and IS NOT Justified", subheading:"BPC §7583.7(b)(2) | Proportionality",
            content:[
              { type:"twocol",
                left:{ heading:"Force IS Justified", items:["Active physical aggression toward you or another person","Imminent threat of serious bodily injury — objectively reasonable belief","Subject is armed and threatening imminent attack","Threat level exceeds what verbal and soft control can address"] },
                right:{ heading:"Force Is NOT Justified", items:["Passive resistance alone — refusal to move","Verbal abuse or profanity — words alone","Property protection alone — baton cannot be used solely for property","After the threat has ended and subject is controlled","Punishment or intimidation after control is established"] }
              },
            ],
          quiz:[
            {q:"A guard uses a pain compliance hold on a cooperative subject who declined to show ID. This is:",options:["Lawful — compliance with ID checks can be enforced", "Potentially excessive — the situation did not justify that level of force", "Lawful if the client contract permits it", "Required protocol per BSIS"],answer:1,ref:"BPC \u00a77583.7(b)(2) | Proportionality"},
            {q:"Baton force against a subject who is passively sitting and refusing to move is:",options:["Justified — passive resistance is still resistance", "Potentially justified if directed by management", "Not justified — baton-level force requires active aggression", "At the guard's discretion"],answer:2,ref:"BPC \u00a77583.7 | Force Continuum"},
          ],
        },
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
            ],
          quiz:[
            {q:"A guard whose enforcement decisions are influenced by a visitor's race is:",options:["Exercising professional judgment", "Violating PC §13519.4 and FEHA — creating civil liability", "Applying statistically informed risk assessment", "Acting within authorized discretion"],answer:1,ref:"FEHA | PC \u00a713519.4"},
            {q:"Documenting race as the reason for approaching a subject is:",options:["Required for accurate record-keeping", "Acceptable when race is the primary reason for suspicion", "Never acceptable — document specific observed behaviors only", "Required by BSIS for profiling data collection"],answer:2,ref:"FEHA | Civil Rights Law"},
          ],
        },
          { heading:"Respect, Attitude & Command Presence", subheading:"BSIS Ethics | Professional Standards",
            content:[
              { type:"bullets", items:["Command presence: projecting calm authority through posture and demeanor — not aggression","Treat every person with equal dignity regardless of appearance, behavior, or perceived status","Apply the same enforcement standard to everyone — consistency is your legal protection","Your appearance reflects MACCESS INC., the client, and the profession — clean uniform required","Ethics: honest in all reports, minimum necessary force, no conflicts of interest, no gratuities","Falsifying a report = crime + BSIS revocation + personal perjury exposure in legal proceedings"] },
            ],
          quiz:[
            {q:"Command presence means:",options:["Being physically intimidating and aggressive", "Projecting calm authority through posture and professional demeanor", "Always having a hand near your authorized equipment", "Speaking loudly in all situations"],answer:1,ref:"BSIS Ethics"},
            {q:"A guard with a consistently negative attitude toward the public creates:",options:["A stronger deterrent effect", "Liability for themselves and for MACCESS INC.", "A more efficient security operation", "No professional concern — attitude is subjective"],answer:1,ref:"BSIS Ethics | BPC \u00a77583.6(b)"},
          ],
        },
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
            ],
          quiz:[
            {q:"Active listening during a crisis interaction requires the guard to:",options:["Wait for their turn to speak while preparing their next command", "Focus primarily on identifying grounds for arrest", "Fully attend to the person, acknowledge concerns, and confirm understanding", "Document the conversation in real time"],answer:2,ref:"BSIS Training Manual"},
            {q:"A guard who validates a person's emotion is:",options:["Agreeing with their position and supporting their grievance", "Acknowledging how they feel without condoning their behavior", "Telling them their anger is justified and correct", "Remaining silent to avoid inflaming the situation"],answer:1,ref:"BSIS Training Manual"},
          ],
        },
          { heading:"Substance Abuse, Mental Illness & Professional Ethics", subheading:"BSIS Training Manual | BSIS Code of Ethics",
            content:[
              { type:"twocol",
                left:{ heading:"Recognizing Impairment", items:["Stimulants (meth/cocaine): rapid speech, agitation, dilated pupils, excessive energy","CNS depressants (alcohol/opioids): slurred speech, staggering, pinpoint pupils, slow response","Mental health crisis: disorganized speech, paranoia, responding to things others can't perceive","Document behaviors — never diagnose","Call 911 for mental health support — do not try to manage crisis alone"] },
                right:{ heading:"Professional Ethics", items:["Honest in all reports — no falsification ever","Minimum necessary force — always","No gifts or gratuities from clients or vendors","Social media: never post client, incident, or post location information","When in doubt: call MACCESS INC. management before acting","You represent MACCESS INC. and the profession 24/7 while in uniform"] }
              },
            ],
          quiz:[
            {q:"Signs of stimulant intoxication (methamphetamine, cocaine) include:",options:["Slurred speech, drooping eyelids, and slow reaction time", "Rapid speech, heightened agitation, dilated pupils, excessive energy", "Calm demeanor with marked disorientation", "Confusion and extremely slow response"],answer:1,ref:"BSIS Training Manual"},
            {q:"If a supervisor instructs a guard to falsify an incident report, the guard should:",options:["Comply — supervisors have authority over report content", "Comply only if the incident was minor", "Refuse and report the request to MACCESS INC. management", "Complete as directed but note it privately"],answer:2,ref:"BSIS Code of Ethics"},
          ],
        },
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
            ],
          quiz:[
            {q:"Which should NEVER appear in a security incident report?",options:["The precise time and date", "Direct quotes from witnesses", "The guard's personal opinions, speculation, or conclusions", "A physical description of persons involved"],answer:2,ref:"BSIS Training Standards"},
            {q:"An incident report should ideally be completed:",options:["At the end of the shift", "Within 72 hours", "As close to the incident as possible — ideally within 1 hour", "Only after consulting with a supervisor"],answer:2,ref:"BSIS Training Standards"},
          ],
        },
          { heading:"What to Include — Required Report Elements", subheading:"BSIS Standards | Legal Documentation",
            content:[
              { type:"bullets", items:["Date, time, and exact location (address, floor, area)","Description of events in chronological order","Parties involved: sex, race, approximate age, height, weight, hair, clothing, distinctive marks","Witnesses: names and contact information if available","Actions taken by the guard: verbal commands, physical actions, calls made, persons notified","Evidence observed or secured — describe, do not move unless for safety","Outcome: subject detained, released, turned over to police, medical response","Your name, guard card number, and MACCESS INC. PPO #122729 on every report"] },
            ],
          quiz:[
            {q:"A guard discovers a factual error in a submitted report. They should:",options:["Destroy it and write a new one", "Draw a single line through the error, write the correction, initial and date — never erase", "Leave it in place — already submitted", "Ask a colleague to correct it"],answer:1,ref:"BSIS Training Standards"},
            {q:"Security incident reports must be written in:",options:["First person — 'I observed...', 'I heard...'", "Third person to appear objective", "Passive voice to avoid blame", "Abbreviated shorthand for efficiency"],answer:0,ref:"BSIS Training Standards"},
          ],
        },
        ],
      },
      { num:2, title:"Patrol, Questioning & Suspicious Activity", duration:"25 min", icon:"👁️",
        slides:[
          { heading:"Patrol Techniques & Observation", subheading:"BSIS Training Manual | Effective Security Patrol",
            content:[
              { type:"bullets", items:["Vary patrol route AND timing — predictable patrols are exploitable","Know the baseline: what is normal so anomalies stand out","Use all senses: sight, sound, smell (smoke, gas, chemicals)","Log every round: start/end time, route, all observations — 'nothing to report' must still be logged","Report immediately: propped doors, broken locks, unfamiliar vehicles, unusual odors, unauthorized persons","Night observation: use peripheral vision, not direct stare"] },
              { type:"rule", text:"Vary patrol route AND timing every single round. Same-time same-route patrols advertise your schedule to anyone watching." },
            ],
          quiz:[
            {q:"Effective patrol technique requires a guard to:",options:["Follow the identical route at the same time every round", "Vary both the timing and route to avoid a predictable pattern", "Minimize movement to preserve energy", "Stay at a central observation point"],answer:1,ref:"BSIS Training Manual"},
            {q:"A guard discovers a propped emergency exit that is normally secured. The correct response is:",options:["Assume it was left opened accidentally and continue patrol", "Close the door, document it in the shift log, and notify the supervisor", "Leave it and report only if still open at end of shift", "Alert law enforcement immediately"],answer:1,ref:"BSIS Training Manual"},
          ],
        },
          { heading:"Questioning Techniques & Documenting Suspicious Activity", subheading:"BSIS Training Manual | Legal Limits on Questioning",
            content:[
              { type:"twocol",
                left:{ heading:"Questioning — Do's", items:["Open-ended first: 'What brings you here today?'","Confirm with closed: 'Were you here yesterday?'","Neutral framing: 'Can you help me understand what happened?'","Document exact quotes: He said, 'I was just looking around'","You cannot compel answers — questioning is voluntary"] },
                right:{ heading:"BOLO Description Format", items:["Sex | Race | Age | Height | Weight","Hair: color, length, style","Eyes: color if observed","Clothing: colors, brands, footwear","Distinctive features: tattoos, scars, glasses","Direction of travel","Vehicle: make, model, color, plate state + number"] }
              },
              { type:"rule", text:"Never document race as the reason for suspicion. Document specific observed behaviors only. A BOLO must be as specific and accurate as possible." },
            ],
          quiz:[
            {q:"An open-ended question is designed to:",options:["Confirm a specific fact with yes or no", "Limit the subject to a defined set of responses", "Encourage a detailed narrative response providing maximum information", "Direct the subject toward a predetermined answer"],answer:2,ref:"BSIS Training Manual"},
            {q:"A guard should NEVER document which of the following as the basis for suspicious activity:",options:["A person photographing security cameras", "An unattended bag in an unusual location", "A person's race or ethnicity", "A vehicle circling the property multiple times"],answer:2,ref:"BSIS Training Manual | FEHA"},
          ],
        },
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
            ],
          quiz:[
            {q:"Before transmitting on a radio, a guard should:",options:["Speak immediately — delays waste time", "Listen to confirm the channel is clear, press PTT, wait one second, then speak", "Announce their full name and location before every transmission", "Contact dispatch for permission to transmit"],answer:1,ref:"BSIS Training Manual"},
            {q:"Every contact and observation must be:",options:["Reported verbally to a supervisor only", "Logged in writing — who, when, what was communicated, and the response", "Kept private unless a formal incident occurs", "Reported only if unusual or out of the ordinary"],answer:1,ref:"BSIS Training Manual"},
          ],
        },
          { heading:"Calling 911 & Briefing Law Enforcement", subheading:"911 Protocol | Law Enforcement Arrival",
            content:[
              { type:"stagelist", items:[
                { num:"1", label:"LOCATION FIRST", text:"Full address, building, floor, exact area — location before anything else", color:"#8B1A1A" },
                { num:"2", label:"NATURE OF EMERGENCY", text:"Crime in progress, medical, fire, active shooter — be specific", color:"#7B4500" },
                { num:"3", label:"PERSONS INVOLVED", text:"Number, location, suspect description, any weapons visible", color:"#1B2B5E" },
                { num:"4", label:"YOUR IDENTITY", text:"Your name and callback number — STAY ON THE LINE until dispatcher releases you", color:"#1A5C3A" },
              ]},
              { type:"rule", text:"When law enforcement arrives: hands visible at all times. Brief officers: situation, parties, hazards, actions taken. Transfer custody of any citizen's arrest subject immediately." },
            ],
          quiz:[
            {q:"When placing a 911 call, the guard must provide which information FIRST?",options:["Their BSIS license number and PPO name", "Location — full address, building, floor, and specific area", "Only their name and company", "A complete incident report summary"],answer:1,ref:"BSIS Training Manual | 911"},
            {q:"When law enforcement arrives at a security incident, the guard should:",options:["Continue managing until officers formally request handoff", "Present the written report before briefing verbally", "Provide a brief accurate verbal briefing: situation, parties, hazards, actions taken", "Step back entirely and have no further communication"],answer:2,ref:"BSIS Training Manual"},
          ],
        },
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
            ],
          quiz:[
            {q:"When paramedics arrive at a scene, a security guard's role is to:",options:["Continue providing first aid alongside paramedics", "Clear the area, brief paramedics on the situation, and stand by for instructions", "Take over crowd control only — do not speak to medical personnel", "Document the paramedics' clinical actions in full detail"],answer:1,ref:"BSIS Training Manual"},
            {q:"A guard discovers a strong odor of natural gas. The correct immediate action is:",options:["Locate and attempt to seal the leak", "Use the radio to report while investigating", "Evacuate immediately without using any electrical switches or radio — call 911 from a safe distance", "Document in the shift log and notify the property manager"],answer:2,ref:"Cal/OSHA | BSIS Training Manual"},
          ],
        },
          { heading:"Non-Verbal Communication & Professional Presence", subheading:"BSIS Training Manual | Body Language as a Security Tool",
            content:[
              { type:"bullets", items:["Posture: upright and alert — signals confidence and authority","Eye contact: professional, not aggressive staring — avoiding eye contact signals uncertainty","Hands: visible and open — closed fists or crossed arms signal aggression","Proximity: maintain appropriate distance — do not crowd","Tone of voice: calm, controlled, even — never match an agitated person's energy","Facial expression: neutral and professional — visible contempt escalates every situation","Announce movements in tense situations: 'I'm going to step back now'"] },
            ],
          quiz:[
            {q:"A security guard's body language on post should convey:",options:["Physical dominance to deter potential threats", "Professional alertness, calm confidence, and an approachable demeanor", "Deliberate disengagement to reduce confrontations", "Visible deference and submission to reduce escalation"],answer:1,ref:"BSIS Training Manual"},
            {q:"Tone of voice in a tense interaction should be:",options:["Loud and firm to establish authority", "Matched to the agitated person's energy level", "Calm, controlled, and even — never matching an agitated person's energy", "Soft and apologetic to defuse tension"],answer:2,ref:"BSIS Training Manual"},
          ],
        },
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
            ],
          quiz:[
            {q:"'Respondeat superior' establishes that:",options:["Guards are personally liable for all use-of-force incidents", "Employers may be vicariously liable for employee wrongful acts within scope of employment", "Property owners are responsible for all incidents on their premises", "BSIS bears liability for improperly trained guards"],answer:1,ref:"Respondeat Superior"},
            {q:"A PPO that fails to verify a guard's baton permit before a baton-authorized assignment may face:",options:["Only a minor administrative warning", "Negligent hiring liability and BSIS fines", "No liability — the guard is personally responsible", "Liability only if the guard uses the baton improperly"],answer:1,ref:"Negligent Hiring | BPC \u00a77585.19"},
          ],
        },
          { heading:"Criminal, Civil & Administrative Liability", subheading:"PC §§236, 242, 207 | BPC §480 | Title 16 CCR",
            content:[
              { type:"twocol",
                left:{ heading:"Criminal & Civil", items:["PC §242 Battery: willful unlawful use of force on another person","PC §240 Assault: unlawful attempt to commit violent injury","PC §236 False Imprisonment: unlawful restraint","PC §207 Kidnapping: forcibly moving a person","PC §538d Impersonating a peace officer — criminal + BSIS revocation","Civil: compensatory + punitive damages, ADA/FEHA violations"] },
                right:{ heading:"Administrative (BSIS)", items:["Guard card suspension or revocation — BPC §480","Civil penalties under Title 16 CCR","PPO license discipline for negligent training or hiring","Mandatory incident reporting — BPC §7583.2","All three types can arise simultaneously from a single incident","BSIS may audit records at any time — maintain all documentation"] }
              },
            ]},
        ],
      },
      { num:2, title:"BSIS Regulations & Guard's Legal Role", duration:"30 min", icon:"📋",
        slides:[
          { heading:"Key BSIS Statutes — What You Must Know", subheading:"BPC §7583 et seq. | Title 16 CCR | SB 652",
            content:[
              { type:"bullets", items:["BPC §7583.6: Training requirements — 8 hrs PTA/AUF pre-registration; 32 hrs skills within 6 months; 8 hrs annual CE","BPC §7583.7: PTA and AUF — 100% exam score required. Single provider per SB 652 (eff. Jan 1, 2026)","BPC §7583.9: Criminal history background check — DOJ + FBI via Live Scan required for all applicants","BPC §7583.20: Guard card renewal — must renew within 60 days of expiration or registration is canceled ($44 fee)","BPC §480: Grounds for denial/revocation — certain criminal convictions disqualify applicants","Title 16 CCR §643(b): Certificate requirements — provider name, BSIS license number, course name, dates, hours, serial number"] },
            ],
          quiz:[
            {q:"Under SB 652 (eff. Jan 1, 2026), the 8-hour PTA/AUF training must be completed by:",options:["Any two BSIS-approved providers", "The applicant's employer only", "A single BSIS-approved course provider", "An online provider plus a separate in-person facility"],answer:2,ref:"BPC \u00a77583.7 | SB 652"},
            {q:"A guard card may be renewed with a delinquency fee within how many days of expiration?",options:["30 days", "60 days", "90 days", "120 days"],answer:1,ref:"BPC \u00a77583.20"},
          ],
        },
          { heading:"The Legal Role of a Security Guard", subheading:"BPC §7582.1 | PC §837 | PC §490.5",
            content:[
              { type:"twocol",
                left:{ heading:"What Guards CAN Do", items:["Protect persons and property on assigned post (BPC §7582.1)","Make citizen's arrests under PC §837 when lawful conditions are met","Detain shoplifting suspects under PC §490.5 with probable cause from personal observation","Use reasonable proportionate force during lawful citizen's arrest","Observe and document incidents for law enforcement"] },
                right:{ heading:"What Guards CANNOT Do", items:["Claim or imply peace officer authority — PC §538d (criminal)","Conduct searches beyond safety pat-down during lawful detention","Compel answers to questions","Hold a citizen's arrest subject longer than necessary before delivering to police","Act outside their assigned post or off-duty","Annual CE: 8 hours/year including 2 hours AUF review — required for license maintenance"] }
              },
            ],
          quiz:[
            {q:"Under BPC \u00a77582.1, a security guard is employed to:",options:["Enforce municipal laws and ordinances", "Arrest persons suspected of crimes on public property", "Protect persons or property or prevent theft for a licensed PPO", "Conduct criminal investigations for law enforcement"],answer:2,ref:"BPC \u00a77582.1"},
            {q:"The annual CE requirement for registered security guards includes a minimum of how many hours of AUF review?",options:["1 hour", "2 hours", "4 hours", "8 hours"],answer:1,ref:"BPC \u00a77583.6(e)"},
          ],
        },
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
            ],
          quiz:[
            {q:"A guard who carries a baton without a BSIS Baton Permit may be charged with:",options:["A misdemeanor and $100 fine", "A felony violation of PC §22001", "Only a BSIS administrative penalty", "Nothing — the guard card is sufficient"],answer:1,ref:"PC \u00a722001 | BPC \u00a77583.33"},
            {q:"A baton permit expires every:",options:["1 year", "2 years — renewal requires an 8-hour refresher", "3 years", "5 years"],answer:1,ref:"BSIS Baton Fact Sheet 2024"},
          ],
        },
          { heading:"Criminal, Civil & Vicarious Liability", subheading:"PC §§242, 245 | BPC §7585.19 | Respondeat Superior",
            content:[
              { type:"typecards", items:[
                { label:"Criminal", text:"PC §242 Battery, PC §245 Assault with deadly weapon (baton qualifies), PC §22001 carrying without permit (felony). Criminal prosecution is independent of civil suits.", color:"#8B1A1A" },
                { label:"Civil", text:"Excessive force tort — compensatory and punitive damages. Wrongful death if baton use results in death. Intentional infliction of emotional distress.", color:"#7B4500" },
                { label:"PPO (MACCESS INC.)", text:"Vicariously liable for guard's actions in scope of employment. Negligent hiring (not verifying permit) and negligent training create additional exposure. BPC §7585.19: $100–$1,000 fines per violation.", color:"#1B2B5E" },
              ]},
            ],
          quiz:[
            {q:"If MACCESS INC. allows a guard to carry a baton before completing training and receiving a permit, the company may be fined:",options:["$100", "$300", "$2,500", "Nothing — the PPO's license is automatically revoked"],answer:2,ref:"BPC \u00a77585.19"},
            {q:"The baton is defined under California law as:",options:["An offensive weapon", "A defensive tool — to protect yourself and others", "A less-lethal firearm alternative", "Standard equipment authorized by the guard card"],answer:1,ref:"BSIS Baton Manual Preface"},
          ],
        },
        ],
      },
      { num:2, title:"Baton Types, Vital Areas & Force Continuum", duration:"30 min", icon:"🔩",
        slides:[
          { heading:"Baton Types & Vital Areas", subheading:"BSIS Baton Manual Ch. 3 & 5 | Authorized Types for California Guards",
            content:[
              { type:"h3", text:"Four Authorized Baton Types" },
              { type:"bullets", items:["Straight Baton: single-grip straight, 22-26 inches, solid or hollow. Ring carrier required.","Straight Expandable (ASP): telescoping — collapses for carry, expands on deployment. Holster required.","Side-Handle Baton (PR-24): T-shaped — perpendicular handle allows blocking techniques. Side-handle ring required.","Side-Handle Expandable: combines side-handle blocking with compact expandable design.","Guards may only carry the type for which they were trained. Switching types requires additional training."] },
              { type:"alert", text:"VITAL AREAS — PROHIBITED STRIKE ZONES (unless facing imminent death or serious bodily injury): A-Head | B-Throat/Neck | C-Spine | D-Kidneys | E-Groin | F-Sternum/Solar Plexus | G-Knees. All 7 must be correctly named on the permit exam." },
            ],
          quiz:[
            {q:"During a non-life-threatening situation, the baton should NOT be used to strike above the:",options:["Waist", "Shoulders", "Groin", "Knees"],answer:1,ref:"BSIS Baton Manual Ch. 5"},
            {q:"Which of the following IS a vital area that must be avoided in non-lethal-force situations?",options:["Outer thigh", "Upper arm", "Spine", "Calf"],answer:2,ref:"BSIS Baton Manual Ch. 5"},
          ],
        },
          { heading:"Force Continuum with Baton & Authorized Target Areas", subheading:"BSIS Baton Manual Ch. 2 & 5 | Proportionality",
            content:[
              { type:"bullets", items:["Baton use is justified ONLY at active aggression level or above — always exhaust verbal and soft control first","Authorized target areas: common peroneal nerve (outer thigh/knee), radial nerve (outer forearm), inner thigh, upper arms, calf/lower leg","Baton use must stop immediately when the threat stops — continuing after submission is excessive force and criminal","Every deployment of the baton — even if no contact is made — must be reported in writing within 1 hour","Call 911 immediately for ANY baton contact resulting in visible injury or loss of consciousness"] },
              { type:"callout", label:"Exam Requirement", text:"BSIS Baton Written Exam: 24 questions, pass ≥ 20/24 AND correctly identify all 7 vital areas. Both components required. Issued only by BSIS-certified Baton Training Facility (TFB)." },
            ],
          quiz:[
            {q:"The BSIS Baton Written Exam passing requirement is:",options:["100% on all 24 questions", "At least 20/24 AND correctly identify all 7 vital areas", "At least 20/24 — vital areas identification is optional", "At least 18/24"],answer:1,ref:"BSIS Baton Manual Admin. Procedures"},
            {q:"Every deployment of the baton \u2014 even if no contact is made \u2014 must be:",options:["Reported to BSIS directly within 24 hours", "Reported in writing to the supervisor within 1 hour", "Kept confidential per client contract", "Photographed before leaving the scene"],answer:1,ref:"BPC \u00a77583.2 | MACCESS INC. Policy"},
          ],
        },
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
            ],
          quiz:[
            {q:"The baseline situational awareness level for all on-duty guards is:",options:["White — relaxed and unaware", "Yellow — relaxed alertness with environmental awareness", "Orange — focused on a specific potential threat", "Red — prepared to immediately take action"],answer:1,ref:"Cooper Color Code | BSIS Training Manual"},
            {q:"The most important initial observation when approaching an unknown subject is:",options:["The subject's facial expression", "The subject's hands — the primary source of potential threats", "The subject's clothing and apparent socioeconomic status", "The subject's race and gender"],answer:1,ref:"BSIS Training Manual"},
          ],
        },
          { heading:"Safe Subject Contact — Approach & Positioning", subheading:"BSIS Syllabus §4.2 | Subject Contact Procedures",
            content:[
              { type:"bullets", items:["Maintain reactionary gap: 6-10 feet from unknown or agitated subjects","Approach at 45-degree angle — reduces your target profile and improves reactionary options","Announce yourself clearly: 'MACCESS INC. Security — may I speak with you?'","Never approach a potentially hostile subject without a means of communication and a clear exit","Tactical L positioning: two guards should never align in a straight line — reduces dual exposure to a single threat","COVER stops projectiles (car engine block, concrete wall). CONCEALMENT hides you from view but does NOT stop projectiles.","Re-holster / stand down only after the threat has fully resolved — keep eyes on subject"] },
            ],
          quiz:[
            {q:"The recommended reactionary gap from an unknown subject is:",options:["1-2 feet — close enough to maintain control", "6-10 feet — provides time to respond to a threat", "15 or more feet — maximum distance to minimize risk", "At the guard's discretion based on intuition"],answer:1,ref:"BSIS Training Manual"},
            {q:"Cover vs. concealment: cover means:",options:["Hiding from view but not stopping projectiles", "A barrier that can physically stop projectiles", "The same as concealment — both protect equally", "A barrier effective only against non-firearm threats"],answer:1,ref:"BSIS Training Manual"},
          ],
        },
        ],
      },
      { num:2, title:"Blood-Borne Pathogens & Environmental Hazards", duration:"25 min", icon:"🧤",
        slides:[
          { heading:"Blood-Borne Pathogens — OSHA 29 CFR 1910.1030", subheading:"BSIS Syllabus §4.4 | BBP Precautions | MACCESS INC. Policy",
            content:[
              { type:"alert", text:"OSHA 29 CFR 1910.1030: Assume ALL blood and body fluids from any person may be infectious — HIV, Hepatitis B, Hepatitis C, and others. Standard precautions apply universally." },
              { type:"bullets", items:["Minimum PPE before any contact with blood or body fluids: disposable gloves — always","Do not touch eyes, nose, or mouth until hands are washed with soap and water","If exposed: wash area immediately with soap and water, notify supervisor, seek prompt medical evaluation","MACCESS INC. is required to provide BBP training and PPE at no cost to guards","Avoid touching any blood-stained materials without gloves — even dried blood can be infectious","Document all BBP exposure incidents immediately — OSHA recordkeeping required"] },
            ],
          quiz:[
            {q:"Under OSHA blood-borne pathogen standards, a guard must assume that:",options:["Only visibly blood-stained materials pose a transmission risk", "All blood and body fluids from any person may be infectious", "Gloves are only required when contact with blood is likely", "HIV is the only BBP of concern in security work"],answer:1,ref:"OSHA 29 CFR 1910.1030"},
            {q:"The minimum PPE before any contact with blood or body fluids is:",options:["A full-face shield and protective gown", "Disposable gloves", "Safety glasses only", "No PPE required unless blood is confirmed infectious"],answer:1,ref:"OSHA 29 CFR 1910.1030"},
          ],
        },
          { heading:"Environmental & Hazardous Materials Hazards", subheading:"BSIS Syllabus §4.5 | Cal/OSHA | OSHA",
            content:[
              { type:"stagelist", items:[
                { num:"1", label:"GAS ODOR", text:"Do NOT use radio or any electrical switches — evacuate immediately and call 911 from a safe distance", color:"#8B1A1A" },
                { num:"2", label:"CHEMICAL SPILL", text:"Do not enter without proper PPE and training — isolate the area, call 911 HazMat", color:"#7B4500" },
                { num:"3", label:"SUSPICIOUS SUBSTANCE", text:"Do not touch — isolate the area, keep others away, call 911 immediately", color:"#1B2B5E" },
                { num:"4", label:"POWER OUTAGE", text:"Know manual backup procedures for every system at your post before your first shift", color:"#005C5C" },
              ]},
              { type:"rule", text:"Know the location of every Safety Data Sheet (SDS/MSDS) for chemicals at your post. Cal/OSHA requires guards to report workplace hazards they observe." },
            ],
          quiz:[
            {q:"A guard detects a strong odor of natural gas at their post. The correct immediate action is:",options:["Locate the source and attempt to seal it", "Use the radio to report while investigating", "Evacuate immediately without using any electrical switches or radio — call 911 from a safe distance", "Document in the shift log and notify the property manager"],answer:2,ref:"Cal/OSHA | BSIS Training Manual"},
            {q:"Cal/OSHA requires guards to:",options:["Attempt to handle minor chemical spills independently", "Enter hazardous areas with any available PPE", "Report workplace hazards they observe to their supervisor", "Avoid documenting hazardous conditions to limit liability"],answer:2,ref:"Cal/OSHA"},
          ],
        },
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
            ],
          quiz:[
            {q:"Using 'I' statements in a difficult interaction is preferable because:",options:["'I' statements are more legally defensible in documentation", "'I' statements express personal responsibility without creating an adversarial framing", "'I' statements are always perceived as more authoritative", "'I' statements are required by BSIS protocol for all verbal contacts"],answer:1,ref:"BSIS Syllabus \u00a710.1"},
            {q:"The most effective opening strategy when approaching a difficult person is to:",options:["Immediately establish authority by stating consequences", "Lead with empathy — acknowledge the situation before giving directives", "State the policy violation clearly and firmly", "Step back and allow the person to resolve their own situation"],answer:1,ref:"BSIS Syllabus \u00a710.1"},
          ],
        },
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
            ],
          quiz:[
            {q:"The earliest and most effective stage to intervene in the escalation cycle is:",options:["Manifest — when open conflict has erupted", "Felt — when emotions have heightened", "Perceived — when parties believe conflict exists", "Potential — when tension is present but conflict has not yet developed"],answer:3,ref:"BSIS Syllabus \u00a710.2"},
            {q:"Following through on stated consequences is critical because:",options:["It satisfies BSIS documentation requirements", "Empty threats permanently destroy the guard's credibility and make future escalations more likely", "It creates a legal record that fair warning was given", "Following through is not always necessary — situational judgment allows flexibility"],answer:1,ref:"BSIS Syllabus \u00a710.2"},
          ],
        },
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
            ],
          quiz:[
            {q:"When a language barrier creates difficulty during a conflict interaction, the recommended approach is:",options:["Speak more loudly and repeat commands with greater firmness", "Immediately call law enforcement — language barriers make contact unsafe", "Slow down, use simpler language, and seek an interpreter or translation tool", "Assume non-cooperation and document as a refusal to comply"],answer:2,ref:"BSIS Syllabus \u00a710.4 | FEHA"},
            {q:"A guard is negotiating with a difficult person who demands an exception to a post rule. The guard should:",options:["Grant the exception to restore peace", "Make the exception if the person seems reasonable and compliant", "Explain the rule cannot be negotiated — offer to escalate to a supervisor who may assist", "Threaten consequences and repeat the rule until the person complies"],answer:2,ref:"BSIS Syllabus \u00a710.5"},
          ],
        },
          { heading:"Verbal Diffusion Techniques", subheading:"BSIS Syllabus §10.6 | When Talking Fails",
            content:[
              { type:"bullets", items:["Lower your own voice when they raise theirs — people unconsciously mirror the tone of those they speak with","Name the emotion: 'It sounds like you are really frustrated right now' — demonstrates the person is being heard","Redirect: 'Let's focus on how we can fix this' — moves from the past grievance to the future solution","Strategic agreement: agree on minor points to reduce overall tension before addressing the main issue","Create distance: if verbal diffusion is not working, step back, change location, reduce environmental stimuli","Request backup: do not handle escalating situations alone — call for support before force becomes necessary","Document: record all verbal diffusion attempts in the incident report — protects you legally if force is later needed"] },
              { type:"callout", label:"When Verbal Diffusion Has Failed", text:"Recognize the point of no return. Disengage without capitulating: 'I am going to give you a moment to think about this.' Create distance. Request backup. Establish a perimeter. Do not continue verbal engagement that is escalating the situation." },
            ],
          quiz:[
            {q:"When a guard deliberately lowers their own voice in response to an agitated person, the intended effect is:",options:["To signal the guard is also becoming agitated", "To demonstrate professional control to bystanders", "To model calm behavior — people often unconsciously mirror the tone and volume of those they speak with", "To reduce the chance of third parties overhearing"],answer:2,ref:"BSIS Syllabus \u00a710.6"},
            {q:"When verbal diffusion is not working, the correct response is to:",options:["Increase the firmness of verbal commands until compliance is achieved", "Apply physical restraint before the situation escalates further", "Create distance, request backup, and allow the situation to stabilize before re-engaging", "Continue the same approach — consistency eventually produces compliance"],answer:2,ref:"BSIS Syllabus \u00a710.6"},
          ],
        },
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

// ═══════════════════════════════════════════════════════════════════════════════
// CONTENT RENDERER — converts content block objects to HTML strings
// ═══════════════════════════════════════════════════════════════════════════════
function renderContent(items) {
  return items.map(item => {
    switch(item.type) {
      case 'h3':
        return `<h3 class="sect-h3">${item.text}</h3>`;
      case 'alert':
        return `<div class="c-alert"><span class="alert-icon">⚠️</span><span>${item.text}</span></div>`;
      case 'callout':
        return `<div class="c-callout"><strong>${item.label}:</strong> ${item.text}</div>`;
      case 'rule':
        return `<div class="c-rule">${item.text}</div>`;
      case 'bullets':
        return `<ul class="c-bullets">${item.items.map(b=>`<li>${b}</li>`).join('')}</ul>`;
      case 'typecards':
        return `<div class="type-cards">${item.items.map(t=>`
          <div class="type-card" style="border-left:4px solid ${t.color}">
            <div class="type-card-label" style="color:${t.color}">${t.label}</div>
            <div class="type-card-text">${t.text}</div>
          </div>`).join('')}</div>`;
      case 'twocol':
        return `<div class="two-col">
          <div class="col-block"><div class="col-heading">${item.left.heading}</div>
            <ul class="c-bullets">${item.left.items.map(b=>`<li>${b}</li>`).join('')}</ul></div>
          <div class="col-block"><div class="col-heading">${item.right.heading}</div>
            <ul class="c-bullets">${item.right.items.map(b=>`<li>${b}</li>`).join('')}</ul></div>
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
      default: return '';
    }
  }).join('\n');
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN HTML BUILDER
// ═══════════════════════════════════════════════════════════════════════════════
function buildPlatformHTML(courseKey, course) {
  const today = new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});

  // ── Timing config ──────────────────────────────────────────────────────────
  // Session timer: total minutes to complete module content
  // Idle timeout: minutes of no interaction before warning
  const TOTAL_MINUTES = parseInt(course.hours) * 60;  // 1 hr per credit hour
  const IDLE_MINUTES  = 10;                            // 10 min idle = warning
  const IDLE_LOCK     = 15;                            // 15 min idle = lock
  const MAX_ATTEMPTS  = 3;                             // failed final exam attempts before repurchase

  // ── Pre-render slide HTML into data ───────────────────────────────────────
  const modulesWithHTML = course.modules.map(mod => ({
    ...mod,
    slides: mod.slides.map(sl => ({
      ...sl,
      renderedHTML: renderContent(sl.content)
    }))
  }));

  const modulesJ = JSON.stringify(modulesWithHTML)
    .replace(/\\/g,'\\\\').replace(/`/g,'\\`').replace(/\$/g,'\\$');
  const examJ = JSON.stringify(course.exam)
    .replace(/\\/g,'\\\\').replace(/`/g,'\\`').replace(/\$/g,'\\$');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${course.title} | MACCESS INC. / PSLAW</title>
<style>
/* ── Tokens ── */
:root{
  --navy:#1B2B5E; --gold:#C9A84C; --red:#8B1A1A; --green:#1A5C3A;
  --light:#F4F6FB; --gray:#4A5568; --white:#fff; --dark:#12193A;
  --border:#dde4f0; --r:10px; --gold-lt:#FFF8E1;
  --red-lt:#FFECEC; --green-lt:#EAF3DE;
}
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Segoe UI',Arial,sans-serif;background:var(--light);color:#1A1A2E;line-height:1.6;}

/* ── Screens ── */
.screen{display:none;} .screen.active{display:block;}

/* ══════════════════════════════════════
   SALES PAGE
══════════════════════════════════════ */
.site-header{background:var(--navy);padding:14px 24px;display:flex;align-items:center;justify-content:space-between;}
.site-logo{color:var(--gold);font-size:18px;font-weight:700;letter-spacing:.05em;}
.site-meta{color:#CADCFC;font-size:11px;text-align:right;line-height:1.5;}
.gold-stripe{height:5px;background:var(--gold);}
.hero{background:var(--dark);color:var(--white);padding:60px 24px 48px;}
.hero-inner{max-width:920px;margin:0 auto;}
.hero-badge{display:inline-block;background:var(--red);color:var(--white);font-size:11px;font-weight:700;letter-spacing:.1em;padding:5px 14px;border-radius:4px;margin-bottom:18px;text-transform:uppercase;}
.hero-title{font-size:44px;font-weight:800;line-height:1.1;margin-bottom:12px;}
.hero-sub{font-size:18px;color:#CADCFC;margin-bottom:28px;}
.hero-meta{display:flex;gap:18px;flex-wrap:wrap;margin-bottom:36px;}
.hero-chip{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);border-radius:6px;padding:8px 16px;font-size:13px;color:var(--white);}
.hero-chip strong{color:var(--gold);display:block;font-size:10px;text-transform:uppercase;letter-spacing:.06em;margin-bottom:2px;}
.hero-cta{display:inline-block;background:var(--gold);color:var(--navy);font-size:17px;font-weight:700;padding:16px 40px;border-radius:8px;cursor:pointer;border:none;}
.hero-cta:hover{background:#b8962a;}
.hero-trust{margin-top:14px;font-size:12px;color:#8899BB;}
.section-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--gold);margin-bottom:8px;}
.section-title{font-size:28px;font-weight:700;color:var(--navy);margin-bottom:28px;}
.outcomes-section{background:var(--white);padding:56px 24px;}
.outcomes-inner{max-width:920px;margin:0 auto;}
.outcomes-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.outcome-item{display:flex;align-items:flex-start;gap:12px;padding:14px;background:var(--light);border-radius:8px;}
.outcome-check{width:24px;height:24px;border-radius:50%;background:var(--green);color:var(--white);font-size:13px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;}
.outcome-text{font-size:14px;}
.curriculum-section{background:var(--light);padding:56px 24px;}
.curriculum-inner{max-width:920px;margin:0 auto;display:grid;grid-template-columns:1fr 320px;gap:40px;align-items:start;}
.curriculum-list{display:flex;flex-direction:column;gap:10px;}
.curr-item{background:var(--white);border-radius:var(--r);border:1px solid var(--border);padding:16px 20px;display:flex;align-items:center;gap:16px;}
.curr-icon{font-size:22px;width:42px;height:42px;background:var(--light);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.curr-body{flex:1;}
.curr-num{font-size:10px;font-weight:700;color:var(--gray);text-transform:uppercase;letter-spacing:.06em;}
.curr-name{font-size:15px;font-weight:600;color:var(--navy);margin:2px 0;}
.curr-dur{font-size:12px;color:var(--gray);}
.price-card{background:var(--white);border-radius:var(--r);border:2px solid var(--navy);padding:28px;position:sticky;top:24px;}
.price-card-title{font-size:13px;font-weight:700;color:var(--gray);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;}
.price-amount{font-size:42px;font-weight:800;color:var(--navy);}
.price-period{font-size:14px;color:var(--gray);margin-bottom:20px;}
.price-btn{display:block;width:100%;background:var(--gold);color:var(--navy);font-size:16px;font-weight:700;padding:15px;border-radius:8px;border:none;cursor:pointer;text-align:center;margin-bottom:12px;}
.price-btn:hover{background:#b8962a;}
.price-includes{margin-top:16px;font-size:13px;}
.price-includes li{padding:7px 0;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:8px;list-style:none;}
.price-includes li:last-child{border-bottom:none;}
.price-check{color:var(--green);font-weight:700;}
.pay-logos{display:flex;gap:8px;margin-top:14px;flex-wrap:wrap;}
.pay-logo{background:var(--light);border:1px solid var(--border);border-radius:4px;padding:4px 10px;font-size:11px;font-weight:600;color:var(--gray);}
.guarantee{margin-top:12px;padding:10px;background:var(--green-lt);border-radius:6px;font-size:12px;color:var(--green);text-align:center;}
/* Policy notice on sales page */
.policy-notice{background:var(--gold-lt);border:1px solid #F9C757;border-radius:8px;padding:14px 18px;font-size:13px;color:#7B4F00;margin-top:16px;line-height:1.7;}
.policy-notice strong{color:var(--red);}
.instructor-section{background:var(--navy);color:var(--white);padding:56px 24px;}
.instructor-inner{max-width:920px;margin:0 auto;display:grid;grid-template-columns:100px 1fr;gap:32px;align-items:start;}
.instructor-avatar{width:96px;height:96px;border-radius:50%;background:var(--gold);display:flex;align-items:center;justify-content:center;font-size:36px;border:3px solid var(--gold);}
.instructor-name{font-size:22px;font-weight:700;color:var(--gold);margin-bottom:4px;}
.instructor-title{font-size:13px;color:#CADCFC;margin-bottom:14px;}
.instructor-bio{font-size:14px;color:#CADCFC;line-height:1.7;margin-bottom:14px;}
.instructor-creds{display:flex;flex-wrap:wrap;gap:8px;}
.cred-chip{background:rgba(255,255,255,.1);border-radius:4px;padding:4px 10px;font-size:11px;color:var(--white);}
.testimonials-section{background:var(--white);padding:56px 24px;}
.testimonials-inner{max-width:920px;margin:0 auto;}
.testimonials-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px;margin-top:24px;}
.testimonial{background:var(--light);border-radius:var(--r);padding:20px;border-left:4px solid var(--gold);}
.t-stars{color:var(--gold);font-size:14px;margin-bottom:8px;}
.t-text{font-size:13px;color:var(--gray);line-height:1.6;margin-bottom:10px;font-style:italic;}
.t-name{font-size:12px;font-weight:700;color:var(--navy);}
.bottom-cta{background:var(--gold);padding:48px 24px;text-align:center;}
.bottom-cta h2{font-size:28px;font-weight:800;color:var(--navy);margin-bottom:8px;}
.bottom-cta p{font-size:15px;color:var(--dark);margin-bottom:24px;}
.bottom-cta-btn{display:inline-block;background:var(--navy);color:var(--white);font-size:17px;font-weight:700;padding:16px 40px;border-radius:8px;border:none;cursor:pointer;}
.site-footer{background:var(--dark);color:#8899BB;padding:20px 24px;text-align:center;font-size:12px;}

/* ══════════════════════════════════════
   ENROLLMENT GATE
══════════════════════════════════════ */
.gate-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--light);padding:24px;}
.gate-card{background:var(--white);border-radius:var(--r);border:1px solid var(--border);padding:40px;max-width:480px;width:100%;}
.gate-logo{color:var(--navy);font-size:13px;font-weight:700;letter-spacing:.05em;margin-bottom:6px;}
.gate-title{font-size:24px;font-weight:700;color:var(--navy);margin-bottom:4px;}
.gate-sub{font-size:13px;color:var(--gray);margin-bottom:24px;}
.gate-label{display:block;font-size:12px;font-weight:600;color:var(--gray);margin:12px 0 4px;}
.gate-input{width:100%;padding:11px 14px;border:1.5px solid var(--border);border-radius:8px;font-size:15px;outline:none;transition:border .2s;}
.gate-input:focus{border-color:var(--navy);}
.gate-btn{display:block;width:100%;background:var(--gold);color:var(--navy);font-size:16px;font-weight:700;padding:14px;border-radius:8px;border:none;cursor:pointer;margin-top:20px;}
.gate-notice{font-size:12px;color:var(--gray);margin-top:12px;text-align:center;line-height:1.6;}

/* ══════════════════════════════════════
   COURSE PLAYER
══════════════════════════════════════ */
.player-wrap{display:grid;grid-template-columns:268px 1fr;min-height:100vh;}

/* Timer bar — fixed top strip inside player */
.timer-bar{background:var(--navy);padding:6px 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid var(--gold);}
.timer-label{font-size:11px;color:#CADCFC;letter-spacing:.04em;}
.timer-display{font-size:14px;font-weight:700;color:var(--gold);font-variant-numeric:tabular-nums;min-width:72px;text-align:right;}
.timer-display.warn{color:#FFA500;}
.timer-display.critical{color:var(--red);animation:pulse .8s infinite;}
@keyframes pulse{0%,100%{opacity:1;}50%{opacity:.5;}}
.timer-progress{height:4px;background:rgba(255,255,255,.1);flex:1;margin:0 14px;border-radius:2px;overflow:hidden;}
.timer-progress-fill{height:100%;background:var(--gold);border-radius:2px;transition:width 1s linear;}
.timer-progress-fill.warn{background:#FFA500;}
.timer-progress-fill.critical{background:var(--red);}

/* Sidebar */
.sidebar{background:var(--navy);color:var(--white);position:sticky;top:0;height:100vh;overflow-y:auto;display:flex;flex-direction:column;}
.sidebar-header{padding:20px;border-bottom:1px solid rgba(255,255,255,.1);}
.sidebar-logo{font-size:12px;font-weight:700;color:var(--gold);letter-spacing:.05em;}
.sidebar-course{font-size:13px;color:#CADCFC;margin-top:4px;line-height:1.4;}
.sidebar-prog{height:4px;background:rgba(255,255,255,.15);margin:12px 0 4px;}
.sidebar-prog-fill{height:100%;background:var(--gold);transition:width .4s;}
.sidebar-prog-label{font-size:11px;color:#8899BB;margin-bottom:12px;border-bottom:1px solid rgba(255,255,255,.1);padding-bottom:12px;}
.sidebar-modules{flex:1;padding:10px 0;}
.sbm{padding:11px 20px;cursor:pointer;border-left:3px solid transparent;transition:all .15s;}
.sbm:hover{background:rgba(255,255,255,.05);}
.sbm.s-active{border-left-color:var(--gold);background:rgba(201,168,76,.1);}
.sbm.s-done{border-left-color:var(--green);}
.sbm.s-locked{opacity:.4;cursor:not-allowed;}
.sbm-header{display:flex;align-items:center;gap:10px;}
.sbm-icon{font-size:15px;width:26px;text-align:center;}
.sbm-num{font-size:10px;font-weight:700;color:var(--gold);text-transform:uppercase;letter-spacing:.06em;}
.sbm-name{font-size:13px;color:var(--white);margin:1px 0;}
.sbm-dur{font-size:11px;color:#8899BB;}
.sbm-status{margin-left:auto;font-size:13px;}
.sidebar-exam{padding:12px 20px;border-top:1px solid rgba(255,255,255,.1);margin-top:auto;}
.sbm-exam{padding:10px 0;cursor:pointer;display:flex;align-items:center;gap:10px;font-size:13px;color:#CADCFC;}
.sbm-exam.s-locked{opacity:.38;cursor:not-allowed;}

/* Main player */
.player-main{display:flex;flex-direction:column;}
.player-topbar{background:var(--white);border-bottom:1px solid var(--border);padding:12px 28px;display:flex;align-items:center;justify-content:space-between;}
.player-bc{font-size:13px;color:var(--gray);}
.player-sc{font-size:12px;color:var(--gray);background:var(--light);padding:4px 12px;border-radius:20px;}
.player-content{flex:1;padding:32px 38px;max-width:800px;}

/* Slide */
.slide-wrap{animation:fadeIn .22s ease;}
@keyframes fadeIn{from{opacity:0;transform:translateY(5px);}to{opacity:1;transform:none;}}
.slide-heading{font-size:25px;font-weight:700;color:var(--navy);margin-bottom:6px;line-height:1.25;}
.slide-subheading{font-size:13px;color:var(--gray);margin-bottom:20px;padding-bottom:16px;border-bottom:2px solid var(--gold);}
.slide-body{font-size:15px;}

/* Content blocks */
.sect-h3{font-size:16px;font-weight:700;color:var(--navy);margin:18px 0 9px;}
.c-alert{background:#FFF3CD;border:1px solid #F9C757;border-radius:8px;padding:12px 15px;margin:14px 0;display:flex;gap:10px;align-items:flex-start;font-size:14px;color:#7B4F00;}
.alert-icon{font-size:17px;flex-shrink:0;}
.c-callout{background:var(--green-lt);border-left:4px solid var(--green);border-radius:0 8px 8px 0;padding:11px 15px;margin:14px 0;font-size:14px;color:#1A4A2A;}
.c-rule{background:#F0F4FB;border-left:4px solid var(--navy);border-radius:0 8px 8px 0;padding:11px 15px;margin:14px 0;font-size:14px;font-weight:600;color:var(--navy);}
.c-bullets{padding-left:4px;margin:10px 0;}
.c-bullets li{padding:5px 0 5px 18px;position:relative;font-size:14px;border-bottom:1px solid #f0f0f0;}
.c-bullets li:last-child{border:none;}
.c-bullets li::before{content:"▸";position:absolute;left:0;color:var(--gold);font-size:11px;top:8px;}
.type-cards{display:grid;grid-template-columns:1fr 1fr;gap:11px;margin:14px 0;}
.type-card{background:var(--white);border-radius:8px;padding:13px;border:1px solid var(--border);}
.type-card-label{font-size:12px;font-weight:700;margin-bottom:5px;}
.type-card-text{font-size:13px;color:var(--gray);}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:14px 0;}
.col-block{background:var(--light);border-radius:8px;padding:13px;}
.col-heading{font-size:13px;font-weight:700;color:var(--navy);margin-bottom:9px;}
.stage-list{display:flex;flex-direction:column;gap:7px;margin:12px 0;}
.stage-row{display:flex;align-items:center;gap:12px;background:var(--white);border-radius:8px;padding:11px 14px;border:1px solid var(--border);}
.stage-num{width:30px;height:30px;border-radius:50%;color:var(--white);font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.stage-label{font-weight:700;font-size:13px;}
.stage-text{font-size:13px;color:var(--gray);}
.rhf-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:11px;margin:14px 0;}
.rhf-card{background:var(--white);border-radius:8px;padding:13px;border:1px solid var(--border);}
.rhf-label{font-size:17px;font-weight:800;margin-bottom:7px;}
.rhf-text{font-size:13px;color:var(--gray);}

/* ── Inline section check-in quiz ─────────────────────────────────────── */
.check-in{margin:24px 0;background:var(--white);border-radius:var(--r);border:2px solid var(--gold);overflow:hidden;}
.check-in-header{background:var(--gold);padding:12px 18px;display:flex;align-items:center;gap:10px;}
.check-in-icon{font-size:17px;}
.check-in-title{font-size:14px;font-weight:700;color:var(--navy);}
.check-in-body{padding:18px;}
.ci-q{margin-bottom:18px;}
.ci-q:last-child{margin-bottom:0;}
.ci-qtext{font-size:14px;font-weight:600;color:var(--navy);margin-bottom:10px;line-height:1.5;}
.ci-opts{display:flex;flex-direction:column;gap:7px;}
.ci-opt{display:flex;align-items:center;gap:9px;padding:9px 12px;border:1.5px solid var(--border);border-radius:7px;cursor:pointer;font-size:13px;transition:all .15s;}
.ci-opt:hover:not(.ci-done){border-color:var(--navy);background:#F0F4FB;}
.ci-opt.ci-sel{border-color:var(--navy);background:#EBF0FB;}
.ci-opt.ci-ok{border-color:var(--green)!important;background:var(--green-lt)!important;color:var(--green);}
.ci-opt.ci-no{border-color:var(--red)!important;background:var(--red-lt)!important;color:var(--red);}
.ci-opt.ci-done{pointer-events:none;}
.ci-ol{width:24px;height:24px;border-radius:50%;background:var(--light);font-weight:700;font-size:11px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--navy);border:1.5px solid var(--border);}
.ci-opt.ci-sel .ci-ol{background:var(--navy);color:#fff;border-color:var(--navy);}
.ci-opt.ci-ok .ci-ol{background:var(--green);color:#fff;border-color:var(--green);}
.ci-opt.ci-no .ci-ol{background:var(--red);color:#fff;border-color:var(--red);}
.ci-fb{font-size:12px;margin-top:7px;padding:7px 11px;border-radius:6px;display:none;line-height:1.5;}
.ci-fb.ci-fb-ok{display:block;background:var(--green-lt);color:var(--green);}
.ci-fb.ci-fb-no{display:block;background:var(--red-lt);color:var(--red);}
.check-in-pending{padding:10px 18px 14px;font-size:12px;color:var(--gray);font-style:italic;}

/* ── Final module quiz ─────────────────────────────────────────────────── */
.final-quiz{background:var(--white);border-radius:var(--r);border:2px solid var(--navy);overflow:hidden;margin-bottom:20px;}
.fq-header{background:var(--navy);padding:14px 20px;}
.fq-title{font-size:15px;font-weight:700;color:var(--white);}
.fq-sub{font-size:12px;color:#CADCFC;margin-top:3px;}
.fq-body{padding:22px;}
.fq-q{margin-bottom:20px;}
.fq-q:last-child{margin-bottom:0;}
.fq-qtext{font-size:14px;font-weight:600;color:var(--navy);margin-bottom:11px;line-height:1.5;}
.fq-opts{display:flex;flex-direction:column;gap:7px;}
.fq-opt{display:flex;align-items:center;gap:9px;padding:9px 12px;border:1.5px solid var(--border);border-radius:7px;cursor:pointer;font-size:13px;transition:all .15s;}
.fq-opt:hover:not(.fq-done){border-color:var(--navy);background:#F0F4FB;}
.fq-opt.fq-sel{border-color:var(--navy);background:#EBF0FB;}
.fq-opt.fq-ok{border-color:var(--green)!important;background:var(--green-lt)!important;color:var(--green);}
.fq-opt.fq-no{border-color:var(--red)!important;background:var(--red-lt)!important;color:var(--red);}
.fq-opt.fq-done{pointer-events:none;}
.fq-ol{width:24px;height:24px;border-radius:50%;background:var(--light);font-weight:700;font-size:11px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--navy);border:1.5px solid var(--border);}
.fq-opt.fq-sel .fq-ol{background:var(--navy);color:#fff;border-color:var(--navy);}
.fq-opt.fq-ok .fq-ol{background:var(--green);color:#fff;border-color:var(--green);}
.fq-opt.fq-no .fq-ol{background:var(--red);color:#fff;border-color:var(--red);}
.fq-fb{font-size:12px;margin-top:7px;padding:7px 11px;border-radius:6px;display:none;line-height:1.5;}
.fq-fb.fq-fb-ok{display:block;background:var(--green-lt);color:var(--green);}
.fq-fb.fq-fb-no{display:block;background:var(--red-lt);color:var(--red);}
.fq-complete{padding:14px 18px;background:var(--green-lt);font-size:13px;color:var(--green);font-weight:600;border-top:1px solid #c3e6cb;}

/* ── Slide progress dots & nav ─────────────────────────────────────────── */
.player-nav{background:var(--white);border-top:1px solid var(--border);padding:14px 38px;display:flex;justify-content:space-between;align-items:center;}
.nav-btn{padding:10px 26px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;border:none;}
.nav-back{background:var(--white);color:var(--navy);border:1.5px solid var(--navy);}
.nav-next{background:var(--navy);color:var(--white);}
.nav-next:hover{background:#243a7a;}
.nav-next:disabled{background:#A0AEC0;cursor:not-allowed;}
.slide-dots{display:flex;gap:5px;}
.dot{width:7px;height:7px;border-radius:50%;background:var(--border);}
.dot.d-active{background:var(--navy);}
.dot.d-done{background:var(--gold);}

/* ══════════════════════════════════════
   FINAL EXAM
══════════════════════════════════════ */
.exam-wrap{max-width:800px;padding:32px 38px;}
.exam-title{font-size:25px;font-weight:700;color:var(--navy);margin-bottom:5px;}
.exam-sub{font-size:14px;color:var(--gray);margin-bottom:14px;}
.exam-warn{background:#FFF3CD;border:1px solid #F9C757;border-radius:8px;padding:12px 15px;font-size:13px;color:#7B4F00;margin-bottom:16px;line-height:1.65;}
/* Attempt indicator */
.attempt-indicator{display:flex;gap:8px;align-items:center;margin-bottom:16px;padding:10px 14px;background:var(--light);border-radius:8px;}
.attempt-dot{width:14px;height:14px;border-radius:50%;border:2px solid var(--border);background:var(--white);}
.attempt-dot.used{background:var(--red);border-color:var(--red);}
.attempt-dot.current{background:var(--gold);border-color:var(--gold);animation:pulse .8s infinite;}
.attempt-label{font-size:12px;color:var(--gray);margin-left:6px;}
.exam-pw{background:var(--white);border-radius:8px;padding:11px 14px;margin-bottom:16px;display:flex;align-items:center;gap:11px;border:1px solid var(--border);}
.exam-pb{flex:1;height:6px;background:#E8EDF6;border-radius:3px;overflow:hidden;}
.exam-pf{height:100%;background:var(--navy);border-radius:3px;transition:width .3s;}
.exam-pt{font-size:12px;color:var(--gray);white-space:nowrap;}
.exam-qblock{background:var(--white);border-radius:var(--r);border:1px solid var(--border);padding:22px 26px;margin-bottom:16px;}
.exam-mod-badge{display:inline-block;background:var(--light);border:1px solid var(--border);border-radius:5px;font-size:10px;font-weight:600;color:var(--navy);padding:3px 10px;margin-bottom:9px;}
.exam-ref{font-size:10px;color:var(--gray);margin-left:7px;font-style:italic;}
.exam-qnum{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--gold);margin-bottom:5px;}
.exam-qtext{font-size:14px;font-weight:600;line-height:1.5;margin-bottom:14px;}
.exam-opts{display:flex;flex-direction:column;gap:7px;}
.exam-opt{display:flex;align-items:center;gap:9px;padding:9px 12px;border:1.5px solid var(--border);border-radius:7px;cursor:pointer;font-size:13px;transition:all .15s;}
.exam-opt:hover{border-color:var(--navy);background:#F0F4FB;}
.exam-opt.sel{border-color:var(--navy);background:#EBF0FB;}
.exam-opt.ok{border-color:var(--green)!important;background:var(--green-lt)!important;color:var(--green);}
.exam-opt.no{border-color:var(--red)!important;background:var(--red-lt)!important;color:var(--red);}
.exam-ol{width:24px;height:24px;border-radius:50%;background:var(--light);font-weight:700;font-size:11px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--navy);border:1.5px solid var(--border);}
.exam-opt.sel .exam-ol{background:var(--navy);color:#fff;border-color:var(--navy);}
.exam-opt.ok .exam-ol{background:var(--green);color:#fff;border-color:var(--green);}
.exam-opt.no .exam-ol{background:var(--red);color:#fff;border-color:var(--red);}
.exam-fb{margin-top:9px;padding:8px 12px;border-radius:6px;font-size:12px;line-height:1.55;display:none;}
.exam-fb.show{display:block;}
.exam-fb-ok{background:var(--green-lt);color:var(--green);}
.exam-fb-no{background:var(--red-lt);color:var(--red);}
.exam-nav{display:flex;justify-content:space-between;align-items:center;margin-top:6px;padding:14px 0;}
.exam-btn{padding:10px 24px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;border:none;}
.exam-back-btn{background:var(--white);color:var(--navy);border:1.5px solid var(--navy);}
.exam-fwd-btn{background:var(--navy);color:#fff;}

/* ══════════════════════════════════════
   RESULTS
══════════════════════════════════════ */
.results-wrap{max-width:720px;padding:36px;margin:0 auto;}
.results-card{background:var(--white);border-radius:var(--r);border:1px solid var(--border);padding:38px;text-align:center;}
.score-ring{width:136px;height:136px;border-radius:50%;margin:0 auto 20px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:30px;font-weight:800;}
.ring-pass{background:var(--green-lt);color:var(--green);border:5px solid var(--green);}
.ring-fail{background:var(--red-lt);color:var(--red);border:5px solid var(--red);}
.ring-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-top:3px;}
.res-title{font-size:22px;font-weight:700;margin-bottom:7px;}
.rt-pass{color:var(--green);} .rt-fail{color:var(--red);}
.res-sub{font-size:14px;color:var(--gray);margin-bottom:20px;line-height:1.6;}
.breakdown{background:var(--light);border-radius:8px;padding:15px 18px;margin-bottom:20px;text-align:left;}
.breakdown h3{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--navy);margin-bottom:10px;}
.bd-row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--border);font-size:13px;}
.bd-row:last-child{border:none;font-weight:700;}
.bd-pass{color:var(--green);font-weight:600;} .bd-fail{color:var(--red);font-weight:600;}
.res-btns{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:16px;}
.r-btn{padding:11px 22px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;border:none;}
.r-primary{background:var(--gold);color:var(--navy);}
.r-outline{background:var(--white);color:var(--navy);border:1.5px solid var(--navy);}
.bsis-note{background:#EBF0FB;border-radius:8px;padding:13px 16px;font-size:12px;color:var(--navy);line-height:1.7;text-align:left;}

/* ══════════════════════════════════════
   REPURCHASE LOCK SCREEN
══════════════════════════════════════ */
.lock-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--dark);padding:24px;}
.lock-card{background:var(--white);border-radius:var(--r);padding:44px;max-width:520px;width:100%;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.4);}
.lock-icon{font-size:56px;margin-bottom:16px;}
.lock-title{font-size:24px;font-weight:800;color:var(--red);margin-bottom:10px;}
.lock-sub{font-size:15px;color:var(--gray);margin-bottom:24px;line-height:1.7;}
.lock-stripe{height:4px;background:var(--gold);border-radius:2px;margin:20px 0;}
.lock-policy{background:#FFF3CD;border:1px solid #F9C757;border-radius:8px;padding:14px 18px;font-size:13px;color:#7B4F00;margin-bottom:24px;text-align:left;line-height:1.7;}
.lock-btn{display:block;width:100%;background:var(--gold);color:var(--navy);font-size:17px;font-weight:700;padding:15px;border-radius:8px;border:none;cursor:pointer;margin-bottom:12px;}
.lock-btn:hover{background:#b8962a;}
.lock-btn-outline{display:block;width:100%;background:var(--white);color:var(--navy);font-size:15px;font-weight:600;padding:13px;border-radius:8px;border:1.5px solid var(--navy);cursor:pointer;}

/* ══════════════════════════════════════
   IDLE WARNING OVERLAY
══════════════════════════════════════ */
.idle-overlay{position:fixed;inset:0;background:rgba(18,25,58,.92);display:flex;align-items:center;justify-content:center;z-index:999;display:none;}
.idle-overlay.show{display:flex;}
.idle-card{background:var(--white);border-radius:var(--r);padding:36px;max-width:400px;width:90%;text-align:center;}
.idle-icon{font-size:48px;margin-bottom:12px;}
.idle-title{font-size:20px;font-weight:700;color:var(--navy);margin-bottom:8px;}
.idle-sub{font-size:14px;color:var(--gray);margin-bottom:20px;line-height:1.6;}
.idle-countdown{font-size:40px;font-weight:800;color:var(--red);margin-bottom:20px;}
.idle-btn{background:var(--gold);color:var(--navy);font-size:15px;font-weight:700;padding:13px 32px;border-radius:8px;border:none;cursor:pointer;}

/* ══════════════════════════════════════
   CERTIFICATE
══════════════════════════════════════ */
@media print{.no-print{display:none!important;}.cert-page{padding:0;}}
.cert-page{padding:28px;}
.cert-wrap{background:var(--white);border:3px double var(--navy);border-radius:4px;padding:46px 56px;max-width:820px;margin:0 auto;text-align:center;position:relative;}
.cert-wrap::before{content:'';position:absolute;inset:9px;border:1px solid var(--gold);border-radius:2px;pointer-events:none;}
.cert-eyebrow{font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--navy);margin-bottom:5px;}
.cert-stripe{height:5px;background:var(--gold);border-radius:3px;margin:10px auto;width:80px;}
.cert-co{font-size:23px;font-weight:800;color:var(--navy);margin-bottom:2px;}
.cert-ppo{font-size:12px;color:var(--gray);margin-bottom:22px;}
.cert-certifies{font-size:13px;color:var(--gray);margin-bottom:7px;}
.cert-name{font-size:30px;font-weight:800;color:var(--navy);border-bottom:2px solid var(--navy);display:inline-block;min-width:290px;padding-bottom:4px;margin-bottom:18px;}
.cert-body{font-size:13px;color:var(--gray);line-height:1.8;margin-bottom:5px;}
.cert-course{font-size:17px;font-weight:700;color:var(--navy);margin-bottom:12px;}
.cert-badge{display:inline-block;background:var(--green-lt);color:var(--green);border-radius:6px;padding:4px 14px;font-size:12px;font-weight:700;margin-bottom:20px;}
.cert-sigs{display:flex;justify-content:space-around;margin-top:32px;gap:18px;}
.cert-sig{flex:1;text-align:center;}
.cert-sig-line{border-top:1.5px solid var(--navy);margin-bottom:5px;}
.cert-sig-label{font-size:11px;color:var(--gray);}

/* ── Responsive ── */
@media(max-width:768px){
  .outcomes-grid,.type-cards,.two-col,.rhf-grid,.testimonials-grid{grid-template-columns:1fr;}
  .curriculum-inner{grid-template-columns:1fr;}
  .price-card{position:static;}
  .player-wrap{grid-template-columns:1fr;}
  .sidebar{height:auto;position:relative;}
  .instructor-inner{grid-template-columns:1fr;}
  .hero-title{font-size:30px;}
}
</style>
</head>
<body>

<!-- ══════════════ IDLE WARNING OVERLAY ══════════════ -->
<div class="idle-overlay" id="idle-overlay">
  <div class="idle-card">
    <div class="idle-icon">⏰</div>
    <h2 class="idle-title">Are you still there?</h2>
    <p class="idle-sub">Your session will pause due to inactivity. Click below to continue your course.</p>
    <div class="idle-countdown" id="idle-countdown">60</div>
    <button class="idle-btn" onclick="dismissIdle()">Continue Course</button>
  </div>
</div>

<!-- ══════════════ SCREEN 1: SALES PAGE ══════════════ -->
<div class="screen active" id="sc-sales">
  <header class="site-header">
    <div class="site-logo">MACCESS INC. / PSLAW</div>
    <div class="site-meta">PPO License #122729 | BSIS-Authorized Training Provider<br/>gopslaw.com</div>
  </header>
  <div class="gold-stripe"></div>
  <section class="hero">
    <div class="hero-inner">
      <div class="hero-badge">${course.badge}</div>
      <h1 class="hero-title">${course.title}</h1>
      <p class="hero-sub">${course.subtitle} — California Guard Card Training</p>
      <div class="hero-meta">
        <div class="hero-chip"><strong>Credit Hours</strong>${course.hours} Hours</div>
        <div class="hero-chip"><strong>Authority</strong>${course.bpcRef}</div>
        <div class="hero-chip"><strong>Category</strong>BSIS ${course.category}</div>
        <div class="hero-chip"><strong>Time Limit</strong>${TOTAL_MINUTES} Minutes</div>
        <div class="hero-chip"><strong>Certificate</strong>BSIS Compliant</div>
      </div>
      <button class="hero-cta" onclick="goEnroll()">Enroll Now — \$${course.price}</button>
      <div class="hero-trust">🔒 BSIS-Authorized Training &nbsp;|&nbsp; Certificate Included &nbsp;|&nbsp; PPO License #122729</div>
    </div>
  </section>
  <section class="outcomes-section">
    <div class="outcomes-inner">
      <div class="section-label">What You'll Learn</div>
      <h2 class="section-title">Course Learning Outcomes</h2>
      <div class="outcomes-grid">
        ${course.outcomes.map(o=>`<div class="outcome-item"><div class="outcome-check">✓</div><div class="outcome-text">${o}</div></div>`).join('')}
      </div>
    </div>
  </section>
  <section class="curriculum-section">
    <div class="curriculum-inner">
      <div>
        <div class="section-label">Course Curriculum</div>
        <h2 class="section-title" style="margin-bottom:18px;">What's Inside</h2>
        <div class="curriculum-list">
          ${course.modules.map((mod,i)=>`
            <div class="curr-item">
              <div class="curr-icon">${mod.icon}</div>
              <div class="curr-body">
                <div class="curr-num">Module ${mod.num}</div>
                <div class="curr-name">${mod.title}</div>
                <div class="curr-dur">${mod.duration} · ${mod.slides.length} sections · Check-in questions + module quiz</div>
              </div>
              <div style="color:var(--gray);font-size:16px;">${i===0?'▶':'🔒'}</div>
            </div>`).join('')}
          <div class="curr-item">
            <div class="curr-icon">📝</div>
            <div class="curr-body">
              <div class="curr-num">Final Assessment</div>
              <div class="curr-name">BSIS Written Examination</div>
              <div class="curr-dur">${course.exam.length} questions · 100% required · 3 attempts · Certificate on pass</div>
            </div>
            <div style="color:var(--gray);font-size:16px;">🔒</div>
          </div>
        </div>
      </div>
      <div>
        <div class="price-card">
          <div class="price-card-title">Full Course Access</div>
          <div class="price-amount">\$${course.price}</div>
          <div class="price-period">one-time · lifetime access</div>
          <button class="price-btn" onclick="goEnroll()">Get Started Now</button>
          <ul class="price-includes">
            <li><span class="price-check">✓</span> All ${course.modules.length} course modules</li>
            <li><span class="price-check">✓</span> Inline section check-in questions</li>
            <li><span class="price-check">✓</span> Module quizzes before advancing</li>
            <li><span class="price-check">✓</span> ${course.exam.length}-question BSIS final exam</li>
            <li><span class="price-check">✓</span> BSIS Certificate of Completion</li>
            <li><span class="price-check">✓</span> ${TOTAL_MINUTES}-minute timed session</li>
          </ul>
          <div class="pay-logos">
            <div class="pay-logo">Klarna</div>
            <div class="pay-logo">Afterpay</div>
            <div class="pay-logo">Affirm</div>
            <div class="pay-logo">PayPal</div>
          </div>
          <div class="guarantee">✓ BSIS Certificate on successful completion</div>
          <div class="policy-notice">
            <strong>Assessment Policy:</strong> You have <strong>3 attempts</strong> to pass the final exam. After 3 failed attempts, re-enrollment is required. Sessions expire after <strong>${IDLE_LOCK} minutes of inactivity</strong>.
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="instructor-section">
    <div class="instructor-inner">
      <div class="instructor-avatar">👮</div>
      <div>
        <div class="instructor-name">James K. McMichael</div>
        <div class="instructor-title">CEO, MACCESS INC. | Lead Instructor, PSLAW</div>
        <p class="instructor-bio">MACCESS INC. is a California-licensed Private Patrol Operator (PPO #122729) with 14+ years of executive protection and private security operational experience in the Los Angeles market. Every course is built directly from the official BSIS syllabus at bsis.ca.gov and fact-checked against current California law.</p>
        <div class="instructor-creds">
          <div class="cred-chip">PPO License #122729</div>
          <div class="cred-chip">BSIS-Authorized</div>
          <div class="cred-chip">14+ Years EP Experience</div>
          <div class="cred-chip">Los Angeles, CA</div>
        </div>
      </div>
    </div>
  </section>
  <section class="testimonials-section">
    <div class="testimonials-inner">
      <div class="section-label">Student Reviews</div>
      <h2 class="section-title">What Our Graduates Say</h2>
      <div class="testimonials-grid">
        <div class="testimonial"><div class="t-stars">★★★★★</div><p class="t-text">"The inline questions after every section kept me locked in. By the time I hit the final exam I already knew the material cold."</p><div class="t-name">PSLAW Graduate · Los Angeles</div></div>
        <div class="testimonial"><div class="t-stars">★★★★★</div><p class="t-text">"Built from the actual BSIS syllabus. Not watered down. The module quizzes before you can advance make sure you actually learned it."</p><div class="t-name">PSLAW Graduate · Inglewood</div></div>
        <div class="testimonial"><div class="t-stars">★★★★★</div><p class="t-text">"Completed this before my first day on post. Supervisor was impressed I already knew the law cold. Real preparation."</p><div class="t-name">PSLAW Graduate · Compton</div></div>
      </div>
    </div>
  </section>
  <section class="bottom-cta">
    <h2>Start Your Training Today</h2>
    <p>BSIS-compliant certificate. Real-world content. Start immediately.</p>
    <button class="bottom-cta-btn" onclick="goEnroll()">Enroll Now — \$${course.price}</button>
  </section>
  <footer class="site-footer">
    MACCESS INC. / Private Security LA Worldwide (PSLAW) &nbsp;|&nbsp; PPO License #122729 &nbsp;|&nbsp; BSIS-Authorized Training Provider &nbsp;|&nbsp; gopslaw.com<br/>
    © ${new Date().getFullYear()} MACCESS INC. All rights reserved.
  </footer>
</div>

<!-- ══════════════ SCREEN 2: ENROLLMENT GATE ══════════════ -->
<div class="screen" id="sc-gate">
  <div class="gate-wrap">
    <div class="gate-card">
      <div class="gate-logo">MACCESS INC. / PSLAW</div>
      <h2 class="gate-title">You're Almost In</h2>
      <p class="gate-sub">Enter your details to access <strong>${course.title}</strong>. Your certificate will be issued to this name.</p>
      <label class="gate-label">Full Legal Name * <span style="font-weight:400;font-size:11px;">(as it appears on your certificate)</span></label>
      <input class="gate-input" type="text" id="g-name" placeholder="First Middle Last"/>
      <label class="gate-label">Email Address *</label>
      <input class="gate-input" type="email" id="g-email" placeholder="your@email.com"/>
      <button class="gate-btn" onclick="startCourse()">Start Course →</button>
      <p class="gate-notice">🔒 Your information is used only to issue your BSIS Certificate of Completion. MACCESS INC. PPO #122729.<br/>Session timer starts when you begin. ${TOTAL_MINUTES}-minute limit · ${IDLE_LOCK}-minute idle lock · 3 exam attempts.</p>
      <p style="text-align:center;margin-top:12px;font-size:12px;color:var(--gray);cursor:pointer;" onclick="show('sc-sales')">← Back to course details</p>
    </div>
  </div>
</div>

<!-- ══════════════ SCREEN 3: COURSE PLAYER ══════════════ -->
<div class="screen" id="sc-player">
  <div class="timer-bar">
    <div class="timer-label">SESSION TIME REMAINING</div>
    <div class="timer-progress"><div class="timer-progress-fill" id="timer-fill" style="width:100%"></div></div>
    <div class="timer-display" id="timer-display">--:--</div>
  </div>
  <div class="player-wrap">
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo">MACCESS INC. / PSLAW</div>
        <div class="sidebar-course">${course.title}</div>
        <div class="sidebar-prog"><div class="sidebar-prog-fill" id="sb-fill" style="width:0%"></div></div>
        <div class="sidebar-prog-label" id="sb-label">0% complete</div>
      </div>
      <div class="sidebar-modules" id="sb-modules">
        ${course.modules.map((mod,i)=>`
          <div class="sbm ${i===0?'s-active':'s-locked'}" id="sbm-${i}" onclick="jumpMod(${i})">
            <div class="sbm-header">
              <div class="sbm-icon">${mod.icon}</div>
              <div>
                <div class="sbm-num">Module ${mod.num}</div>
                <div class="sbm-name">${mod.title}</div>
                <div class="sbm-dur">${mod.duration}</div>
              </div>
              <div class="sbm-status" id="sbms-${i}">${i===0?'▶':'🔒'}</div>
            </div>
          </div>`).join('')}
      </div>
      <div class="sidebar-exam">
        <div class="sbm-exam s-locked" id="sb-exam-link" onclick="jumpExam()">
          <span>📝</span><span>Final BSIS Assessment</span>
        </div>
      </div>
    </aside>
    <div class="player-main">
      <div class="player-topbar">
        <div class="player-bc" id="player-bc"><strong>${course.title}</strong></div>
        <div class="player-sc" id="player-sc">Section 1</div>
      </div>
      <div class="player-content" id="player-content"></div>
      <div class="player-nav">
        <button class="nav-btn nav-back" id="nav-back" onclick="navBack()" style="display:none">← Back</button>
        <div class="slide-dots" id="slide-dots"></div>
        <button class="nav-btn nav-next" id="nav-next" onclick="navNext()">Next →</button>
      </div>
    </div>
  </div>
</div>

<!-- ══════════════ SCREEN 4: FINAL EXAM ══════════════ -->
<div class="screen" id="sc-exam">
  <div class="timer-bar">
    <div class="timer-label">SESSION TIME REMAINING</div>
    <div class="timer-progress"><div class="timer-progress-fill" id="timer-fill-exam" style="width:100%"></div></div>
    <div class="timer-display" id="timer-display-exam">--:--</div>
  </div>
  <div class="player-wrap">
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo">MACCESS INC. / PSLAW</div>
        <div class="sidebar-course">Final BSIS Assessment</div>
        <div class="sidebar-prog"><div class="sidebar-prog-fill" id="ex-fill" style="width:0%"></div></div>
        <div class="sidebar-prog-label" id="ex-label">0 of ${course.exam.length} answered</div>
      </div>
      <div class="sidebar-modules" style="padding:18px;">
        <div class="attempt-indicator" id="attempt-ind">
          ${Array.from({length:MAX_ATTEMPTS},(_,i)=>`<div class="attempt-dot" id="adot-${i}"></div>`).join('')}
          <span class="attempt-label" id="attempt-label">Attempt 1 of ${MAX_ATTEMPTS}</span>
        </div>
        <div style="font-size:12px;color:#CADCFC;line-height:1.8;">
          <strong style="color:var(--gold);">BSIS Written Examination</strong><br/>
          ${course.exam.length} questions · 100% required<br/>${course.bpcRef}<br/><br/>
          Answer every question. Instant feedback after each selection.<br/><br/>
          <strong style="color:var(--red);">⚠ ${MAX_ATTEMPTS} attempts maximum.</strong><br/>
          After ${MAX_ATTEMPTS} failed attempts, re-enrollment is required.
        </div>
      </div>
    </aside>
    <div class="player-main">
      <div class="player-topbar">
        <div class="player-bc"><strong>${course.title}</strong> — Final Assessment</div>
        <div class="player-sc" id="exam-sc">Q 1 of ${course.exam.length}</div>
      </div>
      <div class="exam-wrap">
        <h2 class="exam-title">BSIS Written Examination</h2>
        <div class="exam-sub">${course.title} · ${course.exam.length} questions · Pass: 100%</div>
        <div class="exam-warn">⚠️ A score of 100% is required per ${course.bpcRef}. Each incorrect answer shows the correct response with a legal citation. Review it before continuing. Full retake required if you do not pass.</div>
        <div class="exam-pw"><div class="exam-pb"><div class="exam-pf" id="exam-fill" style="width:0%"></div></div><div class="exam-pt" id="exam-pt">Q 1 of ${course.exam.length}</div></div>
        <div id="exam-qa"></div>
        <div class="exam-nav">
          <button class="exam-btn exam-back-btn" id="exam-back" onclick="examPrev()" style="display:none">← Previous</button>
          <button class="exam-btn exam-fwd-btn" id="exam-fwd" onclick="examNext()">Next →</button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ══════════════ SCREEN 5: RESULTS ══════════════ -->
<div class="screen" id="sc-results">
  <div style="background:var(--navy);padding:14px 24px;display:flex;align-items:center;justify-content:space-between;">
    <div style="color:var(--gold);font-size:16px;font-weight:700;">MACCESS INC. / PSLAW</div>
    <div style="color:#CADCFC;font-size:12px;">Assessment Results</div>
  </div>
  <div class="results-wrap">
    <div class="results-card">
      <div class="score-ring" id="res-ring"><span id="res-pct"></span><span class="ring-label" id="res-label"></span></div>
      <h2 class="res-title" id="res-title"></h2>
      <p class="res-sub" id="res-sub"></p>
      <div class="breakdown" id="res-breakdown"></div>
      <div class="res-btns" id="res-btns"></div>
      <div class="bsis-note" id="res-note"></div>
    </div>
  </div>
</div>

<!-- ══════════════ SCREEN 6: CERTIFICATE ══════════════ -->
<div class="screen" id="sc-cert">
  <div class="no-print" style="background:var(--navy);padding:14px 24px;display:flex;justify-content:space-between;align-items:center;">
    <div style="color:var(--gold);font-size:16px;font-weight:700;">MACCESS INC. / PSLAW — Certificate of Completion</div>
    <div style="display:flex;gap:10px;">
      <button onclick="window.print()" style="background:var(--gold);color:var(--navy);border:none;padding:9px 20px;border-radius:7px;font-weight:700;cursor:pointer;">🖨️ Print Certificate</button>
      <button onclick="show('sc-results')" style="background:transparent;color:var(--white);border:1.5px solid var(--white);padding:9px 20px;border-radius:7px;font-weight:600;cursor:pointer;">← Results</button>
    </div>
  </div>
  <div class="cert-page"><div class="cert-wrap" id="cert-area"></div></div>
</div>

<!-- ══════════════ SCREEN 7: REPURCHASE LOCK ══════════════ -->
<div class="screen" id="sc-lock">
  <div class="lock-wrap">
    <div class="lock-card">
      <div class="lock-icon">🔒</div>
      <h2 class="lock-title">Maximum Attempts Reached</h2>
      <p class="lock-sub">You have used all <strong>${MAX_ATTEMPTS} attempts</strong> for the <strong>${course.title}</strong> final exam without achieving a passing score of 100%.</p>
      <div class="lock-stripe"></div>
      <div class="lock-policy">
        <strong>MACCESS INC. Assessment Policy:</strong><br/>
        Per BSIS training standards, the Powers to Arrest and all skills courses require demonstrated proficiency. After ${MAX_ATTEMPTS} failed attempts, re-enrollment is required to ensure adequate review of course material before retesting.<br/><br/>
        Re-enrollment includes full access to all course content and a fresh set of ${MAX_ATTEMPTS} exam attempts.
      </div>
      <button class="lock-btn" onclick="window.location.reload()">Re-Enroll — \$${course.price}</button>
      <button class="lock-btn-outline" onclick="show('sc-sales')">Return to Course Information</button>
    </div>
  </div>
</div>

<script>
// ── Course data ────────────────────────────────────────────────────────
const MODULES  = JSON.parse(\`${modulesJ}\`);
const EXAM_QS  = JSON.parse(\`${examJ}\`);
const LT       = ['A','B','C','D'];

// ── Config ─────────────────────────────────────────────────────────────
const TOTAL_SECS  = ${TOTAL_MINUTES} * 60;
const IDLE_WARN   = ${IDLE_MINUTES} * 60;   // seconds before warning
const IDLE_LOCK_S = ${IDLE_LOCK}  * 60;   // seconds before hard lock
const MAX_ATT     = ${MAX_ATTEMPTS};

// ── Session state ──────────────────────────────────────────────────────
let studentName  = '';
let studentEmail = '';

// Timer
let sessionSecsLeft = TOTAL_SECS;
let timerInterval   = null;
let idleSeconds     = 0;
let idleInterval    = null;
let idleCountdown   = 60;
let idleWarned      = false;

// Player state
let curMod   = 0;
let curSlide = 0;                            // -1 = showing module final quiz
let modDone  = new Array(MODULES.length).fill(false);

// Section check-in state: [modIdx][slideIdx][questionIdx] = picked answer | null
let ciPicks  = MODULES.map(m => m.slides.map(s => s.quiz ? s.quiz.map(()=>null) : []));
let ciDone   = MODULES.map(m => m.slides.map(()=>false));

// Module final quiz state: [modIdx][questionIdx] = picked | null
let fqPicks  = MODULES.map(m => m.quiz ? m.quiz.map(()=>null) : []);
let fqDone   = new Array(MODULES.length).fill(false);

// Exam state
let examCur      = 0;
let examAns      = new Array(EXAM_QS.length).fill(null);
let examAnswered = new Array(EXAM_QS.length).fill(false);
let examAttempts = 0;

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
  show('sc-player');
  startTimer();
  startIdleWatch();
  renderPlayer();
}

// ── TIMER ──────────────────────────────────────────────────────────────
function startTimer(){
  updateTimerDisplay();
  timerInterval = setInterval(()=>{
    sessionSecsLeft--;
    updateTimerDisplay();
    if(sessionSecsLeft <= 0) onTimeExpired();
  }, 1000);
}

function updateTimerDisplay(){
  const m  = Math.floor(sessionSecsLeft/60);
  const s  = sessionSecsLeft % 60;
  const txt = \`\${String(m).padStart(2,'0')}:\${String(s).padStart(2,'0')}\`;
  const pct = (sessionSecsLeft / TOTAL_SECS) * 100;
  ['timer-display','timer-display-exam'].forEach(id=>{
    const el = document.getElementById(id);
    if(!el) return;
    el.textContent = txt;
    el.className   = 'timer-display' + (sessionSecsLeft < 300 ? ' critical' : sessionSecsLeft < 600 ? ' warn' : '');
  });
  ['timer-fill','timer-fill-exam'].forEach(id=>{
    const el = document.getElementById(id);
    if(!el) return;
    el.style.width   = pct + '%';
    el.className     = 'timer-progress-fill' + (sessionSecsLeft < 300 ? ' critical' : sessionSecsLeft < 600 ? ' warn' : '');
  });
}

function onTimeExpired(){
  clearInterval(timerInterval);
  clearInterval(idleInterval);
  alert('⏰ Your session time has expired. Your progress has been saved. Please re-enroll to continue.');
  show('sc-sales');
}

// ── IDLE DETECTION ──────────────────────────────────────────────────────
function startIdleWatch(){
  idleInterval = setInterval(()=>{
    idleSeconds++;
    if(idleSeconds >= IDLE_LOCK_S){
      clearInterval(idleInterval);
      clearInterval(timerInterval);
      document.getElementById('idle-overlay').classList.remove('show');
      alert('Your session has been locked due to inactivity. Please re-enroll to continue.');
      show('sc-sales');
      return;
    }
    if(idleSeconds >= IDLE_WARN && !idleWarned){
      idleWarned = true;
      showIdleWarning();
    }
    if(idleWarned){
      idleCountdown = Math.max(0, IDLE_LOCK_S - idleSeconds);
      const cd = document.getElementById('idle-countdown');
      if(cd) cd.textContent = idleCountdown;
    }
  }, 1000);
}

function resetIdle(){
  idleSeconds = 0;
  idleWarned  = false;
  document.getElementById('idle-overlay').classList.remove('show');
}

function showIdleWarning(){
  idleCountdown = IDLE_LOCK_S - idleSeconds;
  document.getElementById('idle-overlay').classList.add('show');
}

function dismissIdle(){
  resetIdle();
}

// Reset idle on any user interaction
['click','keydown','mousemove','touchstart'].forEach(evt=>{
  document.addEventListener(evt, resetIdle, {passive:true});
});

// ── SIDEBAR ────────────────────────────────────────────────────────────
function updateSidebar(){
  const done  = modDone.filter(Boolean).length;
  const total = MODULES.length + 1;
  const pct   = Math.round(done/total*100);
  document.getElementById('sb-fill').style.width  = pct + '%';
  document.getElementById('sb-label').textContent = pct + '% complete';

  MODULES.forEach((_,i)=>{
    const el = document.getElementById('sbm-'+i);
    const st = document.getElementById('sbms-'+i);
    if(!el||!st) return;
    el.className = 'sbm' + (i===curMod?' s-active':modDone[i]?' s-done':(i>0&&!modDone[i-1])?' s-locked':'');
    st.textContent = modDone[i]?'✓':(i===curMod?'▶':(i===0||modDone[i-1])?'▶':'🔒');
  });

  const examEl = document.getElementById('sb-exam-link');
  if(examEl) examEl.className = 'sbm-exam' + (modDone.every(Boolean)?'':' s-locked');
}

function jumpMod(i){
  if(i>0 && !modDone[i-1]) return;
  curMod=i; curSlide=0;
  show('sc-player');
  renderPlayer();
}

function jumpExam(){
  if(!modDone.every(Boolean)) return;
  show('sc-exam');
  renderExamQ();
}

// ── PLAYER ─────────────────────────────────────────────────────────────
function renderPlayer(){
  updateSidebar();
  const mod    = MODULES[curMod];
  const slides = mod.slides;
  const inFQ   = curSlide === slides.length;   // showing module final quiz

  document.getElementById('player-bc').innerHTML =
    \`<strong>\${mod.icon} Module \${mod.num}: \${mod.title}</strong>\`;

  if(inFQ){
    document.getElementById('player-sc').textContent = 'Module Quiz';
    document.getElementById('nav-next').textContent  = fqDone[curMod] ? 'Continue →' : 'Submit Quiz';
    document.getElementById('nav-back').style.display = 'inline-block';
    document.getElementById('slide-dots').innerHTML  = '';
    renderFinalQuiz();
  } else {
    const isLast = curSlide === slides.length - 1;
    document.getElementById('player-sc').textContent = \`Section \${curSlide+1} of \${slides.length}\`;
    document.getElementById('nav-next').textContent  = isLast ? 'Module Quiz →' : 'Next Section →';
    document.getElementById('nav-back').style.display = (curSlide===0 && curMod===0) ? 'none' : 'inline-block';
    renderDots(slides.length, curSlide);
    renderSlideWithCheckIn(slides[curSlide], curMod, curSlide);
  }
}

function renderDots(total, cur){
  document.getElementById('slide-dots').innerHTML =
    Array.from({length:total},(_,i)=>
      \`<div class="dot \${i<cur?'d-done':i===cur?'d-active':''}"></div>\`
    ).join('');
}

// ── SLIDE + INLINE CHECK-IN ─────────────────────────────────────────────
function renderSlideWithCheckIn(slide, mi, si){
  const hasCI   = slide.quiz && slide.quiz.length > 0;
  const isDone  = ciDone[mi][si];

  let html = \`<div class="slide-wrap">
    <div class="slide-heading">\${slide.heading}</div>
    <div class="slide-subheading">\${slide.subheading}</div>
    <div class="slide-body">\${slide.renderedHTML||''}</div>\`;

  if(hasCI){
    html += \`<div class="check-in">
      <div class="check-in-header">
        <div class="check-in-icon">✏️</div>
        <div class="check-in-title">Section Check-In — Answer to continue</div>
      </div>
      <div class="check-in-body">\`;

    slide.quiz.forEach((q,qi)=>{
      const picked = ciPicks[mi][si][qi];
      const done   = picked !== null;
      html += \`<div class="ci-q">
        <div class="ci-qtext">\${qi+1}. \${q.q}</div>
        <div class="ci-opts">\`;
      q.options.forEach((opt,oi)=>{
        let cls = 'ci-opt';
        if(done){ cls += oi===q.answer?' ci-ok':(oi===picked?' ci-no':''); cls += ' ci-done'; }
        else if(oi===picked) cls += ' ci-sel';
        const clk = done ? '' : \`onclick="pickCI(\${mi},\${si},\${qi},\${oi},\${q.answer})"\`;
        html += \`<div class="\${cls}" \${clk}><div class="ci-ol">\${LT[oi]}</div><span>\${opt}</span></div>\`;
      });
      html += \`</div>\`; // ci-opts
      if(done){
        const ok = picked===q.answer;
        html += \`<div class="ci-fb \${ok?'ci-fb-ok':'ci-fb-no'}">\${ok?'✓ Correct':'✗ Incorrect — Correct answer: '+LT[q.answer]+'. '+q.options[q.answer]}\${q.ref?' — '+q.ref:''}</div>\`;
      }
      html += \`</div>\`; // ci-q
    });

    if(!isDone){
      html += \`<div class="check-in-pending">Answer all questions above to proceed to the next section.</div>\`;
    }

    html += \`</div></div>\`; // check-in-body, check-in
  }

  html += \`</div>\`; // slide-wrap
  document.getElementById('player-content').innerHTML = html;

  // Lock Next button until check-in is complete
  document.getElementById('nav-next').disabled = hasCI && !isDone;
}

function pickCI(mi, si, qi, picked, correct){
  if(ciPicks[mi][si][qi] !== null) return; // already answered
  ciPicks[mi][si][qi] = picked;

  // Check if all questions in this slide answered
  const allDone = ciPicks[mi][si].every(p => p !== null);
  if(allDone) ciDone[mi][si] = true;

  renderSlideWithCheckIn(MODULES[mi].slides[si], mi, si);
}

// ── MODULE FINAL QUIZ ──────────────────────────────────────────────────
function renderFinalQuiz(){
  const mod    = MODULES[curMod];
  const done   = fqDone[curMod];

  let html = \`<div class="final-quiz">
    <div class="fq-header">
      <div class="fq-title">Module \${mod.num} — Final Quiz</div>
      <div class="fq-sub">Answer all \${mod.quiz.length} questions correctly to unlock the next module.</div>
    </div>
    <div class="fq-body">\`;

  mod.quiz.forEach((q,qi)=>{
    const picked = fqPicks[curMod][qi];
    const answered = picked !== null;
    html += \`<div class="fq-q">
      <div class="fq-qtext">\${qi+1}. \${q.q}</div>
      <div class="fq-opts">\`;
    q.options.forEach((opt,oi)=>{
      let cls = 'fq-opt';
      if(answered){ cls += oi===q.answer?' fq-ok':(oi===picked?' fq-no':''); cls += ' fq-done'; }
      else if(oi===picked) cls += ' fq-sel';
      const clk = answered ? '' : \`onclick="pickFQ(\${curMod},\${qi},\${oi},\${q.answer})"\`;
      html += \`<div class="\${cls}" \${clk}><div class="fq-ol">\${LT[oi]}</div><span>\${opt}</span></div>\`;
    });
    html += \`</div>\`;
    if(answered){
      const ok = picked===q.answer;
      html += \`<div class="fq-fb \${ok?'fq-fb-ok':'fq-fb-no'}">\${ok?'✓ Correct':'✗ Incorrect — Correct answer: '+LT[q.answer]+'. '+q.options[q.answer]}\${q.ref?' — '+q.ref:''}</div>\`;
    }
    html += \`</div>\`;
  });

  html += \`</div>\`; // fq-body

  const allAnswered = fqPicks[curMod].every(p=>p!==null);
  const allCorrect  = allAnswered && mod.quiz.every((q,i)=>fqPicks[curMod][i]===q.answer);

  if(done){
    html += \`<div class="fq-complete">✓ Module quiz complete — click "Continue →" to proceed.</div>\`;
  } else if(allAnswered && !allCorrect){
    const wrong = mod.quiz.filter((q,i)=>fqPicks[curMod][i]!==q.answer).length;
    html += \`<div style="padding:14px 18px;background:var(--red-lt);font-size:13px;color:var(--red);font-weight:600;border-top:1px solid #f5c6cb;">
      \${wrong} incorrect answer\${wrong>1?'s':''}. Review the feedback above and click "Submit Quiz" to record your attempt. You must review the module slides and retake the quiz to proceed.
    </div>\`;
  }

  html += \`</div>\`; // final-quiz
  document.getElementById('player-content').innerHTML = html;

  // Lock Next unless quiz is done
  document.getElementById('nav-next').disabled = !fqDone[curMod];
}

function pickFQ(mi, qi, picked, correct){
  if(fqPicks[mi][qi] !== null) return;
  fqPicks[mi][qi] = picked;
  renderFinalQuiz();
}

// ── NAVIGATION ─────────────────────────────────────────────────────────
function navNext(){
  const mod    = MODULES[curMod];
  const slides = mod.slides;
  const inFQ   = curSlide === slides.length;

  if(inFQ){
    // Check if all final quiz questions answered
    const allAnswered = fqPicks[curMod].every(p=>p!==null);
    if(!allAnswered){ alert('Please answer all quiz questions.'); return; }

    const allCorrect = mod.quiz.every((q,i)=>fqPicks[curMod][i]===q.answer);
    if(!fqDone[curMod]){
      if(allCorrect){
        fqDone[curMod] = true;
        modDone[curMod] = true;
        renderFinalQuiz();
        return;
      } else {
        // Incorrect answers shown — user must review
        fqDone[curMod] = false;
        renderFinalQuiz();
        return;
      }
    }

    // Quiz passed — advance
    if(curMod < MODULES.length - 1){
      curMod++;
      curSlide = 0;
      // Unlock next module in sidebar
      const nxt = document.getElementById('sbm-'+curMod);
      if(nxt) nxt.classList.remove('s-locked');
      renderPlayer();
    } else {
      // All modules done — go to exam
      const examEl = document.getElementById('sb-exam-link');
      if(examEl) examEl.className = 'sbm-exam';
      show('sc-exam');
      renderExamQ();
    }
  } else {
    // Check slide check-in complete
    const slide = slides[curSlide];
    if(slide.quiz && slide.quiz.length > 0 && !ciDone[curMod][curSlide]){
      alert('Please answer the check-in questions before continuing.');
      return;
    }
    curSlide++;
    renderPlayer();
  }
}

function navBack(){
  if(curSlide > 0){ curSlide--; renderPlayer(); }
  else if(curMod > 0){
    curMod--;
    curSlide = MODULES[curMod].slides.length; // go to FQ of previous module
    renderPlayer();
  }
}

// ── FINAL EXAM ─────────────────────────────────────────────────────────
function renderExamQ(){
  const q   = EXAM_QS[examCur];
  const pct = Math.round(examCur/EXAM_QS.length*100);
  document.getElementById('exam-fill').style.width = pct + '%';
  document.getElementById('exam-pt').textContent   = \`Q \${examCur+1} of \${EXAM_QS.length}\`;
  document.getElementById('exam-sc').textContent   = \`Q \${examCur+1} of \${EXAM_QS.length}\`;
  document.getElementById('exam-back').style.display = examCur>0?'inline-block':'none';
  document.getElementById('exam-fwd').textContent  =
    examCur===EXAM_QS.length-1 ? 'Submit Assessment' : 'Next →';

  // Update attempt dots
  updateAttemptDots();
  // Sidebar progress
  const ans = examAnswered.filter(Boolean).length;
  document.getElementById('ex-fill').style.width = Math.round(ans/EXAM_QS.length*100)+'%';
  document.getElementById('ex-label').textContent = ans+' of '+EXAM_QS.length+' answered';

  const sel = examAns[examCur];
  const answered = examAnswered[examCur];
  const oh = q.options.map((opt,oi)=>{
    let cls='exam-opt';
    if(answered){ if(oi===q.answer)cls+=' ok'; else if(oi===sel&&oi!==q.answer)cls+=' no'; }
    else if(oi===sel) cls+=' sel';
    const clk = answered?'':(\`onclick="pickExam(\${oi})"\`);
    return \`<div class="\${cls}" \${clk}><div class="exam-ol">\${LT[oi]}</div><span>\${opt}</span></div>\`;
  }).join('');
  let fb='';
  if(answered){
    if(sel===q.answer) fb=\`<div class="exam-fb show exam-fb-ok">✓ Correct — \${q.ref}</div>\`;
    else fb=\`<div class="exam-fb show exam-fb-no">✗ Incorrect. Correct: <strong>\${LT[q.answer]}. \${q.options[q.answer]}</strong> — \${q.ref}</div>\`;
  }
  document.getElementById('exam-qa').innerHTML=\`
    <div class="exam-qblock">
      <span class="exam-mod-badge">\${q.module}<span class="exam-ref">\${q.ref}</span></span>
      <div class="exam-qnum">Question \${examCur+1} of \${EXAM_QS.length}</div>
      <div class="exam-qtext">\${q.q}</div>
      <div class="exam-opts">\${oh}</div>
      \${fb}
    </div>\`;
}

function updateAttemptDots(){
  document.getElementById('attempt-label').textContent =
    \`Attempt \${examAttempts+1} of \${MAX_ATT}\`;
  for(let i=0;i<MAX_ATT;i++){
    const dot = document.getElementById('adot-'+i);
    if(!dot) continue;
    dot.className = 'attempt-dot' + (i<examAttempts?' used':i===examAttempts?' current':'');
  }
}

function pickExam(oi){
  if(examAnswered[examCur]) return;
  examAns[examCur]      = oi;
  examAnswered[examCur] = true;
  renderExamQ();
}

function examNext(){
  if(!examAnswered[examCur]){ alert('Please select an answer before continuing.'); return; }
  if(examCur < EXAM_QS.length-1){ examCur++; renderExamQ(); }
  else showResults();
}

function examPrev(){
  if(examCur > 0){ examCur--; renderExamQ(); }
}

// ── RESULTS ─────────────────────────────────────────────────────────────
function showResults(){
  show('sc-results');
  let correct=0;
  const mm={};
  EXAM_QS.forEach((q,i)=>{
    if(examAns[i]===q.answer) correct++;
    if(!mm[q.module]) mm[q.module]={c:0,t:0};
    mm[q.module].t++;
    if(examAns[i]===q.answer) mm[q.module].c++;
  });
  const pct  = Math.round(correct/EXAM_QS.length*100);
  const pass = pct===100;

  examAttempts++;

  const ring = document.getElementById('res-ring');
  ring.className = 'score-ring '+(pass?'ring-pass':'ring-fail');
  document.getElementById('res-pct').textContent   = correct+'/'+EXAM_QS.length;
  document.getElementById('res-label').textContent = pass?'PASSED':'NOT PASSED';

  const rt = document.getElementById('res-title');
  rt.className = 'res-title '+(pass?'rt-pass':'rt-fail');
  rt.textContent = pass ? '✓ Assessment Passed' : '✗ Assessment Not Passed';

  const attLeft = MAX_ATT - examAttempts;
  document.getElementById('res-sub').innerHTML = pass
    ? \`Congratulations, <strong>\${studentName}</strong>. You scored \${correct}/\${EXAM_QS.length} (100%) and have satisfied the BSIS assessment requirement per ${course.bpcRef}.\`
    : \`You scored \${correct}/\${EXAM_QS.length} (\${pct}%). A score of 100% is required per ${course.bpcRef}.\${attLeft>0?' You have <strong>'+attLeft+' attempt'+( attLeft>1?'s':'')+' remaining</strong>.':' <strong>This was your final attempt.</strong> Re-enrollment is required.'}\`;

  let bh='<h3>Score by Module</h3>';
  for(const[m,d] of Object.entries(mm)){
    const mp=Math.round(d.c/d.t*100);
    bh+=\`<div class="bd-row"><span style="color:var(--gray)">\${m}</span><span class="\${d.c===d.t?'bd-pass':'bd-fail'}">\${d.c}/\${d.t} (\${mp}%)</span></div>\`;
  }
  bh+=\`<div class="bd-row"><span>Overall</span><span class="\${pass?'bd-pass':'bd-fail'}">\${correct}/\${EXAM_QS.length} (\${pct}%)</span></div>\`;
  document.getElementById('res-breakdown').innerHTML=bh;

  let btns = '';
  if(pass){
    btns += \`<button class="r-btn r-primary" onclick="showCert()">View Certificate →</button>\`;
  } else if(examAttempts >= MAX_ATT){
    // Lock out — no more retake button
    btns += \`<button class="r-btn" style="background:var(--red);color:#fff;cursor:pointer;" onclick="show('sc-lock')">Re-Enrollment Required →</button>\`;
  } else {
    btns += \`<button class="r-btn r-outline" onclick="retakeExam()">↺ Retake Assessment (Attempt \${examAttempts+1}/\${MAX_ATT})</button>\`;
  }
  document.getElementById('res-btns').innerHTML=btns;

  document.getElementById('res-note').innerHTML = pass
    ? \`<strong>BSIS Compliance:</strong> This certificate satisfies the ${course.hours}-hour training requirement under ${course.bpcRef}. Print and retain until your guard card expires — Title 16 CCR §643(b). MACCESS INC. PPO #122729 maintains your training record.\`
    : examAttempts >= MAX_ATT
    ? \`<strong>Maximum Attempts Reached:</strong> You have used all \${MAX_ATT} attempts. Re-enrollment is required per MACCESS INC. assessment policy. Click above to re-enroll.\`
    : \`<strong>BSIS Requirement:</strong> 100% is required per ${course.bpcRef}. Review the incorrect answers above before retaking. You have \${MAX_ATT - examAttempts} attempt\${MAX_ATT-examAttempts>1?'s':''} remaining.\`;
}

function retakeExam(){
  if(examAttempts >= MAX_ATT){ show('sc-lock'); return; }
  examCur      = 0;
  examAns      = new Array(EXAM_QS.length).fill(null);
  examAnswered = new Array(EXAM_QS.length).fill(false);
  show('sc-exam');
  renderExamQ();
}

// ── CERTIFICATE ──────────────────────────────────────────────────────────
function showCert(){
  const d = new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
  document.getElementById('cert-area').innerHTML=\`
    <div class="cert-eyebrow">Certificate of Completion</div>
    <div class="cert-stripe"></div>
    <div class="cert-co">MACCESS INC.</div>
    <div class="cert-ppo">Private Patrol Operator | PPO License #122729 | BSIS-Authorized Training Provider</div>
    <div class="cert-certifies">This certifies that</div>
    <div class="cert-name">\${studentName}</div>
    <div class="cert-body">has successfully completed the BSIS-compliant training course:</div>
    <div class="cert-course">${course.title}</div>
    <div class="cert-badge">Score: 100% ✓ Passing</div>
    <div class="cert-body">This completion satisfies the ${course.hours}-hour training requirement under ${course.bpcRef} and California BSIS training standards. Retain until guard card expires or is canceled — Title 16 CCR §643(b).</div>
    <div class="cert-stripe"></div>
    <div class="cert-sigs">
      <div class="cert-sig"><div class="cert-sig-line"></div><div class="cert-sig-label">Student Signature</div></div>
      <div class="cert-sig"><div class="cert-sig-line"></div><div class="cert-sig-label">Date: \${d}</div></div>
      <div class="cert-sig"><div class="cert-sig-line"></div><div class="cert-sig-label">Instructor — MACCESS INC.</div></div>
    </div>\`;
  show('sc-cert');
}
</script>
</body>
</html>`;
}

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
