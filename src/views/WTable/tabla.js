const customTitlebar = require('custom-electron-titlebar');
 
let MyTitleBar = new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#21263E'),
    shadow: true,
    maximizable: false,
    icon: '../../../assets/icons/win/icon.ico'
});

MyTitleBar.updateTitle('REGISTRO');

const mt = require('./mostrarTabla');
mt.mostrarTabla();

const limpiar2 = () => {
    document.getElementById("busquedaI").value = "";
};

const mostrarCedula = (mc) =>{

    const remote = require('electron').remote;
    const main = remote.require('./index.js');
    
    const pool = require('../../sqlserver');
    console.log(mc);
    const busqq = [mc];

    pool.getConnection((err, connection) => {
        var sql = 'SELECT * FROM inforegistro WHERE cedula = ?';
        var values = [busqq];
        var tableBody="";
        connection.query(sql, [values], (error, results) => {
        connection.release();
            if (error) throw error;
                console.log('usuario-> ',results);
                console.log('cedula-> ',results[0].cedula);
            for (i = 0; i < results.length; i++) {
                tableBody += '<tr>';
                tableBody += '  <td>' + results[i].nombre + '</td>';
                tableBody += '  <td>' + results[i].apellido + '</td>';
                tableBody += '  <td>' + results[i].cedula + '</td>';        
                tableBody += '  <td>' + results[i].direccion + '</td>';
                tableBody += '  <td>' + results[i].telefono + '</td>';
                tableBody += '  <td>' + results[i].created_at + '</td>';
                tableBody += '  <td><input id="delete" class="btn btn-danger" type="button" value="Eliminar" style="margin-left: 80px;"> <input id="edit" class="btn btn-warning" type="button" value="Editar" style="margin-left: 10px;"></td>';
                tableBody += '</tr>';
            };
            document.getElementById("tablebody").innerHTML = tableBody;
            var edit = results[0].cedula;
            const {ipcRenderer} = require('electron');
            const btn = document.getElementById('edit');
            btn.addEventListener('click', () => {
                main.CreateWindowEdit();
                const s =()=>{ipcRenderer.send('edit',edit);}
                setTimeout(function(){s()},800);
            });
            borrar(results[0].cedula);
        });
    });
    limpiar2();
};

const borrar = (c) => {
    
    $(document).on('click', '.btn.btn-danger', (e) => {

        const pool = require('../../sqlserver');

        pool.getConnection((err, connection) => { 
            var sql = 'DELETE FROM inforegistro WHERE cedula = ?';
            console.log('x-->',c);
            connection.query(sql, [c], (err, results) => {
            connection.release();
              if (err) throw err;
              console.log(results);
              console.log('usuario eliminado');
            });
        });
        e.preventDefault();
        $(this).closest('tr').remove();
        main.mostrarTabla();
    });

};

$(document).on('click', '.btn.btn-info', (e) => {
    mt.mostrarTabla();
    e.preventDefault();
});

const form = document.querySelector('#barraDeBusqueda');
form.addEventListener('submit', e => {
    const busq = document.querySelector('#busquedaI').value;
    mostrarCedula(busq);
    e.preventDefault();
});




    

