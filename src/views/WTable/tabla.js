mostrarTabla();
mostrarCedula();

function mostrarTabla(){

    const {ipcRenderer} = require('electron');

    ipcRenderer.on('product:new', (e , newProduct) => {
    console.log('agregado--> ',newProduct);
    });

    var mysql = require('mysql');
    var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password :  null,
    database : 'registro'
    });

        pool.getConnection(function(err, connection){
            var sql = 'SELECT count(*) As total FROM inforegistro';
            connection.query(sql, function(err, results) {
                connection.release();
                if (err) throw err;
                console.log('cantidad ', results[0].total);
                $('#countt').text('Total Registrados: '+results[0].total);
              });

            var sql = 'SELECT * FROM inforegistro';
            var tableBody="";
            connection.query(sql, function(err, results) {
              if (err) throw err;
              console.log(results);
              //$('#products').text(results[0].created_at);
                for (i = 0; i < results.length; i++) {
                tableBody += '<tr>';
                tableBody += '  <td>' + results[i].nombre + '</td>';
                tableBody += '  <td>' + results[i].apellido + '</td>';
                tableBody += '  <td>' + results[i].cedula + '</td>';        
                tableBody += '  <td>' + results[i].direccion + '</td>';
                tableBody += '  <td>' + results[i].telefono + '</td>';
                tableBody += '  <td>' + results[i].created_at +'</td>';
                //tableBody += '  <td> <input id="delete" class="btn btn-danger" type="button" value="Eliminar" style="margin-left: 80px;"> <input id="edit" class="btn btn-warning" type="button" value="Editar" style="margin-left: 10px;"></td>';
                tableBody += '</tr>';
                }
                document.getElementById("tablebody").innerHTML = tableBody;
                //borrar(results[0].cedula);
            }); 
        });

};

function limpiar2() {
    document.getElementById("busquedaI").value = "";
};

function mostrarCedula(){

    const form = document.querySelector('#barraDeBusqueda');
    form.addEventListener('submit', e => {

            var mysql = require('mysql');
            var pool = mysql.createPool({
            host     : 'localhost',
            user     : 'root',
            password :  null,
            database : 'registro'
        });

    const busq = document.querySelector('#busquedaI').value;
    const busqq = [busq];
    console.log(busq);
 
    pool.getConnection(function(err, connection){
        var sql = 'SELECT * FROM inforegistro WHERE cedula = ?';
        var values = [busqq];
        var tableBody="";
        connection.query(sql, [values], function(error, results) {
        connection.release();
          if (error) throw error;
          console.log('usuario-> ',results);
          console.log('cedula-> ',results[0].cedula);
          //$('#products').text(results[0].created_at);
            for (i = 0; i < results.length; i++) {
            tableBody += '<tr>';
            tableBody += '  <td>' + results[i].nombre + '</td>';
            tableBody += '  <td>' + results[i].apellido + '</td>';
            tableBody += '  <td>' + results[i].cedula + '</td>';        
            tableBody += '  <td>' + results[i].direccion + '</td>';
            tableBody += '  <td>' + results[i].telefono + '</td>';
            tableBody += '  <td>' + results[i].created_at + '</td>';
            tableBody += '  <td><input id="delete" class="btn btn-danger" type="button" value="Eliminar" style="margin-left: 80px;"></td>';
            tableBody += '</tr>';
            // <input id="edit" class="btn btn-warning" type="button" value="Editar" style="margin-left: 10px;">
            };
            document.getElementById("tablebody").innerHTML = tableBody;
            borrar(results[0].cedula);
        });
    });
    e.preventDefault();
    limpiar2();
    });

};

function borrar(c) {
    console.log('-> ',c);

    $(document).on('click', '.btn.btn-danger', function (e) {

        var mysql = require('mysql');
        var pool = mysql.createPool({
        host     : 'localhost',
        user     : 'root',
        password :  null,
        database : 'registro'
        });

        var cc = [c];

        pool.getConnection(function(err, connection){ 
            var sql = 'DELETE FROM inforegistro WHERE cedula = ?';
            connection.query(sql, [cc], function(err, results) {
            connection.release();
              if (err) throw err;
              console.log(results);
              console.log('usuario eliminado');
              //$('#products').text(results[0].created_at);
            });
        });
        e.preventDefault();
        $(this).closest('tr').remove();
        mostrarTabla();
    });

};

$(document).on('click', '.btn.btn-info', function (event) {
    mostrarTabla();
    event.preventDefault();
});



    

