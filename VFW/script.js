//Activity 2 
//Visual Frameworks
//Jay Norrod 1202

//wait until the DOM is ready:
 window.addEventListener("DOMContentLoaded", function(){
 	
//****************************************************************functions 
	
	
	  
	 /******																														 *******
	 ******This function sets an integer value on the page to display the value of the slider bar*********/
	function setRating(){
		
		newValue = $('sliderBar').value;
		console.log(newValue);
	 	
	 	var makeDiv = document.getElementById("sliderVal");
 		 makeDiv.innerHTML = newValue;
	}
	 	
 	function $(value){
 		
 		var element = document.getElementById(value);
 		return element;
 	}
 	
 //create select field
 	function createDrop (){
 		var formTag = document.getElementsByTagName("form"); //creates an array of all forms
 		var selectVid = $('select');
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
 	 
 	 function getMailRadio(){
 		var radios = document.forms[0].sendMail;
 		for(var i = 0; i < radios.length; i++){
 			if(radios[i].checked){
 				mailVal = radios[i].value;
 			}
 			else if(mailVal == ""){
 				mailVal = "No";
 			}
 			else mailVal = "No Selection";
 		}	
 	}
 	
 	function getCheckBoxes(){
 /*		var checks = document.forms[0].refer;
 		for(var i = 0; i < checks.length; i++){
 			if(checks[i].value === "checked")
 				refVal.push(checks[i].value);
 		}
*/
		var knowJay = $('knowJay');
		var browser = $('browser');
		var friend = $('friend');
		if(knowJay.checked){
			check1 = "Yes";
		}
		else check1 = "Not Selected";
		if(browser.checked){
			check2 = browser.value;
		}
		else check2 = "Not Selected";
		if(friend.checked){
			check3 = friend.value;
		}
		else check3 = "Not Selected";
 	}
 	
 	function storeData (key){
 		//if theres no key, create new id
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
 		getMailRadio();
 		getCheckBoxes();
 		var item 				= {};
 			  item.group		= ["Video: ", noNulls($('groups').value)]; 				//drop down box
 			  item.fname		= ["First Name: ", noNulls($('fName').value)]; 		//first name
 			  item.bday		= ["Birthday: ", noNulls($('bday').value)]; 				//birthday
 			  item.slider		= ["Like Scale: ", noNulls($('sliderBar').value)]; 	//like scale (slider)
 			  item.ref1			= ["Know Jay?: ", check1];
 			  item.ref2			= ["Found by: ", check2];
 			  item.ref3			= ["Found by: ", check3];						//referral
 			  item.mail			= ["Send Mail: ", mailVal];						//send jaymail?
 			  item.comment	= ["Message: ", noNulls($('message').value)];			//message content
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
 		console.log("category name is: " + catName);
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
 		var editText = "Edit Rating";
 		editLink.addEventListener("click", editForm); //listen for click
 		editLink.innerHTML = editText;		//add text for link
 		linksLi.appendChild(editLink);		//add our button to the bottom of our shown information

	//add line break
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
 		
 		var deleteLink = document.createElement('a');
 		deleteLink.href = "#";
 		deleteLink.key = key;
 		var deleteText = "Delete Rating";
 		deleteLink.addEventListener("click", deleteItem);
 		deleteLink.innerHTML = deleteText;		//add text for link
 		linksLi.appendChild(deleteLink);		//add our button to the bottom of our shown information
 	}
 	
 	function deleteItem(){
 		var ask = confirm("Are you sure you want to delete this rating?");
 		if(ask){//if the user clicked "ok"
 			localStorage.removeItem(this.key); //deleteItem has access to key through makeItemLink
 			alert("Rating deleted");
 			window.location.reload();
 		}
 		else{
 			alert("Rating was not deleted");
 		}
 	}
 	
 	function editForm(){
 		//grab item from local store to populate fields with what's in memory'
 		var value = localStorage.getItem(this.key);
 		var item = JSON.parse(value);
 		
 		
 		
 		//populate fields with local storage
 		$('groups').value = item.group[1];
 		$('fName').value = item.fname[1];
 		$('bday').value = item.bday[1];
 		$('sliderBar').value = item.slider[1];
 		$('message').value = item.comment[1];
 		var radios = document.forms[0].sendMail;
 		for (var i = 0; i < radios.length; i++){
 			if(radios[i].value == "yes" && item.mail[1] == "yes"){
 				radios[i].setAttribute("checked", "checked");
 			}
 			else if(radios[i].value == "no" && item.mail[1] == "no"){
 				radios[i].setAttribute("checked", "checked");
 			}
 		}
 		var checks = document.forms[0].refer; 
 			if(checks[i].value == "friend" &&  item.referal[1] == "checked"){
 				$('friend').setAttribute("checked", "checked");	
 			}
 			else if(checks[i].value == "knowJay" &&  item.referal[1] == "checked"){
 				$('knowJay').setAttribute("checked", "checked");
 			}
 			else if(checks[i].value == "browser" &&  item.referal[1] == "browsing"){
 				$('browser').setAttribute("checked", "checked");
 			}
 			
 		console.log("we're here");
 		//remove the listener from the submit button when in edit mode
 		submitInfo.removeEventListener("click", storeData);
 		//change the button to read "save"
 		$('send').value = "Save";
 		//save the key value established in this function as a property to overwrite info instead of add new
 		var editSubmit = $('send');
 		editSubmit.addEventListener("click", validate);
 		editSubmit.key = this.key;
 	}
 	
 	function clearLocal(){
 		if (localStorage.length === 0){
 			alert("There is nothing to clear");
 		}
 		else{
 			localStorage.clear();
 			alert("Comments have been deleted");
 			window.location.reload();
 			return false;
 		}
 	}
 	
 	function validate(event){
 		//define elements to check
 		var getGroup = $('groups');
 		var getName = $('fName');
 		//var getBday = $('bday');
 		//var getSlider = $('sliderBar');
 		var getMessage = $('message');
 		
 		//reset error messages
 		errorMessage.innerHTML = "";
 		getGroup.style.border = "";
 		getName.style.border = "";
 		getMessage.style.border = "";
 		
 		//get error messages
 		var a_messages = [];
 		
 		//group validation
 		if (getGroup.value==="**Please Select a Category**"){
 			//user didn't select a vid
 			var groupError = "Please select a video";
 			getGroup.style.border = "1px solid red";
 			a_messages.push(groupError);
 		}
 		if(getName.value === ""){
 			//name not entered
 			var nameError = "Please enter your first name";
 			getName.style.border = "1px solid red";
 			a_messages.push(nameError);
 		}
 		if(getMessage.value === "" || getMessage.value === "Hey Jay! ..."){
 			//message not entered
 			var messageError = "Please enter a comment for Jay";
 			 a_messages.push(messageError);
 			 getMessage.style.border = "1px solid red";
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
 	var vidList = ["**Please Select a Category**", "Jay-Mail", "Iraq-Adventure", "Other"];
 	var mailVal, check1, check2, check3; 
 	var refVal;
 	var errorMessage = $('errorMessages');
 	createDrop();
 	setRating();
 //link and submit events:
 	var submitInfo = $('send');
 	submitInfo.addEventListener("click", validate);
	var clearData =$('clear');
	clearData.addEventListener("click", clearLocal);
	var preview = $('show');
	preview.addEventListener("click", showData);
	var slideVal = $('sliderBar');
	slideVal.addEventListener("change", setRating);
 });
