import { useTranslation } from "react-i18next";
import DashboardFilter from "../feature/dashboard/DashboardFilter";
import DashboardLayout from "../feature/dashboard/DashboardLayout";
import Container from "../ui/Container";
import Heading from "../ui/Heading";

function Dashboard() {
  const { t } = useTranslation();

  return (
    <Container>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-y-3">
          <Heading>{t("dashboard.title")}</Heading>
          <p className="text-text-muted">{t("dashboard.subtitle")}</p>
        </div>
        <div className="h-2/3">
          <DashboardFilter />
        </div>
      </div>
      <DashboardLayout />
    </Container>
  );
}

export default Dashboard;
