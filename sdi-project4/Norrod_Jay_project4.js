//Jay Norrod
//SDI 1201
//Library of cool functions

//****************************variables
var myEmail = "jonathan@aol.com";
var mySite = "https://jonathan.com/something";
var myDigits = "928-261-3275";
var kidAges = [19, 13, 8, 12, 43, 98, 20];
var stillKid = 12;
var numString = "32";
var decPlaces = 3;
var lowerCase = "this statement will have capitals";

//****************************functions
var checkEmail = function (email){  //validates the format of an email address

	var reEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return reEmail.test(email); // return true if format matches

};

var checkURL = function (url){
	var reURL = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i; // this won't accept bitly or shortened links
	return reURL.test(url);
};

var phoneCheck = function (yoNumba){
	var reNumber = /^(\d{3})[-](\d{3})[- ](\d{4})$/;
	return reNumber.test(yoNumba);
};

var numberCheck = function (inputArray, standard){
	var minArray = [];
	var closeToStandard;
	var lowest = 0;
	
	//first we'll find all numbers > standard and put them in a separate array
	for (var i = 0; i < inputArray.length; i++){
		if(inputArray[i] > 	standard){
			minArray.push(inputArray[i]);
		};
	};
	//This is where I show you how cool I am because I use the Ternary operator

	lowest = minArray[0];
	//Now we set the closestToStandard based on the lowest element in this array
	for (var j = 1; j < minArray.length; j++){
		console.log("Lowest = " + lowest);
		console.log(lowest + " < " + minArray[j] + "??");
		lowest = ((lowest < minArray[j]) ? lowest : minArray[j]);

		
		console.log(lowest);
	};
	return lowest; //return the closest to standard but higher than it
};

var numFromString = function (convert){
	return parseInt(convert);
}

var decimalPlaces = function (digit, places){

	return (digit.toFixed(places));
}

var fuzzyMatch = function (num, percentage, standard){
	ratio = percentage/100;
	console.log("ratio is " + ratio);
	greaterNum = standard + (standard * ratio);
	lesserNum = standard - (standard * ratio);
	console.log("lesser is " + lesserNum);
	console.log("greater is " + greaterNum);
	
	return (((num > lessNum) && (num < greaterNum)) ? true : false);
};

String.prototype.capitalize = function(){
   return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
};


//****************************Proof that I'm a programming ninja

//Email check
if (checkEmail(myEmail)){console.log("email is valid")}
else{console.log("HACKER ALERT!  You suck as a hacker, you entered the wrong format")};
//URL check
if (checkURL(mySite)){console.log("URL is properly formatted")}
else{console.log("Your webpage isn't real, get out of here.")};
//Check her digits
if (phoneCheck(myDigits)){console.log("It's for real y'all")}
else{ console.log("She's playin you man..  It ain't real")};
//Check the number in an array to a standard
console.log("The youngest person here that is not a kid is: " + numberCheck(kidAges, stillKid));
//convert string-number to number-number
console.log("The string " + numString + " converts to number " + numFromString(numString));
//set precision
console.log("Using " + decPlaces + " decimal places " + stillKid + " becomes " + decimalPlaces(stillKid, decPlaces));
//Check within Percentage
console.log("8.3 is within 10% of 8: " + fuzzyMatch(8.3, 10, 8));
//Make capital Letters
console.log("this statement becomes: " + lowerCase.capitalize());