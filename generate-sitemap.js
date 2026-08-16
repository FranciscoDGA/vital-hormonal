import fs from 'fs';
import path from 'path';

// Change domain to vercel app since the user is testing there.
// If the user adds a custom domain later, they can change this variable.
const siteUrl = 'https://vital-hormonal.vercel.app';

// Read all files in src/data/articles/
const articlesDir = path.resolve('./src/data/articles');
const files = fs.readdirSync(articlesDir);

const slugs = [];
const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;

files.forEach(file => {
  if (file.endsWith('.ts')) {
    const content = fs.readFileSync(path.join(articlesDir, file), 'utf8');
    let match;
    while ((match = slugRegex.exec(content)) !== null) {
      slugs.push(match[1]);
    }
  }
});

const currentDate = new Date().toISOString().split('T')[0];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteUrl}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${siteUrl}/sobre</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${siteUrl}/contato</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${siteUrl}/legal</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
`;

// Dynamic Article Pages
slugs.forEach(slug => {
  sitemap += `  <url>
    <loc>${siteUrl}/artigo/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
});

sitemap += `</urlset>`;

fs.writeFileSync(path.resolve('./public/sitemap.xml'), sitemap);
console.log(`Sitemap gerado com sucesso em public/sitemap.xml com ${slugs.length} artigos!`);
