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
             console.log(nut.info["Serving Size"])

             let caloriesXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[1]/td[1]/font[4]"
             let caloriesString = $.q(caloriesXpath)[0].textContent
             let calories = parseInt(caloriesString.substring(9, caloriesString.length))
             nut.add("Calories", calories)
             console.log(nut.info["Calories"])

             let fatCaloriesXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[1]/td[1]/font[5]"
             let fatCaloriesString = $.q(fatCaloriesXpath)[0].textContent
             let fatCalories = parseInt(fatCaloriesString.substring(22, fatCaloriesString.length))
             nut.add("Calories from Fat", fatCalories)
             console.log(nut.info["Calories from Fat"])

             let fatCarbsXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[2]/td[3]/font[2]"
             addGram($, nut, "Tot. Carb.", fatCarbsXpath)
             console.log(nut.info["Tot. Carb."])

             let dietaryFiberXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[3]/td[3]/font[2]"
             addGram($, nut, "Dietary Fiber", dietaryFiberXpath)
             console.log(nut.info["Dietary Fiber"])

             let sugarsXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[4]/td[3]/font[2]"
             addGram($, nut, "Sugars", sugarsXpath)
             console.log(nut.info["Sugars"])

             let sugarsXpath = "/html/body/table[1]/tbody/tr/td/table/tbody/tr[4]/td[3]/font[2]"
             addGram($, nut, "Sugars", sugarsXpath)
             console.log(nut.info["Sugars"])


             console.log(" ")
         })
 }

 function addGram($, nut, name, xpath) {
     let str = $.q(xpath)[0].textContent
     let grams = parseFloat(str.substring(0, str.length - 1))
     nut.add(name, grams)
 }

module.exports = {
    parseCollege: parseCollege,
    parseNutritionInfo: parseNutritionInfo
}