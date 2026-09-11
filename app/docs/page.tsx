import { kit } from "@/lib/site"
import IntroductionPage from "./introduction/page.mdx"
import { generateMetadata } from "./utils/metadata"

export const metadata = generateMetadata(
  "Documentation",
  `Documentation for ${kit.name}`
)

export default function Docs() {
  return <IntroductionPage />
}
