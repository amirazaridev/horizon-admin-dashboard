import Sidebar from "./Sidebar";
import Header from "./Header";
import Main from "./Main";
import { Outlet } from "react-router";

function AppLayout() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />
        <Main>
          <Outlet />
        </Main>
      </div>
    </div>
  );
}

export default AppLayout;
