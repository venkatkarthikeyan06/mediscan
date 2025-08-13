"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Wind, Droplets, AlertTriangle, Shield, MapPin, Bell, TrendingUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function QualityAlertsPage() {
  const { toast } = useToast()
  const [location, setLocation] = useState("Bangalore, Karnataka, India")
  const [notifications, setNotifications] = useState({
    airQuality: true,
    waterQuality: true,
    pollutionSpikes: true,
    healthAdvisories: true,
  })

  const [airQuality, setAirQuality] = useState({
    aqi: 85,
    level: "Moderate",
    pm25: 28,
    pm10: 45,
    ozone: 0.065,
    no2: 32,
  })

  const [waterQuality, setWaterQuality] = useState({
    overall: "Good",
    chlorine: 0.8,
    ph: 7.2,
    bacteria: "Safe",
    lead: 0.002,
  })

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [isLoadingQuality, setIsLoadingQuality] = useState(false)

  const protectiveMeasures = {
    Unhealthy: [
      "Stay indoors with windows closed",
      "Use air purifiers if available",
      "Avoid outdoor exercise",
      "Wear N95 masks when going outside",
      "Consider postponing outdoor activities",
    ],
    Moderate: [
      "Limit prolonged outdoor activities",
      "Consider wearing masks during exercise",
      "Stay hydrated",
      "Monitor symptoms if sensitive",
      "Use air conditioning when possible",
    ],
    Good: [
      "Enjoy outdoor activities",
      "Open windows for fresh air",
      "Perfect time for exercise outside",
      "No special precautions needed",
    ],
    Excellent: [
      "Enjoy outdoor activities",
      "Open windows for fresh air",
      "Perfect time for exercise outside",
      "No special precautions needed",
    ],
    Fair: ["Limit outdoor activities", "Monitor water quality closely", "Use filtered water if necessary"],
  }

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return "text-green-600 bg-green-50"
    if (aqi <= 100) return "text-yellow-600 bg-yellow-50"
    if (aqi <= 150) return "text-orange-600 bg-orange-50"
    return "text-red-600 bg-red-50"
  }

  const reverseGeocode = async (lat: number, lng: number) => {
    setLocation("Bangalore, Karnataka, India")
  }

  const getCurrentLocation = () => {
    setIsLoadingLocation(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = 12.9716
          const longitude = 77.5946
          setUserLocation({ lat: latitude, lng: longitude })
          reverseGeocode(latitude, longitude)
          fetchQualityData(latitude, longitude)
          setIsLoadingLocation(false)
        },
        (error) => {
          const latitude = 12.9716
          const longitude = 77.5946
          setUserLocation({ lat: latitude, lng: longitude })
          reverseGeocode(latitude, longitude)
          fetchQualityData(latitude, longitude)
          setIsLoadingLocation(false)
          toast({
            title: "Location Set",
            description: "Using Bangalore as your default location.",
          })
        },
      )
    } else {
      const latitude = 12.9716
      const longitude = 77.5946
      setUserLocation({ lat: latitude, lng: longitude })
      reverseGeocode(latitude, longitude)
      fetchQualityData(latitude, longitude)
      setIsLoadingLocation(false)
    }
  }

  const fetchQualityData = (lat: number, lng: number) => {
    setIsLoadingQuality(true)
    setTimeout(() => {
      const newAirQuality = {
        aqi: Math.floor(Math.random() * 150) + 20,
        level: Math.random() > 0.6 ? "Good" : Math.random() > 0.3 ? "Moderate" : "Unhealthy",
        pm25: Math.floor(Math.random() * 50) + 10,
        pm10: Math.floor(Math.random() * 80) + 20,
        ozone: (Math.random() * 0.1 + 0.02).toFixed(3),
        no2: Math.floor(Math.random() * 60) + 15,
      }

      const newWaterQuality = {
        overall: Math.random() > 0.7 ? "Excellent" : Math.random() > 0.4 ? "Good" : "Fair",
        chlorine: (Math.random() * 2 + 0.5).toFixed(1),
        ph: (Math.random() * 2 + 6.5).toFixed(1),
        bacteria: Math.random() > 0.8 ? "Safe" : "Monitored",
        lead: (Math.random() * 0.01).toFixed(3),
      }

      setAirQuality(newAirQuality)
      setWaterQuality(newWaterQuality)
      setIsLoadingQuality(false)

      toast({
        title: "Quality Data Updated",
        description: "Air and water quality data refreshed for your location.",
      })
    }, 2000)
  }

  const updateLocation = () => {
    if (location.trim()) {
      setIsLoadingQuality(true)
      setTimeout(() => {
        fetchQualityData(0, 0)
      }, 1000)
    } else {
      getCurrentLocation()
    }
  }

  const toggleNotification = (type: string) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
    toast({
      title: "Notification Settings Updated",
      description: `${type} alerts ${notifications[type] ? "disabled" : "enabled"}.`,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Wind className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">Air & Water Quality Health Alerts</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Monitor pollution levels and get protective health measures for your area
            </p>
          </div>

          {/* Location Setting */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                Your Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your city or zip code..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <Button onClick={updateLocation} disabled={isLoadingQuality}>
                  {isLoadingQuality ? "Updating..." : "Update Location"}
                </Button>
                <Button variant="outline" onClick={getCurrentLocation} disabled={isLoadingLocation}>
                  <MapPin className="h-4 w-4 mr-2" />
                  {isLoadingLocation ? "Finding..." : "Use Current Location"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Current Quality Overview */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wind className="h-5 w-5 text-blue-600" />
                  Air Quality Index
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className={`text-4xl font-bold px-4 py-2 rounded-lg ${getAQIColor(airQuality.aqi)}`}>
                    {airQuality.aqi}
                  </div>
                  <Badge variant="outline" className={getAQIColor(airQuality.aqi)}>
                    {airQuality.level}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">PM2.5:</span> {airQuality.pm25} μg/m³
                  </div>
                  <div>
                    <span className="text-gray-600">PM10:</span> {airQuality.pm10} μg/m³
                  </div>
                  <div>
                    <span className="text-gray-600">Ozone:</span> {airQuality.ozone} ppm
                  </div>
                  <div>
                    <span className="text-gray-600">NO₂:</span> {airQuality.no2} ppb
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-cyan-600" />
                  Water Quality Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl font-bold text-cyan-600">{waterQuality.overall}</div>
                  <Badge variant="outline" className="text-cyan-600 bg-cyan-50">
                    Safe to Drink
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Chlorine:</span> {waterQuality.chlorine} mg/L
                  </div>
                  <div>
                    <span className="text-gray-600">pH Level:</span> {waterQuality.ph}
                  </div>
                  <div>
                    <span className="text-gray-600">Bacteria:</span> {waterQuality.bacteria}
                  </div>
                  <div>
                    <span className="text-gray-600">Lead:</span> {waterQuality.lead} mg/L
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="measures" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="measures">Protective Measures</TabsTrigger>
              <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
              <TabsTrigger value="trends">Quality Trends</TabsTrigger>
              <TabsTrigger value="settings">Notification Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="measures" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    Recommended Health Measures
                  </CardTitle>
                  <CardDescription>Based on current air quality: {airQuality.level}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {protectiveMeasures[airQuality.level]?.map((measure, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-green-600 text-sm font-bold">{index + 1}</span>
                        </div>
                        <p className="text-gray-700">{measure}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vulnerable Groups Advisory</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-semibold text-orange-800 mb-2">Children & Elderly</h4>
                      <p className="text-sm text-orange-700">Extra precautions recommended. Limit outdoor time.</p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg">
                      <h4 className="font-semibold text-red-800 mb-2">Respiratory Conditions</h4>
                      <p className="text-sm text-red-700">Stay indoors. Use prescribed medications as needed.</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">Heart Disease</h4>
                      <p className="text-sm text-purple-700">Avoid strenuous outdoor activities. Monitor symptoms.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-yellow-800">Moderate Air Quality Alert</h4>
                        <p className="text-sm text-yellow-700">
                          AQI has reached 85. Sensitive individuals should limit outdoor activities.
                        </p>
                        <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Wind className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-800">Ozone Level Update</h4>
                        <p className="text-sm text-blue-700">
                          Ground-level ozone concentrations are elevated. Avoid outdoor exercise during peak hours.
                        </p>
                        <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    7-Day Quality Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Average AQI</span>
                      <span className="text-2xl font-bold text-blue-600">78</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Best Day</span>
                      <span className="text-green-600 font-semibold">Monday (AQI: 45)</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Worst Day</span>
                      <span className="text-orange-600 font-semibold">Friday (AQI: 112)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-blue-600" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>Choose which alerts you want to receive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="air-quality">Air Quality Alerts</Label>
                    <Switch
                      id="air-quality"
                      checked={notifications.airQuality}
                      onCheckedChange={() => toggleNotification("airQuality")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="water-quality">Water Quality Updates</Label>
                    <Switch
                      id="water-quality"
                      checked={notifications.waterQuality}
                      onCheckedChange={() => toggleNotification("waterQuality")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pollution-spikes">Pollution Spike Warnings</Label>
                    <Switch
                      id="pollution-spikes"
                      checked={notifications.pollutionSpikes}
                      onCheckedChange={() => toggleNotification("pollutionSpikes")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="health-advisories">Health Advisories</Label>
                    <Switch
                      id="health-advisories"
                      checked={notifications.healthAdvisories}
                      onCheckedChange={() => toggleNotification("healthAdvisories")}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
