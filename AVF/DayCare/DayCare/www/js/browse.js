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
    navigator.getCurrentPosition(geoSuccess); 
	$('#underSix').empty();

        //******************************************** load json
        $.ajax({
            url: '_view/kids',                        	 //this is where my json is located
            type: 'GET',                                 //What do we want to do?  get or post
            dataType: 'json',                            //what type of data?  this one is json
            success: function(resp){                     //if we find the file properly- do this, resp is what I choose to call my data
                console.log("This is my JSON: ", resp);  //can be named whatever by writing it in the () of the function
                $.each(resp.rows, function(index, item){
                    console.log('Item ID is: ' + item.id);
                    console.log('item is: ', item);
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
        console.log($('#jsonList'));
});


//**************************************This is where we make our editable page
$('#editChild').live('pageshow', function(){
	//window.location.reload(true);
	console.log("edit.js loaded");						//make sure page loaded right
	
	var childID = {};									//******1.  this will hold the id and rev#
	
	var setObject = function(object){					//******5b. this will be used to set variables with the object key and rev
		console.log("set object is: ", object);
		childID._id = object._id;
		childID._rev = object._rev;
		console.log("id: ", childID);					//this creates our id and rev object for deleting data (6 at bottom)
	}
	
	
	
	var splitURL = function (){							//******2. take the id out of the URL
		var urlData = document.URL;						//get the url of the page we're on
		console.log("url is " + urlData);				//check the URL
		var	urlParts = urlData.split('?');				//divide the url at the ?
		var urlVals = urlParts[1].split('&');			//split at the & to get each part of the data	
		var idVals = {};
		for (var i in urlVals){
			var keyValue = urlVals[i].split('=');
			var key = decodeURIComponent(keyValue[0]);
			var value = decodeURIComponent(keyValue[1]);
			idVals[key] = value;
		}
		console.log("successful split");
		console.log(idVals[key]);
		return(idVals[key]);							//*****3a return to a variable (below)
	};

	var childToManip = splitURL();						//*****3b set the id from the URL to this var
	
    //******************************************** 		//*****4. load json for that id from URL
    var loadChild = function (myChild){
		$.couch.db('dbkids').openDoc(myChild, {
			success: function(data) {
				
				setObject(data);						//****5a pass the entire object to setObject (2p up)
        		console.log(data);
            	$('#lname').html(data.lname[1]).trigger('create');
            	$('#fname').html(data.fname[1]);
            	$('#trained').html(data.trained[1]);
            	$('#bday').html(data.bday[1]);
            	$('#group').html(data.group[1]);
            	//$('#allergy').html(data.allergy[1]);
            	$('#comment').html(data.comment[1]);
	         }//close Success function
	    });//close couchdb call
    }//close loadChild
    
    loadChild(childToManip);								//current child = the full data of the child
    
    //*******deleteChild function**************
    //*****************************************
    var deleteChild = function(removeID){						//*****7a. remove id = our id/rev from step one
    	var idToDelete = {};									//we need to get the revision before we can delete
    	idToDelete._id = removeID._id;
    	idToDelete._rev = removeID._rev;						//*****7b create a new object with the data to delete (not necessary but safe)
    	console.log("we will remove: ", idToDelete);			//idToDelete must be an object of {id, rev}
    	$.couch.db('dbkids').removeDoc(idToDelete, {			//*****7c call removeDoc, first argument is the id/rev object; second is success call
    		success: function(data){
    		console.log("All your base are belong to us");
    		}
    	})	
    }
    
    
    $('#remove').on("click", function(){						//******6a.  watch for the delete button to be clicked
    	console.log("remove this: ", childID);					//double check our id/rev
    		deleteChild(childID);								//******6b. call delete child and pass the id/rev obj from step 1/5
    		$.mobile.changePage( "index.html#browse", { transition: "slideup"} );
    });
   
    
    //*******************************************save the new information	
    $('#update').on("click", function(){
    		
        var updateItem = {};
        updateItem._id = childID._id;
        updateItem._rev = childID._rev;
        console.log("item in update is: ", childID);
        console.log("ID is: ", updateItem._id, " rev is: ", updateItem._rev);
        console.log("item being sent: ", updateItem);
       
        updateItem.lname 	= ['Last Name: ', $('#lname').html()];
        updateItem.fname 	= ['First Name: ', $('#fname').html()];
        updateItem.trained 	= ['Is Trained?: ', $('#trained').html()];
        updateItem.bday 	= ['Birthday: ', $('#bday').html()];
        updateItem.group 	= ['Age Group: ', $('#group').html()];
        //item.allergy 		= ['Has Allergy?: ', $('#allergy').val()];
        updateItem.comment 	= ['Message: ', $('#comment').html()];
       
        $.couch.db('dbkids').saveDoc(updateItem, {                       
            success: function(data) { 
            	console.log("All your base are belong to us");
            	console.log(status);
            	$.mobile.changePage( "index.html", { transition: "slidedown"} );
            	
            }//close success
        });//close couch call
            
	});//close update function
   
	//$('#addHere').editable();
	$('p.editable').editable();
	
});