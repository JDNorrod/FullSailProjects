function(doc) {
	
	if (doc._id.substr(0, 6) === "child:"){ 		// this searches every id for child:
		emit(doc._id, {								//emit (or return) the id with:
			"fname": doc.fname,
			"lname": doc.lname,
			"age": doc.slider,
			"trained": doc.trained,					//add each of these values to the "value" so it's not null
			"allergy": doc.allergy,
			"comment": doc.comment,
			"bday": doc.bday
			
		});
	}
};

/*
'entry 3':{
    'group': ['Age Group: ', 'Infant'],
        'fname': ['First Name:', 'Sashi'],
        'lname': ['Last Name:', 'Norrod'],
        'bday': ['Birthday: ', '2007-08-21'],
        'slider': ['Age: ', '1'],
        'allergy': ['Has Allergy?: ', 'No'],
        'trained': ['Is Trained?:', 'No'],
        'comment': ['Message: ', 'One of the coolest kids ever!']
},
*/