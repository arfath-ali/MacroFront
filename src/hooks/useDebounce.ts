import { useState, useEffect } from 'react';

export default function useDebounce(
  usernameToDebounce: string | null,
  delay: number,
) {
  const [debouncedUsername, setDebouncedUsername] = useState('');
  const [debouncedUsernameVersion, setDebouncedUsernameVersion] = useState('');

  useEffect(() => {
    if (usernameToDebounce) {
      const timer = setTimeout(() => {
        setDebouncedUsername(usernameToDebounce);
        setDebouncedUsernameVersion((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [usernameToDebounce]);

  return [debouncedUsername, debouncedUsernameVersion];
}
