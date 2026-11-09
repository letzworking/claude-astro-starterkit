// Claude Code 훅 → Slack 웹훅 알림 스크립트
// 사용법: node slack-notify.mjs  (stdin으로 훅 JSON 입력을 받음)
// 웹훅 URL: 환경변수 SLACK_WEBHOOK_URL 또는 같은 폴더의 slack-webhook.url 파일
import { readFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// 알림 실패가 Claude Code 동작을 막지 않도록 항상 exit 0
const done = () => process.exit(0);

function loadWebhookUrl() {
  if (process.env.SLACK_WEBHOOK_URL) return process.env.SLACK_WEBHOOK_URL.trim();
  try {
    const file = join(dirname(fileURLToPath(import.meta.url)), 'slack-webhook.url');
    return readFileSync(file, 'utf8').trim();
  } catch {
    return '';
  }
}

function readStdin() {
  try {
    return JSON.parse(readFileSync(0, 'utf8'));
  } catch {
    return {};
  }
}

const url = loadWebhookUrl();
if (!url) done();

const input = readStdin();
const project = input.cwd ? basename(input.cwd) : 'unknown';
const event = input.hook_event_name;

// 한국 시간 기준 시각 문자열 (예: 2026-11-06 12:32:10)
const time = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' }).replace('T', ' ');

let status;
if (event === 'Notification') {
  const isPermission = input.notification_type === 'permission_prompt';
  const title = isPermission ? '🔐 권한 요청' : '⏳ 입력 대기';
  status = input.message ? `${title} (${input.message})` : title;
} else if (event === 'Stop') {
  status = '✅ 작업 완료';
} else {
  done();
}

const text = `발송프로젝트 : ${project}\n상태 : ${status}\n시간 : ${time}`;

try {
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
    signal: AbortSignal.timeout(5000),
  });
} catch {
  // 네트워크 오류는 무시
}
done();
