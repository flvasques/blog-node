var dbService = require('../../dbService');

class HomeController {

    async index(req, res) {
        const { user } = req.session
        try {
            dbService.pool.getConnection(function (err, connection) {
              if (err) {
                connection.release();
                res.status(500).send({ error: "Ocorreu uma falha!" });
              }
              let sql = `SELECT * FROM posts WHERE user_id = ${req.session.user.id}`;
              connection.query(sql, function (error, results, fields) {
                if (error) {
                  console.log(error);
                  connection.release();
                  res.status(500).send({ error: "Ocorreu uma falha!" });
                }
                connection.release();
                return res.render('profile', {list: results, user: user});
              });
            });
          } catch (error) {
            console.log(error);
          }
    }

    async signup(req, res) {
        res.render('signup', {user: null});
    }

    async save(req, res) {
        const { user } = req.session;
        try {
            dbService.pool.getConnection(function (err, connection) {
                if (err) {
                  connection.release();
                  res.status(500).send({ error: "Ocorreu uma falha!" });
                }
                let sql = `INSERT INTO users (name, email, password) VALUES ('${req.body.name}', '${req.body.email}', '${req.body.password}')`;
                connection.query(sql, function (error, results, fields) {
                  if (error) {
                    console.log(error);
                    connection.release();
                    res.status(500).send({ error: "Ocorreu uma falha!" });
                  }
                  req.session.user = {
                    id: results.insertId,
                    name: req.body.name,
                    email: req.body.email
                  }
                  connection.release();             
                  return res.redirect('/');
                });
            });
        } catch (error) {
            console.log(error);
        }
    }

    async login(req, res) {
        res.render('login', {user: null});
    }

    async doLogin(req, res) {
        try {
            dbService.pool.getConnection(function (err, connection) {
              if (err) {
                connection.release();
                res.status(500).send({ error: "Ocorreu uma falha!" });
              }
              let sql = `SELECT * FROM users WHERE email = '${req.body.email}' and password = '${req.body.password}'`;
              connection.query(sql, function (error, results, fields) {
                if (error) {
                  console.log(error);
                  connection.release();
                  res.status(500).send({ error: "Ocorreu uma falha!" });
                }
                if (results.length == 0) {
                    connection.release();
                    return res.redirect('/usuario/login');
                } else {
                    
                    req.session.user = results[0];
                    connection.release();
                    return res.redirect('/usuario/perfil');
                }
                
              });
            });
        } catch (error) {
            console.log(error);
        }
    }

    async logout(req, res) {
        req.session.destroy();
        return res.redirect('/');
    }

}

module.exports = HomeController;