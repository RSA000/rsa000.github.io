
/*
 * This is an immediately invoked function expression.
 * This means that after this function is created it will immediately run.
 * All variables are within the functions scope and not the main programs global scope;
 * this is a means of encapsulating data.
 */
(function(){


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


    /**
     * Process keydown logic. Call this when using window.onkeydown, and you want to use the global.js input detection system
     * @param {KeyboardEvent} event
     */
    function menuHandleKeyDown(event, element){
        // Prevent default action when key is pressed down.
        preventKey(event);
        // Switch case for each button press code.
        switch(event.keyCode){
            case UP:
                document.getElementsByTagName("a")[].focus()
                console.log("up");
                break;
            case DOWN:
                break;
            case RIGHT:
                break;
            case LEFT:
                break;
        }
    };



    /* When content is loaded. */
    document.addEventListener('DOMContentLoaded', function(ev) {

        // Add event listener for when a key is pressed down.
        window.addEventListener("keydown", function(e) {
            menuHandleKeyDown(e, document.getElementById('textContainerRead'));
        });

        // Store all <a> tags within the "lowerScreenMenu" div in variable "anchors."
        var anchors = this.querySelectorAll(".lowerScreenMenu a");
        inactive();
        // For each anchor, add event listener.
        for(var i = 0, l = anchors.length; i<l; i++){
            // When focused on, apply active function with "this" selected anchor.
            anchors[i].addEventListener('focus', active, false);
            // When no anchors are selected, revert to greeting heading and subtitle.
            anchors[i].addEventListener('blur', inactive, false);
        }
    }, false);

})()
