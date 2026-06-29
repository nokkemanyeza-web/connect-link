"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const steps = [
  "Service Details",
  "Location & Budget",
  "Contact Info",
  "Review & Submit"
];

export default function QuoteWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // Form State
  const [serviceType, setServiceType] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const nextStep = () => setCurrentStep((p) => Math.min(p + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((p) => Math.max(p - 1, 0));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Create user profile conceptually or just store the quote.
      // Since it's a public quote wizard, we might not have a client_id yet if they aren't logged in.
      // We'll store it without client_id for now, or you'd create a lead record.
      // For this demo, let's just use the quotes table but we'll adapt our schema to allow null client_id for leads.

      const { error } = await supabase.from('quotes').insert({
        service_type: serviceType,
        location: location,
        budget_range: budget,
        additional_notes: `Lead: ${firstName} ${lastName}, Email: ${email}, Phone: ${phone}`,
        status: 'pending'
      });

      if (error) throw error;

      toast.success("Quote request submitted successfully! We will contact you soon.");
      setTimeout(() => router.push('/'), 3000);
      
    } catch (err: unknown) {
      toast.error("Failed to submit quote. Ensure Supabase is configured.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24 container mx-auto px-4 md:px-8 min-h-[80vh] flex flex-col items-center">
      <div className="max-w-2xl w-full text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Smart Quotation Wizard</h1>
        <p className="text-muted-foreground">Tell us about your project and we&apos;ll prepare a custom, precise estimate.</p>
      </div>

      <div className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
        {/* Progress Bar */}
        <div className="bg-secondary p-4 border-b border-border flex justify-between items-center relative">
          <div className="absolute left-0 bottom-0 h-1 bg-primary transition-all duration-500" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} />
          {steps.map((step, index) => (
            <div key={index} className={`text-xs font-semibold uppercase tracking-wider ${index <= currentStep ? 'text-primary' : 'text-muted-foreground'}`}>
              Step {index + 1}
            </div>
          ))}
        </div>

        {/* Wizard Body */}
        <div className="p-8 md:p-12 min-h-[400px] relative">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <h2 className="text-2xl font-bold font-heading text-foreground">What service do you need?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["Construction", "Property Development", "Kitchens & Cabinets", "Civil Works"].map((svc) => (
                    <div 
                      key={svc} 
                      onClick={() => setServiceType(svc)}
                      className={`border rounded-xl p-4 cursor-pointer transition-colors text-center font-medium ${serviceType === svc ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/50'}`}
                    >
                      {svc}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <h2 className="text-2xl font-bold font-heading text-foreground">Location & Budget</h2>
                <div className="space-y-4">
                  <div>
                    <Label>Project Location (City, Area)</Label>
                    <Input 
                      placeholder="e.g. Borrowdale, Harare" 
                      className="mt-2"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Estimated Budget (USD)</Label>
                    <select 
                      className="w-full mt-2 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    >
                      <option value="">Select a range...</option>
                      <option value="Less than $10,000">Less than $10,000</option>
                      <option value="$10,000 - $50,000">$10,000 - $50,000</option>
                      <option value="$50,000 - $250,000">$50,000 - $250,000</option>
                      <option value="$250,000+">$250,000+</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <h2 className="text-2xl font-bold font-heading text-foreground">Your Contact Details</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>First Name</Label>
                      <Input placeholder="John" className="mt-2" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div>
                      <Label>Last Name</Label>
                      <Input placeholder="Doe" className="mt-2" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <Label>Email Address</Label>
                    <Input type="email" placeholder="john@example.com" className="mt-2" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input placeholder="+263 77 000 0000" className="mt-2" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 text-center">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                  <span className="text-3xl">✨</span>
                </div>
                <h2 className="text-3xl font-bold font-heading text-foreground">Ready to Submit?</h2>
                <p className="text-muted-foreground">Please review your details. Once submitted, our team will review your requirements and contact you within 24 hours.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Wizard Footer */}
        <div className="bg-secondary/50 p-6 border-t border-border flex justify-between items-center">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 0 || loading}>
            Back
          </Button>
          {currentStep < steps.length - 1 ? (
            <Button onClick={nextStep} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Continue
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={loading} className="bg-primary text-primary-foreground hover:bg-primary/90">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Submitting..." : "Submit Request"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
