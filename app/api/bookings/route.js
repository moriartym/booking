import connectMongoDB from "../../../libs/mongodb";
import Booking from "../../../models/booking"; // Import the booking model
import { NextResponse } from "next/server";
// Function to handle POST requests for creating bookings
export async function postBooking(request) {
  const { RoomNo, startTime, duration, endTime } = await request.json();
  await connectMongoDB();
  await Booking.create({
    RoomNo,
    startTime,
    duration,
    endTime,
  });
  return NextResponse.json({ message: "Booking Created" }, { status: 201 });
}

// Function to handle GET requests for retrieving bookings
export async function getBookings() {
  await connectMongoDB();
  const bookings = await Booking.find();
  return NextResponse.json({ bookings });
}

// Function to handle DELETE requests for deleting bookings
export async function deleteBooking(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Booking.findByIdAndDelete(id);
  return NextResponse.json({ message: "Booking deleted" }, { status: 200 });
}