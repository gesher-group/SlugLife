const scraper = require('./scraper')
const fs = require('fs');
const request = require('request')
const cheerio = require('cheerio')
const rp = require('request-promise');
const fd = require('./food')
const cl = require('./college')
const sp = require('scrapejs').init({
    cc: 50, // up to 2 concurrent requests
    delay: 2 * 100 // delay 2 seconds before each request
});

var urlName = "http://nutrition.sa.ucsc.edu/"
var urlPrefix = "menuSamp.asp?locationNum="
scraper.parseCollege('College_9_10', urlName + urlPrefix + "40", function (college) {
    console.log("HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
    document.getElementById("inject").innerHTML = "hi"
})
