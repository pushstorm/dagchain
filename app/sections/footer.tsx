"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  XLogoIcon,
  TelegramLogoIcon,
  LinkedinLogoIcon,
  GlobeIcon,
  CircleIcon,
} from "@phosphor-icons/react";
import Logo from "@/logo/logo";

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
    icon: <XLogoIcon size={15} weight="bold" />,
    label: "/DAGCHAIN",
    href: "#",
  },
  {
    icon: <TelegramLogoIcon size={15} weight="bold" />,
    label: "T.ME/DAGCHAIN",
    href: "#",
  },
  {
    icon: <LinkedinLogoIcon size={15} weight="bold" />,
    label: "/DAGCHAIN",
    href: "#",
  },
  {
    icon: <GlobeIcon size={15} weight="bold" />,
    label: "DAGCHAIN.COM",
    href: "#",
  },
];

const LEGAL = [
  { label: "Overview", href: "#" },
  { label: "Why Join Dag Chain", href: "#" },
  { label: "Be a Part of the Ecosystem", href: "#" },
];

export default function Footer() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const socialsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const legalRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const iv = (el: Element | null) => ({
      trigger: el,
      start: "top 90%",
      once: true,
    });

    // Social buttons stagger
    gsap.set(socialsRef.current.filter(Boolean), { y: 16, opacity: 0 });
    gsap.to(socialsRef.current.filter(Boolean), {
      y: 0,
      opacity: 1,
      duration: 0.55,
      ease: "power3.out",
      stagger: 0.08,
      scrollTrigger: iv(socialsRef.current[0]),
    });

    // Legal row
    gsap.set(legalRef.current, { y: 12, opacity: 0 });
    gsap.to(legalRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power3.out",
      delay: 0.2,
      scrollTrigger: iv(legalRef.current),
    });

    // Logo
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
    <footer className="bg-black border-t border-white/10">
      {/* Statement */}
      <div className="container pt-16 pb-14">
        <h2
          ref={headingRef}
          className="font-semibold text-4xl lg:text-5xl tracking-tight font-nasalization text-white"
        >
          <RevealLine delay={0} triggerRef={headingRef}>
            The Infrastructure Behind the{" "}
          </RevealLine>
          <RevealLine delay={0.12} triggerRef={headingRef}>
            <span className="bg-linear-to-r from-color-1 via-color-3 to-color-2 bg-clip-text text-transparent">
              AI Economy.
            </span>
          </RevealLine>
        </h2>
      </div>

      {/* Middle */}
      <div className="border-t border-white/10">
        <div className="px-8 sm:px-16 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <Logo light className="w-36" />

          {/* Social grid */}
          <div className="grid grid-cols-2 gap-5">
            {SOCIALS.map(({ icon, label, href }, id) => (
              <Link
                key={id}
                href={href}
                className="flex items-center gap-3 w-full transition-opacity duration-200 hover:opacity-70"
                style={{
                  background: "#ffffff0f",
                  color: "white",
                  padding: "13px 20px",
                  borderRadius: "12px",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.07em",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {icon}
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-white/10">
        <div className="px-8 sm:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
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
          <p className="text-[12px] text-white/30">
            DagChain Summit 2026 · All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
