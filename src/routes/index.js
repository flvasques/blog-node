const { Router } = require('express');
const routes = Router();

const HomeController = require('../controllers/home-controller');

const homeController = new HomeController();


routes.get('/', homeController.index);
routes.get('/postagem/:id', homeController.single);

module.exports = routes;