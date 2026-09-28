import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { site } from "@/content/site";

/** Small label marking example/placeholder content. */
export function PlaceholderTag({
  children = "Placeholder",
  tone = "light",
  className = "",
}: {
  children?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  if (!site.showPlaceholderLabels) return null;
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.6875rem] font-semibold tracking-[0.08em] uppercase",
        tone === "dark"
          ? "border-white/25 bg-white/10 text-white/85"
          : "border-rule-strong bg-surface text-slate-ink",
        className,
      ].join(" ")}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-[#d9822b]" />
      {children}
    </span>
  );
}

/** Kicker + rule used above section headings. */
export function SectionLabel({
  children,
  index,
  tone = "light",
}: {
  children: ReactNode;
  index?: string;
  tone?: "light" | "dark";
}) {
  const muted = tone === "dark" ? "text-slate-light" : "text-slate-ink";
  return (
    <div className={`flex items-center gap-4 ${muted}`}>
      {index && <span className="kicker tabular">{index}</span>}
      <span aria-hidden="true" className={`h-px w-10 ${tone === "dark" ? "bg-white/30" : "bg-rule-strong"}`} />
      <span className="kicker">{children}</span>
    </div>
  );
}

type ButtonTone = "primary" | "secondary" | "ghost-dark";

const buttonTones: Record<ButtonTone, string> = {
  primary:
    "bg-cobalt text-white hover:bg-cobalt-deep active:scale-[0.98] shadow-[0_1px_0_rgb(0_0_0/0.06)]",
  secondary:
    "border border-rule-strong text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-ivory active:scale-[0.98]",
  "ghost-dark":
    "border border-white/35 text-white hover:border-white hover:bg-white hover:text-charcoal active:scale-[0.98]",
};

const buttonBase =
  "group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 text-[0.9375rem] font-medium tracking-[-0.005em] transition-[background-color,color,border-color,transform] duration-200 ease-out";

/** Link styled as a button. Internal routes use next/link. */
export function ButtonLink({
  href,
  tone = "primary",
  children,
  icon = "arrow",
  className = "",
  ...rest
}: {
  href: string;
  tone?: ButtonTone;
  children: ReactNode;
  icon?: "arrow" | "external" | "none";
  className?: string;
} & Omit<ComponentProps<"a">, "href">) {
  const Icon = icon === "external" ? ArrowUpRight : icon === "arrow" ? ArrowRight : null;
  const content = (
    <>
      <span>{children}</span>
      {Icon && (
        <Icon
          aria-hidden="true"
          className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
          strokeWidth={1.75}
        />
      )}
    </>
  );
  const cls = `${buttonBase} ${buttonTones[tone]} ${className}`;
  if (href.startsWith("/") && !href.endsWith(".pdf")) {
    return (
      <Link href={href} className={cls} {...rest}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} {...rest}>
      {content}
    </a>
  );
}

export { buttonBase, buttonTones };
