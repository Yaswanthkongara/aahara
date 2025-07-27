"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import { Clock, Package, Truck, CheckCircle } from "lucide-react"

// Sample order data
const orders = [
  {
    id: "ORD001",
    date: "2024-01-15",
    items: [
      { name: "Masala Dosa", quantity: 2, price: "₹180" },
      { name: "Filter Coffee", quantity: 1, price: "₹40" },
    ],
    total: "₹400",
    status: "delivered",
    deliveryTime: "12:30 PM",
    location: "Main Cafeteria",
  },
  {
    id: "ORD002",
    date: "2024-01-14",
    items: [
      { name: "Vegetable Biryani", quantity: 1, price: "₹220" },
      { name: "Raita", quantity: 1, price: "₹40" },
    ],
    total: "₹260",
    status: "processing",
    deliveryTime: "7:00 PM",
    location: "Dorm Dining Hall",
  },
]

export default function OrdersPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("active")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Clock className="h-4 w-4" />
      case "preparing":
        return <Package className="h-4 w-4" />
      case "delivering":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "preparing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "delivering":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Your Orders</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track your orders, view order history, and manage your deliveries
          </p>
        </div>

        <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="active">Active Orders</TabsTrigger>
            <TabsTrigger value="history">Order History</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div className="space-y-6">
              {orders
                .filter((order) => order.status !== "delivered")
                .map((order) => (
                  <Card key={order.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>Order #{order.id}</CardTitle>
                          <CardDescription>
                            {new Date(order.date).toLocaleDateString()} at {order.deliveryTime}
                          </CardDescription>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border-b pb-4">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center mb-2">
                              <div>
                                <span className="font-medium">{item.quantity}x </span>
                                <span>{item.name}</span>
                              </div>
                              <span>{item.price}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-muted-foreground">
                            Delivery at {order.location}
                          </div>
                          <div className="font-medium">Total: {order.total}</div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" className="w-full">
                            Track Order
                          </Button>
                          <Button variant="outline" className="w-full">
                            Support
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="space-y-6">
              {orders
                .filter((order) => order.status === "delivered")
                .map((order) => (
                  <Card key={order.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>Order #{order.id}</CardTitle>
                          <CardDescription>
                            {new Date(order.date).toLocaleDateString()} at {order.deliveryTime}
                          </CardDescription>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border-b pb-4">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center mb-2">
                              <div>
                                <span className="font-medium">{item.quantity}x </span>
                                <span>{item.name}</span>
                              </div>
                              <span>{item.price}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-muted-foreground">
                            Delivered to {order.location}
                          </div>
                          <div className="font-medium">Total: {order.total}</div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" className="w-full">
                            Reorder
                          </Button>
                          <Button variant="outline" className="w-full">
                            Leave Review
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}