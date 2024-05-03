import EditStudent from "../../../constant/EditStudent";

const getTopicById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/bookings/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch bookings");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditTopic({ params }) {
  const { id } = params;
  const { booking } = await getTopicById(id);
  const {
    date,
    name,
    startTime,
    endTime,
    price,
    capacity,
    promoCode,
    timeSlots,
    timeBooked,
  } = booking;

  return (
    <EditStudent
      id={id}
      name={name}
      date={date}
      startTime={startTime}
      endTime={endTime}
      price={price}
      capacity={capacity}
      promoCode={promoCode}
      timeSlots={timeSlots}
      timeBooked={timeBooked}
    />
  );
}
