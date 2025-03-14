import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './firebase/AuthContext';
import AuthModal from './components/auth/AuthModal';
import HomePage from './components/HomePage';
import GamePage from './components/GamePage';
import { EventBus } from './game/EventBus';
import { AuthModalType } from './game/scenes/landing/LandingPage';

function App() {
    // Estado do modal de autenticação
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authModalType, setAuthModalType] = useState<AuthModalType>(AuthModalType.NONE);

    // Efeito para ouvir eventos do jogo sobre autenticação
    useEffect(() => {
        // Ouvinte para abrir modal de autenticação
        const handleOpenAuthModal = (modalType: AuthModalType) => {
            setAuthModalType(modalType);
            setIsAuthModalOpen(true);
        };

        // Registrar ouvinte
        EventBus.on('open-auth-modal', handleOpenAuthModal);

        // Limpar ouvinte quando o componente for desmontado
        return () => {
            EventBus.removeListener('open-auth-modal');
        };
    }, []);

    // Fechar o modal de autenticação
    const closeAuthModal = () => {
        setIsAuthModalOpen(false);
    }

    // Ao completar autenticação com sucesso
    const handleAuthSuccess = () => {
        setIsAuthModalOpen(false);
    }

    return (
        <AuthProvider>
            <Router>
                <div id="app">
                    <Routes>
                        {/* Redirecionar a raiz para a página inicial */}
                        <Route path="/" element={<Navigate to="/home" replace />} />
                        
                        {/* Página inicial */}
                        <Route path="/home" element={<HomePage />} />
                        
                        {/* Página do jogo */}
                        <Route path="/game" element={<GamePage />} />
                        
                        {/* Rota de fallback para qualquer caminho não encontrado */}
                        <Route path="*" element={<Navigate to="/home" replace />} />
                    </Routes>
                    
                    <AuthModal 
                        isOpen={isAuthModalOpen}
                        modalType={authModalType}
                        onClose={closeAuthModal}
                        onSuccess={handleAuthSuccess}
                    />
                </div>
            </Router>
        </AuthProvider>
    )
}

export default App
