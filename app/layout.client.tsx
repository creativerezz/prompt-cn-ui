"use client"

import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { slugs } from "./[slug]/data"
import { SidebarProvider } from "./app-sidebar"
import { Footer } from "./footer"
import { Header } from "./header"
import { AppSidebar } from "./sidebar"

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const MOBILE_SIDEBAR_VIEWPORT_THRESHOLD = 768
  const MD_SIDEBAR_VIEWPORT_THRESHOLD = 1024
  const pathname = usePathname()

  const isBlocksPage = pathname === "/blocks"
  const isPrimitivesPage = pathname === "/primitives"
  const isComponentPage = pathname.includes("/c/")
  const isFullStackPreview = pathname.includes("/p/")
  const isDemoPage = pathname.includes("/demo/")
  const isHomePage = pathname === "/"
  const slug = (pathname ?? "").replace(/^\/+/, "").split("/")[0]
  const isLanding = slugs.includes(slug)

  if (isComponentPage || isFullStackPreview || isDemoPage) {
    return <>{children}</>
  }

  return (
    <SidebarProvider
      defaultOpen={true}
      viewportWidth={MOBILE_SIDEBAR_VIEWPORT_THRESHOLD}
      mdViewportWidth={MD_SIDEBAR_VIEWPORT_THRESHOLD}
    >
      <AppSidebar />
      <div className="relative min-w-0 flex-1">
        <Header triggerViewportWidth={MOBILE_SIDEBAR_VIEWPORT_THRESHOLD} />
        <div
          className={cn(
            "mx-auto flex min-h-svh w-full flex-col px-5 pt-24 sm:px-8 md:px-10 md:pt-16 lg:px-12 lg:pt-20",
            isBlocksPage || isPrimitivesPage || isLanding || isHomePage
              ? "max-w-7xl"
              : "max-w-4xl"
          )}
        >
          <main className="min-w-0 flex-1">{children}</main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  )
}
