import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

/**
 * 递归获取目录下所有匹配 pattern 的文件
 */
function walkDir(dir) {
  const results = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkDir(fullPath));
    } else if (entry.name.endsWith('.d.ts')) {
      results.push(fullPath);
    }
  }
  return results;
}

const distDir = join(import.meta.dirname, '..', 'dist');
const files = walkDir(distDir);

let totalSaved = 0;

for (const file of files) {
  const original = readFileSync(file, 'utf8');
  // 移除 JSDoc 块注释
  let stripped = original.replace(/\/\*\*[\s\S]*?\*\/\n*/g, '');
  // 清理多余空行
  stripped = stripped.replace(/\n{3,}/g, '\n\n');
  // 清理文件开头的空行
  stripped = stripped.replace(/^\n+/, '');

  if (stripped !== original) {
    const saved = original.length - stripped.length;
    totalSaved += saved;
    writeFileSync(file, stripped);
    console.log(`✅ ${file.replace(distDir, 'dist')}  -${saved} B`);
  }
}

console.log(`\n📦 .d.ts JSDoc stripped, total saved: ${totalSaved} B`);
