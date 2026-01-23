
// Declare constant values for button input values.
const LEFT = 37;
const RIGHT = 39;
const UP = 38;
const DOWN = 40;
const A = 65;

/* The center function scrolls the screen to the 40,215 coordinates.*/
function center(){
    // Scroll to designated coordinates.
    window.scrollTo(40,215);
};


/**
 * The scrollUp function scrolls the text container up
 * @param {element}
 * @param {Int}
 */
function scroll(element, amount) {
    console.log("Scrolling");
    element.scrollTop -= amount;
};



/**
 * <<<<<<<<<<<<<<<<<  Wolfyxon's stuff >>>>>>>>>>>>>>>>>>>>>>>
 * //////  https://github.com/Wolfyxon/3ds-web-stuff*  ///////
 * <<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */


function includes(container,search){
    if (typeof(container) === 'string' || container instanceof Array){
        return container.indexOf(search) !== -1;
    }

    return container[search] !== undefined;
}


function is3DS(){
    return includes(window.navigator.userAgent,"Nintendo 3DS");
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


/**
 * Register an <a> that isn't meant to be opened on the 3DS
 * @param {HTMLAnchorElement} a
 */
function registerNon3DSlink(a){
    a.addEventListener("click", function (e){
        alert("The 3DS doesn't support that page. Please open \n\n" + a.href + "\n\non a external device (with a modern browser)");
        e.preventDefault();

        return false;
    }, false);
}

// end of wolfyxon


/*
 * Things within this function will not pollute global scope
 */
(function(){
    /* When content is loaded. */
    document.addEventListener('DOMContentLoaded', function(ev) {


        /**
         * <<<<<<<<<<<<<<<<<  Wolfyxon's stuff >>>>>>>>>>>>>>>>>>>>>>>
         * //////  https://github.com/Wolfyxon/3ds-web-stuff*  ///////
         * <<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
         */
        // You can't access console logs on the 3DS, so it will show an alert when there's an error
        if(is3DS()){
            window.addEventListener("error", function(e) {
                alert(e.filename + ":" + e.lineno + " " + e.message);
                return false;
            }, false);

            // Call center function every miliseconds.
            setInterval(center, 4);
        }
        // end of wolfyxon

        // If the user agent does not contain "Nintendo 3DS"
        else {
            // Set body style to grid display.
            document.body.style.display = 'grid';
            // Set content to center.
            document.body.style.justifyContent = 'center';
        }
        // Otherwise,
    }, false);

})()
