import Wrap from "../ui/Wrap";
import SectionHead from "../ui/SectionHead";
import PortraitFrame from "../ui/PortraitFrame";
import Portrait from "../Portrait";
import { G } from "../../lib/data";
import { WALLFX } from "./stepData";

/** Effect per grantee (wall order: claire, sam, pedro, aaron, varun, emily,
 *  kevin). A cyclic 3-colouring — no two adjacent share an effect, including
 *  the kevin→claire wrap — while staying periodic with G so the marquee loops
 *  seamlessly. */
const WALL_FX_ORDER = [0, 1, 2, 0, 1, 2, 1];

export default function FacesWall() {
  return (
    <section id="faces" className="pb-[64px] pt-[84px]">
      <Wrap className="reveal">
        <SectionHead
          accent="rose"
          tag="the faces"
          title="we are the inflection point."
          lead={
            <>
              every grant is a story we&apos;ve created. real person chasing
              finding purpose on film.
              <span className="font-mono text-[13px] opacity-70">
                {" "}
                (we luv our grantees &lt;3)
              </span>
            </>
          }
        />
      </Wrap>

      <div className="group relative mt-10 overflow-hidden border-y-[1.5px] border-line-strong py-[26px] before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:top-0 before:z-[2] before:w-[90px] before:bg-[linear-gradient(90deg,var(--color-paper),transparent)] before:content-[''] after:pointer-events-none after:absolute after:bottom-0 after:right-0 after:top-0 after:z-[2] after:w-[90px] after:bg-[linear-gradient(270deg,var(--color-paper),transparent)] after:content-[''] reveal">
        <div className="flex w-max animate-[scroll_46s_linear_infinite] gap-[18px] group-hover:[animation-play-state:paused]">
          {[...G, ...G].map((g, i) => (
            <div
              key={i}
              className="w-[172px] flex-none rounded-[5px] border-[1.5px] border-line-strong bg-white p-3 transition-[transform,box-shadow] duration-200 hover:rotate-[-1deg] hover:-translate-y-[5px] hover:shadow-[6px_6px_0_var(--color-ink)]"
            >
              <PortraitFrame className="mb-[11px] aspect-[1/1.12] w-full">
                <Portrait
                  name={g.name}
                  effect={WALLFX[WALL_FX_ORDER[i % G.length]]}
                  image={g.image}
                />
              </PortraitFrame>
              <div className="font-disp text-[18px] font-bold lowercase leading-none text-crimson">
                {g.name}
              </div>
              <div className="mt-[5px] min-h-[34px] text-[12.5px] leading-[1.35] opacity-[.78]">
                {g.short}
              </div>
              <div className="mt-[9px] flex justify-between font-mono text-[10px] tracking-[.03em] opacity-60">
                <span>{g.loc}</span>
                <span className="text-sienna">S0{g.season}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
