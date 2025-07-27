"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import WaitTimeDisplay from "@/components/wait-time-display"
import FoodWasteStats from "@/components/food-waste-stats"
import UpcomingMeals from "@/components/upcoming-meals"
import { ArrowRight, CalendarClock, Clock, Utensils } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">आहार - Aahara</h1>
          <p className="text-muted-foreground">Personalized meal planning for health-conscious individuals</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/nutrition">
              <Utensils className="mr-2 h-4 w-4" />
              Nutrition Info
            </Link>
          </Button>
          <Button asChild>
            <Link href="/pre-book">
              <CalendarClock className="mr-2 h-4 w-4" />
              Pre-book Meal
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <WaitTimeDisplay />
        <FoodWasteStats />
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Today's Special</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video relative rounded-md overflow-hidden mb-4">
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="Dal Makhani with Naan"
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2">
                <h3 className="font-medium">Dal Makhani with Naan</h3>
                <p className="text-sm">Rich, creamy lentil curry with butter and spices</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                Available 12:00 - 14:30
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" asChild>
                  <Link href="/menu/dal-makhani">
                    View Details
                  </Link>
                </Button>
                <Button size="sm">
                  <Link href="/cart?add=dal-makhani" className="text-primary-foreground">
                    Order Now
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Upcoming Meals</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/pre-book">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <UpcomingMeals />
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Explore Indian Cuisine</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/menu">
              View Full Menu <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/menu/breakfast">
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
              <CardContent className="p-4">
                <img
                  src="/placeholder.svg?height=150&width=300"
                  alt="Breakfast"
                  className="rounded-md mb-3 w-full aspect-video object-cover"
                />
                <h3 className="font-medium">Breakfast</h3>
                <p className="text-sm text-muted-foreground">Idli, Dosa, Poha, and more</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/menu/main-course">
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
              <CardContent className="p-4">
                <img
                  src="/placeholder.svg?height=150&width=300"
                  alt="Main Course"
                  className="rounded-md mb-3 w-full aspect-video object-cover"
                />
                <h3 className="font-medium">Main Course</h3>
                <p className="text-sm text-muted-foreground">Dal Makhani, Paneer dishes, and more</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/menu/rice-biryani">
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
              <CardContent className="p-4">
                <img
                  src="/placeholder.svg?height=150&width=300"
                  alt="Rice & Biryani"
                  className="rounded-md mb-3 w-full aspect-video object-cover"
                />
                <h3 className="font-medium">Rice & Biryani</h3>
                <p className="text-sm text-muted-foreground">Vegetable Biryani, Pulao, and more</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/menu/desserts">
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
              <CardContent className="p-4">
                <img
                  src="/placeholder.svg?height=150&width=300"
                  alt="Desserts"
                  className="rounded-md mb-3 w-full aspect-video object-cover"
                />
                <h3 className="font-medium">Desserts</h3>
                <p className="text-sm text-muted-foreground">Gulab Jamun, Kesaria Peda, and more</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}

