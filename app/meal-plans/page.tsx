"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { Check, Heart, Info } from "lucide-react"
import Rating from "@/components/rating"

// Sample meal plan data
const mealPlans = {
  thyroid: {
    title: "Thyroid Health Meal Plan",
    description: "Nutrient-rich meals focusing on iodine, selenium, and zinc-rich foods to support thyroid function",
    price: "₹2,699",
    rating: 4.6,
    reviews: 142,
    tags: ["Iodine Rich", "Hormone Balance", "Energy Support"],
    days: [
      {
        day: "Monday",
        meals: [
          {
            type: "Breakfast",
            name: "Seaweed and Egg Scramble",
            description: "Iodine-rich seaweed with protein-packed eggs and whole grain toast",
            calories: 340,
            protein: 20,
            carbs: 35,
            fat: 12,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSKKyMbZ38vOPiKLyaJiywP3-_pMkb3gXMfA&s",
            ingredients: ["Fresh seaweed", "Eggs", "Whole grain bread", "Olive oil", "Sea salt", "Black pepper", "Green onions"],
            preparation: "1. Rinse and chop seaweed\n2. Beat eggs in a bowl\n3. Heat olive oil in pan\n4. Scramble eggs with seaweed\n5. Season to taste\n6. Serve with toast"
          },
          {
            type: "Lunch",
            name: "Grilled Fish with Brazil Nuts",
            description: "Selenium-rich fish and nuts with quinoa and steamed vegetables",
            calories: 450,
            protein: 35,
            carbs: 40,
            fat: 15,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfe8EYI-KdsNndzeG9YNsnaCvC2xrzETwVYg&s",
            ingredients: ["Fresh fish fillets", "Brazil nuts", "Quinoa", "Mixed vegetables", "Olive oil", "Lemon", "Herbs", "Seasonings"],
            preparation: "1. Season fish fillets\n2. Cook quinoa according to package\n3. Steam mixed vegetables\n4. Grill fish until flaky\n5. Chop brazil nuts\n6. Plate and garnish with herbs"
          },
          {
            type: "Dinner",
            name: "Turkey and Sweet Potato Bowl",
            description: "Lean turkey with zinc-rich pumpkin seeds and roasted vegetables",
            calories: 380,
            protein: 28,
            carbs: 35,
            fat: 14,
            image: "https://momsdinner.net/wp-content/uploads/2017/10/Southwest-Turkey-and-Sweet-Potato-Bowl-2-480x270.jpg",
            ingredients: ["Ground turkey", "Sweet potatoes", "Pumpkin seeds", "Mixed vegetables", "Olive oil", "Herbs", "Seasonings", "Greek yogurt"],
            preparation: "1. Cube and roast sweet potatoes\n2. Brown turkey with seasonings\n3. Steam mixed vegetables\n4. Toast pumpkin seeds\n5. Assemble in bowls\n6. Top with yogurt and seeds"
          },
        ],
      },
      {
        day: "Tuesday",
        meals: [
          {
            type: "Breakfast",
            name: "Greek Yogurt with Berries",
            description: "Protein-rich yogurt with antioxidant-rich berries and honey",
            calories: 290,
            protein: 18,
            carbs: 35,
            fat: 8,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6d114qumGIED84ji88YSGIFL-Wbq54P-HmQ&s",
          },
          {
            type: "Lunch",
            name: "Salmon and Avocado Salad",
            description: "Omega-3 rich salmon with healthy fats from avocado",
            calories: 420,
            protein: 32,
            carbs: 25,
            fat: 22,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpFpfUf0EX8fvcq4xR1Hj5z_qQrURbu1Hmkg&s",
          },
          {
            type: "Dinner",
            name: "Chickpea and Spinach Curry",
            description: "Iron-rich legumes and leafy greens with aromatic spices",
            calories: 350,
            protein: 18,
            carbs: 45,
            fat: 12,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYuytxy3LdCTKnH8N7Poxoj-ZvDC35ybH9Vg&s",
          },
        ],
      },
    ],
  },
  heart: {
    title: "Heart-Healthy Meal Plan",
    description: "Low-sodium, heart-healthy meals rich in omega-3 and fiber to support cardiovascular health",
    price: "₹2,599",
    rating: 4.8,
    reviews: 165,
    tags: ["Low Sodium", "Heart Healthy", "Omega-3 Rich"],
    days: [
      {
        day: "Monday",
        meals: [
          {
            type: "Breakfast",
            name: "Oatmeal with Nuts and Berries",
            description: "Fiber-rich oatmeal with heart-healthy nuts and antioxidant berries",
            calories: 310,
            protein: 12,
            carbs: 45,
            fat: 10,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1HeufSaiVEKLtRUb3KnR7U6DaPEItnJs9LQ&s",
          },
          {
            type: "Lunch",
            name: "Mediterranean Quinoa Bowl",
            description: "Whole grain quinoa with olive oil, vegetables, and chickpeas",
            calories: 380,
            protein: 15,
            carbs: 55,
            fat: 12,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP0gWI4PCnxDBcmpMucUe15LZ3O_ZL8me3BA&s",
          },
          {
            type: "Dinner",
            name: "Baked Fish with Herbs",
            description: "Omega-3 rich fish with herbs and steamed vegetables",
            calories: 340,
            protein: 30,
            carbs: 25,
            fat: 14,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSukFoQpYbKd0BdSG97G15U1ggEzBpQ7hRsQ&s",
          },
        ],
      },
      {
        day: "Tuesday",
        meals: [
          {
            type: "Breakfast",
            name: "Whole Grain Toast with Avocado",
            description: "Fiber-rich toast with healthy fats from avocado",
            calories: 280,
            protein: 10,
            carbs: 35,
            fat: 12,
            image: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2015/12/11/0/FNK_All-the-Avocado-Toast_s4x3.jpg.rend.hgtvcom.1280.1280.suffix/1450059496131.webp",
          },
          {
            type: "Lunch",
            name: "Lentil and Vegetable Soup",
            description: "Low-sodium soup with protein-rich lentils and vegetables",
            calories: 320,
            protein: 18,
            carbs: 45,
            fat: 6,
            image: "https://www.healthyseasonalrecipes.com/wp-content/uploads/2021/08/lentil-soup-sq-029.jpg",
          },
          {
            type: "Dinner",
            name: "Grilled Chicken with Sweet Potato",
            description: "Lean protein with beta-carotene rich sweet potato",
            calories: 360,
            protein: 35,
            carbs: 30,
            fat: 10,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxyE3wDMKFyqPtlwwQIrQxpWuC7b-e3BAa6w&s",
          },
        ],
      },
    ],
  },
  diabetes: {
    title: "Diabetes-Friendly Meal Plan",
    description: "Balanced meals with low glycemic index foods to help manage blood sugar levels",
    price: "₹2,499",
    rating: 4.7,
    reviews: 128,
    tags: ["Low GI", "Balanced", "Nutritionist Approved"],
    days: [
      {
        day: "Monday",
        meals: [
          {
            type: "Breakfast",
            name: "Ragi Idli with Sambar",
            description: "Steamed ragi cakes served with lentil soup",
            calories: 320,
            protein: 12,
            carbs: 45,
            fat: 8,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl13MCjMr0gncJTsnB6kSm4UIfthCHf-6I_A&s",
          },
          {
            type: "Lunch",
            name: "Brown Rice with Mixed Vegetable Curry",
            description: "Fiber-rich brown rice with seasonal vegetables",
            calories: 420,
            protein: 15,
            carbs: 65,
            fat: 10,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx70FtdOzhTREiYzSkKOBYzL6ICgNpg5MwLw&s",
          },
          {
            type: "Dinner",
            name: "Multigrain Roti with Palak Paneer",
            description: "Whole grain flatbread with spinach and cottage cheese curry",
            calories: 380,
            protein: 18,
            carbs: 40,
            fat: 14,
            image: "https://i.redd.it/d8ydi58hukp81.jpg",
          },
        ],
      },
      {
        day: "Tuesday",
        meals: [
          {
            type: "Breakfast",
            name: "Vegetable Oats Upma",
            description: "Savory oats cooked with vegetables and spices",
            calories: 290,
            protein: 10,
            carbs: 42,
            fat: 7,
            image: "https://cookingfromheart.com/wp-content/uploads/2018/02/Vegetable-Oats-Upma-4.jpg",
          },
          {
            type: "Lunch",
            name: "Moong Dal Khichdi",
            description: "One-pot rice and lentil dish with mild spices",
            calories: 380,
            protein: 14,
            carbs: 60,
            fat: 8,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtaqvCp_CTnSr1lQYIx1kByouWGjMxtfblEQ&s",
          },
          {
            type: "Dinner",
            name: "Grilled Fish with Cucumber Salad",
            description: "Protein-rich fish with refreshing cucumber salad",
            calories: 340,
            protein: 28,
            carbs: 18,
            fat: 16,
            image: "https://storage.googleapis.com/fitia_public_images/recipes%2FGR-R-V-00016357_pjhqmpyqa4bdhpydf66f6n0t_large.jpg",
          },
        ],
      },
      // Additional days would be added here
    ],
  },
  weightLoss: {
    title: "Weight Management Meal Plan",
    description: "Calorie-controlled meals with high protein content to support weight loss goals",
    price: "₹2,299",
    rating: 4.5,
    reviews: 156,
    tags: ["Low Calorie", "High Protein", "Portion Controlled"],
    days: [
      {
        day: "Monday",
        meals: [
          {
            type: "Breakfast",
            name: "Vegetable Poha with Sprouts",
            description: "Flattened rice with vegetables and protein-rich sprouts",
            calories: 250,
            protein: 10,
            carbs: 40,
            fat: 5,
            image: "https://palatesdesire.com/wp-content/uploads/2022/07/Vegetable-diet-poha-recipe@palates-desire.jpg",
          },
          {
            type: "Lunch",
            name: "Quinoa Bowl with Roasted Vegetables",
            description: "Protein-rich quinoa with seasonal roasted vegetables",
            calories: 320,
            protein: 14,
            carbs: 45,
            fat: 8,
            image: "https://www.floatingkitchen.net/wp-content/uploads/2022/03/Roasted-Vegetable-Quinoa-Bowls-1-735x490.jpg",
          },
          {
            type: "Dinner",
            name: "Grilled Paneer with Vegetable Stir-Fry",
            description: "Protein-rich paneer with low-carb vegetable stir-fry",
            calories: 280,
            protein: 22,
            carbs: 15,
            fat: 16,
            image: "https://myborosil.com/cdn/shop/articles/Paneer_Stir_Fry_2_1.jpg",
          },
        ],
      },
      {
        day: "Tuesday",
        meals: [
          {
            type: "Breakfast",
            name: "Greek Yogurt with Berries and Nuts",
            description: "Protein-rich yogurt with antioxidant-rich berries",
            calories: 220,
            protein: 15,
            carbs: 20,
            fat: 10,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6UuzRgeh6RcG3sXdC33I6PmokoY9haSrhyg&s",
          },
          {
            type: "Lunch",
            name: "Lentil Soup with Multigrain Bread",
            description: "Fiber and protein-rich soup with whole grain bread",
            calories: 310,
            protein: 18,
            carbs: 40,
            fat: 6,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWv7Mczbl7lKYnGHJcecNFoPlOnTthBz6DgQ&s",
          },
          {
            type: "Dinner",
            name: "Baked Fish with Steamed Broccoli",
            description: "Lean protein with nutrient-dense vegetables",
            calories: 260,
            protein: 30,
            carbs: 10,
            fat: 12,
            image: "https://d36fw6y2wq3bat.cloudfront.net/recipes/bacalao-con-brocoli-y-arroz/600/bacalao-con-brocoli-y-arroz_version_1651567831.jpg",
          },
        ],
      },
      // Additional days would be added here
    ],
  },
  vegetarian: {
    title: "Balanced Vegetarian Meal Plan",
    description: "Plant-based meals with complete proteins and essential nutrients",
    price: "₹1,999",
    rating: 4.8,
    reviews: 203,
    tags: ["Vegetarian", "Plant Protein", "Nutrient Dense"],
    days: [
      {
        day: "Monday",
        meals: [
          {
            type: "Breakfast",
            name: "Masala Dosa with Coconut Chutney",
            description: "Fermented rice crepe with spiced potato filling",
            calories: 340,
            protein: 8,
            carbs: 50,
            fat: 10,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV9boiGGSteNHHFaUXwHpxePkW0RjVglAB8A&s",
          },
          {
            type: "Lunch",
            name: "Rajma Chawal",
            description: "Protein-rich kidney bean curry with rice",
            calories: 420,
            protein: 16,
            carbs: 70,
            fat: 8,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrY-YDbNH_JLFnMOh26A1l7WKFgORHz6C3uQ&s",
          },
          {
            type: "Dinner",
            name: "Paneer Tikka with Mint Chutney",
            description: "Grilled cottage cheese with refreshing mint sauce",
            calories: 360,
            protein: 22,
            carbs: 20,
            fat: 20,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAUqeEweMbToNygGV3iA5TjJPGanBInQL5xQ&s",
          },
        ],
      },
      {
        day: "Tuesday",
        meals: [
          {
            type: "Breakfast",
            name: "Besan Chilla with Curd",
            description: "Savory gram flour pancakes with yogurt",
            calories: 280,
            protein: 14,
            carbs: 30,
            fat: 12,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvkhNIAtqyM8j1zGdyH40T-MpGPhKa9AElTg&s",
          },
          {
            type: "Lunch",
            name: "Chole Bhature",
            description: "Spiced chickpea curry with fried bread",
            calories: 550,
            protein: 18,
            carbs: 80,
            fat: 20,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLV7xAZVR-Kq2eFVM7H5HDiaHRESqwCeu40w&s",
          },
          {
            type: "Dinner",
            name: "Vegetable Biryani with Raita",
            description: "Fragrant rice dish with mixed vegetables and yogurt",
            calories: 420,
            protein: 12,
            carbs: 65,
            fat: 14,
            image: "https://i.pinimg.com/736x/77/d9/4b/77d94bb16886fa5cc84945be1eb16219.jpg",
          },
        ],
      },
      // Additional days would be added here
    ],
  },
}

