// Configuração do Firebase - Autenticação
// Para obter suas próprias configurações do Firebase:
// 1. Acesse https://console.firebase.google.com/
// 2. Crie um novo projeto ou use um existente
// 3. Adicione uma aplicação web (clique no ícone </> na página inicial do projeto)
// 4. Copie os valores do objeto firebaseConfig fornecido
// 5. Substitua os valores abaixo pelos valores correspondentes

// As credenciais são carregadas de variáveis de ambiente para maior segurança
// Caso esteja rodando localmente sem variáveis de ambiente configuradas,
// verifique o arquivo .env na raiz do projeto

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta os serviços do Firebase que vamos usar
export const auth = getAuth(app);
export default app; 