import { useRouter } from "next/navigation";

export default function HandleDeleteBtn({
  newDate,
  newStartTime,
  newEndTime,
  newPrice,
  newCapacity,
  newPromoCode,
  newTimeSlots,
  newTimeBooked,
  id,
}) {
  const router = useRouter();
  newTimeBooked = newTimeBooked - 1;

  const handleDelete = async (e) => {
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
          newTimeSlots,
          newTimeBooked,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update Booking");
      }
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      className="bg-red-400 text-white px-4 py-2 rounded"
      onClick={handleDelete}
    >
      Cancel Bookings
    </button>
  );
}
