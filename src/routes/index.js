var { isAuth, goLogin, notAuth } = require('../helpers/middlewares');
const { Router } = require('express');
const routes = Router();

const HomeController = require('../controllers/home-controller');

const homeController = new HomeController();


routes.get('/', homeController.index);
routes.get('/postagens', homeController.posts);
routes.get('/postagens/:page', homeController.posts);
routes.get('/postagem/:id', homeController.single);
routes.get('/nova-postagem', isAuth, homeController.postFrom);
routes.post('/salvar-postagem', isAuth, homeController.savePost);
routes.get('/editar-postagem/:id', isAuth, homeController.postFrom);
routes.get('/apagar-postagem/:id', isAuth, homeController.deletePost);


module.exports = routes;