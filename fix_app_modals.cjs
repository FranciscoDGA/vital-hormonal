const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Replace ProteinCalculatorModal props
content = content.replace(
  /<ProteinCalculatorModal[\s\S]*?\/>/,
  `<ProteinCalculatorModal
        isOpen={isProteinCalcOpen}
        onClose={() => setIsProteinCalcOpen(false)}
        onReadArticleById={(id) => {
          setIsProteinCalcOpen(false);
          handleReadArticleById(id);
        }}
      />`
);

// Replace LabExamsGlossaryModal props
content = content.replace(
  /<LabExamsGlossaryModal[\s\S]*?\/>/,
  `<LabExamsGlossaryModal
        isOpen={isLabGlossaryOpen}
        onClose={() => {
          setIsLabGlossaryOpen(false);
          setLabGlossaryInitialExam(undefined);
        }}
        onReadArticleById={(id) => {
          setIsLabGlossaryOpen(false);
          handleReadArticleById(id);
        }}
      />`
);

// Replace DoctorVisitChecklistModal props
content = content.replace(
  /<DoctorVisitChecklistModal[\s\S]*?\/>/,
  `<DoctorVisitChecklistModal
        isOpen={isDoctorChecklistOpen}
        onClose={() => setIsDoctorChecklistOpen(false)}
      />`
);

// Replace SupplementGuideModal props
content = content.replace(
  /<SupplementGuideModal[\s\S]*?\/>/,
  `<SupplementGuideModal
        isOpen={isSupplementGuideOpen}
        onClose={() => setIsSupplementGuideOpen(false)}
        onReadArticleById={(id) => {
          setIsSupplementGuideOpen(false);
          handleReadArticleById(id);
        }}
      />`
);

fs.writeFileSync('src/App.tsx', content);
