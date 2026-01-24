(function(){

    const slides = document.getElementsByClassName("mySlides");
    const slideLength = slides.length;

    /* Simba's */

    /* The active function changes the upper screen heading and subtitle the the selected elemements inner HTML and description attribute */
    var active = function(ev) {
        // get top screen Heading and subtitles and store in variables.
    };


    /*Function returns title to original message when no items are selected. */
    var inactive = function(ev) {
        // Get top heading and subtitle tags (<h1> and <p>, respectively).

    };

    /* End of Simbas */





    /* When content is loaded. */
    document.addEventListener('DOMContentLoaded', function(ev) {

        // Store all <a> tags within the "lowerScreenMenu" div in variable "slides."
        inactive();
        // For each anchor, add event listener.
        for(var i = 0; i < slideLength; i++){
            slides[i].tabindex = i;
            console.log(slides[i].tabindex);
            // When focused on, apply active function with "this" selected anchor.
            slides[i].addEventListener('focus', active, false);
            // When no slides are selected, revert to greeting heading and subtitle.
            slides[i].addEventListener('blur', inactive, false);
        }
    }, false);

})()
