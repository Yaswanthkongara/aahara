"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/components/auth-provider"
import { Menu, ShoppingBag, User, LogOut, Heart, Award, BarChart3 } from "lucide-react"
import { useCart } from "@/components/cart-provider"

export default function Navbar() {
  const { user, signOut } = useAuth()
  const { totalItems } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-background"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col gap-6 py-6">
                  <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <span className="text-primary">आहार</span>
                    <span>Aahara</span>
                  </Link>
                  <nav className="flex flex-col gap-4">
                    <Link href="/menu" className="text-muted-foreground hover:text-foreground transition-colors">
                      Menu
                    </Link>
                    <Link href="/meal-plans" className="text-muted-foreground hover:text-foreground transition-colors">
                      Meal Plans
                    </Link>
                    <Link href="/nutrition" className="text-muted-foreground hover:text-foreground transition-colors">
                      Nutrition Tracker
                    </Link>
                    <Link href="/rewards" className="text-muted-foreground hover:text-foreground transition-colors">
                      Rewards
                    </Link>
                    <Link href="/pre-book" className="text-muted-foreground hover:text-foreground transition-colors">
                      Pre-book
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center gap-2 font-bold text-xl ml-2 md:ml-0">
              <span className="text-primary">आहार</span>
              <span>Aahara</span>
            </Link>

            <nav className="hidden md:flex ml-10 gap-6">
              <Link href="/menu" className="text-muted-foreground hover:text-foreground transition-colors">
                Menu
              </Link>
              <Link href="/meal-plans" className="text-muted-foreground hover:text-foreground transition-colors">
                Meal Plans
              </Link>
              <Link href="/nutrition" className="text-muted-foreground hover:text-foreground transition-colors">
                Nutrition Tracker
              </Link>
              <Link href="/rewards" className="text-muted-foreground hover:text-foreground transition-colors">
                Rewards
              </Link>
              <Link href="/pre-book" className="text-muted-foreground hover:text-foreground transition-colors">
                Pre-book
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <ModeToggle />

            <Button variant="outline" size="icon" asChild className="relative">
              <Link href="/cart">
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
                <span className="sr-only">Cart ({totalItems} items)</span>
              </Link>
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                      <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders" className="cursor-pointer">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      <span>Orders</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/favorites" className="cursor-pointer">
                      <Heart className="mr-2 h-4 w-4" />
                      <span>Favorites</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/rewards" className="cursor-pointer">
                      <Award className="mr-2 h-4 w-4" />
                      <span>Rewards</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/nutrition" className="cursor-pointer">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      <span>Nutrition</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

