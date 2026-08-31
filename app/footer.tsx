import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getNavigation } from "./routes"

export function Footer() {
  const pathname = usePathname()
  const navigation = getNavigation(pathname)

  return (
    <div className="flex min-w-0 items-start justify-between gap-2 pt-10 pb-[calc(env(safe-area-inset-bottom)+3rem)] sm:pt-12 sm:pb-20">
      {navigation && navigation.prev ? (
        <Link
          href={navigation.prev.path}
          className="text-muted-foreground hover:bg-muted inline-flex min-h-11 min-w-0 max-w-[48%] items-center gap-1 rounded-md border px-2.5 py-2 text-sm transition-colors duration-200"
        >
          <ChevronLeft className="size-4 shrink-0" />
          <span className="truncate">{navigation.prev.label}</span>
        </Link>
      ) : (
        <div className="w-full" />
      )}

      {navigation && navigation.next && (
        <Link
          href={navigation.next.path}
          className="text-muted-foreground hover:bg-muted inline-flex min-h-11 min-w-0 max-w-[48%] items-center gap-1 rounded-md border px-2.5 py-2 text-sm transition-colors duration-200"
        >
          <span className="truncate">{navigation.next.label}</span>
          <ChevronRight className="size-4 shrink-0" />
        </Link>
      )}
    </div>
  )
}
