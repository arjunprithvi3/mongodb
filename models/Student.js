// models/Medicine.js

const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  regno: { type: String, required: true },
  year: { type: String, required: true },
  slot: { type: String, required: true },
  rollno: { type: String, required: true },
  place: { type: String, required: true },
});

module.exports = mongoose.model('Student', medicineSchema);
