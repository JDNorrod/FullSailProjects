var onCamSuccess = function(imageData) {
        console.log("we have success");
        var image = document.getElementById('myImage');
//        image.src = "data:image/jpeg;base64," + imageData;
        image.src = Camera.DesitinationType.FILE_URI;
}
    
var onCamFail = function(message) {
        alert('Failed because: ' + message);
}
    
$('#takePic').bind("click", function(){
       navigator.camera.getPicture(onCamSuccess, onCamFail, { quality: 50,
                            destinationType: Camera.DestinationType.FILE_URI
        }); 
});