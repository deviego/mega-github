# Visualizador de Perfil GitHub

Conforme foi pedido no desafio desenvolvi essa aplicação de maneira rápida e aplicando alguns conceitos importantes na hora do desenvolvimento. priorizando a escalabilidade, performance e a experiência de usuário.

## Funcionalidades

- Pesquisa de usuários do GitHub por nome de usuário fazendo uma única requisição para cada informação e reutilizada em todo o contexto do código.
- Visualização detalhada de informações do perfil incluindo avatar, biografia, localização, empresa, blog e links sociais retornada pela api do github.
- Navegação e filtragem de repositórios e repositórios favoritados do usuário sem fazer uma nova requisição.
- Responsividade para desktop, tablet e dispositivos móveis com a escolha da lib que já vem com suporte a responsividade
- Filtro dinâmico para repositórios (pesquisa, tipo, linguagem)

## Stack Tecnológica

- **Next.js 14**: Para fazer o roteamento e estrutura geral da aplicação de maneira menos verbosa e rápida.
- **TypeScript**: Para tipar os dados retornados pela API e trabalhar melhor na hora de utilizar essas infomações.
- **TanStack Query (React Query)**: Para busca eficiente de dados, cache e gerenciamento de estado configurado para invalidar as informações após um tempo. 
- **Zustand**: Para gerenciamento dos dados retornados pela API sem precisar refazer requisições e buscas desnecessárias.
- **Tailwind CSS**: Para estilização baseada em design responsivo com rapidez e eficiência na hora de codar.
- **Shadcn UI**: Para componentes UI personalizáveis e  que economizam tempo na hora de contruir as páginas 
- **React Hook Form**: Para validação e gerenciamento de formulários principalmente os dados de entrada de formulário.
- **Zod**: Para validação de esquemas, não foi muito utilizado por não ter tantas validações de entrada mas caso tenha necessidade em algum momento.

## Decisões Técnicas
- linguagem: escolhi o NextJS por roteamento e configurações mais rápidas e simples
- Não utilizar o vite: como estou utilizandon no Nextjs decidi criar direto pelo CLI do next, porque com o vite eu teria que criar a aplicação em react e depois configurala para o NextJs levando mais tempo de configuração.
- Estruturação de arquivos: Utilizei o conceito de MVC par organizar melhor a aplicação nos conceitos de buscas e salvamento dessas informações.


### Arquitetura

A aplicação segue uma arquitetura baseada em componentes com clara separação de responsabilidades:

- `components/`: Componentes UI reutilizáveis e com acessibilidade da biblioteca Shadcn
- `context/`: Gerenciamento de estado global usando Zustand que me permitiu armazenar o retorno da API e utilizalo da em diversas partes do meu código somente instânciando
- `lib/`: Funções de API onde utilizei o Axios para instânciar todas as requisições na api do GitHub e utilitários de configuração do Tailwind
- `types/`: Definições de tipos no profile e repos para trabalhar de maneira melhor na hora de apresentar essas informações.
- `app/`: Páginas Next.js e roteamento

### Design Responsivo

A aplicação foi projetada para ser totalmente responsiva com otimizações específicas para:

- Desktop (>= 1024px)
- Tablet (768px - 1023px)
- Mobile (< 768px)

Implementei uma abordagem mobile-first, aprimorando gradualmente a UI para telas maiores usando os breakpoints responsivos do Tailwind.

## Desafios de Implementação

Durante o desenvolvimento, encontrei vários desafios:

1. **Limitação de dados da API do GitHub**: A API do GitHub tem limites de informações necessárias então ela retorna 30 repositórios de cada vez.

2. **Melhoria de alguns pontos no design**: Sem fugir do layout principal implementar algumas melhorias como tela home, posicionamento de alguns componentes.

5. **Integração de Ícone de Status**: não foi possível adcionar o emoji pos a api não retorna e para fazer essa busca seria necessário a implementação na rota graphQL do github.

## Áreas para Melhoria

Com tempo adicional, as seguintes melhorias poderiam ser feitas:

### Desempenho

- Implementar paginação para repositórios para lidar com usuários com grande número de repositórios
- Otimizar o carregamento de imagens com prioridade e placeholder da Image do Next.js
- Adcionar um middleware para esse controle de users

### Funcionalidades

- Adicionar autenticação para aumentar os limites de taxa da API e acessar repositórios privados
- Implementar página de detalhes do repositório com histórico de commits e navegador de código
- Incorporar mais dados do GitHub como organizações, contribuições e gráfico de atividade

### Estrutura de Código

- Refatorar para uma estrutura de pastas mais robusta para maior escala
- Adicionar testes unitários e de integração abrangentes
- Implementar storybook para documentação de componentes


### Melhorias de UX

- Implementar atualizações otimistas de UI para melhor desempenho percebido
- Adicionar funcionalidade de troca de tema (modo claro/escuro)
- Melhorar o tratamento de erros com mensagens de erro mais específicas

## Vídeo explicação do código 

- https://drive.google.com/file/d/1D7dvLXhEE9TRQbKkvwJymKOaIhpJuNjO/view?usp=sharing

## Instruções de Configuração

### Pré-requisitos

- Node.js 18.x ou superior
- npm ou yarn

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seuusuario/github-profile-viewer.git
cd github-profile-viewer
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```
3. Rodar a aplicação

```bash
 npm run dev
 #ou
 yarn dev

```
e acesse na porta 3000
