# Astro Starter Kit

Astro, Tailwind CSS v4, TypeScript로 만든 고성능 프론트엔드 스타터 킷입니다.
빌드 도구 설정 없이 정적 사이트로 동작하며, 다크모드·SEO 기본 구조·shadcn/ui 스타일 컴포넌트를 포함합니다.

## 기술 스택

- **Astro**: 정적 우선 렌더링 (`output: 'static'`)
- **Tailwind CSS v4**: `@tailwindcss/vite` 플러그인 + `@tailwindcss/typography`
- **TypeScript**: `astro/tsconfigs/strict` 기반 엄격 모드, `@/*` 경로 별칭
- **Lucide Icons**: `@lucide/astro`
- **컴포넌트 유틸**: `class-variance-authority`, `clsx`, `tailwind-merge`
- **포맷팅**: Prettier (`prettier-plugin-astro`, `prettier-plugin-tailwindcss`)

## 프로젝트 구조

```text
src/
├── components/
│   ├── ui/                 # 원시 UI 컴포넌트 (Button, Card 계열)
│   └── common/             # 헤더, 푸터, 테마 토글 등 레이아웃 컴포넌트
├── layouts/
│   └── BaseLayout.astro    # SEO 메타, 테마 초기화, 헤더/푸터 포함
├── lib/
│   ├── site.ts             # 사이트 이름, 설명, 네비게이션 메뉴
│   └── utils.ts            # cn() 클래스 병합 유틸
├── pages/
│   └── index.astro         # 랜딩 페이지
├── styles/
│   └── global.css          # Tailwind 진입점, 테마 색상 토큰, 다크모드 variant
└── types/
    └── index.ts            # 공통 타입 정의
```

## 명령어

| 명령어                 | 설명                                          |
| :--------------------- | :-------------------------------------------- |
| `npm install`          | 의존성 설치                                   |
| `npm run dev`          | 로컬 개발 서버 실행 (`http://localhost:4321`) |
| `npm run build`        | 프로덕션 빌드 (`dist/`)                       |
| `npm run preview`      | 빌드 결과 미리보기                            |
| `npm run check`        | Astro/TypeScript 타입 검사                    |
| `npm run format`       | Prettier로 전체 포맷팅                        |
| `npm run format:check` | 포맷 위반 여부만 확인                         |

## 커스터마이징

- **사이트 정보·메뉴**: `src/lib/site.ts`
- **사이트 도메인**: `astro.config.mjs`의 `site` 값 (canonical, Open Graph URL에 사용)
- **색상 테마**: `src/styles/global.css`의 `:root`, `.dark` 토큰 (HSL 채널 값)
- **브랜드 컬러·폰트·라운드**: `tailwind.config.mjs`의 `theme.extend`
- **페이지별 SEO**: `BaseLayout`에 `title`, `description`, `image` 속성 전달

```astro
<BaseLayout title="소개" description="소개 페이지입니다." image="/og-image.png">
  ...
</BaseLayout>
```

## 다크모드

- `<html>`에 `dark` 클래스를 붙이는 방식이며, `dark:` 유틸리티 클래스를 사용합니다.
- 선택한 테마는 `localStorage`(`theme` 키)에 저장되고, 첫 방문 시에는 시스템 설정을 따릅니다.
- 테마 적용 스크립트는 `BaseLayout`의 `<head>`에서 본문보다 먼저 실행되어 깜빡임을 막습니다.

## 배포

`npm run build`로 생성된 `dist/` 폴더를 Vercel, Netlify, GitHub Pages 같은 정적 호스팅에 올리면 됩니다.
