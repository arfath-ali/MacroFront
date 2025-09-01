import { useState, useEffect, useRef, createContext, useContext } from 'react';
import type { ReactNode } from 'react';

interface PasswordContextType {
  passwordRef: React.RefObject<HTMLInputElement | null>;
  password: string;
  setPassword: (p: string) => void;
  isPasswordValid: boolean | null;
  isPasswordFieldFocused: boolean | null;
  setIsPasswordFieldFocused: (p: boolean | null) => void;
  passwordError: string;
  confirmPasswordRef: React.RefObject<HTMLInputElement | null>;
  confirmPassword: string;
  setConfirmPassword: (p: string) => void;
  isConfirmPasswordMatched: boolean | null;
  isConfirmPasswordFieldFocused: boolean | null;
  setIsConfirmPasswordFieldFocused: (p: boolean | null) => void;
  confirmPasswordError: string;
  resetPasswordState: () => void;
}

const PasswordContext = createContext<PasswordContextType>({
  passwordRef: { current: null },
  password: '',
  setPassword: () => {},
  isPasswordValid: null,
  isPasswordFieldFocused: null,
  setIsPasswordFieldFocused: () => {},
  passwordError: '',
  confirmPasswordRef: { current: null },
  confirmPassword: '',
  setConfirmPassword: () => {},
  isConfirmPasswordMatched: null,
  isConfirmPasswordFieldFocused: null,
  setIsConfirmPasswordFieldFocused: () => {},
  confirmPasswordError: '',
  resetPasswordState: () => {},
});

interface PasswordProviderProps {
  children: ReactNode;
}

export function PasswordProvider({ children }: PasswordProviderProps) {
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(null);
  const [isPasswordFieldFocused, setIsPasswordFieldFocused] = useState<
    boolean | null
  >(null);
  const [passwordError, setPasswordError] = useState('');

  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isConfirmPasswordMatched, setIsConfirmPasswordMatched] = useState<
    boolean | null
  >(null);
  const [isConfirmPasswordFieldFocused, setIsConfirmPasswordFieldFocused] =
    useState<boolean | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  useEffect(() => {
    const validatePassword = () => {
      if (!password) return;

      const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])[0-9a-zA-Z!@#$%^&*()_+-]{8,}$/;
      const passwordValidity = regex.test(password);

      if (passwordValidity) {
        setIsPasswordValid(true);
        setPasswordError('');
      } else {
        setIsPasswordValid(false);
        setPasswordError(
          'Password must be at least 8 characters long and include letters and numbers. Special characters are allowed.',
        );
      }
    };
    validatePassword();
  }, [password]);

  useEffect(() => {
    if (
      password &&
      confirmPassword &&
      !isPasswordFieldFocused &&
      !isConfirmPasswordFieldFocused
    ) {
      if (confirmPassword === password) {
        setIsConfirmPasswordMatched(true);
        setConfirmPasswordError('');
      } else {
        setIsConfirmPasswordMatched(false);
        setConfirmPasswordError('Passwords do not match.');
      }
    }
  }, [
    password,
    confirmPassword,
    isPasswordFieldFocused,
    isConfirmPasswordFieldFocused,
  ]);

  const resetPasswordState = () => {
    setPassword('');
    setIsPasswordValid(null);
    setIsPasswordFieldFocused(null);
    setPasswordError('');
    setConfirmPassword('');
    setIsConfirmPasswordMatched(null);
    setIsConfirmPasswordFieldFocused(null);
    setConfirmPasswordError('');
  };

  return (
    <PasswordContext.Provider
      value={{
        passwordRef,
        password,
        setPassword,
        isPasswordValid,
        isPasswordFieldFocused,
        setIsPasswordFieldFocused,
        passwordError,
        confirmPasswordRef,
        confirmPassword,
        setConfirmPassword,
        isConfirmPasswordMatched,
        isConfirmPasswordFieldFocused,
        setIsConfirmPasswordFieldFocused,
        confirmPasswordError,
        resetPasswordState,
      }}>
      {children}
    </PasswordContext.Provider>
  );
}

export default function usePasswordContext() {
  return useContext(PasswordContext);
}
