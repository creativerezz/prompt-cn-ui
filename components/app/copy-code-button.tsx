"use client"

import { TextMorph } from "@/components/ui/text-morph"
import { useState } from "react"

type CopyCodeButtonProps = {
  code: string
}

export function CopyCodeButton({ code }: CopyCodeButtonProps) {
  const [hasCopyLabel, setHasCopyLabel] = useState(false)

  const onCopy = () => {
    navigator.clipboard.writeText(code)
    setHasCopyLabel(true)

    setTimeout(() => {
      setHasCopyLabel(false)
    }, 1000)
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className="rounded-[2px] border px-2 py-1 text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800"
    >
      <TextMorph>{hasCopyLabel ? "Copied" : "Copy"}</TextMorph>
    </button>
  )
}
