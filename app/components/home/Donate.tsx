import Wrap from "../ui/Wrap";
import SectionHead from "../ui/SectionHead";
import { LINKS, EXT } from "../../lib/links";

const DONATE_BTN =
  "mt-auto inline-flex cursor-pointer items-center justify-center gap-2 rounded-[2px] border-[1.5px] border-latte px-[18px] py-[11px] " +
  "font-mono text-[12.5px] font-bold lowercase tracking-[.04em] text-latte transition-[transform,background-color,border-color,color,box-shadow] duration-200 " +
  "hover:translate-x-[-2px] hover:translate-y-[-2px] hover:border-pear hover:bg-pear hover:text-ink hover:shadow-[4px_4px_0_var(--color-sienna)]";

const TONE = {
  arctic: { text: "text-arctic", bar: "bg-arctic", ring: "hover:border-arctic" },
  sienna: { text: "text-sienna", bar: "bg-sienna", ring: "hover:border-sienna" },
  rose: { text: "text-rose", bar: "bg-rose", ring: "hover:border-rose" },
} as const;

const TIERS = [
  {
    amt: "50",
    name: "the spark",
    desc: "covers gear, a train ticket, or the small thing standing between someone and go.",
    feat: false,
    tone: "arctic" as const,
  },
  {
    amt: "250",
    name: "the questline ★",
    desc: "funds a full side quest end to end — and the scrappy documentary that comes back.",
    feat: true,
    tone: "sienna" as const,
  },
  {
    amt: "1000",
    name: "the patron",
    desc: "sponsors a whole grantee for the season. named in the archive + the launch film.",
    feat: false,
    tone: "rose" as const,
  },
];

export default function Donate() {
  return (
    <section id="donate" className="bg-ink py-[84px] text-latte">
      <Wrap>
        <div className="reveal">
          <SectionHead
            dark
            accent="rose"
            tag="become a backer"
            title="fund someone's defining summer."
            lead="the real barrier to a side quest isn't money — it's permission. your gift hands someone both. pick a tier; we'll send the stories it funds."
          />
        </div>

        <div className="reveal mt-[42px] grid grid-cols-3 gap-[18px] max-[760px]:grid-cols-1">
          {TIERS.map((t) => (
            <div
              key={t.amt}
              className={`relative flex flex-col overflow-hidden rounded-[4px] border-[1.5px] px-6 py-[26px] transition-[transform,border-color] duration-200 hover:-translate-y-[5px] ${TONE[t.tone].ring} ${
                t.feat
                  ? "border-sienna bg-[rgba(243,117,33,.14)]"
                  : "border-[rgba(246,243,207,.28)]"
              }`}
            >
              <span
                className={`absolute left-0 right-0 top-0 h-[3px] ${TONE[t.tone].bar}`}
              />
              <div className="font-disp text-[50px] font-extrabold leading-none text-latte">
                <small className="text-[18px] opacity-60">$</small>
                {t.amt}
              </div>
              <div
                className={`mt-[10px] font-mono text-[12px] uppercase tracking-[.08em] ${TONE[t.tone].text}`}
              >
                {t.name}
              </div>
              <p className="mt-[14px] text-[14px] leading-[1.5] opacity-80">
                {t.desc}
              </p>
              <a href={LINKS.donate[t.amt]} {...EXT} className={DONATE_BTN}>
                donate ${t.amt}
              </a>
            </div>
          ))}
        </div>

      </Wrap>
    </section>
  );
}
