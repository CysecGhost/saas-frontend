import { useGetProductsQuery } from "../slices/productApiSlice";

const Products = () => {
  const { data, isLoading, error } = useGetProductsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
  <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.products?.map((product: any) => (
          <div
            key={product.id}
            className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>

            <p className="text-gray-600">Price: Rs. {product.price}</p>

            <p
              className={`mt-2 text-sm font-medium ${
                product.stock > 10
                  ? "text-green-600"
                  : product.stock > 0
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              Stock: {product.stock}
            </p>
          </div>
        ))}
      </div>
  </div>
  );
};

export default Products;