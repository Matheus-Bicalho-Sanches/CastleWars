# Castle Wars

Um jogo de estratégia medieval multiplayer inspirado em Tribal Wars, desenvolvido com Phaser 3 e React.

## Sobre o Jogo

Castle Wars é um jogo de estratégia em tempo real onde os jogadores constroem e gerenciam suas próprias aldeias medievais, formam alianças, desenvolvem tecnologias e conquistam territórios inimigos. Cada jogador começa com uma pequena aldeia e, através de gestão inteligente de recursos e estratégia militar, expande seu império.

### Características Principais

- **Construção e gerenciamento de aldeias**: Construa e melhore edifícios como centro da aldeia, quartéis, fazendas, minas e serrarias
- **Gerenciamento de recursos**: Colete e administre recursos como madeira, pedra, comida e ouro
- **Treinamento militar**: Forme exércitos de infantaria, arqueiros e cavalaria para atacar outros jogadores ou defender sua aldeia
- **Pesquisa de tecnologias**: Desenvolva novas tecnologias para melhorar construções, unidades militares e produção de recursos
- **Sistema de alianças**: Forme alianças com outros jogadores para proteção mútua e conquista de territórios
- **Mapa do mundo**: Explore e interaja com um vasto mapa mundial compartilhado entre todos os jogadores

## Tecnologias Utilizadas

- **Frontend**: React.js, TypeScript
- **Engine de Jogo**: Phaser 3
- **Build Tool**: Vite

## Instalação e Execução

Para executar este projeto localmente:

1. Clone o repositório:
   ```
   git clone https://github.com/seu-usuario/castlewars.git
   cd castlewars
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```

4. Abra o navegador em `http://localhost:8080`

## Estrutura do Projeto

- `src/` - Código fonte do jogo
  - `game/` - Componentes do jogo Phaser
    - `scenes/` - Cenas do jogo (landing page, menu, aldeia, etc.)
  - `components/` - Componentes React
  - `assets/` - Recursos como imagens, sons, etc.

## Status do Desenvolvimento

Este projeto está em fase inicial de desenvolvimento (Alpha 0.1). Muitas funcionalidades ainda estão sendo implementadas.

### Roadmap

- [x] Menu principal e interface básica do jogo
- [x] Visualização da aldeia
- [ ] Sistema de login e autenticação
- [ ] Sistema de construção e upgrades
- [ ] Gerenciamento de recursos
- [ ] Mapa do mundo
- [ ] Sistema de combate
- [ ] Sistema de alianças

## Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

## Contato

Para mais informações ou sugestões, entre em contato através de [seu-email@exemplo.com].
