const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');
const isDev = require('electron-is-dev');
require('./data handlers/itemHandler');
require('./data handlers/setHandler');
require('./data handlers/shopHandler');

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: 'Electron Shell',
    width: 1100,
    height: 700,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  const startUrl = isDev
    ? 'http://localhost:3000'
    : url.format({
        pathname: path.join(__dirname, './build/index.html'),
        protocol: 'file',
      });

  mainWindow.loadURL(startUrl);

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.whenReady().then(createMainWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createMainWindow();
  }
});
