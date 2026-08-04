"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CopyIpButton({ ip }: { ip: string }) {
  const [copied, setCopied] = useState(false);

  async function copyIp() {
    await navigator.clipboard.writeText(ip);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <Button onClick={copyIp} variant="outline" aria-label="Copy server IP">
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied" : "Copy IP"}
    </Button>
  );
}
