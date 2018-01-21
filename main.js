const {app, BrowserWindow, ipcMain} = require('electron')
const request = require('request')
const path = require('path')
const url = require('url')
const rp = require('request-promise');
const scraper = require('./scraper')

var urlName = "http://nutrition.sa.ucsc.edu/"
var urlPrefix = "pickMenu.asp?locationNum="

var menuUrl = {}
menuUrl['Cowell/Stevonson'] = urlName + urlPrefix + "05"
menuUrl['Crown/Merrill'] = urlName + urlPrefix + "20"
menuUrl['Porter/Kresge'] = urlName + urlPrefix + "25"
menuUrl['Carson/Oakes'] = urlName + urlPrefix + "30"
menuUrl['College 9/10'] = urlName + urlPrefix + "40"

//type is Breakfast, Lunch, Dinner.
function getMealOptions(type,collegeName){
    return menuUrl[collegeName] + "&mealName=" + type
}

function getMenuNutrition(menu){
    return rp(menu).then(body =>{
        let regExp = /a href='[a-zA-Z0-9.?=&%']+/g
        let links = body.match(regExp)

        let stringLinks = []
        for(let i = 0; i < links.length; i++){
            stringLinks.push(links[i].toString())
        }
        for(let i = 0; i < stringLinks.length; i++){
            stringLinks[i] = stringLinks[i].slice(8, stringLinks[i].length-2)
            stringLinks[i] = urlName + stringLinks[i]
        }
        return stringLinks
    })
}
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

    scraper.parseCollege("College Nine and Ten", menuUrl['9.10'], function (college) {
        // console.log(college.breakfast[0].name)
        // console.log(college.breakfast[0].tags)
        // pushToFirebase(collegeMenu)
    })

    scraper.parseNutritionInfo("http://nutrition.sa.ucsc.edu/label.asp?locationNum=40&locationName=College+Nine+%26+Ten&dtdate=01%2F20%2F2018&RecNumAndPort=217004%2A2")
    scraper.parseNutritionInfo("http://nutrition.sa.ucsc.edu/label.asp?locationNum=40&locationName=College+Nine+%26+Ten&dtdate=01%2F20%2F2018&RecNumAndPort=089014%2A2")
})

app.on('window-all-closed',() =>{
    app.quit()
})


module.exports = {
    getMealOptions: getMealOptions,
    getMenuNutrition: getMenuNutrition
}