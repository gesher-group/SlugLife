const request = require('request')
const cheerio = require('cheerio')
const rp = require('request-promise');
const fd = require('./food')
const cl = require('./college')
const sp = require('scrapejs').init({
    cc: 50, // up to 2 concurrent requests
    delay: 2 * 100 // delay 2 seconds before each request
});

const cowell = 'Cowell_Stevonson'
const crown = 'Crown_Merrill'
const porter = 'Porter_Kresge'
const carson = 'Carson_Oakes'
const nine = 'College_9_10'


let nutUrl = {};
let urlName = "http://nutrition.sa.ucsc.edu/"
let nutPrefix = "pickMenu.asp?locationNum="

//type is Breakfast, Lunch, Dinner, or Late+Night
function getMealOptions(type, collegeName){
    return nutUrl[collegeName] + "&mealName=" + type
}

function getMenuNutrition(menuUrl){
    return rp(menuUrl).then(body =>{
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

nutUrl[cowell] = urlName + nutPrefix + "05"
nutUrl[crown] = urlName + nutPrefix + "20"
nutUrl[porter] = urlName + nutPrefix + "25"
nutUrl[carson] = urlName + nutPrefix + "30"
nutUrl[nine] = urlName + nutPrefix + "40"

 function parseCollege(name, url, callback) {
    sp.load(url)
        .then(function ($) {
            let college = new cl.College(name)
            let tableNums = $.q("/html/body/table[1]/tbody/tr").length
            // console.log(tableNums + "\n")
            for (x = 1; x <= tableNums; x++) {
                let xpath = "/html/body/table[1]/tbody/tr[" + x + "]/td/table/tbody/tr[2]/td/table/tbody/tr"
                let foodNums = $.q(xpath).length
                // console.log(foodNums)
                for (y = 1; y <= foodNums; y++) {
                    let xpathName = "/html/body/table[1]/tbody/tr[" + x + "]/td/table/tbody/tr[2]/td/table/tbody/tr[" + y + "]/td[1]/table/tbody/tr/td/div/span"
                    let foodName = $.q(xpathName)[0].textContent
                    let xpathColumns = "/html/body/table[1]/tbody/tr[" + x + "]/td/table/tbody/tr[2]/td/table/tbody/tr[" + y + "]/td[1]/table/tbody/tr/td"
                    let columnNums = $.q(xpathColumns).length
                    let food = new fd.Food(foodName)
                    college.addFood(food, x-1, y-1);
                    // console.log(foodName)
                    for (z = 2; z <= columnNums; z++) {
                        let xpathImg = "/html/body/table[1]/tbody/tr[" + x + "]/td/table/tbody/tr[2]/td/table/tbody/tr[" + y + "]/td[1]/table/tbody/tr/td[" + z + "]/img"
                        let imageName = $.q(xpathImg)[0].attributes[0].nodeValue
                        let start = imageName.indexOf("/")
                        let end = imageName.indexOf(".")
                        imageName = imageName.substring(start + 1, end)
                        food.addTag(imageName)
                        // console.log(imageName)
                    }
                }
            }

            fucky(name, college, function(newCollege) {
                callback(newCollege)
            })
        })
        .fail(function (err) {
            console.log(err)
        })
 }

 function fucky(name, college, callback) {
     let menuCounter = 0

     // Breakfast
     let breakfastURL = getMealOptions("Breakfast", name)
     console.log(breakfastURL)
     getMenuNutrition(breakfastURL).then(function(nutLinks) {
         console.log(nutLinks.length)
         for(let i = 0; i < nutLinks.length; i++) {
             parseNutritionInfo(nutLinks[i], function(nut) {
                 college.breakfast[i].addNutritionInfo(nut)
                 if(i === nutLinks.length - 1) {
                     menuCounter++;
                     // console.log("DONE 1")
                     if(menuCounter === 4) {
                         callback(college)
                     }
                 }
             })
         }
     })

     // Lunch
     let lunchURL = getMealOptions("Lunch", name)
     console.log(lunchURL)
     getMenuNutrition(lunchURL).then(function(nutLinks) {
         console.log(nutLinks.length)
         for(let i = 0; i < nutLinks.length; i++) {
             parseNutritionInfo(nutLinks[i], function(nut) {
                 // console.log(college.lunch[i].name + " " + i + " " + (nutLinks.length - 1))
                 if(name === carson) {
                     if(i >= 3)
                        college.lunch[i - 3].addNutritionInfo(nut)
                 } else {
                     college.lunch[i].addNutritionInfo(nut)
                 }
                 if(i === nutLinks.length - 1 ||
                    name === carson && i === nutLinks.length - 1 - 3 ||
                    name === cowell && i === nutLinks.length - 1 - 1) {
                     menuCounter++;
                     // console.log("DONE 2")
                     if(menuCounter === 4) {
                         callback(college)
                     }
                 }
             })
         }
     })

     // Dinner
     let dinnerURL = getMealOptions("Dinner", name)
     console.log(dinnerURL)
     getMenuNutrition(dinnerURL).then(function(nutLinks) {
         console.log(nutLinks.length)
         for(let i = 0; i < nutLinks.length; i++) {
             parseNutritionInfo(nutLinks[i], function(nut) {
                 college.dinner[i].addNutritionInfo(nut)
                 if(i === nutLinks.length - 1) {
                     menuCounter++;
                     // console.log("DONE 3")
                     if(menuCounter === 4) {
                         callback(college)
                     }
                 }
             })
         }
     })

     // Late Night
     if(college.lateNight.length !== 0) {
         let lateNightURL = getMealOptions("Late+Night", name)
         console.log(lateNightURL)
         getMenuNutrition(lateNightURL).then(function (nutLinks) {
             console.log(nutLinks.length)
             console.log(nutLinks[0])
             for (let i = 0; i < nutLinks.length; i++) {
                 parseNutritionInfo(nutLinks[i], function (nut) {
                     college.lateNight[i].addNutritionInfo(nut)
                     if (i === nutLinks.length - 1) {
                         menuCounter++;
                         // console.log("DONE 4")
                         if(menuCounter === 4) {
                             callback(college)
                         }
                     }
                 })
             }
         })
     } else {
         menuCounter++;
         if(menuCounter === 4) {
             callback(college)
         }
     }
 }

 function parseNutritionInfo(url, callback) {
     sp.load(url)
         .then(function ($) {
             let nut = new fd.NutritionInfo()

             nut.html = $("table").html()

             let servingSizeXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[1]/td[1]/font[3]"
             let servingSizeString = $.q(servingSizeXpath)[0].textContent
             let servingSize = parseInt(servingSizeString.substring(0, servingSizeString.indexOf(" ")))
             nut.add("Serving Size", servingSize)
             // console.log("Serving Size " + nut.info["Serving Size"])

             let caloriesXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[1]/td[1]/font[4]"
             let caloriesString = $.q(caloriesXpath)[0].textContent
             let calories = parseInt(caloriesString.substring(9, caloriesString.length))
             nut.add("Calories", calories)
             // console.log("Calories " + nut.info["Calories"])

             let fatCaloriesXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[1]/td[1]/font[5]"
             let fatCaloriesString = $.q(fatCaloriesXpath)[0].textContent
             let fatCalories = parseInt(fatCaloriesString.substring(22, fatCaloriesString.length))
             nut.add("Calories from Fat", fatCalories)
             // console.log("Calories from Fat " + nut.info["Calories from Fat"])

             let fatCarbsXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[2]/td[3]/font[2]"
             addG($, nut, "Tot. Carb.", fatCarbsXpath)
             // console.log("Tot. Carb. " + nut.info["Tot. Carb."])

             let dietaryFiberXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[3]/td[3]/font[2]"
             addG($, nut, "Dietary Fiber", dietaryFiberXpath)
             // console.log("Dietary Fiber " + nut.info["Dietary Fiber"])

             let sugarsXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[4]/td[3]/font[2]"
             addG($, nut, "Sugars", sugarsXpath)
             // console.log("Sugars " + nut.info["Sugars"])

             let totalFatXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[2]/td[1]/font[2]"
             addG($, nut, "Total Fat", totalFatXpath)
             // console.log("Total Fat " + nut.info["Total Fat"])

             let satFatXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[3]/td[1]/font[2]"
             addG($, nut, "Sat. Fat", satFatXpath)
             // console.log("Sat. Fat " + nut.info["Sat. Fat"])

             let transFatXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[4]/td[1]/font[2]"
             addG($, nut, "Trans Fat", transFatXpath)
             // console.log("Trans Fat " + nut.info["Trans Fat"])

             let cholesterolXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[5]/td[1]/font[2]"
             addMG($, nut, "Cholesterol", cholesterolXpath)
             // console.log("Cholesterol " + nut.info["Cholesterol"])

             let sodiumXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[6]/td[1]/font[2]"
             addMG($, nut, "Sodium", sodiumXpath)
             // console.log("Sodium " + nut.info["Sodium"])

             let proteinXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[5]/td[3]/font[2]"
             addG($, nut, "Protein", proteinXpath)
             // console.log("Protein " + nut.info["Protein"])

             let ironXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[7]/td/table/tbody/tr[3]/td[2]/table/tbody/tr/td/li/font[2]"
             addPer($, nut, "Iron", ironXpath)
             // console.log("Iron " + nut.info["Iron"])

             let vitAXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[7]/td/table/tbody/tr[3]/td[4]/table/tbody/tr/td/li/font[2]"
             addPer($, nut, "Vit A", vitAXpath)
             // console.log("Vit A " + nut.info["Vit A"])

             let vitCXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[7]/td/table/tbody/tr[4]/td[1]/table/tbody/tr/td[1]/font[2]"
             addPer($, nut, "Vit C", vitCXpath)
             // console.log("Vit C " + nut.info["Vit C"])

             let vitBXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[7]/td/table/tbody/tr[4]/td[2]/table/tbody/tr/td/li/font[2]"
             addPer($, nut, "Vit B", vitBXpath)
             // console.log("Vit B " + nut.info["Vit B"])

             let satFatPerXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[3]/td[2]/font[1]"
             nut.add("Sat. Fat Per", $.q(satFatPerXpath)[0].textContent)
             // console.log("Sat. Fat Per " + nut.info["Sat. Fat Per"])
             //console.log($.q(satFatPerXpath)[0].textContent)

             let totCarbPerXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[2]/td[4]/font[1]"
             nut.add("Tot Carb Per", $.q(totCarbPerXpath)[0].textContent)
             // console.log("Tot Carb Per " + nut.info["Tot Carb Per"])

             let fiberPerXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[3]/td[4]/font[1]"
             nut.add("Fiber Per", $.q(fiberPerXpath)[0].textContent)
             // console.log("Fiber Per " + nut.info["Fiber Per"])

             let cholPerXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[5]/td[2]/font[1]"
             nut.add("Chol Per", $.q(cholPerXpath)[0].textContent)
             // console.log("Chol Per " + nut.info["Chol Per"])

             let sodPerXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[6]/td[2]/font[1]"
             nut.add("Sod Per", $.q(sodPerXpath)[0].textContent)
             // console.log("Sod Per " + nut.info["Sod Per"])

             // console.log(" ")

             callback(nut)
         })
 }

 function addG($, nut, name, xpath) {
     let str = $.q(xpath)[0].textContent
     let grams = parseFloat(str.substring(0, str.length - 1))
     nut.add(name, grams)
 }

 function addMG($, nut, name, xpath) {
     let str = $.q(xpath)[0].textContent
     let grams = parseFloat(str.substring(0, str.length - 2))
     nut.add(name, grams)
 }

 function addPer($, nut, name, xpath) {
     let str = $.q(xpath)[0].textContent
     let grams = parseInt(str.substring(0, str.length - 1))
     nut.add(name, grams)
 }

module.exports = {
    parseCollege: parseCollege,
    parseNutritionInfo: parseNutritionInfo
}