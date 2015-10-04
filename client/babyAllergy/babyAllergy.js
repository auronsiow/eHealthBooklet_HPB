Template.babyAllergy.events({
    'click .babyAllergyRow' : function() {
      event.preventDefault();
      Session.set('selectedAllergy', this.allergen);
      Session.set('selectedAllergyStatus', this.status);
      Session.set('selectedAllergyDesc', this.desc);
      $('#allergy_Modal').openModal();
    }
  });

  Template.babyAllergy.helpers({
    babyAllergy: function() {
      
      var childIC = Session.get("selectedChildIC");
      var childAllergyList = HealthRecords.find({nric: childIC}, {fields: {allergyList: 1}}).fetch();

      childAllergyList = childAllergyList[0].allergyList;

      for(var i=0; i < childAllergyList.length; i++) {
        switch(childAllergyList[i].status) {
          case "Confirmed":   childAllergyList[i].colorClass = "red accent-1"; break;
          case "Suspected":   childAllergyList[i].colorClass = "orange lighten-3"; break;
        }
      }

      childAllergyList.sort(function(a,b) {
        if(a.status > b.status)
          return 1;
        if(a.status < b.status)
          return -1;
        
        if(a.allergen > b.allergen)
          return 1;
        else
          return -1;
      });

      return _.map(childAllergyList, function(value, index) {
        return {index: (index+1), 
                allergen: value.allergen, 
                status: value.status, 
                desc: value.desc, 
                colorClass: value.colorClass};
      });
    },
    hasAllergyRecord: function() {
      var childIC = Session.get("selectedChildIC");
      var childAllergyList = HealthRecords.find({nric: childIC}, {fields: {allergyList: 1}}).fetch();
      return (childAllergyList[0].allergyList.length > 0);
    },
    dialogGetAllergen: function() {
      return Session.get('selectedAllergy');
    },
    dialogGetAllergenStatus: function() {
      return Session.get('selectedAllergyStatus')
    },
    dialogGetAllergenDesc: function() {
      return Session.get('selectedAllergyDesc');
    }
  });