export default function MealPlansPage() {
  const { user, addCredits } = useAuth()
  const { toast } = useToast()
  const [selectedPlan, setSelectedPlan] = useState("diabetes")
  const [selectedDay, setSelectedDay] = useState(0)

  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvv, setCardCvv] = useState("")
  const [cardName, setCardName] = useState("")
  const [upiId, setUpiId] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubscribe = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to sign in to subscribe to a meal plan",
        variant: "destructive",
      })
      return
    }

    setShowPaymentForm(true)
  }

  const handlePayment = async () => {
    try {
      setIsProcessing(true)

      if (paymentMethod === "card") {
        if (!cardNumber || !cardExpiry || !cardCvv || !cardName) {
          toast({
            title: "Invalid Card Details",
            description: "Please fill in all card information",
            variant: "destructive"
          })
          return
        }
        
        // Validate card number format
        const cardNumberRegex = /^[0-9]{16}$/
        if (!cardNumberRegex.test(cardNumber.replace(/\s/g, ''))) {
          toast({
            title: "Invalid Card Number",
            description: "Please enter a valid 16-digit card number",
            variant: "destructive"
          })
          return
        }

        // Validate expiry date format (MM/YY)
        const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/
        if (!expiryRegex.test(cardExpiry)) {
          toast({
            title: "Invalid Expiry Date",
            description: "Please enter a valid expiry date (MM/YY)",
            variant: "destructive"
          })
          return
        }

        // Validate CVV format
        const cvvRegex = /^[0-9]{3,4}$/
        if (!cvvRegex.test(cardCvv)) {
          toast({
            title: "Invalid CVV",
            description: "Please enter a valid CVV number",
            variant: "destructive"
          })
          return
        }
      } else if (paymentMethod === "upi") {
        if (!upiId) {
          toast({
            title: "Invalid UPI ID",
            description: "Please enter your UPI ID",
            variant: "destructive"
          })
          return
        }

        // Validate UPI ID format
        const upiRegex = /^[\w.-]+@[\w.-]+$/
        if (!upiRegex.test(upiId)) {
          toast({
            title: "Invalid UPI ID",
            description: "Please enter a valid UPI ID",
            variant: "destructive"
          })
          return
        }
      }

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Add credits for subscribing
      addCredits(100)

      toast({
        title: "Subscription successful!",
        description: "You have successfully subscribed to the meal plan and earned 100 credits!",
      })

      // Reset form
      setShowPaymentForm(false)
      setCardNumber("")
      setCardExpiry("")
      setCardCvv("")
      setCardName("")
      setUpiId("")
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Personalized Meal Plans</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover meal plans tailored to your health goals and dietary preferences. Our nutritionists create
            balanced, delicious meals using traditional Indian recipes.
          </p>
        </div>

        <Tabs defaultValue="diabetes" value={selectedPlan} onValueChange={setSelectedPlan} className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="thyroid">Thyroid</TabsTrigger>
            <TabsTrigger value="heart">Heart Health</TabsTrigger>
            <TabsTrigger value="diabetes">Diabetes</TabsTrigger>
            <TabsTrigger value="weightLoss">Weight Loss</TabsTrigger>
            <TabsTrigger value="vegetarian">Vegetarian</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {showPaymentForm ? (
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                  <CardDescription>Enter your payment information to subscribe to the meal plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <Button
                        variant={paymentMethod === "card" ? "default" : "outline"}
                        onClick={() => setPaymentMethod("card")}
                        className="flex-1"
                      >
                        Credit/Debit Card
                      </Button>
                      <Button
                        variant={paymentMethod === "upi" ? "default" : "outline"}
                        onClick={() => setPaymentMethod("upi")}
                        className="flex-1"
                      >
                        UPI
                      </Button>
                    </div>

                    {paymentMethod === "card" ? (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardName">Cardholder Name</Label>
                          <Input
                            id="cardName"
                            placeholder="John Doe"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="cardExpiry">Expiry Date</Label>
                            <Input
                              id="cardExpiry"
                              placeholder="MM/YY"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="cardCvv">CVV</Label>
                            <Input
                              id="cardCvv"
                              type="password"
                              placeholder="123"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <Label htmlFor="upiId">UPI ID</Label>
                        <Input
                          id="upiId"
                          placeholder="username@upi"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setShowPaymentForm(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handlePayment} disabled={isProcessing}>
                    {isProcessing ? "Processing..." : `Pay ${mealPlans[selectedPlan as keyof typeof mealPlans].price}`}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <>
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{mealPlans[selectedPlan as keyof typeof mealPlans].title}</CardTitle>
                        <CardDescription>{mealPlans[selectedPlan as keyof typeof mealPlans].description}</CardDescription>
                      </div>
                      <div className="flex items-center">
                        <Rating initialValue={mealPlans[selectedPlan as keyof typeof mealPlans].rating} readOnly />
                        <span className="text-sm ml-2">
                          ({mealPlans[selectedPlan as keyof typeof mealPlans].reviews} reviews)
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {mealPlans[selectedPlan as keyof typeof mealPlans].tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <Select
                        value={selectedDay.toString()}
                        onValueChange={(value) => setSelectedDay(Number.parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a day" />
                        </SelectTrigger>
                        <SelectContent>
                          {mealPlans[selectedPlan as keyof typeof mealPlans].days.map((day, index) => (
                            <SelectItem key={index} value={index.toString()}>
                              {day.day}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-6">
                      {mealPlans[selectedPlan as keyof typeof mealPlans].days[selectedDay].meals.map((meal, index) => (
                        <div key={index} className="flex gap-4 p-4 rounded-lg border">
                          <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                            <img
                              src={meal.image || "/placeholder.svg"}
                              alt={meal.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <Badge variant="outline" className="mb-1">
                                  {meal.type}
                                </Badge>
                                <h3 className="font-medium">{meal.name}</h3>
                                <p className="text-sm text-muted-foreground">{meal.description}</p>
                              </div>
                              <Button variant="ghost" size="icon">
                                <Heart className="h-5 w-5" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-4 gap-2 mt-2">
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
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Subscription Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Plan Price</span>
                  <span className="font-medium text-lg">{mealPlans[selectedPlan as keyof typeof mealPlans].price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Duration</span>
                  <span>7 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Meals per day</span>
                  <span>3 (Breakfast, Lunch, Dinner)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Delivery</span>
                  <span>Daily, 7 AM - 7 PM</span>
                </div>

                <div className="rounded-lg bg-primary/10 p-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Plan Benefits</h3>
                    </div>
                  </div>
                  <ul className="space-y-2 pl-7">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Nutritionist consultation included</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Customizable to your preferences</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Detailed nutrition information</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Earn 100 reward points</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button className="w-full" onClick={handleSubscribe}>
                  Subscribe Now
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                  By subscribing, you agree to our{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>
                </div>
              </CardFooter>
            </Card>

            <div className="mt-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our nutritionists can help you choose the right meal plan for your health goals.
                  </p>
                  <Button variant="outline" className="w-full">
                    Schedule a Consultation
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

