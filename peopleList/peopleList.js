People = new Meteor.Collection("people");


if (Meteor.isClient) {
    
    Template.personList.people = function() {
        return People.find();
    };
    
    Template.personForm.events({
        "click button": function(e, t) {
        	var el = t.find("#name");
            if(el.value != "") {
            	People.insert({name: el.value});
            	el.value = "";
            }
        }
    });
    
    Template.person.editing = function() {
       return Session.get("edit-" + this._id);
    };
    
    Template.person.rendered = function() {
    	var input = this.find("input");
        if (input) {
            input.focus();
        }
    };
    
    Template.person.events({
        "click": function(e, t) {
			Session.set("edit-" + t.data._id, true);
        },
        "keypress input": function(e, t) {
            if(e.keyCode === 13) {
                var person = People.findOne(t.data);
                People.update({_id: person._id}, {$set: {name: e.currentTarget.value}});
                Session.set("edit-" + t.data._id, false);        
            }
        }
    });
}

