"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { Heart, Search, ShoppingBag, Trash2 } from "lucide-react"

// Sample favorite foods data
const initialFavorites = [
  {
    id: 1,
    name: "Masala Dosa",
    description: "Crispy rice crepe filled with spiced potato mixture",
    price: "₹180",
    image: "/placeholder.svg",
    category: "Breakfast",
    rating: 4.8,
    lastOrdered: "2024-01-10",
  },
  {
    id: 2,
    name: "Paneer Butter Masala",
    description: "Cottage cheese cubes in rich tomato gravy",
    price: "₹250",
    image: "/placeholder.svg",
    category: "Main Course",
    rating: 4.6,
    lastOrdered: "2024-01-12",
  },
  {
    id: 3,
    name: "Vegetable Biryani",
    description: "Fragrant rice with mixed vegetables and spices",
    price: "₹220",
    image: "/placeholder.svg",
    category: "Rice",
    rating: 4.7,
    lastOrdered: "2024-01-15",
  },
]

export default function FavoritesPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [favorites, setFavorites] = useState(initialFavorites)
  const [searchQuery, setSearchQuery] = useState("")

  const handleRemoveFavorite = (id: number) => {
    setFavorites(favorites.filter((item) => item.id !== id))
    toast({
      title: "Removed from favorites",
      description: "The item has been removed from your favorites.",
    })
  }

  const handleQuickOrder = (item: typeof favorites[0]) => {
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  const filteredFavorites = favorites.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Your Favorite Foods</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Quick access to your favorite dishes for easy reordering
          </p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search your favorites..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {filteredFavorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFavorites.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-2 right-2">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="rounded-full"
                      onClick={() => handleRemoveFavorite(item.id)}
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium text-lg">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <span className="font-medium">{item.price}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>{item.category}</span>
                    <span>Last ordered: {new Date(item.lastOrdered).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleQuickOrder(item)}
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Quick Order
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                      onClick={() => handleRemoveFavorite(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-20" />
                <h3 className="font-medium text-lg mb-2">
                  {searchQuery ? "No matching favorites found" : "No favorites yet"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery
                    ? "Try a different search term"
                    : "Start adding your favorite dishes to access them quickly"}
                </p>
                {!searchQuery && (
                  <Button asChild>
                    <a href="/menu">Browse Menu</a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}