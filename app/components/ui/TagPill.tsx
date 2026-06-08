import { tagColors } from "../../lib/data";

export default function TagPill({ tag }: { tag: string }) {
  return (
    <span
      className="mr-1 inline-block rounded-full border px-[7px] py-[3px] font-mono text-[10px] tracking-[.03em]"
      style={{
        background: `${tagColors[tag] || "#ccc"}33`,
        borderColor: tagColors[tag] || "#999",
      }}
    >
      {tag}
    </span>
  );
}
