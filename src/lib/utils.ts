import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 조건부 클래스 문자열을 합치고, 충돌하는 Tailwind 클래스를 정리합니다.
 * 컴포넌트 외부에서 전달받은 class 와 기본 class 를 안전하게 병합할 때 사용합니다.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
