import { apiSlice } from "./apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: "/auth/register",
                method: "POST",
                body: data,
            })
        })
    }),
});

export const { useLoginMutation, useRegisterMutation } = userApiSlice;

export default userApiSlice;