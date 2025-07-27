"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingDown } from "lucide-react"

export default function FoodWasteStats() {
  const [wasteReduction, setWasteReduction] = useState(27)

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Food Waste Reduction</CardTitle>
            <CardDescription>This month</CardDescription>
          </div>
          <TrendingDown className="h-5 w-5 text-green-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-3xl font-bold text-green-500">{wasteReduction}%</span>
              <span className="ml-1 text-sm text-green-500">↓</span>
            </div>
            <span className="text-sm text-muted-foreground">vs. last month</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-2">
              <p className="text-sm text-muted-foreground">CO₂ Saved</p>
              <p className="font-medium">142 kg</p>
            </div>
            <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-2">
              <p className="text-sm text-muted-foreground">Food Saved</p>
              <p className="font-medium">320 kg</p>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">Your pre-bookings have helped reduce campus food waste!</div>
        </div>
      </CardContent>
    </Card>
  )
}

