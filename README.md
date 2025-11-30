# 🏥 UBS Locator - Teste Técnico Fullstack

> **Aplicação para localização de Unidades Básicas de Saúde (UBS) próximas baseada na localização do usuário**

## 📋 O que é este projeto?

Este é um aplicativo mobile que permite:
- **Cadastrar usuários** com dados pessoais e localização
- **Fazer login** de forma segura com validações
- **Ver lista de 50 UBS reais** de São Paulo ordenadas por proximidade
- **Calcular distância** das UBS até sua localização
- **Gerenciar perfil** - visualizar, editar e excluir conta
- **CRUD completo** de usuários
- **Sair do aplicativo** com segurança

## 🛠️ GUIA COMPLETO DE INSTALAÇÃO (Passo a Passo)

### ⚠️ ANTES DE COMEÇAR

**Você precisa instalar estes programas no seu computador:**

#### 1. Instalar Visual Studio Code
1. Acesse: https://code.visualstudio.com
2. Baixe o **VS Code** para Windows
3. Execute o instalador
4. Instale as extensões recomendadas:
   - C# Dev Kit
   - React Native Tools
   - ES7+ React/Redux/React-Native snippets

#### 2. Instalar .NET 9.0
1. Acesse: https://dotnet.microsoft.com/download
2. Baixe o **.NET 9.0 SDK**
3. Execute o instalador
4. Reinicie o computador

#### 3. Instalar Node.js
1. Acesse: https://nodejs.org
2. Baixe a versão **LTS** (recomendada)
3. Execute o instalador
4. Reinicie o computador

#### 4. Verificar se instalou corretamente
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
   - Nome Completo: Seu nome completo
   - Email: seu@email.com (máximo 50 caracteres)
   - Senha: 123456 (entre 6 e 100 caracteres)
   - CEP: 01234-567
   - Endereço: Rua Exemplo, 123
   - **Latitude: SUA latitude real** (ex: -23.55052)
   - **Longitude: SUA longitude real** (ex: -46.63331)
   
   **💡 IMPORTANTE:** Use suas coordenadas reais para ver as UBS mais próximas de você!
3. **Clique em "Cadastrar"**
4. **Se aparecer "Cadastro realizado com sucesso!", deu certo!**

### 2. Fazendo login:
1. **Digite o email e senha** que você cadastrou
2. **Clique em "Entrar"**
3. **Você verá a lista de UBS próximas**

### 3. Usando o aplicativo:
- Aparecerá uma lista com **50 UBS reais** de São Paulo
- Ordenadas por **distância da sua localização**
- Cada uma mostra: nome, endereço completo e distância em km
- **Clique no ícone de perfil (👤)** no canto superior esquerdo para:
  - Ver seus dados pessoais
  - Editar seu perfil
  - Excluir sua conta
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

1. **Backend (Servidor):** Roda na porta 5000, gerencia usuários e 50 UBS reais
2. **Frontend (App):** Se conecta ao servidor e calcula distâncias
3. **Banco de dados:** SQLite que guarda usuários com suas coordenadas
4. **Algoritmo:** Calcula distância real usando fórmula de Haversine
5. **Localização:** Usa SUA localização para ordenar UBS por proximidade

## 📱 Telas do Aplicativo

1. **🔐 Login** - Email e senha com validações obrigatórias
2. **📝 Cadastro** - Registro completo com localização
3. **🏥 UBS** - Lista de 50 UBS reais ordenadas por distância
4. **👤 Perfil** - Visualizar dados pessoais
5. **✏️ Editar Perfil** - Atualizar informações pessoais

## 🔒 Segurança

- Senhas são criptografadas (ninguém vê sua senha real)
- Sistema de login seguro com tokens JWT
- Dados protegidos contra acesso não autorizado

## 📋 Tecnologias Usadas

**Backend (Servidor):**
- ASP.NET Core 9.0 com Entity Framework
- SQLite para banco de dados
- JWT para autenticação segura
- BCrypt para criptografia de senhas
- Validações com Data Annotations

**Frontend (Aplicativo):**
- React Native com Expo
- Axios para comunicação HTTP
- AsyncStorage para tokens
- Validações de formulário

**Ferramentas de Desenvolvimento:**
- Visual Studio Code
- Expo CLI
- .NET CLI