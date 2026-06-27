# Scripts - MACCESS INC.

## generate_test.js
Builds a BSIS-compliant assessment (PPTX + PDF) for any PSLAW course.

### Usage
```
node generate_test.js "Powers_to_Arrest_BSIS_Certification_MACCESS_INC.pptx"
```
Outputs [CourseName]-Test.pptx + .pdf to PSLAW-Courses/final-projects/

### Assessment Standards
- 50-75 questions per course (module-weighted)
- 4-option multiple choice (A/B/C/D)
- 100% passing score required (BPC 7583.7)
- Each question cites BPC, PC, or Title 16 CCR
- Includes: Cover, Instructions, Questions, Answer Key, Certificate template

### Supported Courses
- powers_to_arrest: 53 questions
- bsis_overview: add bank to enable

### Add a Course
1. Generate PowerPoint in Claude
2. Add question bank to COURSE_BANKS in generate_test.js
3. Run: node generate_test.js "[CourseName].pptx"
