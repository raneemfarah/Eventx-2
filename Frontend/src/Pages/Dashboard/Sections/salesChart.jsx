import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
const data = [
  { name: "Week 1", sales: 35000 },
  { name: "Week 2", sales: 22000 },
  { name: "Week 3", sales: 46000 },
  { name: "Week 4", sales: 15000 },
  { name: "Week 5", sales: 28000 },
  { name: "Week 6", sales: 34000 },
  { name: "Week 7", sales: 22500 },
];

export default function SalesChart() {
  const [filter, setFilter] = useState("Weekly");

  return (
    <div className="bg-white rounded-2xl shadow p-4 w-full max-w-[550px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">NET SALES</h2>
      <select
  value={filter}
  onChange={(e) => setFilter(e.target.value)}
  className="bg-black text-white text-sm px-3 py-1 rounded-lg border border-white"
>
  <option value="Weekly">Weekly</option>
  <option value="Daily">Daily</option>
</select>
      </div>
      <div className="grid grid-cols-3 gap-4 text-sm mb-4">
        <div>
          <p className="text-gray-500">Total Revenue</p>
          <p className="font-bold text-red-500">156,500 LKR</p>
        </div>
        <div>
          <p className="text-gray-500">Total Tickets</p>
          <p className="font-bold">2438 Tickets</p>
        </div>
        <div>
          <p className="text-gray-500">Total Events</p>
          <p className="font-bold">32 Events</p>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#ef4444" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}//placeholder
