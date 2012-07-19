var watchId = null;


function onBodyLoad()
{   
    console.log("geo page loaded");           	
    document.addEventListener("deviceready", onDeviceReady, false);
}

function geoSuccess(position) {
    console.log("Position Success");
    var lat     = position.coords.latitude;
    var long    = position.coords.longitude;
    
    var myOptions = {
    center: new google.maps.LatLng(lat, long),
    zoom: 18,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    
    
    var myLatlng    = new google.maps.LatLng(lat,long);
    var map         = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    var marker      = new google.maps.Marker({
                                             position: myLatlng,
                                             map: map,
                                             title:"You"
                                             });
}

function geoError(error){
    map_canvas.html('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
}

function onDeviceReady()
{
    var geoOpts = { enableHighAccuracy: true };
    watchId     = navigator.geolocation.watchPosition(geoSuccess, geoError, geoOpts);
    
}

var homeButton = document.getElementById('leaveGeo');
homebutton.addEventListener("click", function(){
                            
    console.log("watch cleared");
    navigator.geolocation.clearWatch(watchId);
});