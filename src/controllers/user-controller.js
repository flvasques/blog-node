class HomeController {

    async index(req, res) {
       
        return res.render('profile', {list: list});
    }

    async signup(req, res) {
        res.render('signup', {user: null});
    }

    async register(req, res) {
        return res.redirect('/');
    }

    async login(req, res) {
        res.render('login', {user: null});
    }

    async doLogin(req, res) {
        return res.redirect('/');
    }

    async logout(req, res) {
        req.session.destroy();
        return res.redirect('/');
    }

}

module.exports = HomeController;