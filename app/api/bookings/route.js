import connectMongoDB from "../../../libs/mongodb";
import Booking from "../../../models/booking";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { date, startTime, endTime, price, capacity, promoCode, booked } =
    await request.json();
  await connectMongoDB();
  await Booking.create({
    date,
    startTime,
    endTime,
    price,
    capacity,
    promoCode,
    booked,
  });
  return NextResponse.json({ message: "Booking Created" }, { status: 201 });
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
