"use client";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "01",
    era: "1760 – 1840",
    sentence: ["The ", "Industrial Revolution", " gave us factories."],
  },
  {
    num: "02",
    era: "1990s – 2000s",
    sentence: ["The ", "Internet Revolution", " gave us cloud computing."],
  },
  {
    num: "03",
    era: "2008 – present",
    sentence: ["", "Blockchain", " gave us decentralized finance."],
  },
  {
    num: "04",
    era: "Today",
    sentence: [
      "Today, ",
      "Artificial Intelligence",
      " is creating the next revolution.",
    ],
    highlight: true,
  },
];

// Wrap text in a clip-mask container for the bottom-to-top reveal
function RevealLine({
  children,
  delay = 0,
  triggerRef,
}: {
  children: React.ReactNode;
  delay?: number;
  triggerRef: React.RefObject<Element | null>;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!innerRef.current || !triggerRef.current) return;

    gsap.set(innerRef.current, { y: "105%" });

    const st = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(innerRef.current, {
          y: "0%",
          duration: 0.75,
          ease: "power3.out",
          delay,
        });
      },
    });

    return () => st.kill();
  }, [delay, triggerRef]);

  return (
    <div ref={outerRef} style={{ overflow: "hidden", display: "block" }}>
      <div ref={innerRef}>{children}</div>
    </div>
  );
}

export default function AboutRevolutionSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const circlesRef = useRef<(HTMLDivElement | null)[]>([]);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobileRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const inView = (el: Element | null) => ({
        trigger: el,
        start: "top 88%",
        once: true,
      });

      // Eyebrow slide-in from left
      gsap.fromTo(
        eyebrowRef.current,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: inView(eyebrowRef.current),
        },
      );

      // Desktop circles stagger
      const circles = circlesRef.current.filter(Boolean);
      if (circles.length) {
        gsap.fromTo(
          circles,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.45,
            ease: "back.out(1.7)",
            stagger: 0.1,
            scrollTrigger: inView(circles[0]),
          },
        );
      }

      // Connector lines
      linesRef.current.filter(Boolean).forEach((line) => {
        gsap.fromTo(
          line,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: inView(line),
          },
        );
      });

      // Desktop cards stagger
      const cards = cardsRef.current.filter(Boolean);
      if (cards.length) {
        gsap.fromTo(
          cards,
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            stagger: 0.09,
            scrollTrigger: inView(cards[0]),
          },
        );
      }

      // Mobile steps
      mobileRef.current.filter(Boolean).forEach((item, i) => {
        gsap.fromTo(
          item,
          { x: -22, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            delay: i * 0.05,
            scrollTrigger: inView(item),
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="my-22">
      <div className="container">
        {/* Eyebrow */}
        <div ref={eyebrowRef} className="flex items-center gap-3 mb-3">
          <div className="w-5 h-px bg-gray-300" />
          <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-gray-400">
            About DagChain
          </span>
        </div>

        {/* Title — each line gets its own clip-reveal */}
        <h2
          ref={titleRef}
          className="text-5xl capitalize font-nasalization tracking-tighter text-gray-900 mb-16 leading-tight"
        >
          <RevealLine delay={0} triggerRef={titleRef}>
            Every era has its{" "}
            <em className="not-italic text-color-1">Revolution.</em>
          </RevealLine>
        </h2>

        {/* DESKTOP */}
        <div className="hidden lg:block">
          <div className="flex items-center mb-8">
            {STEPS.map(({ num, highlight }, i) => {
              const isHovered = hovered === num;
              const isLast = i === STEPS.length - 1;
              return (
                <div
                  key={num}
                  className="flex items-center flex-1 last:flex-none"
                >
                  <div
                    ref={(el) => {
                      circlesRef.current[i] = el;
                    }}
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all duration-300 cursor-default"
                    style={{
                      background: isHovered || highlight ? "#6366f1" : "#fff",
                      borderColor:
                        isHovered || highlight ? "#6366f1" : "#e5e7eb",
                    }}
                    onMouseEnter={() => setHovered(num)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <span
                      className="text-[11px] font-semibold tabular-nums transition-colors duration-300"
                      style={{
                        color: isHovered || highlight ? "#fff" : "#9ca3af",
                      }}
                    >
                      {num}
                    </span>
                  </div>
                  {!isLast && (
                    <div
                      ref={(el) => {
                        linesRef.current[i] = el;
                      }}
                      className="flex-1 h-px mx-2"
                      style={{ background: "#e5e7eb" }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-4 gap-6">
            {STEPS.map(({ num, era, sentence, highlight }, i) => {
              const isHovered = hovered === num;
              const [before, bold, after] = sentence;
              return (
                <div
                  key={num}
                  ref={(el) => {
                    cardsRef.current[i] = el;
                  }}
                  className="cursor-default"
                  onMouseEnter={() => setHovered(num)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <span
                    className="text-[11px] font-medium tracking-[0.08em] uppercase block mb-2 transition-colors duration-300"
                    style={{
                      color: isHovered || highlight ? "#6366f1" : "#9ca3af",
                    }}
                  >
                    {era}
                  </span>
                  <p
                    className="text-[1.05rem] leading-snug transition-colors duration-300"
                    style={{
                      color: isHovered
                        ? "#111827"
                        : highlight
                          ? "#111827"
                          : "#6b7280",
                    }}
                  >
                    {before}
                    <strong
                      className="font-semibold transition-colors duration-300"
                      style={{
                        color: isHovered || highlight ? "#6366f1" : "#374151",
                      }}
                    >
                      {bold}
                    </strong>
                    {after}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* MOBILE */}
        <div className="flex flex-col lg:hidden">
          {STEPS.map(({ num, era, sentence, highlight }, i) => {
            const isHovered = hovered === num;
            const isLast = i === STEPS.length - 1;
            const [before, bold, after] = sentence;
            return (
              <div
                key={num}
                ref={(el) => {
                  mobileRef.current[i] = el;
                }}
                className="flex gap-5 cursor-default"
                onMouseEnter={() => setHovered(num)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300"
                    style={{
                      background: isHovered || highlight ? "#6366f1" : "#fff",
                      borderColor:
                        isHovered || highlight ? "#6366f1" : "#e5e7eb",
                    }}
                  >
                    <span
                      className="text-[10px] font-semibold tabular-nums transition-colors duration-300"
                      style={{
                        color: isHovered || highlight ? "#fff" : "#9ca3af",
                      }}
                    >
                      {num}
                    </span>
                  </div>
                  {!isLast && (
                    <div
                      className="w-px flex-1 my-1"
                      style={{ background: "#e5e7eb", minHeight: "40px" }}
                    />
                  )}
                </div>

                <div className={`flex-1 ${isLast ? "pb-0" : "pb-10"}`}>
                  <span
                    className="text-[11px] font-medium tracking-[0.08em] uppercase block mb-2 transition-colors duration-300"
                    style={{
                      color: isHovered || highlight ? "#6366f1" : "#9ca3af",
                    }}
                  >
                    {era}
                  </span>
                  <p
                    className="text-[1.2rem] leading-snug transition-colors duration-300"
                    style={{
                      color: isHovered
                        ? "#111827"
                        : highlight
                          ? "#111827"
                          : "#6b7280",
                    }}
                  >
                    {before}
                    <strong
                      className="font-semibold transition-colors duration-300"
                      style={{
                        color: isHovered || highlight ? "#6366f1" : "#374151",
                      }}
                    >
                      {bold}
                    </strong>
                    {after}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
