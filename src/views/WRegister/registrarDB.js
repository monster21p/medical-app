
    module.exports = function(newProduct){

            // MYSQL
    var mysql = require('mysql');
    var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password :  null,
    database : 'registro'
    });

    pool.getConnection(function(err, connection) {  
        console.log("Connected!");  
        var sql = "INSERT INTO inforegistro (nombre, apellido, cedula, direccion, telefono) VALUES ?";  
        var values = [newProduct];  
        console.log(newProduct);
        connection.query(sql, [values], function (err, results) { 
        connection.release(); 
        if (err) throw err;  
        console.log("Agregado: " + results.affectedRows);
        });  
    }); 

    };




