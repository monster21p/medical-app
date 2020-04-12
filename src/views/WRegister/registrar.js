const remote = require('electron').remote;
const db = require('../../indexedb');
const moment = require('moment');

const form = document.querySelector('#form');

    form.addEventListener('submit', e => {
        e.preventDefault();
        
        moment.locale('es-us');
        const f = moment().format('LLLL');
        const data = {
            cédula:document.getElementById('identificationCard').value,
            nombre:document.getElementById('name').value,
            apellido:document.getElementById('lastName').value,
            dirección:document.getElementById('address').value,
            teléfono:document.getElementById('phone').value,
            fecha: f
        };
        db.addUser(data);
        form.reset();
        x=()=>remote.getCurrentWindow().close();
        setTimeout(function(){x()},600);
    });


        