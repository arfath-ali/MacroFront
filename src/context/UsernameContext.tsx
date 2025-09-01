import { useState, useEffect, useRef, createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import useDebounce from '@/hooks/useDebounce';
import axiosInstance from '@/services/api';

interface UsernameContextType {
  usernameRef: React.RefObject<HTMLInputElement | null>;
  username: string;
  setUsername: (p: string) => void;
  isUsernameFieldFocused: boolean | null;
  setIsUsernameFieldFocused: (p: boolean | null) => void;
  isUsernameValid: boolean | null;
  usernameError: string;
  isSearchingUsername: boolean;
  isUsernameAvailable: boolean | null;
  resetUsernameState: () => void;
}

const UsernameContext = createContext<UsernameContextType>({
  usernameRef: { current: null },
  username: '',
  setUsername: () => {},
  isUsernameFieldFocused: null,
  setIsUsernameFieldFocused: () => {},
  isUsernameValid: null,
  usernameError: '',
  isSearchingUsername: false,
  isUsernameAvailable: null,
  resetUsernameState: () => {},
});

interface UsernameProviderProps {
  children: ReactNode;
}

export function UsernameProvider({ children }: UsernameProviderProps) {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const [username, setUsername] = useState('');
  const [usernameToDebounce, setUsernameToDebounce] = useState('');
  const [debouncedUsername, debouncedUsernameVersion] = useDebounce(
    usernameToDebounce,
    1000,
  );
  const [isUsernameValid, setIsUsernameValid] = useState<boolean | null>(null);
  const [usernameError, setUsernameError] = useState('');
  const [isSearchingUsername, setIsSearchingUsername] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<
    boolean | null
  >(null);
  const [isUsernameFieldFocused, setIsUsernameFieldFocused] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    validateUsername(username);
  }, [username]);

  function validateUsername(username: string): void {
    const regex = /^[0-9a-z_][0-9a-z_.]{1,}[0-9a-z_]$/;
    const usernameValidity: boolean = regex.test(username);
    setIsUsernameValid(usernameValidity);
  }

  useEffect(() => {
    if (isUsernameValid) {
      setUsernameError('');
      setUsernameToDebounce(username);
    } else if (isUsernameValid === false) {
      setUsernameError(
        'Username must be at least 3 characters and can include letters, numbers, underscores, and dots. It cannot start or end with a dot.',
      );
      setIsUsernameAvailable(null);
    }
  }, [username, isUsernameValid]);

  useEffect(() => {
    const checkUsernameAvailability = async () => {
      setIsUsernameAvailable(null);
      if (isUsernameValid && debouncedUsername) {
        setIsSearchingUsername(true);
        try {
          const response = await axiosInstance.post('usernames/availability', {
            username: debouncedUsername,
          });
          setTimeout(() => {
            setIsUsernameAvailable(response.data?.isAvailable);
            setIsSearchingUsername(false);
          }, 1000);
        } catch {
          setIsUsernameAvailable(null);
        }
      }
    };

    checkUsernameAvailability();
  }, [debouncedUsernameVersion]);

  const resetUsernameState = () => {
    if (usernameRef.current) usernameRef.current.value === '';
    setUsername('');
    setUsernameToDebounce('');
    setIsUsernameValid(null);
    setUsernameError('');
    setIsUsernameAvailable(null);
    setIsUsernameFieldFocused(null);
  };

  return (
    <UsernameContext.Provider
      value={{
        usernameRef,
        username,
        setUsername,
        isUsernameFieldFocused,
        setIsUsernameFieldFocused,
        isUsernameValid,
        usernameError,
        isSearchingUsername,
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
