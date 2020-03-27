const {app, BrowserWindow, Menu, ipcMain} = require('electron');
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

app.on('ready', () => {

    
    CreateStartWindow();
    setTimeout(function(){CreateWindowTable()},4000);
    
});

const CreateStartWindow = ()=> {


    StartWindow = new BrowserWindow({

        webPreferences: {
            nodeIntegration: true
        },
        frame: false,
        width: 500,
        height: 150,
        resizable : false,
        show: false
    });
    StartWindow.setMenu(null);
    StartWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'start.html'),
        protocol: 'file',
        slashes: true
    }));

    StartWindow.once('ready-to-show', () => {
        StartWindow.show();
    });
};

const CreateWindowRegister = ()=> {


    WindowRegister = new BrowserWindow({

        webPreferences: {
            nodeIntegration: true
        },
        frame: false,
        width: 500,
        height: 585,
        minimizable : true,
        maximizable : true,
        resizable : false,
        show: false,
        icon: path.join(__dirname, '../assets/icons/win/icon.ico')
    });
    WindowRegister.setMenu(null);
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

const CreateWindowTable = () => {

    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);

    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width:1366,
        height:768,
        resizable : false,
        show: false,
        icon: path.join(__dirname, '../assets/icons/win/icon.ico'),
        frame: false
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
    
    ipcMain.on('product:new', (e, newProduct) => {
        console.log(newProduct);
        mainWindow.webContents.send('product:new', newProduct);
        WindowRegister.webContents.send('product:new', newProduct);
    });
    
const templateMenu = [
    
    {
        label: 'Añadir',
        accelerator: 'Ctrl+A',
        click(){
            CreateWindowRegister();
        }
    }
];

if(process.env.NODE_ENV !== 'production'){
    templateMenu.push({
        label: 'Devtools',
        submenu: [
            {
                label: 'show/hide devtools',
                accelerator: 'Ctrl+D',
                click(item, focusedWindow) {
                focusedWindow.toggleDevTools();
                }
            }
        ]
    })

};

