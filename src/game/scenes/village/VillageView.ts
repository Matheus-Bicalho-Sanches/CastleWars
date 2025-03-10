import { GameObjects, Scene } from 'phaser';
import { EventBus } from '../../EventBus';

type BuildingType = 'townhall' | 'barracks' | 'farm' | 'sawmill' | 'mine';

interface BuildingInfo {
    title: string;
    description: string;
}

export class VillageView extends Scene {
    // Elementos visuais da cena
    background: GameObjects.Image;
    buildings: GameObjects.Image[] = [];
    resourceTexts: GameObjects.Text[] = [];
    
    // Dados do jogador
    playerResources = {
        wood: 100,
        stone: 100,
        food: 100,
        gold: 50
    };
    
    // Constantes para posicionamento
    private readonly RESOURCE_BAR_Y = 40;
    private readonly RESOURCE_SPACING = 150;
    
    // Mapeamento de informações de construções
    private readonly buildingTitles: Record<BuildingType, string> = {
        'townhall': 'Centro da Aldeia',
        'barracks': 'Quartel',
        'farm': 'Fazenda',
        'sawmill': 'Serraria',
        'mine': 'Mina'
    };
    
    private readonly buildingDescriptions: Record<BuildingType, string> = {
        'townhall': 'O centro administrativo da sua aldeia. Melhore-o para desbloquear novas construções.',
        'barracks': 'Treinar unidades de combate para atacar outros jogadores e defender sua aldeia.',
        'farm': 'Produz comida, essencial para manter suas tropas.',
        'sawmill': 'Produz madeira, utilizada para construir e melhorar edifícios.',
        'mine': 'Extrai pedra e ouro, recursos fundamentais para o avanço de sua aldeia.'
    };
    
    constructor() {
        super('VillageView');
    }

    create() {
        // Fundo da aldeia
        this.background = this.add.image(640, 360, 'terrain-grass')
            .setDisplaySize(1280, 720);
        
        // Adiciona edificações iniciais
        this.createInitialBuildings();
        
        // Adiciona a barra de recursos no topo
        this.createResourcesBar();
        
        // Adiciona botões de ação
        this.createActionButtons();
        
        // Notifica que a cena está pronta
        EventBus.emit('current-scene-ready', this);
    }
    
    update() {
        // Atualiza recursos a cada frame
        this.updateResourceDisplay();
    }
    
    private createInitialBuildings() {
        // Prefeitura/Centro da aldeia (principal)
        const townHall = this.add.image(640, 360, 'building-townhall')
            .setDisplaySize(128, 128)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.onBuildingClick('townhall'));
        
