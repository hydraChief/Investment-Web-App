const sql= require('mysql')

const dbConnections =  sql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : 'n3u3da!',
    database : 'investment_db',
  });

module.exports = dbConnections;