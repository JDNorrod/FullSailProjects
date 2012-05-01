/*	allergyBox.click(function toggleComment(){
		//if(allergyBox.style.display == "none"){
			allergyBox.style.display = "block";
		//}
		//else{
		//	allergyBox.style.display = "none";
		//}
	})*/
$(document).ready(function(){
	
	//***********some variables:
	var vidList 			= ["**Please Select a Category**", "Infant", "2-4 Years", "5-7 Years", "8-12 Years"];
	var lifeGroupVal, check1;
 	var cForm 				= $('#contactForm'); 
 	var iForm				=$('#infoForm');

 	function SS(value){
 		var element = document.getElementById(value);
 		return element;
 	}
 	
 	//iForm.listview('refresh');
 	
 //*************************link and submit events:
 	var submitInfo 		    = SS('send');
	var clearData 			= SS('clear');
	var preview 			= SS('show');
	var slideVal 			= SS('sliderBar');
	var allergyBox 		    = SS('allergy');
	
//*************************Awwww Yeah!  Programming ninja right here (responsive disclosure)
	$('#allergy').bind("change", function() {
		var allergyBox = $('#messageBlock');
        console.log("box checked");
        SS('messageBlock').style.display = 'block';
    });
	
	
	
	function saveData (info){
	<!--console.log(info);  -->
	};

//	var	errorHandle		= $('#errorLink');
 	 cForm.validate({
 	 	//this is called in the event that the form isn't valid (form submitted, validated object)
 	 	invalidHandler: function(form, validator){
 	 		//errorHandle.click();
 	 		var html 			= "";
 	 		console.log(validator.submitted);
 	 		for(var key in validator.submitted){
 	 			var label 			= $('label[for^="' + key + '"]');
 	 			var legend 			= label.closest('fieldset').find('.ui-controlgroup-label');
 	 			var fieldName 	= label.length ? label.text() : legend.text();
 	 			if(legend.length){
 	 				fieldName =label.text(); 
 	 				console.log("label: " + fieldName);
 	 				console.log(legend.length);
 	 			}
 	 			// else if(label.text === ""){
 	 				// var fieldName = legend.text();
 	 				// console.log("label: " + fieldName);
 	 				// console.log(legend.length);
 	 			// }
 	 			
 	 			//console.log(fieldName);
 	 			html += '<li>' + fieldName + '</li>';
 	 		};
 	 		//$('#errorListing ul').html(html); // populate the error list into the dialog
 	 	},
 	 	//this is called if the form submits successfully
 	 	submitHandler: function(){
 	 		var data = cForm.serializeArray();
 	 		saveData(data);
 	 }
 	 
 	 }); 
 	
//****************************************************************functions 
	
 //create select field
 	function createDrop (){
 		var formTag = document.getElementsByTagName("form"); //creates an array of all forms
 		var selectVid = SS('select');
 	//var makeSelect = document.createElement('select');
 	//makeSelect.setAttribute("id", "groups");
 		selectVid.setAttribute("id", "groups");
 	
 	//populate  
 		for (var i = 0, j = vidList.length; i < j; i++){
 			var makeOpt = document.createElement('option');
 			var opText = vidList[i];
 			makeOpt.setAttribute("value", opText);
 			makeOpt.innerHTML = opText;
 			selectVid.appendChild(makeOpt);
 		}
 	}
 	 
 	 function getRadio(){
 		var radios = document.getElementById('contactForm').lifeGroup;
 		for(var i = 0; i < radios.length; i++){
 			if(radios[i].checked){
 				lifeGroupVal = radios[i].value;
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
 	
 	function toggleControls(n){
 		
 		switch(n){
 			case "on":
 			SS('contactForm').style.display = "none";
 			SS('send').style.display = "none";
 			SS('clear').style.display = "inline";
 			//SS('seeInfo').style.display = "block";
 			SS('previewInfo').style.display = "inline";
 				break;
 			case "off":
 			SS('items').style.display = "none";
 			SS('contactForm').style.display = "block";
 			SS('send').style.display = "inline";
 			SS('clear').style.display = "block";
 			//SS('addNew').style.display = "none";
 				break;
 			default: return false;
 		}
 	}
 	
 	function showData (){
 		toggleControls("on");
 		if (localStorage.length === 0){
 			alert("Loading JSON.");
 			localData();
 		}
 		else{
 		//first get from local storage to browser
 		 var makeDiv = document.getElementById('previewInfo');
 		 //oldDiv.appendChild(makeDiv);
 		 makeDiv.setAttribute("id", "items");
 		 makeDiv.setAttribute("data-role", "content");
 		 var makeList = document.createElement('ul');		//create unordered list
 		 makeList.setAttribute("data-role", "listview");
 		 makeList.setAttribute("data-inset", "true");
 		 makeList.setAttribute("data-filter", "true");
 		 
 		 makeDiv.appendChild(makeList);
 		 $('#previewInfo').append(makeDiv);
 		 
 		 SS('items').style.display = "display"; //show list

 		 	for (var i = 0, len=localStorage.length; i < len; i++){
 		 		var makeLi = document.createElement('li');	//create a list item
 		 		var makeBR = document.createElement('br');
 		 		makeLi.appendChild(makeBR);
 		 		var linksLi = document.createElement('li');
 		 		makeList.appendChild(makeLi);						
 		 		var keyVal = localStorage.key(i);
 		 		var value = localStorage.getItem(keyVal);
 		 		console.log(keyVal);
 		 		var obj = JSON.parse(value); 					//this converts the string back to an object, it's opposite of stringify
 		 		var makeSubList = document.createElement('ul');
 		 		makeLi.appendChild(makeSubList);
 		 	
 		 	//add our pic for each item
 		 		getImage(obj.group[1], makeSubList);
 		 		var newsList = [];
 		 		for (var n in obj){
 		 			// var optSubText = obj[n][0];
 		 			// console.log("optSubText: " + optSubText);
 		 			// if(optSubText == "Birthday: "){
 		 				// if
 		 			// }
 		 			newsList.push(obj[n]);
 		 		}
 		 		newsList.sort(sortNumber);
 		 		for (var o in obj){
 		 			
 		 		}
//***************************************************
//***************************************************This is where the array is getting out of order???
 		 	
 		 		for (var j = 0; j < newsList.length; j++){
 		 			console.log("The array is: " + newsList);
 		 			var makeSubli = document.createElement('li');
 		 			makeSubList.appendChild(makeSubli);
 		 			var optSubText = newsList[j][0]+" "+newsList[j][1];  //separate the label with the value
 		 			console.log(newsList[j][1]);
 		 			makeSubli.innerHTML = optSubText;
 		 			makeSubli.appendChild(linksLi);	
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
 	
 	function storeData (key){
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
 		var item 				= {};
 		
 			  item.group		= ["Age Group: ", SS('groups').value]; 				//drop down box
 			  item.fname		= ["First Name: ", SS('fName').value]; 				//first name
 			  item.lname		= ["Last Name: ", SS('lName').value]; 					//last name
 			  item.bday		= ["Birthday: ", SS('bday').value]; 						//birthday
 			  item.slider		= ["Age: ", SS('sliderBar').value]; 						//like scale (slider)
 			  item.allergy		= ["Has Allergy?: ", check1];								//checkbox/allergy
 			  item.lifeGroup	= ["Attends Life Group: ", lifeGroupVal];			//radios/attends life group?
 			  item.comment	= ["Message: ", SS('message').value];					//extra notes

 		//save to local storage: use stringify to convert our obj to string (only strings can be saved)
 		localStorage.setItem(id, JSON.stringify(item));
 		alert("Form Submitted");
 	}
 	
 	function noNulls(value){ //if the value is null, change string
 		if (value === ""){
 			return "No response given";
 		}
 		else{
 		return value;
 		}
 	}	
 	
 	function getImage(catName, makeSubList){
 		console.log("Age Group: " + catName);
 		var imageLi = document.createElement('li');
 		makeSubList.appendChild(imageLi); //makeSublist is from showData()
 		var newImg = document.createElement('img');
 		var setSource = newImg.setAttribute('src', "images/" + catName + ".png");
 		imageLi.appendChild(newImg);
 	}
 	
 	//create edit/delete links for each stored rating
 	function makeItemLinks(key, linksLi){
 		//add edit single item
 		var editLink = document.createElement('a');
 		editLink.href = "#";
 		editLink.key = key;
 		var editText = "Edit Child";
 		editLink.addEventListener("click", editForm); //listen for click
 		editLink.innerHTML = editText;		//add text for link
 		linksLi.appendChild(editLink);		//add our button to the bottom of our shown information

	//add line break
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
 		
 		var deleteLink = document.createElement('a');
 		deleteLink.href = "#";
 		deleteLink.key = key;
 		var deleteText = "Delete Child's Info";
 		deleteLink.addEventListener("click", deleteItem);
 		deleteLink.innerHTML = deleteText;		//add text for link
 		linksLi.appendChild(deleteLink);		//add our button to the bottom of our shown information
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
 	
 	function editForm(){
 		
 		//grab item from local store to populate fields with what's in memory'
 		var value = localStorage.getItem(this.key);
 		var item = JSON.parse(value);
		toggleControls("off");
 		//populate fields with local storage
 		SS('groups').value = item.group[1];
 		SS('fName').value = item.fname[1];
 		SS('lName').value = item.lname[1];
 		SS('bday').value = item.bday[1];
 		SS('sliderBar').value = item.slider[1];
 		SS('message').value = item.comment[1];
 		var radios = document.getElementById('contactForm').lifeGroup;
 		for (var i = 0; i < radios.length; i++){
 			if(radios[i].value == "Yes" && item.lifeGroup[1] == "Yes"){
 				radios[i].setAttribute("checked", "checked");
 			}
 			else if(radios[i].value == "No" && item.lifeGroup[1] == "No"){
 				radios[i].setAttribute("checked", "checked");
 			}
 		}
 		
 		if(item.allergy[1] == "Yes"){
 				SS('allergy').setAttribute("checked", "checked");	
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
 	
 	function clearLocal(){
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
 	
	function sortNumber(a,b){
		
		if(a[0] === "Birthday: "){
			console.log("........................" + a[0]);
			return a[1]-b[1];
		}
		return;
	}

	//******************************Make some things happen!!
	createDrop();
	clearData.addEventListener("click", clearLocal);
	preview.addEventListener("click", showData);
    submitInfo.addEventListener("click", storeData);
	cForm.validate();
	
});