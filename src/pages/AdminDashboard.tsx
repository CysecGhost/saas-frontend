import { useState } from "react";
import { useGetRevenueQuery, useGetDailyRevenueQuery, useGetTopProductsQuery } from "../slices/analyticsApiSlice";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const AdminDashboard = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const formattedStart = startDate ? new Date(startDate).toISOString() : undefined;
  const formattedEnd = endDate ? new Date(endDate).toISOString() : undefined;

  const { data: Revenue, isLoading, error } = useGetRevenueQuery({
    startDate: formattedStart,
    endDate: formattedEnd,
  });
  const { data: DailyRevenue } = useGetDailyRevenueQuery({
    startDate: formattedStart,
    endDate: formattedEnd,
  });
  const { data: TopProducts } = useGetTopProductsQuery({
    startDate: formattedStart,
    endDate: formattedEnd,
  });

  if (isLoading) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-500 text-sm">Loading...</div>;
  if (error) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-red-500 text-sm">Error loading data</div>;

  const accents = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Analytics overview</p>
          </div>

          {/* Date picker */}
          <div className="flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-transparent text-sm text-gray-400 outline-none cursor-pointer"
            />
            <span className="text-gray-700">—</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-transparent text-sm text-gray-400 outline-none cursor-pointer"
            />
            {(startDate || endDate) && (
              <button
                onClick={() => { setStartDate(""); setEndDate(""); }}
                className="text-gray-600 hover:text-gray-400 transition text-lg leading-none"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { label: "Total Revenue", value: `Rs. ${Number(Revenue?.totalRevenue ?? 0).toLocaleString()}`, accent: "#3b82f6" },
            { label: "Total Orders", value: Revenue?.totalOrders ?? 0, accent: "#8b5cf6" },
            { label: "Avg Order Value", value: `Rs. ${Number(Revenue?.averageOrderValue ?? 0).toFixed(0)}`, accent: "#10b981" },
          ].map(({ label, value, accent }) => (
            <div key={label} className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition">
              <p className="text-gray-500 text-xs uppercase tracking-wider">{label}</p>
              <p className="text-2xl font-bold text-white mt-2">{value}</p>
              <div className="mt-3 h-px w-full" style={{ background: `linear-gradient(90deg, ${accent}40, transparent)` }} />
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-white font-semibold mb-1">Daily Revenue</h2>
            <p className="text-gray-600 text-xs mb-4">Rs. over time</p>
            {!DailyRevenue?.trend?.length ? (
              <div className="h-48 flex items-center justify-center text-gray-700 text-sm">No data yet</div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={DailyRevenue.trend} margin={{ top: 5, right: 0, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="date" tickFormatter={(v) => new Date(v).toLocaleDateString("en-US", { month: "short", day: "numeric" })} tick={{ fontSize: 11, fill: "#4b5563" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#4b5563" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1f2937", borderRadius: 8 }} labelStyle={{ color: "#6b7280", fontSize: 11 }} itemStyle={{ color: "#f9fafb" }} labelFormatter={(v) => new Date(v).toLocaleDateString()} formatter={(v) => [`Rs. ${v}`, "Revenue"]} />
                  <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fill="url(#revGrad)" dot={{ r: 3, fill: "#3b82f6", strokeWidth: 0 }} activeDot={{ r: 5 }} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-white font-semibold mb-1">Daily Orders</h2>
            <p className="text-gray-600 text-xs mb-4">Order count over time</p>
            {!DailyRevenue?.trend?.length ? (
              <div className="h-48 flex items-center justify-center text-gray-700 text-sm">No data yet</div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={DailyRevenue.trend} margin={{ top: 5, right: 0, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="ordGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="date" tickFormatter={(v) => new Date(v).toLocaleDateString("en-US", { month: "short", day: "numeric" })} tick={{ fontSize: 11, fill: "#4b5563" }} axisLine={false} tickLine={false} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#4b5563" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1f2937", borderRadius: 8 }} labelStyle={{ color: "#6b7280", fontSize: 11 }} itemStyle={{ color: "#f9fafb" }} labelFormatter={(v) => new Date(v).toLocaleDateString()} formatter={(v) => [v, "Orders"]} />
                  <Area type="monotone" dataKey="orders" stroke="#8b5cf6" strokeWidth={2} fill="url(#ordGrad)" dot={{ r: 3, fill: "#8b5cf6", strokeWidth: 0 }} activeDot={{ r: 5 }} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-white font-semibold mb-1">Top Products</h2>
          <p className="text-gray-600 text-xs mb-5">Best selling by volume</p>
          {!TopProducts?.topSellingProducts?.length ? (
            <p className="text-gray-700 text-sm">No sales yet</p>
          ) : (
            <div className="flex flex-col gap-2">
              {TopProducts.topSellingProducts.map((product: any, index: number) => {
                const pct = Math.round((product.totalSold / (TopProducts.topSellingProducts[0]?.totalSold || 1)) * 100);
                const accent = accents[index] ?? "#4b5563";
                return (
                  <div key={product.id} className="flex items-center gap-4 p-3 rounded-lg border border-gray-800 hover:border-gray-700 hover:bg-gray-800/50 transition">
                    <span className="text-xs font-mono w-5 text-center" style={{ color: accent }}>{index + 1}</span>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{product.name}</p>
                      <div className="mt-1.5 h-1 rounded-full bg-gray-800 overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: accent }} />
                      </div>
                    </div>
                    <span className="text-xs font-mono" style={{ color: accent }}>{product.totalSold} sold</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;