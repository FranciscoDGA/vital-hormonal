const fs = require('fs');

// Add AdSlot to BlogPage
let blogContent = fs.readFileSync('src/pages/BlogPage.tsx', 'utf8');
blogContent = blogContent.replace(
  "import { Article, CategoryType } from '../types';", 
  "import { Article, CategoryType } from '../types';\nimport { AdSlot } from '../components/AdSlot';"
);
blogContent = blogContent.replace(
  "</p>\n      </div>", 
  "</p>\n      </div>\n      <AdSlot position=\"header\" />"
);
fs.writeFileSync('src/pages/BlogPage.tsx', blogContent);

// Add AdSlot to ArticlePage
let articleContent = fs.readFileSync('src/pages/ArticlePage.tsx', 'utf8');
articleContent = articleContent.replace(
  "import { EditorialAdSlot } from '../components/EditorialAdSlot';", 
  "import { EditorialAdSlot } from '../components/EditorialAdSlot';\nimport { AdSlot } from '../components/AdSlot';"
);
// Insert after author block in ArticlePage (which is roughly above the main content)
articleContent = articleContent.replace(
  /<div className="w-full h-px bg-\[#E3EBE6\] my-6 sm:my-10"><\/div>/,
  '<div className="w-full h-px bg-[#E3EBE6] my-6 sm:my-10"></div>\n          <AdSlot position="content" />'
);
fs.writeFileSync('src/pages/ArticlePage.tsx', articleContent);
