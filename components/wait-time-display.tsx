"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock } from "lucide-react"

export default function WaitTimeDisplay() {
  const [waitTime, setWaitTime] = useState(15)
  const [busyness, setBusyness] = useState(65)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly fluctuate wait time between 10-20 minutes
      setWaitTime((prev) => {
        const newTime = prev + (Math.random() > 0.5 ? 1 : -1)
        return Math.max(10, Math.min(20, newTime))
      })

      // Randomly fluctuate busyness between 50-80%
      setBusyness((prev) => {
        const newBusyness = prev + (Math.random() > 0.5 ? 2 : -2)
        return Math.max(50, Math.min(80, newBusyness))
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Current Wait Time</CardTitle>
            <CardDescription>Main Cafeteria</CardDescription>
          </div>
          <Clock className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold">{waitTime} min</span>
            <span className="text-sm text-muted-foreground">Updated just now</span>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Busyness</span>
              <span className="text-sm font-medium">{busyness}%</span>
            </div>
            <Progress value={busyness} className="h-2" />
          </div>

          <div className="text-sm text-muted-foreground">
            {busyness > 70
              ? "Very busy right now. Consider pre-booking."
              : busyness > 50
                ? "Moderately busy. Short wait expected."
                : "Not too busy. Good time to visit!"}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

