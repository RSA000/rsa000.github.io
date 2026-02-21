
(function(){
    // Store document elements for images, number of images, and set index.
    var slides = document.getElementsByClassName("mySlides");
    var slideLength = slides.length;
    var galleryImage = document.getElementById("galleryImage");
    var index = 0;

    /* Simba's */

    /* The active function changes the upper screen heading and subtitle the the selected elemements inner HTML and description attribute */
    var active = function(ev) {
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
                break;
            case DOWN:
                if (index < slideLength -2){
                    index += 2;
                }
                break;
            case LEFT:
                if (index > 0){
                    index -= 1;
                }
                else{
                    index = slideLength - 1
                }
                break;
            case RIGHT:
                if (index < slideLength -1){
                    index += 1;
                }
                // If index is at last anchor.
                else{
                    index = 0;
                }
                break;
        }
        // Focus on new slide index.
        slides[index].focus();
    };


    /* When content is loaded. */
    $(document).ready(function() { {

        window.removeEventListener("keydown", menuHandleKeyDown);

        // Add event listener for when a key is pressed down.
        window.addEventListener("keydown", function(e) {
            galleryHandleKeyDown(e, document.getElementById('lowerScreenContents'));
        });

        // For each anchor, add event listener.
        for(var i = 0; i < slideLength; i++){
            slides[i].setAttribute('tabindex', i);
            // When focused on, apply active function with "this" selected anchor.
            slides[i].addEventListener('focus', active, false);
        }
    });

})()
