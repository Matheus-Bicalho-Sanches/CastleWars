import { useRef } from 'react';
import { IRefPhaserGame, PhaserGame } from '../game/PhaserGame';
import GameNavBar from './GameNavBar';
import './GamePage.css';

const GamePage = () => {
  // Referência ao componente do jogo Phaser
  const phaserRef = useRef<IRefPhaserGame | null>(null);
  
  // Evento emitido pelo componente PhaserGame
  const currentScene = (scene: Phaser.Scene) => {
    console.log('Cena atual:', scene.scene.key);
  };
  
  return (
    <div className="game-page">
      <GameNavBar />
      <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
    </div>
  );
};

export default GamePage; 