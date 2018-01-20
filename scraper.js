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

url = 'https://dining.ucsc.edu/eat/'

request(url, function (error, response, html) {
    if (!error) {
        console.log(html)
        var $ = cheerio.load(html)
        var data = $(this)
        var expression = /<a class="btn btn-info" href="[a-zA-Z:\/.\?=0-9&;]*/g;
        var x = html.match(expression)

        console.log(x)
        
    
    }
})
