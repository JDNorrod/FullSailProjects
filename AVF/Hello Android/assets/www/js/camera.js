var onCamSuccess = function(imageData) {
        //console.log("we have success");
        var image = $('#myImage');
        image.attr("src", "data:image/jpeg;base64," + imageData);
        image.height('20%');
        image.width('30%');
       // image.src = Camera.DesitinationType.FILE_URI;
}

var onAndroidSuccess = function(imageData) {
    var image = $('#myAndImage');
    image.attr("src", "data:image/jpeg;base64," + imageData);
    image.height('20%');
    image.width('30%');
   // image.src = Camera.DesitinationType.FILE_URI;
}
    
var onCamFail = function(message) {
        alert('Failed because: ' + message);
}
    
$('.iosCamera').bind("click", function(){
       navigator.camera.getPicture(onCamSuccess, onCamFail, { quality: 50,
                            destinationType: Camera.DestinationType.DATA_URL,
                                   saveToPhotoAlbum: true
        }); 
});

$('#andCamera').bind("click", function(){
    navigator.camera.getPicture(onAndroidSuccess, onCamFail, { quality: 50,
                         destinationType: Camera.DestinationType.DATA_URL,
                                saveToPhotoAlbum: true
     }); 
});