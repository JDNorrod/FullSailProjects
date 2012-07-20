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
                
    $('.network').bind('click', function(){                 //check the network connection    	
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
    
    $('#researchContent').append(' ' + 
    		'<h4>App-Store Giants</h4>' + 
    		'<p>Undeniably the top selling category across all stores and all devices is the games category.  Narrowing it down to puzzles, action etc... is a bit more difficult. Regardless, games have been dominating the mobile market over the years with the U.S, U.K and Japan having the tendency to generate the most revenue in the stores (and remarkably so); the trophy goes to the category of games for each of them.</p>' + 
    		'<p>Over the years, games have predominately held the most amount of top ten in the markets.  The USA and UK has held many social media applications in the coveted top ten lists, most notably of which being Face Book; supposedly having the most downloads of all time.  Japan leans towards placing entertainment higher than social media, but not with much distinction.</p>' + 
    		'<p>Looking at the market over the years is proof of one undeniable thing that people want in their device; a micro break.  A clear majority of top applications can be played or used for a short amount of time.  Playing a quick round of poker, trying to beat that one level or checking in at a certain location to let friends know what is for lunch.  People are looking for a quick fix, you will stand a much better chance at topping the charts with a micro-break type game.</p>' +
    		'<p>Specifically looking at the Japanese/Asian market, the most successful applications are those, which had a successful level of localization.  I believe personally that the Asian market is more willing than any other to consider games that have not been localized with Americans being the least willing to tolerate anything foreign.  On the contrary, those games that are successfully localized seem to become incredibly popular.</p>' +

    		'<h4>Talking OS</h4>' +
    		'<p>Speaking overall, as of July 2, 2012 - 64% of Android users are using Gingerbread version 2.3.X.  A stunning statistic being the current release of Ice Cream Sandwich is at 4.0.X .  When compared to the fact that well over 90% of iOS users are on the most recent release, it must be noted that just about every iOS device is capable of being upgraded to the newest OS.  Android devices have differing hardware capabilities which, limit many users from upgrading, while still providing a cheaper option to access the smartphone hysteria.</p>' +
    		'<p>In Developing for the Android OS, consideration has to be made both for current customer base and future usage.  It would make no sense to build an application that targets OS 2.3.X if the phones that operate on 2.3.X are likely to become deprecated over the next year.  On the contrary, targeting the more recent OS can result in such a small base of audience the application may never have a chance to come to a true fruition.</p>' +

    		'Carrier Limitations</h4>' + 
    		'<p>Currently, approximately 2% of mobile users consume more than 2GB of data per month whereas an amazing 65% use less than 200 megabytes per month.  Adjustments to data plans have been made to accommodate this meaning that a majority of users will be capped at 200MB and paying average $15-20 to do so.  Data intensive applications have so far been put to the wayside but with 4G capability rolling out over the country, I would be willing to be we will see a rise in data consumption as the masses see the potential of such incredible speeds.  Movie applications will no longer need as long to buffer, face time chats will be done anywhere and everywhere and mobile hotspots will likely see increases as users realize their phone can serve as a data source in a bind.</p>' +

    		'<h4>The Bottom Line</h4>' +
    		'<p>Taking all things into consideration, it is tempting to say we should go right now and develop a game, deploy it to iOS and Android 2.3+ for the US and UK (since localization is a little blurry between the two) and possibly work on localization for Japan at a later date.  If we want to be in the top we are going to be in the top it would make sense that a game will most likely get us there right?</p>' + 
    		'<p>The problem is, that while the majority of the chart toppers are games, the majority of the applications in the stores are also games.  A person would stand a much better chance at topping a category with less applications and in result gain more attention. It may take 3,000 downloads per day in order to be in the top ten for games, but it may only take 500 per day in a category like productivity.  If you can gain a spotlight in a lesser category, you will still achieve high results; sure we are not making $1 million a month like we dream of, but maybe with a bit more revenue we can move on to stage 2.</p>' +
    		'<p>Stage 2: One thing that can be ascertained by the most remarkable app store downloads is a little thing called legacy.  Angry Birds outer space broke incredible records on its release due to the hype of the already existing game.  Tetris has continued to be a popular game on any platform for over twenty years.  These legendary titles have a power to draw the masses based on a name.  Develop a small name, using a less than chart topping app and you may be able to propel yourself into the number one spot.  Think of it as drafting up to the competition like racers do.</p>' +
    		
    		
    		'<ul><li>(2010 UK) http://www.netimperative.com/news/2010/october/data-most-downloaded-mobile-apps-by-sector</li>' + 

    		'<li>(uk top)http://appherald.co.uk/iphone/top-grossing-iphone-app/</li>' +

    		'<li>(usa top)http://www.gabor-nagy.com/top300.html</li>' +

    		'<li>(top 10 all)http://www.apple.com/euro/itunes/charts/apps/top10appstorepaid.html</li>' +

    		'<li>(2011 all)http://www.huffingtonpost.com/2011/12/23/most-popular-apps-2011_n_1167623.html</li>' +

    		'<li>(Angry Birds)http://www.digitaltrends.com/mobile/simply-amazing-angry-birds-space-sets-new-record-with-50-million-downloads-in-35-days/</li>' +

    		'<li>(Asia analytics)http://techcrunch.com/2011/06/21/distimo-china-now-the-second-largest-iphone-app-market-after-the-u-s/</li>' +

    		'<li>(Android OS current)http://developer.android.com/about/dashboards/index.html</li>' +

    		'<li>(Data plans)http://www.smartmoney.com/spend/technology/understanding-new-data-plan-pricing/</li></ul>');

});