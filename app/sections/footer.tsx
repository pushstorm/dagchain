"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  XLogoIcon,
  TelegramLogoIcon,
  LinkedinLogoIcon,
  GlobeIcon,
  CircleIcon,
  ArrowRightIcon,
  X,
} from "@phosphor-icons/react";
import Logo from "@/logo/logo";
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
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(innerRef.current, {
          y: "0%",
          duration: 0.82,
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

const SOCIALS = [
  {
    icon: <XLogoIcon size={18} />,
    label: "/DAGCHAIN",
    href: "#",
  },
  {
    icon: <TelegramLogoIcon size={18} />,
    label: "T.ME/DAGCHAIN",
    href: "#",
  },
  {
    icon: <LinkedinLogoIcon size={18} />,
    label: "/DAGCHAIN",
    href: "#",
  },
  {
    icon: <GlobeIcon size={18} />,
    label: ".Network",
    href: "#",
  },
];

const LEGAL = [
  { label: "Overview", href: "#" },
  { label: "Why Join Dag Chain", href: "#" },
  { label: "Be a Part of the Ecosystem", href: "#" },
];

export default function Footer() {
  const [formOpen, setFormOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const formOverlayRef = useRef<HTMLDivElement>(null);
  const formPanelRef = useRef<HTMLDivElement>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const socialsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const legalRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!formOpen) return;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => {
      gsap.fromTo(
        formOverlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" },
      );
      gsap.fromTo(
        formPanelRef.current,
        { y: 32, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" },
      );
    });
  }, [formOpen]);

  const closeForm = useCallback(() => {
    gsap.to(formPanelRef.current, {
      y: 24,
      opacity: 0,
      scale: 0.97,
      duration: 0.22,
      ease: "power2.in",
    });
    gsap.to(formOverlayRef.current, {
      opacity: 0,
      duration: 0.28,
      ease: "power2.in",
      onComplete: () => {
        document.body.style.overflow = "";
        setFormOpen(false);
      },
    });
  }, []);

  useEffect(() => {
    if (!formOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeForm();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [formOpen, closeForm]);

  useEffect(() => {
    const iv = (el: Element | null) => ({
      trigger: el,
      start: "top 90%",
      once: true,
    });

    gsap.set(socialsRef.current.filter(Boolean), { y: 16, opacity: 0 });
    gsap.to(socialsRef.current.filter(Boolean), {
      y: 0,
      opacity: 1,
      duration: 0.55,
      ease: "power3.out",
      stagger: 0.08,
      scrollTrigger: iv(socialsRef.current[0]),
    });

    gsap.set(legalRef.current, { opacity: 0 });
    gsap.to(legalRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power3.out",
      delay: 0.2,
      scrollTrigger: {
        trigger: legalRef.current,
        start: "top bottom", // ← fires the moment it enters the viewport
        once: true,
      },
    });
    gsap.set(logoRef.current, { opacity: 0 });
    gsap.to(logoRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: iv(logoRef.current),
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <>
      <footer className="bg-black border-t border-white/10">
        {/* Statement */}
        <div className="bg-linear-to-br from-color-1 via-color-3">
          <div className="container py-16">
            <h2
              ref={headingRef}
              className="text-4xl lg:text-5xl tracking-tight font-nasalization text-white"
            >
              <RevealLine delay={0} triggerRef={headingRef}>
                The Infrastructure Behind the{" "}
              </RevealLine>
              <RevealLine delay={0.12} triggerRef={headingRef}>
                <span className="text-violet-950">AI Economy.</span>
              </RevealLine>
            </h2>
          </div>
        </div>

        {/* Middle */}
        <div className="border-t  border-white/10 bg-[#0f0b22]">
          <div className=" flex container py-10 flex-col md:flex-row items-start justify-between gap-10">
            <div ref={logoRef}>
              <Logo light className="w-44" />
            </div>

            <div className="">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {SOCIALS.map(({ icon, label, href }, id) => (
                  <Link
                    key={id}
                    href={href}
                    ref={(el) => {
                      socialsRef.current[id] = el;
                    }}
                    className="flex w-full lg:w-14 lg:aspect-square gap-2 lg:gap-0  items-center justify-center hover:opacity-70 transition-opacity duration-200"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      color: "white",
                      borderRadius: "14px",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {icon}
                    <span className="block lg:hidden text-sm">{label}</span>
                  </Link>
                ))}
              </div>

              <button
                onClick={() => setFormOpen(true)}
                className="flex w-full justify-center py-2.5 mt-3 rounded-full text-sm bg-linear-to-r from-color-1 via-color-3 to-color-2 hover:bg-color-1/50 text-white cursor-pointer items-center gap-2 transition-colors"
              >
                Secure your spot <ArrowRightIcon className="size-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Legal bar */}
        <div className=" border-t border-white/10">
          <div
            ref={legalRef}
            className="px-8 sm:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
          >
            <div className="flex flex-wrap items-center gap-6">
              {LEGAL.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-[12px] text-white/30 flex items-center gap-2 transition-colors duration-150 hover:text-white/60"
                >
                  <CircleIcon
                    weight="fill"
                    className="bg-white/30 stroke-white/30 size-2 rounded-full"
                  />
                  {label}
                </Link>
              ))}
            </div>
            <div className="lg:border-t-0 border-t border-gray-300/60 pt-2 w-full">
              <p className="text-[12px]   text-white/30 text-center">
                DagChain Summit 2026 · All rights reserved
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Form modal */}
      {mounted &&
        formOpen &&
        createPortal(
          <div
            ref={formOverlayRef}
            className="fixed inset-0 flex items-center justify-center px-4"
            style={{
              zIndex: 10000,
              background: "rgba(15,10,40,0.55)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeForm();
            }}
          >
            <div
              ref={formPanelRef}
              className="relative w-full max-w-md rounded-3xl overflow-hidden"
              style={{
                background: "#fff",
                boxShadow: "0 24px 80px rgba(99,102,241,0.2)",
                border: "1px solid #ede9fe",
                maxHeight: "90vh",
              }}
            >
              <button
                onClick={closeForm}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                style={{ color: "#9ca3af" }}
              >
                <X size={16} weight="bold" />
              </button>
              <StepperForm onClose={closeForm} />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
