import Sidebar from "./Sidebar";
import Header from "./Header";
import Main from "./Main";
import { Outlet } from "react-router";

/**
 * Modern app shell: CSS-grid layout with auto sidebar + fluid main area.
 * The sidebar is sticky inside its own grid cell (handled by Sidebar itself).
 * Background uses the radial-gradient from the mockup for depth.
 */
function AppLayout() {
  return (
    <div className="grid min-h-screen" style={{ gridTemplateColumns: "auto 1fr" }}>
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <Main>
          <Outlet />
        </Main>
      </div>
    </div>
  );
}

export default AppLayout;
