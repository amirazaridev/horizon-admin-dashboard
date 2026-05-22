import Spinner from "../../ui/Spinner";
import { useCabins } from "../cabins/useCabins";
import TodayActivity from "../check-in-out/TodayActivity";
import DurationChart from "./DurationChart";
import SalesChart from "./SalesChart";
import Stats from "./Stats";
import useRecentBookings from "./useRecentBookings";
import useRecentStays from "./useRecentStays";

function DashboardLayout() {
  const { bookings, isLoading: isLoading1, numDays } = useRecentBookings();
  const { isLoading: isLoading2, confirmedStays } = useRecentStays();
  const { cabins, isLoading: isLoading3 } = useCabins();

  if (isLoading1 || isLoading2 || isLoading3)
    return (
      <div className="bg-primary flex h-screen w-screen items-center justify-center overflow-hidden">
        <Spinner />
      </div>
    );

  return (
    <div className="">
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <div className="mt-6 flex justify-between gap-x-12">
        <TodayActivity />
        <DurationChart confirmedStays={confirmedStays}/>
      </div>
      <SalesChart bookings={bookings} numDays={numDays} />
    </div>
  );
}

export default DashboardLayout;
