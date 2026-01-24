(function(){

    const slides = document.getElementsByClassName("mySlides");
    const slideLength = slides.length;

    var index = 0;

    /* Simba's */

    /* The active function changes the upper screen heading and subtitle the the selected elemements inner HTML and description attribute */
    var active = function(ev) {
        var galleryImage = document.getElementById("galleryImage");
        galleryImage.setAttribute("src", this.src);
    };

    /* End of Simbas */

    /**
     * Process keydown logic. Call this when using window.onkeydown, and you want to use the global.js input detection system
     * @param {KeyboardEvent} event
     */
    function galleryHandleKeyDown(event, element){
        // Prevent default action when key is pressed down.
        preventKey(event);
        // Switch case for each button press code.
        switch(event.keyCode){
            case UP:
                if (index > 1){
                    index -= 2;
                }
                slides[index].focus();
                break;
            case DOWN:
                if (index < slideLength -1){
                    index += 2;
                }
                slides[index].focus();
                break;
            // Case for up button.
            case LEFT:
                // If index is above 0.
                if (index > 0){
                    // Update index -1.
                    index -= 1;
                }
                // If index is 0.
                else{
                    // Set index to last anchor.
                    index = slideLength - 1
                }
                // Focus on current index.
                slides[index].focus();
                break;
                // Case for down button.
            case RIGHT:
                // If index is not above anchorLength.
                if (index < slideLength -1){
                    // Increment index.
                    index += 1;
                }
                // If index is at last anchor.
                else{
                    index = 0;
                }
                // Focus on current anchor index.
                slides[index].focus();
                break;
        }
    };



    /* When content is loaded. */
    document.addEventListener('DOMContentLoaded', function(ev) {

        // Add event listener for when a key is pressed down.
        window.addEventListener("keydown", function(e) {
            galleryHandleKeyDown(e, document.getElementById('lowerScreenMenu'));
        });

        // For each anchor, add event listener.
        for(var i = 0; i < slideLength; i++){
            slides[i].setAttribute('tabindex', i);
            // When focused on, apply active function with "this" selected anchor.
            slides[i].addEventListener('focus', active, false);
        }
    }, false);

})()
