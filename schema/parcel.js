const mongoose = require('mongoose');

var parcelSchema = new mongoose.Schema({
	Borough: { type: String, index: true },
	Block: Number,
	Lot: Number,
	SchoolDist: Number,
	Council: Number,
	ZipCode: { type: Number, index: true },
	PolicePct: Number,
	HealthArea: Number,
	SanitDistrict: Number,
	Address: { type: String, lowercase: true, index: true },
	LandUse: Number,
	OwnerType: String,
	OwnerName: { type: String, lowercase: true, index: true },
	LotArea: Number,
	NumBldgs: Number,
	NumFloors: Number,
	LotType: Number,
	AssessLand: Number,
	AssessTot: Number,
	ExemptLand: Number,
	ExemptTot: Number,
	YearBuilt: Number,
	BBL: Number
});

parcelSchema.index({ Address: 'text', OwnerName: 'text' });

var Parcel = mongoose.model('Parcel', parcelSchema);

module.exports = Parcel;