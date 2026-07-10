import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";
import useTodayActivity from "./useTodayActivity";

function TodayActivity() {
  const { activities, isLoading } = useTodayActivity();

  return (
    <div className="bg-white rounded-xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] w-full flex flex-col gap-5 overflow-scroll overflow-x-hidden scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:w-0">
      <div className="flex flex-col gap-1">
        <Heading as="h3" className="text-[#1a1a2e] text-lg font-semibold">
          Today
        </Heading>
        <p className="text-sm text-gray-400">
          Check-ins & check-outs for today
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
              className="w-10 h-10 mb-3 text-gray-300"
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