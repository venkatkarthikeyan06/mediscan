"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { AlertTriangle, MapPin, Bell, Shield, TrendingUp, Globe } from "lucide-react"

export default function OutbreakAlerts() {
  const [location, setLocation] = useState("")
  const [savedLocation, setSavedLocation] = useState("")
  const [locationAlerts, setLocationAlerts] = useState<any[]>([])
  const [showLocationSuccess, setShowLocationSuccess] = useState(false)
  const [notifications, setNotifications] = useState({
    high: true,
    moderate: true,
    low: false,
    weekly: true,
  })

  const outbreaks = [
    {
      disease: "Influenza A (H3N2)",
      location: "Northeast US",
      severity: "moderate",
      cases: 1250,
      trend: "increasing",
      lastUpdate: "2 hours ago",
    },
    {
      disease: "Norovirus",
      location: "California",
      severity: "low",
      cases: 89,
      trend: "stable",
      lastUpdate: "6 hours ago",
    },
    {
      disease: "RSV",
      location: "Southeast US",
      severity: "high",
      cases: 2100,
      trend: "increasing",
      lastUpdate: "1 hour ago",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800"
      case "moderate":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTrendIcon = (trend: string) => {
    return trend === "increasing" ? "↗️" : trend === "decreasing" ? "↘️" : "➡️"
  }

  const handleSetLocation = async () => {
    if (!location.trim()) return

    setSavedLocation(location)
    setShowLocationSuccess(true)

    // Simulate fetching location-specific alerts
    const mockLocationAlerts = [
      {
        disease: "Seasonal Flu",
        severity: "moderate",
        cases: 45,
        trend: "stable",
        distance: "2 miles from you",
      },
      {
        disease: "Common Cold",
        severity: "low",
        cases: 12,
        trend: "decreasing",
        distance: "5 miles from you",
      },
    ]
    setLocationAlerts(mockLocationAlerts)

    setTimeout(() => setShowLocationSuccess(false), 3000)
  }

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode these coordinates
          setLocation(`${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`)
        },
        (error) => {
          alert("Unable to get your location. Please enter it manually.")
        },
      )
    } else {
      alert("Geolocation is not supported by this browser.")
    }
  }

  const toggleNotification = (type: string) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev],
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <AlertTriangle className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Disease Outbreak Alerts</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay informed about disease outbreaks in your area with real-time monitoring and prevention tips
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Current Outbreaks
                </CardTitle>
                <CardDescription>Real-time disease outbreak monitoring across regions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {outbreaks.map((outbreak, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{outbreak.disease}</h3>
                        <p className="text-gray-600 flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {outbreak.location}
                        </p>
                      </div>
                      <Badge className={getSeverityColor(outbreak.severity)}>{outbreak.severity.toUpperCase()}</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Cases:</span>
                        <p className="font-semibold">{outbreak.cases.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Trend:</span>
                        <p className="font-semibold flex items-center gap-1">
                          {getTrendIcon(outbreak.trend)} {outbreak.trend}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">Updated:</span>
                        <p className="font-semibold">{outbreak.lastUpdate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Prevention Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold mb-2">General Prevention</h4>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• Wash hands frequently</li>
                      <li>• Avoid close contact with sick people</li>
                      <li>• Stay home when ill</li>
                      <li>• Cover coughs and sneezes</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Vaccination</h4>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• Stay up-to-date with vaccines</li>
                      <li>• Get annual flu shots</li>
                      <li>• Follow CDC recommendations</li>
                      <li>• Consult healthcare providers</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location Alerts
                </CardTitle>
                <CardDescription>Get alerts for your specific area</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Enter your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                    onClick={handleGetCurrentLocation}
                  >
                    📍 Use Current Location
                  </Button>
                </div>
                <Button className="w-full" onClick={handleSetLocation} disabled={!location.trim()}>
                  Set Location
                </Button>

                {showLocationSuccess && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 text-sm">✅ Location saved successfully!</p>
                  </div>
                )}

                {savedLocation && (
                  <div className="space-y-3">
                    <div className="text-sm font-medium">Alerts for {savedLocation}:</div>
                    {locationAlerts.length > 0 ? (
                      locationAlerts.map((alert, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">{alert.disease}</span>
                            <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                          </div>
                          <div className="text-xs text-gray-600">
                            {alert.cases} cases • {alert.distance}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-600">No active alerts in your area</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">High severity alerts</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleNotification("high")}
                    className={notifications.high ? "bg-green-50 text-green-700" : ""}
                  >
                    {notifications.high ? "On" : "Off"}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Moderate severity alerts</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleNotification("moderate")}
                    className={notifications.moderate ? "bg-green-50 text-green-700" : ""}
                  >
                    {notifications.moderate ? "On" : "Off"}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Low severity alerts</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleNotification("low")}
                    className={notifications.low ? "bg-green-50 text-green-700" : ""}
                  >
                    {notifications.low ? "On" : "Off"}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Weekly summaries</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleNotification("weekly")}
                    className={notifications.weekly ? "bg-green-50 text-green-700" : ""}
                  >
                    {notifications.weekly ? "On" : "Off"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Active Outbreaks</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">High Severity</span>
                  <span className="font-semibold text-red-600">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Your Area Risk</span>
                  <Badge className="bg-yellow-100 text-yellow-800">Moderate</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
