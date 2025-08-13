"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { AlertTriangle, Heart, Phone, Search, Clock, Shield } from "lucide-react"

export default function EmergencyAid() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGuide, setSelectedGuide] = useState<any>(null)
  const [showGuideModal, setShowGuideModal] = useState(false)

  const emergencyGuides = [
    {
      title: "CPR (Adult)",
      category: "Life-threatening",
      duration: "2-3 minutes",
      difficulty: "Critical",
      steps: 8,
      icon: "❤️",
      detailedSteps: [
        "Check responsiveness - tap shoulders and shout 'Are you okay?'",
        "Call 911 immediately or have someone else call",
        "Position person on back on firm surface, tilt head back",
        "Place heel of one hand on center of chest between nipples",
        "Place other hand on top, interlace fingers",
        "Push hard and fast at least 2 inches deep",
        "Allow complete chest recoil between compressions",
        "Continue 30 compressions, then 2 rescue breaths, repeat",
      ],
    },
    {
      title: "Choking Relief",
      category: "Life-threatening",
      duration: "1-2 minutes",
      difficulty: "Critical",
      steps: 5,
      icon: "🫁",
      detailedSteps: [
        "Ask 'Are you choking?' - if they can't speak, act immediately",
        "Stand behind person, wrap arms around waist",
        "Make fist with one hand, place above navel below ribcage",
        "Grasp fist with other hand, thrust inward and upward",
        "Repeat until object is expelled or person becomes unconscious",
      ],
    },
    {
      title: "Severe Bleeding Control",
      category: "Life-threatening",
      duration: "2-5 minutes",
      difficulty: "Critical",
      steps: 6,
      icon: "🩸",
      detailedSteps: [
        "Put on gloves if available, ensure scene safety",
        "Apply direct pressure with clean cloth or bandage",
        "Maintain continuous pressure, don't remove cloth",
        "Elevate injured area above heart level if possible",
        "Apply pressure to pressure points if bleeding continues",
        "Apply tourniquet only if trained and bleeding is life-threatening",
      ],
    },
    {
      title: "Burns Treatment",
      category: "Injury",
      duration: "5-10 minutes",
      difficulty: "Moderate",
      steps: 7,
      icon: "🔥",
      detailedSteps: [
        "Remove person from heat source, ensure safety",
        "Cool burn with cool (not cold) running water for 10-20 minutes",
        "Remove jewelry/clothing before swelling occurs",
        "Cover burn with sterile, non-adhesive bandage",
        "Do not apply ice, butter, or home remedies",
        "Give over-the-counter pain medication if needed",
        "Seek medical attention for severe burns",
      ],
    },
    {
      title: "Fracture Stabilization",
      category: "Injury",
      duration: "10-15 minutes",
      difficulty: "Moderate",
      steps: 9,
      icon: "🦴",
      detailedSteps: [
        "Do not move person unless in immediate danger",
        "Check for circulation, sensation, and movement below injury",
        "Control any bleeding with direct pressure",
        "Immobilize the injured area and joints above and below",
        "Use splints, slings, or bandages to prevent movement",
        "Apply ice wrapped in cloth to reduce swelling",
        "Monitor for signs of shock",
        "Do not give food or water",
        "Seek immediate medical attention",
      ],
    },
    {
      title: "Allergic Reaction",
      category: "Medical",
      duration: "3-5 minutes",
      difficulty: "Moderate",
      steps: 6,
      icon: "💊",
      detailedSteps: [
        "Identify and remove or avoid the allergen if possible",
        "If person has epinephrine auto-injector, help them use it",
        "Call 911 immediately for severe reactions",
        "Have person lie down with legs elevated",
        "Loosen tight clothing and cover with blanket",
        "Monitor breathing and be prepared to perform CPR",
      ],
    },
  ]

  const quickActions = [
    { title: "Call 911", description: "Emergency services", color: "bg-red-600", icon: Phone },
    { title: "Poison Control", description: "1-800-222-1222", color: "bg-orange-600", icon: AlertTriangle },
    { title: "Crisis Hotline", description: "988", color: "bg-blue-600", icon: Heart },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Life-threatening":
        return "bg-red-100 text-red-800"
      case "Injury":
        return "bg-orange-100 text-orange-800"
      case "Medical":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Critical":
        return "bg-red-100 text-red-800"
      case "Moderate":
        return "bg-yellow-100 text-yellow-800"
      case "Easy":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredGuides = emergencyGuides.filter(
    (guide) =>
      guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewGuide = (guide: any) => {
    setSelectedGuide(guide)
    setShowGuideModal(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <AlertTriangle className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Emergency & First Aid</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Step-by-step emergency response guides for critical situations. Always call 911 for life-threatening
            emergencies.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-3 space-y-8">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Emergency Contacts
                </CardTitle>
                <CardDescription className="text-red-700">
                  Call these numbers immediately in life-threatening situations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-3">
                  {quickActions.map((action, index) => (
                    <Button key={index} className={`${action.color} hover:opacity-90 h-16 flex-col gap-1`} size="lg">
                      <action.icon className="h-5 w-5" />
                      <div className="text-center">
                        <div className="font-semibold">{action.title}</div>
                        <div className="text-xs opacity-90">{action.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  First Aid Guides
                </CardTitle>
                <CardDescription>Step-by-step instructions for emergency situations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search emergency guides..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredGuides.map((guide, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{guide.icon}</span>
                          <div>
                            <h3 className="font-semibold">{guide.title}</h3>
                            <div className="flex gap-2 mt-1">
                              <Badge className={getCategoryColor(guide.category)} variant="secondary">
                                {guide.category}
                              </Badge>
                              <Badge className={getDifficultyColor(guide.difficulty)} variant="secondary">
                                {guide.difficulty}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {guide.duration}
                        </span>
                        <span>{guide.steps} steps</span>
                      </div>
                      <Button
                        size="sm"
                        className="w-full"
                        variant={guide.category === "Life-threatening" ? "default" : "outline"}
                        onClick={() => handleViewGuide(guide)}
                      >
                        View Guide
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-yellow-800">⚠️ Important</CardTitle>
              </CardHeader>
              <CardContent className="text-yellow-800 text-sm space-y-2">
                <p>
                  <strong>Always call 911 first</strong> for life-threatening emergencies
                </p>
                <p>These guides supplement, not replace, professional medical care</p>
                <p>Practice these techniques before emergencies occur</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Reference</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-semibold text-sm">Signs of Heart Attack</h4>
                  <p className="text-xs text-gray-600">Chest pain, shortness of breath, nausea</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-semibold text-sm">Signs of Stroke</h4>
                  <p className="text-xs text-gray-600">Face drooping, arm weakness, speech difficulty</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-semibold text-sm">Severe Allergic Reaction</h4>
                  <p className="text-xs text-gray-600">Difficulty breathing, swelling, hives</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emergency Kit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>Bandages & gauze</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>Antiseptic wipes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>Pain relievers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>Emergency contacts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>Flashlight & batteries</span>
                  </div>
                </div>
                <Button size="sm" className="w-full mt-4 bg-transparent" variant="outline">
                  Full Checklist
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {showGuideModal && selectedGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedGuide.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedGuide.title}</h2>
                    <Badge className={getCategoryColor(selectedGuide.category)}>{selectedGuide.category}</Badge>
                  </div>
                </div>
                <Button variant="outline" onClick={() => setShowGuideModal(false)}>
                  ✕
                </Button>
              </div>

              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-semibold">⚠️ Emergency Warning</p>
                <p className="text-red-700 text-sm">
                  Always call 911 first for life-threatening emergencies. These instructions supplement professional
                  medical care.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Step-by-Step Instructions:</h3>
                {selectedGuide.detailedSteps.map((step: string, index: number) => (
                  <div key={index} className="flex gap-3 p-3 border rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <Button onClick={() => setShowGuideModal(false)} className="flex-1">
                  Got It
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Print Guide
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
