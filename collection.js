HealthRecords = new Mongo.Collection('babyRecords');
ImmunisationRecords = new Mongo.Collection("immunisationRecords");
AppointmentRecords = new Mongo.Collection("apptRecords");

ImmunisationDosageAge ={'BCG': ["Birth"], 
                        'Hep B':["Birth", "1 month", "5 - 6 months"],
                        'DTaP':["3 months", "4 months", "5 months", "18 months", "10 - 11 years old"],
                        'IPV': ["3 months", "4 months", "5 months", "18 months", "10 - 11 years old"],
                        'Hib': ["3 months", "4 months", "5 months", "18 months"],
                        'MMR': ["12 months", "15 - 18 months"],
                        'PCV': ["3 months", "5 months", "12 months"],
                        'HPV': ["Birth", "2 months", "6 months"] };
ImmunisationDescription = {
	"BCG" : "Vaccine against tuberculosis",
	"Hep B": "Prevent against Hepatitis",
	'DTaP': "Vaccine against bacteria diphtheria, tentanus and whopping cough",
    'IPV': "Prevent against poliomyelitis",
    'Hib': "Vaccine against Haemophilus influenzae type b disease",
    'MMR': "Prevention against measles, mumps and rubella",
    'PCV': "Vaccine against disease caused by bacterium Streptococcus pneumoniae",
    'HPV': "Prevention of Human Papilloma Virus which may lead of cervical cancer"
}
ImmunisationMaleAge = {
						"Birth": {doses:"BCG, Hep B"},
						"1 month": {doses:"Hep B"}, 
						"3 months": {doses:"DTaP, IPV, Hib"}, 
						"4 months": {doses:"DTaP, IPV, Hib"}, 
						"5 months": {doses:"Hep B, DTaP, IPV, Hib"}, 
						"12 months": {doses:"MMR, PCV"}, 
						"15 months": {doses:"MMR"}, 
						"18 months": {doses:"DTaP, IPV, Hib"}, 
						"10 years old": {doses:"DTaP, IPV"}
					};
ImmunisationFemaleAge = {
						"Birth": {doses:"BCG, Hep B, HPV"},
						"1 month": {doses:"Hep B"}, 
						"2 months": {doses:"HPV"}, 
						"3 months": {doses:"DTaP, IPV, Hib"}, 
						"4 months": {doses:"DTaP, IPV, Hib"}, 
						"5 months": {doses:"Hep B, DTaP, IPV, Hib"}, 
						"6 months": {doses:"HPV"}, 
						"12 months": {doses:"MMR, PCV"}, 
						"15 months": {doses:"MMR"}, 
						"18 months": {doses:"DTaP, IPV, Hib"}, 
						"10 years old": {doses:"DTaP, IPV"}
					};