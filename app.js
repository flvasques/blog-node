const path = require('path');
const express = require('express');
const session = require('express-session');
const port = 3000;

const app = express();

app.use(session({
    secret: 'CHAVE DA APLICAÇÃO',
    resave: false,            // FORÇA O SALVAR DA SESSION MESMO QUE NÃO MODIFICADA
    saveUninitialized: true,  // SALVAR UMA SESSION QUE NÃO INICIALIZADA
    cookie: { secure: false } // HTTP / HTTPS
  }));
  
app.use(express.static('./src/public'));
app.use('/css', express.static(__dirname + '/node_modules/materialize-css/dist/'));

app.set('views', './src/views'); 
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const index = require('./src/routes/index');
const users = require('./src/routes/users');

app.use('/', index);
app.use('/usuario', users);

const server = app.listen(port, () => {
    console.log(`Listen at ${server.address().address}:${port}`);
});