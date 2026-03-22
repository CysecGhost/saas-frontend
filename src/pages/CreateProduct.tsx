import { useState } from "react";
import { useCreateProductMutation } from "../slices/productApiSlice";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const [createProduct] = useCreateProductMutation();

  const submitHandler = async (e: any) => {
    e.preventDefault();

    await createProduct({ name, price, stock });

    setName("");
    setPrice(0);
    setStock(0);
  };

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-4 max-w-md mx-auto mt-8">
      <label htmlFor="name">
        Product Name:
      </label>
      <input
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product Name"
      />

      <label htmlFor="price">
        Price:
      </label>
      <input
        id="price"
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        placeholder="Price"
      />

      <label htmlFor="stock">
        Stock:
      </label>
      <input
        id="stock"
        type="number"
        value={stock}
        onChange={(e) => setStock(Number(e.target.value))}
        placeholder="Stock"
      />

      <button type="submit" className="w-1/2 self-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
        Create Product
      </button>
    </form>
  );
};

export default CreateProduct;