import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    RoomNo: String,
    startTime: String,
    duration: {
      type: Number,
      default: 1
    },
    endTime: String,
  },
  {
    timestamps: true,
  }
);

const Booking =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;
