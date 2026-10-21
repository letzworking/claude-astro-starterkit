// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // 실제 배포 도메인으로 변경하세요 (canonical, Open Graph URL 생성에 사용됩니다)
  site: 'https://example.com',
  // 기본값은 정적 빌드입니다. 서버 렌더링이 필요하면 adapter와 함께 변경하세요.
  output: 'static',
  vite: {
    // Tailwind CSS v4: 별도의 PostCSS 설정 없이 Vite 플러그인으로 동작합니다
    plugins: [tailwindcss()],
  },
});
