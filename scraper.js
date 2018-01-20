const request = require('request')

var urlName = "http://nutrition.sa.ucsc.edu/"

var urlPrefix = "menuSamp.asp?locationNum="
var urlSuffix = "&locationName=&sName=&naFlag="
var menuUrl = {}
menuUrl['Cowell/Stevonson'] = urlName + urlPrefix + "05" + urlSuffix
menuUrl['Crown/Merrill'] = urlName + urlPrefix + "20" + urlSuffix
menuUrl['Porter/Kresge'] = urlName + urlPrefix + "25" + urlSuffix
menuUrl['Carson/Oakes'] = urlName + urlPrefix + "30" + urlSuffix
menuUrl['9/10'] = urlName + urlPrefix + "40" + urlSuffix

//Example to call url to 9/10 
//console.log(menuUrl['9/10'])