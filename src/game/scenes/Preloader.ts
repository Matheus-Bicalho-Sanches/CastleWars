import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  Exibimos a imagem de fundo que carregamos na cena Boot
        this.add.image(640, 360, 'background');

        //  Texto de carregamento
        this.add.text(640, 320, 'Carregando...', {
            fontFamily: 'Arial Black',
            fontSize: 24,
            color: '#ffffff'
        }).setOrigin(0.5);

        //  Barra de progresso (contorno)
        this.add.rectangle(640, 360, 468, 32).setStrokeStyle(1, 0xffffff);

        //  Barra de progresso (preenchimento)
        const bar = this.add.rectangle(640-230, 360, 4, 28, 0xffffff);

        //  Atualiza a barra de progresso conforme os assets são carregados
        this.load.on('progress', (progress: number) => {
            //  Atualiza a barra (nossa barra tem 460px, então 100% = 460px)
            bar.width = 4 + (460 * progress);
        });
    }

    preload ()
    {
        //  Carrega os recursos para o jogo
        this.load.setPath('assets');

        // Interface e Elementos Básicos
        this.load.image('castle-icon', 'placeholder/castle.svg');
        this.load.image('soldier-icon', 'placeholder/soldier.svg');
        this.load.image('resource-wood', 'placeholder/wood.svg');
        this.load.image('resource-stone', 'placeholder/stone.svg');
        this.load.image('resource-food', 'placeholder/food.svg');
        this.load.image('resource-gold', 'placeholder/gold.svg');
        
        // Mapa e Terrenos
        this.load.image('terrain-grass', 'placeholder/terrain-grass.svg');
        this.load.image('terrain-water', 'placeholder/terrain-water.svg');
        this.load.image('terrain-mountain', 'placeholder/terrain-mountain.svg');
        this.load.image('terrain-forest', 'placeholder/terrain-forest.svg');
        
        // Construções
        this.load.image('building-townhall', 'placeholder/townhall.svg');
        this.load.image('building-barracks', 'placeholder/barracks.svg');
        this.load.image('building-farm', 'placeholder/farm.svg');
        this.load.image('building-mine', 'placeholder/mine.svg');
        this.load.image('building-sawmill', 'placeholder/sawmill.svg');
        
        // Unidades
        this.load.image('unit-soldier', 'placeholder/unit-soldier.svg');
        this.load.image('unit-archer', 'placeholder/unit-archer.svg');
        this.load.image('unit-cavalry', 'placeholder/unit-cavalry.svg');
        
        // Interface
        this.load.image('ui-button', 'placeholder/ui-button.svg');
        this.load.image('ui-panel', 'placeholder/ui-panel.svg');
        
        // Efeitos e Ícones
        this.load.image('icon-attack', 'placeholder/icon-attack.svg');
        this.load.image('icon-defense', 'placeholder/icon-defense.svg');
        this.load.image('icon-speed', 'placeholder/icon-speed.svg');
    }

    create ()
    {
        // Criar objetos globais ou animações que possam ser usados em outras cenas
        
        // Vamos para a landing page
        this.scene.start('LandingPage');
    }
}
