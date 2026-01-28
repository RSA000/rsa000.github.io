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
const centerX = 115;
const centerY = 266;

/**
 * The center function scrolls the screen to the 115,266 coordinates.
 */
function center(centerX, centerY){
    window.scrollTo(centerX, centerY);
}


/**
 *
 * Create and insert a div in a parent element for DOM
 *
 * Example: loading site elements and templating.
 *
 * @param {childID} - new element's identification
 * @param {parantID} - element to insert new div into.
 * @param {innerHTMl} - HTML to insert into new div
 *
 */
function insertElement(childID, parentID, innerHTML){

    // Get parent element by id
    var parentElement = document.getElementById(parentID);
    // If parent element exists.
    if (parentElement) {
        // Create new div element and set inner html and id (<div id="childID">innerHTML</div>).
        var newDiv = document.createElement("div");
        newDiv.innerHTML = innerHTML;
        newDiv.id = childID;
        parentElement.appendChild(newDiv);
    }
    // Otherwise, log error.
    else {
        alert("Parent element not found");
        console.error("Parent element not found");
    }
}


//
/**
 * <<<<<<<<<<<<<<<<<  w3schools (modified) stuff >>>>>>>>>>>>>>>>>>>>>>>
 * //////  https://www.w3schools.com/js/js_cookies.asp          ///////
 * <<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */


/**
 *
 * setCookie creates a cookie (cname) with a value (cvalue)
 * that expires in a set amount of days (exdays).
 *
 * @param {cname} - String
 * @param {cvalue} - String
 * @param {exdays} - Int.
 *
 */
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function checkCookie() {
    var bookName = getCookie("bookName");
    var pageNum = getCookie("pageNum");
    if (bookName != "") {
        return;
    }
    else{
        alert("No book found!");
        window.location.replace("../index.html")
    }
}

// End of w3schools.com

/**
 * <<<<<<<<<<<<<<<<<  Wolfyxon's (modified) stuff >>>>>>>>>>>>>>>>>>>>>>>
 * //////  https://github.com/Wolfyxon/3ds-web-stuff*  ///////
 * <<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

/**
 * includes takes a container and a search element and returns a boolean value
 * indicating if it exists within the container.
 *
 * @param {container}
 * @param {search}
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
        // If device is 3DS.
        if (is3DS()){

            // Add event listener alert error events (necessary to see errors on 3DS system)..
            window.addEventListener("error", function(e) {
                alert(e.filename + ":" + e.lineno + " " + e.message);
            }, false);

            // Call center function every milisecond.
            setInterval(center(centerX, centeryY));

            // Store all <a> tags within the "lowerScreenContents" div in variable "anchors."
            var anchors = document.querySelectorAll("a");

            // Add non-3DS compatible warning to any relevant anchors.
            for(var i = 0, l = anchors.length; i<l; i++){
                // If 3DS attribute exists, add warning to link.
                if (anchors[i].getAttribute("3DS")){
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
