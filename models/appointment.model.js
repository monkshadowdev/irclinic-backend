import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    centerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    reason:{
      type: String,
      required: false,
    },
    description: { type: String, required: false },
    impression: { type: String, required: false },
    advice: { type: String, required: false },
    procedurePlan: { type: mongoose.Schema.Types.Mixed, required: false },
    invoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
  },
  { timestamps: true }
);

export const Appointment = mongoose.model("Appointment", appointmentSchema);
