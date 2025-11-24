// contexts/AuthContext.tsx
'use client';

import axios from 'axios';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  displayName: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function parseJwt<T extends Record<string, unknown>>(token: string): T {
  const payload = token.split('.')[1];
  return JSON.parse(atob(payload)) as T;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Проверяем наличие токена при загрузке
    const token = localStorage.getItem('token');
    if (token) {
      // Декодируем токен для получения информации о пользователе
      try {
        const { id: userId } = parseJwt<{ id: string }>(token);
        axios.post(
          `${process.env.NEXT_PUBLIC_API_URL_API}/user/info`,
          { id: userId },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(res => {
          const profile = res.data as User;
          setUser(profile);
        })
        .catch(() => {
          setUser(null);
        });
        
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        throw error;
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_API}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.error(response.ok);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка авторизации');
      }

      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      const token = localStorage.getItem('token');

      // Декодируем токен для получения информации о пользователе
      const { id: userId } = parseJwt<{ id: string }>(token!);
      axios.post(
        `${process.env.NEXT_PUBLIC_API_URL_API}/user/info`,
        { id: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(res => {
        const profile = res.data as User;
        setUser(profile);
      })
      .catch(() => {
        setUser(null);
      });

      window.location.reload(); 
    } catch (error) {
      console.error('Invalid token:', error);
      localStorage.removeItem('token');
      throw error;
    }
  };

  const register = async (email: string, password: string, displayName: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_API}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, displayName }),
      });

      //console.error(response.ok);
      //console.error(await response.json());

      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData.message);
        throw new Error(errorData.message || 'Ошибка регистрации');
      }

      const data = await response.json();
      
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        
        const token = localStorage.getItem('token');

        // Декодируем токен для получения информации о пользователе
        const { id: userId } = parseJwt<{ id: string }>(token!);
        axios.post(
          `${process.env.NEXT_PUBLIC_API_URL_API}/user/info`,
          { id: userId },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(res => {
          const profile = res.data as User;
          setUser(profile);
        })
        .catch(() => {
          setUser(null);
        });
        
        window.location.reload(); 
      }
    } catch (error) {
      console.error('Invalid token:', error);
      localStorage.removeItem('token');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    console.error(localStorage.getItem('token'));
    setUser(null);
    window.location.reload(); 
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}