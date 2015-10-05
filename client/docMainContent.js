Session.set("selectedPatient", undefined);

Template.docMainContent.helpers({
  	getPatients: function() {
		var db = HealthRecords.find({}, {sort: {nric: 1}}).fetch();
		return db;
	},
	getSelectedPatient: function() {
		return Session.get("selectedPatient");
	},
	hasSelectedPatient: function() {
		return (Session.get("selectedPatient") !== undefined);
	},
	getListOfTasks: function() {
		var task = [{task: "Immunisation"}, {task: 'Appointment'}];
		return task;
	},
	getPatientAge: function() {
		var tb = Session.get("selectedPatient").bday.split("/");
		var birthday = new Date(tb[2], tb[1]-1, tb[0]);
		var ageDiff = Date.now() - birthday.getTime();
		var ageDate = new Date(ageDiff);

		var yearsOld = Math.abs(ageDate.getUTCFullYear() - 1970);

		var monthsOld = new Date().getMonth() + 1 - birthday.getMonth();

		if(monthsOld < 0) { monthsOld += 12; }

		if(yearsOld >= 3) { return yearsOld + " years old"; }
		else if (yearsOld > 0) { return yearsOld + " years old " + monthsOld + " months old"; }
		else { return monthsOld + " months old"; }
	},
	getPatientMonthsOld: function() {
		var dateStr = Session.get("selectedPatient").bday;
		var tb = dateStr.split("/");
		var birthday = new Date(tb[2], tb[1]-1, tb[0]);
		var now = new Date();

		var year1 = birthday.getFullYear();
		var year2 = now.getFullYear();
		var month1 = birthday.getMonth();
		var month2 = now.getMonth();

		if(month1 === 0) {month1++; month2++}
		var numMonths = (year2 - year1) * 12 + (month2 - month1);
		return numMonths;
	},
	getPatientImmuList: function() {
		var childIC = Session.get("selectedPatient").nric;
		var immuRecords = ImmunisationRecords.findOne({nric: childIC});

		for(var i=0; i < immuRecords.immu.length; i++) {
			var hasMissed = false;
		    for(var d=0; d < immuRecords.immu[i].desc.length; d++) {
				if(immuRecords.immu[i].name_s === "HPV" && Session.get("selectedPatient").gender === "Male") {
					immuRecords.immu[i].desc[d].expectedAge = "N/A";
				}
				else {
					immuRecords.immu[i].desc[d].expectedAge = ImmunisationDosageAge[immuRecords.immu[i].name_s][d];
				}

				if(immuRecords.immu[i].desc[d].taken === 0) {
					hasMissed = true;
				}

				immuRecords.immu[i].desc[d].doseName = immuRecords.immu[i].name;
				immuRecords.immu[i].desc[d].descIndex = d;
				immuRecords.immu[i].desc[d].doseIndex = i;
		    }

		    if(hasMissed)
		    	immuRecords.immu[i].classColor = "red";
		    else
		    	immuRecords.immu[i].classColor = "teal lighten-3";
		}

		return immuRecords.immu;
	},
	getDateNow: function() {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1;
		var yy = today.getFullYear();

		return dd + "/" + mm + "/" + yy;
	},
	getImmunisationName: function() {
		return Session.get("giveImmunisationName");
	},
	getImmunisationStatus: function(){ 
		return Session.get("giveImmunisationStatus");
	},
	getImmunisationStatusClass: function() {
		return Session.get("giveImmunisationStatusClass");
	},
	getDoctorName: function() {
		return Meteor.user().profile.doctorName;
	}
});

Template.docMainContent.events({
	'change #patientSelect': function(event) {
		var selectNric = $(event.target).val();
		var record = HealthRecords.findOne({nric: selectNric});
		Session.set("selectedPatient", record);
	},
	'click .logout': function(event) {
    	event.preventDefault();
    	Meteor.logout();
  	},
	'click .rad': function(event) {
		Session.set("selectedPatient", this);
	},
	'click .modalClose': function(event) {
		//console.log("Close Modal");
	},
	'click .modalRecord': function(event) {
		var immuData = Session.get("clickedImmuRow");

		var childIC = Session.get("selectedPatient").nric;
		var immuRecords = ImmunisationRecords.findOne({nric: childIC});

		var newImmuRecord = {
			taken: 1,
			dose: immuData.dose,
			date: "",
			brand: "",
			batch: "",
			doc: Meteor.user().profile.doctorName,
			place: Meteor.user().profile.doctorPlace,
			desc: ""
		};
		var doseIndex = immuData.doseIndex;
		var descIndex = immuData.descIndex;

		var docDesc = $("#textarea1").val();
		var batchNo = $("#txt_batch").val();
		var brand = $("#txt_brand").val();
		var today = new Date();
		var date = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

		newImmuRecord.date = date;

		if(brand   ==="") {brand   = "GSK";}
		if(batchNo ==="") {batchNo = generateRandomAlphaNumericString();}
		if(docDesc ==="") {docDesc = "Nil";}
		newImmuRecord.brand = brand;
		newImmuRecord.batch = batchNo;
		newImmuRecord.desc = docDesc;
		immuRecords.immu[doseIndex].desc[descIndex] = newImmuRecord;

		Meteor.call("updateImmunisation", immuRecords);
		//ImmunisationRecords.update({_id: immuRecords._id}, immuRecords);
	},
	'click .clickedImmuRow': function(event) {
		Session.set("clickedImmuRow", this);

		if(this.taken === 0 || this.taken === 2) {
			Session.set("giveImmunisationName", this.doseName);
			if(this.taken === 0) {
				Session.set("giveImmunisationStatus", "Missed"); Session.set("giveImmunisationStatusClass", "red-text");
			}
			else if (this.taken === 2) {
				Session.set("giveImmunisationStatus", "Not Taken"); Session.set("giveImmunisationStatusClass", "teal-text");
			}
			
		 	$("#modal1").openModal({
		 		dismissible: false, 
		 		complete: function(){}
		 	});
		}
	},
	'click .resetImmu': function(event) {
		Meteor.call("resetImmunisation");
	}
});

function generateRandomAlphaNumericString()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var length = Math.floor(Math.random() * 18) + 8;
    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}