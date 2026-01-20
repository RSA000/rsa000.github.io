
(function(){

    document.addEventListener('DOMContentLoaded', function(ev) {

        fetch('https://rsa000.github.io/3DSLibrary/assets/texts/nelly_bly.txt')
        .then(response => response.text())
        .then(text => {
            const portion = text.substring(0, 100); // first 100 characters
            document.getElementById('textContainer').textContent = portion;
        })
        .catch(error => console.error('Error loading text file:', error));
    }, false)
})()
