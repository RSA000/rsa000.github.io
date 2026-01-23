
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


/**
 * Process keydown logic. Call this when using window.onkeydown, and you want to use the global.js input detection system
 * @param {KeyboardEvent} event
 */
function commonHandleKeyDown(event, element){
    // Find all focusable elements
    const focusableElements = 'a[href]';
    const elements = Array.from(document.querySelectorAll(focusableElements));
    const index = elements.indexOf(document.activeElement); // Get the current focused element


    // Prevent default action when key is pressed down.
    preventKey(event);
    // Switch case for each button press code.
    switch(event.keyCode){
        case UP:
            // Move focus to the next element, or loop back to the beginning
            if (index < elements.length - 1) {
                elements[index - 1].focus(); // Move to the next element
            } else {
                elements[0].focus(); // Loop back to the first element
            }
            break;
        case DOWN:
            // Move focus to the next element, or loop back to the beginning
            if (index < elements.length - 1) {
                elements[index + 1].focus(); // Move to the next element
            } else {
                elements[0].focus(); // Loop back to the first element
            }
            break;
    }
};


/*
 * Things within this function will not pollute global scope
 */
(function(){
    /* When content is loaded. */
    document.addEventListener('DOMContentLoaded', function(ev) {

        window.addEventListener("keydown", function(e) {
            commonHandleKeyDown(e, document.getElementsByClassName("lowerScreenMenu")[0]);
        });


        // If the user agent does not contain "Nintendo 3DS"
        if(navigator.userAgent.indexOf("Nintendo 3DS") == -1) {
            // Set body style to grid display.
            document.body.style.display = 'grid';
            // Set content to center.
            document.body.style.justifyContent = 'center';
        }
        // Otherwise,
        else{
            // Call center function every miliseconds.
            setInterval(center, 4);

        }
    }, false);

})()
