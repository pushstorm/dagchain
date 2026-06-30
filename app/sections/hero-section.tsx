"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const HeroSection = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const video = videoRef.current;
    if (!box || !video) return;

    let tween: gsap.core.Tween;

    const startAnimation = () => {
      gsap.set(video, { transformOrigin: "top left" });
      tween = gsap.fromTo(
        box,
        { scaleX: 0, transformOrigin: "top left" },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.out",
          onUpdate: () => {
            const boxScale = gsap.getProperty(box, "scaleX") as number;
            gsap.set(video, { scaleX: 1 / Math.max(boxScale, 0.001) });
          },
        },
      );
    };

    // readyState >= 2 = HAVE_CURRENT_DATA (first frame available)
    if (video.readyState >= 2) {
      startAnimation();
    } else {
      video.addEventListener("loadeddata", startAnimation, { once: true });
    }

    return () => {
      tween?.kill();
      video.removeEventListener("loadeddata", startAnimation);
    };
  }, []);

  return (
    <section className="container">
      <div ref={boxRef} className="h-[88dvh] w-full overflow-hidden relative">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero/Dagchain-Summit.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>
    </section>
  );
};

export default HeroSection;
