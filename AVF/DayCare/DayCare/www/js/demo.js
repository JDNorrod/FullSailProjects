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
        toggleDisplay($(this).attr('id'));                          //send id of clicked button to toggle display
    });
                
                
});