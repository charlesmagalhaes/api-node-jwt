const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');
const { nextTick } = require('process');

// Middleware para autenticação
function authenticateToken(req, res, next) {
  // Obtenha o token JWT do cabeçalho Authorization
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido.' });
  }


  if(token === secretKey) {
    
    return next();
    //res.status(201).json({ message: 'Token autenticado.' });;
  }

  return res.status(403).json({ message: 'Token de autenticação inválido.' });

  // Verifique se o token é válido
  // jwt.verify(token, secretKey, (err, user) => {
  //   if (err) {
  //     return res.status(403).json({ message: 'Token de autenticação inválido.' });
  //   }

    // Se o token é válido, você pode adicionar o objeto "user" à requisição para uso posterior
  //   req.user = user;
  //   next();
  // });
}

module.exports = authenticateToken;
