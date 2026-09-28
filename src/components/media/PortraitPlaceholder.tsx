import { site } from "@/content/site";

/**
 * Stand-in for the journalist's portrait. Deliberately not a photograph of a
 * real person, so no one is misrepresented as the journalist. Replace with a
 * <Picture> of your own portrait (see docs/CONTENT_GUIDE.md).
 */
export function PortraitPlaceholder({ className = "" }: { className?: string }) {
  const initials = site.name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      role="img"
      aria-label={`Portrait placeholder for ${site.name}`}
      className={`relative isolate aspect-[4/5] overflow-hidden bg-charcoal text-white ${className}`}
    >
      <svg aria-hidden="true" className="absolute inset-0 size-full opacity-[0.14]" preserveAspectRatio="none">
        <defs>
          <pattern id="portrait-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M28 0H0V28" fill="none" stroke="white" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#portrait-grid)" />
      </svg>
      <div
        aria-hidden="true"
        className="absolute -right-[18%] -bottom-[22%] size-[85%] rounded-full bg-cobalt/35 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 grid place-items-center font-serif text-[clamp(5rem,14vw,9rem)] leading-none tracking-[-0.04em] text-white/90"
      >
        {initials}
      </span>
      <span className="kicker absolute bottom-4 left-4 text-[0.6875rem] text-white/70">
        Portrait placeholder
      </span>
    </div>
  );
}
