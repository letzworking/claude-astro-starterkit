// PreToolUse 훅: git commit 실행 전 타입 검사 + 포맷 검사, 실패하면 커밋 차단
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

let input = {};
try {
  input = JSON.parse(readFileSync(0, 'utf8'));
} catch {
  process.exit(0);
}

const command = input.tool_input?.command ?? '';
// &&, ||, ;, | 로 나눈 각 구문이 git commit으로 시작할 때만 검사 (문자열 안의 언급은 무시)
const isCommit = command
  .split(/&&|\|\||;|\|/)
  .some((part) => /^git(\s+-\S+(\s+[^-\s]\S*)?)*\s+commit\b/.test(part.trim()));
if (!isCommit) process.exit(0);

const projectDir = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd();
const checks = [
  ['npm run check', '타입 검사(astro check)'],
  ['npm run format:check', '포맷 검사(prettier)'],
];

for (const [cmd, label] of checks) {
  try {
    execSync(cmd, { cwd: projectDir, stdio: 'pipe', encoding: 'utf8' });
  } catch (error) {
    const output = `${error.stdout ?? ''}${error.stderr ?? ''}`.trim().slice(-1500);
    // exit 2: 도구 실행을 차단하고 stderr를 Claude에게 전달
    console.error(
      `커밋 차단: ${label} 실패 (${cmd})\n${output}\n문제를 고친 뒤 다시 커밋하세요. (포맷은 npm run format)`,
    );
    process.exit(2);
  }
}
process.exit(0);
