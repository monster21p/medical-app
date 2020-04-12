const {ipcRenderer} = require ('electron');
const moment = require('moment');
const remote = require('electron').remote;

moment.locale('es-us');

ipcRenderer.on('edit', (e,edit)=>{
    console.log('editando-->',edit);

    const form = document.querySelector('#form');

    form.addEventListener('submit', e => {
        
        const x=()=>{var window = remote.getCurrentWindow();window.close();};
        setTimeout(function(){x()},600);       
        e.preventDefault();
    });
});






