const mongoose = require('mongoose');

const orgSchema = new mongoose.Schema({
  name : { type: String, trim: true, validate: validateText },
  logo: { type: String, validate: validateImage },
  address: { type: String, trim: true, validate: validateText },
  country: { type: String, trim: true, validate: validateText },
  website: { type: String, trim: true, validate: validateText },
  email: { type: String, trim: true, validate: validateText },
  skills : [],
  // skills : { type: Array, validate: validateArray },
  questions : { type: Array, validate: validateArray },
  createdAt: {  type: Date,  default: Date.now, validate: validateDate }
});

function validateText (str) {
	return str.length > 0 && str.length < 250;
}

function validateImage(str) {
  // any validation regarding image
  return true;
}

function validateArray(arr) {
  // any validation of array would be there
  return true;
}

function validateCsv(str) {
  return true;
}

function validateDate(date) {
  return true;
}
module.exports = mongoose.model("organization", orgSchema);
