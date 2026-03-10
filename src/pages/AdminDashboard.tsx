import { useGetRevenueQuery } from "../slices/apiSlice"

const AdminDashboard = () => {
  const { data, isLoading, error } = useGetRevenueQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading revenue data</div>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Revenue: {data?.totalRevenue}</p>
    </div>
  )
}

export default AdminDashboard;