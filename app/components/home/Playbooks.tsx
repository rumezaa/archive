import Wrap from "../ui/Wrap";
import SectionHead from "../ui/SectionHead";
import { PLAYBOOKS } from "./stepData";
import { LINKS, EXT } from "../../lib/links";

const ACCENT: Record<string, string> = {
  c1: "before:bg-crimson hover:shadow-[8px_8px_0_var(--color-crimson)]",
  c2: "before:bg-sienna hover:shadow-[8px_8px_0_var(--color-sienna)]",
  c3: "before:bg-pear hover:shadow-[8px_8px_0_var(--color-pear)]",
};

/** The applicant playbook (c1) points to the Notion doc; others are TBD. */
const HREF: Record<string, string> = {
  c1: LINKS.applicationPlaybook,
};

export default function Playbooks() {
  return (
    <section id="playbooks" className="pb-[84px] pt-[30px]">
      <Wrap>
        <div className="reveal">
          <SectionHead
            accent="pear"
            tag="the playbooks"
            title="curated archive guides"
            lead="we get it, in a world over-run by ai note taker startups, it's hard to actually define &quot;a quest&quot;. our playbooks outline the type of stories we look to fund and the people we partner with."
          />
        </div>

        <div className="mt-[44px] grid max-w-[380px] gap-5">
          {PLAYBOOKS.map((pb, i) => (
            <a
              key={pb.no}
              href={HREF[pb.cls] ?? "#"}
              {...(HREF[pb.cls] ? EXT : {})}
              style={i > 0 ? { transitionDelay: `${i * 0.08}s` } : undefined}
              className={`reveal group relative flex min-h-[262px] flex-col overflow-hidden rounded-[4px] border-[1.5px] border-ink bg-white px-6 pb-[22px] pt-[26px] transition-[transform,box-shadow] duration-200 before:absolute before:left-0 before:right-0 before:top-0 before:h-2 before:content-[''] hover:translate-x-[-4px] hover:translate-y-[-4px] ${ACCENT[pb.cls]}`}
            >
              <span className="mb-4 mt-[6px] block h-[42px] w-[42px]">
                {pb.icon}
              </span>
              <span className="mt-2 font-mono text-[12px] tracking-[.1em] opacity-50">
                {pb.no}
              </span>
              <h3 className="font-disp text-[24px] font-bold lowercase leading-none text-crimson">
                {pb.title}
              </h3>
              <p className="mt-3 text-[14.5px] leading-[1.5] opacity-[.82]">
                {pb.desc}
              </p>
              <span className="mt-auto flex items-center gap-2 pt-[18px] font-mono text-[12px] tracking-[.04em] text-crimson">
                open playbook{" "}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-[2px]"
                >
                  <path d="M3 13L13 3M6 3h7v7" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
