const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(/onOpenMaterials=\{\(\) => setIsFreeMaterialsOpen\(true\)\}/g, '');
content = content.replace(/initialExamId=\{labGlossaryInitialExam\}/g, '');
content = content.replace(/onOpenDoctorChecklist=\{\(\) => setIsDoctorChecklistOpen\(true\)\}/g, '');
content = content.replace(/onOpenLabExams=\{\(examId: any\) => \{\s*setLabGlossaryInitialExam\(examId\);\s*setIsLabGlossaryOpen\(true\);\s*\}\}/g, '');
content = content.replace(/onOpenProteinCalculator=\{\(\) => setIsProteinCalcOpen\(true\)\}/, "onOpenProteinCalculator={() => setIsProteinCalcOpen(true)}\n                onOpenDoctorChecklist={() => setIsDoctorChecklistOpen(true)}");

fs.writeFileSync('src/App.tsx', content);
