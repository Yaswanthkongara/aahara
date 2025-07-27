"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Edit2 } from "lucide-react"

export default function UpcomingMeals() {
  const [meals, setMeals] = useState([
    {
      id: 1,
      name: "Lunch",
      menu: "Grilled Chicken Salad",
      location: "Main Cafeteria",
      date: "Today",
      time: "12:30 PM",
      status: "confirmed",
    },
    {
      id: 2,
      name: "Dinner",
      menu: "Pasta Primavera",
      location: "Dorm Dining Hall",
      date: "Today",
      time: "6:00 PM",
      status: "confirmed",
    },
    {
      id: 3,
      name: "Lunch",
      menu: "Burrito Bowl",
      location: "Student Center",
      date: "Tomorrow",
      time: "1:00 PM",
      status: "pending",
    },
  ])

  const cancelMeal = (id: number) => {
    setMeals(meals.filter((meal) => meal.id !== id))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {meals.map((meal) => (
        <Card key={meal.id} className="overflow-hidden">
          <div className="h-2 bg-primary" />
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium text-lg">{meal.name}</h3>
                <p className="text-muted-foreground">{meal.menu}</p>
              </div>
              <Badge variant={meal.status === "confirmed" ? "default" : "outline"}>
                {meal.status === "confirmed" ? "Confirmed" : "Pending"}
              </Badge>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{meal.date}</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{meal.time}</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{meal.location}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Edit2 className="h-4 w-4 mr-2" />
                Modify
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                onClick={() => cancelMeal(meal.id)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="border-dashed flex flex-col items-center justify-center p-6 h-full">
        <div className="rounded-full bg-primary/10 p-3 mb-4">
          <Calendar className="h-6 w-6 text-primary" />
        </div>
        <h3 className="font-medium text-lg mb-2">Pre-book a Meal</h3>
        <p className="text-center text-muted-foreground mb-4">Plan ahead and skip the lines</p>
        <Button>Book Now</Button>
      </Card>
    </div>
  )
}

