import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    date: Date,
    startTime: String,
    endTime: String,
    price: Number,
    capacity: Number,
    promoCode: String,
    booked: Boolean,
  },
  {
    timestamps: true,
  }
);

const Booking =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;
