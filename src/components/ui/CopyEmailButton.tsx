"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { buttonBase, buttonTones } from "./primitives";

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2400);
    } catch {
      window.prompt("Copy this email address:", email);
    }
  };

  return (
    <>
      <button type="button" onClick={copy} className={`${buttonBase} ${buttonTones.secondary} min-h-11 px-5`}>
        {copied ? (
          <Check aria-hidden="true" className="size-4 text-cobalt" strokeWidth={2} />
        ) : (
          <Copy aria-hidden="true" className="size-4" strokeWidth={1.75} />
        )}
        {copied ? "Copied" : "Copy address"}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </>
  );
}
