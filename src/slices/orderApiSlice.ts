import { apiSlice } from "./apiSlice";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products", "Analytics"],
    }),
  }),
});

export const { useCreateOrderMutation } = orderApiSlice;
export default orderApiSlice;