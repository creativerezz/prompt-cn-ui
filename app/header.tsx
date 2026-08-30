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
    <nav className="border-border/80 bg-background/85 fixed inset-x-3 top-3 z-60 rounded-xl border px-3 py-2 shadow-lg shadow-black/20 backdrop-blur-xl md:hidden">
      <div className="text-foreground mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg">
            <PromptKitLogo className="size-4" />
          </span>
          <span className="text-sm font-semibold tracking-[-0.02em] lowercase">
            prompt-kit
          </span>
        </Link>
        <SidebarTrigger className="border-border bg-secondary/60 text-muted-foreground hover:bg-accent hover:text-foreground size-8 rounded-lg border" />
      </div>
    </nav>
  )
}
