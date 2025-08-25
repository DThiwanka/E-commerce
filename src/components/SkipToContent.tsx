'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function SkipToContent() {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <Button
      variant="default"
      className={cn(
        "fixed top-4 left-4 z-50 bg-royal-blue text-ivory -translate-y-full opacity-0 transition-all duration-200",
        isFocused && "translate-y-0 opacity-100"
      )}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onClick={(e) => {
        e.preventDefault()
        const main = document.querySelector('main')
        if (main) {
          main.focus()
          main.scrollIntoView({ behavior: 'smooth' })
        }
        setIsFocused(false)
      }}
    >
      Skip to main content
    </Button>
  )
}