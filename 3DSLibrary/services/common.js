
// Declare constant values for button input values.
const LEFT = 37;
const RIGHT = 39;
const UP = 38;
const DOWN = 40;
const A = 13;

//

// Store all <a> tags within the "lowerScreenMenu" div in variable "anchors."
var anchors = document.querySelectorAll("a");

/**
 *
 * The center function scrolls the screen to the 40,215 coordinates.
 *
 */
function center(){
    window.scrollTo(65, 264);
};


/**
 * The scrollUp function scrolls the selected element upwards.
 * @param {element}
 * @param {Int}
 */
function scroll(element, amount) {
    element.scrollTop -= amount;
};


// https://www.w3schools.com/js/js_cookies.asp


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
        alert(bookName);
        window.location.replace("../../index.html")
    }
}


/**
 * <<<<<<<<<<<<<<<<<  Wolfyxon's (modified) stuff >>>>>>>>>>>>>>>>>>>>>>>
 * //////  https://github.com/Wolfyxon/3ds-web-stuff*  ///////
 * <<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/

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
 * Register an <a> that isn't meant to be opened on the 3DS
 * @param {HTMLAnchorElement} a
 */
function registerNon3DSlink(a){
    // Add event listener for when anchor is clicked.
    a.addEventListener("click", function (e){
        // Alert that link is not supported.
        alert("The 3DS doesn't support that page. Please open \n\n" + a.href + "\n\non a external device (with a modern browser)");
        // Prevent default action (navigating to link).
        e.preventDefault();
        return false;
    }, false);
}


/**
 *
 * Function returns if system is 3DS and false otherwise.
 *
 */
function is3DS(){
    // If userAgent string is equal to "Nintendo 3DS"
    if (includes(window.navigator.userAgent,"Nintendo 3DS")){
        return true;
    }
    return false;
}


/**
 *
 * This prevents the browser from moving the page using the arrow keys
 * @param {keyboardEvent} event
 */
function preventKey(event){
    if(event.keyCode === 8) return true; //backspace
    if(event.keyCode === 116) return true; //f5
    if(event.keyCode === 13) return true; //enter

    // If event.charCode is not null or event key is not null and length is equal to 1.
    if(event.charCode || (event.key && event.key.length === 1 ))
        // allow character keys and return true.
        return true;
    // Otherwise, prevent default action for event and return false.
    event.preventDefault();
    return false;
};

// end of wolfyxon


/*
 * When DOM content is fully loaded, invoke function.
 */
(function(){
    /* When content is loaded. */
    document.addEventListener('DOMContentLoaded', function(ev) {

        // If device is 3DS.
        if (is3DS()){

            // Call center function every milisecond.
            setInterval(center);

            // Add event listener for errors.
            window.addEventListener("error", function(e) {
                // Alert event.filename + line number where error occurred + error message.
                alert(e.filename + ":" + e.lineno + " " + e.message);
            }, false);

            // Add non-3DS compatible warning to any relevant anchors.
            for(var i = 0, l = anchors.length; i<l; i++){
                // If 3DS attribute is equal to 1.
                if (anchors[i].getAttribute("3DS") === "1"){
                    // Add event listener to display message for non-compatible site link when selected.
                    registerNon3DSlink(anchors[i]);
                }
            }
        }
        else{
            // Otherwise, set screen for desktop computers.
            document.getElementsByClassName("backingDiv")[0].style.margin = "10px auto";
            document.getElementsByClassName("backingDiv")[0].style.marginBottom = "10px";

        }
    }, false);
})()
