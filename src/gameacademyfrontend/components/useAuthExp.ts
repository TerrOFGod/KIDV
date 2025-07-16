import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuthExpiration() {
  const router = useRouter();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const { exp } = parseJwt<{ exp: number }>(token);
        if (exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          router.push('/auth/login');
        }
      } catch {
        localStorage.removeItem('token');
        router.push('/auth/login');
      }
    };

    checkToken();

    const interval = setInterval(checkToken, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [router]);
}

function parseJwt<T extends Record<string, unknown>>(token: string): T {
  const payload = token.split('.')[1];
  return JSON.parse(atob(payload)) as T;
}