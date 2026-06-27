# Live Scan Integration — MACCESS INC.

## Status: PENDING EQUIPMENT ACQUISITION

This folder holds BSIS Live Scan assets. Follow the checklist below when your equipment and DOJ authorization arrive.

---

## Activation Checklist

### Step 1 - Equipment and Authorization
- Acquire BSIS-compatible Live Scan hardware
- Register as a Live Scan submitting agency with California DOJ
- Receive your ORI (Originating Agency Identifier) from DOJ
- Receive your ATI prefix from DOJ
- Complete any required BSIS/DOJ submitter training

### Step 2 - Certificate Template
When BSIS issues you an official certificate template:
- Save as: bsis_livescan_cert_template.pdf (or .png/.jpg)
- Upload to this folder: PSLAW-Courses/live-scan/bsis_livescan_cert_template.pdf

### Step 3 - Update the Test Script
In PSLAW-Courses/scripts/build_interactive_test_v2.js, update LIVE_SCAN_CONFIG:

```
enabled: true
certTemplateFilename: "bsis_livescan_cert_template.pdf"
bsisORI: "CA12345678"         <- your DOJ-issued ORI
atiPrefix: "ATG-XXXX"         <- your ATI prefix
notificationEmail: "admin@gopslaw.com"
showUploadSlot: true
pendingMessage: ""             <- clear this
```

### Step 4 - Wire the Email/Backend (Optional)
In submitLSRecord() inside the HTML test, replace the placeholder console.log with:

```
fetch('https://your-backend.com/api/livescan-record', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(record)
})
```

The record object contains: studentName, studentEmail, testDate, course,
score, ppoLicense, lsCertFile (base64), submittedAt, bsisORI, atiPrefix.

### Step 5 - Rebuild and Push
```
export GITHUB_TOKEN=your_token
node PSLAW-Courses/scripts/build_interactive_test_v2.js "CourseName.pptx"
```

---

## Current Behavior (Pre-Activation)

Students who pass see a "Coming Soon" notice. Their certificate is a standard
course completion certificate without the Live Scan attachment section.

---

## File Naming
- bsis_livescan_cert_template.pdf  <- official BSIS template (place here when received)
- livescan_confirmation_sample.pdf <- DOJ confirmation sample (for QA)

---

## BSIS/DOJ Contacts
- BSIS: bsis.ca.gov
- DOJ Live Scan: 916-227-4895
