"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function RevealLine({
  children,
  delay = 0,
  triggerRef,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  triggerRef: React.RefObject<Element | null>;
  className?: string;
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
    <span
      className={`block overflow-hidden ${className}`}
      style={{ display: "block" }}
    >
      <span ref={innerRef} style={{ display: "block" }}>
        {children}
      </span>
    </span>
  );
}

export default function ProblemSolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const p1Ref = useRef<HTMLDivElement>(null);
  const p2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
        card1Ref.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: iv(card1Ref.current),
        },
      );

      gsap.fromTo(
        card2Ref.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power3.out",
          delay: 0.1,
          scrollTrigger: iv(card2Ref.current),
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-28 px-6 sm:px-10 relative overflow-hidden"
      style={{ background: "#f0effe" }}
    >
      {/* Bg orb */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, #c7d2fe 0%, transparent 70%)",
          filter: "blur(48px)",
        }}
      />

      <div className="container max-w-6xl mx-auto relative">
        {/* Eyebrow */}
        <div ref={eyebrowRef} className="flex items-center gap-3 mb-5">
          <div className="w-5 h-px bg-indigo-300" />
          <span className="text-[0.65rem] font-medium tracking-[0.14em] uppercase text-indigo-400">
            Problem & Solution
          </span>
        </div>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-nasalization tracking-tight leading-[1.15] mb-14 text-[2.8rem] text-gray-900"
        >
          <RevealLine delay={0} triggerRef={headlineRef}>
            The old internet wasn't built for AI.
          </RevealLine>
          <RevealLine delay={0.1} triggerRef={headlineRef}>
            <span className="bg-linear-to-r text-transparent bg-clip-text from-color-1 via-color-3 to-color-2">
              DagChain{" "}
            </span>
            is.
          </RevealLine>
        </h2>

        {/* Cards */}
        <div className="grid lg:grid-cols-2 gap-5">
          {/* PROBLEM */}
          <div
            ref={card1Ref}
            className="rounded-3xl overflow-hidden flex flex-col group"
            style={{ background: "#080810" }}
          >
            <div className="relative h-72 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80"
                alt="Fragmented infrastructure"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(8,8,16,0.25) 0%, rgba(8,8,16,0.7) 55%, #080810 100%)",
                }}
              />
              <div className="absolute top-5 left-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-red-400">
                  The Problem
                </span>
              </div>
            </div>

            <div className="px-8 pt-7 pb-8 flex flex-col flex-1">
              {/* div instead of p — prevents <span> inside <p> hydration error */}
              <div
                ref={p1Ref}
                className="text-gray-400 text-[1.05rem] leading-relaxed"
              >
                <RevealLine delay={0} triggerRef={p1Ref}>
                  Billions of AI agents are expected to automate businesses,
                </RevealLine>
                <RevealLine delay={0.08} triggerRef={p1Ref}>
                  execute workflows, create content, and make decisions. Yet the
                </RevealLine>
                <RevealLine delay={0.16} triggerRef={p1Ref}>
                  infrastructure they're running on was{" "}
                  <strong className="font-semibold text-white">
                    never designed for an AI-driven economy.
                  </strong>
                </RevealLine>
              </div>
            </div>
          </div>

          {/* SOLUTION */}
          <div
            ref={card2Ref}
            className="rounded-3xl overflow-hidden flex flex-col group"
            style={{ background: "#1a1740" }}
          >
            <div className="relative h-72 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=900&q=80"
                alt="Autonomous AI infrastructure"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(55,48,163,0.35) 0%, rgba(79,26,155,0.75) 55%, #1a1740 100%)",
                }}
              />
              <div className="absolute top-5 left-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-300" />
                <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-indigo-300">
                  The Solution
                </span>
              </div>
              <div className="absolute bottom-5 left-6">
                <span
                  className="text-[11px] font-bold tracking-[0.06em] uppercase px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    color: "white",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  ⚡ DagChain Infrastructure
                </span>
              </div>
            </div>

            <div className="px-8 pt-7 pb-8 flex flex-col flex-1">
              <div
                ref={p2Ref}
                className="text-indigo-200/80 text-[1.05rem] leading-relaxed"
              >
                <RevealLine delay={0} triggerRef={p2Ref}>
                  The next generation of applications won't simply need faster
                </RevealLine>
                <RevealLine delay={0.08} triggerRef={p2Ref}>
                  transactions—they'll need{" "}
                  <strong className="font-semibold text-white">
                    an infrastructure capable of powering
                  </strong>
                </RevealLine>
                <RevealLine delay={0.16} triggerRef={p2Ref}>
                  <strong className="font-semibold text-white">
                    autonomous intelligence at scale.
                  </strong>
                </RevealLine>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
