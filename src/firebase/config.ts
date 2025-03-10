// Configuração do Firebase - Autenticação
// Substitua os valores abaixo pelas suas próprias configurações do Firebase
// Encontradas no console do Firebase: Configurações do Projeto > Geral > Seus aplicativos > SDK de configuração
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta os serviços do Firebase que vamos usar
export const auth = getAuth(app);
export default app; 