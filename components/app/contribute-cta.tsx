import { kit } from "@/lib/site"
import React from "react"
import { Button } from "../ui/button"

type ContributeCtaProps = {
  type: "component" | "block" | "primitive"
}

export function ContributeCta({ type }: ContributeCtaProps) {
  const suggestHref = {
    component: `${kit.github}/issues/new?title=%5BComponent+Request%5D`,
    block: `${kit.github}/issues/new?title=%5BBlock+Request%5D`,
    primitive: `${kit.github}/issues/new?title=%5BPrimitive+Request%5D`,
  }

  const suggestLabel = {
    component: "Suggest a new component",
    block: "Suggest a new block",
    primitive: "Suggest a new primitive",
  }

  return (
    <div className="border-border mt-12 flex w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed p-6">
      <p className="text-muted-foreground mb-0.5 text-sm">Something missing?</p>
      <div className="flex w-full flex-wrap items-center justify-center gap-2">
        <Button variant="outline" asChild size="sm">
          <a href={suggestHref[type]} target="_blank" rel="noreferrer">
            {suggestLabel[type]}
          </a>
        </Button>
        <Button asChild size="sm">
          <a
            href={`${kit.github}/blob/main/CONTRIBUTING.md`}
            target="_blank"
            rel="noreferrer"
          >
            Contribute to {kit.name}
          </a>
        </Button>
      </div>
    </div>
  )
}
