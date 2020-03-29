
//módulos importados
const customTitlebar = require('custom-electron-titlebar');
const mostrarTabla = require('./mostrarTabla');
const {ipcRenderer} = require('electron');
const remote = require('electron').remote;
const main = remote.require('./index.js');
const borrar = require('./borrar');    
const pool = require('../../sqlserver');
const limpiar1 = require('./limpiar');

//constantes de botones
const form = document.querySelector('#barraDeBusqueda');
const mt = document.getElementById('mostrarTodos');



//titlebar
let MyTitleBar = new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#21263E'),
    shadow: true,
    overflow: "hidden",
    icon: '../../../assets/icons/win/icon.ico'
});

MyTitleBar.updateTitle('REGISTRO');

mostrarTabla();

ipcRenderer.on('product:new', (e , newProduct) => {
    console.log('agregado--> ',newProduct);
    var name = newProduct[0];
    console.log('nombre-->',name);
    alertify.set('notifier','position', 'top-left');
    alertify.success('Agregado : ' + name);
    mostrarTabla();
});

ipcRenderer.on('update', (e , update) => {
    console.log('update--> ',update);
    var name = update[0];
    console.log('nombre-->',name);
    alertify.set('notifier','position', 'top-left');
    alertify.success('Actualizado : ' + name);
    mostrarTabla();
});

const mostrarCedula = (mc) =>{
    
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
                tableBody += '  <td>' + results[i].fecha + '</td>';
                tableBody += '  <td style="background: light-gray; width:189px"><input id="edit" class="btn btn-warning" type="button" value="Editar" style="margin-left: 1px;"><input id="delete" class="btn btn-danger" type="button" value="Eliminar" style="margin-left: 30px;"></td>';
                tableBody += '</tr>';
            };
            document.getElementById("tablebody").innerHTML = tableBody;
            var edit = results[0].cedula;
            const btn2 = document.getElementById('delete');
            const btn1 = document.getElementById('edit');
            btn2.addEventListener('click', ()=>{
                alertify.confirm('Eliminar: '+edit, '¿ Esta Seguro ?', 
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
    limpiar1();
};

//botones de motrar todo y de busqueda
mt.addEventListener('click', (e) => {
    e.preventDefault();
    mostrarTabla();
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    mostrarCedula(document.querySelector('#busquedaI').value);
});




    

