import Image from "next/image";
import Wrap from "../ui/Wrap";
import { LINKS } from "../../lib/links";

const FOOT_LINK =
  "mb-[9px] block text-[14px] opacity-80 transition-[opacity,color] duration-150 hover:opacity-100";

const COLS = [
  {
    head: "explore",
    headColor: "text-arctic",
    hover: "hover:text-arctic",
    links: [
      ["#how", "how we work"],
      ["#faces", "the faces"],
      ["#atlas", "the atlas"],
      ["#database", "the database"],
      ["#donate", "donate"],
    ],
  },
  {
    head: "program",
    headColor: "text-pear",
    hover: "hover:text-pear",
    links: [
      [LINKS.apply, "apply"],
      ["#playbooks", "playbooks"],
      [LINKS.slack, "slack community"],
      [LINKS.launchFilm, "the launch film"],
    ],
  },
  {
    head: "follow",
    headColor: "text-rose",
    hover: "hover:text-rose",
    links: [
      [LINKS.slack, "slack"],
      [LINKS.twitter, "twitter / x"],
      [LINKS.instagram, "instagram"],
      [LINKS.linkedin, "linkedin"],
      ["mailto:thearchivefund@gmail.com", "email us"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t-[1.5px] border-line-strong bg-ink text-latte">
      <Wrap className="flex flex-wrap justify-between gap-[30px] pb-[38px] pt-[46px]">
        <div>
          <Image
            src="/archive-latte.svg"
            alt="Archive"
            width={2997}
            height={1270}
            className="h-[40px] w-auto"
          />
          <p className="mt-[14px] max-w-[34ch] font-mono text-[12px] leading-[1.5] opacity-75">
            microgrants for spontaneous, purpose-driven side quests. we help
            people press play on the scene in their head.
          </p>
        </div>

        <div className="flex flex-wrap gap-[54px]">
          {COLS.map((col) => (
            <div key={col.head}>
              <h4
                className={`mb-[14px] font-mono text-[11px] uppercase tracking-[.12em] ${col.headColor}`}
              >
                {col.head}
              </h4>
              {col.links.map(([href, label]) => (
                <a
                  key={label}
                  href={href}
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={`${FOOT_LINK} ${col.hover}`}
                >
                  {label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </Wrap>

      <Wrap className="flex flex-wrap justify-between gap-[10px] border-t border-[rgba(246,243,207,.2)] py-[18px] font-mono text-[11.5px] opacity-70">
        <span>© 2026 the archive foundation</span>
        <span>
          press play <span className="text-pear">✦</span>
        </span>
      </Wrap>
    </footer>
  );
}
