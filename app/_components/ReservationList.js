"use client";

import { useOptimistic } from "react";
import { deleteReservation } from "../_lib/actions";
import ReservationCard from "./ReservationCard";

function ReservationList({ bookings }) {
  const [optismicBookings, removeBooking] = useOptimistic(
    bookings,
    (currentBooking, bookingId) =>
      currentBooking.filter((booking) => booking.id !== bookingId),
  );

  function handleDelete(bookingId) {
    if (confirm("are u sure to delete this reservation?"))
      removeBooking(bookingId);

    deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optismicBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
