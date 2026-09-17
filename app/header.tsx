"use client"

import { SidebarTrigger } from "@/app/app-sidebar"
import { DocsSearch } from "@/components/app/docs-search"
import { PromptKitLogo } from "@/components/app/icon/prompt-kit-logo"
import { useBreakpoint } from "@/hooks/use-breakpoint"
import { kit } from "@/lib/site"
import Link from "next/link"

export type HeaderProps = {
  triggerViewportWidth: number
}

export function Header({ triggerViewportWidth }: HeaderProps) {
  const isMobileView = useBreakpoint(triggerViewportWidth)

  return (
    <header className="border-border bg-background sticky top-0 z-30 flex h-14 items-center gap-3 border-b px-4 sm:px-6">
      {isMobileView ? (
        <>
          <SidebarTrigger className="text-muted-foreground hover:bg-accent hover:text-foreground size-11 shrink-0 rounded-md" />
          <Link
            href="/"
            prefetch={false}
            aria-label={`${kit.name} home`}
            className="focus-visible:ring-ring flex min-w-0 items-center gap-2 rounded-sm outline-none focus-visible:ring-2"
          >
            <PromptKitLogo aria-hidden="true" className="size-5 shrink-0" />
            <span className="truncate text-sm font-semibold tracking-tight">
              {kit.name}
            </span>
          </Link>
        </>
      ) : (
        <span className="text-muted-foreground text-sm">Documentation</span>
      )}
      <div className="ml-auto shrink-0">
        <DocsSearch />
      </div>
    </header>
  )
}
