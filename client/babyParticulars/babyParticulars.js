Template.babyParticulars.helpers({
	baby: function() {
		var userNRIC = Session.get('selectedChildIC');
		var arr = HealthRecords.find({nric: userNRIC}).fetch();
		return arr[0];
	},
	getAge: function() {
		var userNRIC = Session.get('selectedChildIC');
		var arr = HealthRecords.findOne({nric: userNRIC}, {fields: {bday: 1}});
		var bDate = arr.bday;

		var tb = bDate.split("/");
		var birthday = new Date(tb[2], tb[1]-1, tb[0]);
		var ageDiff = Date.now() - birthday.getTime();
		var ageDate = new Date(ageDiff);

		var yearsOld = Math.abs(ageDate.getUTCFullYear() - 1970);

		var monthsOld = new Date().getMonth() + 1 - birthday.getMonth();

		var now = new Date();

		var year1 = birthday.getFullYear();
		var year2 = now.getFullYear();
		var month1 = birthday.getMonth();
		var month2 = now.getMonth();

		if(month1 === 0) {month1++; month2++}
		var numMonths = (year2 - year1) * 12 + (month2 - month1);

		if(numMonths > 18) {
			return yearsOld + " years old"
		}
		else if (numMonths > 1)
			return monthsOld + " months old"
		else {
			return monthsOld + " month old";
		}
	}
});