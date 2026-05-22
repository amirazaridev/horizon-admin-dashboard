import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, cabinCount, numDays }) {
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const occupancy =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <div className="mt-8 flex justify-between gap-x-15">
      <Stat
        title="bookings"
        value={bookings.length}
        color="blue"
        icon={<HiOutlineBriefcase className="size-5.5" />}
      />
      <Stat
        title="Sales"
        value={formatCurrency(sales)}
        color="green"
        icon={<HiOutlineBanknotes className="size-5.5" />}
      />
      <Stat
        title="Check ins"
        value={confirmedStays.length}
        color="indigo"
        icon={<HiOutlineCalendarDays className="size-5.5" />}
      />
      <Stat
        title="Occupancy rate"
        value={Math.round(occupancy * 100) + "%"}
        color="yellow"
        icon={<HiOutlineChartBar className="size-5.5" />}
      />
    </div>
  );
}

export default Stats;
