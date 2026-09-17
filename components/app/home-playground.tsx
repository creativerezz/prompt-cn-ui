"use client"

import { QuickCopyButton } from "@/components/app/quick-copy-button"
import {
  PromptInput,
  PromptInputActions,
  PromptInputTextarea,
} from "@/components/prompt-kit/prompt-input"
import { Button } from "@/components/ui/button"
import * as Tabs from "@radix-ui/react-tabs"
import { ArrowUp, CornerDownLeft, RotateCcw, Terminal } from "lucide-react"
import { useState } from "react"

const sample = `"use client"

import { useState } from "react"
import {
  PromptInput,
  PromptInputActions,
  PromptInputTextarea,
} from "@/components/prompt-kit/prompt-input"
import { Button } from "@/components/ui/button"

export function Composer() {
  const [value, setValue] = useState("")

  function submit() {
    if (!value.trim()) return
    // Connect your model or API here.
    setValue("")
  }

  return (
    <PromptInput value={value}
      onValueChange={setValue} onSubmit={submit}>
      <PromptInputTextarea placeholder="Ask anything…" />
      <PromptInputActions>
        <Button onClick={submit} disabled={!value.trim()}>
          Send message
        </Button>
      </PromptInputActions>
    </PromptInput>
  )
}`

const suggestions = [
  "Build a chat interface",
  "Explore the components",
  "Connect my own model",
]

export function HomePlayground() {
  const [value, setValue] = useState("")
  const [submitted, setSubmitted] = useState("")

  function submit() {
    if (!value.trim()) return
    setSubmitted(value.trim())
    setValue("")
  }

  return (
    <Tabs.Root
      defaultValue="preview"
      className="bg-card overflow-hidden rounded-lg border"
    >
      <div className="flex min-h-12 flex-wrap items-center justify-between gap-2 border-b px-4">
        <Tabs.List
          aria-label="Component view"
          className="flex h-12 items-center gap-5"
        >
          {["Preview", "Code"].map((label) => (
            <Tabs.Trigger
              key={label}
              value={label.toLowerCase()}
              className="text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-foreground focus-visible:ring-ring h-full border-b-2 border-transparent text-sm font-medium outline-none focus-visible:ring-2"
            >
              {label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <span className="text-muted-foreground hidden items-center gap-2 font-mono text-xs sm:flex">
          <Terminal className="size-3.5" aria-hidden="true" /> prompt-input.tsx
        </span>
      </div>
      <Tabs.Content
        value="preview"
        className="focus-visible:ring-ring outline-none focus-visible:ring-2"
      >
        <div className="flex min-h-[300px] flex-col items-center justify-center px-5 py-8 sm:px-10">
          <div className="w-full max-w-xl">
            <div className="mb-7 text-center">
              <div className="bg-secondary mx-auto mb-3 flex size-9 items-center justify-center rounded-lg border">
                <Terminal className="size-4" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-medium tracking-tight">
                What will you build?
              </h3>
              <p className="text-muted-foreground mt-1.5 text-sm">
                Your interface. Your model. Your code.
              </p>
            </div>
            <PromptInput
              value={value}
              onValueChange={setValue}
              onSubmit={submit}
              className="focus-within:ring-ring/50 rounded-xl p-3 shadow-none focus-within:ring-2"
            >
              <PromptInputTextarea
                aria-label="Try the prompt input"
                placeholder="Ask anything…"
                className="min-h-16 text-sm"
              />
              <PromptInputActions className="justify-between">
                <span className="text-muted-foreground px-2 text-xs">
                  Local preview · no API key needed
                </span>
                <Button
                  size="icon"
                  className="size-11 rounded-md sm:size-9"
                  onClick={submit}
                  disabled={!value.trim()}
                  aria-label="Send preview message"
                >
                  <ArrowUp className="size-4" aria-hidden="true" />
                </Button>
              </PromptInputActions>
            </PromptInput>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {suggestions.map((suggestion) => (
                <button
                  type="button"
                  key={suggestion}
                  onClick={() => setValue(suggestion)}
                  className="text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:ring-ring min-h-11 rounded-md border px-3 py-1.5 text-xs outline-none focus-visible:ring-2 sm:min-h-9"
                >
                  {suggestion}
                </button>
              ))}
            </div>
            <div
              role="status"
              className="text-muted-foreground mt-4 text-center text-xs"
            >
              {submitted ? (
                <div className="flex items-start justify-center gap-2">
                  <p className="min-w-0 break-words">
                    Received: “{submitted}”. This is a local preview; no message
                    was sent to a model.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted("")
                      setValue("")
                    }}
                    aria-label="Reset preview"
                    className="hover:text-foreground focus-visible:ring-ring shrink-0 rounded p-1 outline-none focus-visible:ring-2"
                  >
                    <RotateCcw className="size-3.5" aria-hidden="true" />
                  </button>
                </div>
              ) : (
                <span className="inline-flex items-center gap-1.5">
                  <CornerDownLeft className="size-3" aria-hidden="true" /> Enter
                  to send · Shift + Enter for a new line
                </span>
              )}
            </div>
          </div>
        </div>
      </Tabs.Content>
      <Tabs.Content value="code" className="relative outline-none">
        <div className="bg-card absolute top-3 right-3 rounded-md border">
          <QuickCopyButton text={sample} label="Copy component code" />
        </div>
        <pre
          tabIndex={0}
          className="focus-visible:ring-ring max-h-[460px] min-h-[300px] overflow-auto p-5 pr-16 text-xs leading-6 outline-none focus-visible:ring-2 sm:p-6 sm:pr-16"
        >
          <code>{sample}</code>
        </pre>
      </Tabs.Content>
      <div className="text-muted-foreground bg-muted/30 flex flex-wrap items-center justify-between gap-2 border-t px-4 py-3 text-xs">
        <span>Interactive preview</span>
        <span>React · TypeScript · Tailwind CSS</span>
      </div>
    </Tabs.Root>
  )
}
