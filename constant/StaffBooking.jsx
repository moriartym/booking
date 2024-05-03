"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StaffNavbar from "../components/staffNavbar";

export default function StaffBooking() {
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const booked = false;

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !date ||
      !name ||
      !startTime ||
      !endTime ||
      !price ||
      !capacity ||
      !promoCode
    ) {
      alert("Fill all detail please!");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/bookings", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          date,
          name,
          startTime,
          endTime,
          price,
          capacity,
          promoCode,
          booked,
        }),
      });

      if (res.ok) {
        router.refresh();
        router.push("/staffManage");
      } else {
        throw new Error("Failed to create Room");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <StaffNavbar text1="Create Room" text2="Manage Room" />
      <div className="flex w-full h-full bg-graybg">
        <div className="p-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-md">
          <div className="w-[500px] flex flex-col ">
            <h1 className="text-4xl font-bold text-center m-4">Room Details</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="name"
                  type="name"
                  className="mt-1 focus:outline-none w-full shadow-sm sm:text-sm border border-gray-300 rounded-md h-8"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <input
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                  placeholder="date"
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
                  onChange={(e) => setStartTime(e.target.value)}
                  value={startTime}
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
                  onChange={(e) => setEndTime(e.target.value)}
                  value={endTime}
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
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  placeholder="price"
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
                  onChange={(e) => setCapacity(e.target.value)}
                  value={capacity}
                  placeholder="Capacity"
                  type="text"
                  className="mt-1 focus:outline-none w-full shadow-sm sm:text-sm border border-gray-300 rounded-md h-8"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="promocode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Promo Code
                </label>
                <input
                  onChange={(e) => setPromoCode(e.target.value)}
                  value={promoCode}
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
