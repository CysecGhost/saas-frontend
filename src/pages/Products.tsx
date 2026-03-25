import { useGetProductsQuery } from "../slices/productApiSlice";

const Products = () => {
  const { data, isLoading, error } = useGetProductsQuery();

  if (isLoading) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-500 text-sm">Loading...</div>;
  if (error) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-red-500 text-sm">Error loading products</div>;

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-1">Products</h1>
        <p className="text-gray-500 text-sm mb-8">{data?.products?.length ?? 0} products in inventory</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {data?.products?.map((product: any) => (
            <div
              key={product.id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition"
            >
              <h2 className="text-white font-semibold mb-3">{product.name}</h2>
              <p className="text-gray-400 text-sm mb-2">Rs. {product.price}</p>
              <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium
                ${product.stock > 10
                  ? "bg-green-500/10 text-green-400"
                  : product.stock > 0
                  ? "bg-yellow-500/10 text-yellow-400"
                  : "bg-red-500/10 text-red-400"
                }`}>
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;