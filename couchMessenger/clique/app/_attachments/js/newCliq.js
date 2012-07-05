/**_______________________________________________
Need to have a login screen and create a user based on email address/telephone#
the user doc needs to store picture plus personal info (gender, age, whatever)
user doc also needs to store cliques created and cliqs a part of
Is probably a good idea to store username in local so each page has easy access to
this info - possibly on login pull down latest info (cliqs, pic, etc..) to local
____________________________________________________*/

var userName = "JDNorrod";
var dbUser   = "user_jdnorrod"

/***************************adjustName Function  	*/
var adjustName = function (name){
	var lowerCaseName 	= name.toLowerCase();								//convert to lowercase for db saving
	console.log("lower: " + lowerCaseName);
	var dbName = lowerCaseName;
	
	for(var i = 0; i < lowerCaseName.split(" ").length; i++){				//find out how many spaces (length is one more than amount of spaces)
		dbName = dbName.replace(" ", "_");									//4 every space, change to _
		console.log("for: ", dbName);
	}//close for
	dbName = "cliq_" + dbName;
	console.log("dbName: " + dbName);
	return(dbName);															//return lowercase db name no spaces
};//close adjustName

var setCliqInfo = function (info){											//pass in the newCliq information (from createCliq)
	console.log("set cliq called: ", info);
	$.couch.db(info.adjName).saveDoc(info, {								//create new doc under cliq name for cliq info
		success: function(sent){											//_id format for cliq info is cliq:randomNumber
			console.log("sent: ", sent);
			$.mobile.changePage('#myCliques');								//return to the mycliq page
		}//close success
	})//close couchdb call
	$.couch.db('user_jdnorrod').saveDoc(info, {								//add the cliq to user profile
		success: function(sent){
			console.log("cliq added to user prof");
		}
	})
}//close setCliqInfo

var getCheckBox = function (){
    console.log($('input:checkbox[name=cliqPrivate]:checked').val());			//console log checked or not

    if($('input:checkbox[name=cliqPrivate]:checked').val() === "Private"){			//if checked return value (private)
        return($('input:checkbox[name=cliqPrivate]:checked').val());
    }
    else{																	//if not check return public
    return("Public");
    }
};


/***************************CreateCliq Function  	*/
var createCliq = function (){
	var newCliq = {};
	newCliq._id = "cliq:" + Math.floor(Math.random()*9999999999999);		//create an _id format cliq:randomNumber
	newCliq.name 		= $("#cliqName").val();
	newCliq.adjName		= adjustName(newCliq.name);							//adjust name for couchdb purposes
	newCliq.creator		= "userName";
	newCliq.access 		= getCheckBox();									//check whether private or public
	newCliq.about 		= $("#cliqAbout").val();
	
	console.log("Cliq created: ", newCliq);									
	$.couch.db(newCliq.adjName).create({									//create a new database for this cliq
		success: function(status){
			console.log("send ", newCliq, " to set");
			setCliqInfo(newCliq);											//add cliq information to db as doc
			alert("Clique Created!");
		}//close success
	});//close couchdb call
}//close createCliq


/*AddClique page goes live:***************/
$('#addClique').on('pageinit', function(){
	console.log("addclique loaded");
	
	$('#submitCliq').on("click", function(event){
		event.preventDefault();												//clear what JQM thinks this button should do
		createCliq();														//when create is pressed, create cliq in couch
	});
	
});
/*AddClique page ends here****************/

//******----------------------------------------
/******----------------------------------------
        <div id="spacer">
        <ul id = "messageList" data-role="listview" data-filter="true" data-inset="true" data-theme="a"></br>
            <li><a href="#anouncements">
                <h5 class="small">Goheen 12</h5>
                <p class="messageTitle">A clique for the members of Brian and Sarah.</p> <!-- clique info limited to 45 characters-->
            </a></li>
            <li><a href="#details">
                <h5 class="small">FSO MDVBS</h5>
                <p class="messageTitle">Students of FS in Mobile Development Program</p>
            </a></li>
//******----------------------------------------*/

$('#myCliques').on('pageinit', function(){
	console.log("my cliq page loaded");
	$.couch.db('user_jdnorrod').view("app/cliqs", {									//on page load retrieve users cliqs from user prof
		success: function(data){
			console.log("It worked you're a freaking genius ", data);
			$('#messageList').empty();												//first empty the html of it's frame
			$.each(data.rows, function(index, item){								//divide the rows of the object
				console.log(item.value.name, " ", item.value.about);
				$('#messageList').append('' + 
					'<li><a href="#anouncements?_id=' + item.value.adjName + '">' + //opening list item and anchor
					'<h5 class="small">' + item.value.name + '</h5>' +				//cliq name
					'<p class="messageTitle">' + item.value.about + '</p>' +		//clique info limited to 45 characters
					'</a></li>').listview("refresh");//close append
			})//close .each
			
		}//close sucess
	})//close couch call
});//close page




