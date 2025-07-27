"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Clock, ShoppingBag, Heart } from "lucide-react"
import Rating from "@/components/rating"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/components/cart-provider"

interface DishCardProps {
  id: string
  name: string
  description: string
  image: string
  price: string
  rating: number
  reviewCount?: number
  prepTime?: string
  tags: string[]
  vegetarian?: boolean
  onRatingChange?: (id: string, rating: number) => void
}

export default function DishCard({
  id,
  name,
  description,
  image,
  price,
  rating,
  reviewCount,
  prepTime,
  tags,
  vegetarian,
  onRatingChange,
}: DishCardProps) {
  const { user, addCredits } = useAuth()
  const { toast } = useToast()
  const { addItem } = useCart()
  const [isFavorite, setIsFavorite] = useState(false)
  const [showRating, setShowRating] = useState(false)

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)

    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite
        ? `${name} has been removed from your favorites`
        : `${name} has been added to your favorites`,
    })
  }

  const handleRatingClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowRating(!showRating)
  }

  const handleRatingChange = (newRating: number) => {
    if (onRatingChange) {
      onRatingChange(id, newRating)
    }

    setShowRating(false)

    // Add credits for rating
    if (user) {
      addCredits(10)

      toast({
        title: "Thank you for your rating!",
        description: `You've earned 10 credits for rating ${name}`,
      })
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id,
      name,
      price: parseFloat(price.replace(/[^0-9.-]+/g, "")),
      image,
    })
  }

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="aspect-video relative">
        <img src={image || "/placeholder.svg"} alt={name} className="object-cover w-full h-full" />
        <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-md px-2 py-1 flex items-center">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
          <span className="text-xs font-medium">{rating}</span>
          {reviewCount && <span className="text-xs ml-1">({reviewCount})</span>}
        </div>
        {vegetarian && (
          <div className="absolute top-2 left-2 bg-green-500/90 text-white text-xs font-medium px-2 py-1 rounded-md">
            Veg
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
          onClick={toggleFavorite}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
        </Button>
      </div>
      <CardContent className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium">{name}</h3>
          <span className="font-medium text-sm">{price}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-grow">{description}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center">
          {prepTime && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              <span>{prepTime}</span>
            </div>
          )}
          <div className="flex gap-2 ml-auto">
            <Button size="sm" variant="outline" onClick={handleRatingClick}>
              Rate
            </Button>
            <Link href={`/dish/${id}`}>
              <Button size="sm" variant="outline">
                View
              </Button>
            </Link>
            <Button size="sm" onClick={handleAddToCart}>
              <ShoppingBag className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {showRating && (
          <div className="mt-3 p-3 border rounded-md">
            <p className="text-sm font-medium mb-2">Rate this dish:</p>
            <div className="flex justify-between items-center">
              <Rating size="lg" onRatingChange={handleRatingChange} />
              <Button size="sm" variant="ghost" onClick={() => setShowRating(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

