"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type User = {
  id: string
  name: string
  email: string
  image?: string
  credits: number
  dietaryPreferences: string[]
}

type AuthContextType = {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signOut: () => void
  addCredits: (amount: number) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("aahara-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    // In a real app, this would make an API call to authenticate
    // For demo purposes, we'll simulate a successful login
    const mockUser: User = {
      id: "user-1",
      name: "Arjun Sharma",
      email,
      image: "/placeholder.svg?height=32&width=32",
      credits: 150,
      dietaryPreferences: ["Vegetarian", "Low Sugar"],
    }

    setUser(mockUser)
    localStorage.setItem("aahara-user", JSON.stringify(mockUser))
  }

  const signUp = async (name: string, email: string, password: string) => {
    // In a real app, this would make an API call to register
    // For demo purposes, we'll simulate a successful registration
    const mockUser: User = {
      id: "user-" + Date.now(),
      name,
      email,
      credits: 50, // Starting credits for new users
      dietaryPreferences: [],
    }

    setUser(mockUser)
    localStorage.setItem("aahara-user", JSON.stringify(mockUser))
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("aahara-user")
  }

  const addCredits = (amount: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        credits: user.credits + amount,
      }
      setUser(updatedUser)
      localStorage.setItem("aahara-user", JSON.stringify(updatedUser))
    }
  }

  return <AuthContext.Provider value={{ user, signIn, signUp, signOut, addCredits }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

