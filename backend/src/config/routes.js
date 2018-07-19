const express = require('express')

module.exports = function(server){
  //Definir URL base
  const router = express.Router();
  server.use('/api', router);

  //Rotas relacionadas aos Spents
  const spents = require('../api/spents/spentsService');
  const cycles = require('../api/cycles/cyclesService');
  spents.register(router, '/spents');
  cycles.register(router, '/cycles');
  
}
