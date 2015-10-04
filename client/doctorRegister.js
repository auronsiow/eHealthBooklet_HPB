Template.doctorRegister.events( {
    'submit form': function(event) {
      event.preventDefault();
      var userVar = event.target.loginId.value;
      var passwordVar = event.target.loginPassword.value;
      var docName = event.target.docName.value;
      var docPlace = event.target.docPlace.value;
      
      if(userVar === "" || passwordVar === '' || docName === "" || docPlace ==="")
        $('#modal_RegistrationFailed').openModal();
      else {
        console.log(userVar + "\n" + passwordVar + "\n" + docName + "\n" + docPlace);
        $('#modal_RegistrationSucceeded').openModal();
        event.target.loginId.value = event.target.loginPassword.value = event.target.docName.value = event.target.docPlace.value = "";
      }

      Accounts.createUser({
        username: userVar,
        password: passwordVar,
        profile: {
          doctorName: docName,
          doctorPlace: docPlace
        }
      });
    }
  });