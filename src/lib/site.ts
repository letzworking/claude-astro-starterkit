import type { NavItem, SiteConfig } from '@/types';

/** 사이트 기본 정보: 프로젝트에 맞게 수정하세요 */
export const siteConfig: SiteConfig = {
  name: 'Astro Starter Kit',
  description: 'Astro, Tailwind CSS, TypeScript로 만든 고성능 프론트엔드 스타터 킷',
};

/** 헤더 네비게이션 메뉴 */
export const navItems: NavItem[] = [
  { label: '기능', href: '/#features' },
  { label: '시작하기', href: '/#getting-started' },
];
