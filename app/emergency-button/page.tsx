"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, MapPin, AlertTriangle, Settings, Shield } from "lucide-react"

export default function EmergencyButton() {
  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: "Emergency Services", number: "911", type: "Emergency" },
    { name: "Family Doctor", number: "", type: "Medical" },
    { name: "Emergency Contact", number: "", type: "Personal" },
  ])
  const [medicalInfo, setMedicalInfo] = useState({
    allergies: "",
    medications: "",
    conditions: "",
    bloodType: "",
  })
  const [isEmergency, setIsEmergency] = useState(false)

  const handleEmergencyCall = () => {
    setIsEmergency(true)
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const location = `${position.coords.latitude}, ${position.coords.longitude}`
        console.log("Emergency location:", location)
        // In a real app, this would send location to emergency services
      })
    }

    // Simulate emergency call
    setTimeout(() => {
      setIsEmergency(false)
      alert("Emergency services have been notified with your location and medical information.")
    }, 3000)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Shield className="h-8 w-8 text-red-600" />
          <h1 className="text-3xl font-bold text-gray-900">Health Emergency Button</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          One-tap emergency assistance with automatic location sharing and medical information.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Emergency Button */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Emergency Actions
            </CardTitle>
            <CardDescription>Press the button below in case of a medical emergency</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <Button
                size="lg"
                className={`w-32 h-32 rounded-full text-white font-bold text-lg ${
                  isEmergency ? "bg-orange-500 animate-pulse" : "bg-red-600 hover:bg-red-700"
                }`}
                onClick={handleEmergencyCall}
                disabled={isEmergency}
              >
                {isEmergency ? (
                  <div className="flex flex-col items-center">
                    <Phone className="h-8 w-8 mb-1" />
                    <span className="text-sm">Calling...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Phone className="h-8 w-8 mb-1" />
                    <span>EMERGENCY</span>
                  </div>
                )}
              </Button>
            </div>

            <div className="text-center text-sm text-gray-600">
              <p>This will:</p>
              <ul className="mt-2 space-y-1">
                <li>• Call emergency services (911)</li>
                <li>• Share your current location</li>
                <li>• Send your medical information</li>
                <li>• Notify your emergency contacts</li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1 bg-transparent">
                <Phone className="h-4 w-4" />
                Call 911
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1 bg-transparent">
                <MapPin className="h-4 w-4" />
                Share Location
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Emergency Settings
            </CardTitle>
            <CardDescription>Configure your emergency contacts and medical information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-semibold">Emergency Contacts</Label>
              <div className="space-y-2 mt-2">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex gap-2">
                    <Input placeholder={contact.name} className="flex-1" defaultValue={contact.name} />
                    <Input placeholder="Phone number" className="flex-1" defaultValue={contact.number} />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-semibold">Medical Information</Label>
              <div className="space-y-2 mt-2">
                <Input
                  placeholder="Blood type (e.g., A+, O-, B+)"
                  value={medicalInfo.bloodType}
                  onChange={(e) => setMedicalInfo({ ...medicalInfo, bloodType: e.target.value })}
                />
                <Textarea
                  placeholder="Allergies (medications, foods, etc.)"
                  value={medicalInfo.allergies}
                  onChange={(e) => setMedicalInfo({ ...medicalInfo, allergies: e.target.value })}
                  className="min-h-20"
                />
                <Textarea
                  placeholder="Current medications"
                  value={medicalInfo.medications}
                  onChange={(e) => setMedicalInfo({ ...medicalInfo, medications: e.target.value })}
                  className="min-h-20"
                />
                <Textarea
                  placeholder="Medical conditions"
                  value={medicalInfo.conditions}
                  onChange={(e) => setMedicalInfo({ ...medicalInfo, conditions: e.target.value })}
                  className="min-h-20"
                />
              </div>
            </div>

            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Save Settings</Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-yellow-800">Important Safety Information</p>
            <p className="text-yellow-700 mt-1">
              This emergency button is designed to complement, not replace, traditional emergency services. Always call
              911 directly for immediate life-threatening emergencies. Ensure your emergency contacts and medical
              information are kept up to date.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
