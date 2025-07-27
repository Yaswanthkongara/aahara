"use client"

import { useState } from "react"
import { Star } from "lucide-react"

interface RatingProps {
  initialValue?: number
  totalStars?: number
  size?: "sm" | "md" | "lg"
  readOnly?: boolean
  onRatingChange?: (rating: number) => void
}

export default function Rating({
  initialValue = 0,
  totalStars = 5,
  size = "md",
  readOnly = false,
  onRatingChange,
}: RatingProps) {
  const [rating, setRating] = useState(initialValue)
  const [hoverRating, setHoverRating] = useState(0)

  const starSizes = {
    sm: "h-3 w-3",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  const handleClick = (value: number) => {
    if (readOnly) return
    setRating(value)
    if (onRatingChange) {
      onRatingChange(value)
    }
  }

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1
        return (
          <button
            key={index}
            type="button"
            className={`${readOnly ? "cursor-default" : "cursor-pointer"} p-0.5`}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => !readOnly && setHoverRating(starValue)}
            onMouseLeave={() => !readOnly && setHoverRating(0)}
            disabled={readOnly}
          >
            <Star
              className={`${starSizes[size]} ${
                (hoverRating || rating) >= starValue
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300 dark:text-gray-600"
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}

