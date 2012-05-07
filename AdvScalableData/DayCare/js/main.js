//Jonathan Norrod
//DayCare Project
//May 2012

//*************************some variables:
var vidList 			= ["Infant", "2-4 Years", "5-7 Years", "8-12 Years"];      //Values for dropBox

//*************************link and submit events:
var preview 			= $('#show');
var cForm 				= $('#contactForm');
var submitInfo          = $('#send');
var clearData           = $('#clear');


//**********************************************************************Key functions


//**************************************************************infoForm.live is right here
$('#infoForm').live('pageinit', function(){
          console.log("infoForm is live");

//*************************List of Bindings:

    //Programming ninja right here (responsive disclosure)
	$('#allergy').on("change", function() {
        console.log("box checked");
        $('#messageBlock').fadeIn('slow');
    });

    submitInfo.on("click", storeData);                        //when send is pressed store data
    preview.on("click", showData);                            //when See entries pressed show data
    clearData.on("click", clearLocal);                        //clear is pressed delete local memory

    //Initialization features:
    toggleList("on");                                          //Make sure that we see the infoForm
    createDrop();                                              //populate the drop box


//****************************************************************functions
    function toggleList(n){

        switch(n){
            case "off":
                $('#contactForm').hide();
                $('#send').hide();
                $('#clear').show();
                $('#seeInfo').show();
                $('#previewInfo').show();
                break;
            case "on":
                $('#items').hide();
                $('#contactForm').show();
                $('#send').show();
                $('#clear').show();
                $('#seeInfo').hide();
                break;
            default: return false;
        }
    }

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
    }

    //*********************************get Radio value
    var setCheckBoxes = function (myBox){
        console.log("my box is: " + myBox);
        if(myBox === "Yes"){
            $('input[name=allergy]').attr('checked', true);                 //set the checkbox
            $('input[name=allergy]').checkboxradio("refresh");              //refresh the checkbox

            $('#messageBlock').fadeIn('slow');
        }
    }

    //*********************************get Radio value
    function getRadio (){
        console.log($('input:radio[name=trained]:checked').val());
        return($('input:radio[name=trained]:checked').val());

    }
    //*********************************set the radio value for edit
    function setRadio(myRadio){
        if(myRadio === 'Yes'){
            console.log("set radio to yes");
            $('input:radio[name=trained]:nth(0)').attr('checked', true);
            $('input:radio[name=trained]').checkboxradio("refresh");
        }
        else{
            $('input:radio[name=trained]')[1].checked = true;
            $('input:radio[name=trained]').checkboxradio("refresh");
        }

    }

    //*********************************create selector field
 	function createDrop (){
 		var list = $('#selector');

 	//populate
 		for (var i = 0, j = vidList.length; i < j; i++){
            var opText = vidList[i];
            list.append("<option>" + opText + "</option>");
 		}
 	}
//*********************************display items list
 	function showData (){
        toggleList("off");
 		if (localStorage.length === 0){
 			alert("Loading JSON.");
 			localData();
 		}
 		else{
 		//first append an unordered List to our page
 		    var makeDiv = $('#seeInfo');
            makeDiv.attr("data-role", "content");
            makeDiv.append("<ul id=" + "dataList" + "></ul>");
            var makeList = $('#dataList');
            makeList.attr({
                dataRole: "listview",
                dataInset: "true",
                dataFilter: "true"
            });

            for (var i = 0, len=localStorage.length; i < len; i++){
                var makeLi = $("<li></li>");	//create a list item
                var linksLi = $("<li></li>");	//create a list item
                makeList.append(makeLi);
                var keyVal = localStorage.key(i);
                var value = localStorage.getItem(keyVal);
                //console.log("The Value in showData is: " + keyVal);
                var obj = JSON.parse(value); 	                //this converts the string back to an object, it's opposite of stringify
                //console.log("obj is = " + obj);
                var makeSubList = $('<ul></ul>');
                makeLi.append(makeSubList);

                //add our pic for each item
                getImage(obj.group[1], makeSubList);

                for (var j in obj){
                    var optSubText = obj[j][0]+" "+obj[j][1];                   //separate the label with the value
                    var makeSubli = $("<li></li>");
                    //console.log(obj[j][1]);
                    makeSubli.append(optSubText);
                    makeSubList.append(makeSubli);
                    makeSubli.append(linksLi);
                }
                //create edit/delete buttons for each group of data
                makeItemLinks(localStorage.key(i), linksLi);

 		    }
        }
    }

    //**************************************This stores the data locally when submit is pressed
    function localData(){
 		for(var j in json){
 		var id = Math.floor(Math.random()*9999999);
 		localStorage.setItem(id, JSON.stringify(json[j]));
 		}
 		showData();
 	}

    //**************************************This adds an image banner to each item in the info list
 	function getImage(catName, makeSubList){            //pass in the item selected in the drop box
 		var imageLi = $("<li></li>");                   //create a list item for the image
 		makeSubList.append(imageLi);                    //makeSublist is from showData()
 		var newImg = $("<img />");                      //add image tag
 		newImg.attr('src', "images/" + catName + ".png");     //image name matches dropbox selection
 		imageLi.append(newImg);                         //add the image to the list
 	}

 	//***************************************create edit/delete links for each stored item
 	function makeItemLinks(key, linksLi){
        var myKey = key;
 		//add edit single item
 		var editLink = $("<a></a>");
        var breakTag = $("</br>");
        var editLinkText = "Edit Child";
 	    //Set the attributes for our link
        editLink.attr({
            href: "#infoForm",
            key: myKey,
            class: "editEntry"
        })

        editLink.html(editLinkText);		               //add text for link
 		linksLi.append(editLink);
        linksLi.append(breakTag);		                   //add our button to the bottom of our shown information
         $('.editEntry', linksLi).on('click', function(){
             editForm(myKey);
         });      //listen for click to edit item

        //create the delete item link
 		var deleteLink = $("<a></a>");                      //anchor tag
        var deleteText = "Delete Child's Info";             //set tag for anchor to delete info
 		deleteLink.attr({                                   //set attributes for delete anchor
             href: "#",
             key: myKey,
             class: "deleteChild"
        });
 		deleteLink.html(deleteText);                        //add text for our link
 		linksLi.append(deleteLink);		                    //add our button to the bottom of our shown information
        $('.deleteChild', linksLi).on('click', function(){
            deleteItem(myKey);
         });

 	}

 	function deleteItem(myKey){
 		var ask = confirm("Are you sure you want to delete this child's information?");  //pop up confirm
 		if(ask){                                            //if the user clicked "ok"
 			localStorage.removeItem(myKey);                 //deleteItem has access to key through makeItemLink
 			alert("Child deleted");                         //popup confirmation
 			window.location.reload();                       //reload the window to empty the form
 		}
 		else{
 			alert("Child was not deleted");                 //popup showing cancel
 		}
 	}

 	var editForm = function(myKey){

        toggleList("on");                                  //bring back the infoForm
        //console.log("this is the broken part: ", myKey);
 		var value = localStorage.getItem(myKey);            //grab item from local store to populate fields with what's in memory
 		var item = JSON.parse(value);                       //Convert from string to object
        //console.log("value: ", item);
        //console.log(item.group[1]);                         //populate fields with local storage
 		$('#selector').val(item.group[1]);
 		$('#fName').val(item.fname[1]);
 		$('#lName').val(item.lname[1]);
 		$('#bday').val(item.bday[1]);
 		$('#sliderBar').val(item.slider[1]);
 		$('#message').val(item.comment[1]);                 //each of these retrieves values for each input

        if(item.allergy[1] == "Yes"){                       //populate the checkbox if selected
 				$('#allergy').attr("checked", "checked");
 			}

        setRadio(item.trained[1]);                          //set the radio appropriately
        console.log("The checkbox should be: " + item.allergy[1]);
        setCheckBoxes(item.allergy[1]);                     //set the checkBox if needed

 		submitInfo.unbind("click", storeData);              //remove the listener from the submit button when in edit mode

        $('#send').text = "Save";                           //change the button to read "save"
 		//save the key value established in this function as a property to overwrite info instead of add new
 		var editSubmit = $('#send');
 		editSubmit.on("click", function () {
             cform.validate();
             if (cForm.isValid){
                storeData();
             }
         });
 		editSubmit.key = this.key;
 	}


    //***************************Listen for the clear button to be pushed and clear memory
    function clearLocal (){
        if (localStorage.length === 0){
            alert("There is nothing to clear");
        }
        else{
            localStorage.clear();
            alert("All Children have been deleted");
            window.location.reload();
            return false;
        }
    }
//***************************Listen for the Add Child button push to storeData
    function storeData (key){

        cForm.validate();                                                   //validate the form before it's sent
        if(cForm.valid()){
            console.log("storing the data");
            var id;
            if(!key){                                                       //if theres no key, create new id
                id = Math.floor(Math.random()*9999999);
            }
            else{                                                           //if there is a key, set the id to the key to overwrite
                id = key;
            }
            console.log(key);
            //gather form field values and store in object
            //object props contain array with form label and input val
            var item        = {};

            getCheckBoxes(item.allergy);
            item.group		= ["Age Group: ", ($("#selector").val())]; 		//drop down box
            item.fname		= ["First Name: ", $('#fName').val()]; 	        //first name
            item.lname		= ["Last Name: ", $('#lName').val()]; 	    	//last name
            item.bday		= ["Birthday: ", $('#bday').val()]; 		    //birthday
            item.slider		= ["Age: ", $('#sliderBar').val()]; 		    //like scale (slider)
            //item.allergy	= ["Has Allergy?: ", check1];			        //checkbox/allergy
            item.trained	= ["Is Trained?: ", getRadio()];			    //radios/attends life group?
            item.comment	= ["Message: ", $('#message').val()];		    //extra notes

            //save to local storage: use stringify to convert our obj to string (only strings can be saved)
            localStorage.setItem(id, JSON.stringify(item));
            alert("Form Submitted");
        }
    }
});