import  UpdateReservationForm  from "@/app/_components/UpdateReservationForm";

import { getBookingIdWithCabins } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  // CHANGE
  const reservationId = Number(params.reservationId);

  const booking = await getBookingIdWithCabins(reservationId);
  const { maxCapacity } = booking.Cabins;

  const { id } = booking;

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <UpdateReservationForm bookingId={id} maxCapacity={maxCapacity} />
    </div>
  );
}
