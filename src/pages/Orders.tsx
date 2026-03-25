import { useState } from "react";
import { useGetOrdersQuery, useCompleteOrderMutation, useCancelOrderMutation } from "../slices/orderApiSlice";

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
    } catch (err) {
      console.error("Failed to complete order:", err);
    }
  };

  const markCancelOrder = async (id: string) => {
    try {
      await cancelOrder(id).unwrap();
    } catch (err) {
      console.error("Failed to cancel order:", err);
    }
  };

  if (isLoading) return <div>Loading orders...</div>;
  if (error) return <div>Error loading orders</div>;

  const totalPages = data?.pagination?.totalPages ?? 1;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      {/* Status Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => { setStatus(s === "ALL" ? "" : s); setPage(1); }}
            className={`px-3 py-1 rounded-full text-sm font-medium border transition
              ${(s === "ALL" && !status) || s === status
                ? "bg-black text-white border-black"
                : "bg-white text-gray-600 border-gray-300 hover:border-black"
              }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Orders */}
      {data?.orders?.length === 0 && (
        <p className="text-gray-500">No orders found.</p>
      )}
      <div className="grid gap-4">
        {data?.orders?.map((order: any) => (
          <div
            key={order.id}
            className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm text-gray-500 truncate max-w-[60%]">{order.id}</p>
              <span className={`px-2 py-1 text-xs rounded-full font-semibold
                ${order.status === "PENDING" ? "bg-yellow-100 text-yellow-700"
                  : order.status === "COMPLETED" ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"}`}>
                {order.status}
              </span>
            </div>
            <p className="text-lg font-semibold mb-3">Rs. {order.total}</p>
            {order.status === "PENDING" && (
              <div className="flex gap-2">
                <button
                  onClick={() => markCompleteOrder(order.id)}
                  disabled={updating}
                  className="flex-1 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  Complete
                </button>
                <button
                  onClick={() => markCancelOrder(order.id)}
                  disabled={canceling}
                  className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
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
            className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;