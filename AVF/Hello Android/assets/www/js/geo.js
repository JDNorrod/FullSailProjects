function onBodyLoad()
{	console.log("onbodyload geo.js");	
    document.addEventListener("deviceready", onDeviceReady, false);
}

function runConfirm(){
	//exit
}

function onDeviceReady()
{
    navigator.geolocation.getCurrentPosition(onSuccess, onError);                       //run geo from phoneGap
    
    function onSuccess(position){                                                       //successful gps retrieval
        var myPos   = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var homePos = new google.maps.LatLng(32.6299, -114.57025);
        navigator.notification.alert(
               'Latitude: '          + position.coords.latitude          + '\n' +
               'Longitude: '         + position.coords.longitude         + '\n' +
               'Altitude: '          + position.coords.altitude          + '\n' +
               'Accuracy: '          + position.coords.accuracy          + '\n' +
               'Timestamp: '         + new Date(position.timestamp)      + '\n',
                runConfirm,                      			                	//callback
                'No Map for Android',                         	           	//title
                'Okay');             			            	               	//buttonName
        console.log("All your base are belong to us");
        
        var myOptions = {                                                               //google map setup
        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),//center on position
        zoom: 18,                                                                   //zoom in close
        mapTypeId: google.maps.MapTypeId.ROADMAP                                    //define map type
        };
        
        var map     = new google.maps.Map(document.getElementById("map_canvas"), myOptions);    //create the map and append
        var myPoint = new google.maps.Marker({
                                             position: myPos,
                                             map: map,
                                             title: "You"
                                             });
        var dayCare = new google.maps.Marker({
                                             position: homePos,
                                             map: map,
                                             animation: google.maps.Animation.BOUNCE,
                                             title: "Destination"
                                             });
    }
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
}
//onBodyLoad();