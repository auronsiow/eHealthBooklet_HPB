Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

Template.registerHelper("equals", function(v1, v2) { return (v1===v2); } );
Template.registerHelper("not_equals", function(v1, v2) { return (v1!==v2); } );
Template.registerHelper("more_than", function(v1, v2) { return (v1>v2); } );
Template.registerHelper("more_than_equals", function(v1, v2) { return (v1>=v2); } );
Template.registerHelper("less_than", function(v1, v2) { return (v1<v2); } );
Template.registerHelper("less_than_equals", function(v1, v2) { return (v1<=v2); } );

Template.body.helpers({
	isDoc: function() {
		return (Session.get('role') === 'doctor');
	}
});

Template.body.events({

});