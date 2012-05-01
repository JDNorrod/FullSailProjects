//Activity 2 
//Visual Frameworks
//Jay Norrod 1202

//wait until the DOM is ready:
 window.addEventListener("DOMContentLoaded", function(){
 	
//****************************************************************functions 
	
//	 ******This function sets an integer value on the page to display the value of the slider bar*********/
	function setRating(){
		
		newValue = SS('sliderBar').value;
		console.log(newValue);
	 	
	 	var makeDiv = document.getElementById("sliderVal");
 		 makeDiv.innerHTML = newValue;
	}
	 	
 	function SS(value){
 		
 		var element = document.getElementById(value);
 		return element;
 	}
 	
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
		else check1 = "No";
 	}
 	
 	function toggleControls(n){
 		
 		switch(n){
 			case "on":
 			SS('contactForm').style.display = "none";
 			SS('send').style.display = "none";
 			SS('clear').style.display = "inline";
 			//SS('seeInfo').style.display = "block";
 			SS('addNew').style.display = "inline";
 				break;
 			case "off":
 			SS('items').style.display = "none";
 			SS('contactForm').style.display = "block";
 			SS('send').style.display = "inline";
 			SS('clear').style.display = "inline";
 			SS('addNew').style.display = "none";
 				break;
 			default: return false;
 		}
 	}
 	
 	function storeData (key){
 		//if theres no key, create new id
 		console.log("storing the data");
 		if(!key){
 			var id = Math.floor(Math.random()*9999999);
 		}
 		//if there is a key, set the id to the key to overwrite
 		else{
 			id = key;
 		}
 		console.log(id);
 		//gahter form field values and store in object
 		//object props contain array with form label and input val
 		getRadio();
 		getCheckBoxes();
 		var item 				= {};
 			  item.group		= ["Age Group: ", noNulls(SS('groups').value)]; 				//drop down box
 			  item.fname		= ["First Name: ", noNulls(SS('fName').value)]; 			//first name
 			  item.lname		= ["Last Name: ", noNulls(SS('lName').value)]; 			//last name
 			  item.bday		= ["Birthday: ", noNulls(SS('bday').value)]; 				//birthday
 			  item.slider		= ["Age: ", noNulls(SS('sliderBar').value)]; 		//like scale (slider)
 			  item.allergy		= ["Has Allergy?: ", check1];									//checkbox/allergy
 			  item.lifeGroup	= ["Attends Life Group: ", lifeGroupVal];								//radios/attends life group?
 			  item.comment	= ["Message: ", noNulls(SS('message').value)];			//extra notes
 		//save to local storage: use stringify to convert our obj to string (only strings can be saved)
 		localStorage.setItem(id, JSON.stringify(item));
 		alert("Form Submitted");
 	}
 	
 	function noNulls(value){ //if the value is null, change string
 		if (value === ""){
 			return "No response given";
 		}
 		else return value;
 	}
 
 	function localData(){
 		for(var j in json){
 		var id = Math.floor(Math.random()*9999999);
 		localStorage.setItem(id, JSON.stringify(json[j]));
 		}
 		showData();
 	} 	
 	function showData (){
 		toggleControls("on");
 		if (localStorage.length === 0){
 			alert("Loading JSON.")
 			localData();
 		}
 		else{
 		//first get from local storage to browser
 		 var makeDiv = document.getElementById("previewInfo");
 		 
 		 makeDiv.setAttribute("id", "items");
 		 var makeList = document.createElement('ul');		//create unordered list
 		 makeDiv.appendChild(makeList);
 		 document.body.appendChild(makeDiv);
 		 SS('items').style.display = "display"; //show list

 		 	for (var i = 0, len=localStorage.length; i < len; i++){
 		 		var makeLi = document.createElement('li');	//create a list item
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
 		 	
 		 		for (var j in obj){
 		 			var makeSubli = document.createElement('li');
 		 			makeSubList.appendChild(makeSubli);
 		 			var optSubText = obj[j][0]+" "+obj[j][1];  //separate the label with the value
 		 			console.log(obj[j][1]);
 		 			makeSubli.innerHTML = optSubText;
 		 			makeSubli.appendChild(linksLi);	
 		 		}
 		 	//create edit/delete buttons for each group of data
 		 	makeItemLinks(localStorage.key(i), linksLi);
 			}
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
 		editSubmit.addEventListener("click", validate);
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
 	
 	function validate(event){
 		
 		console.log("inside the validate");
 		//define elements to check
 		var getGroup = SS('groups');
 		var getfName = SS('fName');
 		var getlName = SS('lName');
 		//var getBday = SS('bday');
 		//var getSlider = SS('sliderBar');
 		var getMessage = SS('message');
 		
 		//reset error messages
 		errorMessage.innerHTML = "";
 		getGroup.style.border = "";
 		getfName.style.border = "";
 		getlName.style.border = "";
 		getMessage.style.border = "";
 		
 		//get error messages
 		var a_messages = [];
 		
 		//group validation
 		if (getGroup.value==="**Please Select a Category**"){
 			//user didn't select a vid
 			var groupError = "Please select an age group";
 			getGroup.style.border = "1px solid red";
 			a_messages.push(groupError);
 		}
 		
 		if(getfName.value === ""){
 			//name not entered
 			var fNameError = "Please enter first name";
 			getfName.style.border = "1px solid red";
 			a_messages.push(fNameError);
 		}
 		if(getlName.value === ""){
 			//name not entered
 			var lNameError = "Please enter last name";
 			getlName.style.border = "1px solid red";
 			a_messages.push(lNameError);
 		}
 		
 		//display errors if any
 		if (a_messages.length >= 1){
 			console.log("array >= 1");
 			//add each error to ul id "errors"
 			for (var i = 0, j = a_messages.length; i < j; i++){
 				var txt = document.createElement('li'); //creates a li for each index in the array
 				txt.innerHTML = a_messages[i];
 				errorMessage.appendChild(txt);
 			}
 			event.preventDefault();
 			return false;
 		}
 		else{
 			//if everything is ok, run submit using the key for the data so it overwrites instead of adding on
 			storeData(this.key);
 		}
 	}
 	
 //****************************************************************var defaults
 	var vidList = ["**Please Select a Category**", "Infant", "2-4 Years", "5-7 Years", "8-12 Years"];
 	var lifeGroupVal, check1; 
 	var errorMessage = SS('errorMessages');
 	createDrop();
 	setRating();
 //link and submit events:
 	var submitInfo = SS('send');
 	submitInfo.addEventListener("click", validate);
	var clearData =SS('clear');
	clearData.addEventListener("click", clearLocal);
	var preview = SS('show');
	preview.addEventListener("click", showData);
	var slideVal = SS('sliderBar');
	slideVal.addEventListener("change", setRating);
 });
