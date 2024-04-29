import { useRouter } from "next/navigation";

export default function HandleVerifyBtn({
  newDate,
  newStartTime,
  newEndTime,
  newPrice,
  newCapacity,
  newPromoCode,
  newTimeSlots,
  newTimeBooked,
  promo,
  userInput,
  id,
}) {
  const router = useRouter();
  const handleVerify = async (e) => {
    if (promo === userInput) {
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
          throw new Error("Failed to update booking");
        }
        if (res.ok) {
          router.refresh();
        }
        router.push("/studentManage");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Your promo code does not exist.");
    }
  };
  return (
    <button
      className="bg-indigo-500 text-white px-4 py-2 rounded"
      onClick={handleVerify}
    >
      Book a room
    </button>
  );
}
