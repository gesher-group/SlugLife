const express = require('express')
const fs = require('fs')
const request = require('request')
//Cheerio used so we can use Jquery on the returned HTML
const cheerio = require('cheerio')
const app = express()


let crown = document.getElementById("crownFood")
let porter = document.getElementById("porterFood")
let nineTen = document.getElementById("0.10Food")
let carson = document.getElementById("carsonFood")


let allID = document.querySelectorAll('[id^=textbox]')

// for(let i in allID){
//     currentID = allID[i]
//     console.log(currentID.text())
// }


var collegeMenuSites = []
var menus = []
url = 'https://dining.ucsc.edu/eat/'

request(url, function (error, response, html) {
    if (!error) {
        console.log(html)
        var $ = cheerio.load(html)
        var data = $(this)

        menus = $(".archive-list").children();
        console.log(menus.length)
        
        for (let i = 0; i < menus.length; i++) {
            console.log(menus[i].text())
        }


    }
})
