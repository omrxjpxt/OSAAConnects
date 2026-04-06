"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/utils";

export default function ContactCTA() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const waLink = whatsappLink(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+910000000000",
    "Hi! I'm interested in OSAA Connects. Can you tell me more?"
  );

  return (
    <section ref={ref} className="section-py bg-gradient-hero" aria-labelledby="contact-cta-heading">
      <div className="container-site">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label mb-4">Get Started</p>
            <h2
              id="contact-cta-heading"
              className="font-playfair font-bold text-charcoal mb-6"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
            >
              Ready to Launch Your Campaign?
            </h2>
            <p className="text-body-lg text-charcoal/60 mb-10 max-w-xl mx-auto">
              Tell us your campaign goal & budget — we&apos;ll share a creator shortlist within{" "}
              <strong className="text-charcoal">48 hours</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact#brand-form" className="btn-primary text-base px-10 py-4 gap-2">
                Work with Creators <ArrowRight size={18} />
              </Link>
              <Link href="/contact#creator-form" className="btn-secondary text-base px-10 py-4">
                Join Our Network
              </Link>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-base flex items-center justify-center gap-2 border border-beige"
              >
                <MessageCircle size={18} className="text-green-500" />
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
