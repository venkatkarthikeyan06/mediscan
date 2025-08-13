"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Leaf, TreePine, Droplets, MapPin, TrendingDown, Award, Plus, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SustainableNutritionPage() {
  const { toast } = useToast()
  const [carbonFootprint, setCarbonFootprint] = useState(2.4)
  const [weeklyGoal, setWeeklyGoal] = useState(2.0)
  const [meals, setMeals] = useState([
    { id: 1, name: "Quinoa Buddha Bowl", carbon: 0.8, local: true, plantBased: true },
    { id: 2, name: "Local Vegetable Stir-fry", carbon: 0.6, local: true, plantBased: true },
    { id: 3, name: "Seasonal Fruit Salad", carbon: 0.3, local: true, plantBased: true },
  ])
  const [newMeal, setNewMeal] = useState("")

  const addMeal = () => {
    if (newMeal.trim()) {
      const meal = {
        id: Date.now(),
        name: newMeal,
        carbon: Math.random() * 2 + 0.2,
        local: Math.random() > 0.5,
        plantBased: Math.random() > 0.3,
      }
      setMeals([...meals, meal])
      setNewMeal("")
      toast({
        title: "Meal Added",
        description: `${newMeal} has been added to your nutrition tracker.`,
      })
    }
  }

  const removeMeal = (id: number) => {
    setMeals(meals.filter((meal) => meal.id !== id))
    toast({
      title: "Meal Removed",
      description: "Meal has been removed from your tracker.",
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
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">Sustainable Nutrition Tracker</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Track your eco-friendly diet choices with carbon footprint insights and local sourcing recommendations
            </p>
          </div>

          {/* Carbon Footprint Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingDown className="h-5 w-5 text-green-600" />
                  Weekly Carbon Footprint
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-2">{carbonFootprint.toFixed(1)} kg CO₂</div>
                <Progress value={(weeklyGoal / carbonFootprint) * 100} className="mb-2" />
                <p className="text-sm text-gray-600">Goal: {weeklyGoal} kg CO₂/week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Local Sourcing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600 mb-2">78%</div>
                <p className="text-sm text-gray-600">of your meals use local ingredients</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TreePine className="h-5 w-5 text-emerald-600" />
                  Plant-Based Ratio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-emerald-600 mb-2">85%</div>
                <p className="text-sm text-gray-600">of your diet is plant-based</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="tracker" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="tracker">Meal Tracker</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              <TabsTrigger value="local">Local Sources</TabsTrigger>
              <TabsTrigger value="impact">Impact Report</TabsTrigger>
            </TabsList>

            <TabsContent value="tracker" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Meal</CardTitle>
                  <CardDescription>Track your sustainable nutrition choices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter meal name..."
                      value={newMeal}
                      onChange={(e) => setNewMeal(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addMeal()}
                    />
                    <Button onClick={addMeal}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Meal
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4">
                {meals.map((meal) => (
                  <Card key={meal.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div>
                            <h3 className="font-semibold">{meal.name}</h3>
                            <p className="text-sm text-gray-600">{meal.carbon.toFixed(1)} kg CO₂</p>
                          </div>
                          <div className="flex gap-2">
                            {meal.local && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                Local
                              </Badge>
                            )}
                            {meal.plantBased && (
                              <Badge variant="secondary" className="bg-green-100 text-green-700">
                                Plant-Based
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeMeal(meal.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-green-600" />
                      Eco-Friendly Swaps
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800">Replace Beef with Lentils</h4>
                      <p className="text-sm text-green-700">Save 15.5 kg CO₂ per serving</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800">Choose Local Seasonal Vegetables</h4>
                      <p className="text-sm text-blue-700">Reduce transport emissions by 60%</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-800">Plant-Based Protein Sources</h4>
                      <p className="text-sm text-purple-700">Quinoa, chickpeas, and hemp seeds</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-yellow-600" />
                      Sustainability Goals
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Weekly Carbon Goal (kg CO₂)</Label>
                      <Input
                        type="number"
                        value={weeklyGoal}
                        onChange={(e) => setWeeklyGoal(Number.parseFloat(e.target.value) || 0)}
                        step="0.1"
                      />
                    </div>
                    <Button className="w-full">Update Goals</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="local" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Local Food Sources Near You</CardTitle>
                  <CardDescription>Find sustainable, locally-sourced ingredients</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold">Green Valley Farmers Market</h4>
                      <p className="text-sm text-gray-600">0.8 miles away • Open Sat-Sun</p>
                      <p className="text-sm text-green-600">Organic vegetables, local fruits</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold">Sustainable Harvest Co-op</h4>
                      <p className="text-sm text-gray-600">1.2 miles away • Open daily</p>
                      <p className="text-sm text-green-600">Plant-based proteins, grains</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="impact" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Environmental Impact</CardTitle>
                  <CardDescription>See how your choices make a difference</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Droplets className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-600">1,240L</div>
                      <p className="text-sm text-gray-600">Water saved this month</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <TreePine className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-600">18.5kg</div>
                      <p className="text-sm text-gray-600">CO₂ reduced this month</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-yellow-600">Level 3</div>
                      <p className="text-sm text-gray-600">Eco-Warrior status</p>
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
