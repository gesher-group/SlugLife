const {app, BrowserWindow, ipcMain} = require('electron')

const path = require('path')
const url = require('url')


var urlName = "http://nutrition.sa.ucsc.edu/"
var urlPrefix = "menuSamp.asp?locationNum="
var urlSuffix = "&locationName=&sName=&naFlag="

//Example to call url to 9/10 
//console.log(menuUrl['9/10'])
var menuUrl = {}
menuUrl['Cowell/Stevonson'] = urlName + urlPrefix + "05" + urlSuffix
menuUrl['Crown/Merrill'] = urlName + urlPrefix + "20" + urlSuffix
menuUrl['Porter/Kresge'] = urlName + urlPrefix + "25" + urlSuffix
menuUrl['Carson/Oakes'] = urlName + urlPrefix + "30" + urlSuffix
menuUrl['9.10'] = urlName + urlPrefix + "40" + urlSuffix



let win = null

function openDiningHallMenu (id){
        

}



app.on('ready', function(){
    win = new BrowserWindow(
        {
            width: 1000,
            height: 1000,
            resizable: false,
            frame: true
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

      ipcMain.on('open-menu', function(id){
          
      })
})

app.on('window-all-closed',() =>{
    app.quit()
})