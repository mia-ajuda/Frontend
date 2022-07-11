<p align="center">
  <img src="https://i.imgur.com/5wtqEys.png" alt="Logo Mia Ajuda" width="50%"/>
</p>

<p align="center">
<a href="https://miaajuda.netlify.app/" target="_blank"><img src="https://img.shields.io/badge/Mia%20Ajuda-Website-blue"></a>
<a href="https://mia-ajuda.github.io/Documentation/#/" target="_blank"><img src="https://img.shields.io/badge/Mia%20Ajuda-Docs-purple"></a>
<a href="https://github.com/mia-ajuda/Frontend/pulls" target="_blank"><img src="https://img.shields.io/github/issues-pr/mia-ajuda/Frontend?color=red&label=Pull%20Requests"></a>
</p>

<p align="center">
  <a href="https://play.google.com/store/apps/details?id=com.unb.miaajuda" style="align-self: center"><img src="https://play.google.com/intl/pt-BR/badges/static/images/badges/pt-br_badge_web_generic.png" width="150" height="60" title="Google Play"></a>
</p>



É um projeto criado e desenvolvido por professores e estudantes da Faculdade do Gama (FGA), da Universidade de Brasília, com o intuito de contribuir com a sociedade em um momento de necessidade que estamos vivendo em relação à CoVid-19. O aplicativo tem o propósito de ser uma ferramenta de incentivo a ações sociais de ajuda e colaboração entre pessoas de comunidades e vizinhanças. O Mia Ajuda serve como um meio de ligação entre pessoas necessitadas e voluntários que possam ajudar, seja de forma imaterial (entretenimento, companhia, amparo psicológico), como de forma material (comida, objetos, itens de higiene pessoal).

# Ambiente

Para desenvolver nesse projeto, é necessário a instalação do expo, que pode ser seguida por esse link:
https://docs.expo.io/versions/latest/get-started/installation/

É necessário, também,  a instalação do expo em seu smartphone, ou um emulador configurado.

# Executar o projeto no celular
## Configurações necessárias
### Firebase
Parar rodar o projeto é necessário criar um projeto no [firebase](https://console.firebase.google.com/u/0/?hl=pt-br), não sendo necessário ativar o analytics, após criar o projeto você deve ir em adicionar um app (Imagem 1) e selecionar a opção android(o robôzinho), feito isso na tela que abrirá em seguida no campo "Nome do pacote Android" você deve digitar: br.com.miaajuda, e após isso clicar em "Registrar app" você deve fazer o download do arquivo *google-services.json* e colocar na pasta "src/"

Além disso você deve criar um outro app dentro do projeto, porém dessa vez um app web, você pode usar o *Apelido* do app como MiaAjuda, após preencher basta  clicar em Registrar o app, após isso será mostrado várias informações para você, você deve pegar as informações mostradas que estão dentro da variável *firebaseConfig* e, seguindo o exemplo do arquivo *app/src/config/authmiaajuda-firebase-example.json* criar os arquivos *authmiaajuda-firebase-dev* e *authmiaajuda-firebase.json*, preenchendo os dados a partir dos dados mostrados no firebase.

### Variáveis de ambiente
Dentro da pasta app, existe um arquivo chamado *.env-example*, você deve criar um arquivo chamado *.env* a partir dele, na mesma pasta, e precisa apenas adicionar seu IPV4 no campo *IP_ADDRESS*, os outros campos não precisam ser preenchidos/alterados.


### Rodar o projeto
Após ter configurado o ambiente basta rodar os seguintes comandos para rodar o aplicativo

```
yarn install
yarn start
```

Após a inicialização, se bem sucedida, aparecerá o qrcode de conexão. Certifique-se de estar na mesma rede de seu computador, abra o app no seu smartphone e leia o qrcode;

Alternativamente, pode-se executar o projeto usando Docker:

### docker-compose up

Após a inicialização, pode-se seguir as instruções acima.

# Executar o projeto no emulador

Dentro da pasta /app e execute o comando:
### yarn start

Após a inicialização, se bem sucedida, aparecerá o qrcode de conexão. Abra o seu emulador e, no terminal onde está o qrcode, pressione o teclado 'a'. O app deve começar a carregar dentro do emulador a partir desse momento.
