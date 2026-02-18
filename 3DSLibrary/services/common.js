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

// Set index and get anchor tags.
var index = 0;
var anchorLength = 0;



/**
 * The center function scrolls the screen to the 152,277 coordinates.
 */
function center(){
    window.scrollTo(centerX, centerY);
}


/**
 * <<<<<<<<<<<<<<<<<  w3schools (modified) stuff >>>>>>>>>>>>>>>>>>>>>>>
 * //////  https://www.w3schools.com/js/js_cookies.asp          ///////
 * <<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

/**
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
// End of w3schools.com


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
function checkTheme(){
    // Get value of theme cookie.
    var themeCookie = getCookie("theme");
    // Get document CSS link elements (index and other pages).
    var themeTag = document.getElementById("theme");
    var indexThemeTag = document.getElementById("themeindex");

    // Set theme if cookie exists.
    if (themeCookie != "") {
        // Case for pages in views folder.
        if (themeTag != null){
            themeTag.setAttribute("href", ("../assets/styles/" + themeCookie + ".css"));
            setCookie("theme", themeCookie, 364);
            return;
        }
        // Case for index.html page.
        else if (indexThemeTag != null){
            // Store all upper screen image elements in variable.
            var images = document.querySelectorAll("img");
            indexThemeTag.setAttribute("href", ("assets/styles/" + themeCookie + ".css"));
            // Set Home page upper screen photos.
            for (var i = 0; i < images.length; i++){
                images[i].setAttribute('src', ("https://rsa000.github.io/3DSLibrary/assets/img/index/" + themeCookie + ".gif"));
            }
            setCookie("theme", themeCookie, 364);
            return;
        }
    }
    // Case for no theme set.
    else{
        alert("no theme set");
        if (themeTag != null) themeTag.setAttribute('href', ("../assets/styles/globalvillage.css"));
        if (indexThemeTag != null) indexThemeTag.setAttribute('href', ("../assets/styles/globalvillage.css"));
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



/* Simba's (modified) stuff*/

/* The active function changes the upper screen heading and subtitle the the selected elemements inner HTML and description attribute */
var active = function(ev) {
    // get top screen Heading and subtitles and store in variables.
    var topHeading = document.getElementsByClassName("topHeading")[0];
    var topSubtitle = document.getElementsByClassName("topSubtitle")[0];
    // Get innerHTML and description attributes of current element.
    // Update innerHTML of top heading and subtitle to heading and subtitle values.
    topHeading.innerHTML = this.innerHTML;
    topSubtitle.innerHTML = this.dataset.description;
};


/*Function returns title to original message when no items are selected. */
var inactive = function(ev) {
    // Get top heading and subtitle tags (<h1> and <p>, respectively).
    var topHeading = document.getElementsByClassName("topHeading")[0];
    var topSubtitle = document.getElementsByClassName("topSubtitle")[0];
    // Update heading and subtitle.
    topHeading.innerHTML = topHeading.dataset.description;
    topSubtitle.innerHTML = topSubtitle.dataset.description;
};

/* End of Simbas */


/**
 * Process keydown logic. Call this when using window.onkeydown, and you want to use the global.js input detection system
 * @param {KeyboardEvent} event
 */
function menuHandleKeyDown(event, element){
    anchorLength = anchors.length;
    // Prevent default action when key is pressed down.
    preventKey(event);
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
                // Set index to last anchor.
                index = anchorLength - 1
            }
            // Focus on current index.
            anchors[index].focus();
            break;
            // Case for down button.
        case DOWN:
            // If index is not above anchorLength.
            if (index < anchorLength -1){
                // Increment index.
                index += 1;
            }
            // If index is at last anchor.
            else{
                index = 0;
            }
            // Focus on current anchor index.
            anchors[index].focus();
            break;
    }
}

/**
 * <<<<<<<<<<<<<<<<<  Wolfyxon's (modified) stuff >>>>>>>>>>>>>>>>>>>>>>>
 * //////  https://github.com/Wolfyxon/3ds-web-stuff*  ///////
 * <<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

/**
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
 * Function returns if system is 3DS and false otherwise.
 */
function is3DS(){
    // If userAgent string is equal to "Nintendo 3DS"
    return includes(window.navigator.userAgent,"Nintendo 3DS");
}


/**
 * Register an <a> that isn't meant to be opened on the 3DS
 * @param {HTMLAnchorElement} a
 */
function registerNon3DSlink(a){
    // Add event listener for when anchor is clicked.
    a.addEventListener("click", function (e){
        // Alert that link is not supported.
        alert("The 3DS doesn't support this page. Please open \n" + a.href + "\n on a modern browser)");
        // Prevent default action (navigating to link).
        e.preventDefault();
        return false;
    }, false);
}


/**
 *
 * This prevents the browser from moving the page using the arrow keys
 * @param {keyboardEvent} event
 */
function preventKey(event){
    // Allow backspace, F5 (refresh), and ENTER.
    var keyCode = event.keyCode;
    if ((keyCode === BACKSPACE) || (keyCode === F5) || (keyCode === ENTER)){
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
// end of wolfyxon


/*
 * Function prepares and 3DS/Desktop-specific configurations when document is loaded.
 */
(function(){
    /* When content is loaded. */
    document.addEventListener('DOMContentLoaded', function(ev) {

        const anchors = document.getElementsByTagName("a");

        // If heading and subtitle exist:
        if (document.getElementById("topHeading") != null){
            // Set heading and subtitle to default value.
            inactive();
        }
        // Add event listener for when a key is pressed down.
        window.addEventListener("keydown", function(e) {
            menuHandleKeyDown(e, document.getElementById('lowerScreenContents'));
        });

        // For each anchor, add event listener.
        for(var i = 0, l = anchors.length; i<l; i++){
            // When focused on, apply active function with "this" selected anchor.
            anchors[i].addEventListener('focus', active, false);
            // When no anchors are selected, revert to greeting heading and subtitle.
            anchors[i].addEventListener('blur', inactive, false);
        }

        // Check current theme.
        checkTheme();

        // If device is 3DS.
        if (is3DS()){

            // Add event listener alert error events (necessary to see errors on 3DS system)..
            window.addEventListener("error", function(e) {
                alert(e.filename + ":" + e.lineno + " " + e.message);
            }, false);



            // Call center function every milisecond.
            setInterval(center);

            // Add non-3DS compatible warning to any relevant anchors.
            for(var i = 0, l = anchors.length; i<l; i++){
                // If 3DS attribute exists, add warning to link.
                if (anchors[i].getAttribute("nc")){
                    registerNon3DSlink(anchors[i]);
                }
            }
        }
        // Otherwise, set screen for desktop computers.
        else{
            document.body.style.margin = "10px auto";
        }
    }, false);
})()
