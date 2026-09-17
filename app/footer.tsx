import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getNavigation } from "./routes"

export function Footer() {
  const pathname = usePathname()
  const navigation = getNavigation(pathname)

  return (
    <div className="flex justify-between pt-12 pb-20">
      {navigation && navigation.prev ? (
        <Link
          href={navigation.prev.path}
          className="text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:ring-ring inline-flex min-h-9 items-center gap-1 rounded-md border px-3 py-1 text-sm transition-colors duration-100 outline-none focus-visible:ring-2"
        >
          <ChevronLeft className="h-4 w-4" />
          {navigation.prev.label}
        </Link>
      ) : (
        <div className="w-full" />
      )}

      {navigation && navigation.next && (
        <Link
          href={navigation.next.path}
          className="text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:ring-ring inline-flex min-h-9 items-center gap-1 rounded-md border px-3 py-1 text-sm transition-colors duration-100 outline-none focus-visible:ring-2"
        >
          {navigation.next.label} <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  )
}
