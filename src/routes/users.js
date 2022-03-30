const { Router } = require('express');
const routes = Router();

const UserController = require('../controllers/user-controller');

const userController = new UserController();

routes.get('/login', userController.login);
routes.post('/login', userController.doLogin);
routes.get('/cadastrar', userController.signup);
routes.post('/cadastrar', userController.register);

module.exports = routes;