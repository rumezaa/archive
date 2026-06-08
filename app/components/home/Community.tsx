import Wrap from "../ui/Wrap";
import { LINKS, EXT } from "../../lib/links";

export default function Community() {
  return (
    <section id="community" className="py-[70px]">
      <Wrap className="reveal">
        <div className="flex flex-wrap items-center justify-between gap-[34px] rounded-[6px] border-[1.5px] border-ink bg-arctic p-10 shadow-[7px_7px_0_var(--color-crimson)]">
          <div>
            <h2 className="max-w-[16ch] font-disp text-[clamp(26px,3.6vw,40px)] font-extrabold lowercase leading-[.98] text-crimson">
              the quest doesn&apos;t end at the grant.
            </h2>
            <p className="mt-3 max-w-[48ch] text-[15px] leading-[1.5] text-ink opacity-[.85]">
              funded or not, the archive runs on a community of questers, alumni,
              and backers swapping ideas, leads, and encouragement. come hang out
              — it&apos;s where the next side quests are born.
            </p>
          </div>
          <div className="flex flex-col items-start gap-[11px]">
            <a
              href={LINKS.slack}
              {...EXT}
              className="inline-flex cursor-pointer items-center gap-2 rounded-[2px] border-[1.5px] border-crimson bg-crimson px-[22px] py-[14px] font-mono text-[14px] font-bold lowercase tracking-[.04em] text-latte transition-[transform,background-color,border-color,box-shadow] duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:border-ink hover:bg-ink hover:shadow-[4px_4px_0_var(--color-sienna)]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M9 3 7 21M17 3 15 21M3 9h18M2 15h18" />
              </svg>{" "}
              join our slack &nbsp;➔
            </a>
            <span className="font-mono text-[11px] opacity-60">
              free · open to everyone
            </span>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
