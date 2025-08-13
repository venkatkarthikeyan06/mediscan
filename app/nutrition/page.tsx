"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Apple, Target, TrendingUp, Calendar, Book, Utensils } from "lucide-react"

export default function NutritionHub() {
  const [dailyGoals, setDailyGoals] = useState({
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65,
  })
  const [showGoalSuccess, setShowGoalSuccess] = useState(false)
  const [originalGoals, setOriginalGoals] = useState(dailyGoals)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showPlanModal, setShowPlanModal] = useState(false)
  const [showQuickAction, setShowQuickAction] = useState<string | null>(null)

  const mealPlans = [
    {
      name: "Mediterranean Diet",
      description: "Heart-healthy plan rich in fruits, vegetables, and healthy fats",
      duration: "7 days",
      calories: "1800-2000",
      difficulty: "Easy",
    },
    {
      name: "DASH Diet",
      description: "Designed to help lower blood pressure and improve heart health",
      duration: "14 days",
      calories: "1600-2000",
      difficulty: "Moderate",
    },
    {
      name: "Plant-Based",
      description: "Nutrient-dense vegetarian meals for optimal health",
      duration: "7 days",
      calories: "1700-1900",
      difficulty: "Easy",
    },
  ]

  const todaysMeals = [
    { meal: "Breakfast", food: "Oatmeal with berries", calories: 320, time: "8:00 AM" },
    { meal: "Lunch", food: "Grilled chicken salad", calories: 450, time: "12:30 PM" },
    { meal: "Snack", food: "Greek yogurt", calories: 150, time: "3:00 PM" },
    { meal: "Dinner", food: "Salmon with vegetables", calories: 520, time: "7:00 PM" },
  ]

  const handleUpdateGoals = () => {
    // Validate goals
    if (dailyGoals.calories < 1000 || dailyGoals.calories > 5000) {
      alert("Please enter a realistic calorie goal between 1000-5000")
      return
    }

    setOriginalGoals(dailyGoals)
    setShowGoalSuccess(true)

    // Hide success message after 3 seconds
    setTimeout(() => setShowGoalSuccess(false), 3000)
  }

  const handleResetGoals = () => {
    setDailyGoals(originalGoals)
  }

  const handleViewPlan = (planName: string) => {
    setSelectedPlan(planName)
    setShowPlanModal(true)
  }

  const handleQuickAction = (action: string) => {
    setShowQuickAction(action)
    setTimeout(() => setShowQuickAction(null), 2000)
  }

  const getPlanDetails = (planName: string) => {
    const planDetails = {
      "Mediterranean Diet": {
        meals: [
          "Breakfast: Greek yogurt with berries and nuts",
          "Lunch: Grilled fish with quinoa and vegetables",
          "Dinner: Olive oil roasted vegetables with whole grains",
          "Snacks: Hummus with vegetables, handful of nuts",
        ],
        benefits: ["Heart health", "Brain function", "Weight management", "Reduced inflammation"],
      },
      "DASH Diet": {
        meals: [
          "Breakfast: Oatmeal with fresh fruit and low-fat milk",
          "Lunch: Lean protein salad with mixed greens",
          "Dinner: Baked chicken with sweet potato and broccoli",
          "Snacks: Low-sodium nuts, fresh fruit",
        ],
        benefits: ["Lower blood pressure", "Heart health", "Kidney function", "Diabetes management"],
      },
      "Plant-Based": {
        meals: [
          "Breakfast: Smoothie bowl with plant protein and fruits",
          "Lunch: Lentil and vegetable curry with brown rice",
          "Dinner: Quinoa stuffed bell peppers with tahini sauce",
          "Snacks: Fresh fruits, vegetable sticks with hummus",
        ],
        benefits: ["Environmental impact", "Fiber intake", "Antioxidants", "Weight management"],
      },
    }
    return planDetails[planName as keyof typeof planDetails] || { meals: [], benefits: [] }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 py-12">
      {showQuickAction && (
        <div className="fixed top-4 right-4 z-50 bg-green-100 border border-green-200 rounded-lg p-4 shadow-lg">
          <p className="text-green-800">✅ {showQuickAction} action completed!</p>
        </div>
      )}

      {showPlanModal && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedPlan} Plan</h2>
                <Button variant="ghost" onClick={() => setShowPlanModal(false)}>
                  ✕
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Daily Meal Plan</h3>
                  <div className="space-y-2">
                    {getPlanDetails(selectedPlan).meals.map((meal, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm">{meal}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Health Benefits</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {getPlanDetails(selectedPlan).benefits.map((benefit, index) => (
                      <Badge key={index} variant="outline" className="justify-center">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">Start This Plan</Button>
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowPlanModal(false)}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Apple className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nutrition & Lifestyle Hub</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Evidence-based nutrition guidance, meal planning, and lifestyle recommendations
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="h-5 w-5" />
                  Today's Meal Plan
                </CardTitle>
                <CardDescription>Track your daily nutrition and meal timing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaysMeals.map((meal, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{meal.meal}</h3>
                        <p className="text-gray-600">{meal.food}</p>
                        <p className="text-sm text-gray-500">{meal.time}</p>
                      </div>
                      <Badge variant="outline">{meal.calories} cal</Badge>
                    </div>
                  ))}
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total Calories</span>
                      <span className="text-2xl font-bold text-green-600">1,440</span>
                    </div>
                    <div className="text-sm text-gray-600">560 calories remaining</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="h-5 w-5" />
                  Recommended Meal Plans
                </CardTitle>
                <CardDescription>Evidence-based nutrition plans tailored to your health goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {mealPlans.map((plan, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold">{plan.name}</h3>
                        <Badge variant="outline">{plan.difficulty}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
                      <div className="flex justify-between text-sm text-gray-500 mb-3">
                        <span>{plan.duration}</span>
                        <span>{plan.calories} cal/day</span>
                      </div>
                      <Button size="sm" className="w-full" onClick={() => handleViewPlan(plan.name)}>
                        View Plan
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Daily Goals
                </CardTitle>
                <CardDescription>Your personalized nutrition targets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {showGoalSuccess && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 text-sm">✅ Goals updated successfully!</p>
                  </div>
                )}

                <div>
                  <Label htmlFor="calories">Daily Calories</Label>
                  <Input
                    id="calories"
                    type="number"
                    value={dailyGoals.calories}
                    onChange={(e) => setDailyGoals({ ...dailyGoals, calories: Number.parseInt(e.target.value) || 0 })}
                    min="1000"
                    max="5000"
                  />
                </div>
                <div>
                  <Label htmlFor="protein">Protein (g)</Label>
                  <Input
                    id="protein"
                    type="number"
                    value={dailyGoals.protein}
                    onChange={(e) => setDailyGoals({ ...dailyGoals, protein: Number.parseInt(e.target.value) || 0 })}
                    min="0"
                    max="500"
                  />
                </div>
                <div>
                  <Label htmlFor="carbs">Carbs (g)</Label>
                  <Input
                    id="carbs"
                    type="number"
                    value={dailyGoals.carbs}
                    onChange={(e) => setDailyGoals({ ...dailyGoals, carbs: Number.parseInt(e.target.value) || 0 })}
                    min="0"
                    max="1000"
                  />
                </div>
                <div>
                  <Label htmlFor="fat">Fat (g)</Label>
                  <Input
                    id="fat"
                    type="number"
                    value={dailyGoals.fat}
                    onChange={(e) => setDailyGoals({ ...dailyGoals, fat: Number.parseInt(e.target.value) || 0 })}
                    min="0"
                    max="300"
                  />
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" onClick={handleUpdateGoals}>
                    Update Goals
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={handleResetGoals}>
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Progress This Week
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Avg Daily Calories</span>
                  <span className="font-semibold">1,850</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Goal Achievement</span>
                  <span className="font-semibold text-green-600">85%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Meals Logged</span>
                  <span className="font-semibold">21/28</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Water Intake</span>
                  <span className="font-semibold">7.2L avg</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full bg-transparent"
                  variant="outline"
                  onClick={() => handleQuickAction("Food logged")}
                >
                  Log Food
                </Button>
                <Button
                  className="w-full bg-transparent"
                  variant="outline"
                  onClick={() => handleQuickAction("Water intake recorded")}
                >
                  Add Water
                </Button>
                <Button
                  className="w-full bg-transparent"
                  variant="outline"
                  onClick={() => handleQuickAction("Recipes viewed")}
                >
                  View Recipes
                </Button>
                <Button
                  className="w-full bg-transparent"
                  variant="outline"
                  onClick={() => handleQuickAction("Nutrition tips accessed")}
                >
                  Nutrition Tips
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
