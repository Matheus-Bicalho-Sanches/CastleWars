import { useRef, useState, useEffect } from 'react';
import { IRefPhaserGame, PhaserGame } from './game/PhaserGame';
import { AuthProvider } from './firebase/AuthContext';
import AuthModal from './components/auth/AuthModal';
import HomePage from './components/HomePage';
import { EventBus } from './game/EventBus';
import { AuthModalType } from './game/scenes/landing/LandingPage';

function App() {
    // Referência ao componente do jogo Phaser
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    
    // Estado para controlar qual tela mostrar
    const [showGame, setShowGame] = useState(false);
    
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

    // Evento emitido pelo componente PhaserGame
    const currentScene = (scene: Phaser.Scene) => {
        console.log('Cena atual:', scene.scene.key);
    }

    // Fechar o modal de autenticação
    const closeAuthModal = () => {
        setIsAuthModalOpen(false);
    }

    // Ao completar autenticação com sucesso
    const handleAuthSuccess = () => {
        setIsAuthModalOpen(false);
        
        // Notifica o jogo que a autenticação foi bem-sucedida
        if (phaserRef.current && phaserRef.current.scene) {
            const scene = phaserRef.current.scene;
            if (scene.scene.key === 'LandingPage') {
                // Se estiver na cena LandingPage, chame o método onAuthSuccess
                (scene as any).onAuthSuccess();
            }
        }
    }
    
    // Iniciar o jogo a partir da HomePage
    const handleStartGame = () => {
        setShowGame(true);
    }

    return (
        <AuthProvider>
            <div id="app" className={showGame ? 'game-active' : ''}>
                {showGame ? (
                    <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
                ) : (
                    <HomePage onStartGame={handleStartGame} />
                )}
                
                <AuthModal 
                    isOpen={isAuthModalOpen}
                    modalType={authModalType}
                    onClose={closeAuthModal}
                    onSuccess={handleAuthSuccess}
                />
            </div>
        </AuthProvider>
    )
}

export default App
