"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Stethoscope, AlertTriangle, Info, CheckCircle } from "lucide-react"

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleCheck = async () => {
    setLoading(true)
    // Simulate AI analysis
    setTimeout(() => {
      setResults({
        possibleConditions: [
          { name: "Common Cold", probability: 85, severity: "Low" },
          { name: "Seasonal Allergies", probability: 70, severity: "Low" },
          { name: "Viral Infection", probability: 45, severity: "Medium" },
        ],
        recommendations: [
          "Rest and stay hydrated",
          "Monitor symptoms for 24-48 hours",
          "Consult a healthcare provider if symptoms worsen",
        ],
        urgency: "Low",
      })
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Stethoscope className="h-8 w-8 text-emerald-600" />
          <h1 className="text-3xl font-bold text-gray-900">AI Symptom Checker</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get preliminary insights about your symptoms using AI analysis based on WHO and CDC guidelines. This is not a
          substitute for professional medical advice.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Describe Your Symptoms</CardTitle>
            <CardDescription>Please provide detailed information about what you're experiencing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="symptoms">Symptoms</Label>
              <Textarea
                id="symptoms"
                placeholder="Describe your symptoms in detail (e.g., headache, fever, cough, duration, severity)"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="min-h-32"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <select
                  id="gender"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <Button
              onClick={handleCheck}
              disabled={!symptoms || loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              {loading ? "Analyzing..." : "Check Symptoms"}
            </Button>
          </CardContent>
        </Card>

        {results && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
                Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Possible Conditions</h3>
                <div className="space-y-2">
                  {results.possibleConditions.map((condition: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="font-medium">{condition.name}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant={condition.severity === "Low" ? "secondary" : "destructive"}>
                          {condition.severity}
                        </Badge>
                        <span className="text-sm text-gray-600">{condition.probability}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Recommendations</h3>
                <ul className="space-y-1">
                  {results.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-yellow-800">Important Disclaimer</p>
                    <p className="text-yellow-700">
                      This is an AI-powered preliminary assessment. Always consult with a healthcare professional for
                      proper diagnosis and treatment.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
