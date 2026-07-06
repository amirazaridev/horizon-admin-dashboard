import Sidebar from "./Sidebar";
import Header from "./Header";
import Main from "./Main";
import { Outlet } from "react-router";
import { useState } from "react";

/**
 * Modern app shell: CSS-grid layout with auto sidebar + fluid main area.
 * The sidebar is sticky inside its own grid cell (handled by Sidebar itself).
 * Background uses the radial-gradient from the mockup for depth.
 */
function AppLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[auto_1fr]">
      <Sidebar
        mobileOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
      <div className="flex min-w-0 flex-col">
        <Header onMenuClick={() => setMobileNavOpen(true)}/>
        <Main>
          <Outlet />
        </Main>
      </div>
    </div>
  );
}

export default AppLayout;
