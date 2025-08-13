"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TreePine, Bike, MapPin, Award, Play, Clock, Leaf, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SustainableFitnessPage() {
  const { toast } = useToast()
  const [weeklyGoal, setWeeklyGoal] = useState(150)
  const [currentMinutes, setCurrentMinutes] = useState(87)
  const [selectedActivity, setSelectedActivity] = useState("")

  const ecoActivities = [
    {
      name: "Nature Walking",
      icon: "🚶‍♀️",
      carbonSaved: "2.3 kg CO₂/hour",
      calories: "240 cal/hour",
      difficulty: "Easy",
      benefits: ["Low impact", "Mental wellness", "No equipment needed"],
    },
    {
      name: "Cycling",
      icon: "🚴‍♂️",
      carbonSaved: "4.1 kg CO₂/hour",
      calories: "480 cal/hour",
      difficulty: "Moderate",
      benefits: ["Cardio fitness", "Transportation alternative", "Leg strength"],
    },
    {
      name: "Outdoor Yoga",
      icon: "🧘‍♀️",
      carbonSaved: "0.8 kg CO₂/hour",
      calories: "180 cal/hour",
      difficulty: "Easy",
      benefits: ["Flexibility", "Mindfulness", "Core strength"],
    },
    {
      name: "Trail Running",
      icon: "🏃‍♂️",
      carbonSaved: "3.2 kg CO₂/hour",
      calories: "600 cal/hour",
      difficulty: "Hard",
      benefits: ["High cardio", "Endurance", "Nature connection"],
    },
    {
      name: "Rock Climbing",
      icon: "🧗‍♂️",
      carbonSaved: "1.5 kg CO₂/hour",
      calories: "540 cal/hour",
      difficulty: "Hard",
      benefits: ["Full body workout", "Problem solving", "Strength building"],
    },
    {
      name: "Swimming (Natural)",
      icon: "🏊‍♀️",
      carbonSaved: "2.8 kg CO₂/hour",
      calories: "420 cal/hour",
      difficulty: "Moderate",
      benefits: ["Full body", "Low impact", "Refreshing"],
    },
  ]

  const workoutPlans = [
    {
      name: "Eco Beginner",
      duration: "30 min",
      activities: ["Nature Walking", "Outdoor Yoga", "Light Cycling"],
      carbonSaved: "5.2 kg CO₂/week",
    },
    {
      name: "Green Warrior",
      duration: "45 min",
      activities: ["Trail Running", "Cycling", "Rock Climbing"],
      carbonSaved: "12.8 kg CO₂/week",
    },
    {
      name: "Nature Explorer",
      duration: "60 min",
      activities: ["Hiking", "Swimming", "Outdoor Yoga"],
      carbonSaved: "8.7 kg CO₂/week",
    },
  ]

  const nearbyLocations = [
    {
      name: "Central Park Trail",
      type: "Walking/Running",
      distance: "0.5 miles",
      rating: 4.8,
      features: ["Paved paths", "Scenic views", "Water fountains"],
    },
    {
      name: "Riverside Bike Path",
      type: "Cycling",
      distance: "1.2 miles",
      rating: 4.9,
      features: ["Bike rental", "River views", "Rest areas"],
    },
    {
      name: "Mountain View Yoga Spot",
      type: "Yoga/Meditation",
      distance: "2.1 miles",
      rating: 4.7,
      features: ["Peaceful setting", "Morning classes", "Equipment provided"],
    },
  ]

  const startActivity = (activityName: string) => {
    setSelectedActivity(activityName)
    toast({
      title: "Activity Started",
      description: `Started tracking your ${activityName} session!`,
    })
  }

  const joinWorkout = (planName: string) => {
    toast({
      title: "Workout Plan Selected",
      description: `Starting ${planName} workout plan!`,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <TreePine className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">Sustainable Fitness</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Eco-friendly activities like walking, cycling, and yoga that benefit both you and the planet
            </p>
          </div>

          {/* Weekly Progress */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-green-600" />
                Weekly Eco-Fitness Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Activity Minutes</span>
                    <span className="text-sm text-gray-600">
                      {currentMinutes}/{weeklyGoal} min
                    </span>
                  </div>
                  <Progress value={(currentMinutes / weeklyGoal) * 100} className="mb-2" />
                  <p className="text-xs text-gray-500">Goal: {weeklyGoal} minutes/week</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">23.4 kg</div>
                  <p className="text-sm text-gray-600">CO₂ saved this week</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">1,240</div>
                  <p className="text-sm text-gray-600">Calories burned</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="activities" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="activities">Eco Activities</TabsTrigger>
              <TabsTrigger value="workouts">Workout Plans</TabsTrigger>
              <TabsTrigger value="locations">Nearby Locations</TabsTrigger>
              <TabsTrigger value="impact">Environmental Impact</TabsTrigger>
            </TabsList>

            <TabsContent value="activities" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ecoActivities.map((activity, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <span className="text-2xl">{activity.icon}</span>
                        {activity.name}
                      </CardTitle>
                      <Badge
                        variant="outline"
                        className={
                          activity.difficulty === "Easy"
                            ? "text-green-600 border-green-600"
                            : activity.difficulty === "Moderate"
                              ? "text-yellow-600 border-yellow-600"
                              : "text-red-600 border-red-600"
                        }
                      >
                        {activity.difficulty}
                      </Badge>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">Carbon Saved:</span>
                          <p className="font-semibold text-green-600">{activity.carbonSaved}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Calories:</span>
                          <p className="font-semibold text-blue-600">{activity.calories}</p>
                        </div>
                      </div>

                      <div>
                        <span className="text-sm text-gray-600">Benefits:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {activity.benefits.map((benefit, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        onClick={() => startActivity(activity.name)}
                        variant={selectedActivity === activity.name ? "default" : "outline"}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        {selectedActivity === activity.name ? "Tracking..." : "Start Activity"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="workouts" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                {workoutPlans.map((plan, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-blue-600" />
                        {plan.name}
                      </CardTitle>
                      <CardDescription>{plan.duration} workout</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Activities:</h4>
                        <div className="space-y-1">
                          {plan.activities.map((activity, i) => (
                            <div key={i} className="text-sm text-gray-600">
                              • {activity}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Leaf className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-semibold text-green-800">Saves {plan.carbonSaved}</span>
                        </div>
                      </div>

                      <Button className="w-full" onClick={() => joinWorkout(plan.name)}>
                        <Users className="h-4 w-4 mr-2" />
                        Start Workout Plan
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Customize Your Goals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Weekly Activity Goal (minutes)</Label>
                    <Input
                      type="number"
                      value={weeklyGoal}
                      onChange={(e) => setWeeklyGoal(Number.parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <Button>Update Goals</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="locations" className="space-y-6">
              <div className="space-y-4">
                {nearbyLocations.map((location, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <MapPin className="h-6 w-6 text-blue-600" />
                          <div>
                            <h3 className="font-semibold text-lg">{location.name}</h3>
                            <p className="text-gray-600">{location.type}</p>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-sm text-gray-500">{location.distance} away</span>
                              <Badge variant="secondary">★ {location.rating}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex flex-wrap gap-1 mb-2">
                            {location.features.map((feature, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          <Button>
                            <MapPin className="h-4 w-4 mr-2" />
                            Get Directions
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="impact" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-green-500" />
                      Carbon Footprint Reduced
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-500 mb-2">156.7 kg</div>
                    <p className="text-sm text-gray-600">CO₂ saved this year through eco-fitness</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bike className="h-5 w-5 text-blue-500" />
                      Gym Visits Replaced
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-500 mb-2">47</div>
                    <p className="text-sm text-gray-600">Outdoor activities instead of gym sessions</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-yellow-500" />
                      Eco-Fitness Level
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-yellow-500 mb-2">Level 4</div>
                    <p className="text-sm text-gray-600">Nature Athlete status achieved</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Impact Comparison</CardTitle>
                  <CardDescription>Eco-fitness vs Traditional Gym Workouts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-green-800">Outdoor Eco-Fitness</h4>
                        <p className="text-sm text-green-700">Average monthly carbon footprint</p>
                      </div>
                      <div className="text-2xl font-bold text-green-600">2.1 kg CO₂</div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-red-800">Traditional Gym</h4>
                        <p className="text-sm text-red-700">Average monthly carbon footprint</p>
                      </div>
                      <div className="text-2xl font-bold text-red-600">15.3 kg CO₂</div>
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
