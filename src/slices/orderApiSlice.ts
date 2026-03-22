import { apiSlice } from "./apiSlice";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
      createOrder: builder.mutation({
          query: (data) => ({
              url: "/orders",
              method: "POST",
              body: data,
            }),
            invalidatesTags: ["Products", "Orders", "Analytics"],
        }),
        getOrders: builder.query<any, void>({
            query: () => ({
                url: "/orders",
            }),
            providesTags: ["Orders"],
        }),
        completeOrder: builder.mutation({
            query: (id) => ({
                url: `/orders/${id}/completed`,
                method: "PATCH",
            }),
            invalidatesTags: ["Products", "Orders", "Analytics"],
        }),
        cancelOrder: builder.mutation({
            query: (id) => ({
                url: `/orders/${id}/cancel`,
                method: "PATCH",
            }),
            invalidatesTags: ["Products", "Orders", "Analytics"],
        }),
    }),
});

export const { useCreateOrderMutation, useGetOrdersQuery, useCompleteOrderMutation, useCancelOrderMutation } = orderApiSlice;
export default orderApiSlice;