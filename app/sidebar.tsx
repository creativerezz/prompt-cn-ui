"use client"

import { PromptKitLogo } from "@/components/app/icon/prompt-kit-logo"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import {
  Activity,
  ArrowDownToLine,
  Blocks,
  BookOpen,
  Bot,
  Boxes,
  BrainCircuit,
  Code2,
  Download,
  ExternalLink,
  FileText,
  Github,
  Home,
  ImageIcon,
  Info,
  Lightbulb,
  Link2,
  ListTree,
  LoaderCircle,
  MessageCircle,
  MessagesSquare,
  Monitor,
  Moon,
  Network,
  PackageOpen,
  Paperclip,
  Plug,
  Radio,
  Sparkles,
  Sun,
  Text,
  TextCursorInput,
  ThumbsUp,
  Twitter,
  WandSparkles,
  Wrench,
} from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "./app-sidebar"
import { routes } from "./routes"

type NavItem = {
  title: string
  url: string
  icon: LucideIcon
  isNew?: boolean
  external?: boolean
}

const coreIcons: Record<string, LucideIcon> = {
  "/": Home,
  "/docs/introduction": BookOpen,
  "/docs/installation": Download,
  "/docs/mcp": Network,
}

const componentIcons: Record<string, LucideIcon> = {
  "/docs/chain-of-thought": BrainCircuit,
  "/docs/chat-container": MessagesSquare,
  "/docs/code-block": Code2,
  "/docs/feedback-bar": ThumbsUp,
  "/docs/file-upload": Paperclip,
  "/docs/image": ImageIcon,
  "/docs/loader": LoaderCircle,
  "/docs/markdown": Text,
  "/docs/message": MessageCircle,
  "/docs/prompt-input": TextCursorInput,
  "/docs/prompt-suggestion": Sparkles,
  "/docs/reasoning": Lightbulb,
  "/docs/scroll-button": ArrowDownToLine,
  "/docs/source": Link2,
  "/docs/steps": ListTree,
  "/docs/system-message": Info,
  "/docs/text-shimmer": WandSparkles,
  "/docs/thinking-bar": Activity,
  "/docs/tool": Wrench,
}

const coreMenuItems: NavItem[] = routes
  .filter((route) => route.type === "core")
  .map((route) => ({
    title: route.label,
    url: route.path,
    icon: coreIcons[route.path] ?? BookOpen,
  }))

const componentsMenuItems: NavItem[] = routes
  .filter((route) => route.type === "component")
  .map((route) => ({
    title: route.label,
    url: route.path,
    icon: componentIcons[route.path] ?? Boxes,
    isNew: route.isNew ?? false,
  }))

const exploreMenuItems: NavItem[] = [
  { title: "Blocks", url: "/blocks", icon: Blocks },
  { title: "Primitives", url: "/primitives", icon: PackageOpen, isNew: true },
  { title: "Showcase", url: "/docs/showcase", icon: Sparkles },
]

const integrationMenuItems: NavItem[] = [
  { title: "OpenAI SDK", url: "/openai-sdk", icon: Bot },
  { title: "Vercel AI SDK", url: "/vercel-ai-sdk", icon: Radio },
  { title: "Chat UI", url: "/chat-ui", icon: MessageCircle },
  { title: "AI SDK", url: "/ai-sdk", icon: Plug },
]

const resourceMenuItems: NavItem[] = [
  { title: "llms.txt", url: "/llms.txt", icon: FileText },
  { title: "llms-full.txt", url: "/llms-full.txt", icon: FileText },
]

const communityMenuItems: NavItem[] = [
  {
    title: "GitHub",
    url: "https://github.com/ibelick/prompt-kit",
    icon: Github,
    external: true,
  },
  {
    title: "X / Twitter",
    url: "https://twitter.com/ibelick",
    icon: Twitter,
    external: true,
  },
]

