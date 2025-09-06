import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sections/sidebar";
import Topbar from "./Sections/topbar";
import StatsCards from "./Sections/statsCards";
import SalesChart from "./Sections/salesChart";
import EngagementChart from "./Sections/engagementChart";
import LatestEvent from "./Sections/latestEvent";
import UpcomingEvents from "./Sections/upcomingEvents";
import EventManagment from "../EventManagment/eventManagment";
import AddEvent from "../AddEvent/addEvent";
export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <Routes>
            <Route
              index
              element={
                <div className="flex flex-col">
                  <Topbar />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    <div className="col-span-1 md:col-span-3">
                      <StatsCards />
                    </div>

                    <div className="bg-white rounded-2xl p-4 shadow col-span-1 md:col-span-2">
                      <SalesChart />
                    </div>

                    <div className="bg-white rounded-2xl p-4 shadow col-span-1">
                      <EngagementChart />
                    </div>

                    <div className="bg-white rounded-2xl p-4 shadow col-span-1 md:col-span-2">
                      <LatestEvent />
                    </div>

                    <div className="bg-white rounded-2xl p-4 shadow col-span-1">
                      <UpcomingEvents />
                    </div>
                  </div>
                </div>
              }
            />

            <Route path="manage-events" element={<EventManagment />} />
            <Route path="add-event" element={<AddEvent />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
