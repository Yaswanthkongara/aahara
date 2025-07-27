"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Apple, AlertCircle } from "lucide-react"

export default function DiabetesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Diabetes Management</h1>
        <p className="text-muted-foreground">Personalized meal planning for managing diabetes effectively</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Blood Sugar Control</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Learn how to maintain healthy blood sugar levels through proper meal planning and timing.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-primary" />
                <span>Regular meal schedules</span>
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-primary" />
                <span>Portion control</span>
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-primary" />
                <span>Carbohydrate counting</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/nutrition">Learn More</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Foods</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Discover diabetes-friendly foods that help maintain stable blood sugar levels.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2">
                <Apple className="h-4 w-4 text-primary" />
                <span>High-fiber vegetables</span>
              </li>
              <li className="flex items-center gap-2">
                <Apple className="h-4 w-4 text-primary" />
                <span>Lean proteins</span>
              </li>
              <li className="flex items-center gap-2">
                <Apple className="h-4 w-4 text-primary" />
                <span>Whole grains</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/menu">View Menu</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Meal Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Get customized meal plans designed specifically for managing diabetes.
            </p>
            <div className="space-y-4">
              <Button className="w-full" asChild>
                <Link href="/meal-plans">
                  Create Meal Plan <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/pre-book">Pre-book Meals</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <h2>Understanding Diabetes and Diet</h2>
        <p>
          Managing diabetes effectively requires careful attention to your diet. The food you eat directly affects
          your blood sugar levels, making it crucial to make informed dietary choices.
        </p>

        <h3>Key Dietary Guidelines</h3>
        <ul>
          <li>Monitor carbohydrate intake and maintain consistency in portions</li>
          <li>Choose foods with a low glycemic index</li>
          <li>Include lean proteins and healthy fats in your meals</li>
          <li>Eat plenty of fiber-rich foods</li>
          <li>Limit processed foods and added sugars</li>
        </ul>

        <h3>Meal Timing and Frequency</h3>
        <p>
          Regular meal timing helps maintain stable blood sugar levels. We recommend eating at consistent times
          each day and spacing meals 4-5 hours apart. Small, frequent meals may work better than three large
          meals for some people.
        </p>

        <h2>Our Approach</h2>
        <p>
          At Aahara, we understand that managing diabetes through diet can be challenging. That's why we offer:
        </p>
        <ul>
          <li>Customized meal plans based on your specific needs</li>
          <li>Nutritional information for all menu items</li>
          <li>Regular consultation with certified nutritionists</li>
          <li>Blood sugar-friendly alternatives for your favorite dishes</li>
        </ul>
      </div>
    </div>
  )
}