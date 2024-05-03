"use client";

import CancelBtn from "../components/CancelButton";
import StudentNavBar from "../components/studentNavbar";
import { useState, useEffect } from "react";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function StudentManage({ booking }) {
  const handleTimeSlot = (timeSlots, selectedSlot) => {
    const updatedTimeSlots = [...timeSlots];

    updatedTimeSlots[selectedSlot] = {
      ...updatedTimeSlots[selectedSlot],
      booked: false,
    };
    return updatedTimeSlots;
  };

  const [selectedSlot, setSelectedSlot] = useState(null);

  const newTimeSlots = handleTimeSlot(booking.timeSlots, selectedSlot);

  const handleSlotClick = (index) => {
    setSelectedSlot(index);

    console.log(index);
    console.log(selectedSlot);
  };

  const getSlotClassNames = (selectedSlot, index) => {
    let classNames;

    if (selectedSlot === index) {
      classNames = " p-2 border shadow-sm cursor-pointer border-black text-lg ";
    } else {
      classNames = " p-2 border shadow-sm cursor-pointer";
    }

    return classNames;
  };
  return (
    <>
      <div className="max-w-4xl mx-auto p-4">
        <StudentNavBar text1="Create Booking" text2="Manage Booking" />
        {booking.timeBooked > 0 && (
          <div
            key={booking._id}
            className="p-4 border border-slate-300 my-3  justify-between gap-5 items-start"
          >
            <div>
              <h2 className="font-bold text-2xl">{formatDate(booking.date)}</h2>
              <div className="flex mb-4 mt-4">
                {booking.timeSlots.map((slot, index) => (
                  <div key={index} className="mr-2">
                    {slot.booked === true ? (
                      <div key={index}>
                        <input
                          type="checkbox"
                          checked={selectedSlot === index}
                          onChange={() => handleSlotClick(index)}
                          className="hidden"
                        />
                        <label
                          className={getSlotClassNames(selectedSlot, index)}
                          onClick={() => handleSlotClick(index)}
                        >
                          {slot.startTime}
                        </label>
                      </div>
                    ) : (
                      <div className="hidden"></div>
                    )}
                  </div>
                ))}
              </div>

              <div>Room name : {booking.name}</div>
              <div>Price: {booking.price} $</div>
              <div>Capacity: {booking.capacity}</div>
            </div>

            <CancelBtn booking={booking} newTimeSlots={newTimeSlots} />
          </div>
        )}
      </div>
    </>
  );
}
