"use client";

import { Printer } from "lucide-react";

import { buttonBase, buttonTones } from "./primitives";

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className={`${buttonBase} ${buttonTones.secondary}`}>
      <Printer aria-hidden="true" className="size-4" strokeWidth={1.75} />
      Print résumé
    </button>
  );
}
