import PromoVerify from "../../components/PromoVerify";
import StudentNavBar from "../../components/studentNavbar";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getBookings = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/bookings", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading data: ", error);
  }
};

export default async function TopicsList() {
  const { bookings } = await getBookings();

  return (
    <>
      <div className="max-w-4xl mx-auto p-4">
        <StudentNavBar text1="Create Booking" text2="Manage Booking" />
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
          >
            <div>
              <h2 className="font-bold text-2xl">{formatDate(booking.date)}</h2>
              <div>Start Time: {booking.startTime}</div>
              <div>End Time: {booking.endTime}</div>
              <div>Price: {booking.price}</div>
              <div>Capacity: {booking.capacity}</div>
            </div>
            <PromoVerify promo={booking.promoCode} />
          </div>
        ))}
      </div>
    </>
  );
}
