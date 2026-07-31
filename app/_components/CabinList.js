import { getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";

export default async function CabinList({ filter }) {
  const cabins = await getCabins(filter);

  if (!cabins.length) return null;
  return (
    <div className="grid md:grid-cols-2 gap-20  py-4 mb-24">
      {cabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
