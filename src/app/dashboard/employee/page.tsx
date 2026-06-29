import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Employee Portal | Connect Link",
};

export default function EmployeeDashboard() {
  return (
    <div className="py-24 container mx-auto px-4 md:px-8">
      <div className="flex justify-between items-center mb-12 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground">Employee Portal</h1>
          <p className="text-muted-foreground mt-2">Welcome back. Here are your tasks for today.</p>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition-colors">
          Clock In
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card border border-border rounded-xl p-6 min-h-[400px]">
          <h2 className="text-xl font-bold font-heading mb-4 border-b border-border pb-4">My Assigned Tasks</h2>
          <div className="space-y-4 mt-4">
            {[1, 2, 3].map((task) => (
              <div key={task} className="flex items-start gap-4 p-4 border border-border rounded-lg bg-secondary/50">
                <input type="checkbox" className="mt-1 w-5 h-5 accent-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Site Inspection - Highland Estate</h3>
                  <p className="text-xs text-muted-foreground mt-1">Due today at 14:00</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-bold font-heading mb-4 border-b border-border pb-4">Daily Report Upload</h2>
          <p className="text-sm text-muted-foreground mb-4">Please upload progress photos before clocking out.</p>
          <div className="border-2 border-dashed border-border rounded-lg flex items-center justify-center h-48 bg-secondary cursor-pointer hover:border-primary transition-colors">
            <span className="text-muted-foreground">Click to upload photos</span>
          </div>
          <button className="w-full bg-primary text-primary-foreground font-bold py-2 px-6 rounded-lg mt-4 transition-colors">
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
}
