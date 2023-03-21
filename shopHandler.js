const { ipcMain } = require('electron/main');
const fs = require('fs');

const shopSavePath = './assets/shops.txt';

ipcMain.on('saveShops', async (e, opt) => {
  if (opt.shops) {
    try {
      const shops = opt.shops;
      fs.writeFile(shopSavePath, JSON.stringify(shops), (err) => {
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

ipcMain.handle('loadShops', async (e, opt) => {
  return await loadShops();
});

const loadShops = async () => {
  let result = [];

  try {
    const data = fs.readFileSync(shopSavePath, { encoding: 'utf-8' });
    result = eval(data);
  } catch (e) {
    result = e;
  }
  return result;
};
