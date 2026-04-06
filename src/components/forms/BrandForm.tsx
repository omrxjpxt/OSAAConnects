"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { trackEvent } from "@/lib/utils";
import type { BrandFormData } from "@/types";

const BUDGETS = ["< ₹50K", "₹50K–₹2L", "₹2L–₹10L", "₹10L+", "Let's discuss"];
const TIMELINES = ["ASAP (< 2 weeks)", "1 month", "2–3 months", "Ongoing"];

const schema = z.object({
  brandName: z.string().min(2, "Brand name required"),
  website: z.string().url("Enter a valid website URL"),
  brief: z.string().min(30, "Please provide at least 30 characters").max(2000),
  targetAudience: z.string().min(5, "Describe your target audience"),
  budget: z.string().min(1, "Select a budget range"),
  timeline: z.string().min(1, "Select a timeline"),
  contactName: z.string().min(2, "Your name is required"),
  contactEmail: z.string().email("Enter a valid email"),
  contactPhone: z.string().optional(),
  honeypot: z.string().max(0, "").optional(),
});

type FormValues = z.infer<typeof schema>;

export default function BrandForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const briefLength = watch("brief")?.length ?? 0;

  const onSubmit = async (data: FormValues) => {
    if (data.honeypot) return;
    try {
      const payload: BrandFormData = { ...data };
      const res = await fetch("/api/submit-brand", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      trackEvent("lead_form_submitted", { source: "brand" });
      toast.success("Brief received! We'll send a creator shortlist within 48 hours.");
      reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <CheckCircle size={56} className="text-gold mx-auto mb-4" />
        <h3 className="font-playfair font-bold text-charcoal text-2xl mb-2">
          Brief Received!
        </h3>
        <p className="text-charcoal/60 text-body-md max-w-sm mx-auto">
          Our team will send you a tailored creator shortlist within{" "}
          <strong>48 hours</strong>.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" aria-label="Brand inquiry form" noValidate>
      <input {...register("honeypot")} className="hidden" tabIndex={-1} aria-hidden />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Brand Name" error={errors.brandName?.message} required>
          <input {...register("brandName")} className="input-field" placeholder="Acme Corp" />
        </Field>
        <Field label="Website" error={errors.website?.message} required>
          <input {...register("website")} className="input-field" placeholder="https://acmecorp.com" type="url" />
        </Field>
      </div>

      <Field label="Campaign Brief" error={errors.brief?.message} required>
        <textarea
          {...register("brief")}
          className="input-field min-h-[120px] resize-y"
          placeholder="Describe your product, campaign goal, key message, and any requirements…"
          rows={5}
        />
        <p className="text-xs text-muted mt-1 text-right">{briefLength}/2000</p>
      </Field>

      <Field label="Target Audience" error={errors.targetAudience?.message} required>
        <input
          {...register("targetAudience")}
          className="input-field"
          placeholder="e.g. Women 18–35 interested in sustainable fashion"
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Budget Range" error={errors.budget?.message} required>
          <select {...register("budget")} className="input-field">
            <option value="">Select budget…</option>
            {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </Field>
        <Field label="Timeline" error={errors.timeline?.message} required>
          <select {...register("timeline")} className="input-field">
            <option value="">Select timeline…</option>
            {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
      </div>

      {/* Contact */}
      <div className="pt-2 border-t border-beige">
        <p className="text-label text-muted mb-4">Your Contact Details</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Your Name" error={errors.contactName?.message} required>
            <input {...register("contactName")} className="input-field" placeholder="Rahul Mehta" />
          </Field>
          <Field label="Work Email" error={errors.contactEmail?.message} required>
            <input {...register("contactEmail")} className="input-field" placeholder="rahul@acmecorp.com" type="email" />
          </Field>
          <Field label="Phone (optional)" error={errors.contactPhone?.message}>
            <input {...register("contactPhone")} className="input-field" placeholder="+91 98765 43210" type="tel" />
          </Field>
        </div>
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3.5 text-base gap-2 disabled:opacity-60">
        {isSubmitting ? (
          <><Loader2 size={18} className="animate-spin" /> Submitting…</>
        ) : (
          <><Send size={18} /> Send Campaign Brief</>
        )}
      </button>

      <p className="text-xs text-muted text-center">
        By submitting you agree to our{" "}
        <a href="/privacy" className="text-gold hover:underline">Privacy Policy</a>.
        We&apos;ll respond within 48 hours.
      </p>
    </form>
  );
}

function Field({
  label, error, required, children,
}: {
  label: string; error?: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-label text-charcoal mb-1.5 block">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-body-sm mt-1">{error}</p>}
    </div>
  );
}
