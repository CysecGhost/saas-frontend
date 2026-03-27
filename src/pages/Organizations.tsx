import { useGetOrganizationsQuery } from "../slices/organizationApiSlice";
import { useDispatch } from "react-redux";
import { setOrgId } from "../slices/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorState from "../components/ErrorState";

const Organizations = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useGetOrganizationsQuery();
  const [selected, setSelected] = useState<string>("");

  const handleContinue = () => {
    if (!selected) return;
    dispatch(setOrgId(selected));
    navigate("/admin/dashboard");
  };

  if (isLoading) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-500 text-sm">Loading...</div>;
  if (error) return <ErrorState onRetry={refetch} />;

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-10">
      <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Select Organization</h1>
      <p className="text-gray-500 text-sm mb-10">Choose the organization you want to manage</p>

      <div className="flex flex-col gap-3 w-full max-w-md">
        {data?.orgs?.map((org: any) => (
          <button
            key={org.orgId}
            onClick={() => setSelected(org.orgId)}
            className={`w-full px-5 py-4 rounded-xl border text-left transition
              ${selected === org.orgId
                ? "bg-blue-500 border-blue-500 text-white"
                : "bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-600 hover:text-white"
              }`}
          >
            <p className="font-semibold text-sm">{org.name}</p>
            <p className="text-xs opacity-60 mt-0.5">{org.orgId}</p>
          </button>
        ))}
      </div>

      <button
        onClick={handleContinue}
        disabled={!selected}
        className="mt-8 px-8 py-3 bg-blue-500 text-white rounded-xl text-sm font-semibold hover:bg-blue-600 transition disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
};

export default Organizations;