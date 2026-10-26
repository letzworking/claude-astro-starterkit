# TODO

README.md에 기술된 구조와 현재 `src/` 상태를 비교해 정리한 남은 작업입니다.

## 현황 요약

README는 아래 파일들이 존재한다고 설명하지만, 최근 커밋(`common·ui 컴포넌트 삭제`, `BaseLayout 레이아웃 삭제`)으로 일부가 제거되어 현재는 없습니다.

| README 항목                                     | 현재 상태 |
| :---------------------------------------------- | :-------- |
| `src/components/ui/` (Button, Card 계열)        | 없음      |
| `src/components/common/` (Header, Footer, ThemeToggle) | 없음 |
| `src/layouts/BaseLayout.astro`                  | 없음      |
| `src/styles/global.css`                         | 없음      |
| `src/lib/site.ts`, `src/lib/utils.ts`           | 있음      |
| `src/pages/index.astro`                         | 있음      |
| `src/types/index.ts`                            | 있음      |

## 1. 필수 구현 (README와 코드 일치)

- [ ] `src/styles/global.css` 작성
  - [ ] Tailwind v4 진입점 (`@import "tailwindcss"`, `@config "../../tailwind.config.mjs"`)
  - [ ] `:root` / `.dark` 색상 토큰 (HSL 채널 값)
  - [ ] `@custom-variant dark` 정의
  - [ ] `@tailwindcss/typography` 플러그인 연결
- [ ] `src/layouts/BaseLayout.astro` 작성
  - [ ] SEO 메타 (`title`, `description`, `image` props, canonical, Open Graph)
  - [ ] `<head>` 인라인 테마 초기화 스크립트 (FOUC 방지)
  - [ ] `Header` / `Footer` 포함
- [ ] `src/components/common/` 작성
  - [ ] `Header.astro` (데스크톱 메뉴 + 모바일 메뉴 토글 스크립트)
  - [ ] `Footer.astro`
  - [ ] `ThemeToggle.astro` (`localStorage('theme')` 저장, CSS `dark:hidden` / `dark:block` 아이콘 전환)
- [ ] `src/components/ui/` 작성
  - [ ] `Button.astro` (cva variant/size, `href` 있으면 `<a>` 렌더링)
  - [ ] `Card` 계열 (`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`)
- [ ] `src/pages/index.astro`가 `BaseLayout`을 사용하도록 확인/수정
  - [ ] `lib/site.ts`의 `navItems` 앵커(`/#features`, `/#getting-started`)와 일치하는 섹션 `id` 추가

## 2. 설정 및 커스터마이징

- [ ] `astro.config.mjs`의 `site`를 `https://example.com`에서 실제 도메인으로 변경
- [ ] `src/lib/site.ts`의 사이트 이름·설명·메뉴를 실제 값으로 교체
- [ ] `tailwind.config.mjs`의 `theme.extend`(브랜드 컬러·폰트·라운드) 정리
- [ ] OG 이미지(`/og-image.png`)를 `public/`에 추가 (현재 favicon만 존재)
- [ ] `.prettierrc`의 `tailwindStylesheet`가 `global.css`를 가리키는지 확인 (파일 생성 후)

## 3. 검증

- [ ] `npm run check` — 0 errors 확인
- [ ] `npm run format:check` — 포맷 위반 없음 확인
- [ ] `npm run build` — 정적 빌드 성공 확인
- [ ] 개발 서버에서 다크모드 전환, 모바일 메뉴, 해시 앵커 이동 동작 확인
- [ ] `npm audit` 경고 내용 확인 (CLAUDE.md에 미확인으로 기록됨)

## 4. 문서 및 배포

- [ ] 구현 결과에 맞게 README의 프로젝트 구조 섹션 갱신 (컴포넌트를 의도적으로 제거한 경우 README에서도 삭제)
- [ ] 배포 대상 선택 (Vercel / Netlify / GitHub Pages) 및 배포 설정
- [ ] 배포 후 canonical, Open Graph URL 동작 확인
