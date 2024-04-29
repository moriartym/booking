"use client";

import HandleDeleteBtn from "./HandleDeleteBtn";

export default function CancelBtn({ booking, newTimeSlots }) {
  const newDate = booking.date;
  const newStartTime = booking.startTime;
  const newEndTime = booking.endTime;
  const newPrice = booking.price;
  const newCapacity = booking.capacity;
  const newPromoCode = booking.promoCode;
  const newTimeBooked = booking.timeBooked;
  const id = booking._id;

  return (
    <HandleDeleteBtn
      newDate={newDate}
      newStartTime={newStartTime}
      newEndTime={newEndTime}
      newPrice={newPrice}
      newCapacity={newCapacity}
      newPromoCode={newPromoCode}
      newTimeSlots={newTimeSlots}
      newTimeBooked={newTimeBooked}
      id={id}
    />
  );
}
