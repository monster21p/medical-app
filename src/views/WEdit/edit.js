const {ipcRenderer} = require('electron');

ipcRenderer.on('edit:new', (e , edit) => {
    console.log('mira--> ',edit);
    console.log('hola mira')
    });