"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Send, Loader2, Upload, CheckCircle } from "lucide-react";
import { trackEvent } from "@/lib/utils";
import type { CreatorFormData } from "@/types";

const NICHES = [
  "Fashion", "Tech", "Fitness", "Beauty", "Food", "Travel",
  "AI", "Finance", "Gaming", "Music", "Lifestyle", "Education",
];

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  igHandle: z.string().min(1, "Instagram handle is required").regex(/^[a-zA-Z0-9_.]+$/, "Invalid handle format"),
  igLink: z.string().url("Enter a valid Instagram URL"),
  followers: z.coerce.number().min(1000, "Must have at least 1,000 followers"),
  avgReelViews: z.coerce.number().min(100, "Required"),
  niche: z.string().min(1, "Select a niche"),
  sampleRate: z.string().min(1, "Enter your sample rate"),
  country: z.string().min(2, "Required"),
  phone: z.string().min(7, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email address"),
  consent: z.literal(true, { errorMap: () => ({ message: "You must accept the terms" }) }),
  honeypot: z.string().max(0, "").optional(),
});

type FormValues = z.infer<typeof schema>;

export default function CreatorForm() {
  const [submitted, setSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    if (data.honeypot) return; // bot detected
    try {
      const payload: CreatorFormData = {
        ...data,
        mediaUrl: mediaUrl ?? undefined,
      };
      const res = await fetch("/api/submit-creator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
      trackEvent("lead_form_submitted", { source: "creator" });
      toast.success("Application submitted! We'll be in touch within 48 hours.");
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
          Application Received!
        </h3>
        <p className="text-charcoal/60 text-body-md max-w-sm mx-auto">
          We&apos;ll review your profile and reach out within <strong>48 hours</strong>.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      aria-label="Creator application form"
      noValidate
    >
      {/* Honeypot (hidden) */}
      <input {...register("honeypot")} className="hidden" tabIndex={-1} aria-hidden />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Full Name" error={errors.name?.message} required>
          <input {...register("name")} className="input-field" placeholder="Priya Sharma" />
        </Field>
        <Field label="IG Handle" error={errors.igHandle?.message} required>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">@</span>
            <input {...register("igHandle")} className="input-field pl-8" placeholder="priyasharma" />
          </div>
        </Field>
      </div>

      <Field label="Instagram Profile Link" error={errors.igLink?.message} required>
        <input {...register("igLink")} className="input-field" placeholder="https://www.instagram.com/handle" type="url" />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Follower Count" error={errors.followers?.message} required>
          <input {...register("followers")} className="input-field" placeholder="25000" type="number" min={0} />
        </Field>
        <Field label="Avg Reel Views" error={errors.avgReelViews?.message} required>
          <input {...register("avgReelViews")} className="input-field" placeholder="8000" type="number" min={0} />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Primary Niche" error={errors.niche?.message} required>
          <select {...register("niche")} className="input-field">
            <option value="">Select niche…</option>
            {NICHES.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </Field>
        <Field label="Sample Rate (e.g. ₹10,000 / reel)" error={errors.sampleRate?.message} required>
          <input {...register("sampleRate")} className="input-field" placeholder="₹10,000 / reel" />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Country" error={errors.country?.message} required>
          <input {...register("country")} className="input-field" placeholder="India" />
        </Field>
        <Field label="Phone" error={errors.phone?.message} required>
          <input {...register("phone")} className="input-field" placeholder="+91 98765 43210" type="tel" />
        </Field>
      </div>

      <Field label="Email Address" error={errors.email?.message} required>
        <input {...register("email")} className="input-field" placeholder="you@example.com" type="email" />
      </Field>

      {/* Media upload placeholder */}
      <div>
        <label className="text-label text-charcoal mb-1.5 block">
          Sample Media <span className="text-muted font-normal">(optional, max 250MB)</span>
        </label>
        <div className="border-2 border-dashed border-beige rounded-xl p-6 text-center hover:border-gold transition-colors">
          <Upload size={24} className="text-muted mx-auto mb-2" />
          <p className="text-body-sm text-muted">
            Drag & drop your best reel or post, or{" "}
            <button type="button" className="text-gold font-medium hover:underline">
              browse
            </button>
          </p>
          <p className="text-xs text-muted mt-1">MP4, MOV, JPG, PNG up to 250MB</p>
        </div>
      </div>

      {/* Consent */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            {...register("consent")}
            type="checkbox"
            className="mt-1 w-4 h-4 accent-gold rounded"
          />
          <span className="text-body-sm text-charcoal/70">
            I agree to the{" "}
            <a href="/terms" className="text-gold hover:underline" target="_blank">Terms of Service</a>
            {" "}and{" "}
            <a href="/privacy" className="text-gold hover:underline" target="_blank">Privacy Policy</a>
            . I consent to OSAA Connects storing and using my data to match me with brand campaigns.
          </span>
        </label>
        {errors.consent && (
          <p className="text-red-500 text-body-sm mt-1">{errors.consent.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || uploading}
        className="btn-primary w-full py-3.5 text-base gap-2 disabled:opacity-60"
      >
        {isSubmitting ? (
          <><Loader2 size={18} className="animate-spin" /> Submitting…</>
        ) : (
          <><Send size={18} /> Apply to Join Creators</>
        )}
      </button>
    </form>
  );
}

// ─── Field wrapper ─────────────────────────────────────────────────────────────
function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
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
