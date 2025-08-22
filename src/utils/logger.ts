const isDevelopment: boolean = import.meta.env.VITE_NODE_ENV === 'development';

export function log(...args: unknown[]): void {
  if (isDevelopment) console.log(...args);
  return;
}

export function error(...args: unknown[]): void {
  if (isDevelopment) console.error(...args);
  return;
}
