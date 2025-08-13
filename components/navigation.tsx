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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
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
  AlertTriangle,
  Info,
  CheckCircle,
  X,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { LogOut } from "lucide-react"

interface Alert {
  id: string
  type: "health" | "environment" | "outbreak" | "safety"
  title: string
  message: string
  timestamp: Date
  priority: "low" | "medium" | "high"
  read: boolean
  location?: string
}

const sampleAlerts: Alert[] = [
  {
    id: "1",
    type: "health",
    title: "Dengue Alert - Bangalore",
    message: "Increased dengue cases reported in Bangalore. Take preventive measures against mosquito breeding.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    priority: "high",
    read: false,
    location: "Bangalore",
  },
  {
    id: "2",
    type: "environment",
    title: "Air Quality Alert",
    message: "Air quality index is unhealthy (AQI: 165). Limit outdoor activities and wear masks.",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    priority: "medium",
    read: false,
    location: "Bangalore",
  },
  {
    id: "3",
    type: "outbreak",
    title: "H3N2 Influenza Update",
    message: "Seasonal flu cases rising. Get vaccinated and practice good hygiene.",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    priority: "medium",
    read: true,
    location: "Karnataka",
  },
  {
    id: "4",
    type: "safety",
    title: "Medicine Recall Notice",
    message: "Batch #XYZ123 of Paracetamol tablets recalled due to quality concerns. Check your medicine cabinet.",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    priority: "high",
    read: false,
  },
  {
    id: "5",
    type: "environment",
    title: "Water Quality Advisory",
    message: "Temporary water quality issues in select areas. Boil water before consumption.",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    priority: "medium",
    read: true,
    location: "Bangalore",
  },
]

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
  const [alerts, setAlerts] = useState<Alert[]>(sampleAlerts)
  const [isAlertsOpen, setIsAlertsOpen] = useState(false)
  const { user, logout, isLoading } = useAuth()

  const getAlertIcon = (type: Alert["type"], priority: Alert["priority"]) => {
    if (priority === "high") return AlertTriangle
    if (type === "health" || type === "outbreak") return Heart
    if (type === "environment") return Wind
    if (type === "safety") return Shield
    return Info
  }

  const getAlertColor = (priority: Alert["priority"]) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-orange-600"
      case "low":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    return "Just now"
  }

  const markAsRead = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, read: true } : alert)))
  }

  const dismissAlert = (alertId: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId))
  }

  const unreadCount = alerts.filter((alert) => !alert.read).length

  if (isLoading) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-emerald-600">
            <Shield className="h-6 w-6" />
            <span className="hidden sm:block">MediScan</span>
            <span className="sm:hidden">MS</span>
          </Link>
          <div className="animate-pulse bg-gray-200 h-8 w-24 rounded"></div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-emerald-600">
          <Shield className="h-6 w-6" />
          <span className="hidden sm:block">MediScan</span>
          <span className="sm:hidden">MS</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
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
                <div className="w-[90vw] max-w-[700px] grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 max-h-[70vh] overflow-y-auto">
                  {healthFeatures.map((feature) => (
                    <Link
                      key={feature.href}
                      href={feature.href}
                      className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      <div className="flex items-center gap-2 text-sm font-medium leading-none group-hover:underline">
                        <feature.icon className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                        <span className="truncate">{feature.title}</span>
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
                <div className="w-[90vw] max-w-[600px] grid grid-cols-1 gap-3 p-4 max-h-[70vh] overflow-y-auto">
                  {sustainableFeatures.map((feature) => (
                    <Link
                      key={feature.href}
                      href={feature.href}
                      className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      <div className="flex items-center gap-2 text-sm font-medium leading-none group-hover:underline">
                        <feature.icon className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="truncate">{feature.title}</span>
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
                  <span className="hidden lg:block">Trusted Sources</span>
                  <span className="lg:hidden">Sources</span>
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
            <Popover open={isAlertsOpen} onOpenChange={setIsAlertsOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="hidden sm:ml-2 sm:block">Alerts</span>
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500 hover:bg-red-500">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[90vw] max-w-96 p-0" align="end">
                <div className="border-b p-4">
                  <h3 className="font-semibold text-lg">Health & Environment Alerts</h3>
                  <p className="text-sm text-gray-600">Stay informed about health and environmental updates</p>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {alerts.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                      <p>No alerts at this time</p>
                      <p className="text-xs">We'll notify you of any important updates</p>
                    </div>
                  ) : (
                    alerts.map((alert) => {
                      const IconComponent = getAlertIcon(alert.type, alert.priority)
                      return (
                        <div
                          key={alert.id}
                          className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${!alert.read ? "bg-blue-50" : ""}`}
                          onClick={() => markAsRead(alert.id)}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3 flex-1 min-w-0">
                              <IconComponent
                                className={`h-5 w-5 mt-0.5 flex-shrink-0 ${getAlertColor(alert.priority)}`}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4
                                    className={`font-medium text-sm truncate ${!alert.read ? "text-gray-900" : "text-gray-700"}`}
                                  >
                                    {alert.title}
                                  </h4>
                                  {!alert.read && (
                                    <div className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                  )}
                                </div>
                                <p className="text-xs text-gray-600 mb-2 line-clamp-3">{alert.message}</p>
                                <div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
                                  <span>{formatTimestamp(alert.timestamp)}</span>
                                  {alert.location && (
                                    <>
                                      <span>•</span>
                                      <span className="truncate">{alert.location}</span>
                                    </>
                                  )}
                                  <Badge variant="outline" className="text-xs">
                                    {alert.type}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-gray-200 flex-shrink-0"
                              onClick={(e) => {
                                e.stopPropagation()
                                dismissAlert(alert.id)
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
                {alerts.length > 0 && (
                  <div className="p-3 border-t bg-gray-50">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-xs"
                      onClick={() => {
                        setAlerts((prev) => prev.map((alert) => ({ ...alert, read: true })))
                      }}
                    >
                      Mark all as read
                    </Button>
                  </div>
                )}
              </PopoverContent>
            </Popover>
          )}

          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 hidden lg:block max-w-32 truncate">
                Welcome, {user.name || user.email.split("@")[0]}
              </span>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:ml-2 sm:block">Sign Out</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:ml-2 sm:block">Sign In</span>
                </Button>
              </Link>
              <Link href="/login">
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  <span className="hidden sm:block">Get Started</span>
                  <span className="sm:hidden">Start</span>
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm">
              <div className="flex flex-col gap-4 mt-8">
                {user && (
                  <div className="pb-4 border-b">
                    <p className="text-sm text-gray-600">Welcome,</p>
                    <p className="font-medium truncate">{user.name || user.email.split("@")[0]}</p>
                    <div className="mt-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Bell className="h-4 w-4" />
                        <span className="text-sm font-medium">Alerts</span>
                        {unreadCount > 0 && (
                          <Badge className="h-5 w-5 rounded-full p-0 text-xs bg-red-500">{unreadCount}</Badge>
                        )}
                      </div>
                      <div className="max-h-32 overflow-y-auto space-y-2">
                        {alerts.slice(0, 3).map((alert) => {
                          const IconComponent = getAlertIcon(alert.type, alert.priority)
                          return (
                            <div key={alert.id} className="text-xs p-2 bg-gray-50 rounded">
                              <div className="flex items-center gap-2 mb-1">
                                <IconComponent className={`h-3 w-3 flex-shrink-0 ${getAlertColor(alert.priority)}`} />
                                <span className="font-medium truncate">{alert.title}</span>
                              </div>
                              <p className="text-gray-600 line-clamp-2">{alert.message}</p>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}

                <Link href="/submit" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  Verify Content
                </Link>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-gray-900">Health Tools</h3>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {healthFeatures.map((feature) => (
                      <Link
                        key={feature.href}
                        href={feature.href}
                        className="flex items-start gap-3 p-2 rounded-md hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                      >
                        <feature.icon className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-sm truncate">{feature.title}</div>
                          <div className="text-xs text-gray-500 mt-1 line-clamp-2">{feature.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-gray-900">Sustainable</h3>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {sustainableFeatures.map((feature) => (
                      <Link
                        key={feature.href}
                        href={feature.href}
                        className="flex items-start gap-3 p-2 rounded-md hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                      >
                        <feature.icon className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-sm truncate">{feature.title}</div>
                          <div className="text-xs text-gray-500 mt-1 line-clamp-2">{feature.description}</div>
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
