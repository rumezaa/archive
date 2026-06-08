import type { ReactNode } from "react";

/** Stylized wall portrait effects, cycled across the faces marquee. */
export const WALLFX = ["posterize", "dither","hatch"] as const;

export const HOW_TITLES = [
  "pitch your side quest",
  "hear back in 48 hours",
  "get funded",
  "press play",
  "document the journey",
  "join the archive",
];

type StepVis = {
  bg: string;
  cap: string;
  dark?: boolean;
  icon: (ink: string, bg: string) => string;
};

export const STEP_VIS: StepVis[] = [
  {
    bg: "#F9B6B8",
    cap: "the idea you can't shake — one short application, no deck.",
    icon: (ink) =>
      `<rect x="-72" y="-58" width="144" height="92" rx="16"/><path d="M-34 34 L-8 34 L-44 64 Z" fill="${ink}" stroke="none"/><path d="M0 -42 L17 -8 L1 -16 L-15 -8 Z" fill="${ink}" stroke="none"/>`,
  },
  {
    bg: "#BAD2E8",
    cap: "real humans, fast — we reply within 48 hours, every time.",
    icon: () =>
      `<circle r="56"/><path d="M0 0 V-34"/><path d="M0 0 L28 14"/><path d="M48 -56 a76 76 0 0 1 16 32"/>`,
  },
  {
    bg: "#C6B63B",
    cap: "$0–$1000 plus a refundable deposit — enough to make it happen.",
    icon: () =>
      `<ellipse cx="0" cy="-34" rx="50" ry="15"/><path d="M-50 -34 V-4 a50 15 0 0 0 100 0 V-34"/><ellipse cx="0" cy="4" rx="50" ry="15"/><path d="M-50 4 V34 a50 15 0 0 0 100 0 V4"/>`,
  },
  {
    bg: "#F37521",
    cap: "go do the thing. this part is entirely yours.",
    icon: (ink) =>
      `<g transform="scale(6.6) translate(-16,-15)" stroke-width="1.4"><path d="M16 3 L28 27 L16.5 21.5 L4 27 Z" fill="#F6F3CF" stroke="${ink}"/><circle cx="15.2" cy="12.2" r="1.7" fill="${ink}"/></g>`,
  },
  {
    bg: "#F4DFC4",
    cap: "scrappy is perfect — a video diary, a blog, a photo set.",
    icon: (ink) =>
      `<rect x="-70" y="-30" width="140" height="78" rx="13"/><path d="M-38 -30 l11 -18 h34 l11 18"/><circle cx="0" cy="9" r="23"/><circle cx="48" cy="-12" r="4.5" fill="${ink}"/>`,
  },
  {
    bg: "#8B162B",
    dark: true,
    cap: "your questline lives here forever — welcome to the archive.",
    icon: (ink, bg) => {
      const pin = (x: number) =>
        `<g transform="translate(${x},36)"><path d="M0 0 C-13 -18 -13 -36 0 -36 C13 -36 13 -18 0 0 Z" fill="${ink}" stroke="none"/><circle cx="0" cy="-23" r="6" fill="${bg}"/></g>`;
      return (
        `<path d="M-80 36 H80" stroke-dasharray="7 9"/>` +
        pin(-52) +
        pin(0) +
        pin(52)
      );
    },
  },
];

export function buildStepSVG(i: number): string {
  const d = STEP_VIS[i];
  const pid = `hv${i}`;
  const ink = d.dark ? "#F6F3CF" : "#8B162B";
  const numCol = d.dark ? "rgba(246,243,207,.13)" : "rgba(58,10,19,.11)";
  const dotCol = d.dark ? "rgba(246,243,207,.12)" : "rgba(58,10,19,.14)";
  return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs><pattern id="${pid}" width="13" height="13" patternUnits="userSpaceOnUse"><circle cx="6.5" cy="6.5" r="1.9" fill="${dotCol}"/></pattern></defs>
    <rect width="400" height="300" fill="${d.bg}"/><rect width="400" height="300" fill="url(#${pid})"/>
    <text x="384" y="290" font-family="Bricolage Grotesque,serif" font-size="172" font-weight="800" fill="${numCol}" text-anchor="end">0${i + 1}</text>
    <g transform="translate(200,142)" stroke="${ink}" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round">${d.icon(ink, d.bg)}</g>
  </svg>`;
}

export type Step = { title: string; p: string; pill?: string };

export const STEPS: Step[] = [
  {
    title: "pitch your side quest",
    p: "tell us the scene that won't leave your head. no deck, no resume — just the idea and why it has to be you. one short application.",
  },
  {
    title: "hear back in 48 hours",
    p: "real humans read every application. we move at the speed of your spontaneity, so you're never left waiting on a quest that has a deadline.",
  },
  {
    title: "get funded",
    p: "between $0 and $1000 lands to make it real. we hold a small refundable deposit that comes straight back the moment you document.",
    pill: "$0–$1000 microgrant · $50 refundable deposit",
  },
  {
    title: "press play",
    p: "go do the thing. the trip, the popup, the reunion, the build, the wild one-night idea. this part is entirely yours.",
  },
  {
    title: "document the journey",
    p: "scrappy is perfect — a video diary, a blog, a photo set. capture what it felt like. the documentation playbook walks you through exactly what to send.",
  },
  {
    title: "join the archive",
    p: "your questline lives in the database forever, and you join a community of questers, alumni, and backers for good.",
  },
];

export type Playbook = {
  cls: "c1" | "c2" | "c3";
  no: string;
  title: string;
  desc: string;
  icon: ReactNode;
};

export const PLAYBOOKS: Playbook[] = [
  {
    cls: "c1",
    no: "playbook 01",
    title: "applicant playbook",
    desc: "what makes a side quest fundable, how we read applications, what to include, and the things we'll never fund. read this before you apply.",
    icon: (
      <svg viewBox="0 0 42 42" fill="none" stroke="#8B162B" strokeWidth="2">
        <circle cx="21" cy="21" r="17" />
        <path d="M27 15 L23 23 L15 27 L19 19 Z" fill="#F37521" stroke="#8B162B" />
      </svg>
    ),
  },
];
