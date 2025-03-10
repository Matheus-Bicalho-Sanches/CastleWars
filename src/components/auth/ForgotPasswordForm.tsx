import React, { useState } from 'react';
import { useAuth } from '../../firebase/AuthContext';

interface ForgotPasswordFormProps {
  onSuccess?: () => void;
  onBackToLogin?: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ 
  onSuccess, 
  onBackToLogin 
}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Por favor, insira seu email.');
      return;
    }

    try {
      setError(null);
      setMessage(null);
      setLoading(true);
      
      const result = await resetPassword(email);
      
      if (result.error) {
        setError(result.error);
      } else {
        setMessage('Foi enviado um email com instruções para redefinir sua senha!');
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      setError('Ocorreu um erro ao enviar o email. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-form">
      <h2>Recuperar Senha</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {message && (
        <div className="success-message">
          {message}
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
            placeholder="Digite seu email"
            required
          />
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            disabled={loading}
            className="reset-button"
          >
            {loading ? 'Enviando...' : 'Enviar email de recuperação'}
          </button>
        </div>
      </form>
      
      <div className="form-links">
        {onBackToLogin && (
          <button 
            onClick={onBackToLogin}
            className="link-button"
            disabled={loading}
          >
            Voltar para o login
          </button>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordForm; 