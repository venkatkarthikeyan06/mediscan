"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Shield,
  Menu,
  Stethoscope,
  Pill,
  Syringe,
  Heart,
  Brain,
  MapPin,
  Apple,
  GraduationCap,
  User,
  Bell,
  Hospital,
  Phone,
  MessageCircle,
  Eye,
  Mic,
  Camera,
  Leaf,
  Recycle,
  Wind,
  Video,
  TreePine,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { LogOut } from "lucide-react"

const healthFeatures = [
  {
    title: "Symptom Checker",
    href: "/symptom-checker",
    description: "AI-powered tool for possible conditions with WHO/CDC guidance",
    icon: Stethoscope,
  },
  {
    title: "Medicine Verification",
    href: "/medicine-verification",
    description: "Barcode/QR scan to verify authenticity and view safety alerts",
    icon: Pill,
  },
  {
    title: "Vaccine Tracker",
    href: "/vaccine-tracker",
    description: "Secure record storage and reminders for due vaccines",
    icon: Syringe,
  },
  {
    title: "Emergency & First Aid",
    href: "/emergency-aid",
    description: "Step-by-step first aid guides (CPR, burns, bleeding)",
    icon: Heart,
  },
  {
    title: "Mental Health Support",
    href: "/mental-health",
    description: "Resources, helplines, stress management tips",
    icon: Brain,
  },
  {
    title: "Disease Outbreak Alerts",
    href: "/outbreak-alerts",
    description: "Real-time outbreak map with preventive measures",
    icon: MapPin,
  },
  {
    title: "Nutrition & Lifestyle",
    href: "/nutrition",
    description: "Evidence-based diet plans and meal recommendations",
    icon: Apple,
  },
  {
    title: "Health Quiz & Learning",
    href: "/health-quiz",
    description: "Fun quizzes and reward badges for learning",
    icon: GraduationCap,
  },
  {
    title: "Hospital & Pharmacy Locator",
    href: "/hospital-locator",
    description: "Find nearby trusted hospitals, clinics, and 24/7 pharmacies",
    icon: Hospital,
  },
  {
    title: "Health Emergency Button",
    href: "/emergency-button",
    description: "One-tap emergency call with location sharing",
    icon: Phone,
  },
  {
    title: "AI Myth-Busting Chatbot",
    href: "/ai-chatbot",
    description: "Conversational AI for real-time health question verification",
    icon: MessageCircle,
  },
  {
    title: "Deepfake Detection",
    href: "/deepfake-detection",
    description: "Advanced media authenticity verification for health content",
    icon: Eye,
  },
  {
    title: "AI Voice Health Assistant",
    href: "/voice-assistant",
    description: "Voice-enabled health queries with multilingual speech synthesis",
    icon: Mic,
  },
  {
    title: "Medical Image Quick-Check",
    href: "/image-checker",
    description: "Scan medicine labels and detect health warning signs in images",
    icon: Camera,
  },
]

const sustainableFeatures = [
  {
    title: "Sustainable Nutrition Tracker",
    href: "/sustainable-nutrition",
    description: "Eco-friendly, locally sourced, plant-based diets with carbon footprint insights",
    icon: Leaf,
  },
  {
    title: "Eco-Friendly Medicine Disposal",
    href: "/medicine-disposal",
    description: "Safe disposal instructions with local disposal point locator",
    icon: Recycle,
  },
  {
    title: "Air & Water Quality Alerts",
    href: "/quality-alerts",
    description: "Pollution monitoring with protective health measures",
    icon: Wind,
  },
  {
    title: "Telehealth Integration",
    href: "/telehealth",
    description: "Virtual consultations to reduce travel emissions",
    icon: Video,
  },
  {
    title: "Sustainable Fitness",
    href: "/sustainable-fitness",
    description: "Eco-friendly activities like walking, cycling, yoga",
    icon: TreePine,
  },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout, isLoading } = useAuth()

  if (isLoading) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-emerald-600">
            <Shield className="h-6 w-6" />
            MediScan
          </Link>
          <div className="animate-pulse bg-gray-200 h-8 w-24 rounded"></div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-emerald-600">
          <Shield className="h-6 w-6" />
          MediScan
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/submit" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Verify Content
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Health Tools</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[700px] grid-cols-2 gap-3 p-4 max-h-96 overflow-y-auto">
                  {healthFeatures.map((feature) => (
                    <Link
                      key={feature.href}
                      href={feature.href}
                      className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      <div className="flex items-center gap-2 text-sm font-medium leading-none group-hover:underline">
                        <feature.icon className="h-4 w-4 text-emerald-600" />
                        {feature.title}
                      </div>
                      <div className="line-clamp-2 text-xs leading-snug text-gray-500">{feature.description}</div>
                    </Link>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Sustainable</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[600px] grid-cols-1 gap-3 p-4 max-h-96 overflow-y-auto">
                  {sustainableFeatures.map((feature) => (
                    <Link
                      key={feature.href}
                      href={feature.href}
                      className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      <div className="flex items-center gap-2 text-sm font-medium leading-none group-hover:underline">
                        <feature.icon className="h-4 w-4 text-green-600" />
                        {feature.title}
                      </div>
                      <div className="line-clamp-2 text-xs leading-snug text-gray-500">{feature.description}</div>
                    </Link>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/sources" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Trusted Sources
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {user && (
              <NavigationMenuItem>
                <Link href="/dashboard" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Dashboard
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* User Actions */}
        <div className="flex items-center gap-2">
          {user && (
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Bell className="h-4 w-4 mr-2" />
              Alerts
            </Button>
          )}

          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 hidden md:block">
                Welcome, {user.name || user.email.split("@")[0]}
              </span>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
              <Link href="/login">
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  Get Started
                </Button>
              </Link>
            </>
          )}

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-4 mt-8">
                {user && (
                  <div className="pb-4 border-b">
                    <p className="text-sm text-gray-600">Welcome,</p>
                    <p className="font-medium">{user.name || user.email.split("@")[0]}</p>
                  </div>
                )}

                <Link href="/submit" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  Verify Content
                </Link>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-gray-900">Health Tools</h3>
                  <div className="max-h-60 overflow-y-auto space-y-3">
                    {healthFeatures.map((feature) => (
                      <Link
                        key={feature.href}
                        href={feature.href}
                        className="flex items-start gap-3 p-2 rounded-md hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                      >
                        <feature.icon className="h-5 w-5 text-emerald-600 mt-0.5" />
                        <div>
                          <div className="font-medium text-sm">{feature.title}</div>
                          <div className="text-xs text-gray-500 mt-1">{feature.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-gray-900">Sustainable</h3>
                  <div className="max-h-60 overflow-y-auto space-y-3">
                    {sustainableFeatures.map((feature) => (
                      <Link
                        key={feature.href}
                        href={feature.href}
                        className="flex items-start gap-3 p-2 rounded-md hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                      >
                        <feature.icon className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <div className="font-medium text-sm">{feature.title}</div>
                          <div className="text-xs text-gray-500 mt-1">{feature.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <Link href="/sources" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  Trusted Sources
                </Link>

                {user && (
                  <Link href="/dashboard" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                    Dashboard
                  </Link>
                )}

                {user ? (
                  <Button
                    variant="outline"
                    onClick={() => {
                      logout()
                      setIsOpen(false)
                    }}
                    className="mt-4"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                ) : (
                  <div className="flex flex-col gap-2 mt-4">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full bg-transparent">
                        <User className="h-4 w-4 mr-2" />
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Get Started</Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
