
var geoSuccess = function (position) {
    console.log('Latitude: '        + position.coords.latitude          + '\n' +
                'Longitude: '         + position.coords.longitude         + '\n' +
                'Altitude: '          + position.coords.altitude          + '\n' +
                'Accuracy: '          + position.coords.accuracy          + '\n' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                'Heading: '           + position.coords.heading           + '\n' +
                'Speed: '             + position.coords.speed             + '\n' +
                'Timestamp: '         + position.timestamp                + '\n');
};
//this will load the data.json on the infants browsing page
//load the data.json

$('#browse').live('pageinit', function(){
	console.log("We are live");
    $('#underSix').empty();
      $.ajax({
         url: 'https:\/\/hereetestralseedingetura:EOLeMo7mfxBtYqXG2jGdJTXF@jdnorrod.cloudant.com\/dbkids\/_design\/app\/_view\/kids',
         type: 'GET',                                   //What do we want to do?  get or post
         dataType: 'json',                              //what type of data?  this one is json
         success: function(resp){                       //if we find the file properly- do this, resp is what I choose to call my data
             console.log("This is my JSON: ");          //can be named whatever by writing it in the () of the function
             $.each(resp.rows, function(index, item){
                    console.log('Item ID is: ' + item.id);
                    //console.log('item is: ', item);
                    $('#underSix').append('<div data-role="collapsible">' +
                                          '<h3>' + item.value.lname[1] + ', ' + item.value.fname[1] + '</h3>' +
                                          '&nbsp;&nbsp;' +
                                          '&nbsp;&nbsp;Potty Trained: ' +
                                          item.value.trained[1] +
                                          '<a data-role="button" data-ajax="false" href="edit.html?_id=' + item.id + '">Edit/Delete</a>' + 
                                          '</p>' +
                                          '</div>').trigger('create');
                    
            }); // close $.each
        }//close Success function
    });
});

$('#location').on('pageshow', function(){
  console.log("location page");
                  
  var popUp = function (){
      navigator.notification.alert(
           'At Location',                                  //Message
           onConfirm,                                      //callback
           'Success',                                      //title
           'Okay');                                        //buttonName
  };
                  
  $('#getLocation').on("click", function(){
        console.log("clicked");

    });
    
});
