"use client";

import { useEffect, useState } from "react";
import StudentNavBar from "../components/studentNavbar";
import { useRouter } from "next/navigation";
import CancelBtn from "../components/CancelButton";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const EditStudent = ({
  id,
  name,
  date,
  startTime,
  endTime,
  price,
  promoCode,
  timeBooked,
  capacity,
  timeSlots,
}) => {
  const router = useRouter();
  const handleTimeSlot = (timeSlots, selectedSlot, selectedSlot2) => {
    const updatedTimeSlots = [...timeSlots];

    updatedTimeSlots[selectedSlot] = {
      ...updatedTimeSlots[selectedSlot],
      booked: true,
    };
    updatedTimeSlots[selectedSlot2] = {
      ...updatedTimeSlots[selectedSlot2],
      booked: false,
    };
    return updatedTimeSlots;
  };

  const handleTimeSlot2 = (timeSlots, selectedSlot) => {
    const updatedTimeSlots = [...timeSlots];

    updatedTimeSlots[selectedSlot] = {
      ...updatedTimeSlots[selectedSlot],
      booked: false,
    };
    return updatedTimeSlots;
  };
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedSlot2, setSelectedSlot2] = useState(null);

  const newDate = date;
  const newName = name;
  const newStartTime = startTime;
  const newEndTime = endTime;
  const newPrice = price;
  const newCapacity = capacity;
  const newPromoCode = promoCode;

  const handleConfirm = async (e) => {
    if (selectedSlot2 != null && selectedSlot != null) {
      const newTimeBooked = timeBooked;

      const newTimeSlots = handleTimeSlot(
        timeSlots,
        selectedSlot,
        selectedSlot2
      );
      e.preventDefault();

      try {
        const res = await fetch(`http://localhost:3000/api/bookings/${id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            newDate,
            newName,
            newStartTime,
            newEndTime,
            newPrice,
            newCapacity,
            newPromoCode,
            newTimeBooked,
            newTimeSlots,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to update booking");
        }

        router.push("/studentManage");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Choose TimeSlot");
    }
  };

  const handleCancel = async (e) => {
    if (selectedSlot2 != null && selectedSlot == null) {
      const newTimeSlots = handleTimeSlot2(timeSlots, selectedSlot2);
      const newTimeBooked = timeBooked - 1;

      e.preventDefault();

      try {
        const res = await fetch(`http://localhost:3000/api/bookings/${id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            newDate,
            newName,
            newStartTime,
            newEndTime,
            newPrice,
            newCapacity,
            newPromoCode,
            newTimeBooked,
            newTimeSlots,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to update booking");
        }

        router.push("/studentManage");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Choose TimeSlot");
    }
  };

  const handleSlotClick = (index) => {
    setSelectedSlot(index);

    console.log(index);
    console.log(selectedSlot);
  };

  const handleSlotClick2 = (index) => {
    setSelectedSlot2(index);

    console.log(index);
    console.log(selectedSlot2);
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
        <div key={id} className="p-4 border border-slate-300 my-3">
          <h2 className="font-bold text-2xl">{formatDate(date)}</h2>
          <div className="flex mb-4 mt-4">
            {timeSlots.map((slot, index) => (
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
                  <div key={index}>
                    <input
                      type="checkbox"
                      checked={selectedSlot2 === index}
                      onChange={() => handleSlotClick2(index)}
                      className="hidden"
                    />
                    <label
                      className=" p-2 border  shadow-sm bg-red-400 cursor-pointer"
                      onClick={() => handleSlotClick2(index)}
                    >
                      {slot.startTime}
                    </label>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div>Room name : {name}</div>
          <div>Time : 1 hour</div>
          <div>Price: {price} $</div>
          <div>Capacity: {capacity}</div>
          {selectedSlot2 !== null ? (
            <div>Chosen Time: {timeSlots[selectedSlot2].startTime}</div>
          ) : (
            <div>Chosen Time : Choose Time</div>
          )}
          {selectedSlot !== null ? (
            <div>Change To {timeSlots[selectedSlot].startTime}</div>
          ) : (
            <div>Change To : Choose Time</div>
          )}
          <div className="flex gap-2">
            <button
              className="bg-blue-400 text-white px-4 py-2 rounded"
              onClick={handleConfirm}
            >
              Change Timeslot
            </button>
            <button
              className="bg-red-400 text-white px-4 py-2 rounded"
              onClick={handleCancel}
            >
              Cancel Timeslot
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditStudent;
