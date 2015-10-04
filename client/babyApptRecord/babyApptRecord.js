  Template.babyApptRecord.events({
    "click .apptRowClick": function() {
      switch(this.visited) {
        case 0:
          Session.set("selectedApptData", this);
          $('#apptModal_Missed').openModal();
          break;
        case 1:
          Session.set("selectedApptData", this.desc);
          $('#apptModal_Visited').openModal();
          break;
        case 2:
          break;
      }
    }
  });

  Template.babyApptRecord.helpers({
    appt: function() {
      var childIC = Session.get("selectedChildIC");
      
      var childAppt = AppointmentRecords.find({nric: childIC}).fetch();
      childAppt = childAppt[0];

      childAppt.appt.sort(function(a, b) {
        var ta = a.date.split("/");
        var tb = b.date.split("/");
        var dA = new Date(ta[2], ta[1]-1, ta[0]);
        var dB = new Date(tb[2], tb[1]-1, tb[0]);
        return dB-dA;
      });

      for(var a=0; a < childAppt.appt.length; a++) {
        switch(childAppt.appt[a].visited) {
          case 1:
            childAppt.appt[a].visitedClass = "done"; break;
          case 0: 
            childAppt.appt[a].visitedClass = "clear"; break;
          case 2:
            childAppt.appt[a].visitedClass = ""; break;
          }
      }
      return childAppt.appt;
    },
    selectedApptDataRow: function() {
      return Session.get("selectedApptData");
    }
  });