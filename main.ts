const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');
const isDev = require('electron-is-dev');

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: 'Electron Shell',
    width: 1000,
    height: 600,
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
