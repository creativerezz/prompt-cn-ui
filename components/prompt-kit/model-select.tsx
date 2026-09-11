"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"

export type ModelOption = {
  id: string
  label: string
  provider?: string
}

export type ModelSelectProps = {
  models: ModelOption[]
  value?: string
  onValueChange?: (id: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function ModelSelect({
  models,
  value,
  onValueChange,
  placeholder = "Select model",
  disabled,
  className,
}: ModelSelectProps) {
  const selected = models.find((model) => model.id === value)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn("min-w-48 justify-between gap-2 font-normal", className)}
        >
          <span className="flex min-w-0 items-baseline gap-2 truncate">
            {selected ? (
              <>
                <span className="truncate">{selected.label}</span>
                {selected.provider ? (
                  <span className="text-muted-foreground truncate text-xs">
                    {selected.provider}
                  </span>
                ) : null}
              </>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </span>
          <ChevronsUpDown className="text-muted-foreground size-4 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="min-w-[var(--radix-dropdown-menu-trigger-width)]"
      >
        {models.map((model) => {
          const isSelected = model.id === value

          return (
            <DropdownMenuItem
              key={model.id}
              onSelect={() => onValueChange?.(model.id)}
              className="justify-between gap-3"
            >
              <span className="flex min-w-0 flex-col">
                <span>{model.label}</span>
                {model.provider ? (
                  <span className="text-muted-foreground text-xs">
                    {model.provider}
                  </span>
                ) : null}
              </span>
              {isSelected ? <Check className="size-4 shrink-0" /> : null}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
