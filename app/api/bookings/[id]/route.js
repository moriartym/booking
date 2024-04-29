import connectMongoDB from "../../../../libs/mongodb";
import Booking from "../../../../models/booking";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newDate: date,
    newStartTime: startTime,
    newEndTime: endTime,
    newPrice: price,
    newCapacity: capacity,
    newPromoCode: promoCode,
    newTimeSlots: timeSlots,
    newTimeBooked: timeBooked,
  } = await request.json();
  await connectMongoDB();
  await Booking.findByIdAndUpdate(id, {
    date,
    startTime,
    endTime,
    price,
    capacity,
    promoCode,
    timeSlots,
    timeBooked,
  });
  return NextResponse.json({ message: "Topic updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const booking = await Booking.findOne({ _id: id });
  return NextResponse.json({ booking }, { status: 200 });
}
