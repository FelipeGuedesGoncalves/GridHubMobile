![Imagem de Capa](assets/images/GridHublogo.png)

---
## Sumário
- [Integrantes](#integrantes)
- [Descrição do Projeto](#descrição-do-projeto)
- [Como funciona](#como-funciona)
- [Funcionalidades](#funcionalidades)
- [Comandos para executar o projeto](#comandos-para-executar-o-projeto)

---

# GridHub - Análise de Produtividade para Aplicações Corporativas

## Integrantes:
#### Breno Lemes Santiago RM: 552270
#### Felipe Guedes Gonçalves RM: 550906
#### Luiz Fellipe Soares de Sousa Lucena RM: 551365
#### Nina Rebello Francisco RM: 99509
#### Vitória Maria de Camargo RM: 552344

## Descrição do Projeto
O **GridHub** é uma ferramenta de análise de produtividade desenvolvida para monitorar o uso dos softwares corporativos da Plusoft, proporcionando insights detalhados sobre a eficiência e o engajamento dos funcionários com as funcionalidades disponíveis. A solução visa otimizar o desempenho das equipes, gerando relatórios baseados em interações reais, como cliques, rolagens e períodos de inatividade.

A aplicação oferece uma visão clara sobre como os funcionários estão aproveitando as ferramentas disponibilizadas, ajudando empresas a melhorar seus processos internos e utilizar ao máximo os recursos adquiridos.

## Como funciona
A versão mobile do GridHub funciona como um BaaS (Backend-as-a-Service), utilizando o Firebase Realtime Database como banco de dados. Todos os processos de gerenciamento de usuários — como login, cadastro, edição e exclusão — são realizados com o Firebase Authentication, garantindo uma experiência segura e integrada.

Para aprimorar a experiência dos usuários, a aplicação usa o Async Storage para identificar quem já acessou o app. Caso seja a primeira vez que o usuário esteja acessando o aplicativo no dispositivo, uma mensagem é exibida, sugerindo que ele assista a um tutorial de uso. Esse tutorial é apresentado por meio de um vídeo hospedado no YouTube, integrado ao aplicativo com o React Native YouTube Iframe.

A navegação do aplicativo é organizada com o uso de rotas, configuradas no arquivo App.tsx. A aplicação utiliza a biblioteca Material Top Tab Navigator em conjunto com o Stack Navigator para gerenciar as rotas, oferecendo uma barra de navegação com ícones que permitem fácil acesso às principais seções: Dashboard, Relatório, Tutorial e Perfil.

Dentro do GridHub, o usuário pode visualizar dados por meio de dois formatos: o Dashboard e o Relatório. O Dashboard exibe gráficos diversos que facilitam a análise visual, enquanto o Relatório fornece uma visão detalhada e textual das informações. Ambos os módulos oferecem filtros de período para selecionar "Hoje," "Esta Semana" ou "Este Mês," permitindo ao usuário um acompanhamento flexível e adaptável às suas necessidades.

A aplicação é desenvolvida com Expo, uma plataforma que facilita a construção e execução do aplicativo com o React Native.

## Funcionalidades
- **Monitoramento de processos**: Análise de interações dos usuários em tempo real
- **Integração com API**: Reconhecimento e validação de CNPJ
- **Cadastro de Empresas (usuários)**: Registro de usuários na plataforma GridHub. Idealmente, o usuário será um gestor, de uma equipe que trabalha com sistemas ERP em uma empresa.
- **Login e Autenticação**: Acesso seguro através de e-mail e senha.
- **Dashboard Geral da Equipe**: Visão geral da performance da equipe, funções mais utilizadas, tempo de inatividade, e insights sobre atividades e comportamento.
- **Relatórios textuais da Equipe**: Texto detalhado com análises do time, destacando pontos críticos e recomendações para melhorias.
- **Guia de Como Usar**: Vídeo tutorial com um passo a passo das principais funcionalidades da plataforma.


## Comandos para executar o projeto

- Faça o clone do projeto em sua IDE de preferência

- Baixe as dependências utilizando o comando abaixo:


```bash
npm install
```

- Para executar o projeto com expo execute o comando abaixo:

```bash
npx expo run:android
```