
var myLocation;
               
var geoSuccess = function (position) {                               //successful geolocation
    myLocation = position;
    console.log('Latitude: '             + position.coords.latitude          + '\n' +
                'Longitude: '         + position.coords.longitude         + '\n' +
                'Altitude: '          + position.coords.altitude          + '\n' +
                'Accuracy: '          + position.coords.accuracy          + '\n' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                'Heading: '           + position.coords.heading           + '\n' +
                'Speed: '             + position.coords.speed             + '\n' +
                'Timestamp: '         + position.timestamp                + '\n');
    return;
};//close geoSuccess
   

var geoError = function (error){                                     //geolocation failed
   console.log("code: "    + error.code    + "\n" +
               "message: " + error.message + "\n");
    return;
};//close geoError


var runGeo = function (){
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);     //get geolocation
    console.log("returning: " + myLocation.coords.latitude);
    return(myLocation);
};
