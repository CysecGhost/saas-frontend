import { useGetOrdersQuery, useCompleteOrderMutation, useCancelOrderMutation } from "../slices/orderApiSlice";

const Orders = () => {
  const { data, isLoading } = useGetOrdersQuery();
  const [completeOrder, { isLoading: updating }] = useCompleteOrderMutation();
  const [cancelOrder, { isLoading: canceling }] = useCancelOrderMutation();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      {data?.orders?.map((order: any) => (
        <div key={order.id} className="border p-4 mb-2 rounded shadow-sm">
          
          <p><strong>ID:</strong> {order.id}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total:</strong> {order.total}</p>

          <button 
          onClick={() => completeOrder(order.id)}
          disabled={order.status !== "PENDING" || updating}
          className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Mark Completed
          </button>

          <button 
          onClick={() => cancelOrder(order.id)}
          disabled={order.status !== "PENDING" || canceling}
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Cancel
          </button>

        </div>
      ))}
    </div>
  );
};

export default Orders;