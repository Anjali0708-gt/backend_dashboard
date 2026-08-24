import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true
    },

    date: {
      type: String,
      required: true
    },

    time: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    phone: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      trim: true
    },

    notes: {
      type: String,
      default: ""
    },

    status: {
      type: String,
      enum: [
        "confirmed",
        "completed",
        "cancelled"
      ],
      default: "confirmed"
    }
  },
  {
    timestamps: true
  }
);

/*
  Prevent two active appointments from
  occupying the same date + time.
*/
appointmentSchema.index(
  {
    date: 1,
    time: 1
  },
  {
    unique: true,
    partialFilterExpression: {
      status: {
        $ne: "cancelled"
      }
    }
  }
);

const AppointmentModel = mongoose.model(
  "Appointment",
  appointmentSchema
);

export default AppointmentModel;