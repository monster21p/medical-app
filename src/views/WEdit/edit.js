const {ipcRenderer} = require ('electron');
var moment = require('moment');
moment.locale('es');
console.log('bienvenido');


ipcRenderer.on('edit', (e,edit)=>{
    console.log(edit);


    var mysql = require('mysql');
    var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password :  null,
    database : 'registro'
    });

    const busq = edit;
    const busqq = [busq];
    console.log(busq);

    pool.getConnection((err, connection) => {
        var sql = 'SELECT * FROM inforegistro WHERE cedula = ?';
        var values = [busqq];
        connection.query(sql, [values], (error, results) => {
            connection.release();
            if (error) throw error;
            for (i = 0; i < results.length; i++) {
                $("#name").val(results[i].nombre);
                $("#lastname").val(results[i].apellido);
                $("#identificationcard").val(results[i].cedula);
                $("#adreess").val(results[i].direccion);
                $("#phoneline").val(results[i].telefono);
                $("#notas").val('{  '+moment().format('LLLL')+'  }'+results[i].notas);   
            };
        });
    });
});

//var sql = 'UPDATE inforegistro SET (nombre, apellido, cedula, direccion, telefono, notas) VALUES ? WHERE cedula=?';




