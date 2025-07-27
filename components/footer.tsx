import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary-foreground border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <span className="text-primary">आहार</span>
              <span>Aahara</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Personalized meal planning and food delivery for health-conscious individuals.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/menu" className="text-muted-foreground hover:text-foreground transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/meal-plans" className="text-muted-foreground hover:text-foreground transition-colors">
                  Meal Plans
                </Link>
              </li>
              <li>
                <Link href="/nutrition" className="text-muted-foreground hover:text-foreground transition-colors">
                  Nutrition Tracker
                </Link>
              </li>
              <li>
                <Link href="/rewards" className="text-muted-foreground hover:text-foreground transition-colors">
                  Rewards Program
                </Link>
              </li>
              <li>
                <Link href="/pre-book" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pre-book Meals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Health Conditions</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/health/diabetes" className="text-muted-foreground hover:text-foreground transition-colors">
                  Diabetes
                </Link>
              </li>
              <li>
                <Link href="/health/thyroid" className="text-muted-foreground hover:text-foreground transition-colors">
                  Thyroid
                </Link>
              </li>
              <li>
                <Link href="/health/heart" className="text-muted-foreground hover:text-foreground transition-colors">
                  Heart Health
                </Link>
              </li>
              <li>
                <Link
                  href="/health/weight-loss"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Weight Management
                </Link>
              </li>
              <li>
                <Link href="/health/general" className="text-muted-foreground hover:text-foreground transition-colors">
                  General Wellness
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Contact Us</h3>
            <address className="not-italic text-muted-foreground space-y-2">
              <p>123 Wellness Street</p>
              <p>Healthy Living District</p>
              <p>Bangalore, India 560001</p>
              <p className="mt-4">
                <a href="tel:+919876543210" className="hover:text-foreground transition-colors">
                  +91 98765 43210
                </a>
              </p>
              <p>
                <a href="mailto:info@aahara.com" className="hover:text-foreground transition-colors">
                  info@aahara.com
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Aahara. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

