import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import axios from "axios";

const COLORS = ["#8b5cf6", "#3b82f6", "#facc15", "#22c55e", "#ef4444"];
export default function EngagementChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/events")
      .then(res => {
        let eventsArray = Array.isArray(res.data) ? res.data : [];
        const now = new Date();
        eventsArray = eventsArray.filter(e => e.isDraft === false).filter(e => new Date(e.dateTime) >= now);
        const chartData = eventsArray.map((e) => {
          const paidSeats = e.seatAllocation
            ? e.seatAllocation.filter(seat => seat.status === "Paid").length
            : 0;
          return {
            name: e.name,
            value: paidSeats,
          };
        });
        setData(chartData);
      })
      .catch(err => console.error("Error fetching events:", err));
  }, []);

  if (data.length === 0) return <p>Loading engagement data...</p>;

  return (
    <div>
      <h2 className="font-bold mb-4">Customer Engagement</h2>
      <PieChart width={250} height={250}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={90}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}