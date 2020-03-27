const borrar = (cc) => {
    const pool = require('../../sqlserver');

        pool.getConnection((err, connection) => { 
            var sql = 'DELETE FROM inforegistro WHERE cedula = ?';
            console.log('x-->',cc);
            connection.query(sql, [cc], (err, results) => {
            connection.release();
                if (err) throw err;
                console.log(results);
                console.log('usuario eliminado');
            });
        });
        $(this).closest('tr').remove();
        mostrarTabla();
};

module.exports = borrar;

