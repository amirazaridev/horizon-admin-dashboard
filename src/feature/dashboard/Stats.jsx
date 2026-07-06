import { useTranslation } from "react-i18next";
import {
  LuCalendarDays,
  LuDollarSign,
  LuChartArea,
  LuTrendingUp,
} from "react-icons/lu";
import Stat from "./Stat";
import { formatCurrency, formatFaNum } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, cabinCount, numDays }) {
  const { t } = useTranslation();

  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const occupancy =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <div className="mt-8 mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Stat
        title={t("dashboard.totalBookings")}
        value={formatFaNum(`${bookings.length}`)}
        color="indigo"
        icon={<LuCalendarDays className="size-5.75" />}
      />
      <Stat
        title={t("dashboard.salesLabel")}
        value={formatCurrency(sales)}
        color="green"
        icon={<LuDollarSign className="size-5.75" />}
      />
      <Stat
        title={t("dashboard.checkInsToday")}
        value={formatFaNum(`${confirmedStays.length}`)}
        color="amber"
        icon={<LuChartArea className="size-5.75" />}
      />
      <Stat
        title={t("dashboard.occupancyRate")}
        value={formatFaNum(Math.round(occupancy * 100) + "%")}
        color="rose"
        icon={<LuTrendingUp className="size-5.75" />}
      />
    </div>
  );
}

export default Stats;
