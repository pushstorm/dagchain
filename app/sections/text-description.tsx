"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const TextDescription = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const para = paraRef.current;
    if (!section || !heading || !para) return;

    const splitHeading = new SplitText(heading, {
      type: "lines",
      mask: "lines",
      linesClass: "line",
    });
    const splitPara = new SplitText(para, {
      type: "lines",
      mask: "lines",
      linesClass: "line",
    });
    const allLines = [...splitHeading.lines, ...splitPara.lines];

    gsap.set(allLines, { yPercent: 100, opacity: 0 });

    const tween = gsap.to(allLines, {
      yPercent: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.kill();
      splitHeading.revert();
      splitPara.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
    id={"join-dag"}
      ref={sectionRef}
      className="container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mt-8"
    >
      <h2
        ref={headingRef}
        className="text-4xl  lg:text-5xl font-nasalization font-semibold tracking-tight"
      >
        World's first ever Decentralized Blockchain Layer of the AI Economy
      </h2>
      <p
        ref={paraRef}
        className="font-inter text-muted-foreground leading-relaxed"
      >
        We believe the next great wave of the internet won't be built by those
        who own the tools—it will be built by those who own their creations.
        True innovation comes when creators have complete ownership of their
        content, digital assets, and identity, empowering them to build,
        collaborate, and thrive without unnecessary limitations.
      </p>
    </section>
  );
};

export default TextDescription;
