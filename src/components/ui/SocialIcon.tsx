import { Landmark, Link2, Mail, Search, Sparkles, Trophy, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image, { type StaticImageData } from "next/image";

import rockbridgeReportLogo from "@/assets/logos/rockbridge-report.png";
import type { SocialLink } from "@/content/types";

type IconProps = { className?: string };

// lucide-react no longer ships brand marks, so these two are inline.
function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function YouTubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />
    </svg>
  );
}

function lucide(Icon: LucideIcon) {
  return function LucideWrapped({ className }: IconProps) {
    return <Icon aria-hidden="true" className={className} strokeWidth={1.75} />;
  };
}

function logo(src: StaticImageData) {
  return function Logo({ className }: IconProps) {
    return <Image src={src} alt="" aria-hidden="true" className={`rounded-[3px] object-contain ${className ?? ""}`} />;
  };
}

// The paper's mark is a serif phi; drawn as a glyph so it stays crisp and takes the text color.
function RingTumPhiIcon({ className }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center font-serif text-[1.35rem] leading-none ${className ?? ""}`}
    >
      Φ
    </span>
  );
}
const RockbridgeReportIcon = logo(rockbridgeReportLogo);
const LinkIcon = lucide(Link2);
export const EmailIcon = lucide(Mail);

/** Logo for a profile link, picked from its name or address. */
export function SocialIcon({ link, className }: IconProps & { link: SocialLink }) {
  const key = `${link.label} ${link.url}`.toLowerCase();
  if (key.includes("linkedin")) return <LinkedInIcon className={className} />;
  if (key.includes("youtube")) return <YouTubeIcon className={className} />;
  if (key.includes("ring-tum") || key.includes("ringtumphi")) return <RingTumPhiIcon className={className} />;
  if (key.includes("rockbridge")) return <RockbridgeReportIcon className={className} />;
  return <LinkIcon className={className} />;
}

/** Icon for an interest, picked from keywords in its title. */
export function InterestIcon({ title, className }: IconProps & { title: string }) {
  const key = title.toLowerCase();
  const Icon = key.includes("investigat")
    ? Search
    : key.includes("sport")
    ? Trophy
    : key.includes("community")
    ? Users
    : key.includes("histor")
    ? Landmark
    : Sparkles;
  return <Icon aria-hidden="true" className={className} strokeWidth={1.5} />;
}

/** Round, icon-only link used for the "Elsewhere" lists. */
export const iconLinkClass =
  "inline-flex size-11 items-center justify-center rounded-full border border-rule text-charcoal transition-[border-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-cobalt hover:text-cobalt";
