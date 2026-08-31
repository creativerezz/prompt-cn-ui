import { SidebarTrigger } from "@/app/app-sidebar"
import { PromptKitLogo } from "@/components/app/icon/prompt-kit-logo"
import { useBreakpoint } from "@/hooks/use-breakpoint"
import Link from "next/link"

export type HeaderProps = {
  triggerViewportWidth: number
}

export function Header({ triggerViewportWidth }: HeaderProps) {
  const isMobileView = useBreakpoint(triggerViewportWidth)

  if (!isMobileView) {
    return null
  }

  return (
    <nav className="border-border/80 bg-background/90 fixed inset-x-2 top-[calc(env(safe-area-inset-top)+0.5rem)] z-60 rounded-xl border px-2 py-1.5 shadow-md backdrop-blur-xl sm:inset-x-3 sm:px-3 sm:py-2 md:hidden">
      <div className="text-foreground mx-auto flex min-h-11 items-center justify-between">
        <Link
          href="/"
          aria-label="Prompt Kit home"
          className="flex min-h-11 min-w-0 items-center gap-2 rounded-lg px-1"
        >
          <span className="bg-primary text-primary-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
            <PromptKitLogo className="size-4" />
          </span>
          <span className="truncate text-sm font-semibold tracking-[-0.02em] lowercase">
            prompt-kit
          </span>
        </Link>
        <SidebarTrigger className="border-border bg-secondary/60 text-muted-foreground hover:bg-accent hover:text-foreground size-11 shrink-0 rounded-lg border" />
      </div>
    </nav>
  )
}
