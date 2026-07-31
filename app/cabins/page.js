import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Filter from "../_components/Filter";
import Loader from "./loading";
import ReservationReminder from "../_components/ReservationReminder";

// PLACEHOLDER DATA

export const metadata = {
  title: "cabins",
};

export default function Page({ searchParams }) {
  const filter = searchParams.capacity ?? "all";
  return (
    <div className="max-w-6xl mx-auto mt-8">
      <h1 className="text-accent-400 text-4xl mb-5">Our Luxury Cabins</h1>
      <p className="mb-10 text-primary-200 text-lg">
        Escape the rush of everyday life and discover a place where comfort,
        nature, and unforgettable experiences come together. Our carefully
        selected cabins are designed to provide a peaceful retreat, whether you
        &apos re planning a romantic getaway, a family vacation, or a solo
        adventure
      </p>
      <div className="flex justify-end">
        <Filter />
      </div>
      <Suspense fallback={<Loader key={filter} />}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>

      <div>
        <h2 className="text-5xl font-semibold text-center">
          Reserve today. Pay on arrival.
        </h2>
      </div>
    </div>
  );
}
