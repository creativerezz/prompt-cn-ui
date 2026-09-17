"use client"

import { routes } from "@/app/routes"
import { cn } from "@/lib/utils"
import * as Dialog from "@radix-ui/react-dialog"
import { ArrowUpRight, Search, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useId, useRef, useState } from "react"

const sectionLabels = {
  core: "Getting started",
  component: "Components",
  block: "Blocks",
  primitive: "Primitives",
}

export function DocsSearch() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const id = useId()
  const listId = `${id}-results`
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean)
  const results = routes.filter((route) => {
    const text =
      `${route.label} ${route.path} ${sectionLabels[route.type]}`.toLowerCase()
    return terms.every((term) => text.includes(term))
  })
  const activeResult = results[activeIndex]

  function changeOpen(nextOpen: boolean) {
    setOpen(nextOpen)
    if (nextOpen) {
      setQuery("")
      setActiveIndex(0)
    }
  }

  function selectResult(path: string) {
    setOpen(false)
    router.push(path)
  }

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if (
        event.key.toLowerCase() === "k" &&
        (event.metaKey || event.ctrlKey) &&
        !event.altKey &&
        !event.isComposing &&
        !event.repeat
      ) {
        event.preventDefault()
        setOpen((current) => !current)
        setQuery("")
        setActiveIndex(0)
      }
    }
    document.addEventListener("keydown", handleShortcut)
    return () => document.removeEventListener("keydown", handleShortcut)
  }, [])

  useEffect(() => {
    if (open) {
      resultsRef.current
        ?.querySelector('[aria-selected="true"]')
        ?.scrollIntoView({ block: "nearest" })
    }
  }, [activeIndex, query, open])

  return (
    <Dialog.Root open={open} onOpenChange={changeOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Search documentation"
          aria-keyshortcuts="Meta+K Control+K"
          className="border-input bg-muted/40 text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:ring-ring inline-flex h-11 min-w-0 items-center gap-2 rounded-md border px-3 text-sm outline-none focus-visible:ring-2 sm:w-64 md:h-9"
        >
          <Search aria-hidden="true" className="size-4 shrink-0" />
          <span className="truncate">
            Search<span className="hidden sm:inline"> docs</span>…
          </span>
          <kbd
            aria-hidden="true"
            className="border-border bg-background ml-auto hidden shrink-0 rounded border px-1.5 font-mono text-[10px] sm:inline-flex"
          >
            ⌘ / Ctrl K
          </kbd>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-black/40" />
        <Dialog.Content
          className="border-border bg-popover text-popover-foreground fixed top-[12svh] left-1/2 z-[71] flex max-h-[76svh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 flex-col overflow-hidden rounded-lg border outline-none"
          onOpenAutoFocus={(event) => {
            event.preventDefault()
            inputRef.current?.focus()
          }}
        >
          <Dialog.Title className="sr-only">Search documentation</Dialog.Title>
          <Dialog.Description className="sr-only">
            Search pages, components, blocks, and primitives. Use the up and
            down arrow keys to choose a result, then Enter to open it.
          </Dialog.Description>
          <div className="border-border flex items-center gap-2 border-b px-3">
            <Search
              aria-hidden="true"
              className="text-muted-foreground size-4 shrink-0"
            />
            <input
              ref={inputRef}
              role="combobox"
              aria-label="Search documentation"
              aria-autocomplete="list"
              aria-expanded={true}
              aria-controls={listId}
              aria-activedescendant={
                activeResult ? `${id}-result-${activeIndex}` : undefined
              }
              autoComplete="off"
              spellCheck={false}
              placeholder="Search documentation…"
              value={query}
              className="placeholder:text-muted-foreground h-14 min-w-0 flex-1 bg-transparent text-base outline-none sm:text-sm"
              onChange={(event) => {
                setQuery(event.target.value)
                setActiveIndex(0)
              }}
              onKeyDown={(event) => {
                if (event.nativeEvent.isComposing) return
                if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                  event.preventDefault()
                  if (!results.length) return
                  const step = event.key === "ArrowDown" ? 1 : -1
                  setActiveIndex(
                    (index) => (index + step + results.length) % results.length
                  )
                } else if (event.key === "Enter" && activeResult) {
                  event.preventDefault()
                  selectResult(activeResult.path)
                }
              }}
            />
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close search"
                className="text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:ring-ring flex size-11 shrink-0 items-center justify-center rounded-md outline-none focus-visible:ring-2 md:size-9"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            </Dialog.Close>
          </div>
          <div
            ref={resultsRef}
            id={listId}
            role="listbox"
            aria-label="Documentation pages"
            className="min-h-0 overflow-y-auto overscroll-contain p-2"
          >
            {results.map((route, index) => (
              <div
                key={route.path}
                id={`${id}-result-${index}`}
                role="option"
                aria-selected={index === activeIndex}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-md px-3 py-3 text-sm",
                  index === activeIndex && "bg-accent text-accent-foreground"
                )}
                onPointerMove={() => setActiveIndex(index)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => selectResult(route.path)}
              >
                <span className="min-w-0 flex-1 truncate">{route.label}</span>
                <span className="text-muted-foreground text-xs">
                  {sectionLabels[route.type]}
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="text-muted-foreground size-4 shrink-0"
                />
              </div>
            ))}
          </div>
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className={cn(
              "text-muted-foreground text-xs",
              results.length ? "sr-only" : "px-6 py-8 text-center text-sm"
            )}
          >
            {results.length
              ? `${results.length} results available.`
              : `No results for “${query}”. Try a component name, blocks, or primitives.`}
          </div>
          <div
            aria-hidden="true"
            className="border-border text-muted-foreground border-t px-4 py-3 text-xs"
          >
            ↑ ↓ to navigate <span className="mx-2">·</span> Enter to open{" "}
            <span className="mx-2">·</span> Esc to close
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
