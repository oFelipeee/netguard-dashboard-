# 🔒 NetGuard - Dashboard de Gerenciamento de Rede

Sistema completo de monitoramento e gerenciamento de dispositivos de rede com autenticação segura, tempo real e testes automatizados.

![Status](https://img.shields.io/badge/status-concluído-success)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Prisma](https://img.shields.io/badge/Prisma-5-green)

## 🚀 Funcionalidades

### Autenticação & Segurança
- ✅ Login com NextAuth + JWT
- ✅ Registro de novos usuários
- ✅ Recuperação de senha via email (token único)
- ✅ Senhas criptografadas com bcrypt
- ✅ Proteção de rotas por nível de acesso (Admin/User)
- ✅ Tokens expiram em 1 hora

### Gerenciamento de Dispositivos
- ✅ CRUD completo (Create, Read, Update, Delete)
- ✅ Validação de dados com Zod
- ✅ Tipos: Router, Server, Switch, Access Point
- ✅ Status: Online, Warning, Offline
- ✅ Verificação de IP duplicado

### Gerenciamento de Usuários
- ✅ CRUD completo (apenas administradores)
- ✅ Atribuição de roles (Admin/User)
- ✅ Interface protegida por permissões

### Dashboard em Tempo Real
- ✅ Atualização automática via WebSocket (Socket.io)
- ✅ Métricas de rede atualizadas a cada 5 segundos
- ✅ Indicador visual de conexão
- ✅ Gráficos de tráfego
- ✅ Monitoramento de dispositivos críticos

### Testes Automatizados
- ✅ 25 testes unitários com Vitest
- ✅ Testes de validação de schemas
- ✅ Testes de APIs com mocks
- ✅ Coverage de código

## 🛠️ Tecnologias

### Frontend
- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **Socket.io Client** - Tempo real

### Backend
- **Next.js API Routes** - API REST
- **NextAuth.js** - Autenticação
- **Prisma** - ORM
- **PostgreSQL** - Banco de dados (Supabase)
- **Socket.io** - WebSockets
- **Zod** - Validação de dados
- **Bcrypt** - Criptografia de senhas

### Testes
- **Vitest** - Runner de testes
- **Testing Library** - Testes de componentes

## 📦 Instalação

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Conta no Supabase (gratuito)

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/netguard-dashboard.git
cd netguard-dashboard
```

2. **Instale as Dependências
```bash
npm install
```

3. **Configure as variáveis de ambiente**
Crie um arquivo .env na raiz:
```bash
# Database (Supabase)
DATABASE_URL="postgresql://postgres:[senha]@db.[seu-projeto].supabase.co:5432/postgres"

# Autenticação
AUTH_SECRET="sua-secret-aqui"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="sua-nextauth-secret"
```

4. **Configure o projeto**
```bash
npx prisma generate
npx prisma db push
```

5. **Execute o projeto**
```bash
npm run dev
```

📱 **Screenshots**
Login:
<img width="690" height="875" alt="image" src="https://github.com/user-attachments/assets/a1ebcee3-a5a6-4343-b548-34542ca4beaa" />

Dashboard:
<img width="1906" height="982" alt="image" src="https://github.com/user-attachments/assets/1c967c71-9e70-43a2-b585-ec411411e0a1" />

Dispositivos:
<img width="1920" height="971" alt="image" src="https://github.com/user-attachments/assets/f0415816-d200-4ec5-81d3-98f1628d283b" />

Users:
<img width="1919" height="970" alt="image" src="https://github.com/user-attachments/assets/00685faf-ad12-4196-9f12-0b67a90615fa" />

## 📈 Próximas Funcionalidades (Roadmap)
    2FA (Google Authenticator)
    Upload de arquivos
    Logs de auditoria detalhados
    Exportação de relatórios (PDF/CSV)
    Notificações push
    Modo escuro/claro

## 💻 Desenvolvedor
### Felipe Paulino

## 📄 Licença
Este projeto está sob a licença MIT.
