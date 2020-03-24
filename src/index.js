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
        icon: path.join(__dirname, '../assets/icons/win/icon.ico')
        

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
    
});

const CreateWindowRegister = ()=> {


    WindowRegister = new BrowserWindow({

        webPreferences: {
            nodeIntegration: true
        },
        frame: true,
        width: 500,
        height: 684,
        minimizable : true,
        maximizable : true,
        resizable : false,
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
    })

};

module.exports.CreateWindowEdit = () => {
    WindowEdit = new BrowserWindow({
    
        webPreferences: {
            nodeIntegration: true
        },
        frame: true,
        width: 822,
        height: 694,
        minimizable : true,
        maximizable : true,
        resizable : true,
        parent: mainWindow,
        modal: true,
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

});
    
    ipcMain.on('product:new', (e, newProduct) => {
        console.log(newProduct);
        mainWindow.webContents.send('product:new', newProduct);
        WindowRegister.webContents.send('product:new', newProduct);
    });
    
const templateMenu = [
    
    {
        label: 'AÑADIR',
        accelerator: 'Ctrl+A',
        click(){
            CreateWindowRegister();
        }
    },
    {
        role: 'RELOAD'
    },
    {
        label: 'SALIR',
        accelerator: 'Ctrl+S',
        click(){
            app.quit();
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
