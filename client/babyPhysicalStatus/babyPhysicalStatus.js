Template.babyPhysicalStatus.events({
  "change #txt_height": function(event) {
    var h = $(event.target).val();
    if(!isNaN(h)) {
      Session.set("BMI_Height", h);
    }
  },
  "change #txt_weight": function(event) {
    var w = $(event.target).val();
    if(!isNaN(w))
      Session.set("BMI_Weight", w);
  },
  "change #txt_circum": function(event) {
    var c = $(event.target).val();
    if(!isNaN(c))
      Session.set("BMI_Circum", c);
  }
});

Template.babyPhysicalStatus.helpers({
    getBMI: function() {
      var h = Session.get("BMI_Height");
      var w = Session.get("BMI_Weight");

      if(h !== undefined && w !== undefined) {
        var value = (w/(h*h));
        return Math.round(value*100)/100;
      }
    }
});