const sql= require('mysql')

const dbConnections =  mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : 'n3u3da!',
    database : 'hydra'
  });

module.exports = dbConnections;