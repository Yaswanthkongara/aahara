"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Clock, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function PreBookPage() {
  const { toast } = useToast()
  const [date, setDate] = useState<Date>()
  const [mealType, setMealType] = useState("lunch")
  const [location, setLocation] = useState("")
  const [selectedMeal, setSelectedMeal] = useState("")
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([])
  const [paymentMethod, setPaymentMethod] = useState("upi")
  
  // Payment form state
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvv, setCardCvv] = useState("")
  const [cardName, setCardName] = useState("")

  const handleDietaryChange = (preference: string) => {
    if (dietaryPreferences.includes(preference)) {
      setDietaryPreferences(dietaryPreferences.filter((p) => p !== preference))
    } else {
      setDietaryPreferences([...dietaryPreferences, preference])
    }
  }

  const handlePaymentSubmit = async () => {
    try {
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
      }

      // Validate booking details
      if (!date || !location || !selectedMeal) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required booking details",
          variant: "destructive"
        })
        return
      }

      // Simulate payment processing
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true })
        }, 2000)
      })

      toast({
        title: "Booking Confirmed!",
        description: "Your meal has been successfully pre-booked",
      })

      // Reset form
      setDate(undefined)
      setLocation("")
      setSelectedMeal("")
      setCardNumber("")
      setCardExpiry("")
      setCardCvv("")
      setCardName("")
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Pre-book Your Meal</h1>
        <p className="text-muted-foreground mb-8">
          Reserve your meal in advance to skip the lines and help reduce food waste
        </p>

        <Tabs defaultValue="new-booking" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="new-booking">New Booking</TabsTrigger>
            <TabsTrigger value="my-bookings">My Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="new-booking">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Meal Details</CardTitle>
                  <CardDescription>Choose when and where you'd like to eat</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal" id="date">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Select a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => {
                            return date < new Date(new Date().setHours(0, 0, 0, 0))
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Meal Type</Label>
                    <RadioGroup defaultValue="lunch" className="grid grid-cols-3 gap-4" onValueChange={setMealType}>
                      <div className={cn(
                        "flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:border-primary",
                        mealType === "breakfast" && "border-primary",
                      )}>
                        <RadioGroupItem value="breakfast" id="breakfast" className="sr-only" />
                        <Label htmlFor="breakfast" className="cursor-pointer text-center">
                          <span className="block text-xl mb-1">🍳</span>
                          <span className="block font-medium">Breakfast</span>
                          <span className="block text-xs text-muted-foreground">7:00 - 9:30 AM</span>
                        </Label>
                      </div>
                      <div className={cn(
                        "flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:border-primary",
                        mealType === "lunch" && "border-primary",
                      )}>
                        <RadioGroupItem value="lunch" id="lunch" className="sr-only" />
                        <Label htmlFor="lunch" className="cursor-pointer text-center">
                          <span className="block text-xl mb-1">🥗</span>
                          <span className="block font-medium">Lunch</span>
                          <span className="block text-xs text-muted-foreground">11:30 - 2:00 PM</span>
                        </Label>
                      </div>
                      <div className={cn(
                        "flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:border-primary",
                        mealType === "dinner" && "border-primary",
                      )}>
                        <RadioGroupItem value="dinner" id="dinner" className="sr-only" />
                        <Label htmlFor="dinner" className="cursor-pointer text-center">
                          <span className="block text-xl mb-1">🍽️</span>
                          <span className="block font-medium">Dinner</span>
                          <span className="block text-xs text-muted-foreground">5:00 - 8:00 PM</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Select onValueChange={setLocation}>
                      <SelectTrigger id="location">
                        <SelectValue placeholder="Select a cafeteria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">Main Cafeteria</SelectItem>
                        <SelectItem value="science">Science Building Café</SelectItem>
                        <SelectItem value="dorm">Dormitory Dining Hall</SelectItem>
                        <SelectItem value="student-center">Student Center</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Dietary Preferences</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Nut-Free", "Halal"].map((preference) => (
                        <div
                          key={preference}
                          className={cn(
                            "flex items-center rounded-md border px-3 py-2 cursor-pointer",
                            dietaryPreferences.includes(preference) ? "border-primary bg-primary/10" : "border-muted",
                          )}
                          onClick={() => handleDietaryChange(preference)}
                        >
                          <div className={cn(
                            "mr-2 h-4 w-4 rounded-sm border",
                            dietaryPreferences.includes(preference)
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-muted",
                          )}>
                            {dietaryPreferences.includes(preference) && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-3 w-3"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            )}
                          </div>
                          <span>{preference}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
                      <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="upi">UPI</TabsTrigger>
                        <TabsTrigger value="card">Card</TabsTrigger>
                      </TabsList>

                      <TabsContent value="upi" className="space-y-4">
                        <div className="flex justify-center">
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="w-48 h-48 flex items-center justify-center border-2 border-dashed rounded-lg">
                              <div className="text-center">
                                <p className="text-sm text-muted-foreground">QR Code will be generated</p>
                                <p className="text-sm text-muted-foreground">after order confirmation</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground mb-2">Scan QR code with any UPI app</p>
                          <p className="font-medium">UPI ID: payments.aahara@ybl</p>
                          <p className="text-xs text-muted-foreground mt-2">Payment will be processed securely via UPI</p>
                        </div>
                      </TabsContent>

                      <TabsContent value="card" className="space-y-4">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input 
                              id="card-number" 
                              placeholder="1234 5678 9012 3456"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input 
                                id="expiry" 
                                placeholder="MM/YY"
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV</Label>
                              <Input 
                                id="cvv" 
                                placeholder="123"
                                value={cardCvv}
                                onChange={(e) => setCardCvv(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="name">Name on Card</Label>
                            <Input 
                              id="name" 
                              placeholder="John Doe"
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value)}
                            />
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      onClick={handlePaymentSubmit}
                      disabled={!date || !location || !selectedMeal || 
                        (paymentMethod === "card" && (!cardNumber || !cardExpiry || !cardCvv || !cardName))}
                    >
                      Confirm Booking
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="my-bookings">
            {/* My Bookings content remains unchanged */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

