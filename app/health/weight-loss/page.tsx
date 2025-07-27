"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Scale, AlertCircle } from "lucide-react"

export default function WeightManagementPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Weight Management</h1>
        <p className="text-muted-foreground">Sustainable approaches to achieving and maintaining a healthy weight</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Balanced Nutrition</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Learn about balanced nutrition and portion control for sustainable weight management.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-primary" />
                <span>Portion control</span>
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-primary" />
                <span>Nutrient density</span>
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-primary" />
                <span>Meal timing</span>
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
              Discover nutrient-dense foods that support healthy weight management.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2">
                <Scale className="h-4 w-4 text-primary" />
                <span>High-protein options</span>
              </li>
              <li className="flex items-center gap-2">
                <Scale className="h-4 w-4 text-primary" />
                <span>Fiber-rich foods</span>
              </li>
              <li className="flex items-center gap-2">
                <Scale className="h-4 w-4 text-primary" />
                <span>Healthy fats</span>
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
              Get customized meal plans designed for sustainable weight management.
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
        <h2>Understanding Weight Management</h2>
        <p>
          Successful weight management is about making sustainable lifestyle changes rather than following
          restrictive diets. Our approach focuses on balanced nutrition, portion control, and mindful eating.
        </p>

        <h3>Key Principles</h3>
        <ul>
          <li>Focus on nutrient-dense, whole foods</li>
          <li>Practice portion control and mindful eating</li>
          <li>Maintain regular meal timing</li>
          <li>Balance macronutrients appropriately</li>
          <li>Stay hydrated throughout the day</li>
        </ul>

        <h3>Sustainable Strategies</h3>
        <p>
          We believe in creating sustainable habits that lead to long-term success. Our recommendations include:
        </p>
        <ul>
          <li>Eating slowly and mindfully</li>
          <li>Planning meals in advance</li>
          <li>Including protein with every meal</li>
          <li>Choosing fiber-rich foods for satiety</li>
          <li>Regular physical activity</li>
        </ul>

        <h2>Our Approach</h2>
        <p>
          At Aahara, we support your weight management journey through:
        </p>
        <ul>
          <li>Personalized meal plans based on your goals and preferences</li>
          <li>Portion-controlled, nutritionally balanced meals</li>
          <li>Regular progress monitoring and plan adjustments</li>
          <li>Education about healthy eating habits</li>
          <li>Support for developing sustainable lifestyle changes</li>
        </ul>
      </div>
    </div>
  )
}