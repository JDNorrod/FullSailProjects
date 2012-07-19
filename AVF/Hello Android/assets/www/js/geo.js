function onBodyLoad()
{	
    document.addEventListener("deviceready", onDeviceReady, false);
}

function runConfirm(){
	//exit
}

function onDeviceReady()
{
    
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
                'No Map for Android',                         	       	    	//title
                'Okay');             			            	               	//buttonName
        //console.log("All your base are belong to us");
    }//close on success;
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
    
    navigator.geolocation.getCurrentPosition(onSuccess, onError);                       //run geo from phoneGap
}