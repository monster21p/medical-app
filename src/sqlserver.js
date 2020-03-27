
const mysql = require('mysql');
const pool = mysql.createPool({
host     : 'localhost',
user     : 'root',
password :  null,
database : 'registro'
});

module.exports = pool;