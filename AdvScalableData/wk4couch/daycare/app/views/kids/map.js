function(doc) {
	
	if (doc._id.substr(0, 6) === "child:"){ 		// this searches every id for child:
		emit(doc._id, {								//emit (or return) the id with:
			"fname": doc.fname,
			"lname": doc.lname,
			"age": doc.slider,
			"trained": doc.trained					//add each of these values to the "value" so it's not null
			
		});
	}
};