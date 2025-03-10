import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { Game as MainGame } from './scenes/Game';
import { MainMenu } from './scenes/MainMenu';
import { AUTO, Game, Scale } from 'phaser';
import { Preloader } from './scenes/Preloader';
import { VillageView } from './scenes/village/VillageView';
import { LandingPage } from './scenes/landing/LandingPage';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1280,
    height: 720,
    parent: 'game-container',
    backgroundColor: '#1c2833',
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
    scene: [
        Boot,          // Inicialização básica
        Preloader,     // Carregamento de recursos
        LandingPage,   // Página inicial com login
        MainMenu,      // Menu principal do jogo
        MainGame,      // Controlador do jogo
        VillageView,   // Visualização da aldeia
        GameOver       // Tela de fim de jogo
        // Futuras cenas:
        // - WorldMap (mapa do mundo)
        // - Battle (sistema de batalha)
        // - Research (árvore de tecnologias)
        // - Resources (gerenciamento de recursos)
    ]
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
}

export default StartGame;
