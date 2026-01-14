Online Library for 3DS
----------------------------------

## Richard Sullivan Andison

### Example of an optimized website for nintendo 3DS :

 - Dual screen compatibility
 - D-Pad (left control pad) navigation.
 - Touchless navigation:
    * A - Select.
    * B - Navigate to previous page.
    * Left/Right Triggers - Navigate to previous/next page.
    * C-stick - Scroll.
    * Left stick - Scroll.
    * D-pad - Select elements.
 - 3D images

#### JavaScript

 - Vanilla JS
 - Based on focus/blur events
 - Use scrollTo() to prevent the user from scrolling
 - Selecting anchors via the CSS3 selector **a[href$='.mpo']**

#### CSS

 - Top screen is 400x215px
 - Bottom screen is 320x220px
 - Use **background** property to preview the 3D images

#### More

This is a basic demo of the New 3DS library and builds on Simbas boilerplate/template repo.

#### Changes
    
    0.0.0
    * Updated README From original
    * Adjusted Resolutions slightly (400x220 -> 400x215) top screen.
    * Updated photos.
    * Updated JavaScript to display .jpg instead of .mpo.
        * NOTE - Should be capable of both.
            * I copy-pasted the code and changed it back to .mpo. This works, but is sloppy.
    * Updated lower menu to be a vertical scrollable menu instead of grid system.
    * Updated HTML meta to include "initial-scale=1". This ensures that the screen loads at the correct scale. 
    * Updated JavaScript to include comments. 
    * Added "Texts" files to store utf-8 formatted books from project Gutenberg.org. An example text of "Ten Days in the Madhouse" by Nelly Bly as a future sample text. 
    
    0.0.1
    
    * Updated README to include verbose control descriptions.
    * Included site design pdf to demos folder and placed early demos in their own seperate folder.
    
----

#### Credits
 - [simbas.github.com/n3dsite](http://simbas.github.com/n3dsite) This entire project was started by cloning this repo.
 - [3dbrew](https://www.3dbrew.org/wiki/Internet_Browser) for information about 3ds browser
 - [Project Gutenberg](https://gutenberg.org/) - I acquired the "nelly_bly.txt" test text from the site. 
