var dbService = require('../../dbService');

class HomeController {

    async index(req, res) {
      const { user } = req.session;
      try {
          dbService.pool.getConnection(function (err, connection) {
            if (err) {
              connection.release();
              res.status(500).send({ error: "Ocorreu uma falha!" });
            }
            let sql = `SELECT * FROM posts ORDER BY created_at DESC LIMIT 5`;
            connection.query(sql, function (error, results, fields) {
              if (error) {
                console.log(error);
                connection.release();
                res.status(500).send({ error: "Ocorreu uma falha!" });
              }
              
              connection.release();
              return res.render('index', {list: results, user: user});
            });
          });
      } catch (error) {
          console.log(error);
      }
    }

    async posts(req, res) {
      const { user } = req.session;
      try {
          dbService.pool.getConnection(function (err, connection) {
            if (err) {
              connection.release();
              res.status(500).send({ error: "Ocorreu uma falha!" });
            }//req.query.id
            let sql = `SELECT COUNT(*) AS total FROM posts;
                      SELECT * FROM posts ORDER BY created_at DESC LIMIT 10;`;
            connection.query(sql, function (error, results, fields) {
              if (error) {
                console.log(error);
                connection.release();
                res.status(500).send({ error: "Ocorreu uma falha!" });
              }
              const data = {
                total: results[0][0].total,
                currentPage: 1,
                lastPage: Math.ceil(results[0][0].total / 10),
                queryString: '',
                list: results[1],
                user: user
              }
              connection.release();
              return res.render('posts', data);
            });
          });
      } catch (error) {
          console.log(error);
      }
    }

    async single(req, res) {
      const { user } = req.session;
      try {
          dbService.pool.getConnection(function (err, connection) {
              if (err) {
                connection.release();
                res.status(500).send({ error: "Ocorreu uma falha!" });
              }
              let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
              connection.query(sql, function (error, results, fields) {
                if (error) {
                  console.log(error);
                  connection.release();
                  res.status(500).send({ error: "Ocorreu uma falha!" });
                }
                connection.release();             
                return res.render('single', {post: results[0], user: user});
              });
          });
      } catch (error) {
          console.log(error);
      }
    }

    async postFrom(req, res) {
      const { user } = req.session;
      if(req.params.id) {
        try {
          dbService.pool.getConnection(function (err, connection) {
            if (err) {
              connection.release();
              res.status(500).send({ error: "Ocorreu uma falha!" });
            }
            let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
            connection.query(sql, function (error, results, fields) {
              if (error) {
                console.log(error);
                connection.release();
                res.status(500).send({ error: "Ocorreu uma falha!" });
              }
              if (results.length == 0 && results[0].user_id != user.id) {
                connection.release();
                return res.redirect('/usuario/perfil');
              } else {
                connection.release();
                return res.render('create-post', {post: results[0], user: user});
              }
              
            });
          });
        } catch (error) {
            console.log(error);
        }
      } else {
        return res.render('create-post', {post: null, user: user});
      }
    }

  async savePost(req, res) {
    const { user } = req.session;
    try {
      dbService.pool.getConnection(function (err, connection) {
          if (err) {
            connection.release();
            res.status(500).send({ error: "Ocorreu uma falha!" });
          }
          let sql = '';
          if(req.body.id) {
            sql = `UPDATE posts SET title = '${req.body.title}', text ='${req.body.text}', img= '' WHERE id =  ${req.body.id}`;
          } else {
            sql = `INSERT INTO posts (title, text, img, user_id) VALUES ('${req.body.title}', '${req.body.text}', '', ${req.session.user.id})`;
          }
          connection.query(sql, function (error, results, fields) {
            if (error) {
              console.log(error);
              connection.release();
              res.status(500).send({ error: "Ocorreu uma falha!" });
            }
            connection.release();             
            return res.redirect('/usuario/perfil');
          });
      });
    } catch (error) {
        console.log(error);
    }
  }

  async deletePost(req, res) {
    const { user } = req.session;
    try {
      dbService.pool.getConnection(function (err, connection) {
          if (err) {
            connection.release();
            res.status(500).send({ error: "Ocorreu uma falha!" });
          }
          let sql = '';
          sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
          connection.query(sql, function (error, results, fields) {
            if (error) {
              console.log(error);
              connection.release();
              res.status(500).send({ error: "Ocorreu uma falha!" });
            }
            connection.release();             
            return res.redirect('/usuario/perfil');
          });
      });
    } catch (error) {
        console.log(error);
    }
  }

}

module.exports = HomeController;