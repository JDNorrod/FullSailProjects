            	
				
				
				
			var updateItem = {};
				item._id = childId._id;
				
				item.lname = $('#lname').html();
            	item.fname = $('#fname').html();
            	item.age = $('#age').html();
            	item.trained = $('#trained').html();
            	item.bday = $('#bday').html();
            	item.group = $('#group').html();
            	//item.allergy = $('#allergy').html();
            	item.comment = $('#comment').html();
				
				$.couch.db('dbkids').saveDoc(item, {            	
					success: function(data) {            		
						console.log(status);            	
					}
				}
    }//close updatechild
