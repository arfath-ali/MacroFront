import { useState, useEffect, createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface CurrentPathContextType {
  currentPath: string | null;
  setCurrentPath: (parameter: string) => void;
}

const CurrentPathContext = createContext<CurrentPathContextType>({
  currentPath: '',
  setCurrentPath: () => {},
});

interface CurrentPathProviderProps {
  children: ReactNode;
}

export function CurrentPathProvider({ children }: CurrentPathProviderProps) {
  const location = useLocation();
  const path = location.pathname;

  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(path);
  }, [path]);

  return (
    <CurrentPathContext.Provider value={{ currentPath, setCurrentPath }}>
      {children}
    </CurrentPathContext.Provider>
  );
}

export default function useCurrentPathProvider() {
  return useContext(CurrentPathContext);
}
