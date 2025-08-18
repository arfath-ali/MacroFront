import { useState, useEffect, createContext, useContext } from 'react';
import type { ReactNode } from 'react';

interface ThemeContextType {
  theme: string;
  setTheme: (p: string) => void;
  resetThemeState: () => void;
}
const ThemeContext = createContext<ThemeContextType>({
  theme: '',
  setTheme: () => {},
  resetThemeState: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

const getInitialTheme = () => {
  if (document.documentElement.classList.contains('dark')) return 'dark';

  const appTheme = localStorage.getItem('Theme') || 'light';

  return appTheme;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const resetThemeState = () => {
    setTheme('light');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resetThemeState }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default function useThemeContext() {
  return useContext(ThemeContext);
}
