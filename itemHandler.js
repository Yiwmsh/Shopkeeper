const { ipcMain } = require('electron/main');
const fs = require('fs');

const itemSavePath = './assets/items.txt';

ipcMain.on('saveItems', async (e, opt) => {
  if (opt.items) {
    try {
      const items = opt.items;
      fs.writeFile(itemSavePath, JSON.stringify(items), (err) => {
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

ipcMain.handle('loadItems', async (e, opt) => {
  return await loadItems();
});

const loadItems = async () => {
  let result = [];

  try {
    const data = fs.readFileSync(itemSavePath, { encoding: 'utf-8' });
    result = eval(data);
  } catch (e) {
    result = e;
  }
  return result;
};
