const borrar = (cc) => {

    const pool = require('../../sqlserver');
    const sql1 = require('../../sqlserver');

    pool.getConnection((err, connection) => { 
        console.log('x-->',cc);
        const sql1 = 'DELETE FROM inforegistro WHERE cedula = ?';
        connection.query(sql1, [cc], (err, results) => {
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

