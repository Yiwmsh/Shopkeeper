const { ipcMain } = require('electron/main');
const fs = require('fs');

const setSavePath = './assets/sets.txt';

ipcMain.on('saveSets', async (e, opt) => {
  if (opt.sets) {
    try {
      const sets = opt.sets;
      fs.writeFile(setSavePath, JSON.stringify(sets), (err) => {
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

ipcMain.handle('loadSets', async (e, opt) => {
  return await loadSets();
});

const loadSets = async () => {
  let result = [];

  try {
    const data = fs.readFileSync(setSavePath, { encoding: 'utf-8' });
    result = eval(data);
  } catch (e) {
    result = e;
  }
  return result;
};
