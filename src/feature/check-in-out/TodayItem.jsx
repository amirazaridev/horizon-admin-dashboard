import { useNavigate } from "react-router";
import CheckoutButton from "./CheckoutButton";
import Button from "../../ui/Button";
import { useTranslation } from "react-i18next";

function TodayItem({ activity }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { id, status, numNights, guest: { fullName } = {} } = activity;
  const isArriving = status === "unconfirmed";
  const isDeparting = status === "checked-in";

  return (
    <div className="group grid items-center gap-4 rounded-lg bg-gray-50/70 px-4 py-3 transition-colors duration-200 hover:bg-gray-100/80 md:grid-cols-[0.1fr_1fr_0.6fr_1fr]">
      {/* Status Indicator Dot */}
      <div
        className={`h-2.5 w-2.5 shrink-0 rounded-full ${
          isArriving ? "bg-emerald-400" : "bg-orange-400"
        }`}
      />

      {/* Guest Info */}
      <div className="min-w-0 flex-1 place-items-start">
        <p className="truncate text-sm font-semibold text-gray-800">
          {fullName}
        </p>
        <p className="mt-0.5 text-xs text-gray-400">
          {t("dashboard.nightsCount", { count: numNights })}
        </p>
      </div>

      {/* Status Tag */}
      {isArriving && (
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600 ring-1 ring-emerald-200 ring-inset">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
              clipRule="evenodd"
            />
          </svg>
          Arriving
        </span>
      )}

      {isDeparting && (
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-600 ring-1 ring-orange-200 ring-inset">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
              clipRule="evenodd"
            />
          </svg>
          Departing
        </span>
      )}

      {/* Action Button */}
      {isArriving && (
        <Button
          onClick={() => navigate(`/checkin/${id}`)}
          type="checkedIn"
          size="sm"
        >
          {t("bookings.checkedIn")}
        </Button>
      )}

      {isDeparting && <CheckoutButton id={id} inDashboard={true} />}
    </div>
  );
}

export default TodayItem;
