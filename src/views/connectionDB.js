exports.start = ()=>{

    // MYSQL
    var mysql = require('mysql');
    var pool = mysql.createPool({
        host     : 'localhost',
        user     : 'root',
        password :  null,
        database : 'registro'
    });

};

