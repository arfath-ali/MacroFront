import { useState, useEffect } from 'react';

export default function useDebounce(
  usernameToDebounce: string | null,
  delay: number,
) {
  const [debouncedUsername, setDebouncedUsername] = useState('');
  const [debouncedUsernameVersion, setDebouncedUsernameVersion] = useState('');

  useEffect(() => {
    const trimmedUsername = usernameToDebounce?.trim() || '';

    const timer = setTimeout(() => {
      setDebouncedUsername(trimmedUsername);
      setDebouncedUsernameVersion((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [usernameToDebounce]);

  return [debouncedUsername, debouncedUsernameVersion];
}
