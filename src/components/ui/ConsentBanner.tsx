"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import Link from "next/link";

const CONSENT_KEY = "osaa-cookie-consent";

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      setTimeout(() => setVisible(true), 1500);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
    // Trigger analytics load
    window.dispatchEvent(new Event("consent-accepted"));
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
          role="dialog"
          aria-label="Cookie consent"
          aria-modal="true"
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50"
        >
          <div className="bg-charcoal text-cream rounded-2xl p-5 shadow-modal border border-cream/10">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Cookie size={18} className="text-gold flex-shrink-0" />
                <p className="font-semibold text-body-sm">Cookie Preferences</p>
              </div>
              <button
                onClick={decline}
                aria-label="Dismiss cookie banner"
                className="text-cream/50 hover:text-cream transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-body-sm text-cream/60 leading-relaxed mb-4">
              We use cookies for analytics and personalisation. See our{" "}
              <Link href="/privacy" className="text-gold hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
            <div className="flex gap-2">
              <button onClick={accept} className="btn-primary flex-1 text-sm py-2">
                Accept All
              </button>
              <button
                onClick={decline}
                className="flex-1 py-2 px-4 rounded-full border border-cream/20 text-body-sm text-cream/70 hover:border-cream/50 transition-colors"
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
