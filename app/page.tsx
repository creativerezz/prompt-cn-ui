import { CopyCodeButton } from "@/components/app/copy-code-button"
import { DemoPromptInput } from "@/components/app/demo-prompt-input"
import { DocCodeBlock } from "@/components/app/doc-code-block"
import { CodeBlock, CodeBlockGroup } from "@/components/prompt-kit/code-block"
import { TextShimmer } from "@/components/prompt-kit/text-shimmer"
import { ArrowRight, Github } from "lucide-react"
import Link from "next/link"

const CODE_SAMPLE = `import {
  PromptInput,
  PromptInputTextarea,
  PromptInputAction,
} from '@/components/ui/prompt-input';

function PromptInputBasic() {
  return (
    <PromptInput>
      <PromptInputTextarea placeholder='Ask prompt-kit' />
      <PromptInputActions>
        <PromptInputAction tooltip='Upload File'>
          <Button>Upload File</Button>
        </PromptInputAction>
        <PromptInputAction tooltip='Send'>
          <Button>Send</Button>
        </PromptInputAction>
      </PromptInputActions>
    </PromptInput>
  );
}`

export default function Home() {
  return (
    <>
      <section className="mb-12 flex flex-col items-start sm:mb-20">
        <TextShimmer
          as="span"
          duration={2.5}
          spread={30}
          className="mb-3 max-w-full text-xs font-medium tracking-[0.14em] uppercase sm:mb-4 sm:text-sm sm:tracking-[0.2em]"
        >
          Core building blocks for AI apps
        </TextShimmer>
        <h1 className="mb-5 flex max-w-4xl flex-col gap-2 text-pretty sm:gap-1">
          <TextShimmer
            as="span"
            duration={3}
            spread={40}
            className="text-[clamp(2rem,9vw,3rem)] leading-[1.08] font-[450] tracking-[-0.035em] sm:text-4xl md:text-5xl"
          >
            High-quality components
          </TextShimmer>
          <span className="text-muted-foreground text-[clamp(1.5rem,7vw,2.25rem)] leading-[1.15] font-[450] tracking-[-0.03em] text-balance sm:text-3xl md:text-4xl">
            Accessible and customizable UI for AI interfaces.
          </span>
        </h1>
        <div className="mt-1 flex w-full flex-col gap-3 sm:mt-2 sm:w-auto sm:flex-row sm:gap-4">
          <Link
            href="/docs/introduction"
            className="bg-foreground text-background hover:bg-foreground/90 inline-flex h-11 min-h-11 w-full items-center justify-center gap-2 rounded-full px-5 text-base font-medium transition-colors sm:w-auto"
          >
            Get Started
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="https://github.com/creativerezz/prompt-cn-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="border-border bg-background text-foreground hover:bg-muted inline-flex h-11 min-h-11 w-full items-center justify-center gap-2 rounded-full border px-5 text-base font-medium transition-colors sm:w-auto"
          >
            <Github className="size-4" />
            Star on GitHub
          </Link>
        </div>
      </section>
      <div className="mb-20 min-w-0 sm:mb-40">
        <DemoPromptInput />
      </div>
      <CodeBlock className="relative mb-16 min-w-0 overflow-hidden rounded-md border-transparent sm:mb-20">
        <CodeBlockGroup className="absolute top-3 right-3 sm:top-4 sm:right-4">
          <CopyCodeButton code={CODE_SAMPLE} />
        </CodeBlockGroup>
        <DocCodeBlock code={CODE_SAMPLE} language="tsx" />
      </CodeBlock>
    </>
  )
}
