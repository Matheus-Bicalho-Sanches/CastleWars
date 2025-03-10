const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando deploy para o Vercel...');

// Verificar se o arquivo vercel.json existe e tem o conteúdo correto
const vercelConfigPath = path.join(__dirname, 'vercel.json');
const vercelConfig = {
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "routes": [
    { "handle": "filesystem" },
    { "src": "/assets/(.*)", "dest": "/assets/$1" },
    { "src": "/(.*)", "dest": "/index.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Cross-Origin-Embedder-Policy", "value": "require-corp" },
        { "key": "Cross-Origin-Opener-Policy", "value": "same-origin" }
      ]
    }
  ]
};

// Salvar configuração atualizada
fs.writeFileSync(vercelConfigPath, JSON.stringify(vercelConfig, null, 2));
console.log('✅ Arquivo vercel.json atualizado');

// Executar o deploy
try {
  console.log('🔄 Executando deploy no Vercel...');
  
  // Primeiro, faça login se necessário (isso solicitará que você faça login no navegador)
  try {
    execSync('vercel whoami', { stdio: 'ignore' });
    console.log('✅ Já autenticado no Vercel');
  } catch (e) {
    console.log('🔑 Por favor, faça login no Vercel quando solicitado...');
    execSync('vercel login', { stdio: 'inherit' });
  }

  // Executar o deploy (vai abrir um prompt interativo)
  console.log('⚙️ Configurando o deploy...');
  execSync('vercel --prod', { stdio: 'inherit' });
  
  console.log('\n✅ Deploy concluído com sucesso!');
  console.log('Seu site deve estar disponível em alguns minutos.');
} catch (error) {
  console.error('❌ Erro durante o deploy:', error.message);
  console.log('\nDicas de solução:');
  console.log('1. Verifique se você está logado na Vercel');
  console.log('2. Verifique se há erros de build no console');
  console.log('3. Tente fazer o deploy manualmente: vercel --prod');
} 