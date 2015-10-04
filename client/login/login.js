Template.login.events( {
  'submit form': function(event) {
    event.preventDefault();
    var userVar = event.target.loginId.value;
    var passwordVar = event.target.loginPassword.value;

    Meteor.loginWithPassword(userVar, passwordVar, function(err) {
      if(err) {
        Materialize.toast("Invalid Username/Password", 1500);
      }
      else {
        if(Meteor.user().profile === undefined) {
          Session.set("role", "parent");
          Session.set('userNric', userVar);
          var dbChildrenRecord = HealthRecords.find( {$or:[{m_nric: userVar} , {f_nric: userVar}]} ).fetch();
          Session.set("selectedChildIC", dbChildrenRecord[0].nric);
          Session.set('selectedChildIndex', 0);
          Session.set('display', 'displayParticulars');
          Session.set("selectedTooth", undefined);
        }
        else {
          Session.set("role", "doctor");
        }

      }
    });
  }
});

