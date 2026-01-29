

/*
 * This is an immediately invoked function expression.
 * This means that after this function is created it will immediately run.
 * All variables are within the functions scope and not the main programs global scope;
 * this is a means of encapsulating data.
 */
(function(){

    const anchors = document.getElementsByTagName("a");
    const anchorLength = anchors.length;
    var index = 0;
    var topHeading = document.getElementsByClassName("topHeading")[0];
    var topSubtitle = document.getElementsByClassName("topSubtitle")[0];

    /* Simba's */

    /* The active function changes the upper screen heading and subtitle the the selected elemements inner HTML and description attribute */
    var active = function(ev) {
        // Get innerHTML and description attributes of current element.
        // Update innerHTML of top heading and subtitle to heading and subtitle values.
        topHeading.innerHTML = this.innerHTML;
        topSubtitle.innerHTML = this.dataset.description;
    };


    /*Function returns title to original message when no items are selected. */
    var inactive = function(ev) {
        // Update heading and subtitle.
        topHeading.innerHTML = topHeading.dataset.description;
        topSubtitle.innerHTML = topSubtitle.dataset.description;
    };


    var click = function(ev){
        changeTheme(this.dataset.name);
    }

    /* End of Simbas */

    /**
     * Process keydown logic. Call this when using window.onkeydown, and you want to use the global.js input detection system
     * @param {KeyboardEvent} event
     */
    function menuHandleKeyDown(event, element){
        // Prevent default action when key is pressed down.
        preventKey(event);
        // Switch case for each button press code.
        // switch(event.keyCode){
        //     // Case for up button.
        //     case UP:
        //         // If index is above 0.
        //         if (index > 0){
        //             // Update index -1.
        //             index -= 1;
        //         }
        //         // If index is 0.
        //         else{
        //             // Set index to last anchor.
        //             index = anchorLength - 1
        //         }
        //         // Focus on current index.
        //         anchors[index].focus();
        //         break;
        //         // Case for down button.
        //     case DOWN:
        //         // If index is not above anchorLength.
        //         if (index < anchorLength -1){
        //             // Increment index.
        //             index += 1;
        //         }
        //         // If index is at last anchor.
        //         else{
        //             index = 0;
        //         }
        //         // Focus on current anchor index.
        //         anchors[index].focus();
        //         break;
        // }
    };



    /* When content is loaded. */
    document.addEventListener('DOMContentLoaded', function(ev) {



        inactive();

        // Add event listener for when a key is pressed down.
        window.addEventListener("keydown", function(e) {
            menuHandleKeyDown(e, document.getElementById('themeSettings'));
        });

        // Store all <a> tags within the "lowerScreenContents" div in variable "anchors."
        var buttons = document.querySelectorAll("#themeSettings button");
        // For each anchor, add event listener.
        for(var i = 0, l = buttons.length; i<l; i++){
            // // // When focused on, apply active function with "this" selected anchor.
            // // buttons[i].addEventListener('focus', active, false);
            // // // When no anchors are selected, revert to greeting heading and subtitle.
            // // buttons[i].addEventListener('blur', inactive, false);
            buttons[i].addEventListener("click", click, false);
        }
    }, false);

})()



