import { shadcnAdd, shadcnAddTemplate } from "@/lib/site"
import { DocCodeBlock } from "./doc-code-block"

export function InstallCli({
  name,
  template = false,
}: {
  name?: string
  template?: boolean
}) {
  const code = template
    ? shadcnAddTemplate()
    : shadcnAdd(name ?? "[COMPONENT]")

  return <DocCodeBlock language="bash" code={code} />
}
