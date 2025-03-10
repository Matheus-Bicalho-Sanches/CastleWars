import { useRef } from 'react';
import { IRefPhaserGame, PhaserGame } from './game/PhaserGame';

function App() {
    // Referência ao componente do jogo Phaser
    const phaserRef = useRef<IRefPhaserGame | null>(null);

    // Evento emitido pelo componente PhaserGame
    const currentScene = (scene: Phaser.Scene) => {
        console.log('Cena atual:', scene.scene.key);
    }

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
        </div>
    )
}

export default App
