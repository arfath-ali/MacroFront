const isDevelopment: boolean = import.meta.env.VITE_NODE_ENV === 'development';

export function log(...args: unknown[]): void {
  if (isDevelopment) console.log(...args);
  return;
}

export function logError(...args: unknown[]): void {
  if (isDevelopment) console.log(...args);
  return;
}
