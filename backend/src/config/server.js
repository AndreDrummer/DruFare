const port = 3003;

const bodyParser = require('body-parser');
const express = require('express');
const server = express();
const allowCors = require('../config/cors');
const queryParse = require('express-query-int');

server.use(bodyParser.urlencoded({extended: true})); // para todas requisições
// server.use('/ola', bodyParser.urlencoded({extended: true})); para todas as requisições com a url '/ola'
server.use(bodyParser.json());
server.use(allowCors);
server.use(queryParse());

server.listen(port, function() {
  console.log(`O BACKEND está funcionando na porta ${port}`);
});

module.exports = server;
