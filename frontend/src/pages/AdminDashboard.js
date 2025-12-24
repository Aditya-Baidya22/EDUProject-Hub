// ADMIN DASHBOARD (Shared work):
// - FRONTEND DEVELOPER (Shimanta): UI layout
// - BACKEND DEVELOPER (Aditya): Can later connect real stats from API
// - DATABASE ADMIN (Samrat): Stats based on collections
// - AUTHENTICATION DEVELOPER (Priyanti): Protected only for admin users via ProtectedRoute

const AdminDashboard = () => {
  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Admin Dashboard
      </h1>

      {/* Top Stats (Static demo values) */}
      <section className="grid gap-4 md:grid-cols-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Projects</p>
          <p className="text-2xl font-bold mt-1">120</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Departments</p>
          <p className="text-2xl font-bold mt-1">5</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Teachers Contributed</p>
          <p className="text-2xl font-bold mt-1">18</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Students Contributed</p>
          <p className="text-2xl font-bold mt-1">85</p>
        </div>
      </section>

      {/* Bottom section: Recent projects + Users */}
      <section className="grid gap-4 md:grid-cols-[2fr,1.3fr]">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h2 className="text-lg font-semibold mb-2">Recent Projects</h2>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>EDUProject Hub – CSE – 2025</li>
            <li>Smart Library System – CSE – 2025</li>
            <li>Online Result Portal – CSE – 2024</li>
            <li>Attendance Tracker – BBA – 2024</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h2 className="text-lg font-semibold mb-2">Users & Settings</h2>
          <ul className="text-sm text-gray-700 space-y-1 mb-3">
            <li>Admin 1 (Teacher)</li>
            <li>Admin 2 (Teacher)</li>
            <li>Student 1</li>
            <li>Student 2</li>
          </ul>
          <button className="w-full py-2 bg-gray-900 text-white rounded-lg text-sm font-medium">
            Open Settings
          </button>
        </div>
      </section>

      <p className="mt-6 text-center text-gray-400 text-sm">
        2025 EDUProject Hub • Admin Panel
      </p>
    </main>
  );
};

export default AdminDashboard;
