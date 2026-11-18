import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';

export type Theme = 'light' | 'dark';

export interface Colors {
  background: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
  primary: string;
  onPrimary: string;
  selected: string;
}

const palettes: Record<Theme, Colors> = {
  light: {
    background: '#F4F6FB',
    surface: '#FFFFFF',
    text: '#182033',
    muted: '#747D91',
    border: '#DDE2EC',
    primary: '#5B5FEF',
    onPrimary: '#FFFFFF',
    selected: '#EEEFFF',
  },
  dark: {
    background: '#111522',
    surface: '#1C2233',
    text: '#F4F6FB',
    muted: '#A5AEC1',
    border: '#343C50',
    primary: '#777BFF',
    onPrimary: '#FFFFFF',
    selected: '#303451',
  },
};

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  colors: Colors;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>('light');
  const value = useMemo(() => ({ theme, setTheme, colors: palettes[theme] }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
