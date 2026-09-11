"use client"

import { ModelSelect, type ModelOption } from "@/components/prompt-kit/model-select"
import { useState } from "react"

const models: ModelOption[] = [
  { id: "gpt-4.1", label: "GPT-4.1", provider: "OpenAI" },
  { id: "claude-sonnet-4", label: "Claude Sonnet 4", provider: "Anthropic" },
  { id: "gemini-2.5-pro", label: "Gemini 2.5 Pro", provider: "Google" },
]

export function ModelSelectBasic() {
  const [value, setValue] = useState("gpt-4.1")

  return <ModelSelect models={models} value={value} onValueChange={setValue} />
}
