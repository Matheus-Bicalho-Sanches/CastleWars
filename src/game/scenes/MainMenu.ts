import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    playButton: GameObjects.Text;
    creditsButton: GameObjects.Text;
    logoTween: Phaser.Tweens.Tween | null;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        // Fundo medieval
        this.background = this.add.image(640, 360, 'background');
        
        // Logo do jogo
        this.logo = this.add.image(640, 200, 'logo').setDepth(100);

        // Título do jogo
        this.title = this.add.text(640, 350, 'Castle Wars', {
            fontFamily: 'Arial Black', 
            fontSize: 64, 
            color: '#f8d186',
            stroke: '#5c2301', 
            strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        // Subtítulo
        this.add.text(640, 420, 'Construa seu império medieval', {
            fontFamily: 'Arial', 
            fontSize: 24, 
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        // Botão Jogar
        this.playButton = this.add.text(640, 500, 'Iniciar Jogo', {
            fontFamily: 'Arial Black', 
            fontSize: 32, 
            color: '#ffffff',
            stroke: '#000000', 
            strokeThickness: 6,
            align: 'center'
        }).setOrigin(0.5)
          .setInteractive({ useHandCursor: true })
          .on('pointerover', () => this.playButton.setStyle({ color: '#f8d186' }))
          .on('pointerout', () => this.playButton.setStyle({ color: '#ffffff' }))
          .on('pointerdown', () => this.changeScene())
          .setDepth(100);

        // Botão Créditos
        this.creditsButton = this.add.text(640, 570, 'Créditos', {
            fontFamily: 'Arial Black', 
            fontSize: 24, 
            color: '#ffffff',
            stroke: '#000000', 
            strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5)
          .setInteractive({ useHandCursor: true })
          .on('pointerover', () => this.creditsButton.setStyle({ color: '#f8d186' }))
          .on('pointerout', () => this.creditsButton.setStyle({ color: '#ffffff' }))
          .setDepth(100);

        // Notifica que a cena está pronta
        EventBus.emit('current-scene-ready', this);
    }
    
    changeScene ()
    {
        if (this.logoTween)
        {
            this.logoTween.stop();
            this.logoTween = null;
        }

        // Inicia a cena do jogo (Game), que depois redirecionará para VillageView
        this.scene.start('Game');
    }

    moveLogo (vueCallback: ({ x, y }: { x: number, y: number }) => void)
    {
        if (this.logoTween)
        {
            if (this.logoTween.isPlaying())
            {
                this.logoTween.pause();
            }
            else
            {
                this.logoTween.play();
            }
        } 
        else
        {
            this.logoTween = this.tweens.add({
                targets: this.logo,
                y: { value: 180, duration: 2000, ease: 'Sine.easeInOut' },
                scale: { value: 1.05, duration: 1500, ease: 'Sine.easeInOut' },
                yoyo: true,
                repeat: -1,
                onUpdate: () => {
                    if (vueCallback)
                    {
                        vueCallback({
                            x: Math.floor(this.logo.x),
                            y: Math.floor(this.logo.y)
                        });
                    }
                }
            });
        }
    }
}
