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
        url: 'xhr/data.json',
        type: 'GET',
        dataType: 'json',
        success: function(resp){
            console.log(resp);
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

    //********************************************load XML

    var parseXML = function (xml){
        console.log(xml);
        $(xml).find("item").each(function(){
            var itemList = {};
            itemList.fname          = $(this).find("fname").text();
            itemList.lname          = $(this).find("lname").text();
            itemList.slider         = $(this).find("slider").text();
            itemList.trained        = $(this).find("trained").text();
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
                '</p></li>');

        });

    };

    $.ajax({                                    //access the XML information
        type: "GET",
        url: "xhr/data.xml",
        dataType: "xml",
        success: parseXML
        });


});