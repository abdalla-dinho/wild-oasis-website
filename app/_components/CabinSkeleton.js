export default function CabinCardSkeleton() {
  return (
    <div className="flex flex-1 gap-10 border rounded-lg p-4 animate-pulse h-full bg-gray-800 ">
      <div className="w-40">
        <div className="bg-primary-700 h-38 rounded mb-4 h-full"></div>
      </div>

      <div className="flex-grow">
        <div className="bg-primary-700  h-6 w-1/3 rounded mb-3"></div>

        <div className="flex w-full ">
          <div className="bg-primary-700 h-6 w-full rounded mb-2"></div>

          <div className="w-full">
            <div className="bg-primary-700 h-4 w-3/6 rounded my-10 mx-8 "></div>
            <div className="bg-primary-700 h-6   rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
