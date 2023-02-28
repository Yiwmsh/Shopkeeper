import { Theme } from '@chrisellis/react-carpentry';

export const LightTheme = new Theme({
  background: '#EBD5B3',
  midground: `#e5d4b9`,
  foreground: `#f2d7ac`,
  shadow: 'rgba(0, 0, 0, 0.15)',
  primary: '#142a4c',
  primaryActive: '#002174',
  primaryDisabled: '#252e3b',
  secondary: '#72cc77',
  secondaryActive: '#32ff3c',
  secondaryDisabled: '#8db18e',
  text: '#000000',
  altText: '#FFFFFF',
  error: '#ED6767',
});

export const DarkTheme = new Theme({
  background: '#2B2B2B',
  midground: '#363636',
  foreground: '#404040',
  shadow: 'rgba(0, 0, 0, 0.08)',
  primary: '#b05251',
  primaryActive: '#c44a3d',
  primaryDisabled: '#683939',
  secondary: '#0047AB',
  secondaryActive: '#0047d9',
  secondaryDisabled: '#002e6f',
  text: '#FFFFFF',
  altText: '#FFFFFF',
  error: '#ED6767',
});
