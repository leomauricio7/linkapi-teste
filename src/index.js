  require('dotenv').config({
    path: ".env"
  })

  const cron = require("node-cron");
  const scheduler = require("./app/utils/scheduler");

  const express = require("express");
  const monggose = require("mongoose");
  const cors = require("cors");
  const morgan = require("morgan");
  const bodyParser = require('body-parser');
  const serverPort = process.env.PORT || 3000;
  
  const http = require("http");
  const app = express();  
  const server = http.Server(app);

  //importando as rotas
  const routes = require("./router");

  //conexão com o banco de dados
  monggose.connect(
    process.env.MONGODB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      poolSize: 10
    }
  ).then(() => {
    console.log('Conectado ao MongoDB');
  }).catch(err => console.error('Erro na conexão:', err));
  
  // habilita o acesso do CORS
  app.use(cors({
    origin: "*",
    credentials: true
  }));
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
  // parse application/json
  app.use(bodyParser.json({ limit: '20mb' }));
  // parse application/vnd.api+json as json
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
  // registra todos os acessos ao server
  app.use(morgan("dev"));

  // setando path padrão e importando rotas
  app.use(process.env.PATH_URL, routes); 
  
  // page 404
  app.get('*', function (req, res) {
    res.status(404).json({ msg: 'page not found', http: 404 });
  });
  
  // task do cron job
  cron.schedule("0 * * * * *", () =>{
    scheduler.buscaPedidosPipedrive();
  });

  //porta onde está o rodando o server
  server.listen(serverPort, () => {
    console.log(`API rodando na porta ${serverPort}`);
  });
  