import StudentBooking from "../../constant/StudentBooking";

export default async function studentBookingPage() {
  try {
    const res = await fetch("http://localhost:3000/api/bookings", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const { bookings } = await res.json();

    return (
      <>
        {bookings.map((bookings, index) => (
          <StudentBooking key={index} bookings={bookings} />
        ))}
      </>
    );
  } catch (error) {
    console.log("Error loading data: ", error);
  }
}
