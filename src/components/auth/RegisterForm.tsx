import React, { useState } from 'react';
import { useAuth } from '../../firebase/AuthContext';

interface RegisterFormProps {
  onSuccess?: () => void;
  onLoginClick?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ 
  onSuccess, 
  onLoginClick 
}) => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!displayName || !email || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      setError(null);
      setLoading(true);
      
      const result = await register(email, password, displayName);
      
      if (result.error) {
        setError(result.error);
      } else {
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      setError('Ocorreu um erro durante o registro. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-form">
      <h2>Criar Conta</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="displayName">Nome</label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            disabled={loading}
            placeholder="Seu nome no jogo"
            required
          />
        </div>
        
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
            placeholder="Sua senha (mínimo 6 caracteres)"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
            placeholder="Confirme sua senha"
            required
          />
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            disabled={loading}
            className="register-button"
          >
            {loading ? 'Registrando...' : 'Registrar'}
          </button>
        </div>
      </form>
      
      <div className="form-links">
        {onLoginClick && (
          <button 
            onClick={onLoginClick}
            className="link-button"
            disabled={loading}
          >
            Já tem uma conta? Entrar
          </button>
        )}
      </div>
    </div>
  );
};

export default RegisterForm; 