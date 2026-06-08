import type { AnchorHTMLAttributes, ReactNode } from "react";

const BASE =
  "inline-flex items-center gap-2 cursor-pointer rounded-[2px] border-[1.5px] border-crimson " +
  "px-[18px] py-[11px] font-mono text-[12.5px] font-bold tracking-[.04em] lowercase " +
  "transition-[transform,background-color,border-color,color,box-shadow] duration-200";

const VARIANTS = {
  fill:
    "bg-crimson text-latte hover:bg-sienna hover:border-sienna " +
    "hover:shadow-[4px_4px_0_var(--color-ink)] hover:translate-x-[-2px] hover:translate-y-[-2px]",
  ghost:
    "hover:bg-crimson hover:text-latte " +
    "hover:shadow-[4px_4px_0_var(--color-sienna)] hover:translate-x-[-2px] hover:translate-y-[-2px]",
} as const;

type BtnProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: keyof typeof VARIANTS;
  children: ReactNode;
};

export default function Btn({
  variant = "ghost",
  className = "",
  children,
  ...rest
}: BtnProps) {
  return (
    <a className={`${BASE} ${VARIANTS[variant]} ${className}`} {...rest}>
      {children}
    </a>
  );
}
