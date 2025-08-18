import { useState, useEffect, createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import useDebounce from '@/hooks/useDebounce';
import axiosInstance from '@/services/api';

interface UsernameContextType {
  username: string;
  setUsername: (p: string) => void;
  isUsernameValid: boolean | null;
  isUsernameFieldFocused: boolean | null;
  setIsUsernameFieldFocused: (p: boolean | null) => void;
  usernameError: string;
  isUsernameAvailable: boolean | null;
  resetUsernameState: () => void;
}

const UsernameContext = createContext<UsernameContextType>({
  username: '',
  setUsername: () => {},
  isUsernameValid: null,
  isUsernameFieldFocused: null,
  setIsUsernameFieldFocused: () => {},
  usernameError: '',
  isUsernameAvailable: null,
  resetUsernameState: () => {},
});

interface UsernameProviderProps {
  children: ReactNode;
}

export function UsernameProvider({ children }: UsernameProviderProps) {
  const [username, setUsername] = useState('');
  const [usernameToDebounce, setUsernameToDebounce] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState<boolean | null>(null);
  const [isUsernameFieldFocused, setIsUsernameFieldFocused] = useState<
    boolean | null
  >(null);
  const [usernameError, setUsernameError] = useState('');
  const [debouncedUsername, debouncedUsernameVersion] = useDebounce(
    usernameToDebounce,
    1000,
  );
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    validateUsername(username);

    if (isUsernameValid) {
      setUsernameToDebounce(username);
    }
  }, [username]);

  function validateUsername(username: string): void {
    const regex = /^[0-9a-z_][0-9a-z_.]{1,}[0-9a-z_]$/;
    const usernameValidity: boolean = regex.test(username);

    if (usernameValidity) setIsUsernameValid(usernameValidity);
    else
      setUsernameError(
        'Username must be at least 3 characters and can include letters, numbers, underscores, and dots. It cannot start or end with a dot.',
      );
  }

  useEffect(() => {
    const checkUsernameAvailability = async () => {
      if (debouncedUsername) {
        try {
          const response = await axiosInstance.post('/check-username', {
            username: debouncedUsername,
          });
        } catch (error) {
          setIsUsernameAvailable(false);
        }
      }
    };

    checkUsernameAvailability();
  }, [debouncedUsernameVersion]);

  const resetUsernameState = () => {
    setUsername('');
    setUsernameToDebounce('');
    setIsUsernameValid(null);
    setUsernameError('');
    setIsUsernameFieldFocused(null);
    setIsUsernameAvailable(null);
  };

  return (
    <UsernameContext.Provider
      value={{
        username,
        setUsername,
        isUsernameValid,
        isUsernameFieldFocused,
        setIsUsernameFieldFocused,
        usernameError,
        isUsernameAvailable,
        resetUsernameState,
      }}>
      {children}
    </UsernameContext.Provider>
  );
}

export default function useUsernameContext() {
  return useContext(UsernameContext);
}