function NavSection({
  label,
  items,
  currentPath,
}: {
  label: string
  items: NavItem[]
  currentPath: string
}) {
  return (
    <SidebarGroup className="px-2 py-1.5">
      <SidebarGroupLabel className="text-sidebar-foreground/45 px-2 text-xs font-medium">
        {label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="gap-0.5">
          {items.map((item) => {
            const isActive = currentPath === item.url
            const Icon = item.icon

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.title}
                  className="text-sidebar-foreground/65 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground relative h-9 rounded-lg transition-colors duration-150 data-[active=true]:font-medium"
                >
                  <Link
                    href={item.url}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "bg-sidebar-primary absolute inset-y-2 left-0 w-0.5 rounded-full opacity-0 shadow-[0_0_10px_var(--sidebar-primary)] transition-opacity",
                        isActive && "opacity-100"
                      )}
                    />
                    <Icon
                      className={cn(
                        "text-sidebar-foreground/55 size-4 shrink-0 transition-colors",
                        isActive && "text-sidebar-primary"
                      )}
                    />
                    <span>{item.title}</span>
                    {item.isNew ? (
                      <span className="border-sidebar-primary/25 bg-sidebar-primary/10 text-sidebar-primary ml-auto rounded-full border px-1.5 py-0.5 font-mono text-xs leading-none group-data-[collapsible=icon]:hidden">
                        New
                      </span>
                    ) : null}
                    {item.external ? (
                      <ExternalLink className="text-sidebar-foreground/35 ml-auto size-3 group-data-[collapsible=icon]:hidden" />
                    ) : null}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

function ThemeCycleButton() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const current = mounted ? (theme ?? "light") : "light"
  const next =
    current === "dark" ? "light" : current === "light" ? "system" : "dark"
  const label =
    current === "system"
      ? "System theme"
      : `${current[0].toUpperCase()}${current.slice(1)} theme`
  const Icon = current === "dark" ? Moon : current === "light" ? Sun : Monitor

  return (
    <SidebarMenuButton
      type="button"
      onClick={() => setTheme(next)}
      tooltip={label}
      aria-label={`${label}. Switch to ${next} theme`}
      className="text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-9 rounded-lg"
    >
      <Icon className="size-4" />
      <span>{label}</span>
      <span className="text-sidebar-foreground/35 ml-auto font-mono text-xs group-data-[collapsible=icon]:hidden">
        Cycle
      </span>
    </SidebarMenuButton>
  )
}

export function AppSidebar() {
  const currentPath = usePathname()
  const { isMobileView, setOpenMobile } = useSidebar()

  useEffect(() => {
    setOpenMobile(false)
  }, [currentPath, setOpenMobile])

  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
      className="border-none shadow-none"
    >
      {!isMobileView ? (
        <SidebarHeader className="border-sidebar-border/70 border-b p-3">
          <div className="flex items-center gap-2 group-data-[collapsible=icon]:flex-col">
            <Link
              href="/"
              className="flex min-w-0 flex-1 items-center gap-2.5 group-data-[collapsible=icon]:flex-none"
            >
              <span className="bg-sidebar-primary text-sidebar-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-lg shadow-[0_0_24px_color-mix(in_oklab,var(--sidebar-primary)_28%,transparent)]">
                <PromptKitLogo className="size-4.5" />
              </span>
              <span className="truncate text-sm font-semibold tracking-[-0.02em] group-data-[collapsible=icon]:hidden">
                prompt-kit
              </span>
            </Link>
            <SidebarTrigger className="border-sidebar-border bg-sidebar-accent/40 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground size-8 shrink-0 rounded-lg border" />
          </div>
        </SidebarHeader>
      ) : null}

      <SidebarContent
        className="[scrollbar-width:thin] [scrollbar-color:var(--sidebar-border)_transparent] py-2"
        style={{ scrollbarWidth: "thin" }}
      >
        <NavSection
          label="Start"
          items={coreMenuItems}
          currentPath={currentPath}
        />
        <NavSection
          label="Components"
          items={componentsMenuItems}
          currentPath={currentPath}
        />
        <NavSection
          label="Explore"
          items={exploreMenuItems}
          currentPath={currentPath}
        />
        <NavSection
          label="Integrations"
          items={integrationMenuItems}
          currentPath={currentPath}
        />
        <NavSection
          label="Resources"
          items={resourceMenuItems}
          currentPath={currentPath}
        />
        <NavSection
          label="Community"
          items={communityMenuItems}
          currentPath={currentPath}
        />
      </SidebarContent>

      <SidebarFooter className="border-sidebar-border/70 border-t p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <ThemeCycleButton />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
