const fs = require('fs');

let content = fs.readFileSync('src/components/ProteinCalculatorModal.tsx', 'utf-8');
content = content.replace("onReadArticleById?: (id: string) => void;\n}", "onReadArticleById?: (id: string) => void;\n  onOpenMaterials?: () => void;\n}");
fs.writeFileSync('src/components/ProteinCalculatorModal.tsx', content);

content = fs.readFileSync('src/components/LabExamsGlossaryModal.tsx', 'utf-8');
content = content.replace("onReadArticleById?: (id: string) => void;\n}", "onReadArticleById?: (id: string) => void;\n  initialExamId?: string;\n  onOpenDoctorChecklist?: () => void;\n}");
fs.writeFileSync('src/components/LabExamsGlossaryModal.tsx', content);

content = fs.readFileSync('src/components/DoctorVisitChecklistModal.tsx', 'utf-8');
content = content.replace("onClose: () => void;\n}", "onClose: () => void;\n  onOpenLabExams?: (id: string) => void;\n}");
fs.writeFileSync('src/components/DoctorVisitChecklistModal.tsx', content);

content = fs.readFileSync('src/components/SupplementGuideModal.tsx', 'utf-8');
content = content.replace("onReadArticleById?: (id: string) => void;\n}", "onReadArticleById?: (id: string) => void;\n  onOpenMaterials?: () => void;\n}");
fs.writeFileSync('src/components/SupplementGuideModal.tsx', content);

content = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');
content = content.replace("onSelectBlog: (category?: CategoryType) => void;\n  onSelectContact: () => void;\n}", "onSelectBlog: (category?: CategoryType) => void;\n  onSelectContact: () => void;\n  onOpenContactModal?: () => void;\n}");
fs.writeFileSync('src/components/Navbar.tsx', content);

content = fs.readFileSync('src/pages/HomePage.tsx', 'utf-8');
content = content.replace("onSelectTrack: (track: QuickTrack) => void;", "onSelectTrack: (track: QuickTrack) => void;\n  onOpenDoctorChecklist?: () => void;");
fs.writeFileSync('src/pages/HomePage.tsx', content);

console.log("Fixed props!");
