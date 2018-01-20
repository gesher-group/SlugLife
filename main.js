const {app, BrowserWindow} = require('electron')

const path = require('path')
const url = require('url')

let win = null

function createWindow (){
    win = new BrowserWindow(
        {
            width: 1000,
            height: 1000,
            resizable: false,
            frame: false
        }
    )
    win.setMenu(null)

    //loading index.html. 
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
      }))
      
      win.webContents.openDevTools()

}


app.on('ready', createWindow)

app.on('window-all-closed',() =>{
    app.quit()
})