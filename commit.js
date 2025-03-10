const { exec } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('=== 🏰 Castle Wars - Git Commit Helper 🏰 ===');
console.log('Este script ajudará você a fazer commit e push das suas alterações.');
console.log('----------------------------------------');

// Verificar o status do Git
exec('git status', (error, stdout, stderr) => {
  if (error) {
    console.error(`Erro ao verificar status do Git: ${error.message}`);
    rl.close();
    return;
  }
  
  console.log('\nStatus do Git:');
  console.log(stdout);
  
  // Perguntar se deseja adicionar todos os arquivos
  rl.question('Deseja adicionar todos os arquivos modificados? (s/n): ', (answer) => {
    if (answer.toLowerCase() === 's' || answer.toLowerCase() === 'sim') {
      console.log('\nAdicionando arquivos (exceto node_modules e arquivos grandes)...');
      
      // Primeiro, atualiza o .gitignore se necessário
      ensureGitIgnore(() => {
        // Usamos uma sequência de comandos para evitar adicionar node_modules
        exec('git add .gitignore README.md index.html package.json vercel.json vite.config.js commit.js commit.bat .editorconfig .eslintrc.cjs LICENSE create-placeholders.js log.js src/ public/', (error) => {
          if (error) {
            console.error(`Erro ao adicionar arquivos: ${error.message}`);
            rl.close();
            return;
          }
          
          console.log('Arquivos selecionados foram adicionados (exceto node_modules e arquivos muito grandes).');
          askForCommitMessage();
        });
      });
    } else {
      console.log('\nVocê optou por não adicionar todos os arquivos automaticamente.');
      console.log('Por favor, use "git add <arquivo>" manualmente antes de continuar.');
      
      // Perguntar se deseja continuar mesmo sem adicionar arquivos
      rl.question('Deseja continuar mesmo assim? (s/n): ', (answer) => {
        if (answer.toLowerCase() === 's' || answer.toLowerCase() === 'sim') {
          askForCommitMessage();
        } else {
          console.log('Operação cancelada. Você pode adicionar arquivos manualmente e executar este script novamente.');
          rl.close();
        }
      });
    }
  });
});

// Função para garantir que node_modules esteja no .gitignore
function ensureGitIgnore(callback) {
  const fs = require('fs');
  const path = require('path');
  
  const gitignorePath = path.join(__dirname, '.gitignore');
  
  // Verifica se o arquivo .gitignore existe
  if (fs.existsSync(gitignorePath)) {
    let content = fs.readFileSync(gitignorePath, 'utf8');
    
    // Lista de entradas que devem estar no .gitignore
    const requiredEntries = [
      'node_modules/',
      '/node_modules',
      '/dist',
      '/.env',
      '/.env.local'
    ];
    
    let updated = false;
    
    // Adiciona as entradas que não existem
    for (const entry of requiredEntries) {
      if (!content.includes(entry)) {
        content += `\n${entry}`;
        updated = true;
      }
    }
    
    // Atualiza o arquivo se necessário
    if (updated) {
      fs.writeFileSync(gitignorePath, content);
      console.log('Arquivo .gitignore atualizado com entradas necessárias.');
    }
  } else {
    // Cria um arquivo .gitignore básico se não existir
    const basicContent = 
`# Dependências
node_modules/
/node_modules

# Produção
/dist
/build

# Ambiente
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
*.log`;
    
    fs.writeFileSync(gitignorePath, basicContent);
    console.log('Arquivo .gitignore criado com configurações básicas.');
  }
  
  callback();
}

function askForCommitMessage() {
  rl.question('\nDigite a mensagem do commit: ', (commitMessage) => {
    if (!commitMessage.trim()) {
      console.log('A mensagem de commit não pode estar vazia. Tente novamente.');
      askForCommitMessage();
      return;
    }
    
    // Executar commit
    exec(`git commit -m "${commitMessage}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao fazer commit: ${error.message}`);
        if (stderr) console.error(stderr);
        rl.close();
        return;
      }
      
      console.log('\nCommit realizado com sucesso:');
      console.log(stdout);
      
      // Perguntar se deseja fazer push
      rl.question('Deseja fazer push para o repositório remoto? (s/n): ', (answer) => {
        if (answer.toLowerCase() === 's' || answer.toLowerCase() === 'sim') {
          console.log('\nFazendo push para o repositório remoto...');
          exec('git push', (error, stdout, stderr) => {
            if (error) {
              console.error(`Erro ao fazer push: ${error.message}`);
              if (stderr) console.error(stderr);
              rl.close();
              return;
            }
            
            console.log('\nPush realizado com sucesso:');
            console.log(stdout || 'Arquivos enviados para o repositório remoto.');
            console.log('\n✅ Operação concluída com sucesso!');
            rl.close();
          });
        } else {
          console.log('\nPush não realizado. Você pode fazer push manualmente com "git push" quando desejar.');
          console.log('\n✅ Commit concluído com sucesso!');
          rl.close();
        }
      });
    });
  });
} 