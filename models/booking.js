import mongoose, { Schema } from "mongoose";

const timeSlotSchema = new mongoose.Schema({
  startTime: String,
  booked: { type: Boolean, default: false },
});

const bookingSchema = new Schema(
  {
    date: Date,
    startTime: String,
    endTime: String,
    timeSlots: [timeSlotSchema],
    price: Number,
    capacity: Number,
    promoCode: String,
    timeBooked: Number,
  },
  {
    timestamps: true,
  }
);

const Booking =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;
