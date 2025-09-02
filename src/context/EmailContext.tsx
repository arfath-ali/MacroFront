import { useState, useRef, createContext, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';

interface EmailContextType {
  emailRef: React.RefObject<HTMLInputElement | null>;
  email: string;
  setEmail: (p: string) => void;
  isEmailFieldFocused: boolean | null;
  setIsEmailFieldFocused: (p: boolean | null) => void;
  isEmailValid: boolean | null;
  emailError: string;
  setEmailError: (p: string) => void;
  resetEmailState: () => void;
}

const EmailContext = createContext<EmailContextType>({
  emailRef: { current: null },
  email: '',
  setEmail: () => {},
  isEmailFieldFocused: null,
  setIsEmailFieldFocused: () => {},
  isEmailValid: null,
  emailError: '',
  setEmailError: () => {},
  resetEmailState: () => {},
});

interface EmailProviderProps {
  children: ReactNode;
}

export function EmailProvider({ children }: EmailProviderProps) {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const [isEmailFieldFocused, setIsEmailFieldFocused] = useState<
    boolean | null
  >(null);
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    if (email) {
      setEmailError('');
      validateEmail(email);
    }
  }, [email]);

  const validateEmail = (email: string): void => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailValidity: boolean = regex.test(email);
    setIsEmailValid(emailValidity);
  };

  useEffect(() => {
    if (isEmailValid) {
      setEmailError('');
      return;
    } else if (isEmailValid === false) {
      setEmailError('Please enter a valid email address.');
      return;
    }
  }, [isEmailValid]);

  const resetEmailState = () => {
    if (emailRef.current) emailRef.current.value === '';
    setEmail('');
    setIsEmailFieldFocused(null);
    setIsEmailValid(null);
    setEmailError('');
  };

  return (
    <EmailContext.Provider
      value={{
        emailRef,
        email,
        setEmail,
        isEmailFieldFocused,
        setIsEmailFieldFocused,
        isEmailValid,
        emailError,
        setEmailError,
        resetEmailState,
      }}>
      {children}
    </EmailContext.Provider>
  );
}

export default function useEmailContext() {
  return useContext(EmailContext);
}
