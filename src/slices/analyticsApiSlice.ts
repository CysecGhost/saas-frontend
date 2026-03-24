import { apiSlice } from "./apiSlice";

const analyticsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRevenue: builder.query<any, void>({
            query: () => ({
                url: "/analytics/revenue",
            }),
            providesTags: ["Analytics"],
        }),

        getDailyRevenue: builder.query<any, void>({
            query: () => ({
                url: "/analytics/revenue/daily",
            }),
            providesTags: ["Analytics"],
        }),

        getTopProducts: builder.query<any, void>({
            query: () => ({
                url: "/analytics/top-products",
            }),
            providesTags: ["Analytics"],
        }),
    }),
});

export const { useGetRevenueQuery, useGetDailyRevenueQuery, useGetTopProductsQuery } = analyticsApiSlice;

export default analyticsApiSlice;