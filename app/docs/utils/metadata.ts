import { kit } from "@/lib/site"

export function generateMetadata(title: string, description: string) {
  return {
    title: `${title} - ${kit.name}`,
    description: `${description} Built with React, shadcn/ui and Tailwind CSS, part of ${kit.name}, a library of customizable components for AI apps.`,
  }
}
