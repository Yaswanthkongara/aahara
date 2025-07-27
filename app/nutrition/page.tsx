"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { BarChart3, Calendar, Plus, Search, Utensils } from "lucide-react"

// Sample nutrition data
const nutritionHistory = [
  {
    date: "2023-05-15",
    totalCalories: 1850,
    protein: 85,
    carbs: 220,
    fat: 60,
    meals: [
      {
        type: "Breakfast",
        name: "Masala Dosa with Sambar",
        calories: 450,
        protein: 15,
        carbs: 70,
        fat: 12,
        time: "08:30 AM",
      },
      {
        type: "Lunch",
        name: "Vegetable Biryani with Raita",
        calories: 650,
        protein: 25,
        carbs: 90,
        fat: 22,
        time: "01:15 PM",
      },
      {
        type: "Snack",
        name: "Mixed Fruit Bowl",
        calories: 150,
        protein: 5,
        carbs: 30,
        fat: 2,
        time: "04:30 PM",
      },
      {
        type: "Dinner",
        name: "Paneer Tikka with Roti",
        calories: 600,
        protein: 40,
        carbs: 30,
        fat: 24,
        time: "08:00 PM",
      },
    ],
  },
  {
    date: "2023-05-14",
    totalCalories: 1720,
    protein: 90,
    carbs: 180,
    fat: 65,
    meals: [
      {
        type: "Breakfast",
        name: "Idli with Coconut Chutney",
        calories: 380,
        protein: 12,
        carbs: 65,
        fat: 8,
        time: "08:15 AM",
      },
      {
        type: "Lunch",
        name: "Dal Tadka with Brown Rice",
        calories: 580,
        protein: 28,
        carbs: 75,
        fat: 18,
        time: "12:45 PM",
      },
      {
        type: "Snack",
        name: "Roasted Chana",
        calories: 180,
        protein: 10,
        carbs: 20,
        fat: 7,
        time: "05:00 PM",
      },
      {
        type: "Dinner",
        name: "Vegetable Curry with Roti",
        calories: 580,
        protein: 40,
        carbs: 20,
        fat: 32,
        time: "07:30 PM",
      },
    ],
  },
]

// Sample food database
const foodDatabase = [
  { id: 1, name: "Masala Dosa", calories: 450, protein: 15, carbs: 70, fat: 12 },
  { id: 2, name: "Idli (2 pieces)", calories: 160, protein: 8, carbs: 30, fat: 2 },
  { id: 3, name: "Sambar (1 cup)", calories: 150, protein: 7, carbs: 25, fat: 4 },
  { id: 4, name: "Vegetable Biryani", calories: 450, protein: 15, carbs: 70, fat: 15 },
  { id: 5, name: "Dal Tadka", calories: 220, protein: 15, carbs: 30, fat: 8 },
  { id: 6, name: "Brown Rice (1 cup)", calories: 220, protein: 5, carbs: 45, fat: 2 },
  { id: 7, name: "Roti (1 piece)", calories: 80, protein: 3, carbs: 15, fat: 1 },
  { id: 8, name: "Paneer Tikka (100g)", calories: 280, protein: 22, carbs: 5, fat: 18 },
  { id: 9, name: "Raita (1 cup)", calories: 120, protein: 5, carbs: 10, fat: 7 },
  { id: 10, name: "Mixed Fruit Bowl", calories: 150, protein: 2, carbs: 35, fat: 1 },
]

