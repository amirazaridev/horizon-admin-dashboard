import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import Heading from "../../ui/Heading";
import { useThemeToggle } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { formatFaNum } from "../../utils/helpers";

const startDataLight = [
  { duration: "1 night", value: 0, color: "#ef4444" },
  { duration: "2 nights", value: 0, color: "#f97316" },
  { duration: "3 nights", value: 0, color: "#eab308" },
  { duration: "4-5 nights", value: 0, color: "#84cc16" },
  { duration: "6-7 nights", value: 0, color: "#22c55e" },
  { duration: "8-14 nights", value: 0, color: "#14b8a6" },
  { duration: "15-21 nights", value: 0, color: "#3b82f6" },
  { duration: "21+ nights", value: 0, color: "#a855f7" },
];

const startDataDark = [
  { duration: "1 night", value: 0, color: "#b91c1c" },
  { duration: "2 nights", value: 0, color: "#c2410c" },
  { duration: "3 nights", value: 0, color: "#a16207" },
  { duration: "4-5 nights", value: 0, color: "#4d7c0f" },
  { duration: "6-7 nights", value: 0, color: "#15803d" },
  { duration: "8-14 nights", value: 0, color: "#0f766e" },
  { duration: "15-21 nights", value: 0, color: "#1d4ed8" },
  { duration: "21+ nights", value: 0, color: "#7e22ce" },
];

const durationKeyMap = {
  "1 night": "1night",
  "2 nights": "2nights",
  "3 nights": "3nights",
  "4-5 nights": "4to5nights",
  "6-7 nights": "6to7nights",
  "8-14 nights": "8to14nights",
  "15-21 nights": "15to21nights",
  "21+ nights": "21plusNights",
};

function prepareData(startData, stays) {
  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj,
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function DurationChart({ confirmedStays = [] }) {
  const { isDarkMode } = useThemeToggle();
  const { t, i18n } = useTranslation();

  const data = prepareData(
    isDarkMode ? startDataDark : startDataLight,
    confirmedStays,
  );

  const total = confirmedStays.length || 1;

  const translatedData = data.map((item) => ({
    ...item,
    duration: t(`dashboard.duration.${durationKeyMap[item.duration]}`),
    percent: formatFaNum(`${Math.round((item.value / total) * 100)}`),
  }));

  const averageNights = confirmedStays.length
    ? confirmedStays.reduce((sum, s) => sum + s.numNights, 0) /
      confirmedStays.length
    : 0;

  const formattedAverage = averageNights.toLocaleString(
    i18n.language?.startsWith("fa") ? "fa-IR" : "en-US",
    { minimumFractionDigits: 1, maximumFractionDigits: 1 },
  );

  return (
    <div className="bg-card border-border shadow-shadow-soft hover:border-border-strong flex w-full flex-col gap-y-4 rounded-2xl border p-5 transition-[transform,border-color] duration-200 hover:-translate-y-0.75">
      {/* Header */}
      <div className="text-end">
        <Heading as="h3">{t("dashboard.stayDurationSummary")}</Heading>
        <p className="text-text-muted text-sm">
          {t("dashboard.stayDurationSubtitle")}
        </p>
      </div>

      {/* Donut + عدد وسط */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={translatedData}
              nameKey="duration"
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={78}
              outerRadius={100}
              startAngle={90}
              endAngle={-270}
              paddingAngle={4}
              cornerRadius={8}
              stroke="none"
            >
              {translatedData.map((el) => (
                <Cell fill={el.color} key={el.duration} />
              ))}
            </Pie>
            <Tooltip
              wrapperStyle={{ zIndex: 50 }}
              formatter={(value, name, props) => [
                `${props.payload.percent}%`,
                name,
              ]}
              contentStyle={{
                borderRadius: 8,
                border: "1px solid var(--color-border)",
                background: "var(--color-card)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-text text-2xl font-bold">
            {formattedAverage}
          </span>
          <span className="text-text-muted text-xs">
            {t("dashboard.avgNights")}
          </span>
        </div>
      </div>

      {/* Legend سفارشی */}
      <div className="flex flex-col gap-y-3">
        {translatedData.map((item) => (
          <div
            key={item.duration}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-text text-sm">{item.duration}</span>
            </div>
            <span className="text-text text-sm font-semibold">
              {item.percent}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DurationChart;
