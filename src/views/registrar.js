function limpiar1() {
    document.getElementById("name").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("identificationcard").value = "";
    document.getElementById("adreess").value = "";
    document.getElementById("phoneline").value = "";
};

const {ipcRenderer} = require('electron');
const form = document.querySelector('#form');

    form.addEventListener('submit', e => {
        const nameT = document.querySelector('#name').value;
        const lastnameT = document.querySelector('#lastname').value;
        const identificationT = document.querySelector('#identificationcard').value;
        const adreessT = document.querySelector('#adreess').value;
        const phonelineT = document.querySelector('#phoneline').value;

        const newProduct = [
            nameT,
            lastnameT,
            identificationT,
            adreessT,
            phonelineT 
        ];
            

        // MYSQL
        var mysql = require('mysql');
        var pool = mysql.createPool({
        host     : 'localhost',
        user     : 'root',
        password :  null,
        database : 'registro'
        });

        pool.getConnection(function(err, connection) {  
            console.log("Connected!");  
            var sql = "INSERT INTO inforegistro (nombre, apellido, cedula, direccion, telefono) VALUES ?";  
            var values = [newProduct];  
            console.log(newProduct);
            connection.query(sql, [values], function (err, results) { 
            connection.release(); 
            if (err) throw err;  
            console.log("Agregado: " + results.affectedRows);
            });  
        }); 
        ipcRenderer.send('product:new', newProduct);        
        e.preventDefault();
        limpiar1();
    });

        