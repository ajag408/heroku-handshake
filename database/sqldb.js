
const mysql = require('mysql');

// local mysql db connection
// const connection = mysql.createConnection({
//   host: 'fugfonv8odxxolj8.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//   port: '3306',
//   user: 'pvgt0ikkvj7xf93e',
//   password: 'lf71yxojh35mybjz',
//   database: 'rqxyzqga475wwky1',
// });

const connection = mysql.createPool({
  host: 'fugfonv8odxxolj8.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  port: '3306',
  user: 'pvgt0ikkvj7xf93e',
  password: 'lf71yxojh35mybjz',
  database: 'rqxyzqga475wwky1',
  connectionLimit: 500, //mysql connection pool length
});


connection.getConnection((err) => {
  if (err) throw err;
});

// connection.on('connection', function (connection) {
//   console.log('DB Connection established');

//   connection.on('error', function (err) {
//     console.error(new Date(), 'MySQL error', err.code);
//   });
//   connection.on('close', function (err) {
//     console.error(new Date(), 'MySQL close', err);
//   });

// });


module.exports = connection;



// const mysql = require('mysql');

// // local mysql db connection
// const connection = mysql.createConnection({
//   host: 'localhost',
//   port: '8889',
//   user: 'root',
//   password: 'root',
//   database: 'reactHandshake',
// });

// connection.connect((err) => {
//   if (err) throw err;
// });

// module.exports = connection;