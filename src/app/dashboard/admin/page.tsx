import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Connect Link",
};

export default function AdminDashboard() {
  return (
    <div className="py-24 container mx-auto px-4 md:px-8">
      <div className="flex justify-between items-center mb-12 border-b border-border pb-6">
        <h1 className="text-3xl font-bold font-heading text-foreground">Admin Portal</h1>
        <span className="bg-primary/20 text-primary px-4 py-1 rounded-full text-sm font-semibold">Admin Role</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {["Total Projects", "Active Leads", "Revenue", "Employees"].map((stat) => (
          <div key={stat} className="bg-card border border-border rounded-xl p-6">
            <p className="text-muted-foreground text-sm mb-2">{stat}</p>
            <h3 className="text-3xl font-bold font-heading">...</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 min-h-[400px]">
          <h2 className="text-xl font-bold font-heading mb-4 border-b border-border pb-4">Recent Activity</h2>
          <p className="text-muted-foreground">No recent activity found. Integrate Supabase to fetch live data.</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-bold font-heading mb-4 border-b border-border pb-4">Quick Actions</h2>
          <ul className="space-y-4 text-sm font-medium">
            <li className="p-3 bg-secondary rounded-lg cursor-pointer hover:text-primary transition-colors">Create New Project</li>
            <li className="p-3 bg-secondary rounded-lg cursor-pointer hover:text-primary transition-colors">View Pending Quotes</li>
            <li className="p-3 bg-secondary rounded-lg cursor-pointer hover:text-primary transition-colors">Manage Employees</li>
            <li className="p-3 bg-secondary rounded-lg cursor-pointer hover:text-primary transition-colors">Generate Reports</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
