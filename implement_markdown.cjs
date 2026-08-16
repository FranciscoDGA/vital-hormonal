const fs = require('fs');

let content = fs.readFileSync('src/pages/ArticlePage.tsx', 'utf8');

// Import ReactMarkdown
content = content.replace(
  "import { AdSlot } from '../components/AdSlot';",
  "import { AdSlot } from '../components/AdSlot';\nimport ReactMarkdown from 'react-markdown';"
);

// Find the content rendering block
// In ArticlePage.tsx, it looks like:
// {article.content.map((paragraph, index) => { ... })}
const contentRegex = /\{article\.content\.map\(\(paragraph, index\) => \{[\s\S]*?\}\)\}/;

const markdownComponent = `<div className="markdown-content">
            <ReactMarkdown
              components={{
                h2: ({node, ...props}) => <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#26463E] mt-10 mb-4" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#26463E] mt-8 mb-3" {...props} />,
                p: ({node, ...props}) => <p className="leading-relaxed mb-6" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />,
                li: ({node, ...props}) => <li className="pl-2" {...props} />,
                blockquote: ({node, ...props}) => (
                  <blockquote className="border-l-4 border-[#26463E] pl-6 py-2 my-8 bg-[#E8F1EB]/50 rounded-r-2xl italic text-[#525753]" {...props} />
                ),
                a: ({node, ...props}) => <a className="text-[#26463E] font-medium underline underline-offset-2 decoration-[#E8F1EB] hover:bg-[#E8F1EB] transition-colors" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-[#26463E]" {...props} />,
              }}
            >
              {article.content.join('\\n\\n')}
            </ReactMarkdown>
          </div>`;

content = content.replace(contentRegex, markdownComponent);

// Also need to add dynamic text color for dark mode to the markdown component wrapper:
content = content.replace(
  /className=\{`space-y-6 \$\{getFontSizeStyle\(\)\} \$\{isNightMode \? 'text-\[#DCE7E2\]' : 'text-\[#2D312E\]'\}'\}/,
  "className={`space-y-6 ${getFontSizeStyle()} ${isNightMode ? 'text-[#DCE7E2]' : 'text-[#2D312E]'}`}"
);

fs.writeFileSync('src/pages/ArticlePage.tsx', content);
