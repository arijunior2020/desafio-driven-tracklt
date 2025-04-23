# 📊 TrackIt

![Project Status](https://img.shields.io/badge/status-em%20desenvolvimento-blue)
![Vite](https://img.shields.io/badge/Vite-%23646CFF?style=flat&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC?style=flat&logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

Gerenciador de hábitos diário construído em **React + TypeScript**, focado em ajudar os usuários a monitorar e consolidar suas rotinas diárias de forma prática, visual e responsiva.

---

## 📚 Sobre o Projeto

Este projeto foi desenvolvido como **entrega obrigatória** do **Desafio do Módulo 11** da plataforma **Driven Educação**, no curso **Full Stack Developer**.

> **Módulo 11 – Gerenciando estado em aplicações complexas**  
> **Prazo de entrega:** 28/04 às 23:59  
> **Objetivo:** Criar uma aplicação React capaz de gerenciar autenticação, estado global e interações com API externa.

---

## ✅ Funcionalidades

- 🔐 Login e persistência da sessão com JWT
- 🆕 Cadastro de novos hábitos
- 📆 Visualização de hábitos diários
- ✅ Marcação de hábitos como concluídos
- 📈 Cálculo do progresso diário
- 🎯 Interface mobile-first com feedback visual
- 🚪 Logout com segurança

---

## 🛠️ Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Styled-components](https://styled-components.com/)
- [Axios](https://axios-http.com/)
- [React Router DOM](https://reactrouter.com/)
- [Day.js](https://day.js.org/)
- [React Loader Spinner](https://mhnpd.github.io/react-loader-spinner/)

---

## 🚀 Como rodar a aplicação localmente

### 🔧 1. Clone o repositório

```bash
git clone https://github.com/arijunior2020/desafio-driven-tracklt.git
cd trackit
```

### 🔧 2. Instale as dependências

```bash
npm install
```

### 🔧 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto e adicione a variável `VITE_API_URL` com o valor da URL da API que você deseja usar.

```bash
VITE_API_URL=https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit
```

### 🔧 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

### 🔧 5. Acesse a aplicação

Abra o navegador e acesse `http://localhost:5173` para visualizar a aplicação em execução.

### 🧠 6. Aprendizado

Neste módulo, consolidei conhecimentos em:

- Context API com múltiplos estados globais
- Manipulação de formulários e requisições assíncronas
- Gerenciamento de loading e UX com feedback visual
- Organização de estado em projetos React complexos
- Integração com APIs REST e controle de autenticação via token

### 🚀 7. Deploy

A aplicação está hospedada no Vercel e pode ser acessada através do seguinte link:
[TrackIt](https://desafio-driven-tracklt.vercel.app/)

### 👨‍💻 8. Autor

Desenvolvido por Arimatéia Júnior
🔗 linkedin.com/in/arimateiajunior

## 📝 9. Licença

Este projeto é de uso educacional como parte do curso Driven Full Stack Developer.

**OBS**: Foi necessário substituir o componente react-loader-spinner por outro modelo de spinner devido à incompatibilidade com a versão 19 do React utilizada no projeto. O pacote apresentava erros de dependência durante o deploy na Vercel. O spinner adotado foi o react-spinners, que é leve, compatível com React 19 e oferece diversos loaders visuais com fácil customização. [react-spinners](https://www.npmjs.com/package/react-spinners)
