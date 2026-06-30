"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckIcon,
} from "@phosphor-icons/react";
import { FormField } from "./form-field";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  yearsExp: string;
  primaryActivity: string;
};

const EXP_OPTIONS = [
  "< 1 year",
  "1–2 years",
  "3–5 years",
  "5–10 years",
  "10+ years",
];
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

export function StepperForm({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    yearsExp: "",
    primaryActivity: "",
  });

  const slideRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    gsap.fromTo(
      slideRef.current,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
    );
  }, []);

  useEffect(() => {
    gsap.to(progressRef.current, {
      width: `${((step + 1) / 2) * 100}%`,
      duration: 0.5,
      ease: "power2.out",
    });
  }, [step]);

  const set = (field: keyof FormData, val: string) => {
    setForm((f) => ({ ...f, [field]: val }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const animateStep = (dir: 1 | -1, cb: () => void) => {
    gsap.to(slideRef.current, {
      x: dir * -36,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        cb();
        gsap.fromTo(
          slideRef.current,
          { x: dir * 36, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3, ease: "power3.out" },
        );
      },
    });
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

  const handleSubmit = () => {
    const e: Partial<FormData> = {};
    if (!form.yearsExp) e.yearsExp = "Select one";
    if (!form.primaryActivity) e.primaryActivity = "Select one";
    if (Object.keys(e).length) return setErrors(e);
    gsap.to(slideRef.current, {
      y: -10,
      opacity: 0,
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => {
        setSubmitted(true);
        gsap.fromTo(
          slideRef.current,
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" },
        );
      },
    });
  };

  const PillBtn = ({
    val,
    selected,
    field,
  }: {
    val: string;
    selected: string;
    field: keyof FormData;
  }) => {
    const on = selected === val;
    return (
      <button
        onClick={() => set(field, val)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150"
        style={{
          background: on ? "#6366f1" : "#fff",
          color: on ? "#fff" : "#374151",
          border: on ? "1.5px solid #6366f1" : "1.5px solid #e5e7eb",
          boxShadow: on ? "0 2px 8px rgba(99,102,241,0.2)" : "none",
        }}
      >
        {on && <CheckIcon size={10} weight="bold" />}
        {val}
      </button>
    );
  };

  if (submitted) {
    return (
      <div
        ref={slideRef}
        className="px-8 py-10 flex flex-col items-center text-center"
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
          style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            boxShadow: "0 8px 24px rgba(99,102,241,0.28)",
          }}
        >
          <CheckIcon size={26} weight="bold" color="#fff" />
        </div>
        <h3 className="text-[18px] font-nasalization font-semibold text-gray-900 mb-1">
          You're registered!
        </h3>
        <p className="text-[13px] text-gray-400 mb-6">
          We'll reach out to{" "}
          <span className="text-indigo-500 font-medium">{form.email}</span>
        </p>

        <div
          className="w-full rounded-2xl overflow-hidden mb-6"
          style={{ border: "1px solid #e5e7eb" }}
        >
          {[
            { label: "Name", value: `${form.firstName} ${form.lastName}` },
            { label: "Experience", value: form.yearsExp },
            { label: "Focus", value: form.primaryActivity },
          ].map(({ label, value }, i, arr) => (
            <div
              key={label}
              className="flex items-center justify-between px-4 py-3"
              style={{
                borderBottom: i < arr.length - 1 ? "1px solid #f3f4f6" : "none",
                background: i % 2 === 0 ? "#fafafa" : "#fff",
              }}
            >
              <span className="text-[11px] text-gray-400 font-medium">
                {label}
              </span>
              <span className="text-[12px] font-semibold text-gray-800">
                {value}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl text-[13px] font-semibold text-white hover:opacity-90 transition-opacity"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Progress bar */}
      <div className="relative h-[3px]" style={{ background: "#f3f4f6" }}>
        <div
          ref={progressRef}
          className="absolute inset-y-0 left-0 rounded-r-full"
          style={{
            background: "linear-gradient(to right, #6366f1, #8b5cf6)",
            width: "50%",
          }}
        />
      </div>

      <div
        className="px-8 pt-7 pb-8 overflow-y-auto"
        style={{ maxHeight: "calc(90vh - 3px)" }}
      >
        {/* Step header */}
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-[12px] font-bold text-white flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              }}
            >
              {step + 1}
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-indigo-400 leading-none mb-0.5">
                Step {step + 1} of 2
              </p>
              <p className="text-[14px] font-semibold text-gray-800 leading-none">
                {step === 0 ? "Your Info" : "Background"}
              </p>
            </div>
          </div>

          {/* Step dots */}
          <div className="flex items-center gap-1.5">
            {[0, 1].map((s) => (
              <div
                key={s}
                className="rounded-full transition-all duration-300"
                style={{
                  width: step === s ? "20px" : "6px",
                  height: "6px",
                  background: step >= s ? "#6366f1" : "#e5e7eb",
                }}
              />
            ))}
          </div>
        </div>

        <div ref={slideRef}>
          {step === 0 ? (
            <div>
              <div className="mb-5">
                <h3 className="text-[22px] font-nasalization font-semibold text-gray-900 tracking-tight mb-1">
                  Tell us about you
                </h3>
                <p className="text-[13px] text-gray-400">
                  Basic info to get you registered.
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    label="First Name"
                    placeholder="Rahil"
                    value={form.firstName}
                    onChange={(v) => set("firstName", v)}
                    error={errors.firstName}
                  />
                  <FormField
                    label="Last Name"
                    placeholder="Khan"
                    value={form.lastName}
                    onChange={(v) => set("lastName", v)}
                    error={errors.lastName}
                  />
                </div>
                <FormField
                  label="Work Email"
                  placeholder="rahil@company.com"
                  type="email"
                  value={form.email}
                  onChange={(v) => set("email", v)}
                  error={errors.email}
                />
                <FormField
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
                className="w-full py-3.5 rounded-xl text-[13px] font-semibold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  boxShadow: "0 4px 14px rgba(99,102,241,0.3)",
                }}
              >
                Continue <ArrowRightIcon size={14} weight="bold" />
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-5">
                <h3 className="text-[22px] font-nasalization font-semibold text-gray-900 tracking-tight mb-1">
                  Your background
                </h3>
                <p className="text-[13px] text-gray-400">
                  Help us understand where you're coming from.
                </p>
              </div>

              <div className="mb-5">
                <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-gray-400 mb-2">
                  Years of experience in blockchain
                </label>
                <div className="flex flex-wrap gap-2">
                  {EXP_OPTIONS.map((o) => (
                    <PillBtn
                      key={o}
                      val={o}
                      selected={form.yearsExp}
                      field="yearsExp"
                    />
                  ))}
                </div>
                {errors.yearsExp && (
                  <p className="text-[11px] text-red-400 mt-1.5">
                    {errors.yearsExp}
                  </p>
                )}
              </div>

              <div className="mb-7">
                <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-gray-400 mb-2">
                  Primary blockchain activity
                </label>
                <div className="flex flex-wrap gap-2">
                  {ACTIVITIES.map((a) => (
                    <PillBtn
                      key={a}
                      val={a}
                      selected={form.primaryActivity}
                      field="primaryActivity"
                    />
                  ))}
                </div>
                {errors.primaryActivity && (
                  <p className="text-[11px] text-red-400 mt-1.5">
                    {errors.primaryActivity}
                  </p>
                )}
              </div>

              <div className="flex gap-2.5">
                <button
                  onClick={() => animateStep(-1, () => setStep(0))}
                  className="px-4 py-3.5 rounded-xl text-[13px] font-medium transition-colors flex items-center gap-1.5 hover:bg-gray-50"
                  style={{ border: "1.5px solid #e5e7eb", color: "#374151" }}
                >
                  <ArrowLeftIcon size={13} weight="bold" /> Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-3.5 rounded-xl text-[13px] font-semibold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    boxShadow: "0 4px 14px rgba(99,102,241,0.3)",
                  }}
                >
                  Submit <ArrowRightIcon size={14} weight="bold" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
