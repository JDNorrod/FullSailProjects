
//this will load the data.json on the infants browsing page
//load the data.json

$.couch.urlPrefix = 'https:\/\/hereetestralseedingetura:EOLeMo7mfxBtYqXG2jGdJTXF@jdnorrod.cloudant.com';  //set prefix for db

$('#browse').live('pageinit', function(){
                  //console.log("We are live");
                  $('#underSix').empty();
                  
                  //******************************************** load json
                  $.ajax({
                         url: 'https:\/\/hereetestralseedingetura:EOLeMo7mfxBtYqXG2jGdJTXF@jdnorrod.cloudant.com\/dbkids\/_design\/app\/_view\/kids',           
                         type: 'GET',                                 //What do we want to do?  get or post
                         dataType: 'json',                            //what type of data?  this one is json
                         success: function(resp){                     //if we find the file properly- do this, resp is what I choose to call my data
                         //console.log("This is my JSON: ", resp);  //can be named whatever by writing it in the () of the function
                         $.each(resp.rows, function(index, item){
                                //console.log('Item ID is: ' + item.id);
                                //console.log('item is: ', item);
                                $('#underSix').append('<div data-role="collapsible">' +
                                                      '<h3>' + item.value.lname[1] + ', ' + item.value.fname[1] + '</h3>' +
                                                      '<p>Age: ' +
                                                      //item.value.age[1] +
                                                      '&nbsp;&nbsp;' +
                                                      '&nbsp;&nbsp;Potty Trained: ' +
                                                      item.value.trained[1] +
                                                      '<a data-role="button" src="external" data-ajax="false" href="edit.html?_id=' + item.id + '">Edit/Delete</a>' + 
                                                      '</p>' +
                                                      '</div>').trigger('create');
                                
                                }); // close $.each
                         }//close Success function
                         });
                  //console.log($('#jsonList'));
                  });


