import DashboardFilter from "../feature/dashboard/DashboardFilter";
import DashboardLayout from "../feature/dashboard/DashboardLayout";
import Container from "../ui/Container";
import Heading from "../ui/Heading";

function Dashboard() {
  return (
    <Container>
      <div className="flex justify-between">
        <Heading>Dashboard</Heading>
        <DashboardFilter />
      </div>
      <DashboardLayout />
    </Container>
  );
}

export default Dashboard;
