# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 명령어

- `npm install` — 의존성 설치
- `npm run dev` — 개발 서버 (`http://localhost:4321`). `AGENTS.md`에 따라 백그라운드 모드(`npx astro dev --background`)로 띄우고, `astro dev status|logs|stop`으로 관리합니다.
- `npm run build` — 정적 빌드 (`dist/`)
- `npm run preview` — 빌드 결과 미리보기
- `npm run check` — `astro check` (Astro + TypeScript 타입 검사). 변경 후 0 errors 확인용
- `npm run format` / `npm run format:check` — Prettier 포맷팅 / 검사

테스트 러너와 ESLint는 설정되어 있지 않습니다. 검증은 `check` + `build`로 하고, UI 변경은 `browser-automation` 스킬로 확인합니다.

## 아키텍처 개요

- **정적 Astro 사이트**: `astro.config.mjs`는 `output: 'static'`, 라우트는 `src/pages/`의 파일 기반입니다. 페이지는 항상 `layouts/BaseLayout.astro`로 감싸서 `<head>` 메타, 테마 초기화 스크립트, `Header`/`Footer`를 공통으로 받습니다.
- **스타일 파이프라인 (Tailwind v4)**: `@tailwindcss/vite` 플러그인으로 동작합니다. `src/styles/global.css`가 진입점이며 `@config "../../tailwind.config.mjs"`로 JS 설정을 불러옵니다.
  - 색상 토큰은 `global.css`의 `:root`/`.dark`에 **HSL 채널 값**(예: `240 10% 3.9%`)으로만 정의합니다.
  - `tailwind.config.mjs`는 `hsl(var(--token) / <alpha-value>)` 형태로 이를 utility 색상에 연결합니다. 새 토큰을 추가할 때는 두 곳(`:root`, `.dark`)과 config 매핑을 함께 수정해야 합니다.
  - 다크모드는 `<html>`의 `dark` 클래스 기반입니다 (`@custom-variant dark`). `dark:` 클래스는 이 variant에 의존합니다.
- **테마 흐름**: `BaseLayout`의 `<head>` 인라인 스크립트가 `localStorage('theme')` 또는 시스템 설정을 읽어 본문 렌더 전에 `dark` 클래스를 붙입니다(FOUC 방지). `components/common/ThemeToggle.astro`는 클릭 시 클래스를 토글하고 값을 저장합니다. 아이콘 전환은 JS가 아니라 CSS `dark:hidden` / `dark:block`으로 처리합니다.
- **컴포넌트 계층**:
  - `components/ui/` — 재사용 원시 컴포넌트. `Button`은 `class-variance-authority`(cva)로 variant/size를 정의하고, `href`가 있으면 `<a>`로 렌더링합니다. `Card` 계열은 `Card`, `CardHeader`, `CardTitle`(`as` prop), `CardDescription`, `CardContent`, `CardFooter`로 구성됩니다.
  - `components/common/` — `Header`(데스크톱 메뉴 + 모바일 메뉴 토글 스크립트), `Footer`, `ThemeToggle`.
  - 클래스 병합은 항상 `lib/utils.ts`의 `cn()`(clsx + tailwind-merge)을 사용합니다. 컴포넌트가 외부 `class`를 받을 때 필수입니다.
- **사이트 설정 단일 소스**: 사이트 이름·설명·네비게이션 메뉴는 `src/lib/site.ts`에만 있습니다. `Header`와 `Footer`, `BaseLayout`이 여기서 읽습니다. 공유 타입은 `src/types/index.ts`에 있습니다.
- **경로 별칭**: `@/*` → `src/*` (`tsconfig.json`의 `paths`). Astro와 Vite 모두 이 별칭으로 해석합니다.
- **네비게이션 앵커**: `lib/site.ts`의 `navItems`는 `/#features`, `/#getting-started` 같은 해시 링크입니다. 해당 `id`가 `index.astro`의 섹션에 있어야 동작합니다.
- **클라이언트 스크립트**: 인터랙션은 `.astro` 파일 안의 `<script>`(번들됨)로 작성합니다. `Header`의 모바일 메뉴는 `data-icon="open|close"` 속성으로 아이콘을 전환합니다.

## 설정 시 주의

- `astro.config.mjs`의 `site`가 `https://example.com`으로 남아 있습니다. canonical과 Open Graph URL이 이 값을 사용하므로 실제 도메인으로 바꿔야 합니다.
- Prettier의 Tailwind 클래스 정렬은 `.prettierrc`의 `tailwindStylesheet`(`global.css`)를 기준으로 합니다.
- 패키지 설치 시 `npm audit` 경고가 나옵니다. 아직 확인하지 않았습니다.
