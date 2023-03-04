const { app, BrowserWindow, ipcMain, shell, dialog, globalShortcut } = require('electron')
const path = require('path')
const fs = require('fs')
//输入存储
const NOTE_PATH = path.join(__dirname, './data/notes.json')
const SETTINGS_PATH = path.join(__dirname, './data/settings.json')


if (!fs.existsSync(NOTE_PATH)) {
    fs.mkdirSync(path.join(__dirname, './data'))
    fs.writeFileSync(NOTE_PATH, '[]')
    fs.writeFileSync(SETTINGS_PATH, '[{"markdown":true}]')
}

const getNotesData = () => JSON.parse(fs.readFileSync(NOTE_PATH))

//设置存储

const getsettingsData = () => JSON.parse(fs.readFileSync(SETTINGS_PATH));

const createWindow = () => {
    const win = new BrowserWindow({
        // width: 900,
        // height: 600,
        width: 1200,
        height: 800,
        frame: false,
        transparent: true,
        show: false,
        resizable: false,
        maximizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
        icon: path.join(__dirname, './public/logo.ico')
    })
    win.loadURL('http://localhost:8080/')
    // win.loadFile(path.join(__dirname, './dist/index.html'))

    //  开发者工具
    // win.webContents.openDevTools()



    //接管链接并从系统默认浏览器打开
    win.webContents.on('will-navigate', function (e, url) {
        e.preventDefault();
        shell.openExternal(url);
    });
    win.on('ready-to-show', () => {
        win.show()
    })
    //数据操作
    ipcMain.handle('get-notes-data', () => getNotesData())

    ipcMain.on('get-note-data-Sync', (event) => {
        event.returnValue = getNotesData()
    })

    ipcMain.on('insert-note', (event, data) => {
        let notesData = getNotesData()
        notesData.unshift(data)
        fs.writeFileSync(NOTE_PATH, JSON.stringify(notesData))
    })

    ipcMain.on('update-note', (event, index, data) => {
        let notesData = getNotesData()
        notesData[index] = data
        fs.writeFileSync(NOTE_PATH, JSON.stringify(notesData))
    })

    ipcMain.on('delete-note', (event, index) => {
        let notesData = getNotesData()
        notesData.splice(index, 1)
        fs.writeFileSync(NOTE_PATH, JSON.stringify(notesData))
    })
    //获取data.json最后一个索引
    ipcMain.on('getIndex', (event) => {
        event.returnValue = getNotesData().length - 1
    })
    //配置文件操作
    ipcMain.on('get-settings-data', (event, message) => {

        event.returnValue = getsettingsData();
    })

    ipcMain.on('update-markdown', (event) => {
        let settingsData = getsettingsData()
        settingsData.markdown = !settingsData.markdown
        fs.writeFileSync(SETTINGS_PATH, JSON.stringify(settingsData))
    })

    //文件操作
    ipcMain.on('openfile', (event) => {
        dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [{ name: 'Markdown', extensions: ['md'] }]
        }).then(res => {
            let text = fs.readFileSync(res.filePaths[0]).toString()
            // console.log(text)
            event.returnValue = text
        }).catch(err => {
            event.returnValue = false
        })

    })

    ipcMain.on('savefile', (event, message) => {
        let text = dialog.showSaveDialogSync({
            filters: [{ name: 'Markdown', extensions: ['md'] }]
        })

        try {
            fs.writeFileSync(text, message)
            event.returnValue = true
        } catch (err) {
            event.returnValue = false
        }

    })


    ipcMain.on('window-close', () => {
        win.close()
    })

    ipcMain.on('log', (event, text) => {
        console.log(text)
    })


}

// 防止调用开发者工具
// app.whenReady().then(() => {
//     globalShortcut.register('CommandOrControl+Shift+I', () => {
//         console.log('Not do anything unsafe!')
//     })
// }).then(createWindow)

//允许调用开发者工具
app.whenReady().then(() => {
    createWindow()
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})