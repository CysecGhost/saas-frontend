import { useState } from "react";
import { useGetProductsQuery } from "../slices/productApiSlice";
import { useCreateOrderMutation } from "../slices/orderApiSlice";

const CreateOrder = () => {
  const { data } = useGetProductsQuery();
  const [createOrder] = useCreateOrderMutation();

  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);

  const submitHandler = async (e: any) => {
    e.preventDefault();

    await createOrder({
      items: [
        {
          productId: selectedProduct,
          quantity,
        },
      ],
    });
    setSelectedProduct("");
    setQuantity(1);
  };

  return (
  <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-sm border mt-10">
    <h1 className="text-2xl font-bold mb-6 text-center">Create Order</h1>

    <form onSubmit={submitHandler} className="flex flex-col gap-4">
      
      <div>
        <label className="text-sm text-gray-600">Select Product</label>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none"
        >
          <option value="">Choose a product</option>
          {data?.products?.map((p: any) => (
            <option key={p.id} value={p.id}>
              {p.name} — Rs.{p.price} (Stock: {p.stock})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm text-gray-600">Quantity</label>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="mt-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Create Order
      </button>
    </form>
  </div>
  );
};

export default CreateOrder;