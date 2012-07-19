$('#demo').live('pageshow', function(){
    //console.log('demo.js loaded');                                  //make sure page loaded right
                
    var toggleDisplay = function (showMe) {
    var showId = '#' + showMe + 'Content';
    //console.log(showId);
    $('#demoBackgroundContent').hide();
        $('.content').hide();                               //hide all to start
        $(showId).show();                                   //show selected category (initial state is background)
                
    }
    toggleDisplay('demoBackground');                                //initial hide all but background
    
                
    $('.button').bind('click', function(event){                     //watch for a button press
        //console.log('clicked: ' + $(this).attr('id'));
        var clicked = $(this).attr('id');
        
        if((clicked == 'cloudant') || (clicked == 'ghPage')){
            if(clicked == 'cloudant'){
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
                
    $('#network').bind("click", function(){                 //check the network connection    	
        var checkConnection = function() {
            var networkState = navigator.network.connection.type;
                    
            var states = {};
                states[Connection.UNKNOWN]  = 'Unknown connection';
                states[Connection.ETHERNET] = 'Ethernet connection';
                states[Connection.WIFI]     = 'WiFi connection';
                states[Connection.CELL_2G]  = 'Cell 2G connection';
                states[Connection.CELL_3G]  = 'Cell 3G connection';
                states[Connection.CELL_4G]  = 'Cell 4G connection';
                states[Connection.NONE]     = 'No network connection';
                       
            alert('You are currently using: ' + states[networkState]);
                       }
            checkConnection();
        
    });
    
    $('#researchContent').append(' ' + '<h4 class="blue">1. What are some of the ways that you could change your HTML on your Demo app to be more accessible? (Remember, you can use the Section tag with jQuery, for instance)</h4>' + 
        '<p>Some of the ways to make HTML for accessible are quite easy: ' + 
        '</br>-Use “Alt” in all images and videos to describe textually what the media is providing to users who can see it.' + 
        '</br>-Make sure that your page is viewable even without CSS.  If CSS is the only reason your page can be viewed – your page is NOT accessible to a lot of people!' + 
        '</br>-Most developers know to use web-safe colors, but are you using colors safe for the color blind?  Your page may look great with all these wonderful colors that most people can read, but will a color blind person be able to read it?</p>' + 
        
        '<h4 class="blue">2. Visit a video service on the web (like YouTube) and search for "Screen Reader Demo" and "Mobile Screen Reader" - what are some of the common frustrations (or common support mechanisms) that you see among the examples that are given - how could you fix them (or use them)?</h4>' + 
        
        '<p>Job Access with Speech (JAWS) is a program for reading screens to a user.  I would say one of the biggest drawbacks across the board is price and finesse.  These readers can be quite expensive, JAWS being close to $1,000.  In regards to operation and usability, the speech on most of these programs is very hard on the ears.  They are monotonous and hard to listen to for a very long time.  Companies will spend countless dollars and manpower trying to make a great visual interface for their application but the majority of these screen readers have a very rough voice talking to the user.' + 
        
        '</br>Really the best way to get around the rough interface of the screen reader is to spend the time making sure that users can quickly and proficiently utilize your application.  Imagine having to navigate a new website by ear and the links to all the pages are scattered in a counter-intuitive manner.  I would give up and go to another site.  Structure can help the user to quickly use your site/application with out too much pain of the annoying voice screaming at them.</p>' + 
        
        
        '<h4 class="blue">3.  Devices: Please list two devices (and some of their features) that are made specifically to support Accessibility: </h4>' + 
        '<p>The iPhone is not specifically engineered to be a device for the impaired but it grows closer to it every day.  With voice activated features and Siri, the iphone is able to dictate to the user or receive instruction from the user.  If the user is looking for a certain app, they’ll be able to open it via verbal instruction or, setup their iPhone to tell them which app they are opening when it opens.' + 
        
        '</br>The Clarity Alert Master is a device for the hearing impaired which alerts users to certain activity they would otherwise be unaware of.  Whenever there’s a knock at the door, someone rings the doorbell, the phone rings or the alarm clock goes off – this piece of equipment notifies the user via vibration or visual alerts.  There is a base station and a remote station which can be setup so that a flash of light will be seen to alert that someone is at the door, or the phone is ringing; and there’s a vibration mode to wake the user out of sleep at the appropriate time.  Accessibility is all about overcoming obstacles and this one does it.</p>' +
        
        '<h4 class="blue">4.  Mobile Apps: Please list two apps (either Android or iOS, or both) that are made specifically to support Accessibility: </h4>' + 
        '<p>The LookTel Money reader is a pretty unique application made by Ipplex that helps those who are vision impaired.  The user holds a form of currency up to the camera on the phone and LookTel will analyze and tell the user verbally what form of currency they are holding and what amount.  Come to think of it, next time I go out of country – I may download the app myself!' + 
        
        '</br>BuzzCards, a great application for the hearing impaired, stores lists of commonly used phrases, words and terms so that they can be used in a hurry.  I would venture to say that just because a person is hearing impaired does not mean they don’t like coffee – and I’d also be willing to be very few starbucks employees understand sign language.  This is no problem for BuzzCards users.  Just open the app, find your card where you’ve stored your order and show it to the attendant!</p>');
});