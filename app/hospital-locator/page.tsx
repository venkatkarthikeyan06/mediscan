"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Hospital, MapPin, Phone, Clock, Star, Navigation } from "lucide-react"

export default function HospitalLocator() {
  const [location, setLocation] = useState("")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [facilities, setFacilities] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const mockFacilities = [
    {
      id: 1,
      name: "City General Hospital",
      type: "Hospital",
      distance: "0.8 miles",
      rating: 4.5,
      address: "123 Medical Center Dr",
      phone: "(555) 123-4567",
      hours: "24/7 Emergency",
      services: ["Emergency", "Surgery", "ICU", "Cardiology"],
    },
    {
      id: 2,
      name: "QuickCare Clinic",
      type: "Clinic",
      distance: "1.2 miles",
      rating: 4.2,
      address: "456 Health St",
      phone: "(555) 234-5678",
      hours: "8 AM - 10 PM",
      services: ["Urgent Care", "Family Medicine", "Lab Tests"],
    },
    {
      id: 3,
      name: "24/7 Pharmacy Plus",
      type: "Pharmacy",
      distance: "0.5 miles",
      rating: 4.7,
      address: "789 Wellness Ave",
      phone: "(555) 345-6789",
      hours: "24/7",
      services: ["Prescription", "OTC Medications", "Vaccinations"],
    },
  ]

  const getCurrentLocation = () => {
    setLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setFacilities(mockFacilities)
          setLoading(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setFacilities(mockFacilities)
          setLoading(false)
        },
      )
    } else {
      setFacilities(mockFacilities)
      setLoading(false)
    }
  }

  const searchLocation = () => {
    setLoading(true)
    // Simulate search
    setTimeout(() => {
      setFacilities(mockFacilities)
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Hospital className="h-8 w-8 text-emerald-600" />
          <h1 className="text-3xl font-bold text-gray-900">Hospital & Pharmacy Locator</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find nearby trusted hospitals, clinics, and 24/7 pharmacies with real-time availability and directions.
        </p>
      </div>

      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Find Healthcare Facilities</CardTitle>
            <CardDescription>Search by location or use your current location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter city, address, or ZIP code"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <Button onClick={searchLocation} disabled={loading}>
                Search
              </Button>
              <Button
                variant="outline"
                onClick={getCurrentLocation}
                disabled={loading}
                className="flex items-center gap-2 bg-transparent"
              >
                <Navigation className="h-4 w-4" />
                Use My Location
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {facilities.length > 0 && (
        <div className="grid gap-4">
          <h2 className="text-xl font-semibold">Nearby Healthcare Facilities</h2>
          {facilities.map((facility) => (
            <Card key={facility.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{facility.name}</h3>
                      <Badge
                        variant={
                          facility.type === "Hospital"
                            ? "default"
                            : facility.type === "Clinic"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {facility.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {facility.distance}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {facility.rating}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {facility.hours}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{facility.address}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {facility.services.map((service: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                    Get Directions
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center gap-1 bg-transparent">
                    <Phone className="h-4 w-4" />
                    {facility.phone}
                  </Button>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
