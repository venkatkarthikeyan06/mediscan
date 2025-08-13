"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Upload, Scan, AlertTriangle, CheckCircle, XCircle, Eye, Activity, Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function ImageCheckerPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [analysisHistory, setAnalysisHistory] = useState<
    Array<{ id: string; image: string; results: any; timestamp: Date }>
  >([])

  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        toast({
          title: "File too large",
          description: "Please select an image smaller than 10MB.",
          variant: "destructive",
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setSelectedImage(result)
        setAnalysisResults(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = async () => {
    if (!selectedImage) return

    setIsAnalyzing(true)
    setAnalysisProgress(0)

    try {
      // Simulate analysis progress
      const progressSteps = [
        { step: 20, message: "Loading image..." },
        { step: 40, message: "Detecting objects..." },
        { step: 60, message: "Analyzing medical content..." },
        { step: 80, message: "Checking safety information..." },
        { step: 100, message: "Generating results..." },
      ]

      for (const { step, message } of progressSteps) {
        await new Promise((resolve) => setTimeout(resolve, 800))
        setAnalysisProgress(step)
        toast({
          title: message,
          duration: 1000,
        })
      }

      // Generate mock analysis results
      const results = generateMockAnalysis()
      setAnalysisResults(results)

      // Add to history
      const historyEntry = {
        id: Date.now().toString(),
        image: selectedImage,
        results,
        timestamp: new Date(),
      }
      setAnalysisHistory((prev) => [historyEntry, ...prev.slice(0, 9)]) // Keep last 10

      toast({
        title: "Analysis complete",
        description: "Your medical image has been analyzed successfully.",
      })
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Unable to analyze the image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
      setAnalysisProgress(0)
    }
  }

  const generateMockAnalysis = () => {
    const analysisTypes = [
      {
        type: "Medicine Label",
        detected: ["Medication name", "Dosage information", "Expiration date", "Manufacturer"],
        safety: {
          status: "safe",
          score: 92,
          warnings: [],
          recommendations: [
            "Medication appears to be legitimate",
            "Check expiration date before use",
            "Store in cool, dry place",
            "Consult pharmacist if unsure",
          ],
        },
        details: {
          medicationName: "Acetaminophen 500mg",
          manufacturer: "Generic Pharma Co.",
          expirationDate: "12/2025",
          batchNumber: "ABC123",
          authenticity: "Verified",
        },
      },
      {
        type: "Health Warning Signs",
        detected: ["Skin condition", "Possible inflammation", "Color changes"],
        safety: {
          status: "caution",
          score: 65,
          warnings: ["Unusual skin discoloration detected", "Possible signs of inflammation"],
          recommendations: [
            "Consult a dermatologist",
            "Monitor for changes",
            "Avoid self-diagnosis",
            "Seek professional medical advice",
          ],
        },
        details: {
          condition: "Possible dermatitis",
          severity: "Mild to moderate",
          urgency: "Non-emergency",
          nextSteps: "Schedule appointment with healthcare provider",
        },
      },
      {
        type: "Medical Device",
        detected: ["Blood pressure monitor", "Digital display", "Measurement readings"],
        safety: {
          status: "safe",
          score: 88,
          warnings: [],
          recommendations: [
            "Device appears to be functioning normally",
            "Regular calibration recommended",
            "Keep device clean and dry",
            "Follow manufacturer instructions",
          ],
        },
        details: {
          deviceType: "Digital Blood Pressure Monitor",
          reading: "120/80 mmHg",
          status: "Normal range",
          accuracy: "High confidence",
        },
      },
    ]

    return analysisTypes[Math.floor(Math.random() * analysisTypes.length)]
  }

  const clearImage = () => {
    setSelectedImage(null)
    setAnalysisResults(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
    if (cameraInputRef.current) cameraInputRef.current.value = ""
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "safe":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "caution":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "danger":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <Eye className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe":
        return "bg-green-100 text-green-800 border-green-200"
      case "caution":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "danger":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Medical Image Quick-Check</h1>
          <p className="text-gray-600">Scan medicine labels and check for health warning signs</p>
        </div>

        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scan className="h-5 w-5" />
              Image Upload
            </CardTitle>
            <CardDescription>
              Upload or take a photo of medicine labels, medical devices, or health-related images
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 justify-center">
              <Button onClick={() => fileInputRef.current?.click()} className="bg-emerald-600 hover:bg-emerald-700">
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
              </Button>

              <Button onClick={() => cameraInputRef.current?.click()} variant="outline">
                <Camera className="h-4 w-4 mr-2" />
                Take Photo
              </Button>

              {selectedImage && (
                <Button onClick={clearImage} variant="outline">
                  Clear Image
                </Button>
              )}
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />

            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileUpload}
              className="hidden"
            />

            {selectedImage && (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <img
                    src={selectedImage || "/placeholder.svg"}
                    alt="Selected for analysis"
                    className="max-w-md max-h-64 object-contain rounded-lg border"
                  />
                </div>

                <div className="flex justify-center">
                  <Button onClick={analyzeImage} disabled={isAnalyzing} className="bg-emerald-600 hover:bg-emerald-700">
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-2" />
                        Analyze Image
                      </>
                    )}
                  </Button>
                </div>

                {isAnalyzing && (
                  <div className="space-y-2">
                    <Progress value={analysisProgress} className="w-full" />
                    <p className="text-center text-sm text-gray-600">Analyzing your medical image...</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {analysisResults && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getStatusIcon(analysisResults.safety.status)}
                Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Detected Content</h4>
                      <Badge variant="secondary" className="mb-2">
                        {analysisResults.type}
                      </Badge>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {analysisResults.detected.map((item: string, index: number) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Safety Assessment</h4>
                      <div className={`p-3 rounded-lg border ${getStatusColor(analysisResults.safety.status)}`}>
                        <div className="flex items-center gap-2 mb-2">
                          {getStatusIcon(analysisResults.safety.status)}
                          <span className="font-medium capitalize">{analysisResults.safety.status}</span>
                          <Badge variant="outline">{analysisResults.safety.score}% confidence</Badge>
                        </div>

                        {analysisResults.safety.warnings.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm font-medium mb-1">Warnings:</p>
                            <ul className="text-sm space-y-1">
                              {analysisResults.safety.warnings.map((warning: string, index: number) => (
                                <li key={index} className="flex items-start gap-2">
                                  <AlertTriangle className="h-3 w-3 text-yellow-600 mt-0.5 flex-shrink-0" />
                                  {warning}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(analysisResults.details).map(([key, value]) => (
                      <div key={key} className="p-3 bg-gray-50 rounded-lg">
                        <h5 className="font-medium text-gray-900 capitalize mb-1">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </h5>
                        <p className="text-gray-700">{value as string}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="recommendations" className="space-y-4">
                  <div className="space-y-3">
                    {analysisResults.safety.recommendations.map((rec: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <div className="bg-blue-100 p-1 rounded-full mt-0.5">
                          <Activity className="h-3 w-3 text-blue-600" />
                        </div>
                        <p className="text-blue-900 text-sm">{rec}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}

        {/* Analysis History */}
        {analysisHistory.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Analyses</CardTitle>
              <CardDescription>Your last 10 medical image checks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analysisHistory.map((entry) => (
                  <div key={entry.id} className="border rounded-lg p-3 space-y-2">
                    <img
                      src={entry.image || "/placeholder.svg"}
                      alt="Analysis history"
                      className="w-full h-24 object-cover rounded"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(entry.results.safety.status)}
                        <Badge variant="secondary" className="text-xs">
                          {entry.results.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">{entry.timestamp.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Safety Notice */}
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="bg-amber-100 p-2 rounded-full">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-medium text-amber-900 mb-1">Educational Purpose Only</h4>
                <p className="text-amber-800 text-sm">
                  This tool provides educational information only and is not intended for medical diagnosis. Always
                  consult healthcare professionals for medical advice. For medication verification, contact your
                  pharmacist or healthcare provider.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
