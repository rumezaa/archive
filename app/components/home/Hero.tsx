import Image from "next/image";
import Btn from "../ui/Btn";
import Avatar from "../ui/Avatar";
import Portrait from "../Portrait";
import { G } from "../../lib/data";
import { LINKS, EXT } from "../../lib/links";

const FACE_AVATAR =
  "h-[42px] w-[42px] -ml-3 border-2 border-latte shadow-[1px_1px_0_rgba(58,10,19,.25)] first:ml-0";

export default function Hero() {
  const questCount = G.length;
  const countryCount = new Set(
    G.map((g) => g.loc.split(",").pop()!.trim()),
  ).size;

  return (
    <header
      className="relative flex min-h-[calc(100svh-68px)] items-center overflow-hidden pb-[52px] pt-[74px]"
      id="top"
    >
      <Image
        className="pointer-events-none absolute -right-1/2 -bottom-2/3 z-[1] aspect-square h-auto w-[130vh] -translate-x-1/2 select-none opacity-50 "
        src="/globe.svg"
        alt=""
        width={500}
        height={500}
        priority
        aria-hidden="true"
      />

      <div className="relative z-[2] flex w-full flex-col items-start px-7 text-left md:px-12">
        <span className="mb-6 inline-flex items-center gap-[10px] font-mono text-[12px] uppercase tracking-[.18em] text-crimson opacity-0 animate-[rise_.7s_.05s_forwards]">
          <span className="inline-block h-2 w-2 rounded-full bg-sienna animate-[pulse_2.4s_infinite]" />
          &nbsp;$0–$1000 microgrants · every summer · worldwide
        </span>

        <h1 className="font-disp text-[clamp(40px,7.4vw,90px)] font-extrabold lowercase leading-[.96] tracking-[-.02em] text-crimson">
          <span
            className="block translate-y-[40px] opacity-0 animate-[rise_.8s_forwards]"
            style={{ animationDelay: ".15s" }}
          >
            we fund
          </span>
          <span
            className="block translate-y-[40px] opacity-0 animate-[rise_.8s_forwards]"
            style={{ animationDelay: ".28s" }}
          >
            <em className="relative not-italic text-sienna after:absolute after:bottom-[.06em] after:left-[-2%] after:right-[-2%] after:-z-[1] after:h-[.16em] after:origin-left after:scale-x-0 after:bg-pear after:content-[''] after:animate-[swipe_.6s_1s_forwards]">
              cannon events
            </em>
          </span>{" "}
        </h1>

        <p className="mr-auto mt-6 max-w-[50ch] text-[18px] leading-[1.55] text-ink opacity-0 animate-[rise_.8s_.55s_forwards]">
          we give microgrants for you to go on lifechanging sidequests and
          document everything
        </p>

        <div className="mt-[30px] flex flex-wrap justify-start gap-[14px] opacity-0 animate-[rise_.8s_.7s_forwards]">
          <Btn variant="fill" href={LINKS.apply} {...EXT}>
            apply for a grant &nbsp;➔
          </Btn>
          <Btn variant="ghost" href="#atlas">
            explore the atlas
          </Btn>
        </div>

        <div className="mt-[30px] flex items-center justify-start gap-[14px] opacity-0 animate-[rise_.8s_.85s_forwards]">
          <div className="flex">
            {G.slice(0, 4).map((g) => (
              <Avatar key={g.name} className={FACE_AVATAR}>
                <Portrait name={g.name} effect="duotone" image={g.image} />
              </Avatar>
            ))}
          </div>
          <span className="font-mono text-[12px] leading-[1.4] tracking-[.02em] opacity-75">
            <b className="text-crimson">{questCount} side quests</b> funded so
            far
            <br />
            across {countryCount} countries — you could be next
          </span>
        </div>
      </div>
    </header>
  );
}
