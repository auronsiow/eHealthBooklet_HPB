setChecked = function(val) {
  if(val === true)
    return "checked";
  else 
    return "";
};

modifyBirthRecordData = function(inArray) {
  var arr = inArray;

  arr.jaund = setChecked(arr.jaund);
  arr.photo = setChecked(arr.photo);
  arr.ex_trans = setChecked(arr.ex_trans);
  arr.breast_fed = setChecked(arr.breast_fed);
  arr.g6pd = setChecked(arr.g6pd);
  arr.iem = setChecked(arr.iem);
  arr.oae = setChecked(arr.oae);
  arr.oae_lp = setChecked(arr.oae_lp);
  arr.oa_rp = setChecked(arr.oa_rp);
  arr.abaer = setChecked(arr.abaer);
  arr.abaer_lp = setChecked(arr.abaer_lp);
  arr.abaer_rp = setChecked(arr.abaer_rp);

  if(arr.abaer_date === "") {
    arr.abaer_date = "Incomplete";
  }

  if(arr.follow === true) {
    arr.follow_y = "checked"; arr.follow_n = "";
  }
  else if (arr.follow === false) {
    arr.follow_y = ""; arr.follow_n = "checked";
  }

  arr.follow = setChecked(arr.follow);

  return arr;
};

Template.babyBirthRecord.helpers({     
  record: function() {
    var nric = Session.get("selectedChildIC")
    var cbr = HealthRecords.find( {nric: nric}, {fields: {"birth_record": 1}} ).fetch();
    cbr = cbr[0].birth_record;

    cbr = modifyBirthRecordData(cbr);
    Session.set("selectedBirthRecord", cbr);
    return cbr;
  },

  hasDoneInvestigationTest: function() {
    return (Session.get("selectedBirthRecord").investigations.length !== 0);
  },

  displayNextPage: function() {
    return Session.get("birthRecordPage");
  }
});