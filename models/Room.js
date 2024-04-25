import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema(
    {
        RoomNo: String,
        price: Number,
        capacity: Number,
        promocode: String,
        opening: String,
        closing: String,
        maxDuration: {
            type: Number,
            default: 1
        },
    },
    {
        timestamps: true,
    }
);

const Room = 
  mongoose.models.Room || mongoose.model("Room", roomSchema)

export default Room;