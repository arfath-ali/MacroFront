import { useState, useEffect, useRef, createContext, useContext } from 'react';
import type { ReactNode } from 'react';

interface FullNameContextType {
  fullNameRef: React.RefObject<HTMLInputElement | null>;
  fullName: string;
  setFullName: (p: string) => void;
  isFullNameValid: boolean | null;
  fullNameError: string;
  setFullNameError: (p: string) => void;
  resetFullNameState: () => void;
}

const FullNameContext = createContext<FullNameContextType>({
  fullNameRef: { current: null },
  fullName: '',
  setFullName: () => {},
  isFullNameValid: null,
  fullNameError: '',
  setFullNameError: () => {},
  resetFullNameState: () => {},
});

interface FullNameProviderProps {
  children: ReactNode;
}

export function FullNameProvider({ children }: FullNameProviderProps) {
  const fullNameRef = useRef<HTMLInputElement | null>(null);
  const [fullName, setFullName] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [isFullNameValid, setIsFullNameValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (fullName && fullName.length > 50) {
      setIsFullNameValid(false);
      setFullNameError('Full name cannot exceed 50 characters.');
    } else {
      setIsFullNameValid(true);
    }
  }, [fullName]);

  const resetFullNameState = () => {
    if (fullNameRef.current) fullNameRef.current.value = '';
    setFullName('');
    setIsFullNameValid(null);
    setFullNameError('');
  };

  return (
    <FullNameContext.Provider
      value={{
        fullNameRef,
        fullName,
        setFullName,
        isFullNameValid,
        fullNameError,
        setFullNameError,
        resetFullNameState,
      }}>
      {children}
    </FullNameContext.Provider>
  );
}

export default function useFullNameContext() {
  return useContext(FullNameContext);
}
