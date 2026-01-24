(function(){

    const slides = document.getElementsByClassName("mySlides");
    const slideLength = slides.length;

    /* Simba's */

    /* The active function changes the upper screen heading and subtitle the the selected elemements inner HTML and description attribute */
    var active = function(ev) {
        var galleryImage = document.getElementById("galleryImage");
        galleryImage.setAttribute("src", this.src);
    };

    /* End of Simbas */

    /* When content is loaded. */
    document.addEventListener('DOMContentLoaded', function(ev) {

        // For each anchor, add event listener.
        for(var i = 0; i < slideLength; i++){
            slides[i].setAttribute('tabindex', i);
            // When focused on, apply active function with "this" selected anchor.
            slides[i].addEventListener('focus', active, false);
        }
    }, false);

})()
