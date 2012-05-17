function(doc) {
	
	if (doc._id.substr(0, 6) === "child:"){
		emit(doc._id);
	}
};