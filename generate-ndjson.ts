import { projects } from "./src/data/projects";
import { articles } from "./src/data/articles";
import fs from "fs";
import path from "path";

const ndjson: string[] = [];

// Helper for generating unique keys
const generateKey = () => Math.random().toString(36).substring(2, 9);

// Map Projects
for (const proj of projects) {
  const doc: any = {
    _id: `project-${proj.slug}`,
    _type: "project",
    title_en: proj.title.en,
    title_ar: proj.title.ar,
    slug: { _type: "slug", current: proj.slug },
    category_en: proj.category.en,
    category_ar: proj.category.ar,
    problem_en: proj.problem.en,
    problem_ar: proj.problem.ar,
    solution_en: proj.solution.en,
    solution_ar: proj.solution.ar,
    businessValue_en: proj.businessValue?.en || "",
    businessValue_ar: proj.businessValue?.ar || "",
    features: proj.features?.map((f) => ({
      _key: generateKey(),
      title_en: f.title.en,
      title_ar: f.title.ar,
      description_en: f.description.en,
      description_ar: f.description.ar,
    })) || [],
  };

  // Add image asset reference for Sanity CLI to upload
  if (proj.image) {
    const absoluteImagePath = path.resolve(process.cwd(), "public", proj.image.replace(/^\//, ''));
    if (fs.existsSync(absoluteImagePath)) {
      doc.image = {
        _type: 'image',
        _sanityAsset: `image@file://${absoluteImagePath}`
      };
    }
  }

  ndjson.push(JSON.stringify(doc));
}

// Map Articles
for (const art of articles) {
  // Simple HTML to Portable Text Converter
  const convertHtmlToBlocks = (html: string) => {
    const blocks: any[] = [];
    const elements = html.split(/<(p|h2|h3|blockquote|ul|ol)>/).filter(Boolean);
    
    for (let i = 0; i < elements.length; i++) {
      const tag = elements[i];
      if (['p', 'h2', 'h3', 'blockquote', 'ul', 'ol'].includes(tag)) {
        let content = elements[i + 1] || "";
        content = content.replace(new RegExp(`</${tag}>.*`, 's'), '').trim();
        
        if (tag === 'p') {
          // Remove internal formatting tags for simplicity, or keep them as plain text
          content = content.replace(/<[^>]+>/g, '');
          blocks.push({
            _key: generateKey(),
            _type: 'block',
            style: 'normal',
            children: [{ _key: generateKey(), _type: 'span', text: content, marks: [] }]
          });
        } else if (tag === 'h2') {
          content = content.replace(/<[^>]+>/g, '');
          blocks.push({
            _key: generateKey(),
            _type: 'block',
            style: 'h2',
            children: [{ _key: generateKey(), _type: 'span', text: content, marks: [] }]
          });
        } else if (tag === 'h3') {
          content = content.replace(/<[^>]+>/g, '');
          blocks.push({
            _key: generateKey(),
            _type: 'block',
            style: 'h3',
            children: [{ _key: generateKey(), _type: 'span', text: content, marks: [] }]
          });
        } else if (tag === 'blockquote') {
          content = content.replace(/<[^>]+>/g, '');
          blocks.push({
            _key: generateKey(),
            _type: 'block',
            style: 'blockquote',
            children: [{ _key: generateKey(), _type: 'span', text: content, marks: [] }]
          });
        } else if (tag === 'ul' || tag === 'ol') {
          const listItems = content.split(/<li>/).filter(Boolean);
          for (const item of listItems) {
            const itemContent = item.replace(/<\/li>.*/s, '').replace(/<[^>]+>/g, '').trim();
            if (itemContent) {
              blocks.push({
                _key: generateKey(),
                _type: 'block',
                style: 'normal',
                listItem: tag === 'ul' ? 'bullet' : 'number',
                level: 1,
                children: [{ _key: generateKey(), _type: 'span', text: itemContent, marks: [] }]
              });
            }
          }
        }
        i++; // skip the content we just processed
      }
    }
    return blocks.length > 0 ? blocks : [
        {
          _key: generateKey(),
          _type: 'block',
          style: 'normal',
          children: [{ _key: generateKey(), _type: 'span', text: html.replace(/<[^>]+>/g, '').trim(), marks: [] }]
        }
    ];
  };

  const doc: any = {
    _id: `article-${art.id || art.slug}`,
    _type: "article",
    title_en: art.title.en,
    title_ar: art.title.ar,
    slug: { _type: "slug", current: art.id || art.slug },
    excerpt_en: art.excerpt.en,
    excerpt_ar: art.excerpt.ar,
    content_en: convertHtmlToBlocks(art.content.en),
    content_ar: convertHtmlToBlocks(art.content.ar),
    publishedAt: new Date().toISOString(),
  };

  // Add image asset reference for Sanity CLI to upload
  if (art.image && art.image.startsWith('/')) {
    const absoluteImagePath = path.resolve(process.cwd(), "public", art.image.replace(/^\//, ''));
    if (fs.existsSync(absoluteImagePath)) {
      doc.image = {
        _type: 'image',
        _sanityAsset: `image@file://${absoluteImagePath}`
      };
    }
  } else if (art.image) {
      // It's an external URL, sanity dataset import also supports url uploads natively!
      doc.image = {
        _type: 'image',
        _sanityAsset: `image@${art.image}`
      };
  }

  ndjson.push(JSON.stringify(doc));
}

fs.writeFileSync("dataset.ndjson", ndjson.join("\n"), "utf8");
console.log("dataset.ndjson created successfully!");
