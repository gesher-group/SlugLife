var {ipcRenderer} = require('electron')

function openMenu(element){
  ipcRenderer.send('open-menu', element.id)
}

var color = "RED"

function highlight(container,what,spanClass) {
    var content = container.innerHTML,
        pattern = new RegExp('(>[^<.]*)(' + what + ')([^<.]*)','g'),
        replaceWith = '$1<span ' + ( spanClass ? 'class="' + spanClass + '"' : '' ) + '">$2</span>$3',
        highlighted = content.replace(pattern,replaceWith);
    return (container.innerHTML = highlighted) !== content;
}

$('.open-overlay').click(function() {
  var overlay_navigation = $('.overlay-navigation'),
    nav_item_1 = $('nav li:nth-of-type(1)'),
    nav_item_2 = $('nav li:nth-of-type(2)'),
    nav_item_3 = $('nav li:nth-of-type(3)'),
    nav_item_4 = $('nav li:nth-of-type(4)'),
    nav_item_5 = $('nav li:nth-of-type(5)'),
    top_bar = $('.bar-top'),
    middle_bar = $('.bar-middle'),
    bottom_bar = $('.bar-bottom');

  overlay_navigation.toggleClass('overlay-active')
  if (overlay_navigation.hasClass('overlay-active')) {

    top_bar.removeClass('animate-out-top-bar').addClass('animate-top-bar')
    middle_bar.removeClass('animate-out-middle-bar').addClass('animate-middle-bar')
    bottom_bar.removeClass('animate-out-bottom-bar').addClass('animate-bottom-bar')
    overlay_navigation.removeClass('overlay-slide-up').addClass('overlay-slide-down')
    nav_item_1.removeClass('slide-in-nav-item-reverse').addClass('slide-in-nav-item')
    nav_item_2.removeClass('slide-in-nav-item-delay-1-reverse').addClass('slide-in-nav-item-delay-1')
    nav_item_3.removeClass('slide-in-nav-item-delay-2-reverse').addClass('slide-in-nav-item-delay-2')
    nav_item_4.removeClass('slide-in-nav-item-delay-3-reverse').addClass('slide-in-nav-item-delay-3')
    nav_item_5.removeClass('slide-in-nav-item-delay-4-reverse').addClass('slide-in-nav-item-delay-4')
  } else {
    top_bar.removeClass('animate-top-bar').addClass('animate-out-top-bar')
    middle_bar.removeClass('animate-middle-bar').addClass('animate-out-middle-bar')
    bottom_bar.removeClass('animate-bottom-bar').addClass('animate-out-bottom-bar')
    overlay_navigation.removeClass('overlay-slide-down').addClass('overlay-slide-up')
    nav_item_1.removeClass('slide-in-nav-item').addClass('slide-in-nav-item-reverse')
    nav_item_2.removeClass('slide-in-nav-item-delay-1').addClass('slide-in-nav-item-delay-1-reverse')   
    nav_item_3.removeClass('slide-in-nav-item-delay-2').addClass('slide-in-nav-item-delay-2-reverse');
    nav_item_4.removeClass('slide-in-nav-item-delay-3').addClass('slide-in-nav-item-delay-3-reverse')
    nav_item_5.removeClass('slide-in-nav-item-delay-4').addClass('slide-in-nav-item-delay-4-reverse')
  }
})

