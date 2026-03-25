import { apiSlice } from "./apiSlice";

const analyticsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRevenue: builder.query<any, { startDate?: string; endDate?: string }>({
            query: ({ startDate, endDate }) => ({
                url: "/analytics/revenue",
                params: {
                    ...(startDate && { startDate }),
                    ...(endDate && { endDate }),
    },
            }),
            providesTags: ["Analytics"],
        }),

        getDailyRevenue: builder.query<any, { startDate?: string; endDate?: string }>({
            query: ({ startDate, endDate }) => ({
                url: "/analytics/revenue/daily",
                params: {
                    ...(startDate && { startDate }),
                    ...(endDate && { endDate }),
    },
            }),
            providesTags: ["Analytics"],
        }),

        getTopProducts: builder.query<any, { startDate?: string; endDate?: string }>({
            query: ({ startDate, endDate }) => ({
                url: "/analytics/top-products",
                params: {
                    ...(startDate && { startDate }),
                    ...(endDate && { endDate }),
    },
            }),
            providesTags: ["Analytics"],
        }),
    }),
});

export const { useGetRevenueQuery, useGetDailyRevenueQuery, useGetTopProductsQuery } = analyticsApiSlice;

export default analyticsApiSlice;