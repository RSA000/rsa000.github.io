// Declare constant values for button input values.
const LEFT = 37;
const RIGHT = 39;
const UP = 38;
const DOWN = 40;
const A = 13;
// Declare constant value for special keys.
const BACKSPACE = 8;
const F5 = 116;
const ENTER = 13;
// Declare constant value for centering screen.
const centerX = 152;
const centerY = 277;

// Instantiate and set variable, index, to 0.
var index = 0;


/**
 * The center function scrolls the screen to the centerX and centerY coordinates.
 */
function center(){
    window.scrollTo(centerX, centerY);
}


/**
 * Function returns if system is 3DS and false otherwise.
 */
function is3DS(){
    // If userAgent string is equal to "Nintendo 3DS"
    return includes(window.navigator.userAgent,"Nintendo 3DS");
}


/**
 * getText sends an XMLHttpRequest GET request with a given url
 * and performs a function (callback) with that text.
 *
 * @param {String} url
 * @param {Function} callback
 */
function getText(url, callback) {
    $.ajax({
        url: url,
        method: 'GET',
        // On success, perform callback function with returned data.
        success: function(data) {
            if (callback) callback(data);
        },
        error: function(textStatus, errorThrown) {
            console.error('Error loading text file:', errorThrown);
            alert("Error loading text file: " + errorThrown + " " + url);
        }
    });
}


/**
 * <<<<<<<<<<<<<<<<<  w3schools (modified) stuff >>>>>>>>>>>>>>>>>>>>>>>
 * //////  https://www.w3schools.com/js/js_cookies.asp          ///////
 * <<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * setCookie creates a cookie (cname) with a value (cvalue)
 * that expires in a set amount of days (exdays).
 *
 * @param {cname} - String
 * @param {cvalue} - String
 * @param {exdays} - Int.
 */
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


/**
 * Function checks cookie, "fontsize," value and updates elements accordingly.
 * If no font is set, medium (13) is set.
 */
function checkFontSize() {
    var fontSize = parseInt(getCookie("fontsize"));
    // If fontSize is a number greater than 0.
    if (fontSize) {
        // Get and apply font settings with JQueary to all divs, paragraphs and spanners.
        $("div").css("font-size", (fontSize + 3) + "px");
        $("p").css("font-size", fontSize + "px");
        $("span").css("font-size", (fontSize + 1) + "px");
        return;
    }
    // Otherwise, updated font to default size.
    else {
        alert("No font size found\nDefault set (13px)");
        setCookie("fontsize", "13", 364);
        checkFontSize();
        return;
    }
}


/**
 * <<<<<<<<<<<<<<<<<  w3schools (modified) stuff >>>>>>>>>>>>>>>>>>>>>>>
 * //////  https://www.w3schools.com/js/js_cookies.asp          ///////
 * <<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * Function returns value of a cookie if cname value is valid cookie name.
 *
 * @param {cname} - String
 */
