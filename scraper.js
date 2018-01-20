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
var links = []
url = 'https://dining.ucsc.edu/eat/'

request(url, function (error, response, html) {
    if (!error) {
        let $ = cheerio.load(html)
        var data = $(this)
        var expression = /<a class="btn btn-info" href="[a-zA-Z:\/.\?=0-9&;]*/g;
        var wholeLink = html.match(expression)

        

        for (let i = 0; i<wholeLink.length; i++){
        	var parsing = wholeLink[i].split('<a class="btn btn-info" href="')
        	links.push(parsing[1])
        }


    }

    links.splice(5,9) //remove the extra links.

    for (let i = 0; i < links.length; i++){
    
        request(links[i], function(error,response, html) {
            let $ = cheerio.load(html)
            let title = $("[title^='main']")
            collegeMenuSites.push(title["0"].attribs.src)
        })
    }
    
})



