
module.exports = function(newProduct){

    const pool = require('../../sqlserver');
    const {ipcRenderer} = require('electron');

    pool.getConnection(function(err, connection) {  
        console.log("Connected!");  
        var sql = "INSERT INTO inforegistro (nombre, apellido, cedula, direccion, telefono) VALUES ?";  
        var values = [newProduct];  
        console.log(newProduct);
        connection.query(sql, [values], function (err, results) { 
        connection.release(); 
        if (err) throw err;  
        console.log("Agregado: " + results.affectedRows);
        ipcRenderer.send('product:new', newProduct); 
        });  
    }); 
};




