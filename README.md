
# 🚀 CrazystackReact

Bem-vindo ao **CrazystackReact**! Este projeto foi desenvolvido usando **Next.js** com foco em escalabilidade, modularidade e performance. Ele segue os princípios de **Atomic Design** e **Feature Sliced Design** para garantir uma arquitetura limpa e organizada, além de utilizar o **Context API** para gerenciamento de estado. 😎

## ✨ Tecnologias Utilizadas

Aqui estão algumas das principais tecnologias que fazem este projeto brilhar:

- **⚛️ [React](https://reactjs.org/)** - A biblioteca JavaScript para interfaces de usuário.
- **🚀 [Next.js](https://nextjs.org/)** - Framework React com renderização no servidor e geração estática.
- **💅 [Chakra UI](https://chakra-ui.com/)** - Biblioteca de componentes para criar UIs acessíveis e responsivas rapidamente.
- **🌐 [Axios](https://axios-http.com/)** - Cliente HTTP baseado em Promises.
- **🖼️ [Framer Motion](https://www.framer.com/motion/)** - Animações suaves e de alta performance para React.
- **🌍 [i18next](https://www.i18next.com/)** - Biblioteca para internacionalização (i18n) em JavaScript.
- **📅 [date-fns](https://date-fns.org/)** - Biblioteca utilitária para manipulação de datas.
- **⚙️ [Context API](https://reactjs.org/docs/context.html)** - Gerenciamento de estado com a API nativa do React.
- **📑 [Prettier](https://prettier.io/)** - Formatação automática de código.
- **🔍 [ESLint](https://eslint.org/)** - Ferramenta para garantir a qualidade do código.

## 📂 Arquitetura

Este projeto segue duas abordagens de design para a organização de componentes e funcionalidades:

### ⚛️ Atomic Design
Utilizamos o **Atomic Design** para dividir os componentes de interface em cinco níveis de granularidade:
1. **Átomos**: Componentes básicos, como botões e inputs.
2. **Moléculas**: Combinações simples de átomos, como formulários e grupos de campos.
3. **Organismos**: Componentes mais complexos, como cabeçalhos e áreas de conteúdo.
4. **Templates**: Estruturas de layout que organizam organismos.
5. **Páginas**: Instâncias de templates com dados reais.

### 🧩 Feature Sliced Design
No sistema de agendamentos, seguimos o **Feature Sliced Design**, onde as funcionalidades são organizadas em módulos e slices, com foco na escalabilidade do código. Cada slice é responsável por uma feature específica e contém toda a lógica e UI associada.

## 📂 Estrutura de Pastas

Abaixo está a estrutura de diretórios do projeto para ajudar a entender como ele está organizado:

```
src/
├── app/
│   ├── application/
│   │   └── providers/         # Configurações de temas, textos, etc.
│   └── legacy_pages/          # Páginas antigas que funcionam no padrão pages router do next
├── shared/
│   ├── api/                   # Serviços de API.
│   ├── css/                   # Estilos globais.
│   ├── libs/                  # Funções utilitárias.
│   └── ui/                    # Componentes de UI reutilizáveis.
├── slices/                    # Feature Sliced Design para gerenciamento de funcionalidades.
│   ├── appointments/           # Módulo de agendamentos
│   │   ├── entidades/          # Entidades relacionadas a agendamentos
│   │   ├── features/           # Funcionalidades específicas de agendamentos
│   │   ├── processes/          # Processos de negócio de agendamentos
│   │   └── screens/            # Telas relacionadas ao módulo de agendamentos
│   ├── general/                # Módulo geral do sistema
│   │   ├── entidades/          # Entidades compartilhadas
│   │   ├── features/           # Funcionalidades genéricas
│   │   └── screens/            # Telas gerais do sistema
│   └── landing-page/           # Funcionalidades da página inicial
└── widgets/                   # Componentes complexos (Modal, NavBar, etc.).
```

## 🚀 Como Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/gumiranda/CrazyStackReact.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Rode o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse no navegador: `http://localhost:3000`

## 🧪 Rodando os Testes

Para rodar os testes unitários:
```bash
npm run test
```

## 🛠️ Scripts Disponíveis

- **`dev`**: Inicia o servidor de desenvolvimento.
- **`build`**: Gera a build de produção.
- **`test`**: Executa os testes com Jest.
- **`test:watch`**: Executa os testes em modo watch.
- **`lint`**: Verifica o código com ESLint.
- **`format`**: Formata o código com Prettier.

## 📝 Contribuindo

Contribuições são bem-vindas! Se você deseja contribuir com o projeto, siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature: `git checkout -b minha-feature`.
3. Faça commit das suas mudanças: `git commit -m 'Adiciona nova feature'`.
4. Envie para a branch principal: `git push origin minha-feature`.
5. Abra um Pull Request.

## 🧑‍💻 Autor

Este projeto foi desenvolvido por **DevDoido**.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
