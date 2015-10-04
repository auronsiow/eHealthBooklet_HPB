Session.set("immuAgeCard", "Select age to view recommended immunisation dosage");
Session.set("selectedImmuAge", "");
Session.set('selectedImmuType', "");
Session.set('selectedImmuType_s', "");
Session.set("childGender", "");

function getMonths(bday) {
  var tb = bday.split("/");
  var birthday = new Date(tb[2], tb[1]-1, tb[0]);

  // var ageDiff = Date.now() - birthday.getTime();
  // var ageDate = new Date(ageDiff);

  // var yearsOld = Math.abs(ageDate.getUTCFullYear() - 1970);
  // var monthsOld = new Date().getMonth() + 1 - birthday.getMonth();

  var now = new Date();
  var year1 = birthday.getFullYear();
  var year2 = now.getFullYear();
  var month1 = birthday.getMonth();
  var month2 = now.getMonth();

  if(month1 === 0) {month1++; month2++}
    var numMonths = (year2 - year1) * 12 + (month2 - month1);

  return numMonths;
};

Template.babyImmunisation.events({
  "click .immuRowClick": function() {
    var dialogData = this;
    dialogData.displayName = this.doseName;
    Session.set("selectedImmuDataRow", dialogData);

    switch(dialogData.taken) {
      case 1:
        $('#immuModal_Taken').openModal();
        break;
      case 0: 
        $('#immuModal_Missed').openModal();
        break;
      case 2:
        $('#immuModal_Pending').openModal();
        break;
      case -1: 
        $('#immuModal_NA').openModal();
        break;
    }
  },
  'change #immuAgeSelect': function(event) {
    var valueSelect = $(event.target).val();
    if(Session.get("childGender") === "Male")
      Session.set("immuAgeCard", ImmunisationMaleAge[valueSelect].doses);
    else
      Session.set("immuAgeCard", ImmunisationFemaleAge[valueSelect].doses);

    Session.set("selectedImmuAge", valueSelect);
  },
  'click .immuInfoClick': function(event) {
    Session.set('selectedImmuType', this.name);
    Session.set('selectedImmuType_s', this.name_s);
  },
  'click .btn_CloseImmuDesc': function(event) {
    Session.set('selectedImmuType', "");
  }
});

getImmunisationData = function(gender, childIC) {
  var childIC = Session.get("selectedChildIC");
  var bday = HealthRecords.findOne({nric: childIC}, {fields: {bday: 1}});
  bday = bday.bday;
  var monthOld = getMonths(bday);

  var cGender = Session.get("childGender");
  var immuDataKeyArr, immuDataArr;
  if(cGender === "Male") {
    immuDataArr = ImmunisationMaleAge;
    immuDataKeyArr = Object.keys(ImmunisationMaleAge);
  }
  else {
    immuDataArr = ImmunisationFemaleAge;
    immuDataKeyArr = Object.keys(ImmunisationFemaleAge);
  }

  for(var i=0; i < immuDataKeyArr.length; i++) {
    var arrMonth = Number(immuDataKeyArr[i].split(" ")[0]);

    if(immuDataKeyArr[i].indexOf(" years old") > -1) {
      arrMonth *= 12;
    }
    
    if(arrMonth === monthOld || monthOld < arrMonth) {
      Materialize.toast('Next immunisation: ' + immuDataArr[immuDataKeyArr[i]].doses, 8000);
      break;
    }
  }

  var immu = ImmunisationRecords.find({nric: childIC}).fetch();
  immu = immu[0];

  for(var i=0; i < immu.immu.length; i++) {
    for(var d=0; d < immu.immu[i].desc.length; d++) {
      if(immu.immu[i].name_s === "HPV" && gender === "Male") {
        immu.immu[i].desc[d].expectedAge = "N/A";
      }
      else {
        immu.immu[i].desc[d].expectedAge = ImmunisationDosageAge[immu.immu[i].name_s][d];
      }
      immu.immu[i].desc[d].doseName = immu.immu[i].name;
    }
  }
  return immu.immu;

};

Template.babyImmunisation.helpers({
  immuDataTypes: function() {
    var childIC = Session.get("selectedChildIC");
    var gender = HealthRecords.find({nric: childIC}, {fields: {gender: 1}}).fetch();
    gender = gender[0].gender;

    Session.set("childGender", gender);

    var immuData = getImmunisationData(gender, childIC);
    return immuData;
  },
  doseTaken: function(isTaken) {
    return 1 === isTaken;
  },
  doseMissed: function(isTaken) {
    return 0 === isTaken;
  },
  dosePending: function(isTaken) {
    return 2 === isTaken;
  },
  doseNA: function(isTaken) {
    return -1 === isTaken;
  },
  selectedImuDataRow: function() {
    return Session.get("selectedImmuDataRow");
  },
  immuAgeRange: function() {
    var childIC = Session.get("selectedChildIC");
    var gender = Session.get("childGender");

    if(gender === "Male") {
      return Object.keys(ImmunisationMaleAge);
    }
    else {
      return ImmunisationFemaleAge;
    }
  },
  getimmuAgeCardDescription: function() {
    return Session.get("immuAgeCard");
  },
  getImmuAgeCardAge: function() {
    return Session.get("selectedImmuAge");
  },
  getSelectedImmuType: function() {
    return Session.get("selectedImmuType");
  },
  getSelectedImmuTypeDesc: function() {
      var typeKey = Session.get("selectedImmuType_s");
      return (ImmunisationDescription[typeKey]);
      //console.log(ImmunisationDescription.typeKey);
  },
  hasSelectedImmuType: function() {
    return Session.get("selectedImmuType") !== "";
  }
});

function drawImmuInfoChart(){

  var data = [
    {
      value: 1, label: "Hep B",
      color:"#26a69a", highlight: "#80cbc4"
    },
    {
      value: 3, label: "DTap, IPV, HiB, PCV",
      color: "#29b2d1", highlight: "#57D6F2"
    },
    {
      value: 4, label: "DTap, IPV, HiB",
      color:"#26a69a", highlight: "#80cbc4"
    },
    {
      value: 5, label: "HepB, DTap, IPV, HiB, PCV",
      color: "#29b2d1", highlight: "#57D6F2"
    },
    {
      value: 12, label: "MMR, PCV",
      color:"#26a69a", highlight: "#80cbc4" 
    },
    {
      value: 18, label: "DTap, IPV, HiB, MMR",
      color: "#29b2d1", highlight: "#57D6F2"
    }
  ];

  var options = {
                  onAnimationComplete: function() { this.showTooltip(this.segments, true); },
                  tooltipEvents: [],
                  showTooltips: false
                }
  var ctx = $("#myChart").get(0).getContext("2d");
  var op = {tooltipTemplate: "<%= value%> Months: <%=label%>"};
  var myDoughnutChart = new Chart(ctx).Doughnut(data, op);

  $("#myChart").click( 
      function(evt){
          var activePoints = myDoughnutChart.getSegmentsAtEvent(evt);           
          console.log(activePoints[0]);
      }
  );

}

Template.babyImmunisation.rendered = function(){
  //drawImmuInfoChart();
}