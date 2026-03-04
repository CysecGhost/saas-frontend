import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store"; 

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ 
        baseUrl: "/api",
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState;
            const token = state.auth.accessToken;

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            };

            return headers;
        }
    }),
    endpoints: (builder) => ({
        getRevenue: builder.query<{ totalRevenue: number }, void>({
            query: () => ({
                url: "/analytics/revenue"
            })
        })
    }), 
});

export const { useGetRevenueQuery } = apiSlice;