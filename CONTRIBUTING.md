# Guia de Contribuição :smile:

Bem vindo ao Mia Ajuda!

Adoramos quando novas pessoas contribuem com o projeto. Queremos que a sua contribuição para o Mia Ajuda se torne a mais simples possível. Todas as ajudas ao projeto são bem vindas, seja:

* Reportando _bugs_ encontrados;
* Enviando correção de _bugs_;
* Propondo novas soluções para o projeto, seja: Visual, Arquitetural ou de Negócio;
* Propondo novas funcionalidades;
* Implementado novas funcionalidades previstas em _issues_ nos nossos repositórios.

Caso queira conhecer melhor nosso projeto, acesse o nosso [site](https://miaajuda.netlify.app/), nosso [Instagram](https://www.instagram.com/miaajuda/) ou a nossa [Organização no Github](https://github.com/mia-ajuda).

Para entrar em contato conosco, além de abrir uma _issue_ aqui no Github, você pode nos enviar um email, para: miaajudadev@gmail.com

## Como Iniciar a sua Contribuição ao Mia Ajuda

Muito Obrigado pelo interesse em contribuir para o Projeto. 

Para iniciar a sua jornada, você pode estar contribuindo para o projeto abrindo _issues_ em nosso repositório de documentação [repositório](https://github.com/mia-ajuda/Documentation/issues), seguindo o nosso [template](https://github.com/mia-ajuda/Documentation/tree/master/.github/ISSUE_TEMPLATE). Essas _issues_ podem ser abertas reportando possíveis _bugs_ ou sugerindo novas funcionalidades para o projeto.

Caso você queira contribuir para o código do Mia Ajuda, basta seguir os próximos passos:

* Busque a _issue_ na qual você se identifica, se marque e comente nessa _issue_. Atenção: Certifique-se antes, de que a _issue_ não está sendo resolvida por alguém, antes;
* Faça um _fork_ dos nossos repositórios, se você for um contribuidor externo;
* Crie uma _branch_ a partir da develop, seguindo nossas políticas de _branch_ abaixo;
* Crie um _Pull Request_ com o status _WIP_, no repositório para nos certificarmos que você está trabalhando na sua _issue_;
* Ao gerar _commits_, siga a nossa política de _commits_;
* Ao concluir o desenvolvimento da _issue_, troque o status do seu _Pull Request_ de _WIP_ para _Solve_, seguindo o nosso [template de Pull Request](https://github.com/mia-ajuda/Backend/blob/develop/.github/pull_request_template.md);
* Após um revisor aprovar o seu _Pull Request_, mescle-o com a a _branch_ base, seguindo a política do [_Squash Rebase_](https://docs.github.com/pt/github/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges#squash-and-merge-your-pull-request-commits);

## _Workflow_ de Trabalho

Todo o nosso _workflow_ de trabalho é inteiramente baseado no [_GitFlow_](https://www.atlassian.com/br/git/tutorials/comparing-workflows/gitflow-workflow).

## Politicas de _Branches_

As _branches_ são dividas em camadas de desenvolvimento, baseado do modelo do [_GitFlow_](https://www.atlassian.com/br/git/tutorials/comparing-workflows/gitflow-workflow), sendo a `main` a camada que contém a aplicação em sua versão estável, a `develop` a versão de estado em desenvolvimento. Para a criação de `feature` _branches_ utilize a `develop` como base.

O formato para os nomes das _feature_ _branches_ será composto por: 

US + NUMERO_DA_US + FUNCIONALIDADE.

Exemplo:
```
US13-Creation_of_a_new_screen
```

Para _hotfix branches_, o formato do nome da _branch_ se dará pela seguinte forma:

HOTFIX + NOME_DA_FIX

Exemplo:
```
hotfix_login_bug
```

### Mantendo as _branches_ atualizadas

Mantenha as suas _branches_ atualizadas com a _branch_ base. Utilize o comando _rebase_ para isso.

Exemplo:

```
> git pull --rebase origin develop
```

## Política de _Commits_

Os nossos _commits_ possuem um [_lint_](https://github.com/legend80s/commit-msg-linter#readme), sendo obrigatório seguir esse padrão: 

```
tipo do commit: descrição concisa e em inglês do commit
```

Exemplo:

```
git commit -m "feat: create login button"
```

As nossas regras são:

* _Commits_ devem ser redigidos em idioma inglês;
* Devem seguir as regras do [_lint_](https://github.com/legend80s/commit-msg-linter#readme);
* Devem ser simples e concisos, possuindo títulos curtos;
* Devem iniciar com verbo no infinitivo informando o objetivo.

### _Commits_ em equipes

Caso mais de uma pessoa tenha trabalhado com você no _commit_, utilize do _Co-authored-by_, na descrição do _commit_.

Exemplo:

```
fix: fix contacts modal


Co-authored-by: Link <link.zelda@gmail.com>
```
