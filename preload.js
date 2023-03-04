const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('$app', {
  close() {
    ipcRenderer.send('window-close')
  },
  // 这个主要是在不用devtool时从渲染层输出调试信息到控制台
  log(text) {
    console.log(text)
    ipcRenderer.send('log', text)
  }
})

contextBridge.exposeInMainWorld('$data', {
  getNotes: () => ipcRenderer.invoke('get-notes-data'),
  getNotesSync: () => ipcRenderer.sendSync('get-note-data-Sync'),
  updateOne(index, data) {
    ipcRenderer.send('update-note', index, data)
  },
  deleteOne(index) {
    ipcRenderer.send('delete-note', index)
  },
  insertOne(data) {
    ipcRenderer.send('insert-note', data)
  },
  getIndex: () => ipcRenderer.sendSync('getIndex')
})

contextBridge.exposeInMainWorld('$settings', {
  getsettingsData: () => ipcRenderer.sendSync('get-settings-data'),
  updatemarkdown() {
    ipcRenderer.send('update-markdown')
  }
})

contextBridge.exposeInMainWorld('$file', {
  openfile: () => ipcRenderer.sendSync('openfile'),
  savefile: (text) => ipcRenderer.sendSync('savefile', text),
})
