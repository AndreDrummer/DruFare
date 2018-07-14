const express = require('express')

module.exports = function(server){
  //Definir URL base
  const router = express.Router();
  server.use('/api', router);

  //Rotas relacionadas aos Spents
  const spents = require('../api/spents/spentsService');
  spents.register(router, '/spents');
}
