import connectMongoDB from "../../../libs/mongodb";
import Booking from "../../../models/booking";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { date, startTime, endTime, price, capacity, promoCode } =
      await request.json();

    await connectMongoDB();

    const timeBooked = 0;

    const booking = await Booking.create({
      date,
      startTime,
      endTime,
      price,
      capacity,
      promoCode,
      timeBooked,
    });

    const timeSlots = generateTimeSlots(startTime, endTime);
    booking.timeSlots = timeSlots;
    await booking.save();

    return NextResponse.json({ message: "Booking Created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

function generateTimeSlots(startTime, endTime) {
  const timeSlots = [];
  let currentTime = new Date(`1970-01-01T${startTime}`);
  const endTimeObj = new Date(`1970-01-01T${endTime}`);

  while (currentTime < endTimeObj) {
    timeSlots.push({ startTime: formatTime(currentTime), booked: false });
    currentTime.setHours(currentTime.getHours() + 1);
  }

  return timeSlots;
}

function formatTime(time) {
  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export async function GET() {
  await connectMongoDB();
  const bookings = await Booking.find();
  return NextResponse.json({ bookings });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Booking.findByIdAndDelete(id);
  return NextResponse.json({ message: "Booking deleted" }, { status: 200 });
}
