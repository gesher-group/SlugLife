const request = require('request')
const sp = require('scrapejs').init({
    cc: 2, // up to 2 concurrent requests
    delay: 2 * 1000 // delay 2 seconds before each request
 });


function parseCollegeMenu(url) {
    sp.load(url)
        .then(function ($) {
            var tableNums = $.q("/html/body/table[1]/tbody/tr").length
            console.log(tableNums + "\n")
            for (x = 1; x <= tableNums; x++) {
                var xpath = "/html/body/table[1]/tbody/tr[" + x + "]/td/table/tbody/tr[2]/td/table/tbody/tr"
                var foodNums = $.q(xpath).length
                console.log(foodNums)
                for (y = 1; y <= foodNums; y++) {
                    var xpathName = "/html/body/table[1]/tbody/tr[" + x + "]/td/table/tbody/tr[2]/td/table/tbody/tr[" + y + "]/td[1]/table/tbody/tr/td/div/span"
                    var foodName = $.q(xpathName)[0].textContent
                    var xpathColumns = "/html/body/table[1]/tbody/tr[" + x + "]/td/table/tbody/tr[2]/td/table/tbody/tr[" + y + "]/td[1]/table/tbody/tr/td"
                    var columnNums = $.q(xpathColumns).length
                    console.log(foodName)
                    for (z = 2; z <= columnNums; z++) {
                        var xpathImg = "/html/body/table[1]/tbody/tr[" + x + "]/td/table/tbody/tr[2]/td/table/tbody/tr[" + y + "]/td[1]/table/tbody/tr/td[" + z + "]/img"
                        var imageName = $.q(xpathImg)[0].attributes[0].nodeValue
                        console.log(imageName)
                    }
                }
            }
        })
        .fail(function (err) {
            console.log(err);
        })
 }