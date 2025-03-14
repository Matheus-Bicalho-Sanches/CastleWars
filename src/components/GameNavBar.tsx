import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';
import './GameNavBar.css';

const GameNavBar = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  
  const handleBackToHome = () => {
    navigate('/home');
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/home');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };
  
  return (
    <div className="game-navbar">
      <button className="nav-button back-button" onClick={handleBackToHome}>
        Voltar ao Menu
      </button>
      
      {currentUser && (
        <div className="user-info">
          <span className="username">{currentUser.displayName || 'Jogador'}</span>
          <button className="nav-button logout-button" onClick={handleLogout}>
            Sair
          </button>
        </div>
      )}
    </div>
  );
};

export default GameNavBar; 