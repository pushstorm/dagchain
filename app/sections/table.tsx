"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Robot, Cpu, Vault, Code, TreeStructure } from "@phosphor-icons/react";

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

const ROWS = [
  {
    num: "01",
    Icon: Robot,
    theme: "The Autonomous Agent Economy",
    tags: ["AI Agent Registry", "Reputation scoring", "Micro-payment rails"],
    easy: "Can AI Do Business on Its Own",
  },
  {
    num: "02",
    Icon: Cpu,
    theme: "Building the AI-Native Layer 1",
    tags: ["DPoS consensus", "5s finality", "Energy model", "EVM"],
    easy: "Blockchain That Doesn't Cost a Fortune",
  },
  {
    num: "03",
    Icon: Vault,
    theme: "Real-World Assets Go On-Chain",
    tags: ["ERC-3643", "KYC/AML automation", "Asset tokenization"],
    easy: "Your Assets, But Smarter",
  },
  {
    num: "04",
    Icon: Code,
    theme: "Blockchain Without Barriers",
    tags: ["No-code SDKs", "DAGGPT", "Vibe coder tools"],
    easy: "Anyone Can Build the Next Big App",
  },
  {
    num: "05",
    Icon: TreeStructure,
    theme: "Governance, Validators & the Network's Future",
    tags: ["DAO", "10K validators", "Quadratic voting", "DGCC"],
    easy: "Who Gets to Shape the Future of DAGChain",
  },
];

export default function ThemeTable() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const iv = (el: Element | null) => ({
      trigger: el,
      start: "top 88%",
      once: true,
    });

    gsap.fromTo(
      eyebrowRef.current,
      { x: -16, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.55,
        ease: "power3.out",
        scrollTrigger: iv(eyebrowRef.current),
      },
    );

    gsap.fromTo(
      subRef.current,
      { y: 16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.55,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: iv(subRef.current),
      },
    );

    rowsRef.current.forEach((row) => {
      if (!row) return;
      // Use gsap.set instead of Tailwind opacity-0 to avoid class conflicts
      gsap.set(row, { y: 24, opacity: 0 });
      gsap.to(row, {
        y: 0,
        opacity: 1,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: iv(row),
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section id={'ecosystem'} ref={sectionRef} className="py-24 bg-white">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <div ref={eyebrowRef} className="flex items-center gap-3 mb-4">
              <div className="w-5 h-px bg-indigo-300" />
              <span className="text-[0.65rem] font-medium tracking-[0.14em] uppercase text-indigo-500">
                What We're Building
              </span>
            </div>
            <h2
              ref={headingRef}
              className="font-nasalization tracking-tight leading-tight text-gray-900 text-4xl lg:text-5xl "
            >
              <RevealLine delay={0} triggerRef={headingRef}>
                Five pillars of the
              </RevealLine>
              <RevealLine delay={0.1} triggerRef={headingRef}>
                <span style={{ color: "#6366f1" }}>DagChain ecosystem</span>
              </RevealLine>
            </h2>
          </div>
          <p
            ref={subRef}
            className="text-[13px] max-w-xs text-right hidden sm:block leading-relaxed"
            style={{ color: "#6b7280" }}
          >
            From autonomous agents to on-chain governance — built for the AI
            economy.
          </p>
        </div>

        {/* Table */}
        <div className="flex flex-col">
          {ROWS.map(({ num, Icon, theme, tags, easy }, i) => (
            <div
              key={num}
              ref={(el) => {
                rowsRef.current[i] = el;
              }}
              className="group relative grid grid-cols-1 md:grid-cols-[5rem_1fr_1fr] gap-6 md:gap-10
                         items-start py-8 cursor-default"
              style={{ borderTop: "1px solid #e5e7eb" }}
            >
              {/* Hover bg */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: "rgba(99,102,241,0.04)" }}
              />

              {/* Number + Icon */}
              <div className="flex flex-col items-start gap-2 pl-4 pt-1">
                <span
                  className="text-[11px] font-bold tabular-nums"
                  style={{ color: "#9ca3af" }}
                >
                  {num}
                </span>
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: "#ede9fe",
                    border: "1px solid #ddd6fe",
                  }}
                >
                  <Icon
                    size={18}
                    weight="duotone"
                    style={{ color: "#6d28d9" }}
                  />
                </div>
              </div>

              {/* Theme + tags */}
              <div className="flex flex-col gap-3 pl-3 md:pl-0">
                <p
                  className="text-[16px] font-semibold leading-snug transition-colors duration-300 group-hover:text-gray-900"
                  style={{ color: "#111827" }}
                >
                  {theme}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-md"
                      style={{
                        background: "#f5f3ff",
                        color: "#6d28d9",
                        border: "1px solid #ddd6fe",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Plain English box */}
              <div className="pl-3 md:pl-0">
                <div
                  className="rounded-xl px-5 py-4 transition-all duration-300 group-hover:border-indigo-300"
                  style={{
                    background: "#fafafa",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <p
                    className="text-[10px] font-semibold tracking-[0.12em] uppercase mb-2"
                    style={{ color: "#6366f1" }}
                  >
                    In plain English
                  </p>
                  <p
                    className="text-[14px] font-semibold leading-snug transition-colors duration-300 group-hover:text-indigo-700"
                    style={{ color: "#1f2937" }}
                  >
                    {easy}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid #e5e7eb" }} />
        </div>
      </div>
    </section>
  );
}
