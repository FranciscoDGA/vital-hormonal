import fs from 'fs';
import path from 'path';

const siteUrl = 'https://vitalhormonal.com';

// Read articles file
const articlesContent = fs.readFileSync(path.resolve('./src/data/articles.ts'), 'utf8');

// Extract all slugs using regex
const slugs = [];
const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
let match;
while ((match = slugRegex.exec(articlesContent)) !== null) {
  slugs.push(match[1]);
}

const currentDate = new Date().toISOString().split('T')[0];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages -->
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

// Ensure public or dist exists, we will write to public for dev and dist if it exists
fs.writeFileSync(path.resolve('./public/sitemap.xml'), sitemap);
console.log('Sitemap gerado com sucesso em public/sitemap.xml!');
