const express = require('express')
const auth = require('./auth')

module.exports = function (server) {

  // Rotas Protegidas por Token JWT
  const protectedApi = express.Router()
  server.use('/api', protectedApi)

  protectedApi.use(auth);

  const cycles = require('../api/cycles/cyclesService');
  cycles.register(protectedApi, '/cycles');

  // Rotas abertas
  const openApi = express.Router()
  server.use('/oapi', openApi);

  const AuthService = require('../api/user/authService');
  openApi.post('/login', AuthService.login);
  openApi.post('/signup', AuthService.signUp);
  openApi.post('/valdateToken', AuthService.validateToken);
}
