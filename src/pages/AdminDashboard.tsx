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
  const { data: Revenue, isLoading, error } = useGetRevenueQuery();
  const { data: DailyRevenue } = useGetDailyRevenueQuery();
  const { data: TopProducts } = useGetTopProductsQuery();

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6">Error loading data</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">

      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

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
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={DailyRevenue.trend}>
                <CartesianGrid strokeDasharray="3 3" />
                
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString()
                  }
                />

                <YAxis yAxisId="left" label={{ value: "Revenue", angle: 90, position: "insideLeft" }} />
                <YAxis yAxisId="right" orientation="right" label={{ value: "Orders", angle: -90, position: "insideRight" }} />

                <Tooltip
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString()
                  }
                  formatter={(value, name) => {
                    if (name === "revenue") return [`Rs. ${value}`, "Revenue"];
                    if (name === "orders") return [value, "Orders"];
                  }}
                />

                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  strokeWidth={2}
                />

                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="orders"
                  stroke="#16a34a"
                  strokeWidth={2}
                />

                <Legend />

              </LineChart>
            </ResponsiveContainer>
          </div>
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