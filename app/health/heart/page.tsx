"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Heart, AlertCircle } from "lucide-react"

export default function HeartHealthPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Heart Health</h1>
        <p className="text-muted-foreground">Dietary recommendations for maintaining a healthy heart</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Heart-Healthy Diet</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Learn about foods that promote cardiovascular health and maintain healthy blood pressure.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-primary" />
                <span>Low sodium options</span>
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-primary" />
                <span>Heart-healthy fats</span>
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-primary" />
                <span>Fiber-rich foods</span>
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
              Discover foods that support cardiovascular health and maintain healthy cholesterol levels.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-primary" />
                <span>Omega-3 rich fish</span>
              </li>
              <li className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-primary" />
                <span>Whole grains</span>
              </li>
              <li className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-primary" />
                <span>Leafy greens</span>
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
              Get customized meal plans designed for optimal heart health.
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
        <h2>Understanding Heart Health and Diet</h2>
        <p>
          A heart-healthy diet is crucial for preventing cardiovascular disease and maintaining overall health.
          Making informed food choices can help control blood pressure, cholesterol, and other risk factors.
        </p>

        <h3>Key Dietary Guidelines</h3>
        <ul>
          <li>Limit saturated and trans fats</li>
          <li>Choose lean proteins and plant-based protein sources</li>
          <li>Reduce sodium intake</li>
          <li>Increase fiber consumption</li>
          <li>Include heart-healthy fats from sources like olive oil and avocados</li>
        </ul>

        <h3>Lifestyle Recommendations</h3>
        <p>
          In addition to a healthy diet, other lifestyle factors play important roles in heart health:
        </p>
        <ul>
          <li>Regular physical activity</li>
          <li>Stress management</li>
          <li>Adequate sleep</li>
          <li>Limited alcohol consumption</li>
          <li>Smoking cessation</li>
        </ul>

        <h2>Our Approach</h2>
        <p>
          At Aahara, we're committed to supporting your heart health through:
        </p>
        <ul>
          <li>Customized meal plans that align with heart-healthy guidelines</li>
          <li>Low-sodium alternatives to popular dishes</li>
          <li>Heart-healthy cooking methods and ingredients</li>
          <li>Regular monitoring of nutritional goals</li>
          <li>Education about heart-healthy food choices</li>
        </ul>
      </div>
    </div>
  )
}