function getCookie(cname) {
    var name = cname + "=";
    // Get cookies and store in variable, split on semicolons and store in variable "ca"
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    // For length of split cookies.
    for(var i = 0; i <ca.length; i++) {
        // Current cookie = cookie at index i.
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            // Remove first character from current cookie value.
            c = c.substring(1);
        }
        // If Cookie matches name, return value of cookie.
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/**
 * Function alerts user if no bookname value is set to cookie and redirects to home page.
 */
function checkBookName() {
    if (getCookie("bookname") != "") {
        return;
    }
    else{
        alert("No book found!\nPlease select a book from the catalogue first.");
        window.location.replace("../index.html")
    }
}


/**
 * Function checks if a theme is set. If a theme is not set, default theme is set
 */
function checkTheme() {
    // Get theme cookie, and theme attributes from page and store in variables.
    var themeCookie = getCookie("theme");
    var themeTag = $("#theme");
    var indexThemeTag = $("#themeindex");

    // If cookie value is not empty.
    if (themeCookie !== "") {
        // If themeTag is truethy (length is not 0).
        if (themeTag.length) {
            themeTag.attr("href", "../assets/styles/" + themeCookie + ".css");
            setCookie("theme", themeCookie, 364);
            return;
        }
        // Otherwise, if indexThemeTag is truethy.
        else if (indexThemeTag.length) {
            var images = $(".upperScreenImages img");
            indexThemeTag.attr("href", "assets/styles/" + themeCookie + ".css");
            images.each(function() {
                $(this).attr("src", "https://rsa000.github.io/3DSLibrary/assets/img/index/" + themeCookie + ".gif");
            });
            setCookie("theme", themeCookie, 364);
            return;
        }
    }
    // Otherwise, set default theme.
    else {
        alert("no theme set");
        if (themeTag.length) {
            themeTag.attr("href", "../assets/styles/globalvillage.css");
        }
        if (indexThemeTag.length) {
            indexThemeTag.attr("href", "../assets/styles/globalvillage.css");
        }
        setCookie("theme", "globalvillage", 364);
        checkTheme();
        return;
    }
}


/**
 * Function changes theme cookie value to passed vlaue.
 *
 * @param {String} themeName
 */
function changeTheme(themeName){
    // Update cookie them to new theme name.
    setCookie("theme", themeName, 364);
    // Update theme.
    checkTheme();
}


/**
 * Function updates topHeading and topSubtitle to elements value.
 */
var active = function() {
    // Get topHeading and subTitle element.
    var topHeading = $(".topHeading");
    var topSubtitle = $(".topSubtitle");
    // Update to current elements innerHTML and "text" data attribute.
    topHeading.html(this.innerHTML);
    topSubtitle.html($(this).data("text"));
};


/**
 * Function updates topHeading and topSubtitle to default values.
 */
var inactive = function() {
    // Get topHeading and subTitle element.
    var topHeading = $(".topHeading");
    var topSubtitle = $(".topSubtitle");
    // Set heading and subtitle to default value.
    topHeading.html(topHeading.data("text"));
    topSubtitle.html(topSubtitle.data("text"));
};


/**
 * Function updates theme to element name value if event keycode is valid.
 */
var  themeButtonClick = function(ev){
    // If keydown is A key
    changeTheme(this.dataset.name);
};

/**
 * Function updates font according to elements name (up or down)
 */
var  fontButtonClick = function(ev){
    // If keydown is A key
    var currentFont = parseInt(getCookie("fontsize"));
    var currentSubtitle = document.getElementsByClassName("topSubtitle")[0];

    if ((this.dataset.name === "up") && (currentFont < 18)){
        setCookie("fontsize", currentFont + 1, 364);
        currentSubtitle.innerHTML = "Current Size: " + (currentFont + 1);
        currentSubtitle.style.fontSize = (currentFont + 1) + "px";
    }
    else if ((this.dataset.name === "down") && (currentFont > 10)){
        setCookie("fontsize", currentFont - 1, 364);
        currentSubtitle.innerHTML = "Current Size: " + (currentFont - 1);
        currentSubtitle.style.fontSize = (currentFont - 1) + "px";
    }
};


/**
 * Function updates bookname and pagenum cookie values before redirecting page.
 *
 * @param {event}
 */
var catClick = function(ev) {
    var bookName = this.dataset.bookname;
    setCookie("bookname", bookName, 364);
    setCookie("pagenum", 0, 364);
    window.location.href = "./read.html";
};


/**
 * <<<<<<<<<<<<<<<<<<<<  Wolfyxon's (modified) stuff >>>>>>>>>>>>>>>>>>>>>>>
 * //////         https://github.com/Wolfyxon/3ds-web-stuff*         ///////
 * <<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 *
 * This prevents the browser from moving the page using the arrow keys and
 * prevents default DS events for the D-pad and A key.
 * @param {keyboardEvent} event
 */
function preventKey(event){
    // Allow backspace, F5 (refresh), and ENTER.
    var keyCode = event.keyCode;
    if ((keyCode === BACKSPACE) || (keyCode === F5) || (keyCode == ENTER)){
        return true;
    }
    // Allow character input.
    if(event.charCode || (event.key && event.key.length === 1 ))
        return true;
    // Otherwise, prevent default action for event and return false.
    else{
        event.preventDefault();
        return false;
    }
}


/**
 * Process keydown logic. Call this when using window.onkeydown, and you want to use the global.js input detection system
 * @param {KeyboardEvent} event
 */
function menuHandleKeyDown(event){
    // Prevent default action when key is pressed down.
    preventKey(event);

    var elements = document.querySelectorAll('a, button');

    if (elements.length > 0){
        // Switch case for each button press code.
        switch(event.keyCode){
            // Case for up button.
            case UP:
                // If index is above 0.
                if (index > 0){
                    // Update index -1.
                    index -= 1;
                }
                // If index is 0.
                else{
                    // Set index to last elements.
                    index = elements.length - 1
                }
                // Focus on current index.
                elements[index].focus();
                break;
                // Case for down button.
            case DOWN:
                // If index is not above elementsLength.
                if (index < elements.length -1){
                    // Increment index.
                    index += 1;
                }
                // If index is at last elements.
                else{
                    index = 0;
                }
                // Focus on current elements index.
                elements[index].focus();
                break;
        }
    }
}



/**
 * <<<<<<<<<<<<<<<<<<<<  Wolfyxon's (modified) stuff >>>>>>>>>>>>>>>>>>>>>>>
 * //////         https://github.com/Wolfyxon/3ds-web-stuff*         ///////
 * <<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * includes takes a container and a search element and returns a boolean value
 * indicating if it exists within the container.
 *
 * @param {container} - Container to serach in.
 * @param {String} - String to check for.
 */
function includes(container,search){
    // If container is a string or an array.
    if (typeof(container) === 'string' || container instanceof Array){
        // Return true if indexo of container search is not -1 (string case).
        return container.indexOf(search) !== -1;
    }
    // Return true if container index is not undefined (array case).
    return container[search] !== undefined;
}


/**
 * <<<<<<<<<<<<<<<<<<<<  Wolfyxon's (modified) stuff >>>>>>>>>>>>>>>>>>>>>>>
 * //////         https://github.com/Wolfyxon/3ds-web-stuff*         ///////
 * <<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * Register an <a> that isn't meant to be opened on the 3DS
 * @param {element} a
 */
function registerNon3DSlink(a){
    // Add event listener for when elements is clicked.
    a.addEventListener("click", function (e){
        // Alert that link is not supported.
        alert("The 3DS doesn't support this page. Please open \n" + a.href + "\n on a modern browser)");
        // Prevent default action (navigating to link).
        e.preventDefault();
        return false;
    }, false);
}



/*
 * Function prepares and 3DS/Desktop-specific configurations when document is loaded.
 */
(function(){
    /* When content is loaded. */
    document.addEventListener('DOMContentLoaded', function(ev) {
        index = 0;

        // Set interval to center screen every 33 milliseconds (30fps).
        setInterval(center, 33);
        // Check current theme and font size.
        checkTheme();
        checkFontSize();
        // Set function for keydown events.
        window.addEventListener("keydown", menuHandleKeyDown);

        var elements = document.querySelectorAll('a, button');

        // For each elements, add event listener.
        for(var i = 0, l = elements.length; i<l; i++){
            // For each elements, add event listener.

            elements[i].setAttribute('tabindex', i);
            // When focused on, apply active function with "this" selected elements.
            elements[i].addEventListener('focus', active, false);
            // When no elements are selected, revert to greeting heading and subtitle.
            elements[i].addEventListener('blur', inactive, false);

            if (elements[i].dataset.type === 'btn') {
                elements[i].addEventListener("keydown", function(ev){
                    if ((ev.keyCode == 32) || (ev.keyCode == 13)){
                        themeButtonClick.call(this, ev);
                }
            }, false);
                elements[i].addEventListener("click", themeButtonClick, false);
            }


            if (elements[i].dataset.type === 'btnf') {
                elements[i].addEventListener("keydown", function(ev){
                    if ((ev.keyCode == 32) || (ev.keyCode == 13)){
                        fontButtonClick.call(this, ev)
                    }
                }, false);
                elements[i].addEventListener("click", fontButtonClick, false);
            }

        }

        // If device is 3DS.
        if (is3DS()){

            // Add event listener alert error events (necessary to see errors on 3DS system)..
            window.addEventListener("error", function(e) {
                alert(e.filename + ":" + e.lineno + " " + e.message);
            }, false);

            // Add non-3DS compatible warning to any relevant elements.
            for(var i = 0, l = elements.length; i<l; i++){
                // If 3DS attribute exists, add warning to link.
                if (elements[i].getAttribute("nc")){
                    registerNon3DSlink(elements[i]);
                }
            }
        }
        // Otherwise, set screen for desktop computers.
        else{
            document.body.style.margin = "10px auto";
        }
    }, false);
})()