export default function NutritionPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState("2023-05-15")
  const [selectedMealType, setSelectedMealType] = useState("Breakfast")
  const [selectedFood, setSelectedFood] = useState<number | null>(null)
  const [quantity, setQuantity] = useState(1)

  // Filter foods based on search query
  const filteredFoods = searchQuery
    ? foodDatabase.filter((food) => food.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : foodDatabase

  const handleAddFood = () => {
    if (!selectedFood) {
      toast({
        title: "Please select a food",
        description: "You need to select a food item to add to your log",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Food added",
      description: "The food item has been added to your nutrition log",
    })

    // Reset form
    setSelectedFood(null)
    setQuantity(1)
    setSearchQuery("")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Nutrition Tracker</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track your daily nutrition intake, monitor your progress, and make informed food choices to achieve your
            health goals.
          </p>
        </div>

        <Tabs defaultValue="log" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="log">Nutrition Log</TabsTrigger>
            <TabsTrigger value="add">Add Food</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="log">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Daily Log</CardTitle>
                        <CardDescription>Track your daily food intake</CardDescription>
                      </div>
                      <Select value={selectedDate} onValueChange={setSelectedDate}>
                        <SelectTrigger className="w-[180px]">
                          <Calendar className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="Select date" />
                        </SelectTrigger>
                        <SelectContent>
                          {nutritionHistory.map((day) => (
                            <SelectItem key={day.date} value={day.date}>
                              {new Date(day.date).toLocaleDateString()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {nutritionHistory
                        .find((day) => day.date === selectedDate)
                        ?.meals.map((meal, index) => (
                          <div key={index} className="p-4 rounded-lg border">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-medium">{meal.name}</h3>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <span className="mr-2">{meal.type}</span>
                                  <span>•</span>
                                  <span className="ml-2">{meal.time}</span>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Utensils className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                            </div>
                            <div className="grid grid-cols-4 gap-2 mt-4">
                              <div className="text-center">
                                <p className="text-xs text-muted-foreground">Calories</p>
                                <p className="font-medium">{meal.calories}</p>
                              </div>
                              <div className="text-center">
                                <p className="text-xs text-muted-foreground">Protein</p>
                                <p className="font-medium">{meal.protein}g</p>
                              </div>
                              <div className="text-center">
                                <p className="text-xs text-muted-foreground">Carbs</p>
                                <p className="font-medium">{meal.carbs}g</p>
                              </div>
                              <div className="text-center">
                                <p className="text-xs text-muted-foreground">Fat</p>
                                <p className="font-medium">{meal.fat}g</p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Daily Summary</CardTitle>
                    <CardDescription>
                      {new Date(selectedDate).toLocaleDateString(undefined, {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {nutritionHistory.find((day) => day.date === selectedDate) && (
                        <>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Calories</span>
                              <span className="text-sm font-medium">
                                {nutritionHistory.find((day) => day.date === selectedDate)?.totalCalories} / 2000
                              </span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary"
                                style={{
                                  width: `${Math.min(
                                    ((nutritionHistory.find((day) => day.date === selectedDate)?.totalCalories || 0) /
                                      2000) *
                                      100,
                                    100,
                                  )}%`,
                                }}
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Protein</span>
                              <span className="text-sm font-medium">
                                {nutritionHistory.find((day) => day.date === selectedDate)?.protein}g / 100g
                              </span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-500"
                                style={{
                                  width: `${Math.min(
                                    ((nutritionHistory.find((day) => day.date === selectedDate)?.protein || 0) / 100) *
                                      100,
                                    100,
                                  )}%`,
                                }}
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Carbs</span>
                              <span className="text-sm font-medium">
                                {nutritionHistory.find((day) => day.date === selectedDate)?.carbs}g / 250g
                              </span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-amber-500"
                                style={{
                                  width: `${Math.min(
                                    ((nutritionHistory.find((day) => day.date === selectedDate)?.carbs || 0) / 250) *
                                      100,
                                    100,
                                  )}%`,
                                }}
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Fat</span>
                              <span className="text-sm font-medium">
                                {nutritionHistory.find((day) => day.date === selectedDate)?.fat}g / 70g
                              </span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-red-500"
                                style={{
                                  width: `${Math.min(
                                    ((nutritionHistory.find((day) => day.date === selectedDate)?.fat || 0) / 70) * 100,
                                    100,
                                  )}%`,
                                }}
                              />
                            </div>
                          </div>
                        </>
                      )}

                      <div className="pt-4 mt-4 border-t">
                        <h3 className="font-medium mb-2">Recommendations</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <div className="rounded-full h-5 w-5 bg-blue-100 text-blue-600 flex items-center justify-center mt-0.5">
                              <span className="text-xs">i</span>
                            </div>
                            <span>Try to increase your protein intake to meet your daily goal.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="rounded-full h-5 w-5 bg-green-100 text-green-600 flex items-center justify-center mt-0.5">
                              <span className="text-xs">✓</span>
                            </div>
                            <span>Great job staying within your calorie target!</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="add">
            <Card>
              <CardHeader>
                <CardTitle>Add Food to Log</CardTitle>
                <CardDescription>Search for foods or add your own</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="date">Date</Label>
                        <Select defaultValue={selectedDate} onValueChange={setSelectedDate}>
                          <SelectTrigger id="date">
                            <SelectValue placeholder="Select date" />
                          </SelectTrigger>
                          <SelectContent>
                            {nutritionHistory.map((day) => (
                              <SelectItem key={day.date} value={day.date}>
                                {new Date(day.date).toLocaleDateString()}
                              </SelectItem>
                            ))}
                            <SelectItem value={new Date().toISOString().split("T")[0]}>Today</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="meal-type">Meal Type</Label>
                        <Select defaultValue={selectedMealType} onValueChange={setSelectedMealType}>
                          <SelectTrigger id="meal-type">
                            <SelectValue placeholder="Select meal type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Breakfast">Breakfast</SelectItem>
                            <SelectItem value="Lunch">Lunch</SelectItem>
                            <SelectItem value="Dinner">Dinner</SelectItem>
                            <SelectItem value="Snack">Snack</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="food-search">Search Food</Label>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="food-search"
                            placeholder="Search for a food..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="border rounded-md h-64 overflow-y-auto">
                        <div className="p-2">
                          {filteredFoods.length > 0 ? (
                            filteredFoods.map((food) => (
                              <div
                                key={food.id}
                                className={`p-3 rounded-md cursor-pointer ${
                                  selectedFood === food.id ? "bg-primary/10" : "hover:bg-muted"
                                }`}
                                onClick={() => setSelectedFood(food.id)}
                              >
                                <div className="flex justify-between">
                                  <h4 className="font-medium">{food.name}</h4>
                                  <span>{food.calories} cal</span>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  P: {food.protein}g • C: {food.carbs}g • F: {food.fat}g
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="p-4 text-center text-muted-foreground">
                              No foods found. Try a different search term.
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="quantity">Quantity</Label>
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setQuantity(Math.max(0.5, quantity - 0.5))}
                          >
                            -
                          </Button>
                          <Input
                            id="quantity"
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Number.parseFloat(e.target.value) || 1)}
                            className="mx-2 text-center"
                            step={0.5}
                            min={0.5}
                          />
                          <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 0.5)}>
                            +
                          </Button>
                        </div>
                      </div>

                      <Button className="w-full" onClick={handleAddFood}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add to Log
                      </Button>
                    </div>
                  </div>

                  <div>
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-4">Nutrition Summary</h3>
                      {selectedFood ? (
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm text-muted-foreground mb-1">Selected Food</h4>
                            <p className="font-medium">{foodDatabase.find((food) => food.id === selectedFood)?.name}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm text-muted-foreground mb-1">Calories</h4>
                              <p className="font-medium">
                                {Math.round(
                                  (foodDatabase.find((food) => food.id === selectedFood)?.calories || 0) * quantity,
                                )}
                              </p>
                            </div>
                            <div>
                              <h4 className="text-sm text-muted-foreground mb-1">Protein</h4>
                              <p className="font-medium">
                                {Math.round(
                                  (foodDatabase.find((food) => food.id === selectedFood)?.protein || 0) * quantity,
                                )}
                                g
                              </p>
                            </div>
                            <div>
                              <h4 className="text-sm text-muted-foreground mb-1">Carbs</h4>
                              <p className="font-medium">
                                {Math.round(
                                  (foodDatabase.find((food) => food.id === selectedFood)?.carbs || 0) * quantity,
                                )}
                                g
                              </p>
                            </div>
                            <div>
                              <h4 className="text-sm text-muted-foreground mb-1">Fat</h4>
                              <p className="font-medium">
                                {Math.round(
                                  (foodDatabase.find((food) => food.id === selectedFood)?.fat || 0) * quantity,
                                )}
                                g
                              </p>
                            </div>
                          </div>

                          <div className="pt-4 border-t">
                            <h4 className="text-sm text-muted-foreground mb-2">Will be added to</h4>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{selectedMealType}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(selectedDate).toLocaleDateString()}
                                </p>
                              </div>
                              <Button variant="outline" size="sm">
                                Change
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <Utensils className="h-12 w-12 mx-auto mb-4 opacity-20" />
                          <p>Select a food to see nutrition information</p>
                        </div>
                      )}
                    </div>

                    <div className="mt-6">
                      <Button variant="outline" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Custom Food
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle>Nutrition Statistics</CardTitle>
                <CardDescription>Track your nutrition trends over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center border rounded-md p-4">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-20" />
                    <h3 className="font-medium mb-2">Nutrition Charts</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Track your calorie intake, macronutrient distribution, and nutrition trends over time. Charts will
                      appear as you log more meals.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-4">Weekly Average</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Calories</span>
                          <span className="text-sm">1785 / day</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: "89%" }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Protein</span>
                          <span className="text-sm">87g / day</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: "87%" }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Carbs</span>
                          <span className="text-sm">200g / day</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500" style={{ width: "80%" }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Fat</span>
                          <span className="text-sm">62g / day</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-red-500" style={{ width: "89%" }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-4">Macronutrient Distribution</h3>
                    <div className="flex items-center justify-center h-40">
                      <div className="w-40 h-40 rounded-full border-8 border-primary relative">
                        <div
                          className="absolute inset-0 border-8 border-transparent border-t-blue-500"
                          style={{ transform: "rotate(45deg)" }}
                        ></div>
                        <div
                          className="absolute inset-0 border-8 border-transparent border-t-amber-500"
                          style={{ transform: "rotate(170deg)" }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                          <span className="text-xs text-muted-foreground">Total</span>
                          <span className="font-bold">1785</span>
                          <span className="text-xs text-muted-foreground">calories</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-4 text-center text-sm">
                      <div>
                        <div className="w-4 h-4 bg-primary rounded-full mx-auto mb-1"></div>
                        <p>Carbs</p>
                        <p className="font-medium">45%</p>
                      </div>
                      <div>
                        <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto mb-1"></div>
                        <p>Protein</p>
                        <p className="font-medium">20%</p>
                      </div>
                      <div>
                        <div className="w-4 h-4 bg-amber-500 rounded-full mx-auto mb-1"></div>
                        <p>Fat</p>
                        <p className="font-medium">35%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

