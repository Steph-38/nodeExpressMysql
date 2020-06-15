const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'ned',
  password: '0000',
  database: 'nodeExpressMysql'
});

connection.connect();

module.exports = connection