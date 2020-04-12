const db = require('../../indexedb');
const {ipcRenderer} = require('electron');
const remote = require('electron').remote;
const main = remote.require('./app.js');
const moment = require('moment');

moment.locale('es-us');

db.showUsers();

ipcRenderer.on('message',(e, text) => {
    console.log('message from updater: ',text)
})

ipcRenderer.on('registrar', (e , registrar) => {
    db.showUsers();
    console.table([registrar]);
    alertify.set('notifier','position', 'top-left');
    alertify.success('Agregado : '+registrar.nombre);
});

ipcRenderer.on('update', (e , update) => {
    db.showUsers();
    console.table([update]);
    alertify.set('notifier','position', 'top-left');
    alertify.success('Actualizado : '+update.nombre);
});

refresh=()=>db.showUsers()// location.reload()
add=()=>main.CreateWindowRegister()
edit=()=>main.CreateWindowEdit()
borrar=(deleted)=>db.deleteUser(deleted)
exit=()=>remote.getCurrentWindow().close()


const form = document.getElementById('form');
form.addEventListener('keyup', (e)=>{
    e.preventDefault();
    db.searchUser(document.getElementById('busqueda').value);
});

let a = 'a';
let d ={nombre:'marisabel',apellido:'sanchez',teléfono:'6324-8999',dirección:'el valle'}
db.updateUser(a,d)



