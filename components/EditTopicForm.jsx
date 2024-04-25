"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "./navbar";

export default function EditTopicForm({
  id,
  date,
  startTime,
  endTime,
  price,
  capacity,
  promoCode,
}) {
  const [newDate, setNewDate] = useState(date);
  const [newStartTime, setNewStartTime] = useState(startTime);
  const [newEndTime, setNewEndTime] = useState(endTime);
  const [newPrice, setNewPrice] = useState(price);
  const [newCapacity, setNewCapacity] = useState(capacity);
  const [newPromoCode, setNewPromoCode] = useState(promoCode);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/bookings/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          newDate,
          newStartTime,
          newEndTime,
          newPrice,
          newCapacity,
          newPromoCode,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <NavBar text1="Create Room" text2="Manage Room" />
      <div className="flex w-screen h-screen bg-graybg">
        <div className="p-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-md">
          <div className="w-[500px] flex flex-col ">
            <h1 className="text-4xl font-bold text-center m-4">Room Details</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <input
                  onChange={(e) => setNewDate(e.target.value)}
                  value={newDate}
                  placeholder="Date"
                  type="date"
                  className="mt-1 focus:outline-none w-full shadow-sm sm:text-sm border border-gray-300 rounded-md h-8"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="startTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Time
                </label>
                <input
                  onChange={(e) => setNewStartTime(e.target.value)}
                  value={newStartTime}
                  placeholder="Start Time"
                  type="time"
                  className="mt-1 focus:outline-none w-full shadow-sm sm:text-sm border border-gray-300 rounded-md h-8"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="endTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  End Time
                </label>
                <input
                  onChange={(e) => setNewEndTime(e.target.value)}
                  value={newEndTime}
                  placeholder="End Time"
                  type="time"
                  className="mt-1 focus:outline-none w-full shadow-sm sm:text-sm border border-gray-300 rounded-md h-8"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  type="text"
                  onChange={(e) => setNewPrice(e.target.value)}
                  value={newPrice}
                  placeholder="Price"
                  className="mt-1 focus:outline-none w-full shadow-sm sm:text-sm border border-gray-300 rounded-md h-8"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="capacity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Capacity
                </label>
                <input
                  onChange={(e) => setNewCapacity(e.target.value)}
                  value={newCapacity}
                  placeholder="Capacity"
                  type="text"
                  className="mt-1 focus:outline-none w-full shadow-sm sm:text-sm border border-gray-300 rounded-md h-8"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="promoCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Promo Code
                </label>
                <input
                  onChange={(e) => setNewPromoCode(e.target.value)}
                  value={newPromoCode}
                  placeholder="Promo Code"
                  type="text"
                  className="mt-1 focus:outline-none w-full shadow-sm sm:text-sm border border-gray-300 rounded-md h-8"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-400"
              >
                Create Room
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
