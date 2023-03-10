const { contextBridge, ipcRenderer } = require('electron');
const os = require('os');

contextBridge.exposeInMainWorld('electron', {
  homeDir: () => os.homeDir(),
  osVersion: () => os.arch(),
});

contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel, data) => ipcRenderer.send(channel, data),
  // on: (channel, func) =>
  //   ipcRenderer.on(channel, (event, ...args) => func(event, ...args)),
  invoke: (channel, data) => ipcRenderer.invoke(channel, data),
});
