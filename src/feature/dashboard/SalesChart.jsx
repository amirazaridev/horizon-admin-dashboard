import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import Heading from "../../ui/Heading";
import { eachDayOfInterval, format, subDays } from "date-fns-jalali";
import {isSameDay} from 'date-fns';
import { useTranslation } from "react-i18next";
import { formatFaNum } from "../../utils/helpers";

function SalesChart({ bookings, numDays }) {
  const { t } = useTranslation();

  const allDays = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDays.map((date) => ({
    label: formatFaNum(format(date, "MMMM dd")),
    totalSales: bookings
      .filter((booking) => isSameDay(date, new Date(booking.createdAt)))
      .reduce((acc, cur) => acc + cur.totalPrice, 0),
    extrasSales: bookings
      .filter((booking) => isSameDay(date, new Date(booking.createdAt)))
      .reduce((acc, cur) => acc + cur.extrasPrice, 0),
  }));

  return (
    <div className="bg-card border-border shadow-shadow-soft hover:border-border-strong mt-6 flex w-full flex-col gap-y-5 rounded-2xl border p-5 transition-[transform,border-color] duration-200 hover:-translate-y-0.75">
      {/* Header */}
      <div className="text-end">
        <Heading as="h3">{t("dashboard.salesOverview")}</Heading>
        <p className="text-text-muted text-sm">
          {t("dashboard.salesOverviewSubtitle", { count: numDays })}
        </p>
      </div>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="totalSalesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--color-indigo)"
                stopOpacity={0.35}
              />
              <stop
                offset="100%"
                stopColor="var(--color-indigo)"
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient
              id="extrasSalesGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="var(--color-green)"
                stopOpacity={0.35}
              />
              <stop
                offset="100%"
                stopColor="var(--color-green)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            horizontal={true}
            vertical={false}
            stroke="var(--color-border)"
          />

          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--color-text-faint)", fontSize: 12 }}
            dy={10}
          />

          <Tooltip
            cursor={{
              stroke: "var(--color-border-strong)",
              strokeDasharray: "4 4",
            }}
            contentStyle={{
              borderRadius: 8,
              border: "1px solid var(--color-border)",
              background: "var(--color-card)",
            }}
            labelStyle={{ color: "var(--color-text)" }}
            formatter={(value, name) => [formatFaNum(value), name]}
          />

          <Area
            dataKey="totalSales"
            type="monotone"
            stroke="var(--color-indigo)"
            strokeWidth={2.5}
            fill="url(#totalSalesGradient)"
            name={t("dashboard.totalSales")}
            dot={{ r: 3, strokeWidth: 0, fill: "var(--color-indigo)" }}
            activeDot={{
              r: 6,
              fill: "var(--color-indigo)",
              stroke: "var(--color-card)",
              strokeWidth: 3,
            }}
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke="var(--color-green)"
            strokeWidth={2.5}
            fill="url(#extrasSalesGradient)"
            name={t("dashboard.extrasSales")}
            dot={false}
            activeDot={{
              r: 5,
              fill: "var(--color-green)",
              stroke: "var(--color-card)",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Legend سفارشی */}
      <div className="flex items-center justify-center gap-x-6">
        <LegendItem
          color="var(--color-indigo)"
          label={t("dashboard.totalSales")}
        />
        <LegendItem
          color="var(--color-green)"
          label={t("dashboard.extrasSales")}
        />
      </div>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="size-2.5 shrink-0 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-text text-sm">{label}</span>
    </div>
  );
}

export default SalesChart;
