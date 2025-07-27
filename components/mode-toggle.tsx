"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative h-9 w-9 hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={`Switch theme, current theme is ${theme || 'system'}`}
        >
          <Sun className="h-[1.4rem] w-[1.4rem] rotate-0 scale-100 transform-gpu transition-all duration-300 ease-in-out dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute left-1/2 top-1/2 h-[1.4rem] w-[1.4rem] -translate-x-1/2 -translate-y-1/2 rotate-90 scale-0 transform-gpu transition-all duration-300 ease-in-out dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme ({theme || 'system'} mode)</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem 
          onClick={() => setTheme("light")} 
          className="flex items-center gap-2 cursor-pointer"
        >
          <Sun className="h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")} 
          className="flex items-center gap-2 cursor-pointer"
        >
          <Moon className="h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")} 
          className="flex items-center gap-2 cursor-pointer"
        >
          <span className="flex h-4 w-4 items-center justify-center">💻</span>
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

