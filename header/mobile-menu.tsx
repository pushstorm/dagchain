"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { List, X } from "@phosphor-icons/react";
import gsap from "gsap";
import { menuLinks } from "./header";
import { StepperForm } from "@/components/stepper-form";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Drawer refs
  const overlayRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  // Form modal refs
  const formOverlayRef = useRef<HTMLDivElement>(null);
  const formPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Drawer open animation
  useEffect(() => {
    if (!open) return;
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: "power2.out" },
    );
    gsap.fromTo(
      drawerRef.current,
      { x: "100%" },
      { x: "0%", duration: 0.38, ease: "power3.out" },
    );
    const links = linksRef.current?.children;
    if (links) {
      gsap.set(links, { y: 14, opacity: 0, willChange: "transform, opacity" });
      gsap.to(links, {
        y: 0,
        opacity: 1,
        duration: 0.45,
        ease: "power3.out",
        stagger: 0.07,
        delay: 0.2,
        clearProps: "willChange",
      });
    }
  }, [open]);

  const closeMenu = (onComplete?: () => void) => {
    gsap.to(drawerRef.current, {
      x: "100%",
      duration: 0.28,
      ease: "power2.in",
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setOpen(false);
        onComplete?.();
      },
    });
  };

  // Form modal open animation
  useEffect(() => {
    if (!formOpen) return;
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
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!formOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeForm();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [formOpen, closeForm]);

  const handleSecureSpot = () => {
    closeMenu(() => {
      document.body.style.overflow = "hidden";
      setFormOpen(true);
    });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-neutral-700 hover:bg-gray-100 transition-colors"
        aria-label="Open menu"
      >
        <List size={22} weight="bold" />
      </button>

      {/* Drawer */}
      {mounted &&
        open &&
        createPortal(
          <>
            <div
              ref={overlayRef}
              onClick={() => closeMenu()}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 9998,
                background: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(4px)",
              }}
            />
            <div
              ref={drawerRef}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: "288px",
                zIndex: 9999,
                display: "flex",
                flexDirection: "column",
                background: "white",
                borderLeft: "1px solid transparent",
                backgroundImage:
                  "linear-gradient(white, white), linear-gradient(to bottom, var(--color-1), var(--color-3), var(--color-2))",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
              }}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <span
                  className="text-sm font-semibold"
                  style={{
                    background:
                      "linear-gradient(to right, var(--color-1), var(--color-2))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  DagChain
                </span>
                <button
                  onClick={() => closeMenu()}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-500 hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={18} weight="bold" />
                </button>
              </div>
              <div ref={linksRef} className="flex flex-col gap-1 p-4 flex-1">
                {menuLinks.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => closeMenu()}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-neutral-700"
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "linear-gradient(to right, var(--color-1), var(--color-3), var(--color-2))";
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "white";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "";
                      (e.currentTarget as HTMLButtonElement).style.color = "";
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="p-4 border-t border-gray-100">
                <button
                  onClick={handleSecureSpot}
                  className="w-full py-3 rounded-xl text-sm font-semibold text-white"
                  style={{
                    background:
                      "linear-gradient(to right, var(--color-1), var(--color-3), var(--color-2))",
                  }}
                >
                  Secure Your Spot
                </button>
              </div>
            </div>
          </>,
          document.body,
        )}

      {/* Form modal — same pattern as CTASection */}
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

export default MobileMenu;
