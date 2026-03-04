const Home = () => {
  return (
    <>
        <h1 className="text-4xl font-bold text-center mt-10">Admin Dashboard</h1>
        <p className="text-center mt-4 text-gray-600">
            Welcome to the admin dashboard. Use the navigation to access different sections.
        </p>
        <div className="mt-10 flex justify-center gap-4">
            <a
            href="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
                Login
            </a>
            <a
            href="/dashboard"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
                Dashboard
            </a>
        </div>
    </>
  )
}

export default Home;