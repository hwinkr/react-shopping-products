export function generateBasicToken(): string {
  const USER_ID = import.meta.env.VITE_USER_ID;
  const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;

  const token = btoa(`${USER_ID}:${USER_PASSWORD}`);
  return `Basic ${token}`;
}
