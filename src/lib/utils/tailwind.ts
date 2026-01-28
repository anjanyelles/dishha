import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  override: {},
  extend: {
    theme: {
      spacing: ['xs']
    },
    classGroups: {
      'max-w': [{ 'max-w': ['modal', 'container', 'screen'] }],
      'max-h': [{ 'max-h': ['modal', 'screen'] }]
    }
  }
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs)) || undefined;
}

export const screens = {
  xs: '420px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const;
