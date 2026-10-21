/** 네비게이션 메뉴 항목 */
export interface NavItem {
  label: string;
  href: string;
}

/** 사이트 공통 정보 */
export interface SiteConfig {
  name: string;
  description: string;
}

/** BaseLayout 이 받는 SEO 관련 속성 */
export interface BaseLayoutProps {
  /** 페이지 제목. 사이트 이름이 뒤에 붙습니다 */
  title?: string;
  /** 메타 description. 생략하면 사이트 설명을 사용합니다 */
  description?: string;
  /** Open Graph 이미지 경로 (public 기준, 예: /og-image.png) */
  image?: string;
}

/** Button 컴포넌트 variant */
export type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'link';

/** Button 컴포넌트 size */
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';
