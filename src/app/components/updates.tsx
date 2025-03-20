"use client"

import { Button } from "@src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card"
import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"

// Add animation keyframes for both fade-in and new updates.
const animationKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes newUpdateAnimation {
    0% { opacity: 0; transform: translateY(15px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`

export function Updates() {
  // Updates data.
  const updates = [
    {
      id: 1,
      date: 1742243220000,
      title: "Site Launch",
      description: "Initial launch of Desmos Solutions.",
    },
    {
      id: 2,
      date: 1742243220001,
      title: "ENGG 202 Assignment 9",
      description: "Added calculators for all 3 questions in Assignment 9.",
    },
    {
      id: 3,
      date: 1742254037000,
      title: "PHYS 259 Assignment 7",
      description: "Added calculators for all 8 questions in Assignment 7.",
    },
    {
      id: 4,
      date: 1742439167000,
      title: "Typo Fixes",
      description: "Fixed a pretty dumb typo where PHYS 259 was ENGG 259...",
    }
  ]

  function formatDate(timestamp: number) {
    const date = new Date(timestamp)
    return date.toLocaleString("en-US", {
      timeZone: "America/Edmonton",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
  }

  const [visibleUpdates, setVisibleUpdates] = useState(5)
  const [previousVisibleCount, setPreviousVisibleCount] = useState(5)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [animatingItems, setAnimatingItems] = useState<number[]>([])

  // Track when visibleUpdates changes to animate new items.
  useEffect(() => {
    if (visibleUpdates > previousVisibleCount) {
      // Create array of indices for newly added updates.
      const newItems = Array.from({ length: visibleUpdates - previousVisibleCount }, (_, i) => previousVisibleCount + i)
      setAnimatingItems(newItems)

      // Clear animation flags after animation completes.
      const timer = setTimeout(() => {
        setAnimatingItems([])
      }, 800) // slightly longer than animation duration.

      setPreviousVisibleCount(visibleUpdates)
      return () => clearTimeout(timer)
    }
  }, [visibleUpdates, previousVisibleCount])

  function handleSeeMore() {
    setVisibleUpdates(visibleUpdates + 5)
  }

  function toggleCollapse() {
    setIsCollapsed(!isCollapsed)
  }

  // Get sorted updates.
  const sortedUpdates = updates.sort((a, b) => b.id - a.id).slice(0, visibleUpdates)

  return (
    <>
      <style jsx global>
        {animationKeyframes}
      </style>
      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Updates</CardTitle>
          <CardDescription>Recent updates to this site and any calculators.</CardDescription>
        </CardHeader>
        <div
          className="flex items-center cursor-pointer px-6 hover:bg-muted/50 transition-colors pb-3"
          onClick={toggleCollapse}
          aria-expanded={!isCollapsed}
          aria-controls="updates-content"
        >
          <hr className="border-t-2 border-gray-200 flex-grow" />
          <ChevronDown
            className={`ml-2 h-4 w-4 text-muted-foreground transition-transform duration-200 ${isCollapsed ? "rotate-180" : ""}`}
          />
        </div>
        <div
          id="updates-content"
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isCollapsed ? "max-h-0 opacity-0" : "max-h-[2000px] opacity-100"
          }`}
        >
          <CardContent>
            <div className="space-y-4">
              {sortedUpdates.map((update, index) => (
                <div
                  key={update.id}
                  className={`border-b pb-4 last:border-0 ${
                    animatingItems.includes(index) ? "animate-new-update" : ""
                  }`}
                  style={
                    animatingItems.includes(index)
                      ? {
                          animation: "newUpdateAnimation 0.6s ease-out forwards",
                          animationDelay: `${animatingItems.indexOf(index) * 0.1}s`,
                        }
                      : {}
                  }
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium">{update.title}</h3>
                    <span className="text-sm text-muted-foreground">{formatDate(update.date)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{update.description}</p>
                </div>
              ))}
            </div>
            {visibleUpdates < updates.length && !isCollapsed && (
              <div className="flex justify-center mt-6 overflow-hidden transition-all duration-300 ease-in-out animate-fade-in">
                <Button
                  onClick={handleSeeMore}
                  variant="outline"
                  className="group relative overflow-hidden rounded-full px-6 py-2 transition-all duration-300 hover:bg-primary/10"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    See more
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                  </span>
                </Button>
              </div>
            )}
          </CardContent>
        </div>
      </Card>
    </>
  )
}

