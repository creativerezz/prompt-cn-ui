import { HomePlayground } from "@/components/app/home-playground"
import { QuickCopyButton } from "@/components/app/quick-copy-button"
import { Button } from "@/components/ui/button"
import { shadcnAdd } from "@/lib/site"
import {
  ArrowRight,
  Code2,
  MessageSquare,
  PanelTop,
  SlidersHorizontal,
  TextCursorInput,
  Wrench,
} from "lucide-react"
import Link from "next/link"
import { routes } from "./routes"

const featured = [
  {
    path: "/docs/prompt-input",
    icon: TextCursorInput,
    description: "A composer that grows with your ideas.",
  },
  {
    path: "/docs/message",
    icon: MessageSquare,
    description: "A clear home for every conversation.",
  },
  {
    path: "/docs/code-block",
    icon: Code2,
    description: "Readable code, ready to copy.",
  },
  {
    path: "/docs/model-select",
    icon: SlidersHorizontal,
    description: "The right model, one choice away.",
  },
  {
    path: "/docs/tool",
    icon: Wrench,
    description: "Make agent actions easy to follow.",
  },
  {
    path: "/docs/chat-container",
    icon: PanelTop,
    description: "Keep the conversation in view.",
  },
].map((item) => ({
  ...item,
  label: routes.find((route) => route.path === item.path)!.label,
}))

export default function Home() {
  const command = shadcnAdd("prompt-input")
  const componentCount = routes.filter(
    (route) => route.type === "component"
  ).length

  return (
    <div className="mx-auto max-w-5xl">
      <section aria-labelledby="home-heading" className="pb-10 sm:pb-12">
        <Link
          href="/docs/installation"
          className="text-muted-foreground hover:text-foreground focus-visible:ring-ring mb-6 inline-flex items-center gap-2 rounded-md text-xs outline-none focus-visible:ring-2"
        >
          <span className="bg-secondary text-foreground rounded border px-1.5 py-0.5 font-medium">
            Open source
          </span>
          Built for shadcn/ui{" "}
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
        <h1
          id="home-heading"
          className="max-w-3xl text-4xl leading-[1.08] font-semibold tracking-[-0.045em] sm:text-5xl xl:text-6xl"
        >
          Less interface work.
          <br />
          <span className="text-muted-foreground">More building.</span>
        </h1>
        <p className="text-muted-foreground mt-5 max-w-xl text-base leading-7 sm:text-lg">
          Composable components for AI interfaces. Copy the code, connect your
          model, and make it yours.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/docs/installation">
              Start building{" "}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#components">Explore components</a>
          </Button>
        </div>
        <div className="text-muted-foreground mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
          <span>{componentCount} components</span>
          <span>Copy &amp; paste</span>
          <span>Bring your own model</span>
        </div>
      </section>

      <section aria-label="Try a component">
        <HomePlayground />
        <div className="bg-muted/30 mt-3 flex min-w-0 items-center gap-3 rounded-lg border py-1.5 pr-2 pl-4">
          <span
            aria-hidden="true"
            className="text-muted-foreground font-mono text-sm"
          >
            $
          </span>
          <code
            tabIndex={0}
            className="focus-visible:ring-ring min-w-0 flex-1 overflow-x-auto rounded py-2 text-xs whitespace-nowrap outline-none focus-visible:ring-2"
          >
            {command}
          </code>
          <QuickCopyButton text={command} />
        </div>
      </section>

      <section
        id="components"
        aria-labelledby="components-heading"
        className="scroll-mt-20 pt-12 sm:pt-16"
      >
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2
              id="components-heading"
              className="text-xl font-semibold tracking-tight"
            >
              Start with the essentials.
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Small pieces. A complete conversation.
            </p>
          </div>
          <Link
            href="/docs/introduction"
            className="text-muted-foreground hover:text-foreground focus-visible:ring-ring inline-flex items-center gap-1.5 rounded text-sm outline-none focus-visible:ring-2"
          >
            Read the docs <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {featured.map(({ path, label, description, icon: Icon }) => (
            <Link
              key={path}
              href={path}
              prefetch={false}
              className="bg-card hover:bg-accent/50 focus-visible:ring-ring group rounded-lg border p-5 transition-colors duration-100 outline-none focus-visible:ring-2"
            >
              <div className="mb-5 flex items-center justify-between">
                <Icon
                  className="text-muted-foreground size-5"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <ArrowRight
                  className="text-muted-foreground size-4 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-sm font-medium">{label}</h3>
              <p className="text-muted-foreground mt-1.5 text-sm leading-6">
                {description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="blocks-heading"
        className="mt-10 flex flex-col justify-between gap-5 border-t pt-8 sm:flex-row sm:items-center"
      >
        <div>
          <h2 id="blocks-heading" className="text-base font-medium">
            Skip the blank canvas.
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Start with a complete chat layout, then make it your own.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/blocks">
            Browse blocks <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      </section>
    </div>
  )
}
