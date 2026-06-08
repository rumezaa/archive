import Wrap from "../ui/Wrap";
import SectionHead from "../ui/SectionHead";
import Btn from "../ui/Btn";
import { LINKS, EXT } from "../../lib/links";

type Card = {
  n: string;
  title: string;
  img: string;
  cap: string;
  accent: string;
};

/** Small underline color per step. */
const ACCENT: Record<string, string> = {
  crimson: "bg-crimson",
  sienna: "bg-sienna",
  pear: "bg-pear",
  rose: "bg-rose",
  arctic: "bg-arctic",
};

const CARDS: Card[] = [
  {
    n: "01",
    title: "apply",
    img: "/carousel-2.png",
    cap: "tell us about your quest in a few words and trailer! We look at the one-liners the most - say something worth stopping for",
    accent: "rose",
  },
  {
    n: "02",
    title: "vibe",
    img: "/carousel-3.png",
    cap: "if your adventure aligns we'll ask you to hop on a quick call to learn more :)",
    accent: "pear",
  },
  {
    n: "03",
    title: "archive",
    img: "/carousel-1.png",
    cap: "go do the thing. the trip, the popup, the reunion, the build, the wild one-night idea. this part is entirely yours. all we ask: you document errrthang",
    accent: "crimson",
  },
];

export default function HowWeWork() {
  return (
    <section id="how" className="pb-[84px] pt-[36px]">
      <Wrap>
        <div className="reveal">
          <SectionHead
            tag="the process"
            title="So... how do I get in on this?"
            lead="we give out responses in under 48h to keep up with your spontaneity. our application is designed to be a process of purpose."
          />
        </div>

        <div className="mt-[44px] grid grid-cols-4 gap-5 max-[1000px]:grid-cols-2 max-[560px]:grid-cols-1">
          {CARDS.map((c, i) => (
            <div
              key={c.n}
              style={i > 0 ? { transitionDelay: `${i * 0.08}s` } : undefined}
              className="reveal group flex flex-col items-center text-center"
            >
              <span className="font-mono text-[12px] tracking-[.1em] opacity-50">
                step {c.n}
              </span>
              <h3 className="mt-[6px] font-disp text-[30px] font-bold uppercase leading-none tracking-[.04em] text-crimson">
                {c.title}
              </h3>
              <span
                className={`mt-3 block h-[3px] w-10 rounded-full ${ACCENT[c.accent]}`}
              />

              <div className="grid flex-1 place-items-center py-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.img}
                  alt={c.title}
                  className="h-[150px] w-auto select-none object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-[1.06]"
                />
              </div>

              <p className="mx-auto max-w-[32ch] text-[14px] leading-[1.5] opacity-[.82]">
                {c.cap}
              </p>
            </div>
          ))}

          {/* closing call-to-action, fills the open column */}
          <div
            style={{ transitionDelay: "0.24s" }}
            className="reveal flex flex-col items-center justify-center text-center max-[1000px]:py-8"
          >
            <h3 className="max-w-[12ch] font-disp text-[28px] font-extrabold lowercase leading-[1.04] tracking-[-.01em] text-crimson">
              ready to start your story
            </h3>
            <Btn variant="fill" href={LINKS.apply} {...EXT} className="mt-6">
              change my life &nbsp;➔
            </Btn>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
