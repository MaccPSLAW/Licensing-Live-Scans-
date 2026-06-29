// ═══════════════════════════════════════════════════════════════════════════════
// BUNDLE DEFINITIONS
// Smart-grouped pricing packages matching BSIS licensing requirements
// ═══════════════════════════════════════════════════════════════════════════════
const BUNDLES = {
  guard_card_8hr: {
    id:       "guard_card_8hr",
    name:     "Guard Card Pre-Registration Package",
    subtitle: "Everything required before submitting your BSIS guard card application",
    price:    "79",
    badge:    "BEST VALUE",
    color:    "#1B2B5E",
    hours:    "8",
    description: "Completes the full 8-hour pre-registration requirement (SB 652, eff. Jan 1 2026). Must be completed with a single provider. Includes Powers to Arrest (3 hrs) + Appropriate Use of Force (5 hrs).",
    includes: [
      "Powers to Arrest — 3 Hours",
      "Appropriate Use of Force — 5 Hours",
      "Both BSIS 100% exams included",
      "Certificates of Completion for both modules",
      "Counts as your single-provider pre-registration",
    ],
    keys: [
      "Powers_to_Arrest_BSIS_Certification_MACCESS_INC",
      "Appropriate_Use_of_Force_BSIS_Certification_MACCESS_INC",
    ],
  },
  skills_32hr: {
    id:       "skills_32hr",
    name:     "32-Hour Skills Training Package",
    subtitle: "All 4 mandatory + 2 elective skills courses — complete your full skills requirement",
    price:    "199",
    badge:    "COMPLETE PACKAGE",
    color:    "#1A5C3A",
    hours:    "24",
    description: "Covers all 4 BSIS mandatory skills courses (required within 6 months of registration) plus 2 high-value electives. 24 of your 32 required skills hours in one package.",
    includes: [
      "Public Relations & Community — 4 hrs (mandatory, within 30 days)",
      "Observation & Documentation — 4 hrs (mandatory, within 30 days)",
      "Communication & Its Significance — 4 hrs (mandatory, within 6 months)",
      "Liability & Legal Aspects — 4 hrs (mandatory, within 6 months)",
      "Officer Safety — 4 hrs (elective)",
      "Handling Difficult People — 4 hrs (elective)",
      "All 6 BSIS exams + Certificates of Completion",
    ],
    keys: [
      "Public_Relations_Community_BSIS_Skills_MACCESS_INC",
      "Observation_Documentation_BSIS_Skills_MACCESS_INC",
      "Communication_Significance_BSIS_Skills_MACCESS_INC",
      "Liability_Legal_Aspects_BSIS_Skills_MACCESS_INC",
      "Officer_Safety_BSIS_Skills_MACCESS_INC",
      "Handling_Difficult_People_BSIS_Skills_MACCESS_INC",
    ],
  },
  full_licensing: {
    id:       "full_licensing",
    name:     "Complete Guard Licensing Bundle",
    subtitle: "Everything from zero to fully licensed — 8-hr pre-registration + full skills training",
    price:    "269",
    badge:    "MOST POPULAR",
    color:    "#C9A84C",
    hours:    "32",
    description: "The complete path to your guard card. 8-hour pre-registration + all 4 mandatory skills courses + 2 electives. Everything BSIS requires in one discounted package.",
    includes: [
      "Full 8-Hour Pre-Registration (PTA + AUF)",
      "All 4 Mandatory Skills Courses",
      "2 Elective Skills Courses",
      "8 BSIS exams + 8 Certificates of Completion",
      "32 total training hours",
      "Priority email support from MACCESS INC.",
    ],
    keys: [
      "Powers_to_Arrest_BSIS_Certification_MACCESS_INC",
      "Appropriate_Use_of_Force_BSIS_Certification_MACCESS_INC",
      "Public_Relations_Community_BSIS_Skills_MACCESS_INC",
      "Observation_Documentation_BSIS_Skills_MACCESS_INC",
      "Communication_Significance_BSIS_Skills_MACCESS_INC",
      "Liability_Legal_Aspects_BSIS_Skills_MACCESS_INC",
      "Officer_Safety_BSIS_Skills_MACCESS_INC",
      "Handling_Difficult_People_BSIS_Skills_MACCESS_INC",
    ],
  },
  baton_addon: {
    id:       "baton_addon",
    name:     "Baton Certification",
    subtitle: "BSIS Baton Permit qualification course — add-on to any package",
    price:    "59",
    badge:    "ADD-ON",
    color:    "#7B4500",
    hours:    "4",
    description: "4-hour BSIS elective covering all baton types, vital areas, use-of-force, and the 24-question official BSIS exam. Required before carrying a baton on duty. Note: Full BSIS permit issuance requires a certified TFB facility.",
    includes: [
      "All 4 authorized baton types covered",
      "7 vital areas identification (exam requirement)",
      "24 official BSIS baton exam questions",
      "Vital areas interactive identification section",
      "Certificate of Completion (4-hr elective credit)",
    ],
    keys: ["Baton_Certification_BSIS_MACCESS_INC"],
  },
  workplace_violence_addon: {
    id:       "workplace_violence_addon",
    name:     "Workplace Violence Prevention",
    subtitle: "BSIS elective + CA SB 553 compliance — add-on to any package",
    price:    "49",
    badge:    "ADD-ON",
    color:    "#8B1A1A",
    hours:    "4",
    description: "Covers all 5 BSIS Workplace Violence syllabus topics and satisfies the annual employee training requirement under CA Labor Code §6401.9 (SB 553, eff. July 1 2024).",
    includes: [
      "All 5 BSIS WV syllabus topics",
      "CA SB 553 compliance training (Labor Code §6401.9)",
      "Certificate satisfies annual SB 553 training requirement",
      "4 elective credit hours toward 32-hour requirement",
    ],
    keys: ["Workplace_Violence_BSIS_Skills_MACCESS_INC"],
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// BUILD + PUSH
// ═══════════════════════════════════════════════════════════════════════════════
const fs    = require("fs");
const path  = require("path");
const https = require("https");

const TOKEN = process.env.GITHUB_TOKEN;
const REPO  = "MaccPSLAW/Licensing-Live-Scans-";
const DIR   = "PSLAW-Courses/final-projects";

function pushGH(localPath, repoPath, message) {
  return new Promise(resolve => {
    const data = fs.readFileSync(localPath);
    const enc  = data.toString("base64");
    const getO = { hostname:"api.github.com", path:`/repos/${REPO}/contents/${encodeURIComponent(repoPath)}`, method:"GET", headers:{"Authorization":`token ${TOKEN}`,"User-Agent":"MACCESS"} };
    https.request(getO, r => {
      let b=""; r.on("data",d=>b+=d);
      r.on("end",() => {
        let sha=""; try{sha=JSON.parse(b).sha||"";}catch{}
        const pay = JSON.stringify({message,content:enc,branch:"main",...(sha&&{sha})});
        const putO = {hostname:"api.github.com",path:`/repos/${REPO}/contents/${encodeURIComponent(repoPath)}`,method:"PUT",headers:{"Authorization":`token ${TOKEN}`,"Content-Type":"application/json","User-Agent":"MACCESS","Content-Length":Buffer.byteLength(pay)}};
        const pr = https.request(putO, r2=>{let b2="";r2.on("data",d=>b2+=d);r2.on("end",()=>{try{resolve("content" in JSON.parse(b2));}catch{resolve(false);}});});
        pr.write(pay); pr.end();
      });
    }).end();
  });
}

function buildAll(outputDir) {
  outputDir = outputDir || "/home/claude";
  const results = [];

  // Build individual course pages
  for (const [key, course] of Object.entries(CATALOG)) {
    const html    = buildPlatformHTML(key, course);
    const outPath = path.join(outputDir, `${key}-Test.html`);
    fs.writeFileSync(outPath, html);
    const kb = Math.round(fs.statSync(outPath).size / 1024);
    console.log(`  ✓ ${key}-Test.html (${kb} KB)`);
    results.push({ key, outPath });
  }

  // Build the store / bundle index page
  const storePage = buildStorePage();
  const storePath = path.join(outputDir, "index.html");
  fs.writeFileSync(storePath, storePage);
  console.log(`  ✓ index.html — Course Store (${Math.round(fs.statSync(storePath).size/1024)} KB)`);

  // Build student profile / admin dashboard
  const dashPage = buildAdminDashboard();
  const dashPath = path.join(outputDir, "admin-dashboard.html");
  fs.writeFileSync(dashPath, dashPage);
  console.log(`  ✓ admin-dashboard.html — Student Records & Certificate Tracker`);

  return results;
}

async function buildAndPush(outputDir) {
  outputDir = outputDir || "/home/claude";
  buildAll(outputDir);

  if (!TOKEN) { console.log("  (No GITHUB_TOKEN — skipping push)"); return; }

  console.log("\n  Pushing to GitHub...");
  const toPush = [
    ["index.html",          "PSLAW-Courses/final-projects/index.html",          "feat: course store — bundle pricing page"],
    ["admin-dashboard.html","PSLAW-Courses/final-projects/admin-dashboard.html","feat: admin dashboard — student records + certificate tracker"],
  ];
  for (const [fname, repoPath, msg] of toPush) {
    const local = `${outputDir}/${fname}`;
    if (!fs.existsSync(local)) continue;
    const ok = await pushGH(local, repoPath, msg);
    console.log(`    ${ok?"✅":"❌"} ${fname}`);
  }
  for (const [key] of Object.entries(CATALOG)) {
    const local = `${outputDir}/${key}-Test.html`;
    if (!fs.existsSync(local)) continue;
    const ok = await pushGH(local, `${DIR}/${key}-Test.html`, `feat: ${key} — updated platform`);
    console.log(`    ${ok?"✅":"❌"} ${key}-Test.html`);
  }

  // Auto-update README
  try {
    const { autoUpdateReadme } = require("./update_readme");
    await autoUpdateReadme(TOKEN);
  } catch(e) { console.log("  README update skipped:", e.message); }
}

// ═══════════════════════════════════════════════════════════════════════════════
// STORE PAGE — Bundle pricing + individual courses
// ═══════════════════════════════════════════════════════════════════════════════
function buildStorePage() {
  const bundleCards = Object.values(BUNDLES).map(b => {
    const isAddon   = b.badge === "ADD-ON";
    const isBest    = b.badge === "MOST POPULAR";
    const borderCol = isBest ? b.color : "#dde4f0";
    return `
    <div class="bundle-card ${isBest?'bundle-featured':''}" style="border-top:4px solid ${b.color};">
      <div class="bundle-badge" style="background:${b.color}">${b.badge}</div>
      <div class="bundle-name">${b.name}</div>
      <div class="bundle-sub">${b.subtitle}</div>
      <div class="bundle-price">\$${b.price}</div>
      <div class="bundle-hours">${b.hours} Credit Hours</div>
      <ul class="bundle-includes">
        ${b.includes.map(i=>`<li>✓ ${i}</li>`).join('')}
      </ul>
      <p class="bundle-desc">${b.description}</p>
      <button class="bundle-btn" style="background:${isBest?b.color:'#1B2B5E'};color:${isBest?'#1B2B5E':'#fff'}" 
        onclick="enrollBundle('${b.id}')">
        ${isAddon?'Add to Cart —':'Enroll Now —'} \$${b.price}
      </button>
    </div>`;
  }).join('');

  const courseRows = Object.entries(CATALOG).map(([key, c]) => `
    <tr>
      <td><strong>${c.title}</strong></td>
      <td>${c.category}</td>
      <td>${c.hours} hrs</td>
      <td>${c.bpcRef}</td>
      <td>\$${c.price}</td>
      <td><a href="${key}-Test.html" class="table-link">Enroll →</a></td>
    </tr>`).join('');

  return `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>PSLAW Academy — BSIS Security Guard Training | MACCESS INC.</title>
<style>
:root{--n:#1B2B5E;--g:#C9A84C;--r:#8B1A1A;--ok:#1A5C3A;--l:#F4F6FB;--gr:#4A5568;--wh:#fff;}
*{box-sizing:border-box;margin:0;padding:0;}body{font-family:'Segoe UI',Arial,sans-serif;background:var(--l);color:#1A1A2E;}
.hdr{background:var(--n);padding:14px 28px;display:flex;align-items:center;justify-content:space-between;}
.logo{color:var(--g);font-size:20px;font-weight:800;letter-spacing:.04em;}
.hdr-meta{color:#CADCFC;font-size:11px;text-align:right;line-height:1.5;}
.hdr-nav a{color:var(--g);font-size:13px;font-weight:600;text-decoration:none;margin-left:20px;}
.gold-bar{height:5px;background:var(--g);}
/* Hero */
.hero{background:#12193A;color:#fff;padding:64px 24px 52px;text-align:center;}
.hero-badge{display:inline-block;background:var(--r);color:#fff;font-size:11px;font-weight:700;padding:5px 16px;border-radius:4px;letter-spacing:.1em;text-transform:uppercase;margin-bottom:18px;}
.hero-title{font-size:46px;font-weight:800;line-height:1.1;margin-bottom:14px;}
.hero-sub{font-size:18px;color:#CADCFC;max-width:640px;margin:0 auto 32px;}
.hero-chips{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}
.chip{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);border-radius:6px;padding:8px 18px;font-size:13px;color:#fff;}
/* Bundles */
.bundles-section{padding:64px 24px;}
.bundles-inner{max-width:1100px;margin:0 auto;}
.section-eye{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--g);margin-bottom:8px;}
.section-title{font-size:32px;font-weight:700;color:var(--n);margin-bottom:10px;}
.section-sub{font-size:15px;color:var(--gr);margin-bottom:40px;max-width:640px;}
.bundles-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:32px;}
.addons-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;}
.addons-label{font-size:13px;font-weight:700;color:var(--gr);text-transform:uppercase;letter-spacing:.08em;margin:40px 0 16px;padding-top:32px;border-top:2px solid var(--g);}
.bundle-card{background:var(--wh);border-radius:12px;border:1px solid #dde4f0;padding:28px;display:flex;flex-direction:column;gap:12px;position:relative;}
.bundle-featured{box-shadow:0 8px 32px rgba(27,43,94,.18);}
.bundle-badge{display:inline-block;font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:4px 12px;border-radius:4px;color:#fff;align-self:flex-start;}
.bundle-name{font-size:18px;font-weight:700;color:var(--n);line-height:1.3;}
.bundle-sub{font-size:13px;color:var(--gr);line-height:1.5;}
.bundle-price{font-size:40px;font-weight:800;color:var(--n);}
.bundle-hours{font-size:12px;color:var(--gr);margin-top:-8px;}
.bundle-includes{list-style:none;display:flex;flex-direction:column;gap:6px;flex:1;}
.bundle-includes li{font-size:13px;color:#1A1A2E;padding-left:4px;}
.bundle-desc{font-size:12px;color:var(--gr);line-height:1.6;padding:10px;background:var(--l);border-radius:6px;}
.bundle-btn{padding:14px;border-radius:8px;font-size:15px;font-weight:700;border:none;cursor:pointer;text-align:center;transition:opacity .15s;}
.bundle-btn:hover{opacity:.88;}
/* Individual courses table */
.courses-section{background:var(--wh);padding:64px 24px;}
.courses-inner{max-width:1100px;margin:0 auto;}
.courses-table{width:100%;border-collapse:collapse;margin-top:28px;}
.courses-table th{background:var(--n);color:#fff;padding:12px 16px;font-size:12px;font-weight:600;text-align:left;letter-spacing:.04em;}
.courses-table td{padding:12px 16px;border-bottom:1px solid #eee;font-size:14px;}
.courses-table tr:hover td{background:var(--l);}
.table-link{background:var(--n);color:#fff;padding:6px 14px;border-radius:6px;text-decoration:none;font-size:13px;font-weight:600;}
.table-link:hover{background:#243a7a;}
/* How it works */
.hiw-section{background:var(--l);padding:64px 24px;}
.hiw-inner{max-width:900px;margin:0 auto;}
.hiw-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:32px;}
.hiw-step{background:var(--wh);border-radius:10px;padding:24px;border:1px solid #dde4f0;text-align:center;}
.hiw-num{width:44px;height:44px;border-radius:50%;background:var(--n);color:#fff;font-size:18px;font-weight:700;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;}
.hiw-title{font-size:14px;font-weight:700;color:var(--n);margin-bottom:6px;}
.hiw-text{font-size:13px;color:var(--gr);line-height:1.6;}
/* Policy box */
.policy-section{background:var(--n);padding:48px 24px;}
.policy-inner{max-width:900px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px;}
.policy-block{color:#CADCFC;}
.policy-block h3{color:var(--g);font-size:14px;font-weight:700;margin-bottom:10px;}
.policy-block p{font-size:13px;line-height:1.7;}
/* Footer */
.footer{background:#0A0F1E;color:#8899BB;padding:24px;text-align:center;font-size:12px;}
/* Cart sidebar */
.cart-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:100;display:none;}
.cart-overlay.open{display:block;}
.cart-panel{position:fixed;right:0;top:0;bottom:0;width:380px;background:var(--wh);box-shadow:-4px 0 24px rgba(0,0,0,.2);padding:28px;overflow-y:auto;z-index:101;transform:translateX(100%);transition:transform .3s;}
.cart-panel.open{transform:none;}
.cart-title{font-size:20px;font-weight:700;color:var(--n);margin-bottom:20px;}
.cart-item{display:flex;justify-content:space-between;align-items:flex-start;padding:14px 0;border-bottom:1px solid #eee;gap:12px;}
.cart-item-name{font-size:14px;font-weight:600;color:var(--n);}
.cart-item-sub{font-size:12px;color:var(--gr);margin-top:2px;}
.cart-item-price{font-size:16px;font-weight:700;color:var(--n);white-space:nowrap;}
.cart-item-remove{color:var(--r);font-size:11px;cursor:pointer;margin-top:4px;display:block;}
.cart-total{font-size:18px;font-weight:800;color:var(--n);padding:16px 0;display:flex;justify-content:space-between;}
.cart-checkout-btn{display:block;width:100%;background:var(--g);color:var(--n);font-size:16px;font-weight:700;padding:15px;border-radius:8px;border:none;cursor:pointer;text-align:center;margin-top:12px;}
.cart-checkout-btn:hover{background:#b8962a;}
.pay-methods{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px;}
.pay-badge{background:var(--l);border:1px solid #dde4f0;border-radius:4px;padding:5px 10px;font-size:11px;font-weight:600;color:var(--gr);}
.cart-btn-fixed{position:fixed;top:18px;right:24px;background:var(--g);color:var(--n);border:none;border-radius:8px;padding:10px 20px;font-size:14px;font-weight:700;cursor:pointer;z-index:99;display:flex;align-items:center;gap:8px;}
.cart-count{background:var(--r);color:#fff;border-radius:50%;width:20px;height:20px;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;}
@media(max-width:768px){.bundles-grid,.addons-grid{grid-template-columns:1fr;}.hiw-steps{grid-template-columns:1fr 1fr;}.policy-inner{grid-template-columns:1fr;}}
</style>
</head>
<body>

<header class="hdr">
  <div class="logo">PSLAW Academy</div>
  <div style="display:flex;align-items:center;gap:24px;">
    <div class="hdr-meta">PPO License #122729 | BSIS-Authorized<br/>Private Security LA Worldwide</div>
    <nav><a href="admin-dashboard.html">Student Portal</a></nav>
  </div>
</header>
<div class="gold-bar"></div>

<!-- Cart button -->
<button class="cart-btn-fixed" onclick="toggleCart()">
  🛒 Cart <span class="cart-count" id="cart-count">0</span>
</button>

<!-- Cart panel -->
<div class="cart-overlay" id="cart-overlay" onclick="toggleCart()"></div>
<div class="cart-panel" id="cart-panel">
  <h2 class="cart-title">Your Cart</h2>
  <div id="cart-items"><p style="color:var(--gr);font-size:14px;">Your cart is empty.</p></div>
  <div class="cart-total" id="cart-total" style="display:none"><span>Total</span><span id="cart-total-amt"></span></div>
  <button class="cart-checkout-btn" id="cart-checkout" onclick="checkout()" style="display:none">Proceed to Checkout</button>
  <div class="pay-methods" id="cart-pay-methods" style="display:none">
    <div class="pay-badge">💳 Stripe</div>
    <div class="pay-badge">PayPal</div>
    <div class="pay-badge">Venmo</div>
    <div class="pay-badge">Apple Pay</div>
    <div class="pay-badge">Google Pay</div>
    <div class="pay-badge">Klarna</div>
    <div class="pay-badge">Afterpay</div>
    <div class="pay-badge">Affirm</div>
  </div>
  <button onclick="toggleCart()" style="display:block;width:100%;background:transparent;border:1.5px solid #dde4f0;color:var(--gr);padding:11px;border-radius:8px;margin-top:12px;cursor:pointer;font-size:14px;">Continue Shopping</button>
</div>

<!-- Hero -->
<section class="hero">
  <div class="hero-badge">BSIS-Authorized Training Provider</div>
  <h1 class="hero-title">PSLAW Academy</h1>
  <p class="hero-sub">MACCESS INC. | PPO #122729 — Complete BSIS security guard licensing training. Start your guard card today.</p>
  <div class="hero-chips">
    <div class="chip">✓ BSIS-Compliant Certificates</div>
    <div class="chip">✓ 100% Online</div>
    <div class="chip">✓ Instant Access</div>
    <div class="chip">✓ Los Angeles, CA</div>
  </div>
</section>

<!-- Bundles -->
<section class="bundles-section">
  <div class="bundles-inner">
    <div class="section-eye">Training Packages</div>
    <h2 class="section-title">Choose Your Path</h2>
    <p class="section-sub">Save money with smart bundles matched to your BSIS licensing stage. Individual courses also available below.</p>
    <div class="bundles-grid">
      ${Object.values(BUNDLES).filter(b=>b.badge!=='ADD-ON').map(b=>`
      <div class="bundle-card ${b.badge==='MOST POPULAR'?'bundle-featured':''}" style="border-top:4px solid ${b.color};">
        <div class="bundle-badge" style="background:${b.color}">${b.badge}</div>
        <div class="bundle-name">${b.name}</div>
        <div class="bundle-sub">${b.subtitle}</div>
        <div class="bundle-price">\$${b.price}</div>
        <div class="bundle-hours">${b.hours} Credit Hours</div>
        <ul class="bundle-includes">${b.includes.map(i=>`<li>✓ ${i}</li>`).join('')}</ul>
        <p class="bundle-desc">${b.description}</p>
        <button class="bundle-btn" style="background:${b.badge==='MOST POPULAR'?b.color:'#1B2B5E'};color:${b.badge==='MOST POPULAR'?'#1B2B5E':'#fff'}" onclick="enrollBundle('${b.id}')">
          Enroll Now — \$${b.price}
        </button>
      </div>`).join('')}
    </div>
    <div class="addons-label">⚡ Add-On Certifications — Add to any package</div>
    <div class="addons-grid">
      ${Object.values(BUNDLES).filter(b=>b.badge==='ADD-ON').map(b=>`
      <div class="bundle-card" style="border-top:4px solid ${b.color};">
        <div class="bundle-badge" style="background:${b.color}">${b.badge}</div>
        <div class="bundle-name">${b.name}</div>
        <div class="bundle-sub">${b.subtitle}</div>
        <div class="bundle-price">\$${b.price}</div>
        <div class="bundle-hours">${b.hours} Credit Hours</div>
        <ul class="bundle-includes">${b.includes.map(i=>`<li>✓ ${i}</li>`).join('')}</ul>
        <p class="bundle-desc">${b.description}</p>
        <button class="bundle-btn" style="background:${b.color};color:#fff;" onclick="enrollBundle('${b.id}')">
          Add to Cart — \$${b.price}
        </button>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- Individual Courses -->
<section class="courses-section">
  <div class="courses-inner">
    <div class="section-eye">Individual Courses</div>
    <h2 class="section-title">Enroll in a Single Course</h2>
    <table class="courses-table">
      <thead><tr><th>Course</th><th>Category</th><th>Hours</th><th>Authority</th><th>Price</th><th>Enroll</th></tr></thead>
      <tbody>${courseRows}</tbody>
    </table>
  </div>
</section>

<!-- How It Works -->
<section class="hiw-section">
  <div class="hiw-inner">
    <div class="section-eye">How It Works</div>
    <h2 class="section-title">From Enrollment to Certificate</h2>
    <div class="hiw-steps">
      <div class="hiw-step"><div class="hiw-num">1</div><div class="hiw-title">Enroll & Pay</div><div class="hiw-text">Choose a package or individual course. Pay securely via Stripe, PayPal, Venmo, Klarna, Afterpay, or Affirm.</div></div>
      <div class="hiw-step"><div class="hiw-num">2</div><div class="hiw-title">Complete the Course</div><div class="hiw-text">Work through slide-by-slide content. Answer 2 check-in questions after each section. Complete the module quiz to advance.</div></div>
      <div class="hiw-step"><div class="hiw-num">3</div><div class="hiw-title">Pass the Exam</div><div class="hiw-text">Take the BSIS written examination. 100% required to pass. 3 attempts included. Instant feedback on every question.</div></div>
      <div class="hiw-step"><div class="hiw-num">4</div><div class="hiw-title">Get Certified</div><div class="hiw-text">Print your BSIS Certificate of Completion immediately. Your record is saved — contact MACCESS INC. if you ever need a replacement.</div></div>
    </div>
  </div>
</section>

<!-- Policy -->
<section class="policy-section">
  <div class="policy-inner">
    <div class="policy-block">
      <h3>Assessment Policy</h3>
      <p>100% passing score required per BPC §7583.7. All modules include inline section check-ins, a module quiz before advancing, and a final BSIS written exam. 3 exam attempts included per enrollment. Re-enrollment required after 3 failed attempts.</p>
    </div>
    <div class="policy-block">
      <h3>Session & Timer Policy</h3>
      <p>Each course includes a session timer (1 hour per credit hour). A 10-minute idle warning appears after inactivity. Sessions lock after 15 minutes of no interaction. Progress is saved per module.</p>
    </div>
    <div class="policy-block">
      <h3>Certificates & Records</h3>
      <p>Certificates are issued upon passing and include your name, date, course, and PPO #122729 as required by Title 16 CCR §643(b). Lost certificate? Contact MACCESS INC. — all student records are retained on file.</p>
    </div>
  </div>
</section>

<footer class="footer">
  MACCESS INC. / Private Security LA Worldwide (PSLAW) &nbsp;|&nbsp; PPO License #122729 &nbsp;|&nbsp; BSIS-Authorized Training Provider &nbsp;|&nbsp; gopslaw.com<br/>
  © ${new Date().getFullYear()} MACCESS INC. All rights reserved.
</footer>

<script>
const BUNDLES_DATA = ${JSON.stringify(Object.values(BUNDLES))};
let cart = [];

function enrollBundle(id) {
  const b = BUNDLES_DATA.find(x=>x.id===id);
  if(!b) return;
  // Check if already in cart
  if(cart.find(c=>c.id===id)){ toggleCart(); return; }
  cart.push(b);
  updateCartUI();
  toggleCart();
}

function removeFromCart(id) {
  cart = cart.filter(c=>c.id!==id);
  updateCartUI();
}

function updateCartUI() {
  const count = document.getElementById('cart-count');
  count.textContent = cart.length;
  const itemsEl = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  const checkoutEl = document.getElementById('cart-checkout');
  const payEl = document.getElementById('cart-pay-methods');

  if(cart.length===0){
    itemsEl.innerHTML='<p style="color:var(--gr);font-size:14px;">Your cart is empty.</p>';
    totalEl.style.display='none'; checkoutEl.style.display='none'; payEl.style.display='none';
    return;
  }

  const total = cart.reduce((a,c)=>a+parseInt(c.price),0);
  itemsEl.innerHTML = cart.map(c=>\`
    <div class="cart-item">
      <div><div class="cart-item-name">\${c.name}</div>
      <div class="cart-item-sub">\${c.hours} hrs · \${c.badge}</div>
      <span class="cart-item-remove" onclick="removeFromCart('\${c.id}')">✕ Remove</span></div>
      <div class="cart-item-price">\\\$\${c.price}</div>
    </div>\`).join('');

  document.getElementById('cart-total-amt').textContent = '\$'+total;
  totalEl.style.display='flex'; checkoutEl.style.display='block'; payEl.style.display='flex';
}

function toggleCart() {
  const panel = document.getElementById('cart-panel');
  const overlay = document.getElementById('cart-overlay');
  panel.classList.toggle('open');
  overlay.classList.toggle('open');
}

function checkout() {
  // Integration point: replace with Stripe Payment Link or Stripe Checkout session
  // For now shows the payment method options prominently
  const total = cart.reduce((a,c)=>a+parseInt(c.price),0);
  const items = cart.map(c=>c.name).join(', ');
  alert('Checkout: \$'+total+'\\n\\nCourses: '+items+'\\n\\nTo activate: Connect Stripe in your Netlify dashboard.\\nStripe handles cards, PayPal, Venmo, Apple Pay, Google Pay, Klarna, Afterpay, and Affirm from one integration.');
}
</script>
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// ADMIN DASHBOARD — Student records, certificates, profiles
// ═══════════════════════════════════════════════════════════════════════════════
function buildAdminDashboard() {
  return `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>PSLAW Admin — Student Records & Certificates | MACCESS INC.</title>
<style>
:root{--n:#1B2B5E;--g:#C9A84C;--r:#8B1A1A;--ok:#1A5C3A;--l:#F4F6FB;--gr:#4A5568;--wh:#fff;}
*{box-sizing:border-box;margin:0;padding:0;}body{font-family:'Segoe UI',Arial,sans-serif;background:var(--l);color:#1A1A2E;}
.hdr{background:var(--n);padding:14px 24px;display:flex;align-items:center;justify-content:space-between;}
.logo{color:var(--g);font-size:18px;font-weight:700;letter-spacing:.04em;}
.gold-bar{height:4px;background:var(--g);}
.admin-wrap{max-width:1100px;margin:0 auto;padding:32px 20px;}
.admin-title{font-size:26px;font-weight:700;color:var(--n);margin-bottom:6px;}
.admin-sub{font-size:14px;color:var(--gr);margin-bottom:28px;}
/* Stats */
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:28px;}
.stat-card{background:var(--wh);border-radius:10px;padding:20px;border:1px solid #dde4f0;text-align:center;}
.stat-num{font-size:32px;font-weight:800;color:var(--n);}
.stat-label{font-size:12px;color:var(--gr);margin-top:4px;text-transform:uppercase;letter-spacing:.06em;}
/* Controls */
.controls{display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap;}
.search-input{flex:1;padding:10px 14px;border:1.5px solid #dde4f0;border-radius:8px;font-size:14px;outline:none;min-width:200px;}
.search-input:focus{border-color:var(--n);}
.filter-btn{padding:10px 18px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid #dde4f0;background:var(--wh);color:var(--gr);transition:all .15s;}
.filter-btn.active{background:var(--n);color:#fff;border-color:var(--n);}
.export-btn{padding:10px 18px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;border:none;background:var(--g);color:var(--n);}
/* Table */
.table-wrap{background:var(--wh);border-radius:10px;border:1px solid #dde4f0;overflow:hidden;}
.records-table{width:100%;border-collapse:collapse;}
.records-table th{background:var(--n);color:#fff;padding:12px 16px;font-size:12px;font-weight:600;text-align:left;letter-spacing:.04em;}
.records-table td{padding:12px 16px;border-bottom:1px solid #f0f0f0;font-size:13px;vertical-align:middle;}
.records-table tr:hover td{background:var(--l);}
.records-table tr:last-child td{border:none;}
.status-badge{display:inline-block;padding:3px 10px;border-radius:4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;}
.status-pass{background:#EAF3DE;color:var(--ok);}
.status-fail{background:#FFECEC;color:var(--r);}
.status-progress{background:#FFF3CD;color:#7B4F00;}
.action-btn{padding:5px 12px;border-radius:5px;font-size:12px;font-weight:600;cursor:pointer;border:none;}
.btn-cert{background:var(--n);color:#fff;}
.btn-email{background:var(--ok);color:#fff;}
.btn-view{background:var(--l);color:var(--n);border:1px solid #dde4f0;}
/* Student modal */
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);display:none;align-items:center;justify-content:center;z-index:100;}
.modal-overlay.open{display:flex;}
.modal{background:var(--wh);border-radius:12px;padding:32px;max-width:600px;width:90%;max-height:90vh;overflow-y:auto;}
.modal-title{font-size:20px;font-weight:700;color:var(--n);margin-bottom:4px;}
.modal-sub{font-size:13px;color:var(--gr);margin-bottom:24px;padding-bottom:16px;border-bottom:2px solid var(--g);}
.profile-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:20px;}
.profile-field{background:var(--l);border-radius:8px;padding:12px 14px;}
.pf-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--gr);margin-bottom:3px;}
.pf-value{font-size:14px;font-weight:600;color:var(--n);}
.cert-history{margin-top:16px;}
.cert-history h3{font-size:13px;font-weight:700;color:var(--n);margin-bottom:10px;text-transform:uppercase;letter-spacing:.06em;}
.cert-row{display:flex;justify-content:space-between;align-items:center;padding:10px 14px;background:var(--l);border-radius:7px;margin-bottom:6px;}
.cert-row-name{font-size:13px;font-weight:600;color:var(--n);}
.cert-row-date{font-size:12px;color:var(--gr);}
.cert-row-score{font-size:12px;font-weight:700;color:var(--ok);}
.modal-actions{display:flex;gap:10px;margin-top:20px;flex-wrap:wrap;}
.modal-btn{padding:10px 20px;border-radius:7px;font-size:14px;font-weight:600;cursor:pointer;border:none;}
.mb-primary{background:var(--g);color:var(--n);}
.mb-outline{background:var(--wh);color:var(--n);border:1.5px solid var(--n);}
.mb-close{background:var(--l);color:var(--gr);}
/* Add student form */
.add-form{background:var(--wh);border-radius:10px;border:1px solid #dde4f0;padding:24px;margin-top:24px;}
.add-form h3{font-size:16px;font-weight:700;color:var(--n);margin-bottom:16px;}
.form-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:14px;}
.form-field{display:flex;flex-direction:column;gap:4px;}
.form-label{font-size:12px;font-weight:600;color:var(--gr);}
.form-input{padding:9px 12px;border:1.5px solid #dde4f0;border-radius:7px;font-size:13px;outline:none;}
.form-input:focus{border-color:var(--n);}
.form-submit{padding:10px 24px;border-radius:7px;font-size:14px;font-weight:600;background:var(--n);color:#fff;border:none;cursor:pointer;}
@media(max-width:768px){.stats-grid{grid-template-columns:1fr 1fr;}.profile-grid{grid-template-columns:1fr;}.form-grid{grid-template-columns:1fr;}}
</style>
</head>
<body>
<header class="hdr">
  <div class="logo">PSLAW Admin — Student Records</div>
  <div style="color:#CADCFC;font-size:12px;">MACCESS INC. | PPO #122729 | Confidential</div>
</header>
<div class="gold-bar"></div>

<div class="admin-wrap">
  <div class="admin-title">Student Records & Certificate Tracker</div>
  <div class="admin-sub">All student enrollments, exam scores, certificates, and profiles. Click any student to view their full record and resend their certificate.</div>

  <!-- Stats -->
  <div class="stats-grid">
    <div class="stat-card"><div class="stat-num" id="stat-total">0</div><div class="stat-label">Total Students</div></div>
    <div class="stat-card"><div class="stat-num" id="stat-pass">0</div><div class="stat-label">Certificates Issued</div></div>
    <div class="stat-card"><div class="stat-num" id="stat-progress">0</div><div class="stat-label">In Progress</div></div>
    <div class="stat-card"><div class="stat-num" id="stat-courses">10</div><div class="stat-label">Active Courses</div></div>
  </div>

  <!-- Controls -->
  <div class="controls">
    <input class="search-input" type="text" id="search-input" placeholder="Search by name, email, course, or date..." oninput="filterRecords()"/>
    <button class="filter-btn active" onclick="setFilter('all',this)">All</button>
    <button class="filter-btn" onclick="setFilter('pass',this)">Passed</button>
    <button class="filter-btn" onclick="setFilter('progress',this)">In Progress</button>
    <button class="filter-btn" onclick="setFilter('fail',this)">Failed</button>
    <button class="export-btn" onclick="exportCSV()">⬇ Export CSV</button>
  </div>

  <!-- Records table -->
  <div class="table-wrap">
    <table class="records-table">
      <thead>
        <tr>
          <th>Student Name</th>
          <th>Email</th>
          <th>Course</th>
          <th>Exam Date</th>
          <th>Score</th>
          <th>Status</th>
          <th>Attempts</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="records-tbody">
        <tr><td colspan="8" style="text-align:center;color:var(--gr);padding:32px;font-size:14px;">
          No student records yet. Records are created automatically when students complete their enrollment and enter their name and email in a course.
          <br/><br/>You can also add records manually below.
        </td></tr>
      </tbody>
    </table>
  </div>

  <!-- Manual add form -->
  <div class="add-form">
    <h3>➕ Add Student Record Manually</h3>
    <div class="form-grid">
      <div class="form-field"><label class="form-label">Full Legal Name *</label><input class="form-input" id="f-name" placeholder="First Middle Last"/></div>
      <div class="form-field"><label class="form-label">Email Address *</label><input class="form-input" id="f-email" type="email" placeholder="student@email.com"/></div>
      <div class="form-field"><label class="form-label">Phone</label><input class="form-input" id="f-phone" placeholder="(323) 000-0000"/></div>
      <div class="form-field"><label class="form-label">Guard Card Number</label><input class="form-input" id="f-guardcard" placeholder="CA-XXXXXXXX"/></div>
      <div class="form-field"><label class="form-label">Course</label>
        <select class="form-input" id="f-course">
          <option value="">Select course...</option>
          <option>Powers to Arrest</option>
          <option>Appropriate Use of Force</option>
          <option>Public Relations & Community</option>
          <option>Observation & Documentation</option>
          <option>Communication & Its Significance</option>
          <option>Liability & Legal Aspects</option>
          <option>Officer Safety</option>
          <option>Handling Difficult People</option>
          <option>Baton Certification</option>
          <option>Workplace Violence</option>
        </select>
      </div>
      <div class="form-field"><label class="form-label">Exam Date</label><input class="form-input" id="f-date" type="date"/></div>
      <div class="form-field"><label class="form-label">Score</label><input class="form-input" id="f-score" placeholder="e.g. 100% or 20/24"/></div>
      <div class="form-field"><label class="form-label">Status</label>
        <select class="form-input" id="f-status">
          <option value="pass">Passed — Certificate Issued</option>
          <option value="progress">In Progress</option>
          <option value="fail">Failed</option>
        </select>
      </div>
      <div class="form-field"><label class="form-label">Notes</label><input class="form-input" id="f-notes" placeholder="Optional notes..."/></div>
    </div>
    <button class="form-submit" onclick="addRecord()">Add Student Record</button>
  </div>
</div>

<!-- Student profile modal -->
<div class="modal-overlay" id="modal-overlay" onclick="closeModal(event)">
  <div class="modal" id="modal-content"></div>
</div>

<script>
// ── Storage key ───────────────────────────────────────────────
const STORAGE_KEY = 'pslaw_students_v1';
let currentFilter = 'all';

// ── Load / save ───────────────────────────────────────────────
function loadRecords(){
  try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]'); }
  catch{ return []; }
}
function saveRecords(records){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

// ── Render table ──────────────────────────────────────────────
function renderTable(){
  const records = loadRecords();
  const search  = document.getElementById('search-input').value.toLowerCase();

  const filtered = records.filter(r=>{
    const matchFilter = currentFilter==='all' || r.status===currentFilter;
    const matchSearch = !search ||
      r.name.toLowerCase().includes(search) ||
      r.email.toLowerCase().includes(search) ||
      (r.course||'').toLowerCase().includes(search) ||
      (r.date||'').includes(search);
    return matchFilter && matchSearch;
  });

  // Stats
  document.getElementById('stat-total').textContent    = records.length;
  document.getElementById('stat-pass').textContent     = records.filter(r=>r.status==='pass').length;
  document.getElementById('stat-progress').textContent = records.filter(r=>r.status==='progress').length;

  const tbody = document.getElementById('records-tbody');
  if(filtered.length===0){
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;color:var(--gr);padding:24px;font-size:14px;">No records match your search.</td></tr>';
    return;
  }

  tbody.innerHTML = filtered.map((r,i)=>\`
    <tr>
      <td><strong style="color:var(--n);">\${r.name}</strong></td>
      <td style="color:var(--gr);">\${r.email}</td>
      <td>\${r.course||'—'}</td>
      <td>\${r.date||'—'}</td>
      <td style="font-weight:700;">\${r.score||'—'}</td>
      <td><span class="status-badge status-\${r.status}">\${r.status==='pass'?'Passed':r.status==='progress'?'In Progress':'Failed'}</span></td>
      <td style="text-align:center;">\${r.attempts||1}</td>
      <td style="display:flex;gap:6px;flex-wrap:wrap;">
        <button class="action-btn btn-view" onclick="viewStudent(\${records.indexOf(r)})">View</button>
        \${r.status==='pass'?'<button class="action-btn btn-cert" onclick="printCert('+records.indexOf(r)+')">🖨 Cert</button>':''}
        <button class="action-btn btn-email" onclick="resendCert(\${records.indexOf(r)})">✉ Email</button>
      </td>
    </tr>\`).join('');
}

function filterRecords(){ renderTable(); }
function setFilter(f, btn){
  currentFilter = f;
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderTable();
}

// ── Add record ────────────────────────────────────────────────
function addRecord(){
  const name = document.getElementById('f-name').value.trim();
  const email= document.getElementById('f-email').value.trim();
  if(!name||!email){ alert('Name and email are required.'); return; }

  const records = loadRecords();
  const record = {
    id:       Date.now().toString(),
    name,
    email,
    phone:     document.getElementById('f-phone').value.trim(),
    guardCard: document.getElementById('f-guardcard').value.trim(),
    course:    document.getElementById('f-course').value,
    date:      document.getElementById('f-date').value,
    score:     document.getElementById('f-score').value.trim(),
    status:    document.getElementById('f-status').value,
    attempts:  1,
    notes:     document.getElementById('f-notes').value.trim(),
    createdAt: new Date().toISOString(),
    certificates: [],
  };

  if(record.status==='pass' && record.course){
    record.certificates.push({
      course: record.course,
      date:   record.date || new Date().toLocaleDateString(),
      score:  record.score || '100%',
      issuedAt: new Date().toISOString(),
    });
  }

  records.unshift(record);
  saveRecords(records);
  renderTable();

  // Clear form
  ['f-name','f-email','f-phone','f-guardcard','f-course','f-date','f-score','f-notes']
    .forEach(id=>{ document.getElementById(id).value=''; });
  document.getElementById('f-status').value='pass';
}

// ── View student profile ──────────────────────────────────────
function viewStudent(idx){
  const records = loadRecords();
  const r = records[idx];
  if(!r) return;

  const certHistory = (r.certificates||[]).length > 0
    ? r.certificates.map(c=>\`
        <div class="cert-row">
          <div><div class="cert-row-name">\${c.course}</div><div class="cert-row-date">Completed: \${c.date}</div></div>
          <div class="cert-row-score">\${c.score}</div>
        </div>\`).join('')
    : '<p style="font-size:13px;color:var(--gr);">No certificates on file yet.</p>';

  document.getElementById('modal-content').innerHTML = \`
    <h2 class="modal-title">\${r.name}</h2>
    <div class="modal-sub">Student Profile — MACCESS INC. / PSLAW</div>
    <div class="profile-grid">
      <div class="profile-field"><div class="pf-label">Email</div><div class="pf-value">\${r.email}</div></div>
      <div class="profile-field"><div class="pf-label">Phone</div><div class="pf-value">\${r.phone||'—'}</div></div>
      <div class="profile-field"><div class="pf-label">Guard Card #</div><div class="pf-value">\${r.guardCard||'—'}</div></div>
      <div class="profile-field"><div class="pf-label">Student Since</div><div class="pf-value">\${r.createdAt?new Date(r.createdAt).toLocaleDateString():'—'}</div></div>
      <div class="profile-field"><div class="pf-label">Last Course</div><div class="pf-value">\${r.course||'—'}</div></div>
      <div class="profile-field"><div class="pf-label">Last Exam Date</div><div class="pf-value">\${r.date||'—'}</div></div>
      <div class="profile-field"><div class="pf-label">Last Score</div><div class="pf-value">\${r.score||'—'}</div></div>
      <div class="profile-field"><div class="pf-label">Exam Attempts</div><div class="pf-value">\${r.attempts||1}</div></div>
    </div>
    \${r.notes?'<div style="background:var(--l);border-radius:7px;padding:12px;font-size:13px;color:var(--gr);margin-bottom:16px;"><strong>Notes:</strong> '+r.notes+'</div>':''}
    <div class="cert-history">
      <h3>Certificate History (\${(r.certificates||[]).length})</h3>
      \${certHistory}
    </div>
    <div class="modal-actions">
      \${r.status==='pass'?'<button class="modal-btn mb-primary" onclick="printCert('+idx+')">🖨 Print Certificate</button>':''}
      <button class="modal-btn mb-outline" onclick="resendCert(\${idx})">✉ Resend Certificate</button>
      <button class="modal-btn" style="background:#FFECEC;color:var(--r);border:none;" onclick="deleteRecord(\${idx})">🗑 Delete Record</button>
      <button class="modal-btn mb-close" onclick="closeModal()">Close</button>
    </div>\`;
  document.getElementById('modal-overlay').classList.add('open');
}

function closeModal(e){
  if(!e||e.target===document.getElementById('modal-overlay'))
    document.getElementById('modal-overlay').classList.remove('open');
}

// ── Certificate print ─────────────────────────────────────────
function printCert(idx){
  const records = loadRecords();
  const r = records[idx];
  if(!r) return;
  const d = r.date || new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
  const certWin = window.open('','_blank');
  certWin.document.write(\`<!DOCTYPE html><html><head><title>Certificate — \${r.name}</title>
  <style>
    body{font-family:'Segoe UI',Arial,sans-serif;margin:0;padding:40px;background:#fff;}
    .cw{border:3px double #1B2B5E;border-radius:4px;padding:50px 60px;max-width:780px;margin:0 auto;text-align:center;position:relative;}
    .cw::before{content:'';position:absolute;inset:9px;border:1px solid #C9A84C;border-radius:2px;pointer-events:none;}
    .stripe{height:5px;background:#C9A84C;border-radius:3px;margin:12px auto;width:80px;}
    h1{font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#1B2B5E;margin-bottom:5px;}
    h2{font-size:22px;font-weight:800;color:#1B2B5E;margin-bottom:2px;}
    .ppo{font-size:12px;color:#666;margin-bottom:22px;}
    .certifies{font-size:13px;color:#666;margin-bottom:7px;}
    .student{font-size:30px;font-weight:800;color:#1B2B5E;border-bottom:2px solid #1B2B5E;display:inline-block;min-width:280px;padding-bottom:4px;margin-bottom:16px;}
    .course{font-size:17px;font-weight:700;color:#1B2B5E;margin:8px 0;}
    .badge{display:inline-block;background:#EAF3DE;color:#1A5C3A;border-radius:6px;padding:4px 14px;font-size:12px;font-weight:700;margin-bottom:18px;}
    .sigs{display:flex;justify-content:space-around;margin-top:32px;gap:18px;}
    .sig{flex:1;text-align:center;} .sig-line{border-top:1.5px solid #1B2B5E;margin-bottom:5px;} .sig-label{font-size:11px;color:#666;}
    @media print{body{padding:0;}}
  </style></head><body>
  <div class="cw">
    <h1>Certificate of Completion</h1><div class="stripe"></div>
    <h2>MACCESS INC.</h2><div class="ppo">Private Patrol Operator | PPO License #122729 | BSIS-Authorized Training Provider</div>
    <div class="certifies">This certifies that</div>
    <div class="student">\${r.name}</div>
    <div style="font-size:13px;color:#666;margin-bottom:5px;">has successfully completed:</div>
    <div class="course">\${r.course||'BSIS Security Guard Training'}</div>
    <div class="badge">Score: \${r.score||'100%'} ✓ Passing</div>
    <div style="font-size:12px;color:#666;line-height:1.8;margin-bottom:5px;">Completion Date: \${d} | Retain per Title 16 CCR §643(b)</div>
    <div class="stripe"></div>
    <div class="sigs">
      <div class="sig"><div class="sig-line"></div><div class="sig-label">Student Signature</div></div>
      <div class="sig"><div class="sig-line"></div><div class="sig-label">Date: \${d}</div></div>
      <div class="sig"><div class="sig-line"></div><div class="sig-label">Instructor — MACCESS INC.</div></div>
    </div>
  </div>
  <script>window.print();<\\/script></body></html>\`);
}

function resendCert(idx){
  const records = loadRecords();
  const r = records[idx];
  if(!r) return;
  alert(\`Certificate resend for: \${r.name}\\nEmail: \${r.email}\\n\\nTo wire this: connect SendGrid or Mailchimp to your Netlify backend. One-click email delivery of the certificate PDF to any student address.\`);
}

function deleteRecord(idx){
  if(!confirm('Delete this student record permanently?')) return;
  const records = loadRecords();
  records.splice(idx,1);
  saveRecords(records);
  closeModal();
  renderTable();
}

// ── Export CSV ────────────────────────────────────────────────
function exportCSV(){
  const records = loadRecords();
  if(records.length===0){ alert('No records to export.'); return; }
  const headers = ['Name','Email','Phone','Guard Card','Course','Exam Date','Score','Status','Attempts','Notes','Created'];
  const rows = records.map(r=>[r.name,r.email,r.phone||'',r.guardCard||'',r.course||'',r.date||'',r.score||'',r.status,r.attempts||1,r.notes||'',r.createdAt?new Date(r.createdAt).toLocaleDateString():''].map(v=>'"'+String(v).replace(/"/g,'""')+'"'));
  const csv = [headers.join(','),...rows.map(r=>r.join(','))].join('\\n');
  const blob = new Blob([csv],{type:'text/csv'});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href=url; a.download='PSLAW_Students_'+new Date().toISOString().slice(0,10)+'.csv';
  a.click(); URL.revokeObjectURL(url);
}

// ── Auto-capture from course completion ───────────────────────
// When a student completes a course in the same browser session,
// the course page posts a message with their record.
// This listener captures it and saves to the admin dashboard.
window.addEventListener('message', function(e){
  if(e.data && e.data.type === 'PSLAW_COMPLETION'){
    const records = loadRecords();
    const { name, email, course, score, date } = e.data;
    // Check for existing student record
    let existing = records.find(r=>r.email.toLowerCase()===email.toLowerCase());
    if(existing){
      existing.certificates = existing.certificates||[];
      existing.certificates.push({ course, date, score, issuedAt:new Date().toISOString() });
      existing.course=course; existing.score=score; existing.date=date; existing.status='pass';
    } else {
      records.unshift({
        id: Date.now().toString(), name, email, course, score, date,
        status:'pass', attempts:1, createdAt:new Date().toISOString(),
        certificates:[{course,date,score,issuedAt:new Date().toISOString()}],
      });
    }
    saveRecords(records);
    renderTable();
  }
});

// Init
renderTable();
</script>
</body>
</html>`;
}

module.exports = { buildAll, buildAndPush, buildStorePage, buildAdminDashboard, BUNDLES };

// Standalone
if(require.main===module){
  console.log("\nMACCESS INC. — Course Platform Builder (Full Suite)");
  console.log("Building individual courses + store + admin dashboard...\n");
  buildAll("/home/claude");
  if(process.env.GITHUB_TOKEN){
    buildAndPush("/home/claude").then(()=>{
      console.log("\nAll files pushed to GitHub.\n");
    }).catch(console.error);
  } else {
    console.log("\nDone. Set GITHUB_TOKEN to push to GitHub.\n");
  }
}
