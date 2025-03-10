import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        // Carrega os recursos mínimos necessários para a tela de carregamento
        // Recursos SVG são leves e rápidos de carregar
        this.load.image('background', 'assets/background.svg');
        this.load.image('logo', 'assets/logo.svg');
    }

    create ()
    {
        // Passa para a cena de carregamento principal
        this.scene.start('Preloader');
    }
}
