import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        this.gameText = this.add.text(512, 384, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        // Inicializa a cena com um fundo temporário
        this.add.image(640, 360, 'terrain-grass')
            .setDisplaySize(1280, 720);
            
        // Texto de inicialização do jogo
        const text = this.add.text(640, 360, 'Inicializando o mundo...', {
            fontFamily: 'Arial Black',
            fontSize: 32, 
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6,
            align: 'center'
        }).setOrigin(0.5);
        
        // Simula um pequeno carregamento antes de ir para a aldeia
        this.time.delayedCall(1500, () => {
            // Vai para a visualização da aldeia
            this.scene.start('VillageView');
        });
        
        // Notifica que a cena está pronta
        EventBus.emit('current-scene-ready', this);
    }

    changeScene ()
    {
        this.scene.start('GameOver');
    }
}
