import { useState } from "react";
import { useCreateProductMutation } from "../slices/productApiSlice";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const submitHandler = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (!name) {
      setError("Product name is required");
      return;
    }
    try {
      await createProduct({ name, price, stock }).unwrap();
      setName("");
      setPrice(0);
      setStock(0);
      setSuccess(true);
    } catch (err: any) {
      setError(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-1">Create Product</h1>
        <p className="text-gray-500 text-sm mb-8">Add a new product to your inventory</p>

        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Product Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gray-600 transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="Enter price"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gray-600 transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              placeholder="Enter stock"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gray-600 transition"
            />
          </div>

          {error && <p className="text-red-500 text-xs">{error}</p>}
          {success && <p className="text-green-500 text-xs">Product created successfully</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-500 text-white rounded-xl text-sm font-semibold hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;