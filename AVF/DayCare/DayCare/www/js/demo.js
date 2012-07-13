$('#demo').live('pageshow', function(){
    console.log("demo.js loaded");                                  //make sure page loaded right
                
    var toggleDisplay = function (showMe) {
    var showId = "#" + showMe + "Content";
    console.log(showId);
    $('#demoBackgroundContent').hide();
        $('.content').hide();                               //hide all to start
        $(showId).show();                                   //show selected category (initial state is background)
                
    }
    toggleDisplay("demoBackground");                                //initial hide all but background
    
                
    $('.button').bind("click", function(event){                     //watch for a button press
        console.log("clicked: " + $(this).attr('id'));
        var clicked = $(this).attr('id');
        
        if((clicked == "cloudant") || (clicked == "ghPage")){
            if(clicked == "cloudant"){
                $.mobile.changePage('http://jdnorrod.cloudant.com/dbkids/_design/app/index.html');
            }
            else{
                $.mobile.changePage('http://jdnorrod.github.com/FullSailProjects/AVF/DayCare/DayCare/www/index.html');
            }
        }
        else{
            toggleDisplay(clicked);                          //send id of clicked button to toggle display
        }
    });
                
                
});