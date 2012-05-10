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

    //******************************************** load json
    $.ajax({
        url: 'xhr/data.json',                        //this is where my json is located
        type: 'GET',                                 //What do we want to do?  get or post
        dataType: 'json',                            //what type of data?  this one is json
        success: function(resp){                     //if we find the file properly- do this
            console.log("This is my JSON: ", resp);
            for(var i = 0, len=resp.request.length; i < len; i++){
                var item = resp.request[i];
                console.log('Item is: ', item);
                 $('#underSix').after(' ' +
                    '<li class="ui-li ui-li-static ui-body-a">' +
                    '<h4>' + item.lname[1]  +
                    ', ' + item.fname[1] +
                    '</h4>' +
                    '<p>Age: ' +
                    item.slider[1] +
                    '&nbsp;&nbsp;' +
                    '&nbsp;&nbsp;LifeGroup: ' +
                    item.trained[1] +
                    '</p></li>');
                 }
            }
    });
    $('#removeList').remove();
    $('#jsonList').listview('refresh');
    console.log($('#jsonList'));

    //******************************************** xml function to add it to the page

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
    //***************************************** Here is where we retrieve the XML
    $.ajax({                                    //access the XML information
        type: "GET",                            //get the info (not post)
        url: "xhr/data.xml",                    //link to my xml data
        dataType: "xml",                        //if successful call the parseXML function defined above
        success: parseXML
        });


    //******************************************** load CSV
    $.ajax({
        url: 'xhr/data.csv',                            //this is where my json is located
        type: 'GET',                                    //What do we want to do?  get or post
        dataType: 'text',                                //what type of data?  this one is json
        success: function(csvData){                     //if we find the file properly- do this
            console.log("This is my CSV: ", csvData);
            var items = csvData.split("\n");            //split each row up into an array
            for(var j=0; j < items.length; j++){
                var row = items[j];
                var columns = row.split(",");           //split the rows into individual arrays with commas as separators

                console.log('CSV is: ', columns);
                $('#underSix').after(' ');
            }
        }
    });
    $('#removeList').remove();

});