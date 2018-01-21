const {app, BrowserWindow, ipcMain} = require('electron')
const request = require('request')
const path = require('path')
const url = require('url')
const scraper = require('./scraper')

var urlName = "http://nutrition.sa.ucsc.edu/"
var urlPrefix = "menuSamp.asp?locationNum="
var nutPrefix = "picMenu.asp?locationNum="

const cowell = 'Cowell_Stevonson'
const crown = 'Crown_Merrill'
const porter = 'Porter_Kresge'
const carson = 'Carson_Oakes'
const nine = 'College_9_10'

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
    width: 900,
    height: 800,
    title: id
    })

    win.loadURL(url.format({
        pathname: path.join(__dirname, id + '.html'),
        protocol: 'file:',
        slashes: true
    }))
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
        // console.log("")
        //
        // console.log(college.breakfast[0].name)
        // console.log(college.breakfast[0].tags)
        // console.log(college.breakfast[0].nutritionInfo.info)
        //
        // console.log("")
        //
        // console.log(college.lunch[0].name)
        // console.log(college.lunch[0].tags)
        // console.log(college.lunch[0].nutritionInfo.info)
        //
        // console.log("")
        //
        // console.log(college.dinner[0].name)
        // console.log(college.dinner[0].tags)
        // console.log(college.dinner[0].nutritionInfo.info)
        //
        // console.log("")
        //
        // console.log(college.lateNight[0].name)
        // console.log(college.lateNight[0].tags)
        // console.log(college.lateNight[0].nutritionInfo.info)

        // pushToFront(nine, college)
        console.log("DONE")
    })

    scraper.parseCollege(carson, menuUrl[carson], function (college) {
        // pushToFront(carson, college)
        console.log("DONE")
    })

    scraper.parseCollege(cowell, menuUrl[cowell], function (college) {
        // pushToFront(cowell, college)
        console.log("DONE")
    })

    // scraper.parseCollege(porter, menuUrl[porter], function (college) {
    //     // pushToFront(porter, college)
    //     console.log("DONE")
    // })

    // scraper.parseCollege(crown, menuUrl[crown], function (college) {
    //     // pushToFront(crown, college)
    //     console.log("DONE")
    // })
})

app.on('window-all-closed',() =>{
    app.quit()
})
