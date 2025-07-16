// src/utils/markdownUtils.ts
export async function getMarkdownContent(fileName: string) {
  if (process.env.NODE_ENV === 'production') {
    const fs = (await import('fs')).promises;
    const path = await import('path');
    const filePath = path.join(process.cwd(), 'public', fileName);
    return fs.readFile(filePath, 'utf-8');
  } else {
    const response = await fetch(`http://localhost:3000${fileName}`);
    if (!response.ok) throw new Error('Failed to load markdown');
    return response.text();
  }
}