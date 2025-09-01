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
}

const EmailContext = createContext<EmailContextType>({
  emailRef: { current: null },
  email: '',
  setEmail: () => {},
  isEmailFieldFocused: null,
  setIsEmailFieldFocused: () => {},
  isEmailValid: null,
  emailError: '',
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
    const validateEmail = (email: string | null) => {
      if (!email) return;

      setEmail(email);

      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const emailValidity: boolean = regex.test(email);

      if (emailValidity) {
        setIsEmailValid(true);
        setEmailError('');
        return;
      } else {
        setIsEmailValid(false);
        setEmailError('Please enter a valid email address.');
        return;
      }
    };
    validateEmail(email);
  }, [email]);

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
      }}>
      {children}
    </EmailContext.Provider>
  );
}

export default function useEmailContext() {
  return useContext(EmailContext);
}
