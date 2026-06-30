"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "@phosphor-icons/react";
import { StepperForm } from "@/components/stepper-form";

gsap.registerPlugin(ScrollTrigger);

function RevealLine({
  children,
  delay = 0,
  triggerRef,
}: {
  children: React.ReactNode;
  delay?: number;
  triggerRef: React.RefObject<Element | null>;
}) {
  const innerRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!innerRef.current || !triggerRef.current) return;
    gsap.set(innerRef.current, { y: "108%" });
    const st = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top 86%",
      once: true,
      onEnter: () => {
        gsap.to(innerRef.current, {
          y: "0%",
          duration: 0.78,
          ease: "power3.out",
          delay,
        });
      },
    });
    return () => st.kill();
  }, [delay, triggerRef]);
  return (
    <span style={{ display: "block", overflow: "hidden" }}>
      <span ref={innerRef} style={{ display: "block" }}>
        {children}
      </span>
    </span>
  );
}

export default function CTASection() {
  const [modalOpen, setModalOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const btn1Ref = useRef<HTMLButtonElement>(null);
  const btn2Ref = useRef<HTMLAnchorElement>(null);

  const openModal = () => {
    document.body.style.overflow = "hidden";
    setModalOpen(true);
    requestAnimationFrame(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" },
      );
      gsap.fromTo(
        panelRef.current,
        { y: 32, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" },
      );
    });
  };

  const closeModal = useCallback(() => {
    gsap.to(panelRef.current, {
      y: 24,
      opacity: 0,
      scale: 0.97,
      duration: 0.22,
      ease: "power2.in",
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.28,
      ease: "power2.in",
      onComplete: () => {
        document.body.style.overflow = "";
        setModalOpen(false);
      },
    });
  }, []);

  // Restore scroll if component unmounts while modal is open
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, closeModal]);

  useEffect(() => {
    const iv = (el: Element | null) => ({
      trigger: el,
      start: "top 88%",
      once: true,
    });

    gsap.set(pillRef.current, { scale: 0.85, opacity: 0 });
    gsap.to(pillRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.55,
      ease: "back.out(1.7)",
      scrollTrigger: iv(pillRef.current),
    });

    gsap.set(paraRef.current, { y: 16, opacity: 0 });
    gsap.to(paraRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
      delay: 0.25,
      scrollTrigger: iv(paraRef.current),
    });

    gsap.set([btn1Ref.current, btn2Ref.current], { y: 18, opacity: 0 });
    gsap.to([btn1Ref.current, btn2Ref.current], {
      y: 0,
      opacity: 1,
      duration: 0.55,
      ease: "power3.out",
      stagger: 0.1,
      delay: 0.35,
      scrollTrigger: iv(btn1Ref.current),
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <>
      <section ref={sectionRef} className="relative">
        <div
          className="relative py-24 flex flex-col items-center gap-7 text-center overflow-hidden"
          style={{ background: "#f5f3ff" }}
        >
          {/* Grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          {/* Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              width: "600px",
              height: "400px",
              background:
                "radial-gradient(ellipse, rgba(167,139,250,0.15) 0%, transparent 70%)",
            }}
          />

          {/* Pill */}
          <div
            ref={pillRef}
            className="relative inline-flex items-center gap-3 px-5 py-2 rounded-full text-[11px] font-semibold tracking-[0.14em] uppercase"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "white",
              boxShadow: "0 4px 24px rgba(99,102,241,0.35)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
            Late August 2025
            <span style={{ color: "rgba(255,255,255,0.4)" }}>·</span>
            Save the Date
          </div>

          {/* Headline */}
          <div ref={headingRef} className="relative flex flex-col gap-3">
            <h2
              className="font-nasalization font-medium tracking-tight"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
                lineHeight: 1.1,
                color: "#1e1b4b",
              }}
            >
              <RevealLine delay={0.05} triggerRef={headingRef}>
                The Future of Finance
              </RevealLine>
              <RevealLine delay={0.15} triggerRef={headingRef}>
                <span style={{ color: "#6366f1" }}>Starts Here.</span>
              </RevealLine>
            </h2>
            <p
              ref={paraRef}
              className="text-[14px] max-w-md mx-auto leading-relaxed"
              style={{ color: "#6b7280" }}
            >
              Join thousands of builders, investors, and innovators at the
              DagChain Summit — Late August 2025.
            </p>
          </div>

          {/* Buttons */}
          <div className="relative flex flex-col sm:flex-row items-center gap-3">
            <button
              ref={btn1Ref}
              onClick={openModal}
              className="px-7 py-3.5 rounded-xl text-[13px] font-semibold text-white transition-all duration-200 hover:opacity-85"
              style={{ background: "#6366f1", minWidth: "190px" }}
            >
              Secure Your Spot
            </button>
            <Link
              ref={btn2Ref}
              href="#"
              className="px-7 py-3.5 rounded-xl text-[13px] font-medium transition-all duration-200 hover:bg-indigo-50"
              style={{
                border: "1px solid rgba(99,102,241,0.25)",
                color: "#6366f1",
                minWidth: "190px",
                textAlign: "center",
              }}
            >
              Explore DAGChain
            </Link>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[999] flex items-center justify-center px-4"
          style={{
            background: "rgba(15,10,40,0.55)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            ref={panelRef}
            className="relative w-full max-w-md rounded-3xl overflow-hidden"
            style={{
              background: "#fff",
              boxShadow: "0 24px 80px rgba(99,102,241,0.2)",
              border: "1px solid #ede9fe",
              maxHeight: "90vh",
            }}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              style={{ color: "#9ca3af" }}
            >
              <X size={16} weight="bold" />
            </button>
            <StepperForm onClose={closeModal} />
          </div>
        </div>
      )}
    </>
  );
}
