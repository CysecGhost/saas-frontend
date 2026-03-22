import { apiSlice } from "./apiSlice";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation<any, { name: string; price: number; stock: number }>({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    getProducts: builder.query<any, void>({
      query: () => ({
        url: "/products",
        method: "GET",
        providesTags: ["Products"],
      }),
    }),
  }),
});

export const { useCreateProductMutation, useGetProductsQuery } = productApiSlice;

export default productApiSlice;