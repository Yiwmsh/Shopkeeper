const { ipcMain } = require('electron/main');
const { loadData, deleteData, saveFiles, saveFile } = require('./fsUtils');

const setSavePath = './assets/sets';

ipcMain.on('saveSets', async (e, opt) => {
  if (opt.sets) {
    saveFiles(setSavePath, opt.sets);
  }
});

ipcMain.handle('loadSets', async (e, opt) => {
  return await loadData(setSavePath);
});

ipcMain.on('deleteSet', async (e, opt) => {
  if (opt.set) {
    const set = opt.set;
    const path = `${setSavePath}/${set.source ? `${set.source}/` : ''}${
      set.uid
    }.txt`;

    deleteData(path);
  }
});

ipcMain.handle('saveSet', async (e, opt) => {
  if (opt.set) {
    const set = opt.set;
    const path = `${setSavePath}${set.source ? `/${set.source}` : ''}`;

    return await saveFile(path, set);
  }
});
