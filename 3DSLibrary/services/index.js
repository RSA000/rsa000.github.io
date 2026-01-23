
/*
 * This is an immediately invoked function expression.
 * This means that after this function is created it will immediately run.
 * All variables are within the functions scope and not the main programs global scope;
 * this is a means of encapsulating data.
 */
(function(){


    /* The active function changes the upper screen heading and subtitle the the selected elemements inner HTML and description attribute */
    let active = function(ev) {
        // get top screen Heading and subtitles and store in variables.
        let topHeading = document.getElementsByClassName("topHeading")[0];
        let topSubtitle = document.getElementsByClassName("topSubtitle")[0];
        // Get innerHTML and description attributes of current element.
        let headingValue = this.innerHTML;
        let subtitleValue = this.dataset.description;
        // Update innerHTML of top heading and subtitle to heading and subtitle values.
        topHeading.innerHTML = headingValue;
        topSubtitle.innerHTML = subtitleValue;
    };


    /*Function returns title to original message when no items are selected. */
    let inactive = function(ev) {
        // Get top heading and subtitle tags (<h1> and <p>, respectively).
        let topHeading = document.getElementsByClassName("topHeading")[0];
        let topSubtitle = document.getElementsByClassName("topSubtitle")[0];
        // Update heading and subtitle.
        topHeading.innerHTML = "Welcome to the New 3DS Library";
        topSubtitle.innerHTML = "By RSA000";
    };



    /* When content is loaded. */
    document.addEventListener('DOMContentLoaded', function(ev) {

        // Store all <a> tags within the "lowerScreenMenu" div in variable "anchors."
        let anchors = this.querySelectorAll(".lowerScreenMenu a");
        inactive();
        // For each anchor, add event listener.
        for(let i = 0, l = anchors.length; i<l; i++){
            // When focused on, apply active function with "this" selected anchor.
            anchors[i].addEventListener('focus', active, false);
            // When no anchors are selected, revert to greeting heading and subtitle.
            anchors[i].addEventListener('blur', inactive, false);
        }
    }, false);

})()
