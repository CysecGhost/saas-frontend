import { apiSlice } from "./apiSlice";

const organizationApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrganizations: builder.query<{ orgs: any }, void>({
            query: () => ({
                url: "/orgs",
                method: "GET",
            }),
        }),
    }),
});

export const { useGetOrganizationsQuery } = organizationApiSlice;

export default organizationApiSlice;