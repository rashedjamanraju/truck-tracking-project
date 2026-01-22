import { Outlet } from "react-router-dom"

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-5 space-y-4">
        <h2 className="text-2xl font-bold">🚛 TruckTrack</h2>
        <nav className="space-y-2 text-slate-300">
          <a className="block hover:text-white" href="/dashboard">Dashboard</a>
          <a className="block hover:text-white" href="/map">Live Map</a>
          <a className="block hover:text-white" href="/bookings">Bookings</a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <header className="bg-white shadow px-6 py-3 flex justify-between">
          <h1 className="font-semibold text-slate-700">Admin Dashboard</h1>
          <button className="text-sm text-red-500">Logout</button>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>

      </div>
    </div>
  )
}
