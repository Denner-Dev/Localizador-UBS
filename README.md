# 🏥 UBS Locator - Teste Técnico Fullstack

> **Aplicação para localização de Unidades Básicas de Saúde (UBS) próximas**

## 📋 O que é este projeto?

Este é um aplicativo mobile que permite:
- **Cadastrar usuários** com nome, email e senha
- **Fazer login** de forma segura
- **Ver lista de UBS** (postos de saúde) próximas
- **Sair do aplicativo** com segurança

## 🛠️ GUIA COMPLETO DE INSTALAÇÃO (Passo a Passo)

### ⚠️ ANTES DE COMEÇAR

**Você precisa instalar estes programas no seu computador:**

#### 1. Instalar .NET 9.0
1. Acesse: https://dotnet.microsoft.com/download
2. Baixe o **.NET 9.0 SDK**
3. Execute o instalador
4. Reinicie o computador

#### 2. Instalar Node.js
1. Acesse: https://nodejs.org
2. Baixe a versão **LTS** (recomendada)
3. Execute o instalador
4. Reinicie o computador

#### 3. Verificar se instalou corretamente
Abra o **Prompt de Comando** (cmd) e digite:
```bash
dotnet --version
node --version
npm --version
```

**Se aparecer números de versão, está tudo certo!**

---

## 🚀 COMO EXECUTAR O PROJETO

### PASSO 1: Baixar o projeto
1. Baixe o projeto do GitHub
2. Extraia para uma pasta (ex: `C:\projeto_fullstack`)

### PASSO 2: Configurar o Backend (Servidor)

1. **Abra o Prompt de Comando**
2. **Navegue até a pasta do backend:**
   ```bash
   cd C:\projeto_fullstack\backend\Api
   ```
   *(Substitua pelo caminho onde você extraiu)*

3. **Instale as dependências:**
   ```bash
   dotnet restore
   ```
   *Aguarde terminar (pode demorar alguns minutos)*

4. **Crie o banco de dados:**
   ```bash
   dotnet ef database update
   ```
   *Isso vai criar um arquivo `app.db`*

5. **Inicie o servidor:**
   ```bash
   dotnet run --urls "http://0.0.0.0:5000"
   ```
   
   **✅ Se aparecer algo como:**
   ```
   Now listening on: http://0.0.0.0:5000
   Application started. Press Ctrl+C to shut down.
   ```
   **O backend está funcionando!**

### PASSO 3: Configurar o Frontend (Aplicativo)

1. **Abra um NOVO Prompt de Comando** (deixe o anterior aberto)
2. **Navegue até a pasta do frontend:**
   ```bash
   cd C:\projeto_fullstack\frontend
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```
   *Aguarde terminar (pode demorar alguns minutos)*

4. **Inicie o aplicativo:**
   ```bash
   npx expo start
   ```
   
   **✅ Se aparecer um QR Code, está funcionando!**

### PASSO 4: Ver o aplicativo funcionando

**Opção 1 - No celular (recomendado):**
1. Baixe o app **Expo Go** na Play Store
2. Abra o Expo Go
3. Escaneie o QR Code que apareceu no computador

**Opção 2 - No computador:**
1. Pressione `w` no terminal onde rodou o `npx expo start`
2. O app abrirá no navegador

---

## 🎯 COMO TESTAR O APLICATIVO

### 1. Primeira vez usando:
1. **Clique em "Não tem conta? Cadastre-se"**
2. **Preencha os dados:**
   - Nome: Seu nome
   - Email: seu@email.com
   - Senha: 123456
   - CEP: 01234-567
   - Endereço: Rua Exemplo, 123
   - Latitude: -23.55052
   - Longitude: -46.63331
3. **Clique em "Cadastrar"**
4. **Se aparecer "Cadastro realizado com sucesso!", deu certo!**

### 2. Fazendo login:
1. **Digite o email e senha** que você cadastrou
2. **Clique em "Entrar"**
3. **Você verá a lista de UBS próximas**

### 3. Vendo as UBS:
- Aparecerá uma lista com 5 postos de saúde
- Cada um mostra: nome, endereço e distância
- Para sair, clique no botão **"Sair"** no canto superior direito

---

## ❌ PROBLEMAS COMUNS E SOLUÇÕES

### "dotnet não é reconhecido"
**Solução:** Instale o .NET 9.0 SDK e reinicie o computador

### "npm não é reconhecido"
**Solução:** Instale o Node.js e reinicie o computador

### "Port 5000 is already in use"
**Solução:** 
1. Feche outros programas
2. Ou use: `dotnet run --urls "http://0.0.0.0:5001"`
3. E mude no arquivo `frontend/src/services/api.js` a porta para 5001

### "Network Error" no app
**Solução:** 
1. Certifique-se que o backend está rodando
2. Verifique se a URL no arquivo `api.js` está correta

### App não abre no celular
**Solução:**
1. Certifique-se que o celular e computador estão na mesma rede WiFi
2. Atualize o app Expo Go
3. Tente a opção web (pressione `w`)

---

## 🏗️ Estrutura do Projeto

```
projeto_fullstack/
├── backend/Api/              # 🔧 Servidor (Backend)
│   ├── Controllers/          # Recebe as requisições
│   ├── Services/            # Lógica do negócio
│   ├── Models/              # Estrutura dos dados
│   ├── Data/                # Banco de dados
│   └── app.db              # Arquivo do banco SQLite
├── frontend/                # 📱 Aplicativo (Frontend)
│   ├── src/screens/         # Telas do app
│   ├── src/services/        # Comunicação com servidor
│   └── App.js              # Arquivo principal
└── README.md               # 📖 Este arquivo
```

## 🌐 Como funciona?

1. **Backend (Servidor):** Roda na porta 5000, gerencia usuários e UBS
2. **Frontend (App):** Se conecta ao servidor para buscar dados
3. **Banco de dados:** Arquivo SQLite que guarda os usuários cadastrados

## 📱 Telas do Aplicativo

1. **🔐 Login** - Digite email e senha para entrar
2. **📝 Cadastro** - Registre-se se não tem conta
3. **🏥 UBS** - Veja lista de postos de saúde próximos

## 🔒 Segurança

- Senhas são criptografadas (ninguém vê sua senha real)
- Sistema de login seguro com tokens JWT
- Dados protegidos contra acesso não autorizado

## 📋 Tecnologias Usadas

**Backend (Servidor):**
- ASP.NET Core 9.0 
- SQLite 
- JWT 

**Frontend (Aplicativo):**
- React Native 
- Expo 
- Axios (Para conectar com servidor)