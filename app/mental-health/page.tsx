"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Phone, MessageCircle, BookOpen, Users, Smile, Play, CheckCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function MentalHealthSupport() {
  const [moodScore, setMoodScore] = useState(7)
  const [moodHistory, setMoodHistory] = useState<{ date: string; score: number; note?: string }[]>([])
  const [currentNote, setCurrentNote] = useState("")
  const [activeActivity, setActiveActivity] = useState<string | null>(null)
  const [completedActivities, setCompletedActivities] = useState<string[]>([])

  const resources = [
    { title: "Crisis Text Line", contact: "Text HOME to 741741", type: "crisis", icon: MessageCircle },
    { title: "National Suicide Prevention Lifeline", contact: "988", type: "crisis", icon: Phone },
    { title: "SAMHSA National Helpline", contact: "1-800-662-4357", type: "support", icon: Phone },
    { title: "Crisis Chat", contact: "suicidepreventionlifeline.org/chat", type: "crisis", icon: MessageCircle },
  ]

  const activities = [
    {
      id: "meditation",
      title: "Guided Meditation",
      duration: "10 min",
      category: "mindfulness",
      description: "A calming guided meditation to help center your thoughts and reduce anxiety.",
    },
    {
      id: "breathing",
      title: "Breathing Exercise",
      duration: "5 min",
      category: "anxiety",
      description: "Simple breathing techniques to help manage stress and anxiety in the moment.",
    },
    {
      id: "gratitude",
      title: "Gratitude Journal",
      duration: "15 min",
      category: "mood",
      description: "Reflect on positive aspects of your day to improve overall mood and outlook.",
    },
    {
      id: "muscle",
      title: "Progressive Muscle Relaxation",
      duration: "20 min",
      category: "stress",
      description: "Systematic muscle relaxation technique to release physical tension and stress.",
    },
  ]

  const learningResources = [
    {
      title: "Understanding Anxiety",
      duration: "5 min read",
      content: "Learn about anxiety symptoms, causes, and coping strategies.",
    },
    {
      title: "Coping with Depression",
      duration: "8 min read",
      content: "Discover effective ways to manage depression and improve mental health.",
    },
    {
      title: "Building Resilience",
      duration: "6 min read",
      content: "Develop skills to bounce back from challenges and build mental strength.",
    },
  ]

  const handleLogMood = () => {
    const today = new Date().toISOString().split("T")[0]
    const newEntry = {
      date: today,
      score: moodScore,
      note: currentNote || undefined,
    }

    setMoodHistory([newEntry, ...moodHistory.slice(0, 6)]) // Keep last 7 entries
    setCurrentNote("")

    toast({
      title: "Mood Logged",
      description: `Your mood score of ${moodScore}/10 has been recorded for today.`,
    })
  }

  const handleCrisisContact = (resource: (typeof resources)[0]) => {
    if (resource.contact.includes("Text")) {
      window.open(`sms:741741?body=HOME`, "_blank")
    } else if (resource.contact.includes("988")) {
      window.open(`tel:988`, "_blank")
    } else if (resource.contact.includes("800")) {
      window.open(`tel:18006624357`, "_blank")
    } else {
      window.open("https://suicidepreventionlifeline.org/chat", "_blank")
    }

    toast({
      title: "Opening Contact Method",
      description: `Connecting you to ${resource.title}. Help is available 24/7.`,
    })
  }

  const handleStartActivity = (activityId: string) => {
    setActiveActivity(activityId)

    // Simulate activity completion after duration
    setTimeout(() => {
      setActiveActivity(null)
      setCompletedActivities([...completedActivities, activityId])

      toast({
        title: "Activity Completed!",
        description: "Great job taking care of your mental health today.",
      })
    }, 3000) // Shortened for demo purposes
  }

  const handleFindGroups = (type: "local" | "online") => {
    if (type === "local") {
      // In a real app, this would use geolocation
      toast({
        title: "Finding Local Groups",
        description: "Searching for mental health support groups in your area...",
      })
    } else {
      window.open("https://www.nami.org/Support-Education/Support-Groups", "_blank")
      toast({
        title: "Opening Online Communities",
        description: "Connecting you to online mental health support communities.",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Heart className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mental Health Support</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your mental health matters. Find resources, support, and tools for wellbeing.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-800">Crisis Resources - Available 24/7</CardTitle>
                <CardDescription className="text-red-700">
                  If you're in crisis or having thoughts of self-harm, reach out immediately
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {resources
                  .filter((r) => r.type === "crisis")
                  .map((resource, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-lg border">
                      <resource.icon className="h-6 w-6 text-red-600" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                        <p className="text-gray-600">{resource.contact}</p>
                      </div>
                      <Button
                        size="sm"
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => handleCrisisContact(resource)}
                      >
                        Contact
                      </Button>
                    </div>
                  ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smile className="h-5 w-5" />
                  Daily Wellness Activities
                </CardTitle>
                <CardDescription>Evidence-based activities to support your mental health</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {activities.map((activity) => (
                    <div key={activity.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{activity.title}</h3>
                        <Badge variant="outline">{activity.duration}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
                      <div className="flex items-center gap-2">
                        {completedActivities.includes(activity.id) ? (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handleStartActivity(activity.id)}
                            disabled={activeActivity === activity.id}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            {activeActivity === activity.id ? (
                              <>
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                                In Progress
                              </>
                            ) : (
                              <>
                                <Play className="h-3 w-3 mr-1" />
                                Start
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Mood Check</CardTitle>
                <CardDescription>How are you feeling today?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Mood Score</span>
                    <span className="text-2xl font-bold text-blue-600">{moodScore}/10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={moodScore}
                    onChange={(e) => setMoodScore(Number.parseInt(e.target.value))}
                    className="w-full"
                  />
                  <Textarea
                    placeholder="Optional: Add a note about your mood..."
                    value={currentNote}
                    onChange={(e) => setCurrentNote(e.target.value)}
                    className="min-h-[60px]"
                  />
                  <Button className="w-full" onClick={handleLogMood}>
                    Log Mood
                  </Button>

                  {moodHistory.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <h4 className="font-semibold text-sm">Recent Entries:</h4>
                      {moodHistory.slice(0, 3).map((entry, index) => (
                        <div key={index} className="text-xs p-2 bg-gray-50 rounded">
                          <span className="font-medium">
                            {entry.date}: {entry.score}/10
                          </span>
                          {entry.note && <p className="text-gray-600 mt-1">{entry.note}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Learning Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {learningResources.map((resource, index) => (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <div className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <h4 className="font-semibold">{resource.title}</h4>
                        <p className="text-sm text-gray-600">{resource.duration}</p>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{resource.title}</DialogTitle>
                        <DialogDescription>{resource.content}</DialogDescription>
                      </DialogHeader>
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-4">
                          This is a comprehensive guide that covers the fundamentals of {resource.title.toLowerCase()}.
                          The content includes practical strategies, expert insights, and actionable steps you can take
                          today.
                        </p>
                        <Button className="w-full">Continue Reading</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Support Groups
                </CardTitle>
                <CardDescription>Connect with others who understand your journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Anxiety Support Circle</h4>
                      <Badge variant="outline">Online</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Weekly support group for anxiety management and coping strategies.
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Tuesdays 7:00 PM EST</span>
                      <span>24 members</span>
                    </div>
                    <Button size="sm" className="mt-2 w-full">
                      Join Group
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Depression Recovery Network</h4>
                      <Badge variant="outline">Online</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Peer support for depression recovery with professional moderation.
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Thursdays 6:30 PM EST</span>
                      <span>18 members</span>
                    </div>
                    <Button size="sm" className="mt-2 w-full">
                      Join Group
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Mindfulness & Meditation</h4>
                      <Badge variant="outline">Local</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      In-person group focusing on mindfulness practices and meditation.
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Saturdays 10:00 AM</span>
                      <span>12 members</span>
                    </div>
                    <Button size="sm" className="mt-2 w-full">
                      Join Group
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Young Adults Mental Health</h4>
                      <Badge variant="outline">Online</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Support group specifically for adults aged 18-30 facing mental health challenges.
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Sundays 4:00 PM EST</span>
                      <span>31 members</span>
                    </div>
                    <Button size="sm" className="mt-2 w-full">
                      Join Group
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">PTSD Support Community</h4>
                      <Badge variant="outline">Online</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Safe space for PTSD survivors with trauma-informed peer support.
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Wednesdays 8:00 PM EST</span>
                      <span>15 members</span>
                    </div>
                    <Button size="sm" className="mt-2 w-full">
                      Join Group
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
