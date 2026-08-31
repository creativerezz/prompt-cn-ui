"use client"

import { PromptInputChatGPT } from "@/app/examples/chatgpt"
import { PromptInputDeepSeek } from "@/app/examples/deepseek"
import { PromptInputMistralAI } from "@/app/examples/mistralai"
import { AnimatedBackground } from "@/components/ui/animated-background"
import { cn } from "@/lib/utils"
import { AnimatePresence } from "motion/react"
import * as m from "motion/react-m"
import Image from "next/image"
import React, { useState } from "react"

const TABS = [
  {
    label: "ChatGPT",
    component: PromptInputChatGPT,
    img: "/openai_logo.png",
  },
  {
    label: "Mistral AI",
    component: PromptInputMistralAI,
    img: "/mistral_logo.png",
  },
  {
    label: "DeepSeek",
    component: PromptInputDeepSeek,
    img: "/deepseek_logo.png",
  },
]

const MOTION_TRANSITION = {
  duration: 0.25,
  type: "spring",
  bounce: 0,
} as const

export function DemoPromptInput() {
  const [activeTab, setActiveTab] = useState(TABS[0])

  return (
    <div className="mx-auto flex min-w-0 w-full flex-col gap-6 sm:gap-10">
      <div className="border-border flex min-h-[260px] w-full min-w-0 items-end overflow-hidden rounded border p-3 min-[400px]:p-4 sm:min-h-[350px] sm:p-8">
        <AnimatePresence initial={false} mode="wait">
          <m.div
            key={activeTab.label}
            className="w-full"
            initial={{
              opacity: 0,
              transform: "scale(0.95)",
              filter: "blur(4px)",
            }}
            animate={{
              opacity: 1,
              transform: "scale(1)",
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              transform: "scale(0.95)",
              filter: "blur(4px)",
            }}
            transition={MOTION_TRANSITION}
          >
            {activeTab.component()}
          </m.div>
        </AnimatePresence>
      </div>
      <div className="flex min-w-0 justify-center overflow-x-auto pb-1">
        <AnimatedBackground
          defaultValue={activeTab.label}
          className={cn(
            "bg-muted group-hover:bg-muted/60 group-active:bg-muted rounded-lg transition-colors"
          )}
          transition={MOTION_TRANSITION}
          onValueChange={(newActiveId: string | null) => {
            const newActiveTab = TABS.find((tab) => tab.label === newActiveId)

            if (newActiveTab) {
              setActiveTab(newActiveTab)
            }
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.label}
              data-id={tab.label}
              className={cn(
                "text-muted-foreground hover:text-foreground min-h-11 shrink-0 rounded-md px-2.5 py-2 text-sm transition-all active:scale-[0.98]",
                "group",
                activeTab.label === tab.label && "text-foreground"
              )}
              type="button"
            >
              <span className="flex flex-row items-center gap-1">
                <Image
                  src={tab.img}
                  alt={`${tab.label} logo`}
                  width={16}
                  height={16}
                  className="size-4"
                />
                {tab.label}
              </span>
            </button>
          ))}
        </AnimatedBackground>
      </div>
    </div>
  )
}
