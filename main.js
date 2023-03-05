const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');
const isDev = require('electron-is-dev');
require('./itemHandler.js');
require('./setHandler.js');

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: 'Electron Shell',
    width: 1100,
    height: 700,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.resolve('./preload.js'),
    },
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  const startUrl = isDev
    ? 'http://localhost:3000'
    : url.format({
        pathname: path.join(__dirname, './app/build/index.html'),
        protocol: 'file',
      });

  mainWindow.loadURL(startUrl);
}

app.whenReady().then(createMainWindow);
