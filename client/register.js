Template.register.events( {
    'submit form': function(event) {
      event.preventDefault();
      var userVar = event.target.registerId.value;
      var passwordVar = event.target.registerPassword.value;
      
      Accounts.createUser({
        username: userVar,
        password: passwordVar
      });
    }
  });