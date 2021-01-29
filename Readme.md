![alt text](https://www.filepicker.io/api/file/57XgNv1URwmpHlaM1HqR)

# Teste Técnico LinkApi! :)


### Redes Sociais
[![Github Badge](https://img.shields.io/badge/-Github-000?style=flat-square&logo=Github&logoColor=white&link=https://github.com/leomauricio7)](https://github.com/leomauricio7)
[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/leomauriico7/)](https://www.linkedin.com/in/leomauriico7/)

### Descrição do projeto
APi de integração com as plataformas Pipedirve e Bling, desenvolvida com nodeJS. 

### Dependencias Utilizadas
- [Express] - criar o servidor
- [Axios] -  realizar requisições externas
- [body-parse] -  para trabalhar com json
- [node-cron] - agendador de tarfeas
- [cors] -  habiltar cors a serviços externos
- [morgan] -  logs na aplicação

### Funcionalidades
- [x] Listar negocios do pipedrive com status "won"
- [x] Cadastro de pedidos no bling a parti do pipedriver
- [x] Cadastar Pedido no mongoDB
- [x] Job que fica rodando a cada 30s para fazer a sincronização do Pipedrive com o Bling  

### Rotas

### Comandos para rodar o projeto
```bash
# Clone o repositorio
$ git clone <https://github.com/leomauricio7/linkapi-teste.git>

# Acesse a pasta do projeto no teminal
$ cd linkapi-teste/

# Intale as dependências
$ npm i

# Rode o servidor
$ npm run dev
# O servidor irar inicar na porta - 3000 - acesse <http://localhost:3000>
```

### Rotas/Endpoints
```bash
# Listar as oportunidades, fitrando por dia, total e quantidade
- [url] - http://localhost:3000/test/api/opportunity/summary
- [method] - GET

# Listar todas as oportunidades
- [url] - http://localhost:3000/test/api/opportunity
- [method] - GET
```

### Sobre mim
- https://nextti.inf.br/) 💻 - Site pessoal com alguns projetos desenvolvidos.