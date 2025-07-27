"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Clock, Star, Utensils, Info, AlertCircle } from "lucide-react"
import { useCart } from "@/components/cart-provider"

// This would typically come from an API or database based on the dish ID
const dishData = {
  "dal-makhani": {
    id: "dal-makhani",
    name: "Dal Makhani",
    description:
      "A popular North Indian dish made with whole black lentils and red kidney beans, slow-cooked with butter and cream.",
    longDescription:
      "Dal Makhani is a classic Punjabi dish known for its rich, creamy texture and deep flavors. The lentils are simmered on low heat for hours, allowing them to absorb the aromatic spices. Finished with cream and butter, this dish is both comforting and indulgent.",
    price: "₹120",
    rating: 4.6,
    reviews: 342,
    prepTime: "30 min",
    calories: 350,
    protein: 15,
    carbs: 45,
    fat: 15,
    image: "https://theflavorbells.com/wp-content/uploads/2020/07/dal-makhani2.jpg",
    tags: ["Vegetarian", "Protein-rich", "North Indian"],
    ingredients: [
      "1 cup whole black gram (urad dal)",
      "1/4 cup red kidney beans (rajma)",
      "1 large onion, finely chopped",
      "2 tomatoes, pureed",
      "1 tablespoon ginger-garlic paste",
      "2 green chilies, slit",
      "1 teaspoon cumin seeds",
      "1 bay leaf",
      "1 teaspoon red chili powder",
      "1 teaspoon garam masala",
      "1/2 teaspoon turmeric powder",
      "1/2 cup fresh cream",
      "2 tablespoons butter",
      "Salt to taste",
      "Fresh coriander leaves for garnish",
    ],
    nutritionalBenefits: [
      "High in protein from lentils and beans",
      "Good source of dietary fiber",
      "Contains iron, potassium, and B vitamins",
      "Provides complex carbohydrates for sustained energy",
    ],
    allergens: ["Dairy"],
    pairingRecommendations: ["Naan", "Jeera Rice", "Roti", "Cucumber Raita"],
  },
  "kesaria-peda": {
    id: "kesaria-peda",
    name: "Kesaria Peda",
    description: "Traditional Indian sweet made with milk solids, sugar, and saffron.",
    longDescription:
      "Kesaria Peda is a rich, traditional Indian sweet that originates from the northern regions of India. Made primarily with khoya (milk solids), sugar, and flavored with aromatic saffron and cardamom, this delicacy has a dense, fudge-like texture and a distinctive yellow-orange color from the saffron.",
    price: "₹80",
    rating: 4.4,
    reviews: 156,
    prepTime: "45 min",
    calories: 120,
    protein: 3,
    carbs: 18,
    fat: 6,
    image: "https://img-global.cpcdn.com/recipes/41f61d61306e0f8b/680x482cq70/%E0%A4%95%E0%A4%B8%E0%A4%B0%E0%A4%AF-%E0%A4%AA%E0%A4%A1-kesariya-peda-recipe-%E0%A4%B0%E0%A4%B8%E0%A4%AA-%E0%A4%AE%E0%A4%96%E0%A4%AF-%E0%A4%A4%E0%A4%B8%E0%A4%B5%E0%A4%B0.jpg",
    tags: ["Vegetarian", "Sweet", "Dessert"],
    ingredients: [
      "2 cups khoya (mawa)",
      "3/4 cup powdered sugar",
      "1/2 teaspoon cardamom powder",
      "A few strands of saffron soaked in warm milk",
      "Chopped almonds or pistachios for garnish",
    ],
    nutritionalBenefits: [
      "Good source of calcium from milk solids",
      "Contains antioxidants from saffron",
      "Provides quick energy from natural sugars",
    ],
    allergens: ["Dairy", "Tree Nuts"],
    pairingRecommendations: ["Masala Chai", "Coffee", "As part of a dessert platter"],
  },
}

export default function DishDetailPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  // In a real app, you would fetch this data based on the ID
  const dish = dishData[params.id]

  const handleAddToCart = () => {
    const priceValue = parseInt(dish.price.replace(/[^0-9]/g, ''))
    addItem({
      id: dish.id,
      name: dish.name,
      price: priceValue,
      image: dish.image
    })
  }

  if (!dish) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Dish not found</h1>
        <Link href="/menu">
          <Button>Back to Menu</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/menu" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">{dish.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-lg overflow-hidden mb-6">
            <img src={dish.image || "/placeholder.svg"} alt={dish.name} className="w-full object-cover" />
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {dish.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="allergens">Allergens</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-4">
              <p className="text-muted-foreground">{dish.longDescription}</p>

              <h3 className="font-medium mt-4 mb-2">Recommended Pairings</h3>
              <div className="flex flex-wrap gap-2">
                {dish.pairingRecommendations.map((item, index) => (
                  <Badge key={index} variant="outline">
                    {item}
                  </Badge>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ingredients" className="mt-4">
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {dish.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="nutrition" className="mt-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">Calories</p>
                    <p className="text-xl font-bold">{dish.calories}</p>
                    <p className="text-xs text-muted-foreground">kcal</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">Protein</p>
                    <p className="text-xl font-bold">{dish.protein}g</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">Carbs</p>
                    <p className="text-xl font-bold">{dish.carbs}g</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">Fat</p>
                    <p className="text-xl font-bold">{dish.fat}g</p>
                  </CardContent>
                </Card>
              </div>

              <h3 className="font-medium mb-2">Nutritional Benefits</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {dish.nutritionalBenefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="allergens" className="mt-4">
              <div className="flex items-start gap-2 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950 mb-4">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                <div>
                  <h3 className="font-medium text-yellow-800 dark:text-yellow-300">Allergen Information</h3>
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">
                    This dish contains the following allergens:
                  </p>
                </div>
              </div>

              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {dish.allergens.map((allergen, index) => (
                  <li key={index}>{allergen}</li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{dish.price}</h2>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-sm">
                      {dish.rating} ({dish.reviews} reviews)
                    </span>
                  </div>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Prep time: {dish.prepTime}</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center">
                    <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                      -
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                      +
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button className="w-full" onClick={handleAddToCart}>
                    <Utensils className="mr-2 h-4 w-4" />
                    Order Now
                  </Button>
                  <Link href="/pre-book">
                    <Button variant="outline" className="w-full">
                      <Clock className="mr-2 h-4 w-4" />
                      Pre-book for Later
                    </Button>
                  </Link>
                </div>

                <div className="rounded-lg bg-primary/10 p-4">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Pre-booking Benefits</h3>
                      <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                        <li>• Skip the waiting line</li>
                        <li>• 10% discount on pre-booked meals</li>
                        <li>• Help reduce food waste</li>
                        <li>• Customize your meal in advance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

