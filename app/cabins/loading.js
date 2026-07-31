import CabinCardSkeleton from "../_components/CabinSkeleton";
import Spinner from "../_components/Spinner";

export default function Loader() {
  return (
    <div className="grid grid-cols-2 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <CabinCardSkeleton key={i} />
      ))}
    </div>
  );
}
