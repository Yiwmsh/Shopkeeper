const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');
const isDev = require('electron-is-dev');
const { ipcMain } = require('electron/main');
const fs = require('fs');

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: 'Electron Shell',
    width: 1000,
    height: 600,
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

ipcMain.on('saveItems', async (e, opt) => {
  if (opt.items) {
    try {
      const items = opt.items;
      fs.writeFile('./assets/items.txt', JSON.stringify(items), (err) => {
        if (err) {
          console.log(err);
        }
      });
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log('Nothing doing.');
  }
});
