import type { CSSProperties, ReactNode } from "react";

/** Rounded-rect, clipped frame for a <Portrait>. Size via className. */
export default function PortraitFrame({
  className = "",
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <span
      className={`block overflow-hidden rounded-[4px] bg-rose ${className}`}
      style={style}
    >
      {children}
    </span>
  );
}
