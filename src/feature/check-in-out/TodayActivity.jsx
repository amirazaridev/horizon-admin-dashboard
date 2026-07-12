import { useTranslation } from "react-i18next";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";
import useTodayActivity from "./useTodayActivity";

function TodayActivity() {
  const {t} = useTranslation()
  const { activities, isLoading } = useTodayActivity();

  return (
    <div className="bg-card scrollbar-none hover:border-border-strong shadow-shadow-soft flex w-full flex-col gap-5 overflow-scroll overflow-x-hidden rounded-xl p-5 transition-[transform,border-color] duration-200 [-ms-overflow-style:none] hover:-translate-y-0.75 [&::-webkit-scrollbar]:w-0">
      <div className="flex flex-col gap-1">
        <Heading as="h3" className="text-lg font-semibold text-text">
          {t("dashboard.todayActivity")}
        </Heading>
        <p className="text-sm text-gray-400">
          {t("dashboard.todayCheckins")}
        </p>
      </div>

      {!isLoading ? (
        activities?.length > 0 ? (
          <div className="flex flex-col gap-4">
            {activities.map((act) => (
              <TodayItem activity={act} key={act.id} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mb-3 h-10 w-10 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
              />
            </svg>
            <span className="text-sm font-medium">No Activity Today</span>
          </div>
        )
      ) : (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default TodayActivity;
