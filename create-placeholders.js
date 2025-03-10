// Script para criar imagens placeholder para os recursos do jogo
const fs = require('fs');
const path = require('path');

const placeholderDir = path.join(__dirname, 'public', 'assets', 'placeholder');

// Lista de recursos a serem criados
const resources = [
  { name: 'castle', color: '#8B4513' },
  { name: 'soldier', color: '#A9A9A9' },
  { name: 'wood', color: '#8B5A2B' },
  { name: 'stone', color: '#A9A9A9' },
  { name: 'food', color: '#FFD700' },
  { name: 'gold', color: '#FFD700' },
  
  { name: 'terrain-grass', color: '#228B22' },
  { name: 'terrain-water', color: '#1E90FF' },
  { name: 'terrain-mountain', color: '#696969' },
  { name: 'terrain-forest', color: '#006400' },
  
  { name: 'townhall', color: '#B8860B' },
  { name: 'barracks', color: '#8B0000' },
  { name: 'farm', color: '#DAA520' },
  { name: 'mine', color: '#708090' },
  { name: 'sawmill', color: '#8B4513' },
  
  { name: 'unit-soldier', color: '#708090' },
  { name: 'unit-archer', color: '#2F4F4F' },
  { name: 'unit-cavalry', color: '#A0522D' },
  
  { name: 'ui-button', color: '#4682B4' },
  { name: 'ui-panel', color: '#2F4F4F' },
  
  { name: 'icon-attack', color: '#FF0000' },
  { name: 'icon-defense', color: '#4169E1' },
  { name: 'icon-speed', color: '#32CD32' },
];

// Função para criar um arquivo SVG simples com uma cor
function createSVG(name, color) {
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="${color}" />
  <text x="32" y="32" font-family="Arial" font-size="8" fill="white" text-anchor="middle" alignment-baseline="middle">${name}</text>
</svg>`;
  
  const filePath = path.join(placeholderDir, `${name}.svg`);
  fs.writeFileSync(filePath, svgContent);
  console.log(`Criado: ${filePath}`);
}

// Verifica se o diretório existe, caso contrário, cria
if (!fs.existsSync(placeholderDir)) {
  fs.mkdirSync(placeholderDir, { recursive: true });
}

// Cria os arquivos SVG
resources.forEach(resource => {
  createSVG(resource.name, resource.color);
});

console.log('Todos os placeholders foram criados!');

// Cria um arquivo background
const backgroundSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <rect width="1280" height="720" fill="#1c2833" />
  <text x="640" y="360" font-family="Arial" font-size="48" fill="#ffffff" text-anchor="middle" alignment-baseline="middle">Castle Wars Game</text>
</svg>`;

fs.writeFileSync(path.join(__dirname, 'public', 'assets', 'background.svg'), backgroundSVG);
console.log('Background criado!');

// Cria um arquivo logo
const logoSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <rect width="200" height="200" fill="#8B4513" rx="20" ry="20" />
  <text x="100" y="100" font-family="Arial" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle" alignment-baseline="middle">Castle Wars</text>
</svg>`;

fs.writeFileSync(path.join(__dirname, 'public', 'assets', 'logo.svg'), logoSVG);
console.log('Logo criado!');

console.log('Concluído!'); 