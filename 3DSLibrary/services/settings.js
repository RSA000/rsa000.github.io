

/*
 * This is an immediately invoked function expression.
 * This means that after this function is created it will immediately run.
 * All variables are within the functions scope and not the main programs global scope;
 * this is a means of encapsulating data.
 */
(function(){



    /* Simba's */


    /* End of Simbas */



    /* When content is loaded. */
    document.addEventListener('DOMContentLoaded', function(ev) {

        inactive();

        // Add event listener for when a key is pressed down.
        window.addEventListener("keydown", function(e) {
            menuHandleKeyDown(e, document.getElementById('themeSettings'));
        });



    }, false);

})()



