"use client";

import { useEffect, useState } from "react";
import StudentNavBar from "../components/studentNavbar";
import HandleVerifyBtn from "../components/HandleVerifyBtn";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const StudentBooking = ({ bookings }) => {
  const handleTimeSlot = (timeSlots, selectedSlot) => {
    const updatedTimeSlots = [...timeSlots];

    updatedTimeSlots[selectedSlot] = {
      ...updatedTimeSlots[selectedSlot],
      booked: true,
    };
    return updatedTimeSlots;
  };

  const [userInput, setUserInput] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);

  const { _id, promoCode } = bookings;
  const promo = promoCode;
  const newDate = bookings.date;
  const newName = bookings.name;
  const newStartTime = bookings.startTime;
  const newEndTime = bookings.endTime;
  const newPrice = bookings.price;
  const newCapacity = bookings.capacity;
  const newPromoCode = bookings.promoCode;
  const newTimeSlots = handleTimeSlot(bookings.timeSlots, selectedSlot);
  const newTimeBooked = bookings.timeBooked + 1;

  const handleSlotClick = (index) => {
    setSelectedSlot(index);

    console.log(index);
    console.log(selectedSlot);
  };

  useEffect(() => {
    console.log("selected slot changed:", selectedSlot);
  }, [selectedSlot]);

  const getSlotClassNames = (selectedSlot, index) => {
    let classNames;

    if (selectedSlot == index) {
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
        <div key={bookings._id} className="p-4 border border-slate-300 my-3">
          <h2 className="font-bold text-2xl">{formatDate(bookings.date)}</h2>
          <div className="flex mb-4 mt-4">
            {bookings.timeSlots.map((slot, index) => (
              <div key={index} className="mr-2">
                {slot.booked === false ? (
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
                  <div>
                    <label className="p-2 border  shadow-sm bg-red-400">
                      {slot.startTime}
                    </label>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div>Room name : {bookings.name}</div>
          <div>Time : 1 hour</div>
          <div>Price: {bookings.price} $</div>
          <div>Capacity: {bookings.capacity}</div>
          <div className="flex gap-2">
            <input
              placeholder="Promo Code"
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="mt-1 focus:outline-none px-4 py-2 shadow-sm sm:text-sm border border-gray-300 rounded-md"
            />
            <HandleVerifyBtn
              newDate={newDate}
              newName={newName}
              newStartTime={newStartTime}
              newEndTime={newEndTime}
              newPrice={newPrice}
              newCapacity={newCapacity}
              newPromoCode={newPromoCode}
              newTimeSlots={newTimeSlots}
              newTimeBooked={newTimeBooked}
              promo={promo}
              userInput={userInput}
              id={_id}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentBooking;
