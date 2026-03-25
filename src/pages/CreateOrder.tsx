import { useState } from "react";
import { useGetProductsQuery } from "../slices/productApiSlice";
import { useCreateOrderMutation } from "../slices/orderApiSlice";

const CreateOrder = () => {
  const { data } = useGetProductsQuery();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (!selectedProduct) {
      setError("Please select a product");
      return;
    }
    try {
      await createOrder({ items: [{ productId: selectedProduct, quantity }] }).unwrap();
      setSelectedProduct("");
      setQuantity(1);
      setSuccess(true);
    } catch (err: any) {
      setError(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-1">Create Order</h1>
        <p className="text-gray-500 text-sm mb-8">Add items to a new order</p>

        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Product</label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white text-sm focus:outline-none focus:border-gray-600 transition"
            >
              <option value="">Choose a product</option>
              {data?.products?.map((p: any) => (
                <option key={p.id} value={p.id}>
                  {p.name} — Rs.{p.price} (Stock: {p.stock})
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Quantity</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white text-sm focus:outline-none focus:border-gray-600 transition"
            />
          </div>

          {error && <p className="text-red-500 text-xs">{error}</p>}
          {success && <p className="text-green-500 text-xs">Order created successfully</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-500 text-white rounded-xl text-sm font-semibold hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? "Creating..." : "Create Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateOrder;