const customTitlebar = require('custom-electron-titlebar');
 
let MyTitleBar = new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#21263E'),
    shadow: true,
    maximizable: false,
    icon: '../../../assets/icons/win/icon.ico'
});

MyTitleBar.updateTitle('REGISTRO');

const mostrarTabla = require('./mostrarTabla');
mostrarTabla();

const {ipcRenderer} = require('electron');
ipcRenderer.on('product:new', (e , newProduct) => {
    console.log('agregado--> ',newProduct);
    var name = newProduct[0];
    console.log('nombre-->',name);
    alertify.set('notifier','position', 'top-left');
    alertify.success('Agregado : ' + name);
});

const limpiar2 = () => {
    document.getElementById("busquedaI").value = "";
};

const mostrarCedula = (mc) =>{

    const remote = require('electron').remote;
    const main = remote.require('./index.js');
    const borrar = require('./eliminar');
    
    const pool = require('../../sqlserver');
    console.log(mc);
    const busqq = [mc];

    pool.getConnection((err, connection, connection2) => {
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
                tableBody += '  <td><input id="edit" class="btn btn-warning" type="button" value="Editar" style="margin-left: 10px;"><input id="delete" class="btn btn-danger" type="button" value="Eliminar" style="margin-left: 80px;"></td>';
                tableBody += '</tr>';
                //<input id="delete" class="btn btn-danger" type="button" value="Eliminar" style="margin-left: 80px;">
            };
            document.getElementById("tablebody").innerHTML = tableBody;
            var edit = results[0].cedula;
            const {ipcRenderer} = require('electron');
            const btn1 = document.getElementById('edit');
            const btn2 = document.getElementById('delete');
            btn2.addEventListener('click', ()=>{
                alertify.confirm('Eliminar: '+edit, 'Esta Seguro?', 
                    function(){borrar(edit),alertify.success('Eliminación  Exitosa') }, 
                    function(){alertify.error('Cancelado')});
            });
            btn1.addEventListener('click', () => {
                main.CreateWindowEdit();
                const s =()=>{ipcRenderer.send('edit',edit);}
                setTimeout(function(){s()},800);
            });
            
        });

    });
    limpiar2();
    //borrar(mc);
};

$(document).on('click', '.btn.btn-info', (e) => {
    mostrarTabla();
    e.preventDefault();
});

const form = document.querySelector('#barraDeBusqueda');
form.addEventListener('submit', e => {
    const busq = document.querySelector('#busquedaI').value;
    mostrarCedula(busq);
    e.preventDefault();
});




    

