import type { CSSProperties, ReactNode } from "react";

/** Round, clipped frame for a <Portrait>. Size via className (e.g. "h-10 w-10"). */
export default function Avatar({
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
      className={`inline-block flex-none overflow-hidden rounded-full bg-rose ${className}`}
      style={style}
    >
      {children}
    </span>
  );
}
