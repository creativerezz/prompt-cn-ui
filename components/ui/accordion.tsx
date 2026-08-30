"use client"

import { cn } from "@/lib/utils"
import {
  AnimatePresence,
  MotionConfig,
  Transition,
  Variant,
  Variants,
} from "motion/react"
import * as m from "motion/react-m"
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"

export type AccordionContextType = {
  expandedValue: React.Key | null
  toggleItem: (value: React.Key) => void
  variants?: { expanded: Variant; collapsed: Variant }
}

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
)

function useAccordion() {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error("useAccordion must be used within an AccordionProvider")
  }
  return context
}

export type AccordionProviderProps = {
  children: ReactNode
  variants?: { expanded: Variant; collapsed: Variant }
  expandedValue?: React.Key | null
  onValueChange?: (value: React.Key | null) => void
}

function AccordionProvider({
  children,
  variants,
  expandedValue: externalExpandedValue,
  onValueChange,
}: AccordionProviderProps) {
  const [internalExpandedValue, setInternalExpandedValue] =
    useState<React.Key | null>(null)

  const expandedValue =
    externalExpandedValue !== undefined
      ? externalExpandedValue
      : internalExpandedValue

  const toggleItem = useCallback(
    (value: React.Key) => {
      const newValue = expandedValue === value ? null : value
      if (onValueChange) {
        onValueChange(newValue)
      } else {
        setInternalExpandedValue(newValue)
      }
    },
    [expandedValue, onValueChange]
  )

  const contextValue = useMemo<AccordionContextType>(
    () => ({ expandedValue, toggleItem, variants }),
    [expandedValue, toggleItem, variants]
  )

  return (
    <AccordionContext.Provider value={contextValue}>
      {children}
    </AccordionContext.Provider>
  )
}

export type AccordionProps = {
  children: ReactNode
  className?: string
  transition?: Transition
  variants?: { expanded: Variant; collapsed: Variant }
  expandedValue?: React.Key | null
  onValueChange?: (value: React.Key | null) => void
}

function Accordion({
  children,
  className,
  transition,
  variants,
  expandedValue,
  onValueChange,
}: AccordionProps) {
  return (
    <MotionConfig transition={transition}>
      <div className={cn("relative", className)} aria-orientation="vertical">
        <AccordionProvider
          variants={variants}
          expandedValue={expandedValue}
          onValueChange={onValueChange}
        >
          {children}
        </AccordionProvider>
      </div>
    </MotionConfig>
  )
}

export type AccordionItemProps = {
  value: React.Key
  children: ReactNode
  className?: string
}

function AccordionItem({ value, children, className }: AccordionItemProps) {
  const { expandedValue } = useAccordion()
  const isExpanded = value === expandedValue

  return (
    <div
      className={cn("overflow-hidden", className)}
      {...(isExpanded ? { "data-expanded": "" } : { "data-closed": "" })}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            // @ts-expect-error - value is not a valid prop for a button
            ...child.props,
            value,
            expanded: isExpanded,
          })
        }
        return child
      })}
    </div>
  )
}

export type AccordionTriggerProps = {
  children: ReactNode
  className?: string
}

function AccordionTrigger({
  children,
  className,
  ...props
}: AccordionTriggerProps) {
  const { toggleItem, expandedValue } = useAccordion()
  const value = (props as { value?: React.Key }).value
  const isExpanded = value === expandedValue

  return (
    <button
      onClick={() => value !== undefined && toggleItem(value)}
      aria-expanded={isExpanded}
      type="button"
      className={cn("group", className)}
      {...(isExpanded ? { "data-expanded": "" } : { "data-closed": "" })}
    >
      {children}
    </button>
  )
}

export type AccordionContentProps = {
  children: ReactNode
  className?: string
}

function AccordionContent({
  children,
  className,
  ...props
}: AccordionContentProps) {
  const { expandedValue, variants } = useAccordion()
  const value = (props as { value?: React.Key }).value
  const isExpanded = value === expandedValue

  const BASE_VARIANTS: Variants = {
    expanded: { height: "auto", opacity: 1 },
    collapsed: { height: 0, opacity: 0 },
  }

  const combinedVariants = {
    expanded: { ...BASE_VARIANTS.expanded, ...variants?.expanded },
    collapsed: { ...BASE_VARIANTS.collapsed, ...variants?.collapsed },
  }

  return (
    <AnimatePresence initial={false}>
      {isExpanded && (
        <m.div
          initial="collapsed"
          animate="expanded"
          exit="collapsed"
          variants={combinedVariants}
          className={className}
        >
          {children}
        </m.div>
      )}
    </AnimatePresence>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