        // Quartel
        const barracks = this.add.image(440, 300, 'building-barracks')
            .setDisplaySize(96, 96)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.onBuildingClick('barracks'));
        
        // Fazenda
        const farm = this.add.image(840, 300, 'building-farm')
            .setDisplaySize(96, 96)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.onBuildingClick('farm'));
        
        // Serraria
        const sawmill = this.add.image(500, 500, 'building-sawmill')
            .setDisplaySize(96, 96)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.onBuildingClick('sawmill'));
            
        // Mina
        const mine = this.add.image(780, 500, 'building-mine')
            .setDisplaySize(96, 96)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.onBuildingClick('mine'));
        
        // Adiciona ao array de construções
        this.buildings.push(townHall, barracks, farm, sawmill, mine);
        
        // Adiciona rótulos abaixo das construções
        this.addBuildingLabels();
    }
    
    private addBuildingLabels() {
        const buildingNames = ['Centro da Aldeia', 'Quartel', 'Fazenda', 'Serraria', 'Mina'];
        const buildingPositions = [
            { x: 640, y: 430 },
            { x: 440, y: 350 },
            { x: 840, y: 350 },
            { x: 500, y: 550 },
            { x: 780, y: 550 }
        ];
        
        for (let i = 0; i < buildingNames.length; i++) {
            this.add.text(buildingPositions[i].x, buildingPositions[i].y, buildingNames[i], {
                fontSize: '16px',
                color: '#ffffff',
                backgroundColor: '#00000080',
                padding: { x: 5, y: 2 }
            }).setOrigin(0.5);
        }
    }
    
    private createResourcesBar() {
        // Fundo da barra de recursos
        this.add.rectangle(640, this.RESOURCE_BAR_Y, 1200, 60, 0x000000, 0.7);
        
        // Ícones e textos de recursos
        const resources = [
            { key: 'wood', icon: 'resource-wood', text: 'Madeira' },
            { key: 'stone', icon: 'resource-stone', text: 'Pedra' },
            { key: 'food', icon: 'resource-food', text: 'Comida' },
            { key: 'gold', icon: 'resource-gold', text: 'Ouro' }
        ];
        
        for (let i = 0; i < resources.length; i++) {
            const x = 200 + (i * this.RESOURCE_SPACING);
            
            // Ícone do recurso
            this.add.image(x, this.RESOURCE_BAR_Y, resources[i].icon)
                .setDisplaySize(40, 40);
            
            // Nome do recurso
            this.add.text(x + 30, this.RESOURCE_BAR_Y - 10, resources[i].text, {
                fontSize: '14px',
                color: '#ffffff'
            }).setOrigin(0, 0.5);
            
            // Valor do recurso
            const valueText = this.add.text(x + 30, this.RESOURCE_BAR_Y + 10, '0', {
                fontSize: '18px',
                color: '#ffffff',
                fontStyle: 'bold'
            }).setOrigin(0, 0.5);
            
            this.resourceTexts.push(valueText);
        }
    }
    
    private createActionButtons() {
        // Botão para mapa do mundo
        const worldMapBtn = this.add.rectangle(1200, 100, 140, 40, 0x4682B4)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.openWorldMap())
            .on('pointerover', () => worldMapBtn.setFillStyle(0x5692C4))
            .on('pointerout', () => worldMapBtn.setFillStyle(0x4682B4));
            
        this.add.text(1200, 100, 'Mapa Mundial', {
            fontSize: '14px',
            color: '#ffffff'
        }).setOrigin(0.5);
        
        // Botão para tropas
        const troopsBtn = this.add.rectangle(1200, 150, 140, 40, 0x4682B4)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.openTroopsMenu())
            .on('pointerover', () => troopsBtn.setFillStyle(0x5692C4))
            .on('pointerout', () => troopsBtn.setFillStyle(0x4682B4));
            
        this.add.text(1200, 150, 'Tropas', {
            fontSize: '14px',
            color: '#ffffff'
        }).setOrigin(0.5);
        
        // Botão para pesquisas
        const researchBtn = this.add.rectangle(1200, 200, 140, 40, 0x4682B4)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.openResearchMenu())
            .on('pointerover', () => researchBtn.setFillStyle(0x5692C4))
            .on('pointerout', () => researchBtn.setFillStyle(0x4682B4));
            
        this.add.text(1200, 200, 'Pesquisas', {
            fontSize: '14px',
            color: '#ffffff'
        }).setOrigin(0.5);
    }
    
    private updateResourceDisplay() {
        // Atualiza os valores dos recursos na interface
        this.resourceTexts[0].setText(this.playerResources.wood.toString());
        this.resourceTexts[1].setText(this.playerResources.stone.toString());
        this.resourceTexts[2].setText(this.playerResources.food.toString());
        this.resourceTexts[3].setText(this.playerResources.gold.toString());
    }
    
    // Eventos de clique nas construções
    private onBuildingClick(buildingType: string) {
        console.log(`Clicou na construção: ${buildingType}`);
        
        // Exibe um painel com informações da construção
        this.showBuildingInfoPanel(buildingType as BuildingType);
    }
    
    private showBuildingInfoPanel(buildingType: BuildingType) {
        // Implementação básica do painel de informações
        const panel = this.add.rectangle(640, 360, 400, 300, 0x000000, 0.8);
        
        // Título do painel
        const title = this.add.text(640, 250, this.getBuildingTitle(buildingType), {
            fontSize: '24px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // Descrição
        const description = this.add.text(640, 300, this.getBuildingDescription(buildingType), {
            fontSize: '16px',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 350 }
        }).setOrigin(0.5);
        
        // Botão de fechar
        const closeBtn = this.add.rectangle(800, 250, 30, 30, 0xff0000)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                panel.destroy();
                title.destroy();
                description.destroy();
                closeBtn.destroy();
                closeText.destroy();
                
                if (upgradeBtn) {
                    upgradeBtn.destroy();
                    upgradeBtnText.destroy();
                }
            });
            
        const closeText = this.add.text(800, 250, 'X', {
            fontSize: '16px',
            color: '#ffffff'
        }).setOrigin(0.5);
        
        // Botão de upgrade (se aplicável)
        let upgradeBtn: Phaser.GameObjects.Rectangle | undefined;
        let upgradeBtnText: Phaser.GameObjects.Text | undefined;
        
        if (['townhall', 'barracks', 'farm', 'sawmill', 'mine'].includes(buildingType)) {
            upgradeBtn = this.add.rectangle(640, 400, 200, 40, 0x4682B4)
                .setInteractive({ useHandCursor: true })
                .on('pointerover', () => upgradeBtn?.setFillStyle(0x5692C4))
                .on('pointerout', () => upgradeBtn?.setFillStyle(0x4682B4));
                
            upgradeBtnText = this.add.text(640, 400, 'Melhorar', {
                fontSize: '18px',
                color: '#ffffff'
            }).setOrigin(0.5);
        }
    }
    
    private getBuildingTitle(buildingType: BuildingType): string {
        return this.buildingTitles[buildingType] || 'Construção';
    }
    
    private getBuildingDescription(buildingType: BuildingType): string {
        return this.buildingDescriptions[buildingType] || 'Sem descrição disponível.';
    }
    
    // Métodos de navegação
    private openWorldMap() {
        console.log('Abrindo o mapa do mundo');
        // Futuramente: this.scene.start('WorldMap');
    }
    
    private openTroopsMenu() {
        console.log('Abrindo o menu de tropas');
        // Futuramente: this.scene.start('TroopsMenu');
    }
    
    private openResearchMenu() {
        console.log('Abrindo o menu de pesquisas');
        // Futuramente: this.scene.start('ResearchMenu');
    }
} 