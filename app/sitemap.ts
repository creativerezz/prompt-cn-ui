import fs from "fs"
import path from "path"
import type { MetadataRoute } from "next"
import { slugs } from "./[slug]/data"

const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://prompt-kit.com"
).replace(/\/+$/, "")

const staticRoutes = ["", "docs", "docs/showcase", "blocks", "primitives"]

const componentRouteSources = [
  { prefix: "c", dir: "blocks" },
  { prefix: "demo", dir: "demo" },
  { prefix: "p", dir: "primitives" },
]

function getComponentSlugs(dirName: string) {
  const componentsDir = path.join(process.cwd(), "components", dirName)

  if (!fs.existsSync(componentsDir)) {
    return []
  }

  return fs
    .readdirSync(componentsDir)
    .filter((file) => file.endsWith(".tsx") || file.endsWith(".jsx"))
    .map((file) => file.replace(/\.(tsx|jsx)$/, ""))
    .sort()
}

function getDocsRoutes() {
  const docsDir = path.join(process.cwd(), "app", "docs")

  if (!fs.existsSync(docsDir)) {
    return []
  }

  const routes: string[] = []

  function walk(currentDir: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true })

    entries.forEach((entry) => {
      const entryPath = path.join(currentDir, entry.name)

      if (entry.isDirectory()) {
        walk(entryPath)
        return
      }

      if (entry.name !== "page.tsx" && entry.name !== "page.mdx") {
        return
      }

      const relative = path.relative(docsDir, entryPath)
      const route = relative
        .replace(/\\/g, "/")
        .replace(/\/page\.(tsx|mdx)$/, "")

      routes.push(route ? `docs/${route}` : "docs")
    })
  }

  walk(docsDir)
  return routes
}

function buildUrl(route: string) {
  if (!route) {
    return BASE_URL
  }

  return `${BASE_URL}/${route.replace(/^\/+/, "")}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const componentSlugsByPrefix = componentRouteSources.map((source) => ({
    prefix: source.prefix,
    slugs: getComponentSlugs(source.dir),
  }))
  const urls = new Set<string>()

  staticRoutes.forEach((route) => {
    urls.add(buildUrl(route))
  })

  slugs.forEach((slug) => {
    urls.add(buildUrl(slug))
  })

  getDocsRoutes().forEach((route) => {
    urls.add(buildUrl(route))
  })

  componentSlugsByPrefix.forEach(({ prefix, slugs }) => {
    slugs.forEach((slug) => {
      urls.add(buildUrl(`${prefix}/${slug}`))
    })
  })

  return Array.from(urls).map((url) => ({ url }))
}
