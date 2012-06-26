/***************************adjustName Function  	*/
var adjustName = function (name){
	var lowerCaseName 	= name.toLowerCase();								//convert to lowercase for db saving
	console.log("lower: " + lowerCaseName);
	var dbName = lowerCaseName;
	
	for(var i = 0; i < lowerCaseName.split(" ").length; i++){				//find out how many spaces (length is one more than amount of spaces)
		dbName = dbName.replace(" ", "_");									//4 every space, change to _
		console.log("for: ", dbName);
	}
	dbName = "cliq_" + dbName;
	console.log("dbName: " + dbName);
	return(dbName);															//return proper db name
};

/***************************CreateCliq Function  	*/
var createCliq = function (){
	var newCliq = {};
	newCliq._id = "cliq:" + Math.floor(Math.random()*9999999999999);		//create an _id format cliq:randomNumber
	newCliq.name 		= $("#cliqName").val();
	newCliq.adjName		= adjustName(newCliq.name);							//adjust name for couchdb purposes
	newCliq.access 		= $("#cliqPrivate").val();
	newCliq.about 		= $("#cliqAbout").val();
	
	console.log("Cliq created: ", newCliq);
	$.couch.db(newCliq.adjName).create({
		success: function(){
			alert("Clique Created!");
		}
	})
}


/*AddClique page goes live:***************/
$('#addClique').on('pageinit', function(){
	console.log("addclique loaded");
	
	$('#submitCliq').on("click", function(){
		createCliq();														//when create is pressed, create cliq in couch
	});
	
});