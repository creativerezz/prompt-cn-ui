import kitConfig from "./kit.json"
import { getBaseUrl } from "./utils"

export const kit = kitConfig

export function getRegistryOrigin() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) {
    return explicit.replace(/\/+$/, "")
  }

  const url = getBaseUrl()
  return (url || "http://localhost:3000").replace(/\/+$/, "")
}

export function registryUrl(name: string) {
  return `${getRegistryOrigin()}/c/${name}.json`
}

export function shadcnAdd(name: string) {
  return `npx shadcn@latest add "${registryUrl(name)}"`
}

export function shadcnAddTemplate() {
  return `npx shadcn@latest add "${getRegistryOrigin()}/c/[COMPONENT].json"`
}
