const { ipcMain } = require('electron/main');
const { loadData, deleteData, saveFiles, saveFile } = require('./fsUtils');

const itemSavePath = './assets/items';

ipcMain.on('saveItems', async (e, opt) => {
  if (opt.items) {
    saveFiles(itemSavePath, opt.items);
  }
});

ipcMain.handle('loadItems', async (e, opt) => {
  return await loadData(itemSavePath);
});

ipcMain.on('deleteItem', async (e, opt) => {
  if (opt.item) {
    const item = opt.item;
    const path = `${itemSavePath}/${item.source ? `${item.source}/` : ''}${
      item.uid
    }.txt`;

    deleteData(path);
  }
});

ipcMain.handle('saveItem', async (e, opt) => {
  if (opt.item) {
    const item = opt.item;
    const path = `${itemSavePath}${item.source ? `/${item.source}` : ''}`;

    return await saveFile(path, item);
  }
});
