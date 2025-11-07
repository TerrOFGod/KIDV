// contexts/AuthContext.tsx
'use client';

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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Проверяем наличие токена при загрузке
    const token = localStorage.getItem('token');
    if (token) {
      // Декодируем токен для получения информации о пользователе
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userInfo: User = {
          id: payload.id,
          email: payload.email,
          displayName: payload.displayName || payload.email,
          role: payload.role || 'Student'
        };
        setUser(userInfo);
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка авторизации');
      }

      const data = await response.json();
      localStorage.setItem('token', data.access_token);

      // Декодируем токен для получения информации о пользователе
      const payload = JSON.parse(atob(data.access_token.split('.')[1]));
      const userInfo: User = {
        id: payload.id,
        email: payload.email,
        displayName: payload.displayName || payload.email,
        role: payload.role || 'Student'
      };
      
      setUser(userInfo);
    } catch (error) {
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка регистрации');
      }

      const data = await response.json();
      
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        
        const payload = JSON.parse(atob(data.access_token.split('.')[1]));
        const userInfo: User = {
          id: payload.id,
          email: payload.email,
          displayName: payload.displayName || payload.email,
          role: payload.role || 'Student'
        };
        
        setUser(userInfo);
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
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