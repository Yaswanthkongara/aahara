"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { Award, Check, Gift, History, RotateCw, Sparkles, Star, Trophy } from "lucide-react"

// Sample rewards data
const rewards = [
  {
    id: 1,
    title: "Free Delivery",
    description: "Get free delivery on your next order",
    points: 100,
    image: "/placeholder.svg?height=100&width=100",
    category: "delivery",
  },
  {
    id: 2,
    title: "10% Off Coupon",
    description: "Get 10% off on your next order",
    points: 150,
    image: "/placeholder.svg?height=100&width=100",
    category: "discount",
  },
  {
    id: 3,
    title: "Free Dessert",
    description: "Get a free dessert with your next meal",
    points: 200,
    image: "/placeholder.svg?height=100&width=100",
    category: "food",
  },
  {
    id: 4,
    title: "Priority Delivery",
    description: "Get priority delivery on your next order",
    points: 250,
    image: "/placeholder.svg?height=100&width=100",
    category: "delivery",
  },
  {
    id: 5,
    title: "Nutritionist Consultation",
    description: "Get a free 30-minute consultation with our nutritionist",
    points: 500,
    image: "/placeholder.svg?height=100&width=100",
    category: "health",
  },
  {
    id: 6,
    title: "Meal Plan Discount",
    description: "Get 20% off on any meal plan",
    points: 350,
    image: "/placeholder.svg?height=100&width=100",
    category: "discount",
  },
]

// Sample reward history
const rewardHistory = [
  {
    id: 1,
    title: "Free Delivery",
    points: 100,
    date: "2023-05-10",
    status: "redeemed",
  },
  {
    id: 2,
    title: "10% Off Coupon",
    points: 150,
    date: "2023-04-25",
    status: "redeemed",
  },
  {
    id: 3,
    title: "Meal Plan Discount",
    points: 350,
    date: "2023-04-15",
    status: "expired",
  },
]

