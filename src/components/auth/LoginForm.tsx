import React, { useState } from 'react';
import { useAuth } from '../../firebase/AuthContext';

interface LoginFormProps {
  onSuccess?: () => void;
  onRegisterClick?: () => void;
  onForgotPasswordClick?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onSuccess, 
  onRegisterClick, 
  onForgotPasswordClick 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      setError(null);
      setLoading(true);
      
      const result = await login(email, password);
      
      if (result.error) {
        setError(result.error);
      } else {
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      setError('Ocorreu um erro durante o login. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form">
      <h2>Entrar</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            placeholder="Seu email"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            placeholder="Sua senha"
            required
          />
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            disabled={loading}
            className="login-button"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
      </form>
      
      <div className="form-links">
        {onForgotPasswordClick && (
          <button 
            onClick={onForgotPasswordClick}
            className="link-button"
            disabled={loading}
          >
            Esqueci minha senha
          </button>
        )}
        
        {onRegisterClick && (
          <button 
            onClick={onRegisterClick}
            className="link-button"
            disabled={loading}
          >
            Não tem uma conta? Registre-se
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginForm; 