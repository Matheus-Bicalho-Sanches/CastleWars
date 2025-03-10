import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  sendPasswordResetEmail,
  updateProfile,
  User
} from 'firebase/auth';
import { auth } from './config';

// Interface para tipo de erro comum
export interface AuthError {
  code: string;
  message: string;
}

// Tradução de erros do Firebase para mensagens amigáveis em português
export const translateFirebaseError = (error: AuthError): string => {
  const errorMessages: Record<string, string> = {
    'auth/email-already-in-use': 'Este email já está sendo utilizado.',
    'auth/invalid-email': 'O email fornecido não é válido.',
    'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres.',
    'auth/user-not-found': 'Usuário não encontrado.',
    'auth/wrong-password': 'Senha incorreta.',
    'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
    'auth/user-disabled': 'Este usuário foi desativado.',
    'auth/operation-not-allowed': 'Operação não permitida.',
    'auth/network-request-failed': 'Falha na conexão. Verifique sua internet.',
  };

  return errorMessages[error.code] || 'Ocorreu um erro. Tente novamente.';
};

/**
 * Registra um novo usuário com email e senha
 */
export const registerWithEmailAndPassword = async (
  email: string, 
  password: string,
  displayName: string
): Promise<{user: User | null, error: string | null}> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Adiciona o nome de exibição
    if (userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: displayName
      });
    }
    
    return { user: userCredential.user, error: null };
  } catch (error) {
    const authError = error as AuthError;
    return { user: null, error: translateFirebaseError(authError) };
  }
};

/**
 * Faz login com email e senha
 */
export const loginWithEmailAndPassword = async (
  email: string, 
  password: string
): Promise<{user: User | null, error: string | null}> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    const authError = error as AuthError;
    return { user: null, error: translateFirebaseError(authError) };
  }
};

/**
 * Faz logout do usuário atual
 */
export const logout = async (): Promise<{success: boolean, error: string | null}> => {
  try {
    await signOut(auth);
    return { success: true, error: null };
  } catch (error) {
    const authError = error as AuthError;
    return { success: false, error: translateFirebaseError(authError) };
  }
};

/**
 * Envia email de recuperação de senha
 */
export const resetPassword = async (email: string): Promise<{success: boolean, error: string | null}> => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, error: null };
  } catch (error) {
    const authError = error as AuthError;
    return { success: false, error: translateFirebaseError(authError) };
  }
};

/**
 * Retorna o usuário atual
 */
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
}; 