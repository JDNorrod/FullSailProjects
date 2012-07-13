
function onBodyLoad()
{   
    console.log("geo page loaded");           	
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady()
{
    navigator.notification.alert("Cordova is working");
    var myOptions = {
    center: new google.maps.LatLng(-34.397, 150.644),
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
}