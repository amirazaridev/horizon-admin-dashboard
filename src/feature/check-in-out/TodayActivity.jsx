import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";
import useTodayActivity from "./useTodayActivity";

function TodayActivity() {
  const { activities, isLoading } = useTodayActivity();
  return (
    <div className="bg-card flex flex-col gap-y-8 scrollbar-none w-full overflow-scroll overflow-x-hidden rounded-md p-4 shadow-2xs [-ms-overflow-style:none] [&::-webkit-scrollbar]:w-0">
      <Heading as="h3">Today</Heading>
      {!isLoading ? (
        activities?.length > 0 ? (
          <TodayList activities={activities} />
        ) : (
          <NoActivity>No Activity Today</NoActivity>
        )
      ) : (
        <Spinner />
      )}
    </div>
  );
}

function NoActivity({ children }) {
  return <div>{children}</div>;
}
function TodayList({ activities }) {
  return (
    <div className="flex flex-col gap-y-4">
      {activities.map((act) => (
        <TodayItem activity={act} key={act.id} />
      ))}
    </div>
  );
}
export default TodayActivity;
