module.exports.mostrarTabla = () => {

    const {ipcRenderer} = require('electron');
        ipcRenderer.on('product:new', (e , newProduct) => {
        console.log('agregado--> ',newProduct);
    });

    const pool = require('../../sqlserver');

        pool.getConnection((err, connection)=>{
            var sql = 'SELECT count(*) As total FROM inforegistro';
            connection.query(sql, (err, results)=>{
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