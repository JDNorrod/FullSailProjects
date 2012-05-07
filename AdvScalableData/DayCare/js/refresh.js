
$('#infoForm').live('pageinit', function(){
//this helps us to load a page in it's refreshed form
var toChangePage = function (toPageId) {                            //passes the page ID as argument using e
    console.log("to page = " + toPageId);
    $.mobile.changePage("#" + toPageId , {
        type:"post",
        data:$("form").serialize(),
        reloadPage:true
    });
};


//this will load infoForm when the + is pressed but by refreshing it
$("a[href='#infoForm']").on('click', function(e){                            //When + is pressed in the header on this page only
    e.preventDefault();                                             //stop the usual process
    console.log("Should move to infoForm with toChangePage function");
    toChangePage("infoForm");                                       //changePage loads page with refresh
});
});