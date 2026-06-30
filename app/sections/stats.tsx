"use client";
import CountUp from "@/components/count-up";

const STATS = [
  { value: 10,  suffix: "B+", desc: "AI Agents By 2030" },
  { value: 20,  suffix: "K+", desc: "Enterprise TPS" },
  { value: 400, suffix: "M",  desc: "DGCC Supply" },
  { value: 10,  suffix: "K",  desc: "Validator Nodes" },
];

const Stats = () => {
  return (
    <section className="bg-black py-14 mt-16">
      <div className="container grid grid-cols-2 lg:grid-cols-4 gap-10 place-items-center">
        {STATS.map(({ value, suffix, desc }, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2 text-center">
            <div className="text-5xl lg:text-6xl font-semibold tracking-tighter font-inter flex items-baseline gap-1 bg-linear-to-r from-color-1 via-color-3 to-color-2 bg-clip-text text-transparent">
              <CountUp to={value} duration={1.5} />
              <span>{suffix}</span>
            </div>
            <p className="text-[12px] font-medium tracking-[0.1em] uppercase text-gray-500">
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;