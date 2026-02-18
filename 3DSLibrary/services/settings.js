

/*
 * This is an immediately invoked function expression.
 * This means that after this function is created it will immediately run.
 * All variables are within the functions scope and not the main programs global scope;
 * this is a means of encapsulating data.
 */
(function(){

    // Store all <a> tags within the "lowerScreenContents" div in variable "buttons."
    var buttons = document.querySelectorAll("#themeSettings button");
    const buttonsLength = buttons.length;
    var index = 0;
    var topHeading = document.getElementsByClassName("topHeading")[0];
    var topSubtitle = document.getElementsByClassName("topSubtitle")[0];

    /* Simba's */

    var bttnClick = function(ev){
        changeTheme(this.dataset.name);
    }

    /* End of Simbas */



    /* When content is loaded. */
    document.addEventListener('DOMContentLoaded', function(ev) {

        inactive();

        // Add event listener for when a key is pressed down.
        window.addEventListener("keydown", function(e) {
            menuHandleKeyDown(e, document.getElementById('themeSettings'));
        });


        // For each anchor, add event listener.
        for(var i = 0, l = buttons.length; i<l; i++){
            // For each anchor, add event listener.

            buttons[i].setAttribute('tabindex', i);
            // When focused on, apply active function with "this" selected anchor.
            buttons[i].addEventListener('focus', active, false);
            // When no buttons are selected, revert to greeting heading and subtitle.
            buttons[i].addEventListener('blur', inactive, false);
            buttons[i].addEventListener("click", bttnClick, false);
        }
    }, false);

})()



