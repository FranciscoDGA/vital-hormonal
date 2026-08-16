const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace("import { BlogPage } from './pages/BlogPage';", "import { BlogPage } from './pages/BlogPage';\nimport { NotFoundPage } from './pages/NotFoundPage';");
content = content.replace("<Route path=\"/contato\" element={<ContactPage />} />", "<Route path=\"/contato\" element={<ContactPage />} />\n            <Route path=\"*\" element={<NotFoundPage />} />");
fs.writeFileSync('src/App.tsx', content);
