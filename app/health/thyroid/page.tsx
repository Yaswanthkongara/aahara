"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Leaf, AlertCircle } from "lucide-react"

export default function ThyroidPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Thyroid Health</h1>
        <p className="text-muted-foreground">Dietary guidance for managing thyroid conditions effectively</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Iodine Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Understanding the role of iodine in thyroid function and maintaining optimal levels.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-primary" />
                <span>Iodine-rich foods</span>
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-primary" />
                <span>Balanced nutrition</span>
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-primary" />
                <span>Supplement guidance</span>
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
              Foods that support healthy thyroid function and hormone balance.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-primary" />
                <span>Sea vegetables</span>
              </li>
              <li className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-primary" />
                <span>Brazil nuts (selenium)</span>
              </li>
              <li className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-primary" />
                <span>Fish and seafood</span>
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
              Customized meal plans designed for optimal thyroid health.
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
        <h2>Understanding Thyroid Health and Diet</h2>
        <p>
          Your thyroid gland plays a crucial role in metabolism and energy regulation. The right diet can help
          support optimal thyroid function and manage related conditions.
        </p>

        <h3>Key Dietary Guidelines</h3>
        <ul>
          <li>Ensure adequate iodine intake through natural food sources</li>
          <li>Include selenium-rich foods for thyroid hormone production</li>
          <li>Maintain appropriate zinc and iron levels</li>
          <li>Consider timing of medications with meals</li>
          <li>Limit goitrogenic foods when appropriate</li>
        </ul>

        <h3>Foods to Include</h3>
        <p>
          Focus on nutrient-rich foods that support thyroid function while maintaining a balanced diet. Some
          beneficial foods include:
        </p>
        <ul>
          <li>Fish and seafood (rich in iodine and selenium)</li>
          <li>Brazil nuts and sunflower seeds (selenium sources)</li>
          <li>Lean proteins and eggs</li>
          <li>Colorful fruits and vegetables</li>
          <li>Whole grains (in moderation)</li>
        </ul>

        <h2>Our Approach</h2>
        <p>
          At Aahara, we understand the complexities of thyroid health. Our comprehensive approach includes:
        </p>
        <ul>
          <li>Personalized meal plans considering your thyroid condition</li>
          <li>Careful consideration of nutrient timing and interactions</li>
          <li>Regular monitoring and plan adjustments</li>
          <li>Education about food choices and their impact on thyroid health</li>
        </ul>
      </div>
    </div>
  )
}