import StudentManage from "../../constant/StudentManage";

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

export default async function studentManagePage() {
  const { bookings } = await getBookings();

  return (
    <>
      {bookings.map((bookings, index) => (
        <StudentManage key={index} booking={bookings} />
      ))}
    </>
  );
}
