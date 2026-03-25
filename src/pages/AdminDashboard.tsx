import { useState } from "react";
import { useGetRevenueQuery, useGetDailyRevenueQuery, useGetTopProductsQuery } from "../slices/analyticsApiSlice";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const AdminDashboard = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const { data: Revenue, isLoading, error } = useGetRevenueQuery({
    startDate: startDate ? new Date(startDate).toISOString() : undefined,
    endDate: endDate ? new Date(endDate).toISOString() : undefined,
  });
  const { data: DailyRevenue } = useGetDailyRevenueQuery({
    startDate: startDate ? new Date(startDate).toISOString() : undefined,
    endDate: endDate ? new Date(endDate).toISOString() : undefined,
  });
  const { data: TopProducts } = useGetTopProductsQuery({
    startDate: startDate ? new Date(startDate).toISOString() : undefined,
    endDate: endDate ? new Date(endDate).toISOString() : undefined,
  });

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6">Error loading data</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">

      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm w-fit">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>

        <input
          type="date"
          id="startDate"
          onChange={(e) => setStartDate(e.target.value)}
          className="text-sm text-gray-700 outline-none cursor-pointer"
        />

        <span className="text-gray-300 font-light">→</span>

        <input
          type="date"
          id="endDate"
          onChange={(e) => setEndDate(e.target.value)}
          className="text-sm text-gray-700 outline-none cursor-pointer"
        />

        {(startDate || endDate) && (
          <button
            onClick={() => { setStartDate(""); setEndDate(""); }}
            className="ml-1 text-gray-300 hover:text-gray-500 transition text-lg leading-none"
          >
            ×
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <h2 className="text-2xl font-bold mt-2">Rs. {Revenue?.totalRevenue}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <h2 className="text-2xl font-bold mt-2">{Revenue?.totalOrders}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Avg Order Value</p>
          <h2 className="text-2xl font-bold mt-2">Rs. {Revenue?.averageOrderValue}</h2>
        </div>
      </div>

      {/* Daily Revenue Trend */}
      <div className="bg-white p-6 rounded-xl shadow border">
        <h2 className="text-xl font-semibold mb-4">Daily Revenue</h2>
        {!DailyRevenue?.trend?.length ? (
          <p className="text-gray-500">No completed orders yet</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={DailyRevenue.trend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                tickFormatter={(v) => new Date(v).toLocaleDateString()}
                tick={{ fontSize: 12, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `Rs. ${v}`}
              />
              <Tooltip
                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                labelFormatter={(v) => new Date(v).toLocaleDateString()}
                formatter={(v) => [`Rs. ${v}`, "Revenue"]}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ r: 4, fill: "#2563eb" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Daily Orders */}
      <div className="bg-white p-6 rounded-xl shadow border">
        <h2 className="text-xl font-semibold mb-4">Daily Orders</h2>
        {!DailyRevenue?.trend?.length ? (
          <p className="text-gray-500">No completed orders yet</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={DailyRevenue.trend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                tickFormatter={(v) => new Date(v).toLocaleDateString()}
                tick={{ fontSize: 12, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 12, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                labelFormatter={(v) => new Date(v).toLocaleDateString()}
                formatter={(v) => [v, "Orders"]}
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#16a34a"
                strokeWidth={2}
                dot={{ r: 4, fill: "#16a34a" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Top Products */}
      <div className="bg-white p-6 rounded-xl shadow border">
        <h2 className="text-xl font-semibold mb-4">Top Products</h2>

        {TopProducts?.topSellingProducts?.length === 0 ? (
          <p className="text-gray-500">No sales yet</p>
        ) : (
          <div className="space-y-3">
            {TopProducts?.topSellingProducts?.map((product: any, index: number) => (
              <div
                key={product.id}
                className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 transition"
              >
                <div>
                  <p className="font-medium">
                    {index + 1}. {product.name}
                  </p>
                </div>
                <p className="text-sm text-gray-600">
                  {product.totalSold} sold
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminDashboard;