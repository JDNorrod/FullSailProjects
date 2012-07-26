
//this will load the data.json on the infants browsing page
//load the data.json

$('#browse').live('pageinit', function(){
       // alert("We are live");
        $('#underSix').empty();
          
        //check the screen size and adjust if tablet or greater
        var tablet  = false;
        var editURL; 
        if ($(window).width() > 1000){              //if window is size of ipad or larger
            tablet  = true;                         //set control variable
            $('#tabletEdit').show();                //show edit feature
            var windowHeight = $(window).height();
            $('#tabletEdit').height(windowHeight);
            $('#underSix').height(windowHeight);
            $('#underSix').width('50%');
        }
          
          //******************************************** load json
        $.ajax({
            url: 'https:\/\/hereetestralseedingetura:EOLeMo7mfxBtYqXG2jGdJTXF@jdnorrod.cloudant.com\/dbkids\/_design\/app\/_view\/kids',           
            type: 'GET',                                 //What do we want to do?  get or post
            dataType: 'json',                            //what type of data?  this one is json
            success: function(resp){                     //if we find the file properly- do this, resp is what I choose to call my data
               
                //console.log("This is my JSON: ", resp);  //can be named whatever by writing it in the () of the function
                $.each(resp.rows, function(index, item){
                    //if tablet is false adjust link for each child (add url to href)
                       var trained;
                       var fname;
                       var lname;
                       var age;
                    if(tablet){
                        editURL = "";
                    }
                    else{
                        editURL = 'edit.html?_id=' + item.id;   //if !tablet external edit.html & pass id
                    }
                    //setup values in case of null   
                    if(item.value.trained[1] == ""){
                       trained = "unknown";
                    }
                    else{
                       trained = item.value.trained[1];
                    }
//                    if(item.value.age[1] == ""){
//                       age = "unknown";
//                    }
//                    else{
//                       age = item.value.age[1];
//                    }
                    $('#underSix').append(' ' + '<li id=' + item.id + '><a class="childLink" data-role="button" src="external" id="' + item.id + '" data-ajax="false" href=' +        
                                            editURL + '>' +
                                            '<h3 class="left">' + item.value.lname[1] + ', ' + item.value.fname[1] + '</h3>' +
                                            '<p class="pLarge">Age: ' +
                                            //age + 
                                            '&nbsp;&nbsp;' +
                                            '&nbsp;&nbsp;Potty Trained: ' +
                                            trained +
                                            '</p>' +
                                            '</a></li>').listview('refresh');
                       if(tablet){
                       $('.childLink').on("click", function(event){
                        event.preventDefault();
                                          alert(this.id);
                                          var idToPass = this.id;
                                           //console.log(data);
                                           $('#lname').html(item.value.lname[1]).trigger('create');
                                           $('#fname').html(item.value.fname[1]);
                                           //$('#age').html(data.age[1]);
                                           $('#trained').html(item.value.trained[1]);
                                           $('#bday').html(item.value.bday[1]);
                                           $('#group').html(item.value.group[1]);
                                           //$('#allergy').html(data.allergy[1]);
                                           $('#comment').html(item.value.comment[1]);
                        //var selectedChild = this.attr('id');
                        //loadChildTablet(selectedChild);
                        });
                    } 
                }); // close $.each
            }//close Success function
        });//close ajax
});


