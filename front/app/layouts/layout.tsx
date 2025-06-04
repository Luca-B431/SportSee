import Sidebar from "./sidebar";
import Topbar from "./topbar";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <Topbar />
      <div className="flex flex-1 h-0">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
