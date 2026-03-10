import { useGetOrganizationsQuery } from "../slices/organizationApiSlice";
import { useDispatch } from "react-redux";
import { setOrgId } from "../slices/authSlice";
import { useEffect } from "react";


const Organizations = () => {
    const dispatch = useDispatch();

    const { data, isLoading, error } = useGetOrganizationsQuery();

    useEffect(() => {
        if (data?.orgs?.length) {
          dispatch(setOrgId(data.orgs[0].orgId));
      };
    }, [data, dispatch]);

    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error loading revenue data</div>;
    }

    return (
      <div>
        <h1>Organizations</h1>
        <p>Organization: {data?.orgs?.[0]?.orgId}</p>
      </div>
    )
}

export default Organizations;