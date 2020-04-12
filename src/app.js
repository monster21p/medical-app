const {app, BrowserWindow, ipcMain} = require('electron');
const url = require('url');
const path = require('path');

if(process.env.NODE_ENV !== 'production'){
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    });
};

let mainWindow;
let WindowRegister;
let WindowEdit;

app.allowRendererProcessReuse = false;
//
require('update-electron-app')({
    host: 'https://github.com/monster21p/medical-app.git',
    repo: 'monster21p/medical-app',
    updateInterval: '5 minute',
    logger: require('electron-log')
  })
//
app.on('ready', () => {
    CreateWindowTable();
});
//VENTANA DE LA TABLA
const CreateWindowTable = () => {

    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },

        icon: path.join(__dirname, '../assets/icons/win/icon.ico'),
        transparent:true,
        width: 1175,
        height:700,
        frame: false,
        show: false,
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/WTable/tabla.html'),
        protocol: 'file',
        slashes: true
    }));

    mainWindow.on('closed', () => {
        app.quit();
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
}; 
//VENTANA PARA REGISTRAR
module.exports.CreateWindowRegister = ()=> {

    WindowRegister = new BrowserWindow({
        
        webPreferences: {
            nodeIntegration: true
        },
        transparent: true,
        frame: false,
        width: 360,
        height: 410,
        show: false,
        parent: mainWindow,
        modal: true,
        icon: path.join(__dirname, '../assets/icons/win/icon.ico')
    });

    WindowRegister.loadURL(url.format({
        pathname: path.join(__dirname, 'views/WRegister/registrar.html'),
        protocol: 'file',
        slashes: true
    }));

    WindowRegister.on('closed', () => {
        WindowRegister = null;
    });

    WindowRegister.once('ready-to-show', () => {
        WindowRegister.show();
    });

};
//VENTANA PARA EDITAR
module.exports.CreateWindowEdit = () => {
    WindowEdit = new BrowserWindow({
    
        webPreferences: {
            nodeIntegration: true
        },
        frame: false,
        width: 925,
        height: 677,
        minimizable : true,
        maximizable : false,
        resizable : false,
        parent: mainWindow,
        modal: true,
        show: false,
        icon: path.join(__dirname, '../assets/icons/win/icon.ico')
    });

    WindowEdit.setMenu(null);
    WindowEdit.loadURL(url.format({
        pathname: path.join(__dirname, 'views/WEdit/edit.html'),
        protocol: 'file',
        slashes: true
    }));

    WindowEdit.on('closed', () => {
        WindowEdit = null;
    });
    
    WindowEdit.once('ready-to-show', () => {
        WindowEdit.show();
    });

};

    ipcMain.on('edit', (e, edit) => {
        console.log(edit);
        WindowEdit.webContents.send('edit', edit);
        e.sender.send('e',edit);
    });
    
    ipcMain.on('registrar', async(e, registrar) => {
        console.log('agregando-->',registrar);
        await mainWindow.webContents.send('registrar', registrar);
        await WindowRegister.webContents.send('registrar', registrar);
    });

    ipcMain.on('update', (e, update) => {
        console.log(update);
        mainWindow.webContents.send('update', update);
    });
