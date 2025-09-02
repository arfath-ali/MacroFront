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
  setUsernameError: (p: string) => void;
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
  setUsernameError: () => {},
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
    if (username.trim() === '') {
      setUsernameToDebounce('');
      setIsUsernameAvailable(null);
      return;
    }

    if (username) {
      validateUsername(username);
    }
  }, [username]);

  function validateUsername(username: string): void {
    console.log('Namaste Na');
    console.log('Username: ', username);
    const regex = /^[0-9a-z_](?:[0-9a-z_.]*[0-9a-z_])?$/;
    const usernameValidity: boolean = regex.test(username);
    setIsUsernameValid(usernameValidity);
  }

  useEffect(() => {
    if (username && isUsernameValid) {
      setUsernameError('');
      setUsernameToDebounce(username);
    } else if (
      username &&
      isUsernameValid === false &&
      isUsernameFieldFocused === false
    ) {
      if (username.startsWith('.')) {
        setUsernameError("You can't start your username with a period.");
      } else if (username.endsWith('.')) {
        setUsernameError("You can't end your username with a period.");
      } else {
        setUsernameError(
          'Usernames can only use letters, numbers, underscores and periods.',
        );
      }
    }
  }, [username, isUsernameValid, isUsernameFieldFocused]);

  useEffect(() => {
    const checkUsernameAvailability = async () => {
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
  }, [isUsernameValid, debouncedUsernameVersion]);

  useEffect(() => {
    if (isUsernameAvailable) {
      setUsernameError('');
      return;
    } else if (isUsernameAvailable === false) {
      setUsernameError("This username isn't available. Please try another.");
      return;
    }
  }, [isUsernameAvailable]);

  const resetUsernameState = () => {
    if (usernameRef.current) usernameRef.current.value = '';
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
        setUsernameError,
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
