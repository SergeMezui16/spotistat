import React, { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils" // standard shadcn utility

interface MarqueeTextProps {
  text: string
  className?: string
  speed?: number // optional, px per second
}

export const MarqueeText: React.FC<MarqueeTextProps> = ({
  text,
  className,
  speed = 50,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    const textEl = textRef.current
    if (!container || !textEl) return

    const checkOverflow = () => {
      setIsOverflowing(textEl.scrollWidth > container.clientWidth)
    }

    checkOverflow()
    window.addEventListener("resize", checkOverflow)
    return () => window.removeEventListener("resize", checkOverflow)
  }, [text])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden whitespace-nowrap",
        "w-full",
        className
      )}
    >
      <div
        ref={textRef}
        className={cn(
          "inline-block",
          isOverflowing && "animate-marquee"
        )}
        style={
          isOverflowing
            ? {
                animationDuration: `${Math.max(
                  (textRef.current?.scrollWidth ?? 0) / speed,
                  5
                )}s`,
              }
            : undefined
        }
      >
        {text}
      </div>

      {/* Duplicate for seamless loop */}
      {isOverflowing && (
        <div
          aria-hidden="true"
          className="inline-block animate-marquee pl-8"
          style={{
            animationDuration: `${Math.max(
              (textRef.current?.scrollWidth ?? 0) / speed,
              5
            )}s`,
          }}
        >
          {text}
        </div>
      )}
    </div>
  )
}
