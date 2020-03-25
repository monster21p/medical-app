const {ipcRenderer} = require ('electron');
var moment = require('moment');
moment.locale('es');
console.log('bienvenido');


ipcRenderer.on('edit', (e,edit)=>{
    console.log(edit);
    var ce = edit;


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
                $("#notas").val(moment().format('LLLL')+'-->'+'\n'+'\\\n'+results[i].notas);   
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

        const newProduct = [
            nameT,
            lastnameT,
            identificationT,
            adreessT,
            phonelineT,
            notasT
        ];  
        
        pool.getConnection(function(err, connection) {  
            console.log("Connected!");  
            var sql = 'UPDATE inforegistro SET nombre=?, apellido=?, cedula=?, direccion=?, telefono=?, notas=? WHERE cedula=?'; 
            console.log(newProduct);
            connection.query(sql, [nameT,lastnameT,identificationT,adreessT,phonelineT,notasT,ce], function (err, results) { 
            connection.release(); 
            if (err) throw err;  
            console.log("Agregado: " + results.affectedRows);
            });   
        }); 
        const remote = require('electron').remote;
        const x=()=>{var window = remote.getCurrentWindow();window.close();};
        setTimeout(function(){x()},600);       
        e.preventDefault();
        //limpiar1();
    });
});






