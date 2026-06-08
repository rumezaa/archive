import type { ReactNode } from "react";

type Accent = "crimson" | "sienna" | "pear" | "rose" | "arctic";

/** Accent fill, used for the eyebrow dot + rule. Fills read on both themes,
 *  unlike the pale palette colors used as text. */
const FILL: Record<Accent, string> = {
  crimson: "bg-crimson",
  sienna: "bg-sienna",
  pear: "bg-pear",
  rose: "bg-rose",
  arctic: "bg-arctic",
};

/** The recurring eyebrow-tag / title / lead trio used atop most sections. */
export default function SectionHead({
  tag,
  title,
  lead,
  dark = false,
  accent,
}: {
  tag: string;
  title: ReactNode;
  lead?: ReactNode;
  dark?: boolean;
  accent?: Accent;
}) {
  const fill = FILL[accent ?? (dark ? "pear" : "sienna")];
  return (
    <>
      <div
        className={`mb-[14px] flex items-center gap-[10px] font-mono text-[12px] uppercase tracking-[.16em] ${
          dark ? "text-pear" : "text-sienna"
        }`}
      >
        <span className={`h-2 w-2 rounded-full ${fill}`} />
        <span className={`h-[1.5px] w-[20px] ${fill}`} />
        {tag}
      </div>
      <h2
        className={`max-w-[18ch] font-disp text-[clamp(30px,4.6vw,52px)] font-bold lowercase leading-none tracking-[-.02em] ${
          dark ? "text-latte" : "text-crimson"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-[18px] max-w-[54ch] text-[17px] leading-[1.55] ${
            dark ? "opacity-[.78]" : "opacity-[.86]"
          }`}
        >
          {lead}
        </p>
      )}
    </>
  );
}
