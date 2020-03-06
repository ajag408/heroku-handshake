
const mysql = require('mysql');

// local mysql db connection
const connection = mysql.createConnection({
  host: 'localhost',
  port: '8889',
  user: 'root',
  password: 'root',
  database: 'reactHandshake',
});

connection.connect((err) => {
  if (err) throw err;
});

module.exports = connection;
