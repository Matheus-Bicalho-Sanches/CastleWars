import { GameObjects, Scene } from 'phaser';
import { EventBus } from '../../EventBus';

// Tipos de modais de autenticação
export enum AuthModalType {
  NONE = 'none',
  LOGIN = 'login',
  REGISTER = 'register',
  FORGOT_PASSWORD = 'forgot_password'
}

export class LandingPage extends Scene {
    // Elementos da UI
    private background: GameObjects.Image;
    private logo: GameObjects.Image;
    private gameVersion: GameObjects.Text;
    private copyright: GameObjects.Text;
    
    // Botões de interação
    private loginButton: GameObjects.Image;
    private registerButton: GameObjects.Image;
    private guestButton: GameObjects.Image;
    
    // Descrição do jogo
    private gameDescription: GameObjects.Text;
    
    // Controle de modal de autenticação
    private currentAuthModal: AuthModalType = AuthModalType.NONE;
    
    constructor() {
        super('LandingPage');
    }
    
    preload() {
        // Carregamos os recursos específicos da landing page aqui
        // Os outros recursos serão carregados no Preloader.ts
        this.load.image('landing-bg', 'assets/landing-bg.svg');
        this.load.image('game-logo', 'assets/game-logo.svg');
        this.load.image('login-button', 'assets/login-button.svg');
        this.load.image('register-button', 'assets/register-button.svg');
        this.load.image('guest-button', 'assets/guest-button.svg');
    }
    
    create() {
        // Fundo
        this.background = this.add.image(640, 360, 'landing-bg')
            .setDisplaySize(1280, 720);
        
        // Logo do jogo
        this.logo = this.add.image(640, 180, 'game-logo')
            .setDisplaySize(400, 160);
        
        // Versão do jogo
        this.gameVersion = this.add.text(1240, 700, 'Versão Alpha 0.1', {
            fontFamily: 'serif',
            fontSize: '16px',
            color: '#d4af37'
        }).setOrigin(1, 0.5);
        
        // Copyright
        this.copyright = this.add.text(40, 700, '© 2025 Castle Wars - Todos os direitos reservados', {
            fontFamily: 'serif',
            fontSize: '16px',
            color: '#d4af37'
        }).setOrigin(0, 0.5);
        
        // Descrição do jogo
        this.gameDescription = this.add.text(640, 290, 
            'Construa seu império, forme alianças, conquiste territórios\ne torne-se o maior governante de todos os tempos!', {
            fontFamily: 'serif',
            fontSize: '22px',
            color: '#ffffff',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);
        
        // Botões de interação
        this.createButtons();
        
        // Notifica que a cena está pronta
        EventBus.emit('current-scene-ready', this);
    }
    
    private createButtons() {
        // Botão de Login
        this.loginButton = this.add.image(640, 400, 'login-button')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.scaleButtonUp(this.loginButton))
            .on('pointerout', () => this.scaleButtonDown(this.loginButton))
            .on('pointerdown', () => this.onLoginClick());
        
        // Botão de Registro
        this.registerButton = this.add.image(640, 470, 'register-button')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.scaleButtonUp(this.registerButton))
            .on('pointerout', () => this.scaleButtonDown(this.registerButton))
            .on('pointerdown', () => this.onRegisterClick());
        
        // Botão para jogar como convidado
        this.guestButton = this.add.image(640, 550, 'guest-button')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.scaleButtonUp(this.guestButton))
            .on('pointerout', () => this.scaleButtonDown(this.guestButton))
            .on('pointerdown', () => this.onGuestClick());
    }
    
    private scaleButtonUp(button: GameObjects.Image) {
        this.tweens.add({
            targets: button,
            scaleX: 1.05,
            scaleY: 1.05,
            duration: 100
        });
    }
    
    private scaleButtonDown(button: GameObjects.Image) {
        this.tweens.add({
            targets: button,
            scaleX: 1,
            scaleY: 1,
            duration: 100
        });
    }
    
    // Handlers dos botões
    private onLoginClick() {
        console.log('Login clicado');
        
        // Emitir evento para abrir o modal de login no React
        EventBus.emit('open-auth-modal', AuthModalType.LOGIN);
        this.currentAuthModal = AuthModalType.LOGIN;
    }
    
    private onRegisterClick() {
        console.log('Registro clicado');
        
        // Emitir evento para abrir o modal de registro no React
        EventBus.emit('open-auth-modal', AuthModalType.REGISTER);
        this.currentAuthModal = AuthModalType.REGISTER;
    }
    
    private onGuestClick() {
        console.log('Modo convidado selecionado');
        
        // Vai direto para o menu principal
        this.scene.start('MainMenu');
    }
    
    // Método para ser chamado pelo React após um login/registro bem-sucedido
    public onAuthSuccess() {
        // Fechar o modal e ir para o menu principal
        this.currentAuthModal = AuthModalType.NONE;
        this.scene.start('MainMenu');
    }
    
    private showMessage(message: string, callback: () => void) {
        // Cria um painel para a mensagem
        const panel = this.add.rectangle(640, 360, 600, 200, 0x000000, 0.8)
            .setInteractive()
            .on('pointerdown', () => {
                // Removemos os elementos e chamamos o callback
                panel.destroy();
                text.destroy();
                okText.destroy();
                callback();
            });
        
        // Texto da mensagem
        const text = this.add.text(640, 340, message, {
            fontFamily: 'serif',
            fontSize: '20px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
        
        // Texto de "OK"
        const okText = this.add.text(640, 420, 'Clique para continuar', {
            fontFamily: 'serif',
            fontSize: '16px',
            color: '#d4af37'
        }).setOrigin(0.5);
    }
} 