const mongoose = require('mongoose');

const { Schema } = mongoose;

const AppointmentSchema = new mongoose.Schema(
  {
    doctor: {
      type: Schema.ObjectId,
      ref: 'Doctor',
      required: true
    },
    patient: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true
    },
    scheduleDate: {
      type: String,
      required: true
    },
    scheduleTime: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('Appointment', AppointmentSchema);
