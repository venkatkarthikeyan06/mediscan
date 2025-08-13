"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Recycle, MapPin, AlertTriangle, CheckCircle, Search, Navigation } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function MedicineDisposalPage() {
  const { toast } = useToast()
  const [searchLocation, setSearchLocation] = useState("Bangalore, Karnataka, India")
  const [selectedMedicine, setSelectedMedicine] = useState("")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [nearbyDisposalSites, setNearbyDisposalSites] = useState([
    {
      name: "Apollo Pharmacy - MG Road",
      address: "Brigade Road, MG Road, Bangalore, Karnataka 560001",
      distance: "0.5 km",
      hours: "Mon-Sun: 8AM-11PM",
      accepts: ["Pills", "Capsules", "Liquids", "Inhalers"],
      type: "Pharmacy",
      phone: "+91 80 2558 9999",
    },
    {
      name: "Fortis Hospital - Bannerghatta Road",
      address: "154/9, Bannerghatta Road, Opposite IIM, Bangalore 560076",
      distance: "1.2 km",
      hours: "24/7 Drop-off Available",
      accepts: ["All Medications", "Controlled Substances", "Sharps"],
      type: "Hospital",
      phone: "+91 80 6621 4444",
    },
    {
      name: "BBMP Solid Waste Management - Koramangala",
      address: "Koramangala 4th Block, Bangalore, Karnataka 560034",
      distance: "2.1 km",
      hours: "Mon-Fri: 9AM-5PM",
      accepts: ["Pills", "Expired Medicines", "Medical Waste"],
      type: "Government Center",
      phone: "+91 80 2221 1111",
    },
    {
      name: "Manipal Hospital - HAL Airport Road",
      address: "98, HAL Airport Road, Bangalore, Karnataka 560017",
      distance: "3.5 km",
      hours: "24/7 Drop-off Available",
      accepts: ["All Medications", "Controlled Substances", "Sharps"],
      type: "Hospital",
      phone: "+91 80 2502 4444",
    },
  ])

  const disposalGuidelines = {
    "Pills/Tablets": {
      method: "Take-back program or pharmacy disposal",
      steps: ["Remove personal info from labels", "Keep in original container", "Take to authorized disposal site"],
      danger: "low",
      environmental: "Prevents water contamination",
    },
    "Liquid Medications": {
      method: "Professional disposal required",
      steps: ["Do NOT pour down drain", "Keep in original container", "Take to pharmacy or hospital"],
      danger: "high",
      environmental: "Highly toxic to aquatic life",
    },
    "Controlled Substances": {
      method: "DEA take-back events or law enforcement",
      steps: ["Keep secure until disposal", "Use official take-back programs", "Get disposal receipt"],
      danger: "high",
      environmental: "Prevents abuse and environmental harm",
    },
    Inhalers: {
      method: "Special handling required",
      steps: ["Check if empty", "Remove personal info", "Take to pharmacy with inhaler program"],
      danger: "medium",
      environmental: "Contains pressurized chemicals",
    },
  }

  const getCurrentLocation = () => {
    setIsLoadingLocation(true)

    // Set Bangalore coordinates regardless of actual geolocation
    const bangaloreCoords = { lat: 12.9716, lng: 77.5946 }
    setUserLocation(bangaloreCoords)
    setSearchLocation("Bangalore, Karnataka, India")

    // Update disposal sites with Bangalore-specific locations
    const bangaloreDisposalSites = [
      {
        name: "Apollo Pharmacy - Indiranagar",
        address: "100 Feet Road, Indiranagar, Bangalore, Karnataka 560038",
        distance: "0.3 km",
        hours: "Mon-Sun: 8AM-11PM",
        accepts: ["Pills", "Capsules", "Liquids", "Inhalers"],
        type: "Pharmacy",
        phone: "+91 80 2520 0000",
      },
      {
        name: "Narayana Health City",
        address: "258/A, Bommasandra Industrial Area, Bangalore 560099",
        distance: "0.8 km",
        hours: "24/7 Drop-off Available",
        accepts: ["All Medications", "Controlled Substances", "Sharps"],
        type: "Hospital",
        phone: "+91 80 7122 4444",
      },
      {
        name: "Medplus Pharmacy - Koramangala",
        address: "5th Block, Koramangala, Bangalore, Karnataka 560095",
        distance: "1.1 km",
        hours: "Mon-Sun: 7AM-11PM",
        accepts: ["Pills", "Capsules", "Liquids"],
        type: "Pharmacy",
        phone: "+91 80 4112 5555",
      },
      {
        name: "BBMP Waste Collection Center - Whitefield",
        address: "EPIP Zone, Whitefield, Bangalore, Karnataka 560066",
        distance: "1.5 km",
        hours: "Mon-Sat: 9AM-6PM",
        accepts: ["Expired Medicines", "Medical Waste", "Sharps"],
        type: "Government Center",
        phone: "+91 80 2845 0000",
      },
    ]

    setNearbyDisposalSites(bangaloreDisposalSites)
    setIsLoadingLocation(false)

    toast({
      title: "Location Set to Bangalore",
      description: "Found disposal sites near your location in Bangalore.",
    })
  }

  const findDisposalSitesNearLocation = (lat: number, lng: number) => {
    // Always show Bangalore-specific sites
    const bangaloreSites = [
      {
        name: "Cloudnine Hospital - Jayanagar",
        address: "1533, 9th Main, 16th Cross, Jayanagar 3rd Block, Bangalore 560011",
        distance: "0.4 km",
        hours: "24/7 Drop-off Available",
        accepts: ["All Medications", "Controlled Substances"],
        type: "Hospital",
        phone: "+91 80 6599 9999",
      },
      {
        name: "Pharmacy Plus - Brigade Road",
        address: "Brigade Road, Bangalore, Karnataka 560025",
        distance: "0.7 km",
        hours: "Mon-Sun: 8AM-10PM",
        accepts: ["Pills", "Capsules", "Liquids"],
        type: "Pharmacy",
        phone: "+91 80 2559 8888",
      },
      ...nearbyDisposalSites,
    ]
    setNearbyDisposalSites(bangaloreSites)
  }

  const findNearbyLocations = () => {
    if (searchLocation.trim()) {
      setIsLoadingLocation(true)
      toast({
        title: "Searching Locations",
        description: `Finding disposal sites near ${searchLocation}...`,
      })

      setTimeout(() => {
        // Always show Bangalore sites
        findDisposalSitesNearLocation(12.9716, 77.5946)
        setIsLoadingLocation(false)
        toast({
          title: "Search Complete",
          description: `Found ${nearbyDisposalSites.length} disposal sites in Bangalore`,
        })
      }, 1500)
    } else {
      getCurrentLocation()
    }
  }

  const getDirections = (siteName: string, address: string) => {
    // Open directions in Google Maps
    const encodedAddress = encodeURIComponent(address)
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`
    window.open(mapsUrl, "_blank")
    toast({
      title: "Opening Directions",
      description: `Getting directions to ${siteName} in Bangalore`,
    })
  }

  const callSite = (siteName: string, phone: string) => {
    window.open(`tel:${phone}`, "_self")
    toast({
      title: "Calling Site",
      description: `Calling ${siteName} at ${phone}`,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Recycle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">Eco-Friendly Medicine Disposal</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Safe disposal instructions and local disposal point locator to protect our environment
            </p>
          </div>

          <Tabs defaultValue="locator" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="locator">Find Disposal Sites</TabsTrigger>
              <TabsTrigger value="guidelines">Disposal Guidelines</TabsTrigger>
              <TabsTrigger value="environmental">Environmental Impact</TabsTrigger>
            </TabsList>

            <TabsContent value="locator" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    Find Nearby Disposal Locations
                  </CardTitle>
                  <CardDescription>Locate authorized medicine disposal sites in Bangalore</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-4">
                    <Input
                      placeholder="Enter your area in Bangalore..."
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                    />
                    <Button onClick={findNearbyLocations} disabled={isLoadingLocation}>
                      <Search className="h-4 w-4 mr-2" />
                      {isLoadingLocation ? "Finding..." : "Search"}
                    </Button>
                    <Button variant="outline" onClick={getCurrentLocation} disabled={isLoadingLocation}>
                      <MapPin className="h-4 w-4 mr-2" />
                      Use Current Location
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4">
                {nearbyDisposalSites.map((site, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{site.name}</h3>
                          <p className="text-gray-600">{site.address}</p>
                          <p className="text-sm text-gray-500">{site.distance} away</p>
                          {site.phone && (
                            <p
                              className="text-sm text-blue-600 cursor-pointer"
                              onClick={() => callSite(site.name, site.phone)}
                            >
                              📞 {site.phone}
                            </p>
                          )}
                        </div>
                        <Badge variant="outline">{site.type}</Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-2">Hours:</h4>
                          <p className="text-sm">{site.hours}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-2">Accepts:</h4>
                          <div className="flex flex-wrap gap-1">
                            {site.accepts.map((item, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={() => getDirections(site.name, site.address)} className="flex-1">
                          <Navigation className="h-4 w-4 mr-2" />
                          Get Directions
                        </Button>
                        {site.phone && (
                          <Button variant="outline" onClick={() => callSite(site.name, site.phone)}>
                            📞 Call
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="guidelines" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Select Medicine Type for Disposal Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {Object.keys(disposalGuidelines).map((type) => (
                      <Button
                        key={type}
                        variant={selectedMedicine === type ? "default" : "outline"}
                        onClick={() => setSelectedMedicine(type)}
                        className="h-auto p-4 text-left justify-start"
                      >
                        {type}
                      </Button>
                    ))}
                  </div>

                  {selectedMedicine && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          {disposalGuidelines[selectedMedicine].danger === "high" && (
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                          )}
                          {disposalGuidelines[selectedMedicine].danger === "medium" && (
                            <AlertTriangle className="h-5 w-5 text-yellow-500" />
                          )}
                          {disposalGuidelines[selectedMedicine].danger === "low" && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                          {selectedMedicine} Disposal
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Recommended Method:</h4>
                          <p className="text-gray-700">{disposalGuidelines[selectedMedicine].method}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Steps:</h4>
                          <ol className="list-decimal list-inside space-y-1">
                            {disposalGuidelines[selectedMedicine].steps.map((step, index) => (
                              <li key={index} className="text-gray-700">
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>

                        <div className="p-3 bg-green-50 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-1">Environmental Benefit:</h4>
                          <p className="text-green-700 text-sm">{disposalGuidelines[selectedMedicine].environmental}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="environmental" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      Environmental Risks
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-red-50 rounded-lg">
                      <h4 className="font-semibold text-red-800">Water Contamination</h4>
                      <p className="text-sm text-red-700">
                        Improper disposal contaminates groundwater and drinking supplies
                      </p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <h4 className="font-semibold text-orange-800">Wildlife Impact</h4>
                      <p className="text-sm text-orange-700">
                        Pharmaceutical residues harm aquatic life and ecosystems
                      </p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800">Antibiotic Resistance</h4>
                      <p className="text-sm text-yellow-700">
                        Improper disposal contributes to drug-resistant bacteria
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Positive Impact
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">47</div>
                      <p className="text-sm text-gray-600">Medicines properly disposed</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">1,240L</div>
                      <p className="text-sm text-gray-600">Water protected from contamination</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">Level 2</div>
                      <p className="text-sm text-gray-600">Eco-Guardian status</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Your Impact Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">47</div>
                      <p className="text-sm text-gray-600">Medicines properly disposed</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">1,240L</div>
                      <p className="text-sm text-gray-600">Water protected from contamination</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">Level 2</div>
                      <p className="text-sm text-gray-600">Eco-Guardian status</p>
                    </div>
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
