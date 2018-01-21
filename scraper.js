const request = require('request')
const fd = require('./food')
const cl = require('./college')
const sp = require('scrapejs').init({
    cc: 2, // up to 2 concurrent requests
    delay: 2 * 1000 // delay 2 seconds before each request
});


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
            callback(college)
        })
        .fail(function (err) {
            console.log(err)
        })
 }

 function parseNutritionInfo(url) {
     sp.load(url)
         .then(function ($) {
             let nut = new fd.NutritionInfo()

             let servingSizeXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[1]/td[1]/font[3]"
             let servingSizeString = $.q(servingSizeXpath)[0].textContent
             let servingSize = parseInt(servingSizeString.substring(0, servingSizeString.indexOf(" ")))
             nut.add("Serving Size", servingSize)
             console.log("Serving Size " + nut.info["Serving Size"])

             let caloriesXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[1]/td[1]/font[4]"
             let caloriesString = $.q(caloriesXpath)[0].textContent
             let calories = parseInt(caloriesString.substring(9, caloriesString.length))
             nut.add("Calories", calories)
             console.log("Calories " + nut.info["Calories"])

             let fatCaloriesXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[1]/td[1]/font[5]"
             let fatCaloriesString = $.q(fatCaloriesXpath)[0].textContent
             let fatCalories = parseInt(fatCaloriesString.substring(22, fatCaloriesString.length))
             nut.add("Calories from Fat", fatCalories)
             console.log("Calories from Fat " + nut.info["Calories from Fat"])

             let fatCarbsXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[2]/td[3]/font[2]"
             addG($, nut, "Tot. Carb.", fatCarbsXpath)
             console.log("Tot. Carb. " + nut.info["Tot. Carb."])

             let dietaryFiberXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[3]/td[3]/font[2]"
             addG($, nut, "Dietary Fiber", dietaryFiberXpath)
             console.log("Dietary Fiber " + nut.info["Dietary Fiber"])

             let sugarsXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[4]/td[3]/font[2]"
             addG($, nut, "Sugars", sugarsXpath)
             console.log("Sugars " + nut.info["Sugars"])

             let totalFatXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[2]/td[1]/font[2]"
             addG($, nut, "Total Fat", totalFatXpath)
             console.log("Total Fat " + nut.info["Total Fat"])

             let satFatXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[3]/td[1]/font[2]"
             addG($, nut, "Sat. Fat", satFatXpath)
             console.log("Sat. Fat " + nut.info["Sat. Fat"])

             let transFatXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[4]/td[1]/font[2]"
             addG($, nut, "Trans Fat", transFatXpath)
             console.log("Trans Fat " + nut.info["Trans Fat"])

             let cholesterolXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[5]/td[1]/font[2]"
             addMG($, nut, "Cholesterol", cholesterolXpath)
             console.log("Cholesterol " + nut.info["Cholesterol"])

             let sodiumXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[6]/td[1]/font[2]"
             addMG($, nut, "Sodium", sodiumXpath)
             console.log("Sodium " + nut.info["Sodium"])

             let proteinXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[5]/td[3]/font[2]"
             addG($, nut, "Protein", proteinXpath)
             console.log("Protein " + nut.info["Protein"])

             let ironXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[7]/td/table/tbody/tr[3]/td[2]/table/tbody/tr/td/li/font[2]"
             addPer($, nut, "Iron", ironXpath)
             console.log("Iron " + nut.info["Iron"])



             console.log(" ")
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