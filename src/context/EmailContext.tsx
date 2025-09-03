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
  setIsEmailAlreadyRegistered: (p: boolean | null) => void;
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
  setIsEmailAlreadyRegistered: () => {},
  resetEmailState: () => {},
});

interface EmailProviderProps {
  children: ReactNode;
}

export function EmailProvider({ children }: EmailProviderProps) {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const [emailError, setEmailError] = useState('');
  const [isEmailAlreadyRegistered, setIsEmailAlreadyRegistered] = useState<
    boolean | null
  >(null);
  const [isEmailFieldFocused, setIsEmailFieldFocused] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    if (email.trim() === '') {
      setIsEmailValid(null);
    }

    if (email) {
      validateEmail(email);
    }
  }, [email]);

  const validateEmail = (email: string): void => {
    const regex = /^[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]{1,189}\.[a-zA-Z]{2,}$/;
    const emailValidity: boolean = regex.test(email);
    setIsEmailValid(emailValidity);
  };

  useEffect(() => {
    if (email && email.length > 254) {
      setEmailError('Email cannot exceed 254 characters.');
    } else if (email && isEmailValid && isEmailAlreadyRegistered === null) {
      setEmailError('');
      return;
    } else if (
      email &&
      isEmailValid === false &&
      isEmailFieldFocused === false
    ) {
      setEmailError('Please enter a valid email address.');
      return;
    }
  }, [email, isEmailValid, isEmailFieldFocused]);

  const resetEmailState = () => {
    if (emailRef.current) emailRef.current.value = '';
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
        setIsEmailAlreadyRegistered,
        resetEmailState,
      }}>
      {children}
    </EmailContext.Provider>
  );
}

export default function useEmailContext() {
  return useContext(EmailContext);
}
