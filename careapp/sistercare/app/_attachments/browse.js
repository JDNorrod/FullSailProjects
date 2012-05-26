 /*
'entry 3':{
    'group': ['Age Group: ', 'Infant'],
        'fname': ['First Name:', 'Sashi'],
        'lname': ['Last Name:', 'Norrod'],
        'bday': ['Birthday: ', '2007-08-21'],
        'slider': ['Age: ', '1'],
        'allergy': ['Has Allergy?: ', 'No'],
        'trained': ['Is Trained?:', 'No'],
        'comment': ['Message: ', 'One of the coolest kids ever!']
},
*/
//this will load the data.json on the infants browsing page
//load the data.json

$('#infants').live('pageinit', function(){
	console.log("We are live");
    
    
        //******************************************** load json
        $.ajax({
            url: '_view/kids',                        	 //this is where my json is located
            type: 'GET',                                 //What do we want to do?  get or post
            dataType: 'json',                            //what type of data?  this one is json
            success: function(resp){                     //if we find the file properly- do this, resp is what I choose to call my data
                console.log("This is my JSON: ", resp);  //can be named whatever by writing it in the () of the function
                $.each(resp.rows, function(index, item){
                    console.log('Item is: ' + item.id);
                     $('#underSix').append('<div data-role="collapsible">' +
	                    '<h3>' + item.value.lname[1] + ', ' + item.value.fname[1] + '</h3>' +
	                    '<p>Age: ' +
	                     	item.value.age[1] +
	                     	'&nbsp;&nbsp;' +
	                     	'&nbsp;&nbsp;LifeGroup: ' +
	                     	item.value.trained[1] +
	                     	'<a data-role="button" href="edit.html?_id=' + item.id + '">Edit/Delete</a>' + 
	                    '</p>' +
                 		'</div>').trigger('create');
                     
                     }); // close $.each
                }//close Success function
        });
        $('#removeList').remove();
        console.log($('#jsonList'));

    //******************************************** xml function to add it to the page
/*
    var parseXML = function (xml){
        console.log(xml);
        $(xml).find("item").each(function(){                                //look for each item tag in my xml
            var itemList = {};                                              //create empty object
            itemList.fname          = $(this).find("fname").text();
            itemList.lname          = $(this).find("lname").text();
            itemList.slider         = $(this).find("slider").text();
            itemList.trained        = $(this).find("trained").text();       //fill the object with my values
            console.log(itemList);

            $('#twoFour').after(' ' +
                '<li class="ui-li ui-li-static ui-body-a">' +
                '<h4>' + itemList.lname  +
                ', ' + itemList.fname +
                '</h4>' +
                '<p>Age: ' +
                itemList.slider +
                '&nbsp;&nbsp;' +
                '&nbsp;&nbsp;LifeGroup: ' +
                itemList.trained +
                '</p></li>');                                              //the above adds certain info to a <ul>

        });

    };

    $('#twoFour').on("click", function (){
    //***************************************** Here is where we retrieve the XML
        $.ajax({                                    //access the XML information
            type: "GET",                            //get the info (not post)
            url: "xhr/data.xml",                    //link to my xml data
            dataType: "xml",                        //if successful call the parseXML function defined above
            success: parseXML
            });
    });



    $('#services').on("click", function (){

        //******************************************** load CSV
        $.ajax({
            url: 'xhr/data.csv',                            //this is where my json is located
            type: 'GET',                                    //What do we want to do?  get or post
            dataType: 'text',                                //what type of data?  this one is json
            success: function(csvData){                     //if we find the file properly- do this
                console.log("This is my CSV: ", csvData);
                var items = csvData.split("\n");            //split each row up into an array
                for(var j=1; j < items.length; j++){
                    var row = items[j];
                    var columns = row.split(",");           //split the rows into individual arrays with commas as separators

                    console.log('CSV is: ', columns);
                    $('#services').after('' +
                        '<li class="ui-li ui-li-static ui-body-a">' +
                        '<p>Service Date: ' + columns[0] + '</p><p>' +
                        ' Infants: ' + columns[1] +
                        ' &nbsp;&nbsp; 2-4 Years: ' + columns[2] +
                        ' &nbsp;&nbsp; 5-7 Years: ' + columns[3] +
                        ' &nbsp;&nbsp; 8-12 Years: ' + columns[4] +
                        '</p></li>');
                }
            }
        });
    });*/
    $('#removeList').remove();
});


//**************************************This is where we make our editable page
$('#editChild').live('pageshow', function(){
	console.log("edit.js loaded");					//make sure page loaded right

	
	var splitURL = function (){
		var urlData = document.URL;		//get the url of the page we're on
		console.log("url is " + urlData);				//check the URL
		var	urlParts = urlData.split('?');			//divide the url at the ?
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
		return(idVals[key]);
	};
	
	var childToManip = splitURL();					//get the id of the child from the URL
	
    //******************************************** load json for that object
    var loadChild = function (myChild){
    	var childInView;
		$.couch.db('dbkids').openDoc(myChild, {
			success: function(data) {
				$('#getRidOf').remove();
				childInView = data;
        		console.log(data);
            	$('#lname').html(data.lname[1]).trigger('create');
            	$('#fname').html(data.fname[1]);
            	$('#age').html(data.slider[1]);
            	$('#trained').html(data.trained[1]);
            	$('#bday').html(data.bday[1]);
            	$('#group').html(data.group[1]);
            	$('#allergy').html(data.allergy[1]);
            	$('#comment').html(data.comment[1]);
	         }//close Success function
	    });
		console.log("child in view: ", data);
		return (data);
    }
    
    var currentChild = loadChild(childToManip);					//current child = the full data of the child
    
    //*******deleteChild function**************
    //*****************************************
    var deleteChild = function(removeID){
    	//console.log(splitURL());
    	var idToDelete = data.key[1];										//we need to get the revision before we can delete
    		console.log("we will remove: ", idToDelete);		//idToDelete must be an array of {id, rev}
    		$.couch.db('dbkids').removeDoc(idToDelete, {
    			success: function(data){
    			console.log("All your base are belong to us");
    			}
    		})	
    	}
    	$('#remove').on("click", function(){
    		deleteChild(childToManip);
    	});
    //*******************************************save the new information	
    	$('#update').on("click", function(){
            
    		$.couch.db('dbkids').saveDoc(currentChild, {
            	success: function(data) {
            		console.log(data);
            	}
            });
    	});
    
	//$('#addHere').editable();
	$('p.editable').editable();
	
});