const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const cookieParser = require('cookie-parser');

const authenticateToken = require('./middlewares/authentication'); 
const estadosRoutes = require('./routes/estados');
const formularioRoutes = require('./routes/formulario');

const app = express();

// Configura o middleware do body-parser para acessar os dados enviados via formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors());

// Use as rotas
app.use('/estados', authenticateToken, estadosRoutes);
app.use('/formulario', authenticateToken, formularioRoutes);

const segredoJwt = 'seuSegredo'; // Defina uma chave secreta para assinar o token JWT (mantenha-a segura)

// Rota para gerar o token JWT
app.use('/gerar-token', (req, res) => {
  const { usuario } = req.body;
  
  // Aqui você pode realizar a autenticação do usuário, por exemplo, consultando o banco de dados.

  // Para fins de demonstração, apenas criaremos um token com o nome do usuário.
  const token = jwt.sign({ usuario }, segredoJwt, { expiresIn: '1h' });

  res.setHeader('Set-Cookie', cookie.serialize('token', token, {
    httpOnly: true,
    secure: true, // A flag "secure" deve ser usada em produção quando o HTTPS estiver ativado
    sameSite: 'strict', // Melhora a segurança do cookie para evitar CSRF (Cross-Site Request Forgery)
    maxAge: 3600, // Tempo de vida do cookie em segundos (1 hora neste exemplo)
    path: '/', // O cookie estará disponível em todo o site
  }));

  res.json({ token });
});

app.use('/recurso-protegido',authenticateToken,  (req, res) => {
  console.log('Usuário autenticado:', req.user);
  res.send('Seu acesso foi validado!');
});


// Configuração do Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  explorer: true,
  defaultModelsExpandDepth: -1
}));

// Inicia o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}.`);
});


