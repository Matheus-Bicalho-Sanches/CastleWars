import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import { AuthModalType } from '../../game/scenes/landing/LandingPage';

// Estilos do modal
import './AuthModal.css';

interface AuthModalProps {
  isOpen: boolean;
  modalType: AuthModalType;
  onClose: () => void;
  onSuccess: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  modalType, 
  onClose, 
  onSuccess 
}) => {
  const [activeForm, setActiveForm] = useState<AuthModalType>(modalType);

  // Atualiza o formulário ativo quando o tipo de modal muda
  useEffect(() => {
    setActiveForm(modalType);
  }, [modalType]);

  if (!isOpen) return null;

  const handleSwitchToLogin = () => {
    setActiveForm(AuthModalType.LOGIN);
  };

  const handleSwitchToRegister = () => {
    setActiveForm(AuthModalType.REGISTER);
  };

  const handleSwitchToForgotPassword = () => {
    setActiveForm(AuthModalType.FORGOT_PASSWORD);
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button 
          className="auth-modal-close" 
          onClick={onClose}
        >
          ×
        </button>

        <div className="auth-modal-content">
          {activeForm === AuthModalType.LOGIN && (
            <LoginForm 
              onSuccess={onSuccess}
              onRegisterClick={handleSwitchToRegister}
              onForgotPasswordClick={handleSwitchToForgotPassword}
            />
          )}

          {activeForm === AuthModalType.REGISTER && (
            <RegisterForm 
              onSuccess={onSuccess}
              onLoginClick={handleSwitchToLogin}
            />
          )}

          {activeForm === AuthModalType.FORGOT_PASSWORD && (
            <ForgotPasswordForm 
              onSuccess={handleSwitchToLogin}
              onBackToLogin={handleSwitchToLogin}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal; 