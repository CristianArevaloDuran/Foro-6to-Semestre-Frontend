'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export function AuthProvider({ children, apiUrl }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Restaurar sesión al montar la app
  useEffect(() => {
    const restoreSession = async () => {
      const token = Cookies.get('session') || localStorage.getItem('token');
      
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const userData = await response.json();
          
          setUser(userData);
        } else {
          // Token inválido
          Cookies.remove('session');
          localStorage.removeItem('token');
        }
      } catch (err) {
        console.error('Error restaurando sesión:', err);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, [apiUrl]);

  const login = useCallback((userData, token) => {
    setUser(userData);
    Cookies.set('session', token, { secure: true });
    localStorage.setItem('token', token);
    setError(null);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    Cookies.remove('session');
    localStorage.removeItem('token');
    setError(null);
  }, []);

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: Boolean(user)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
}
