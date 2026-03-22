import { useGetProductsQuery } from "../slices/productApiSlice";

const Products = () => {
  const { data, isLoading, error } = useGetProductsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div>
      <h1>Products</h1>

      {data?.products?.map((product: any) => (
        <div key={product.id}>
          <div className="p-4 border rounded mb-2">
            <p className="font-bold">{product.name}</p>
            <p>Price: {product.price}</p>
            <p>Stock: {product.stock}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;