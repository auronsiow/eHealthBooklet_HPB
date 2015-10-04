Template.mainContent.helpers({
  displayParticulars: function(display) {
    return (Session.get('display')==='displayParticulars');
  },
  displayImmunisation: function(display) {
    return (Session.get('display')==='displayImmunisation');
  },
  displayAllergy: function(display) {
    return (Session.get('display')==='displayAllergy');
  },
  displayBirthRecord: function(display) {
    return (Session.get('display')==='displayBirthRecord');
  },
  displayAppt: function(display) {
    return (Session.get('display')==='displayAppt');
  },
  displayPhys: function(display) {
    return (Session.get('display')==='displayPhys');
  },
  displayTooth: function(display) {
    return (Session.get('display')==='displayTooth');
  }
});