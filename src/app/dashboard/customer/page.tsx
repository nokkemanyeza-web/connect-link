import { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Client Portal | Connect Link",
};

export default function CustomerDashboard() {
  return (
    <div className="py-24 container mx-auto px-4 md:px-8">
      <div className="flex justify-between items-center mb-12 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground">Welcome, John Doe</h1>
          <p className="text-muted-foreground mt-2">Client Portal</p>
        </div>
        <Button>New Quote Request</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Active Projects */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-bold font-heading mb-4 border-b border-border pb-4">Active Projects</h2>
            <div className="border border-border rounded-lg p-4 bg-secondary">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-primary">Highland Luxury Estate</h3>
                <span className="text-xs font-semibold px-3 py-1 bg-green-500/20 text-green-500 rounded-full">In Progress</span>
              </div>
              <div className="w-full bg-background rounded-full h-2.5 mb-2">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: "45%" }}></div>
              </div>
              <p className="text-xs text-muted-foreground text-right">45% Completed</p>
            </div>
          </div>

          {/* Invoices */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-bold font-heading mb-4 border-b border-border pb-4">Recent Invoices</h2>
            <p className="text-sm text-muted-foreground">No pending invoices.</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-bold font-heading mb-4 border-b border-border pb-4">Your Team</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-secondary rounded-full"></div>
                <div>
                  <p className="font-semibold text-sm">Sarah Jenkins</p>
                  <p className="text-xs text-muted-foreground">Project Manager</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-bold font-heading mb-4 border-b border-border pb-4">Documents</h2>
            <ul className="text-sm space-y-3">
              <li className="text-primary hover:underline cursor-pointer">Project_Contract.pdf</li>
              <li className="text-primary hover:underline cursor-pointer">Initial_Blueprint.pdf</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
