const { ipcMain } = require('electron/main');
const { loadData, deleteData, saveFiles, saveFile } = require('./fsUtils');

const shopSavePath = './assets/shops';

ipcMain.on('saveShops', async (e, opt) => {
  if (opt.shops) {
    saveFiles(shopSavePath, opt.shops);
  }
});

ipcMain.handle('loadShops', async (e, opt) => {
  return await loadData(shopSavePath);
});

ipcMain.on('deleteShop', async (e, opt) => {
  if (opt.shop) {
    const shop = opt.shop;
    const path = `${shopSavePath}/${shop.source ? `${shop.source}/` : ''}${
      shop.uid
    }.txt`;

    deleteData(path);
  }
});

ipcMain.handle('saveShop', async (e, opt) => {
  if (opt.shop) {
    const shop = opt.shop;
    const path = `${shopSavePath}${shop.source ? `/${shop.source}` : ''}`;

    return await saveFile(path, shop);
  }
});
