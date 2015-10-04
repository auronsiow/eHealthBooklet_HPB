Template.navigationBar.events( {
  'click .logout': function(event) {
    event.preventDefault();
    Meteor.logout();
  },
  'click .menu_immunisation' : function(event) {
    event.preventDefault();
    Session.set('display', 'displayImmunisation');
  },
  'click .menu_particulars': function(event) {
    event.preventDefault();
    Session.set('display', 'displayParticulars');
  },
  'click .menu_allergy': function(event) {
    event.preventDefault();
    Session.set('display', 'displayAllergy');
  },
  'click .menu_birthrecord': function(event) {
    event.preventDefault();
    Session.set('display', 'displayBirthRecord');
  },
  'click .menu_appt': function(event) {
    event.preventDefault();
    Session.set('display', 'displayAppt');
  },
  'click .menu_phys': function(event) {
    event.preventDefault();
    Session.set('display', 'displayPhys');
  },
  'click .menu_tooth': function(event) {
    event.preventDefault();
    Session.set('display', 'displayTooth');
  }
});