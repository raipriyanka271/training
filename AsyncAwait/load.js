async function dispImage() {
    
    var xhr = new XMLHttpRequest();
    await xhr.open('GET', 'http://www.fromearthtotheuniverse.org/webimages/Desktops/m82_1920x1200.jpg', true);

    xhr.responseType = 'blob';

    xhr.onload = function (e) {
        if (this.status == 200) {
            var blob = this.response;
            document.getElementById("image").src = window.URL.createObjectURL(blob);
        }
    };
    
    xhr.onerror = function (e) {
        alert("Error " + e.target.status + " occurred while receiving the document.");
    };

    xhr.send();
}
dispImage();



