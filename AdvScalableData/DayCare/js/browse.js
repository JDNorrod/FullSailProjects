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

$('#infants').live('pageinit', function(){

    $.ajax({
        url: 'xhr/data.json',
        type: 'GET',
        dataType: 'json',
        success: function(resp){
            console.log(resp);
            for(var i = 0, len=resp.request.length; i < len; i++){
                var item = resp.request[i];
                console.log('Item is: ', item);
                 $('#underSix').append($(' ' +
                    '<li class=​&quot;ui-li ui-li-static ui-body-a&quot;><h4>' +
                    item.lname[1]  +
                    ', ' +
                    item.fname[1] +
                    '&nbsp;&nbsp;Edit &nbsp;Delete</h4>' +
                    '<p>Age: ' +
                    item.slider[1] +
                    '&nbsp;&nbsp; Birthday: ' +
                    item.bday[1] +
                    '&nbsp;&nbsp;LifeGroup: ' +
                    item.trained[1] +
                    '</p></li>'));
                 }
            }
    });
    $('#jsonList').listview('refresh');
    console.log($('#jsonList'));


});