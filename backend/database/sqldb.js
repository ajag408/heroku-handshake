'use strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    port: '8889',
    user     : 'root',
    password : 'root',
    database : 'handshake'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;