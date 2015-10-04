setAllPhotoTransparent = function() {
  var nImages = Session.get('numRecords').length;
  for(var i=0; i < nImages; i++)
    document.getElementById('baby'+i).style.opacity = 0.25;
};

Template.childSelection.events({
  'click .babyImg': function() {
    Session.set("selectedChild", this.name);
    Session.set("selectedChildIndex", this.index);
    Session.set("selectedChildIC", this.nric);

    setAllPhotoTransparent();
    document.getElementById('baby'+this.index).style.opacity = 1;
  },
  'click .menu_share' : function(event) {
    event.preventDefault();
    $('#shareModal').openModal();
    }
});

Template.childSelection.rendered = function(){
  setAllPhotoTransparent();
  document.getElementById('baby0').style.opacity = 1;
};

Template.childSelection.helpers({
  getBabyPhotos: function() {
    var userVar = Session.get("userNric");
    var arr = HealthRecords.find( {$or:[{m_nric: userVar} , {f_nric: userVar}]} ).fetch();

    var arrBabyImgName = [];
    for(var i=0; i < arr.length; i++) {
      arrBabyImgName.push( {
        name: arr[i].name,
        index: i,
        nric: arr[i].nric
      });
    }
    Session.set("numRecords", arr);
    Session.set("selectedChild", arrBabyImgName[0].name);

    return arrBabyImgName;
  },
  displayBabyName: function() {
  return Session.get('selectedChild');
  },
  getBabyNRIC: function() {
  return Session.get("selectedChildIC");
  }
});