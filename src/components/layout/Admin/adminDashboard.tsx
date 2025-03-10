import { useState } from "react";
import { Menu, X, Home, BarChart, Users, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:translate-x-0 lg:relative w-64 bg-white shadow-md p-5 space-y-4`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="mt-6 space-y-3">
          <SidebarLink icon={Home} label="Dashboard" />
          <SidebarLink icon={BarChart} label="Analytics" />
          <SidebarLink icon={Users} label="Users" />
          <SidebarLink icon={Settings} label="Settings" />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="flex items-center justify-between bg-white shadow-md px-6 py-4">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <Button className="bg-blue-500 text-white">Logout</Button>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard title="Total Users" value="5,420" />
          <DashboardCard title="Revenue" value="$12,500" />
          <DashboardCard title="New Orders" value="320" />
        </main>
      </div>
    </div>
  );
}

// Sidebar Link Component
function SidebarLink({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <a
      href="#"
      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-200 transition"
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </a>
  );
}

// Dashboard Card Component
function DashboardCard({ title, value }: { title: string; value: string }) {
  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
