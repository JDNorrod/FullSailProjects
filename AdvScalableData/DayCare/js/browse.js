/*
"entry 3":{
    "group": ["Age Group: ", "Infant"],
        "fname": ["First Name:", "Sashi"],
        "lname": ["Last Name:", "Norrod"],
        "bday": ["Birthday: ", "2007-08-21"],
        "slider": ["Age: ", "1"],
        "allergy": ["Has Allergy?: ", "No"],
        "trained": ["Is Trained?:", "No"],
        "comment": ["Message: ", "One of the coolest kids ever!"]
},
*/

$('#infants').live('pageinit', function(){

    $.ajax({
        url: 'xhr/infants.json',
        type: "GET",
        dataType: "json",
        success: function(resp){
            console.log(resp);
        }

    })

   /* for(var j in json){
        console.log(json);
        $('<li><h4>' +
            lname[1]  + ', ' +
            fname[1] + '&nbsp;&nbsp;Edit &nbsp;Delete</h4>' +
            '<p>Age: ' + slider[1] + '&nbsp;&nbsp; Birthday: ' +
            bday[1] + '&nbsp;&nbsp;LifeGroup: ' + trained[1] + '</p></li>').appendTo('#underSix');
    }*/

});