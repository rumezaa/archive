import { G } from "../../lib/data";

export default function Ticker() {
  return (
    <div className="overflow-hidden border-y-[1.5px] border-line-strong bg-crimson text-latte">
      <div className="flex animate-[scroll_34s_linear_infinite] gap-[46px] whitespace-nowrap py-[13px] font-mono text-[13px] tracking-[.06em]">
        {[0, 1].map((dup) => (
          <span
            key={dup}
            aria-hidden={dup === 1 ? "true" : undefined}
            className="inline-flex items-center gap-[46px]"
          >
            {G.map((g) => (
              <span key={g.name} className="inline-flex items-center gap-0">
                <em>{g.short}</em> <i className="text-pear">✦</i>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
