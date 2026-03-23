import { useGetOrdersQuery, useCompleteOrderMutation, useCancelOrderMutation } from "../slices/orderApiSlice";

const Orders = () => {
  const { data, isLoading, error, refetch } = useGetOrdersQuery();
  const [completeOrder, { isLoading: updating }] = useCompleteOrderMutation();
  const [cancelOrder, { isLoading: canceling }] = useCancelOrderMutation();

  // Refetch automatically after an update
  const markCompleteOrder = async (id: string) => {
    try {
      await completeOrder(id).unwrap();
      refetch(); // refresh orders list after change
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Refetch automatically after an update
  const markCancelOrder = async (id: string) => {
    try {
      await cancelOrder(id).unwrap();
      refetch(); // refresh orders list after change
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  if (isLoading) return <div>Loading orders...</div>;
  if (error) return <div>Error loading orders</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
  <h1 className="text-3xl font-bold mb-6">Orders</h1>

  {data?.orders?.length === 0 && (
    <p className="text-gray-500">No orders yet.</p>
  )}

  <div className="grid gap-4">
    {data?.orders?.map((order: any) => (
      <div
        key={order.id}
        className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
      >
        {/* Top Row */}
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm text-gray-500 truncate max-w-[60%]">
            {order.id}
          </p>

          <span
            className={`px-2 py-1 text-xs rounded-full font-semibold
              ${
                order.status === "PENDING"
                  ? "bg-yellow-100 text-yellow-700"
                  : order.status === "COMPLETED"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }
            `}
          >
            {order.status}
          </span>
        </div>

        {/* Info */}
        <div className="mb-3">
          <p className="text-lg font-semibold">Rs. {order.total}</p>
        </div>

        {/* Actions */}
        {order.status === "PENDING" && (
          <div className="flex gap-2 mt-3">
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
</div>
  );
};

export default Orders;