"use client";
import { useState } from "react";

export function FormField({
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
