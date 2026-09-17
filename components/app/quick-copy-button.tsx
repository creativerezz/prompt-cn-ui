"use client"

import { Check, Copy } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function QuickCopyButton({
  text,
  label = "Copy command",
}: {
  text: string
  label?: string
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle")
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (timeout.current) clearTimeout(timeout.current)
    },
    []
  )

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setStatus("copied")
    } catch {
      setStatus("error")
    }
    if (timeout.current) clearTimeout(timeout.current)
    timeout.current = setTimeout(() => setStatus("idle"), 2500)
  }

  return (
    <span className="inline-flex shrink-0 items-center gap-2">
      <span
        role="status"
        className={
          status === "error" ? "text-muted-foreground text-xs" : "sr-only"
        }
      >
        {status === "copied"
          ? "Copied to clipboard"
          : status === "error"
            ? "Could not copy. Select the text instead."
            : ""}
      </span>
      <button
        type="button"
        onClick={copy}
        aria-label={status === "copied" ? "Copied to clipboard" : label}
        className="text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:ring-ring inline-flex size-9 items-center justify-center rounded-md outline-none focus-visible:ring-2"
      >
        {status === "copied" ? (
          <Check className="size-4" aria-hidden="true" />
        ) : (
          <Copy className="size-4" aria-hidden="true" />
        )}
      </button>
    </span>
  )
}