// Sample achievements
const achievements = [
  {
    id: 1,
    title: "First Order",
    description: "Place your first order",
    points: 50,
    completed: true,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    title: "Healthy Streak",
    description: "Order healthy meals for 5 consecutive days",
    points: 100,
    completed: true,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    title: "Nutrition Master",
    description: "Log your meals for 10 consecutive days",
    points: 150,
    completed: false,
    progress: 7,
    total: 10,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 4,
    title: "Variety Seeker",
    description: "Try 10 different dishes",
    points: 200,
    completed: false,
    progress: 6,
    total: 10,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 5,
    title: "Referral Champion",
    description: "Refer 5 friends to Aahara",
    points: 250,
    completed: false,
    progress: 2,
    total: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
]

export default function RewardsPage() {
  const { user, addCredits } = useAuth()
  const { toast } = useToast()
  const [isSpinning, setIsSpinning] = useState(false)
  const [spinResult, setSpinResult] = useState<string | null>(null)
  const [filter, setFilter] = useState("all")

  const filteredRewards = filter === "all" ? rewards : rewards.filter((reward) => reward.category === filter)

  const handleRedeemReward = (rewardId: number, points: number) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to sign in to redeem rewards",
        variant: "destructive",
      })
      return
    }

    if ((user?.credits || 0) < points) {
      toast({
        title: "Insufficient points",
        description: "You don't have enough points to redeem this reward",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would make an API call to redeem the reward
    addCredits(-points)

    toast({
      title: "Reward redeemed!",
      description: `You have successfully redeemed ${rewards.find((r) => r.id === rewardId)?.title}`,
    })
  }

  const handleSpinWheel = () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to sign in to spin the wheel",
        variant: "destructive",
      })
      return
    }

    if ((user?.credits || 0) < 50) {
      toast({
        title: "Insufficient points",
        description: "You need 50 points to spin the wheel",
        variant: "destructive",
      })
      return
    }

    setIsSpinning(true)
    setSpinResult(null)

    // Simulate wheel spinning
    setTimeout(() => {
      const prizes = ["50 points", "100 points", "Free Delivery", "10% Off", "Better luck next time", "Free Dessert"]
      const result = prizes[Math.floor(Math.random() * prizes.length)]
      setSpinResult(result)
      setIsSpinning(false)

      if (result === "50 points") {
        addCredits(50)
      } else if (result === "100 points") {
        addCredits(100)
      } else if (result === "Better luck next time") {
        // No reward
      } else {
        // Add the reward to user's account
      }

      // Deduct points for spinning
      addCredits(-50)
    }, 3000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Rewards Program</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Earn points for every order, complete challenges, and redeem exciting rewards. The more you use Aahara, the
            more you earn!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5 text-primary" />
                Your Rewards
              </CardTitle>
              <CardDescription>You have {user?.credits || 0} points available</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Level Progress</span>
                    <span className="text-sm font-medium">{user?.credits || 0}/500 points to next level</span>
                  </div>
                  <Progress value={((user?.credits || 0) % 500) / 5} className="h-2" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Trophy className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Level {Math.floor((user?.credits || 0) / 500) + 1}</p>
                      <p className="text-sm text-muted-foreground">
                        {Math.floor((user?.credits || 0) / 500) === 0
                          ? "Beginner"
                          : Math.floor((user?.credits || 0) / 500) === 1
                            ? "Silver"
                            : Math.floor((user?.credits || 0) / 500) === 2
                              ? "Gold"
                              : "Platinum"}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Benefits
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <RotateCw className="mr-2 h-5 w-5 text-primary" />
                Spin the Wheel
              </CardTitle>
              <CardDescription>Spend 50 points for a chance to win rewards</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative w-40 h-40 mb-4">
                <div
                  className={`w-full h-full rounded-full border-4 border-primary bg-primary/10 flex items-center justify-center ${
                    isSpinning ? "animate-spin" : ""
                  }`}
                >
                  {spinResult ? (
                    <div className="text-center">
                      <p className="font-medium text-sm">{spinResult}</p>
                      {spinResult !== "Better luck next time" && (
                        <Sparkles className="h-4 w-4 mx-auto mt-1 text-yellow-500" />
                      )}
                    </div>
                  ) : (
                    <Gift className="h-8 w-8 text-primary" />
                  )}
                </div>
              </div>
              <Button onClick={handleSpinWheel} disabled={isSpinning || (user?.credits || 0) < 50} className="w-full">
                {isSpinning ? "Spinning..." : "Spin to Win"}
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="rewards" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="rewards">Available Rewards</TabsTrigger>
            <TabsTrigger value="history">Reward History</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="rewards">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Available Rewards</h2>
              <div className="flex gap-2">
                <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
                  All
                </Button>
                <Button variant={filter === "food" ? "default" : "outline"} size="sm" onClick={() => setFilter("food")}>
                  Food
                </Button>
                <Button
                  variant={filter === "discount" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("discount")}
                >
                  Discounts
                </Button>
                <Button
                  variant={filter === "delivery" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("delivery")}
                >
                  Delivery
                </Button>
                <Button
                  variant={filter === "health" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("health")}
                >
                  Health
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredRewards.map((reward) => (
                <Card key={reward.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-16 h-16 rounded-md overflow-hidden">
                        <img
                          src={reward.image || "/placeholder.svg"}
                          alt={reward.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center bg-primary/10 px-2 py-1 rounded-full">
                        <Star className="h-4 w-4 text-primary mr-1 fill-primary" />
                        <span className="text-sm font-medium">{reward.points}</span>
                      </div>
                    </div>
                    <h3 className="font-medium text-lg mb-1">{reward.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{reward.description}</p>
                    <Button
                      className="w-full"
                      disabled={(user?.credits || 0) < reward.points}
                      onClick={() => handleRedeemReward(reward.id, reward.points)}
                    >
                      {(user?.credits || 0) >= reward.points ? "Redeem" : "Not Enough Points"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <History className="mr-2 h-5 w-5" />
                  Reward History
                </CardTitle>
                <CardDescription>View your past reward redemptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rewardHistory.length > 0 ? (
                    rewardHistory.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <span>{new Date(item.date).toLocaleDateString()}</span>
                            <span className="mx-2">•</span>
                            <span>{item.points} points</span>
                          </div>
                        </div>
                        <div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              item.status === "redeemed"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                            }`}
                          >
                            {item.status === "redeemed" ? "Redeemed" : "Expired"}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Gift className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-20" />
                      <p className="text-muted-foreground">You haven't redeemed any rewards yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="mr-2 h-5 w-5" />
                  Achievements
                </CardTitle>
                <CardDescription>Complete challenges to earn points and unlock achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 border rounded-lg ${achievement.completed ? "bg-primary/5" : ""}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <img
                            src={achievement.image || "/placeholder.svg"}
                            alt={achievement.title}
                            className="w-8 h-8 object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{achievement.title}</h3>
                              <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            </div>
                            <div className="flex items-center bg-primary/10 px-2 py-1 rounded-full">
                              <Star className="h-4 w-4 text-primary mr-1 fill-primary" />
                              <span className="text-sm font-medium">{achievement.points}</span>
                            </div>
                          </div>
                          {!achievement.completed && achievement.progress !== undefined && (
                            <div className="mt-2">
                              <div className="flex justify-between text-xs mb-1">
                                <span>Progress</span>
                                <span>
                                  {achievement.progress}/{achievement.total}
                                </span>
                              </div>
                              <Progress value={(achievement.progress / achievement.total) * 100} className="h-2" />
                            </div>
                          )}
                        </div>
                        {achievement.completed && (
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center dark:bg-green-900">
                            <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

