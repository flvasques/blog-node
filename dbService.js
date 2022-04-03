const mySql = require("mysql");
const env = require("./env");

let connection = mySql.createConnection(env.optConect);
var pool = mySql.createPool(env.optConect);

function teste() {
  connection = mySql.createConnection(env.optConect);

  connection.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }

    console.log("connected as id " + connection.threadId);
  });
  connection.end();
}


module.exports.execute = teste;
module.exports.connection = connection;
module.exports.pool = pool;