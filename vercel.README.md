# Deploy no Vercel - Castle Wars

Este documento contém instruções para o deploy do Castle Wars no Vercel.

## Configuração Recomendada

### Framework Preset
- **Framework**: Vite

### Build Settings
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

### Environment Variables
Não há variáveis de ambiente necessárias para o deploy básico.

## Solução de Problemas Comuns

### Erro 404 após o deploy
Se você encontrar erros 404 após o deploy, verifique se:
1. O arquivo `vercel.json` está configurado corretamente com as rotas
2. A build está gerando os arquivos na pasta `dist` corretamente

### Erro de carregamento de assets
Se os assets não estiverem carregando:
1. Verifique os caminhos no arquivo `index.html`
2. Garanta que os caminhos em `src` usam importações relativas

### Problemas com CORS
Os headers CORS necessários já estão configurados no arquivo `vercel.json`.

## Deploy Manual

Para fazer um deploy manual, você pode:

1. Instalar a CLI do Vercel:
   ```
   npm install -g vercel
   ```

2. Fazer login:
   ```
   vercel login
   ```

3. Deploy de produção:
   ```
   vercel --prod
   ```

Ou simplesmente execute o script `deploy.bat` incluído no projeto.

## Deploy Automático

O deploy automático deve ocorrer sempre que houver um push para a branch `main`. Se isso não estiver acontecendo:

1. Verifique a integração GitHub no painel do Vercel
2. Verifique se o repositório está corretamente conectado
3. Verifique se o deploy automático está ativado nas configurações 