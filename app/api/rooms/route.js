import connectMongoDB from "../../../libs/mongodb";
import Room from "../../../models/room"; // Import the room model
import { NextResponse } from "next/server";

// Function to handle POST requests for creating rooms
export async function postRoom(request) {
  const { RoomNo, price, capacity, promocode, opening, closing } =
    await request.json();
  await connectMongoDB();
  await Room.create({
    RoomNo,
    price,
    capacity,
    promocode,
    opening,
    closing,
    maxDuration,
  });
  return NextResponse.json({ message: "Room Created" }, { status: 201 });
}
// Function to handle GET requests for retrieving rooms
export async function getRooms() {
    await connectMongoDB();
    const rooms = await Room.find();
    return NextResponse.json({ rooms });
  }
  
  // Function to handle DELETE requests for deleting rooms
  export async function deleteRoom(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Room.findByIdAndDelete(id);
    return NextResponse.json({ message: "Room deleted" }, { status: 200 });
  }