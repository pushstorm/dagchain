"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { X } from "@phosphor-icons/react";
import gsap from "gsap";
import Logo from "@/logo/logo";
import Menu from "./menu";
import MobileMenu from "./mobile-menu";
import { StepperForm } from "@/components/stepper-form";

export const menuLinks = [
  { label: "Overview", link: "#hero" },
  { label: "Why Join Dag Chain", link: "#join-dag" },
  { label: "Be a Part of the Ecosystem", link: "#ecosystem" },
];

const Header = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const formOverlayRef = useRef<HTMLDivElement>(null);
  const formPanelRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      <header className="py-2 sticky top-0 z-999 bg-white/80 backdrop-blur-xl">
        <div className="container flex justify-between items-center">
          <Logo className="w-36" />
          <Menu />

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <button
              onClick={() => setFormOpen(true)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-85"
              style={{
                background:
                  "linear-gradient(to right, var(--color-1), var(--color-3), var(--color-2))",
              }}
            >
              Secure Your Spot
            </button>
          </div>

          <MobileMenu />
        </div>
      </header>

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
};

export default Header;
