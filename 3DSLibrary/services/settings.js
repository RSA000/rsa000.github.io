

/*
 * This is an immediately invoked function expression.
 * This means that after this function is created it will immediately run.
 * All variables are within the functions scope and not the main programs global scope;
 * this is a means of encapsulating data.
 */
(function(){

    // Store all <a> tags within the "lowerScreenContents" div in variable "anchors."
    var anchors = document.querySelectorAll("#themeSettings button");
    const anchorsLength = anchors.length;
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
        for(var i = 0, l = anchors.length; i<l; i++){
            // For each anchor, add event listener.

            anchors[i].setAttribute('tabindex', i);
            // When focused on, apply active function with "this" selected anchor.
            anchors[i].addEventListener('focus', active, false);
            // When no anchors are selected, revert to greeting heading and subtitle.
            anchors[i].addEventListener('blur', inactive, false);
            anchors[i].addEventListener("click", bttnClick, false);
        }
    }, false);

})()



