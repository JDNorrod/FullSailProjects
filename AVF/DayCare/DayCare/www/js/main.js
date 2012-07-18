//Jonathan Norrod

//*************************some variables:
var vidList 			= ["Infant", "2-4 Years", "5-7 Years", "8-12 Years"];      //Values for dropBox

//*************************link and submit events:
var preview 			= $('#show');
var cForm 				= $('#contactForm');
var submitInfo          = $('#send');
var clearData           = $('#clear');

var onConfirm = function(){
    console.log("onconfirm called");
    $.mobile.changePage('#browse');
}

//**************************************************************infoForm.live is right here
$('#infoForm').live('pageinit', function(){
    console.log("infoForm is live");


//*************************List of Bindings:

    //Programming ninja right here (responsive disclosure)
	$('#allergy').on("change", function() {
        console.log("box checked");
        $('#messageBlock').fadeIn('slow');
    });
                    
    //*********************************clear local memory
    var clearAll = function(){
        window.localStorage.clear();
    }
                    
    clearData.bind("click", function(){
        clearAll();
        navigator.notification.alert(                                   //phoneGap notification
            'Children Cleared',                     //Message
            onConfirm,                         //callback
            'Success',                         //title
            'Okay');                           //buttonName
    });

    //*********************************get checkBox value
    var getCheckBoxes = function (){
        console.log("inside of the getCheckBox");

        if($('input:checkbox[name=allergy]:checked').val() === "Yes"){
            return($('input:checkbox[name=allergy]:checked').val());
        }
        else{
        return("No");
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

//***************************Listen for the Add Child button push to storeData
    var storeData = function (){

        cForm.validate();                                                   //validate the form before it's sent
        if(cForm.valid()){
            console.log("storing the data");
            var id = Math.floor(Math.random()*9999999);						//if theres no key, create new id
            //gather form field values and store in object
            //object props contain array with form label and input val
            var item        = {'_id':'child:' + id};
            item.pic        = $('#myImgae').src;
            console.log(item.pic);
            item.group		= ["Age Group: ", ($("#selector").val())]; 		//drop down box
            item.fname		= ["First Name: ", $('#fName').val()]; 	        //first name
            item.lname		= ["Last Name: ", $('#lName').val()]; 	    	//last name
            item.bday		= ["Birthday: ", $('#bday').val()]; 		    //birthday
            item.trained	= ["Is Trained?: ", getRadio()];			    //radios/attends life group?
            item.allergy    = ["Has Allergy?: ", getCheckBoxes()];          //checkbox/allergy
            item.comment	= ["Message: ", $('#message').val()];		    //extra notes
            console.log("This is what I will post: ", item);

            window.localStorage.setItem(id, (JSON.stringify(item)));
            $.mobile.changePage('#browse');
                    
        }//close if form valid
    }//close storeData
                    
    submitInfo.on("click", function (event) {
        event.preventDefault();
        storeData();
    });          

    //populate the drop box
    createDrop();                                              //populate the drop box
});

