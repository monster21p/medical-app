const customTitlebar = require('custom-electron-titlebar');
 
let MyTitleBar = new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#21263E'),
    overflow: "hidden",
    shadow: true,
    maximizable: false,
    icon: '../../../assets/icons/win/icon.ico'
});

MyTitleBar.updateTitle('');

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

        const registrar = require('./registrarDB');
        registrar(newProduct);
        ipcRenderer.send('product:new', newProduct);        
        e.preventDefault();
        limpiar1();
        const remote = require('electron').remote;
        const r=()=>{var window = remote.getCurrentWindow();window.close();};
        setTimeout(function(){r()},500);
    });

        