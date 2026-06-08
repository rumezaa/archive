"use client";

import { useState } from "react";
import Image from "next/image";
import Wrap from "../ui/Wrap";
import Btn from "../ui/Btn";
import { LINKS, EXT } from "../../lib/links";

const LINK =
  "font-mono text-[12.5px] tracking-[.02em] text-ink opacity-[.72] transition-[opacity,color] duration-200 hover:opacity-100 hover:text-crimson";

const NAV_LINKS = [
  { href: "#how", label: "how we work" },
  { href: "#atlas", label: "the atlas" },
  { href: "#playbooks", label: "playbooks" },
  { href: "#database", label: "the database" },
  { href: "#community", label: "community" },
  { href: "#donate", label: "donate" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const openCls =
    "max-[780px]:flex max-[780px]:absolute max-[780px]:left-0 max-[780px]:right-0 max-[780px]:top-[68px] " +
    "max-[780px]:flex-col max-[780px]:gap-[18px] max-[780px]:border-b-[1.5px] max-[780px]:border-line-strong " +
    "max-[780px]:bg-latte max-[780px]:px-7 max-[780px]:py-[22px]";

  return (
    <nav className="sticky top-0 z-[60] border-b-[1.5px] border-line-strong bg-[rgba(246,243,207,.82)] backdrop-blur-[7px] backdrop-saturate-[1.2]">
      <Wrap className="flex h-[68px] items-center justify-between">
        <a className="flex items-center" href="#top">
          <Image
            src="/archive.svg"
            alt="Archive"
            width={2997}
            height={1270}
            priority
            className="h-[34px] w-auto"
          />
        </a>

        <div
          className={`flex items-center gap-5 ${
            menuOpen ? openCls : "max-[780px]:hidden"
          }`}
        >
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className={LINK} onClick={closeMenu}>
              {l.label}
            </a>
          ))}
          <Btn variant="fill" href={LINKS.apply} {...EXT} onClick={closeMenu}>
            apply &nbsp;➔
          </Btn>
        </div>

        <button
          className="hidden cursor-pointer border-0 bg-transparent max-[780px]:inline-flex"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="menu"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            stroke="#8B162B"
            strokeWidth="2"
          >
            <path d="M3 7h20M3 13h20M3 19h20" />
          </svg>
        </button>
      </Wrap>
    </nav>
  );
}
