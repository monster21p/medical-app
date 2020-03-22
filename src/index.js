const {app, BrowserWindow, Menu, ipcMain} = require('electron');
const url = require('url');
const path = require('path');

if(process.env.NODE_ENV !== 'production'){
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    });
};

let mainWindow;
let newProductWindow;

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
        pathname: path.join(__dirname, 'views/tabla.html'),
        protocol: 'file',
        slashes: true
        
    }));
    //createNewProductWindow();
    mainWindow.on('closed', () => {
        app.quit();
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
    
});

function createNewProductWindow(){


    newProductWindow = new BrowserWindow({

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
    newProductWindow.setMenu(null);
    newProductWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/registrar.html'),
        protocol: 'file',
        slashes: true
    }));

    newProductWindow.on('closed', () => {
        newProductWindow = null;
    })

};

    ipcMain.on('product:new', (e, newProduct) => {
        console.log(newProduct);
        mainWindow.webContents.send('product:new', newProduct);
        newProductWindow.webContents.send('product:new', newProduct);
        //win2.webContents.send('product:new', newProduct);
        //newProductWindow.close();
    });

const templateMenu = [
    
    {
        label: 'Añadir',
        accelerator: 'Ctrl+A',
        click(){
            createNewProductWindow();
        }
    },
    {
        role: 'reload'
    },
    {
        label: 'Salir',
        accelerator: process.platform == 'darwin' ? 'command+Q' : 'Ctrl+S',
        click(){
            app.quit();
        }
    }
];
/*
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

}
*/