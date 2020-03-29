
//modulos importados
const customTitlebar = require('custom-electron-titlebar');
const {ipcRenderer} = require ('electron');
const moment = require('moment');
const remote = require('electron').remote;

let MyTitleBar = new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#21263E'),
    overflow: "hidden",
    shadow: true,
    maximizable: false,
    icon: '../../../assets/icons/win/icon.ico'
});

MyTitleBar.updateTitle('');

moment.locale('es-us');

ipcRenderer.on('edit', (e,edit)=>{
    console.log('editando-->',edit);
    const pool = require('../../sqlserver');
    pool.getConnection((err, connection) => {
        var sql = 'SELECT * FROM inforegistro WHERE cedula = ?';
        connection.query(sql, [edit], (error, results) => {
            connection.release();
            if (error) throw error;
            for (i = 0; i < results.length; i++) {
                $("#name").val(results[i].nombre);
                $("#lastname").val(results[i].apellido);
                $("#identificationcard").val(results[i].cedula);
                $("#adreess").val(results[i].direccion);
                $("#phoneline").val(results[i].telefono);
                $("#notas").val(moment().format('LLLL')+'-->'+'\n'+'\\\n'+'\n'+results[i].notas);   
            };
        });
    });

    const form = document.querySelector('#form');

    form.addEventListener('submit', e => {
        const nameT = document.querySelector('#name').value;
        const lastnameT = document.querySelector('#lastname').value;
        const identificationT = document.querySelector('#identificationcard').value;
        const adreessT = document.querySelector('#adreess').value;
        const phonelineT = document.querySelector('#phoneline').value;
        const notasT = document.querySelector('#notas').value;
        const fechaT = moment().format('LLLL');

        const newProduct = [
            nameT,
            lastnameT,
            identificationT,
            adreessT,
            phonelineT,
            fechaT,
            notasT
        ];  
        
        pool.getConnection(function(err, connection) {  
            console.log("Connected!");  
            var sql = 'UPDATE inforegistro SET nombre=?, apellido=?, cedula=?, direccion=?, telefono=?, fecha=?, notas=? WHERE cedula=?'; 
            console.log(newProduct);
            connection.query(sql, [nameT,lastnameT,identificationT,adreessT,phonelineT,fechaT,notasT,edit], function (err, results) { 
            connection.release(); 
            if (err) throw err;  
            console.log("Agregado: " + results.affectedRows);
            });  
            ipcRenderer.send('update', newProduct);  
        }); 
        
        const x=()=>{var window = remote.getCurrentWindow();window.close();};
        setTimeout(function(){x()},600);       
        e.preventDefault();
    });
});






