import { useEffect, useState } from 'react';
import { useAuth } from '../firebase/AuthContext';
import { EventBus } from '../game/EventBus';
import { AuthModalType } from '../game/scenes/landing/LandingPage';
import './HomePage.css';

const HomePage = ({ onStartGame }: { onStartGame: () => void }) => {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  
  // Simular carregamento de recursos ou verificação de autenticação
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Lidar com cliques nos botões
  const handleLogin = () => {
    EventBus.emit('open-auth-modal', AuthModalType.LOGIN);
  };
  
  const handleRegister = () => {
    EventBus.emit('open-auth-modal', AuthModalType.REGISTER);
  };
  
  // Se o usuário já estiver logado, pode iniciar o jogo diretamente
  useEffect(() => {
    if (currentUser && !isLoading) {
      // Se desejar iniciar automaticamente para usuários logados, descomente:
      // onStartGame();
    }
  }, [currentUser, isLoading, onStartGame]);
  
  // Tela de carregamento
  if (isLoading) {
    return (
      <div className="home-loading">
        <div className="logo-container">
          <img src="/assets/game-logo.svg" alt="CastleWars" className="logo-large animated" />
        </div>
        <div className="loading-text">Carregando...</div>
      </div>
    );
  }
  
  return (
    <div className="home-container">
      {/* Botões de topo - só aparecem quando o usuário não está logado */}
      {!currentUser && (
        <div className="top-nav-buttons">
          <button 
            className="btn-nav btn-login-nav" 
            onClick={handleLogin}
          >
            Login
          </button>
          <button 
            className="btn-nav btn-register-nav" 
            onClick={handleRegister}
          >
            Criar conta
          </button>
        </div>
      )}
      
      <div className="home-content">
        <header className="home-header">
          <img src="/assets/game-logo.svg" alt="CastleWars" className="logo-large" />
          <h2 className="tagline">Um jogo de estratégia medieval multiplayer</h2>
        </header>
        
        <section className="home-description">
          <p>
            Construa seu império, treine soldados, forme alianças e conquiste terras em um mundo medieval repleto de estratégia e batalhas. 
            Em CastleWars, cada decisão pode determinar o destino do seu reino.
          </p>
        </section>

        <div className="feature-highlights">
          <div className="feature">
            <h3>Construa</h3>
            <p>Erga castelos, fortificações e construa sua economia</p>
          </div>
          <div className="feature">
            <h3>Conquiste</h3>
            <p>Expanda seu território e derrote seus inimigos</p>
          </div>
          <div className="feature">
            <h3>Domine</h3>
            <p>Torne-se o soberano mais poderoso do reino</p>
          </div>
        </div>
        
        <div className="home-actions">
          {currentUser ? (
            <button 
              className="btn-primary btn-start" 
              onClick={onStartGame}
            >
              Jogar
            </button>
          ) : (
            <>
              <button 
                className="btn-primary btn-login" 
                onClick={handleLogin}
              >
                Entrar
              </button>
              <button 
                className="btn-secondary btn-register" 
                onClick={handleRegister}
              >
                Registrar
              </button>
              <button 
                className="btn-tertiary btn-guest" 
                onClick={onStartGame}
              >
                Jogar como Convidado
              </button>
            </>
          )}
        </div>
      </div>
      
      <footer className="home-footer">
        <p>&copy; 2025 CastleWars - Criado por Matheus Bicalho Sanches</p>
        <p>Versão 0.1.0</p>
      </footer>
    </div>
  );
};

export default HomePage; 