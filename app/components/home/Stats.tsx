"use client";

import { useEffect, useRef, useState } from "react";
import Wrap from "../ui/Wrap";
import { G } from "../../lib/data";

const STAT_CELL =
  "border-r-[1.5px] border-line-strong px-[26px] py-[30px] last:border-r-0 " +
  "max-[760px]:[&:nth-child(2)]:border-r-0 max-[760px]:[&:nth-child(1)]:border-b-[1.5px] " +
  "max-[760px]:[&:nth-child(2)]:border-b-[1.5px]";

export default function Stats() {
  const questCount = 8;
  const countryCount = 10;
  const seasonCount = new Set(G.map((g) => g.season)).size;

  const [values, setValues] = useState({ quests: 0, countries: 0, seasons: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const targets = {
          quests: questCount,
          countries: countryCount,
          seasons: seasonCount,
        };
        let step = 0;
        const steps = 24;
        const timer = setInterval(() => {
          step++;
          if (step >= steps) {
            setValues(targets);
            clearInterval(timer);
            return;
          }
          setValues({
            quests: Math.round((targets.quests * step) / steps),
            countries: Math.round((targets.countries * step) / steps),
            seasons: Math.round((targets.seasons * step) / steps),
          });
        }, 28);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [questCount, countryCount, seasonCount]);

  const cells = [
    { n: values.quests, k: "quests funded", bar: "bg-crimson" },
    { n: values.countries, k: "countries reached", bar: "bg-sienna" },
    { n: values.seasons, k: "seasons run", bar: "bg-pear" },
    { n: "$0–1k", k: "per side quest", bar: "bg-arctic" },
  ];

  return (
    <section className="pb-0 pt-[70px]">
      <Wrap className="reveal">
        <div
          ref={ref}
          className="grid grid-cols-4 overflow-hidden rounded-[3px] border-[1.5px] border-line-strong bg-[rgba(255,255,255,.42)] max-[760px]:grid-cols-2"
        >
          {cells.map((c) => (
            <div key={c.k} className={`relative ${STAT_CELL}`}>
              <span
                className={`absolute left-0 top-0 h-[3px] w-full ${c.bar}`}
              />
              <div className="font-disp text-[46px] font-extrabold leading-none text-crimson">
                {c.n}
              </div>
              <div className="mt-2 font-mono text-[11.5px] uppercase tracking-[.08em] opacity-[.66]">
                {c.k}
              </div>
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
