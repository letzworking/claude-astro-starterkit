// PostToolUse 훅: Edit/Write 직후 수정된 파일을 Prettier로 포맷
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { extname, relative, isAbsolute } from 'node:path';

const FORMATTABLE = new Set(['.astro', '.ts', '.tsx', '.js', '.mjs', '.css', '.json', '.md']);

let input = {};
try {
  input = JSON.parse(readFileSync(0, 'utf8'));
} catch {
  process.exit(0);
}

const filePath = input.tool_input?.file_path;
const projectDir = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd();
if (!filePath || !FORMATTABLE.has(extname(filePath).toLowerCase())) process.exit(0);

// 프로젝트 밖 파일과 생성물 폴더는 건드리지 않음
const rel = relative(projectDir, filePath);
if (rel.startsWith('..') || isAbsolute(rel)) process.exit(0);
if (/^(dist|\.astro|node_modules)[\\/]/.test(rel) || rel === 'package-lock.json') process.exit(0);

try {
  execFileSync('npx', ['prettier', '--write', filePath], {
    cwd: projectDir,
    stdio: 'ignore',
    shell: true,
  });
} catch {
  // 포맷 실패는 작업을 막지 않음
}
process.exit(0);
