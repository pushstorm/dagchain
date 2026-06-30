"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";
import Image from "next/image";

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

const ImageSlider = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const iv = (el: Element | null) => ({
      trigger: el,
      start: "top 88%",
      once: true,
    });

    // Para lines
    if (paraRef.current) {
      gsap.fromTo(
        paraRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power3.out",
          delay: 0.15,
          scrollTrigger: iv(paraRef.current),
        },
      );
    }

    // Slider rows
    if (row1Ref.current) {
      gsap.fromTo(
        row1Ref.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: iv(row1Ref.current),
        },
      );
    }
    if (row2Ref.current) {
      gsap.fromTo(
        row2Ref.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.1,
          scrollTrigger: iv(row2Ref.current),
        },
      );
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="mt-24">
      <div className="container mb-10">
        <h2 ref={headingRef} className="text-4xl lg:text-5xl font-nasalization max-w-2xl">
          <RevealLine delay={0} triggerRef={headingRef}>
            How{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-color-1 via-color-3 to-color-2 tracking-tighter">
              Dag Chain
            </span>{" "}
            Steps-in
          </RevealLine>
        </h2>

        <div ref={paraRef}>
          <p className="text-muted-foreground max-w-2xl mt-2 text-sm leading-relaxed">
            On DAGChain, infrastructure is powered by Validator Nodes and
            Storage Nodes — the decentralized backbone that secures the network,
            processes transactions, and stores the data powering tomorrow's AI
            applications.
          </p>
        </div>
      </div>

      <ScrollVelocityContainer className="space-y-2">
        <div ref={row1Ref}>
          <ScrollVelocityRow baseVelocity={2} direction={1}>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <Image
                key={num}
                src={`/image-slider/img-${num}.jpeg`}
                width={400}
                height={400}
                className="ml-3 w-100 h-60 object-cover rounded-lg"
                alt={`dagchain-event-${num}`}
              />
            ))}
          </ScrollVelocityRow>
        </div>

        <div ref={row2Ref}>
          <ScrollVelocityRow baseVelocity={2} direction={-1}>
            {Array.from({ length: 10 }, (_, i) => i + 11).map((num) => (
              <Image
                key={num}
                src={`/image-slider/img-${num}.jpeg`}
                width={400}
                height={400}
                className="ml-3 w-100 h-60 object-cover rounded-lg"
                alt={`dagchain-event-${num}`}
              />
            ))}
          </ScrollVelocityRow>
        </div>
      </ScrollVelocityContainer>
    </section>
  );
};

export default ImageSlider;
