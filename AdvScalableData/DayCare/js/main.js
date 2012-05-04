//*************************Global-ish Vars
var trainedVal, check1;
var cForm 				= $('#contactForm');
//*************************Key functions
//***************************This retrieves the value of the radio
function getRadio(){
    var radios = document.getElementById('contactForm').trained;
    for(var i = 0; i < radios.length; i++){
        if(radios[i].checked){
            trainedVal = radios[i].value;
            console.log("the radio is worth: " + radios[i].value);
        }
    }
};
//***************************This retrieves the value of the checkboxes
function getCheckBoxes(){
    var hasAllergy = $('#allergy');
    if(hasAllergy.checked){
        check1 = hasAllergy.value;
    }
    else{

        check1 = "No";
    }
};
//********************************document.ready is right here
$(document).ready(function(){
	
//*************************some variables:
	var vidList 			= ["Infant", "2-4 Years", "5-7 Years", "8-12 Years"];
//*************************link and submit events:
	var preview 			= $('#show');
	var slideVal 			= $('#sliderBar');
	var allergyBox 		    = $('#allergy');
    var addItem             = $('#addItem');

//*************************Awwww Yeah!  Programming ninja right here (responsive disclosure)
	$('#allergy').bind("change", function() {
        console.log("box checked");
        $('#messageBlock').fadeIn('slow');
    });

//****************************************************************functions

 //*********************************create select field
 	function createDrop (){
 		var formTag = document.getElementsByTagName("form"); //creates an array of all forms
 		var list = $('#select');

 	//populate
 		for (var i = 0, j = vidList.length; i < j; i++){
            var opText = vidList[i];
            list.append("<option>" + opText + "</option>");
 		}
 	}

 	 function getRadio(){
 		var radios = document.getElementById('contactForm').trained;
 		for(var i = 0; i < radios.length; i++){
 			if(radios[i].checked){
 				trainedVal = radios[i].value;
 				console.log("the radio is worth: " + radios[i].value);
 			}
 		}
 	}

 	function getCheckBoxes(){
		var hasAllergy = SS('allergy');
		if(hasAllergy.checked){
			check1 = hasAllergy.value;
		}
		else{

		check1 = "No";
		}
 	}

 	function showData (){
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
            console.log(makeList);
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
                //console.log(keyVal);
                var obj = JSON.parse(value); 					//this converts the string back to an object, it's opposite of stringify
                var makeSubList = $('<ul></ul>');
                makeLi.append(makeSubList);

                //add our pic for each item
                getImage(obj.group[1], makeSubList);

                for (var j in obj){
                    var optSubText = obj[j][0]+" "+obj[j][1]; //separate the label with the value
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
 	function localData(){
 		for(var j in json){
 		var id = Math.floor(Math.random()*9999999);
 		localStorage.setItem(id, JSON.stringify(json[j]));
 		}
 		showData();
 	}

 	function getImage(catName, makeSubList){
 		//console.log("Age Group: " + catName);
 		var imageLi = $("<li></li>");
 		makeSubList.append(imageLi); //makeSublist is from showData()
 		var newImg = $("<img />");
 		newImg.attr('src', "images/" + catName + ".png");
 		imageLi.append(newImg);
 	}

 	//create edit/delete links for each stored rating
 	function makeItemLinks(key, linksLi){
 		//add edit single item
 		var editLink = $("<a></a>");
        var breakTag = $("</br>");
        var editLinkText = "Edit Child";
 	    //Set the attributes for oiur link
        editLink.attr({
            href: "#infoForm",
            key: key,
            id: "editEntry"
        })
        //console.log(editLink);
        editLink.html(editLinkText);		//add text for link
 		linksLi.append(editLink);
        linksLi.append(breakTag);		            //add our button to the bottom of our shown information
        $('#editEntry').bind("click", editForm(key));           //listen for click

        //create the delete item link
 		var deleteLink = $("<a></a>");
        var deleteText = "Delete Child's Info";
 		deleteLink.attr({
             href: "#",
             key: key,
             id: "deleteItem"
        });
 		deleteLink.html(deleteText);        //add text for our link
 		linksLi.append(deleteLink);		    //add our button to the bottom of our shown information
        deleteLink.bind("click", deleteItem);
 	}

 	function deleteItem(){
 		var ask = confirm("Are you sure you want to delete this child's information?");
 		if(ask){//if the user clicked "ok"
 			localStorage.removeItem(this.key); //deleteItem has access to key through makeItemLink
 			alert("Child deleted");
 			window.location.reload();
 		}
 		else{
 			alert("Child was not deleted");
 		}
 	}

 	function editForm(editkey){

 		//grab item from local store to populate fields with what's in memory'
 		//var value = localStorage.getItem(this.key);
        console.log("this.key: " + this.key);
 		var item = JSON.parse(value);
		//toggleControls("off"); // shouldn't need this anymore
 		//populate fields with local storage
        console.log(item.group[1]);
 		$('#groups').value = item.group[1];
 		$('#fName').value = item.fname[1];
 		$('#lName').value = item.lname[1];
 		$('#bday').value = item.bday[1];
 		$('#sliderBar').value = item.slider[1];
 		$('#message').value = item.comment[1];

         var radios = document.getElementById('contactForm').trained;
 		for (var i = 0; i < radios.length; i++){
 			if(radios[i].value == "Yes" && item.trained[1] == "Yes"){
 				radios[i].setAttribute("checked", "checked");
 			}
 			else if(radios[i].value == "No" && item.trained[1] == "No"){
 				radios[i].setAttribute("checked", "checked");
 			}
 		}

 		if(item.allergy[1] == "Yes"){
 				$('#allergy').setAttribute("checked", "checked");
 			}


 		console.log("we're here");
 		//remove the listener from the submit button when in edit mode
 		submitInfo.removeEventListener("click", storeData);
 		//change the button to read "save"
 		SS('send').value = "Save";
 		//save the key value established in this function as a property to overwrite info instead of add new
 		var editSubmit = SS('send');
 		//editSubmit.addEventListener("click", validate);
 		editSubmit.key = this.key;
 	}

	//******************************Make some things happen by calling the functions
	createDrop();
    showData();
});
//***************************Listen for the clear button to be pushed and clear memory
var clearData = $('#clear');
clearData.click(function(){
    if (localStorage.length === 0){
        alert("There is nothing to clear");
    }
    else{
        localStorage.clear();
        alert("All Children have been deleted");
        window.location.reload();
        return false;
    }
});
//***************************Listen for the Add Child button push to storeData
var submitInfo = $('#send');
submitInfo.click(function(key){
    //***************************validate the form before it's sent
    cForm.validate();
    if(cForm.valid()){
        //if theres no key, create new id
        console.log("storing the data");
        var id;
        if(!key){
            id = Math.floor(Math.random()*9999999);
        }
        //if there is a key, set the id to the key to overwrite
        else{
            id = key;
        }
        console.log(id);
        //gather form field values and store in object
        //object props contain array with form label and input val
        getRadio();
        getCheckBoxes();
        var item        = {};

        item.group		= ["Age Group: ", $('#groups').value]; 		//drop down box
        item.fname		= ["First Name: ", $('#fName').value]; 	    //first name
        item.lname		= ["Last Name: ", $('#lName').value]; 		//last name
        item.bday		= ["Birthday: ", $('#bday').value]; 		//birthday
        item.slider		= ["Age: ", $('#sliderBar').value]; 		//like scale (slider)
        item.allergy	= ["Has Allergy?: ", check1];			    //checkbox/allergy
        item.trained	= ["Is Trained?: ", trainedVal];			//radios/attends life group?
        item.comment	= ["Message: ", $('#message').value];		//extra notes

        //save to local storage: use stringify to convert our obj to string (only strings can be saved)
        localStorage.setItem(id, JSON.stringify(item));
        alert("Form Submitted");
    }
});

