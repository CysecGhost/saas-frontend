import { useState } from "react";
import { useGetOrdersQuery, useCompleteOrderMutation, useCancelOrderMutation } from "../slices/orderApiSlice";
import toast from "react-hot-toast";
import Skeleton from "../components/Skeleton";

const STATUSES = ["ALL", "PENDING", "COMPLETED", "CANCELLED"];

const Orders = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const limit = 10;

  const { data, isLoading, error } = useGetOrdersQuery({
    page,
    limit,
    ...(status && { status }),
  });

  const [completeOrder, { isLoading: updating }] = useCompleteOrderMutation();
  const [cancelOrder, { isLoading: canceling }] = useCancelOrderMutation();

  const markCompleteOrder = async (id: string) => {
    try {
      await completeOrder(id).unwrap();
      toast.success("Order completed");
    } catch (err) {
      toast.error("Failed to complete order");
    }
  };

  const markCancelOrder = async (id: string) => {
    try {
      await cancelOrder(id).unwrap();
      toast.success("Order cancelled");
    } catch (err) {
      toast.error("Failed to cancel order");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 p-8">
        <div className="max-w-3xl mx-auto space-y-4">
          <Skeleton className="h-8 w-40" />
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-20" />
            ))}
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      </div>
    );
  }
  if (error) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-red-500 text-sm">Error loading orders</div>;

  const totalPages = data?.pagination?.totalPages ?? 1;

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-1">Orders</h1>
        <p className="text-gray-500 text-sm mb-8">Manage and update order statuses</p>

        {/* Status Filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => { setStatus(s === "ALL" ? "" : s); setPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition
                ${(s === "ALL" && !status) || s === status
                  ? "bg-white text-gray-950 border-white"
                  : "bg-transparent text-gray-500 border-gray-800 hover:border-gray-600 hover:text-gray-300"
                }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Orders */}
        {data?.orders?.length === 0 && (
          <p className="text-gray-600 text-sm">No orders found.</p>
        )}
        <div className="flex flex-col gap-3">
          {data?.orders?.map((order: any) => (
            <div
              key={order.id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition"
            >
              <div className="flex justify-between items-center mb-3">
                <p className="text-xs text-gray-600 font-mono truncate max-w-[60%]">{order.id}</p>
                <span className={`px-2 py-1 text-xs rounded-lg font-semibold
                  ${order.status === "PENDING" ? "bg-yellow-500/10 text-yellow-400"
                    : order.status === "COMPLETED" ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"}`}>
                  {order.status}
                </span>
              </div>
              <p className="text-xl font-bold text-white mb-4">Rs. {order.total}</p>
              {order.status === "PENDING" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => markCompleteOrder(order.id)}
                    disabled={updating}
                    className="flex-1 py-2 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg text-sm font-medium hover:bg-green-500/20 transition disabled:opacity-40"
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => markCancelOrder(order.id)}
                    disabled={canceling}
                    className="flex-1 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-sm font-medium hover:bg-red-500/20 transition disabled:opacity-40"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 text-sm hover:border-gray-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600 font-mono">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 text-sm hover:border-gray-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;