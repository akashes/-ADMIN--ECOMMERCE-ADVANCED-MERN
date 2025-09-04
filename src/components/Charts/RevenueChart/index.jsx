import { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const RevenueChart = () => {
  const [chartView, setChartView] = useState("month");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const res = await axios.get(`/api/order/revenue?view=${chartView}`);
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRevenue();
  }, [chartView]);

  return (
    <div className="p-4 shadow rounded-xl bg-white">
      <div className="flex gap-2 mb-4">
        {["week", "month", "year"].map(v => (
          <button
            key={v}
            className={`px-4 py-2 rounded ${chartView===v ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setChartView(v)}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" fill="#3b82f6" radius={[8,8,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
