//Jonathan Norrod

//*************************some variables:
var vidList 			= ["Infant", "2-4 Years", "5-7 Years", "8-12 Years"];      //Values for dropBox

//*************************link and submit events:
var preview 			= $('#show');
var cForm 				= $('#contactForm');
var submitInfo          = $('#send');
var clearData           = $('#clear');

//**************************************************************infoForm.live is right here
$('#infoForm').live('pageinit', function(){
    console.log("infoForm is live");

//*************************List of Bindings:

    //Programming ninja right here (responsive disclosure)
	$('#allergy').on("change", function() {
        console.log("box checked");
        $('#messageBlock').fadeIn('slow');
    });	                  

//****************************************************************functions

    //*********************************get checkBox value
    var getCheckBoxes = function (){
        console.log("inside of the getCheckBox");
        console.log($('input:checkbox[name=allergy]:checked').val());

        if($('input:checkbox[name=allergy]:checked').val() === "Yes"){
            return($('input:checkbox[name=allergy]:checked').val());
        }
        else{
        return("No");
        }
    };

    //*********************************get Radio value
    var setCheckBoxes = function (myBox){
        console.log("my box is: " + myBox);
        if(myBox === "Yes"){
            $('input[name=allergy]').attr('checked', true);                 //set the checkbox
            $('input[name=allergy]').checkboxradio("refresh");              //refresh the checkbox

            $('#messageBlock').fadeIn('slow');
        }
    };

    //*********************************get Radio value
    var getRadio = function (){
        console.log($('input:radio[name=trained]:checked').val());
        return($('input:radio[name=trained]:checked').val());

    };
    //*********************************set the radio value for edit
    var setRadio = function (myRadio){
        if(myRadio === 'Yes'){
            console.log("set radio to yes");
            $('input:radio[name=trained]:nth(0)').attr('checked', true);
            $('input:radio[name=trained]').checkboxradio("refresh");
        }
        else{
            $('input:radio[name=trained]')[1].checked = true;
            $('input:radio[name=trained]').checkboxradio("refresh");
        }

    };

    //*********************************create selector field
 	var createDrop = function (){
 		var list = $('#selector');

 	//populate
 		for (var i = 0, j = vidList.length; i < j; i++){
            var opText = vidList[i];
            list.append("<option>" + opText + "</option>").trigger('refresh');
 		}
 	};
                    
                    
    function onConfirm(){
         $.mobile.changePage('#browse');
    }

//***************************Listen for the Add Child button push to storeData
//    var storeData = function (){
    var storeData = function (){

        cForm.validate();                                                   //validate the form before it's sent
        if(cForm.valid()){
            console.log("storing the data");
            var id = Math.floor(Math.random()*9999999);						//if theres no key, create new id
            //gather form field values and store in object
            //object props contain array with form label and input val
            var item        = {'_id':'child:' + id};

            getCheckBoxes(item.allergy);
            //item._id		= "child:" + id;
            item.group		= ["Age Group: ", ($("#selector").val())]; 		//drop down box
            item.fname		= ["First Name: ", $('#fName').val()]; 	        //first name
            item.lname		= ["Last Name: ", $('#lName').val()]; 	    	//last name
            item.bday		= ["Birthday: ", $('#bday').val()]; 		    //birthday
            //item.allergy	= ["Has Allergy?: ", check1];			        //checkbox/allergy
            item.trained	= ["Is Trained?: ", getRadio()];			    //radios/attends life group?
            item.comment	= ["Message: ", $('#message').val()];		    //extra notes
            console.log("This is what I will post: ", item);

            //localStorage.setItem(id, JSON.stringify(item));
            //var saveThis = JSON.stringify(item);
            //$db = $.couch.db('dbkids');
            $.couch.db('dbkids').saveDoc(item, {
            	success: function(data) {
            		console.log(status);
                    navigator.notification.alert(
                            'Child Added',                                  //Message
                            onConfirm,                                      //callback
                            'Success',                                      //title
                            'Okay');                                        //buttonName
                }//close success
            });//close couch
        }//close if form valid
    }//close storeData
                    
    submitInfo.on("click", function (event) {
        event.preventDefault();
        storeData();
    });          

    //populate the drop box
    createDrop();                                              //populate the drop box
});