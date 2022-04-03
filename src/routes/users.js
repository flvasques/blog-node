var { isAuth, goLogin, notAuth } = require('../helpers/middlewares');
const { Router } = require('express');
const routes = Router();

const UserController = require('../controllers/user-controller');

const userController = new UserController();

routes.get('/login', notAuth, userController.login);
routes.post('/login', notAuth, userController.doLogin);
routes.get('/cadastrar', goLogin, userController.signup);
routes.post('/cadastrar', goLogin, userController.save);
routes.get('/logout', isAuth, userController.logout);
routes.get('/perfil', isAuth, userController.index)

module.exports = routes;