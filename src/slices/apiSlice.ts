import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store"; 
import { setCredentials, logout } from "./authSlice";

const baseQuery = fetchBaseQuery({ 
        baseUrl: import.meta.env.VITE_API_URL,
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState;
            const token = state.auth.accessToken;
            const orgId = state.auth.orgId;

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            };

            if (orgId) {
                headers.set("X-Org-Id", orgId);
            };

            return headers;
        }
    });

    const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
        let result = await baseQuery(args, api, extraOptions);

        if (result.error && result.error.status === 401) {
            const refreshResult = await baseQuery(
                {url: "/auth/refresh", method: "POST"},
                api,
                extraOptions
            );
            if (refreshResult.data) {
              const token = (refreshResult.data as any).accessToken;
              api.dispatch(setCredentials(token));
              result = await baseQuery(args, api, extraOptions);
            } else {
                api.dispatch(logout());
            };
        };

        return result;
    };

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Products", "Orders", "Analytics"],
    endpoints: () => ({}), 
});