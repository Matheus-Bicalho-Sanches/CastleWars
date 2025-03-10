import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from './config';
import { 
  loginWithEmailAndPassword, 
  registerWithEmailAndPassword, 
  logout,
  resetPassword
} from './auth';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{user: User | null, error: string | null}>;
  register: (email: string, password: string, displayName: string) => Promise<{user: User | null, error: string | null}>;
  logout: () => Promise<{success: boolean, error: string | null}>;
  resetPassword: (email: string) => Promise<{success: boolean, error: string | null}>;
}

// Valor default do contexto
const defaultValue: AuthContextType = {
  currentUser: null,
  loading: true,
  login: async () => ({ user: null, error: 'Contexto não inicializado' }),
  register: async () => ({ user: null, error: 'Contexto não inicializado' }),
  logout: async () => ({ success: false, error: 'Contexto não inicializado' }),
  resetPassword: async () => ({ success: false, error: 'Contexto não inicializado' })
};

// Criação do contexto
const AuthContext = createContext<AuthContextType>(defaultValue);

// Hook personalizado para acessar o contexto
export const useAuth = () => useContext(AuthContext);

// Provedor do contexto de autenticação
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Monitoramento do estado de autenticação do usuário
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup da inscrição quando o componente for desmontado
    return () => unsubscribe();
  }, []);

  // Valor do contexto que será disponibilizado para a aplicação
  const value: AuthContextType = {
    currentUser,
    loading,
    login: loginWithEmailAndPassword,
    register: registerWithEmailAndPassword,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 