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
    <div>
      <h1 className="text-center p-4">Create Order</h1>

      <form onSubmit={submitHandler} className="flex flex-col gap-4 max-w-md mx-auto mt-8">
        <select onChange={(e) => setSelectedProduct(e.target.value)}>
          <option>Select Product</option>
          {data?.products?.map((p: any) => (
            <option key={p.id} value={p.id}>
              {p.name} (Stock: {p.stock})
            </option>
          ))}
        </select>

        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <button type="submit" className="w-1/2 self-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Create Order
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;