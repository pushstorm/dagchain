"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { X } from "@phosphor-icons/react";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  yearsExp: string;
  primaryActivity: string;
};

const ACTIVITIES = [
  "DeFi / Trading",
  "NFT / Digital Assets",
  "Smart Contract Development",
  "Infrastructure / Nodes",
  "DAO / Governance",
  "AI + Blockchain",
  "Investing / VC",
  "Other",
];

const EXP_OPTIONS = [
  "< 1 year",
  "1–2 years",
  "3–5 years",
  "5–10 years",
  "10+ years",
];

function Field({
  label,
  placeholder,
  value,
  onChange,
  error,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-gray-500 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 py-3 rounded-xl text-[14px] text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-300"
        style={{
          background: "#fafafa",
          border: error
            ? "1px solid #fca5a5"
            : focused
              ? "1px solid #6366f1"
              : "1px solid #e5e7eb",
          boxShadow:
            focused && !error ? "0 0 0 3px rgba(99,102,241,0.08)" : "none",
        }}
      />
      {error && <p className="text-[11px] text-red-400 mt-1">{error}</p>}
    </div>
  );
}

function StepperForm({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    yearsExp: "",
    primaryActivity: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const slideRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      slideRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
    );
  }, []);

  useEffect(() => {
    gsap.to(progressRef.current, {
      width: `${((step + 1) / 2) * 100}%`,
      duration: 0.45,
      ease: "power2.out",
    });
  }, [step]);

  const animateStep = (dir: 1 | -1, cb: () => void) => {
    gsap.to(slideRef.current, {
      x: dir * -32,
      opacity: 0,
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => {
        cb();
        gsap.fromTo(
          slideRef.current,
          { x: dir * 32, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.32, ease: "power3.out" },
        );
      },
    });
  };

  const set = (field: keyof FormData, val: string) => {
    setForm((f) => ({ ...f, [field]: val }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const handleNext = () => {
    const e: Partial<FormData> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Required";
    if (Object.keys(e).length) return setErrors(e);
    animateStep(1, () => setStep(1));
  };

  const handleBack = () => animateStep(-1, () => setStep(0));

  const handleSubmit = () => {
    const e: Partial<FormData> = {};
    if (!form.yearsExp) e.yearsExp = "Select one";
    if (!form.primaryActivity) e.primaryActivity = "Select one";
    if (Object.keys(e).length) return setErrors(e);
    gsap.to(slideRef.current, {
      y: -12,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setSubmitted(true);
        gsap.fromTo(
          slideRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
        );
      },
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Progress bar */}
      {!submitted && (
        <div style={{ background: "#ede9fe", height: "3px", flexShrink: 0 }}>
          <div
            ref={progressRef}
            style={{
              height: "3px",
              background: "linear-gradient(to right, #6366f1, #8b5cf6)",
              width: "50%",
              borderRadius: "0 2px 2px 0",
              transition: "none",
            }}
          />
        </div>
      )}

      <div className="px-7 py-7 flex flex-col flex-1 overflow-y-auto">
        {/* Step dots */}
        {!submitted && (
          <div className="flex items-center gap-3 mb-7">
            {[0, 1].map((s) => (
              <div key={s} className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300"
                  style={{
                    background: step >= s ? "#6366f1" : "#f5f3ff",
                    color: step >= s ? "#fff" : "#9ca3af",
                    border: step >= s ? "none" : "1px solid #e5e7eb",
                  }}
                >
                  {step > s ? "✓" : s + 1}
                </div>
                {s < 1 && (
                  <div
                    className="h-px w-8 transition-all duration-500"
                    style={{ background: step > 0 ? "#6366f1" : "#e5e7eb" }}
                  />
                )}
              </div>
            ))}
            <span className="ml-1 text-[11px] text-gray-400 font-medium">
              Step {step + 1} of 2
            </span>
          </div>
        )}

        <div ref={slideRef} className="flex-1">
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-10">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-5 text-xl"
                style={{
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  color: "#22c55e",
                }}
              >
                ✓
              </div>
              <h3 className="text-xl font-nasalization font-semibold text-gray-900 mb-2">
                You're in!
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                Thanks{" "}
                <span className="text-gray-700 font-medium">
                  {form.firstName}
                </span>
                . We'll reach out at{" "}
                <span className="text-indigo-500">{form.email}</span>.
              </p>
              <button
                onClick={onClose}
                className="mt-8 px-6 py-2.5 rounded-xl text-[13px] font-semibold text-white"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                }}
              >
                Close
              </button>
            </div>
          ) : step === 0 ? (
            <div>
              <h3 className="text-lg font-nasalization font-semibold text-gray-900 mb-1">
                Tell us about you
              </h3>
              <p className="text-sm text-gray-400 mb-6">
                Basic info to get you registered.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <Field
                  label="First Name"
                  placeholder="Rahil"
                  value={form.firstName}
                  onChange={(v) => set("firstName", v)}
                  error={errors.firstName}
                />
                <Field
                  label="Last Name"
                  placeholder="Khan"
                  value={form.lastName}
                  onChange={(v) => set("lastName", v)}
                  error={errors.lastName}
                />
              </div>
              <div className="mb-3">
                <Field
                  label="Work Email"
                  placeholder="rahil@company.com"
                  type="email"
                  value={form.email}
                  onChange={(v) => set("email", v)}
                  error={errors.email}
                />
              </div>
              <div className="mb-7">
                <Field
                  label="Phone Number"
                  placeholder="+1 (555) 000-0000"
                  type="tel"
                  value={form.phone}
                  onChange={(v) => set("phone", v)}
                  error={errors.phone}
                />
              </div>

              <button
                onClick={handleNext}
                className="w-full py-3.5 rounded-xl text-[13px] font-semibold text-white hover:opacity-90 transition-opacity"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                }}
              >
                Continue →
              </button>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-nasalization font-semibold text-gray-900 mb-1">
                Your blockchain background
              </h3>
              <p className="text-sm text-gray-400 mb-6">
                Help us understand where you're coming from.
              </p>

              <div className="mb-5">
                <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-gray-500 mb-2.5">
                  Years of experience in blockchain
                </label>
                <div className="flex flex-wrap gap-2">
                  {EXP_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => set("yearsExp", opt)}
                      className="px-3.5 py-2 rounded-lg text-[12px] font-medium transition-all duration-150"
                      style={{
                        background:
                          form.yearsExp === opt ? "#6366f1" : "#f5f3ff",
                        color: form.yearsExp === opt ? "#fff" : "#6b7280",
                        border:
                          form.yearsExp === opt
                            ? "1px solid #6366f1"
                            : "1px solid #ede9fe",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {errors.yearsExp && (
                  <p className="text-[11px] text-red-400 mt-1.5">
                    {errors.yearsExp}
                  </p>
                )}
              </div>

              <div className="mb-7">
                <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-gray-500 mb-2.5">
                  Primary blockchain activity
                </label>
                <div className="flex flex-wrap gap-2">
                  {ACTIVITIES.map((act) => (
                    <button
                      key={act}
                      onClick={() => set("primaryActivity", act)}
                      className="px-3.5 py-2 rounded-lg text-[12px] font-medium transition-all duration-150"
                      style={{
                        background:
                          form.primaryActivity === act ? "#6366f1" : "#f5f3ff",
                        color:
                          form.primaryActivity === act ? "#fff" : "#6b7280",
                        border:
                          form.primaryActivity === act
                            ? "1px solid #6366f1"
                            : "1px solid #ede9fe",
                      }}
                    >
                      {act}
                    </button>
                  ))}
                </div>
                {errors.primaryActivity && (
                  <p className="text-[11px] text-red-400 mt-1.5">
                    {errors.primaryActivity}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleBack}
                  className="px-5 py-3.5 rounded-xl text-[13px] font-medium transition-all hover:bg-indigo-50"
                  style={{ border: "1px solid #ede9fe", color: "#6366f1" }}
                >
                  ← Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-3.5 rounded-xl text-[13px] font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  }}
                >
                  Submit Application
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Modal wrapper ────────────────────────────────────────────────────────────
export default function FormModal() {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = useCallback(() => {
    gsap.to(panelRef.current, {
      y: 24,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => setOpen(false),
    });
  }, []);

  // Animate in when opened
  useEffect(() => {
    if (!open) return;
    // slight delay so refs attach
    requestAnimationFrame(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" },
      );
      gsap.fromTo(
        panelRef.current,
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
      );
    });
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeModal]);

  return (
    <>
      {/* Modal */}
      {open && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{
            background: "rgba(15,10,40,0.55)",
            backdropFilter: "blur(6px)",
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
              boxShadow: "0 24px 80px rgba(99,102,241,0.18)",
              border: "1px solid #ede9fe",
              maxHeight: "90vh",
            }}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
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
