const {app, BrowserWindow, ipcMain} = require('electron')
const request = require('request')
const path = require('path')
const url = require('url')
const scraper = require('./scraper')

var urlName = "http://nutrition.sa.ucsc.edu/"
var urlPrefix = "menuSamp.asp?locationNum="
var nutPrefix = "picMenu.asp?locationNum="

const cowell = 'Cowell/Stevonson'
const crown = 'Crown/Merrill'
const porter = 'Porter/Kresge'
const carson = 'Carson/Oakes'
const nine = 'College 9/10'

var menuUrl = {}
menuUrl[cowell] = urlName + urlPrefix + "05"
menuUrl[crown] = urlName + urlPrefix + "20"
menuUrl[porter] = urlName + urlPrefix + "25"
menuUrl[carson] = urlName + urlPrefix + "30"
menuUrl[nine] = urlName + urlPrefix + "40"

//Example function call.
// getMenuNutrition(getMealOptions("Breakfast", 'College 9/10')).then(links =>{
//     console.log(links)
//  })

let win = null
var diningMenus = null

function openDiningHallMenu (id){
        let win = new BrowserWindow({
        width: 500,
        height: 500,
        title: id
})
    win.show()
}


app.on('ready', function(){
    win = new BrowserWindow(
        {
            width: 1000,
            height: 800,
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

    ipcMain.on('open-menu', function(event, id){
        openDiningHallMenu(id)
    })

    scraper.parseCollege(nine, menuUrl[nine], function (college) {
        console.log(college.breakfast[0].name)
        console.log(college.breakfast[0].tags)
        console.log(college.breakfast[0].nutritionInfo.info)
        // pushToFirebase(collegeMenu)
    })

    // getMenuNutrition(getMealOptions("Breakfast", 'College 9/10')).then(links =>{
    //     console.log(links)
    // })
    //
    // scraper.parseNutritionInfo("http://nutrition.sa.ucsc.edu/label.asp?locationNum=40&locationName=College+Nine+%26+Ten&dtdate=01%2F20%2F2018&RecNumAndPort=217004%2A2")
    // scraper.parseNutritionInfo("http://nutrition.sa.ucsc.edu/label.asp?locationNum=40&locationName=College+Nine+%26+Ten&dtdate=01%2F20%2F2018&RecNumAndPort=089014%2A2")
})

app.on('window-all-closed',() =>{
    app.quit()
})
