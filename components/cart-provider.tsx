"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalAmount: number
}

// Initialize context with default values
const defaultCartContext: CartContextType = {
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalAmount: 0,
}

const CartContext = createContext<CartContextType>(defaultCartContext)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast()
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    try {
      // Load cart from localStorage
      const savedCart = localStorage.getItem("aahara-cart")
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)
        if (Array.isArray(parsedCart)) {
          setItems(parsedCart)
        }
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error)
      toast({
        title: "Error",
        description: "Failed to load your cart",
        variant: "destructive",
      })
    }
  }, [])

  useEffect(() => {
    try {
      // Save cart to localStorage whenever it changes
      localStorage.setItem("aahara-cart", JSON.stringify(items))
    } catch (error) {
      console.error("Error saving cart to localStorage:", error)
      toast({
        title: "Error",
        description: "Failed to save your cart",
        variant: "destructive",
      })
    }
  }, [items])

  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === newItem.id)

      if (existingItem) {
        // Update quantity if item exists
        return currentItems.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }

      // Add new item with quantity 1
      return [...currentItems, { ...newItem, quantity: 1 }]
    })

    toast({
      title: "Item added to cart",
      description: `${newItem.name} has been added to your cart`,
    })
  }

  const removeItem = (id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id))

    toast({
      title: "Item removed from cart",
      description: "The item has been removed from your cart",
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id)
      return
    }

    setItems((currentItems) =>
      currentItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => {
    setItems([])
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    })
  }

  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextType {
  const context = useContext(CartContext)
  return context
}