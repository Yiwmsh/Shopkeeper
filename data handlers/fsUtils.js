const { readdir } = require('fs/promises');
const fs = require('fs');

const getDirectories = async (source) =>
  (await readdir(source, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const getFiles = async (source) =>
  (await readdir(source, { withFileTypes: true }))
    .filter((dirent) => dirent.isFile())
    .map((dirent) => dirent.name);

const loadFilesFromDir = async (rootPath, dir) => {
  const result = [];

  const searchDir = `${rootPath}${dir ? `/${dir}` : ''}`;

  const files = await getFiles(searchDir);

  for (const file of files) {
    const data = fs.readFileSync(`${rootPath}${dir ? `/${dir}` : ''}/${file}`, {
      encoding: 'utf-8',
    });
    const obj = JSON.parse(data);
    if (dir) {
      obj.source = dir;
    }
    result.push(obj);
  }

  return result;
};

const loadSubData = async (rootPath, subDirs) => {
  const result = [];
  const subDirectories = await getDirectories(`${rootPath}/${subDirs}`);

  const items = await loadFilesFromDir(rootPath, subDirs);

  if (items && items.length > 0) {
    result.push(...items);
  }

  for (const dir of subDirectories) {
    result.push(...(await loadSubData(rootPath, `${subDirs}/${dir}`)));
  }

  return result;
};

const loadData = async (rootPath) => {
  let result = [];
  const dirMade = await fs.promises.mkdir(rootPath, { recursive: true });
  const subDirectories = await getDirectories(rootPath);

  const items = await loadFilesFromDir(rootPath);

  if (items && items.length > 0) {
    result.push(...items);
  }

  for (const dir of subDirectories) {
    result.push(...(await loadSubData(rootPath, dir)));
  }

  return result;
};

const saveFiles = async (rootPath, data) => {
  try {
    for (const obj of data) {
      const path = `${rootPath}/${obj.source ? `${obj.source}/` : ''}/${
        obj.uid
      }.txt`;
      fs.mkdir(
        `${rootPath}/${obj.source ? obj.source + '/' : ''}`,
        { recursive: true },
        (err) => {
          if (err) throw err;

          fs.writeFile(path, JSON.stringify(obj), (err) => {
            if (err) {
              console.log(err);
            }
          });
        }
      );
    }
  } catch (e) {
    console.log(e);
  }
};

const deleteData = async (path) => {
  fs.unlink(path, async (err) => {
    if (err) {
      throw err;
    }

    const dirs = path.split('/');

    for (let i = dirs.length - 2; i >= 0; i--) {
      const tempPath = dirs.filter((dir, index) => index <= i).join('/');
      const files = await getFiles(tempPath);
      const subDirs = await getDirectories(tempPath);
      const isEmpty = files.length === 0 && subDirs.length === 0;
      if (isEmpty) {
        fs.rmdir(tempPath, () => {});
      }
    }
  });
};

const saveFile = async (path, data) => {
  fs.mkdir(path, { recursive: true }, (err) => {
    if (err) {
      throw err;
    }

    fs.writeFile(`${path}/${data.uid}.txt`, JSON.stringify(data), (err) => {
      if (err) {
        throw err;
      }
    });
  });
};

module.exports = {
  getDirectories,
  getFiles,
  loadData,
  saveFiles,
  saveFile,
  deleteData,
};
