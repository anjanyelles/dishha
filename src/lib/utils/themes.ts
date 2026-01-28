export const themes = [
  'light',
  'dark',
  'yellow',
  'aqua',
  'orange',
  'lilac',
  'dark-aqua',
  'dark-lilac'
] as const;

export type ThemeOption = (typeof themes)[number];

export const isValidTheme = (theme: unknown): theme is ThemeOption => {
  return themes.some((item) => item === theme);
};

export const getValidTheme = (theme: unknown): ThemeOption | undefined => {
  if (isValidTheme(theme)) return theme;
};

export const getAccentTheme = (theme: ThemeOption): ThemeOption => {
  switch (theme) {
    case 'dark':
    case 'dark-lilac':
      return 'lilac';
    case 'dark-aqua':
      return 'aqua';
    default:
      return theme || 'yellow';
  }
};
