import type { ReactNode } from "react";

/** Centered max-width page container (was `.wrap`). */
export default function Wrap({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-auto max-w-[1180px] px-7 ${className}`}>{children}</div>
  );
}