var currentDate = new Date()
    var day = currentDate.getDay()
    var hour = currentDate.getHours()
    var min = currentDate.getMinutes();
    var dates = currentDate.toDateString()
    var time = currentDate.toLocaleTimeString()

    console.log(dates + ' '+ time)
    console.log("current day =" + day)
    console.log("hour=" + hour)
    console.log("min=" + min)

   // day = 0
   // hour = 12 
   // min = 31
    console.log("day=" + day + " test time=" + hour + ":" + min)

    //College9/10
    if (day == 0 || day == 6) {     
        if (7 <= hour && hour < 10) 
            document.getElementById("c9breakfast").style.background= color
        else if (10 <= hour && hour < 14)
            document.getElementById("c9brunch").style.background= color
        else if (14 <= hour && hour < 17)
            document.getElementById("c9cont").style.background= color
        else if (17 <= hour && hour < 20) 
            document.getElementById("c9dinner").style.background= color
        else if (20 <= hour && hour < 23)
            document.getElementById("c9late").style.background= color
        else 
            document.getElementById("c9closed").style.background= color
    }
    else if (1 <= day && day < 6) {
        if (hour == 6 && min >= 30) {
            document.getElementById("c9breakfast").style.background= color
        }
        else if (hour >= 7 && hour < 12) {
            if (hour == 11 && min < 30) {
                document.getElementById("c9breakfast").style.background= color
            }
            else {
                document.getElementById("c9brunch").style.background= color
            }
        }
        else if (hour >= 12 && hour < 14 ) {
            document.getElementById("c9brunch").style.background= color
        }
        else if (14 <= hour && hour < 17) {
            document.getElementById("c9cont").style.background= color
        }
        else if (17 <= hour && hour < 20) {
            document.getElementById("c9dinner").style.background= color
        }
        else if (20 <= hour && hour < 23)
            document.getElementById("c9late").style.background= color
        else 
            document.getElementById("c9closed").style.background= color
    }

    //Cowell/Stevenson
    if (day == 0) {     
        if (7 <= hour && hour < 10) 
            document.getElementById("csbreak").style.background= color
        else if (10 <= hour && hour < 14)
            document.getElementById("csbrunch").style.background= color
        else if (14 <= hour && hour < 17)
            document.getElementById("cscont").style.background= color
        else if (17 <= hour && hour < 20) 
            document.getElementById("csdinner").style.background= color
        else if (20 <= hour && hour < 23)
            document.getElementById("cslate").style.background= color
        else 
            document.getElementById("csclosed").style.background= color
    }
    else if (day == 6) {        
        if (hour == 6 && min >= 30) {
            document.getElementById("csbreak").style.background= color
        }
        else if (hour >= 7 && hour < 12) {
            if (hour == 11 && min < 30) {
                document.getElementById("csbreak").style.background= color
            }
            else {
                document.getElementById("csbrunch").style.background= color
            }
        }
        else if (hour >= 12 && hour < 14 ) {
            document.getElementById("csbrunch").style.background= color
        }
        else if (14 <= hour && hour < 17)
            document.getElementById("cscont").style.background= color
        else if (17 <= hour && hour < 20) 
            document.getElementById("csdinner").style.background= color
        else 
            document.getElementById("csclosed").style.background= color
    }
    else if (1 <= day && day < 6) {
        if (hour == 6 && min >= 30) {
            document.getElementById("csbreak").style.background= color
        }
        else if (hour >= 7 && hour < 12) {
            if (hour == 11 && min < 30) {
                document.getElementById("csbreak").style.background= color
            }
            else {
                document.getElementById("csbrunch").style.background= color
            }
        }
        else if (hour >= 12 && hour < 14 ) {
            document.getElementById("csbrunch").style.background= color
        }
        else if (14 <= hour && hour < 17) {
            document.getElementById("cscont").style.background= color
        }
        else if (17 <= hour && hour < 20) {
            document.getElementById("csdinner").style.background= color
        }
        else if (20 <= hour && hour < 23)
            document.getElementById("cslate").style.background= color
        else 
            document.getElementById("csclosed").style.background= color
    }

    //Carson/Oakes
    if (day == 0) {     
        if (7 <= hour && hour < 10) 
            document.getElementById("cobreak").style.background= color
        else if (10 <= hour && hour < 14)
            document.getElementById("cobrunch").style.background= color
        else if (14 <= hour && hour < 17)
            document.getElementById("cocont").style.background= color
        else if (17 <= hour && hour < 20) 
            document.getElementById("codinner").style.background= color
        else if (20 <= hour && hour < 23)
            document.getElementById("colate").style.background= color
        else 
            document.getElementById("coclosed").style.background= color
    }
    else if (day == 6) {        
        if (hour == 6 && min >= 30) {
            document.getElementById("cobreak").style.background= color
        }
        else if (hour >= 7 && hour < 12) {
            if (hour == 11 && min < 30) {
                document.getElementById("cobreak").style.background= color
            }
            else {
                document.getElementById("cobrunch").style.background= color
            }
        }
        else if (hour >= 12 && hour < 14 ) {
            document.getElementById("cobrunch").style.background= color
        }
        else if (14 <= hour && hour < 17)
            document.getElementById("cocont").style.background= color
        else if (17 <= hour && hour < 20) 
            document.getElementById("codinner").style.background= color
        else 
            document.getElementById("coclosed").style.background= color
    }
    else if (1 <= day || day < 6) {
        if (hour == 6 && min >= 30) {
            document.getElementById("cobreak").style.background= color
        }
        else if (hour >= 7 && hour < 12) {
            if (hour == 11 && min < 30) {
                document.getElementById("cobreak").style.background= color
            }
            else {
                document.getElementById("cobrunch").style.background= color
            }
        }
        else if (hour >= 12 && hour < 14 ) {
            document.getElementById("cobrunch").style.background= color
        }
        else if (14 <= hour && hour < 17) {
            document.getElementById("cocont").style.background= color
        }
        else if (17 <= hour && hour < 20) {
            document.getElementById("codinner").style.background= color
        }
        else if (20 <= hour && hour < 23)
            document.getElementById("colate").style.background= color
        else 
            document.getElementById("coclosed").style.background= color
    }

    //Crown/Merill
    if (day == 0 || day == 6) {
        document.getElementById("cmclosed").style.background= color
    }
    else if (1 <= day && day < 6) {
        if (hour == 6 && min >= 30) {
            document.getElementById("cmbreak").style.background= color
        }
        else if (hour >= 7 && hour < 12) {
            if (hour == 11 && min < 30) {
                document.getElementById("cmbreak").style.background= color
            }
            else {
                document.getElementById("cmbrunch").style.background= color
            }
        }
        else if (hour >= 12 && hour < 14 ) {
            document.getElementById("cmbrunch").style.background= color
        }
        else if (14 <= hour && hour < 17) {
            document.getElementById("cmcont").style.background= color
        }
        else if (17 <= hour && hour < 20) {
            document.getElementById("cmdinner").style.background= color
        }
        else 
            document.getElementById("cmclosed").style.background= color
    }

    //Porter/Kresge
    if (day == 0 || day == 6) {
        document.getElementById("pkclosed").style.background= color
    }
    else if (1 <= day && day < 6) {
        if (hour == 6 && min >= 30) {
            document.getElementById("pkbreak").style.background= color
        }
        else if (hour >= 7 && hour < 12) {
            if (hour == 11 && min < 30) {
                document.getElementById("pkbreak").style.background= color
            }
            else {
                document.getElementById("pkbrunch").style.background= color
            }
        }
        else if (hour >= 12 && hour < 14 ) {
            document.getElementById("pkbrunch").style.background= color
        }
        else if (14 <= hour && hour < 17) {
            document.getElementById("pkcont").style.background= color
        }
        else if (17 <= hour && hour < 19) {
            document.getElementById("pkdinner").style.background= color
        }
        else 
            document.getElementById("pkclosed").style.background= color
    }
    document.addEventListener("touchstart", function(){}, true)