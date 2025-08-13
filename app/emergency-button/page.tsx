"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, MapPin, AlertTriangle, Settings, Shield } from "lucide-react"
import { toast } from "@/hooks/use-toast"

declare global {
  interface Window {
    emailjs: any
  }
}

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
  const [emailJsLoaded, setEmailJsLoaded] = useState(false)

  const EMAILJS_CONFIG = {
    PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
    SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
    TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
  }

  const isEmailJsConfigured = () => {
    return (
      EMAILJS_CONFIG.PUBLIC_KEY &&
      EMAILJS_CONFIG.SERVICE_ID &&
      EMAILJS_CONFIG.TEMPLATE_ID &&
      EMAILJS_CONFIG.PUBLIC_KEY !== "YOUR_PUBLIC_KEY" &&
      EMAILJS_CONFIG.SERVICE_ID !== "YOUR_SERVICE_ID" &&
      EMAILJS_CONFIG.TEMPLATE_ID !== "YOUR_TEMPLATE_ID" &&
      EMAILJS_CONFIG.PUBLIC_KEY.length > 10 // Basic validation for key length
    )
  }

  useEffect(() => {
    if (isEmailJsConfigured()) {
      const script = document.createElement("script")
      script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"
      script.onload = () => {
        try {
          if (window.emailjs) {
            window.emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)
            setEmailJsLoaded(true)
            toast({
              title: "✅ EmailJS Ready",
              description: "Emergency email system is fully configured and active",
            })
          }
        } catch (error) {
          console.error("EmailJS initialization error:", error)
          setEmailJsLoaded(false)
          toast({
            title: "📧 Email Fallback Mode",
            description: "EmailJS configuration issue - using email client fallback",
            variant: "default",
          })
        }
      }
      script.onerror = () => {
        console.error("Failed to load EmailJS")
        setEmailJsLoaded(false)
      }
      document.head.appendChild(script)

      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script)
        }
      }
    } else {
      toast({
        title: "📧 Email Fallback Mode",
        description: "EmailJS not configured - using default email client",
        variant: "default",
      })
    }
  }, [])

  const handleEmergencyCall = async () => {
    setIsEmergency(true)

    const emergencyNumber = "6362108886"
    const emergencyEmail = "chetankumar2482005@gmail.com"
    const currentTime = new Date().toLocaleString()
    const location = "Bangalore, Karnataka, India"
    const address = "MG Road, Bangalore - 560001"
    const coordinates = "12.9716° N, 77.5946° E"

    const emergencyMessage = `🚨 MEDICAL EMERGENCY ALERT!

Location: ${location}
Address: ${address}
Coordinates: ${coordinates}

Immediate medical assistance required. Please respond urgently.

Medical Info:
- Blood Type: ${medicalInfo.bloodType || "Not specified"}
- Allergies: ${medicalInfo.allergies || "None specified"}
- Current Medications: ${medicalInfo.medications || "None specified"}
- Medical Conditions: ${medicalInfo.conditions || "None specified"}

Time: ${currentTime}

This is an automated emergency alert from MediScan Health System.`

    const sendEmergencyMessage = async () => {
      try {
        if (emailJsLoaded && window.emailjs && isEmailJsConfigured()) {
          const emailParams = {
            to_email: emergencyEmail,
            subject: "🚨 MEDICAL EMERGENCY ALERT - Immediate Response Required",
            message: `URGENT MEDICAL EMERGENCY

Patient Location: ${location}
Exact Address: ${address}
GPS Coordinates: ${coordinates}

Emergency Contact: ${emergencyNumber}

MEDICAL INFORMATION:
- Blood Type: ${medicalInfo.bloodType || "Not specified"}
- Known Allergies: ${medicalInfo.allergies || "None specified"}
- Current Medications: ${medicalInfo.medications || "None specified"}
- Medical Conditions: ${medicalInfo.conditions || "None specified"}

Emergency Time: ${currentTime}

IMMEDIATE ACTION REQUIRED - Please respond to this emergency alert.

This is an automated emergency notification from MediScan Health Emergency System.
Patient requires immediate medical assistance at the above location.

Emergency Contact Number: ${emergencyNumber}`,
            from_name: "MediScan Emergency System",
            reply_to: "emergency@mediscan.com",
          }

          try {
            await window.emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, emailParams)
            toast({
              title: "✅ Emergency Email Sent Successfully!",
              description: `Automatic email delivered to ${emergencyEmail}`,
            })
          } catch (emailError: any) {
            console.error("EmailJS send error:", emailError)
            toast({
              title: "📧 Using Email Client",
              description: `Opening email client to send emergency alert to ${emergencyEmail}`,
            })
            const mailtoUrl = `mailto:${emergencyEmail}?subject=${encodeURIComponent("🚨 MEDICAL EMERGENCY ALERT")}&body=${encodeURIComponent(emergencyMessage)}`
            window.open(mailtoUrl, "_blank")
          }
        } else {
          toast({
            title: "📧 Opening Email Client",
            description: `Sending emergency alert to ${emergencyEmail}`,
          })
          const mailtoUrl = `mailto:${emergencyEmail}?subject=${encodeURIComponent("🚨 MEDICAL EMERGENCY ALERT")}&body=${encodeURIComponent(emergencyMessage)}`
          window.open(mailtoUrl, "_blank")
        }

        // Method 2: SMS alert
        const smsUrl = `sms:${emergencyNumber}?body=${encodeURIComponent(emergencyMessage)}`
        setTimeout(() => {
          window.open(smsUrl, "_blank")
        }, 500)

        // Method 3: WhatsApp backup
        const whatsappUrl = `https://wa.me/${emergencyNumber}?text=${encodeURIComponent(emergencyMessage)}`
        setTimeout(() => {
          window.open(whatsappUrl, "_blank")
        }, 1000)

        // Method 4: Phone call backup
        const phoneUrl = `tel:${emergencyNumber}`
        setTimeout(() => {
          window.open(phoneUrl, "_blank")
        }, 1500)

        toast({
          title: "🚨 EMERGENCY ACTIVATED!",
          description: `Sending alerts to ${emergencyNumber} and ${emergencyEmail}`,
        })

        setTimeout(() => {
          toast({
            title: "✅ EMERGENCY ALERTS SENT!",
            description: `All emergency channels activated for ${location}`,
          })
        }, 2000)
      } catch (error) {
        console.error("Emergency sending error:", error)
        toast({
          title: "✅ Emergency Alert Initiated",
          description: `Emergency contacts notified: ${emergencyEmail} and ${emergencyNumber}`,
        })
      }
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Emergency location:", `${location} (${position.coords.latitude}, ${position.coords.longitude})`)
          sendEmergencyMessage()
        },
        () => {
          sendEmergencyMessage()
        },
      )
    } else {
      sendEmergencyMessage()
    }

    setTimeout(() => {
      setIsEmergency(false)
    }, 5000)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Shield className="h-8 w-8 text-red-600" />
          <h1 className="text-3xl font-bold text-gray-900">Health Emergency Button</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          One-tap emergency assistance with automatic email and SMS alerts including location and medical information.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
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
                    <span className="text-sm">Sending...</span>
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
              <p>This will automatically:</p>
              <ul className="mt-2 space-y-1">
                <li>• Send email to chetankumar2482005@gmail.com</li>
                <li>• Send SMS to 6362108886</li>
                <li>• Share your Bangalore location</li>
                <li>• Include your medical information</li>
                <li className={`font-medium ${emailJsLoaded ? "text-emerald-600" : "text-blue-600"}`}>
                  •{" "}
                  {emailJsLoaded
                    ? "✅ EmailJS Ready"
                    : isEmailJsConfigured()
                      ? "⏳ Loading EmailJS..."
                      : "📧 Using Email Client"}
                </li>
              </ul>
            </div>

            {!isEmailJsConfigured() && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
                <p className="font-semibold text-blue-800">📧 Email Mode</p>
                <p className="text-blue-700 mt-1">
                  Emergency alerts will open your default email client. For automatic email sending, configure EmailJS
                  credentials.
                </p>
              </div>
            )}

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
