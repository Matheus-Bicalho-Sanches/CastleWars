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
      exec('git add .', (error) => {
        if (error) {
          console.error(`Erro ao adicionar arquivos: ${error.message}`);
          rl.close();
          return;
        }
        
        console.log('Todos os arquivos foram adicionados.');
        askForCommitMessage();
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
        rl.close();
        return;
      }
      
      console.log('\nCommit realizado com sucesso:');
      console.log(stdout);
      
      // Perguntar se deseja fazer push
      rl.question('Deseja fazer push para o repositório remoto? (s/n): ', (answer) => {
        if (answer.toLowerCase() === 's' || answer.toLowerCase() === 'sim') {
          exec('git push', (error, stdout, stderr) => {
            if (error) {
              console.error(`Erro ao fazer push: ${error.message}`);
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