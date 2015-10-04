Template.babyToothInfo.events({
  'click .tooth_m2': function() {
    Session.set("selectedTooth", 'm2');
  },
  'click .tooth_m1': function() {
    Session.set("selectedTooth", 'm1');
  },
  'click .tooth_canine': function() {
    Session.set("selectedTooth", 'canine');
  },
  'click .tooth_l': function() {
    Session.set("selectedTooth", 'l');
  },
  'click .tooth_c': function() {
    Session.set("selectedTooth", 'c');
  }
});

Template.babyToothInfo.helpers({
  hasSelectedTooth: function() {
      return (Session.get("selectedTooth") !== undefined);
  },
  getToothData: function() {
    var data = {
      name: "",
      desc: "",
      expectedAge: ""
    }

    var tooth = Session.get("selectedTooth");
    if(tooth === undefined)
      return data;

    switch(tooth) {
      case "m2":
        data.name = "Second Molar";
        data.desc = "Broad chewing surfaces with cusps for grinding food";
        data.expectedAge = "20 - 30 months old";
        break;
      case "m1": 
        data.name = "First Molar";
        data.desc = "Broad chewing surfaces with cusps for grinding food";
        data.expectedAge = "12 - 14 months old";
        break;
      case "canine":
        data.name = "Canine";
        data.desc = "For holding and tearing food";
        data.expectedAge = "16 - 18 months old";
        break;
      case "l": 
        data.name = "Lateral Incisor";
        data.desc = "For cutting/incising food";
        data.expectedAge = "7 - 9 months old";
        break;
      case "c": 
        data.name = "Central Incisor";
        data.desc = "For cutting/incising food";
        data.expectedAge = "6 - 8 months old";
        break;
    }

    return data;
  }
});