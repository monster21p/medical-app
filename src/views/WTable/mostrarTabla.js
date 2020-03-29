const mostrarTabla = () => {

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
                for (i = 0; i < results.length; i++) {
                tableBody += '<tr>';
                tableBody += '  <td>' + results[i].nombre + '</td>';
                tableBody += '  <td>' + results[i].apellido + '</td>';
                tableBody += '  <td>' + results[i].cedula + '</td>';        
                tableBody += '  <td>' + results[i].direccion + '</td>';
                tableBody += '  <td>' + results[i].telefono + '</td>';
                tableBody += '  <td>' + results[i].fecha +'</td>';
                tableBody += '</tr>';
                }
                document.getElementById("tablebody").innerHTML = tableBody;
            }); 
        });
};

module.exports = mostrarTabla;