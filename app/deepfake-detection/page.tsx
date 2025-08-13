"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Shield, Upload, AlertTriangle, CheckCircle, XCircle, Eye, Camera, Video } from "lucide-react"

interface DetectionResult {
  type: "authentic" | "manipulated" | "suspicious"
  confidence: number
  details: string[]
  techniques: string[]
}

export default function DeepfakeDetection() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<DetectionResult | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setResult(null)
    }
  }

  const handleAnalyze = async () => {
    if (!selectedFile) return

    setIsAnalyzing(true)
    setProgress(0)

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 100)

    // Simulate analysis completion
    setTimeout(() => {
      const results: DetectionResult[] = [
        {
          type: "authentic",
          confidence: 94,
          details: ["Natural facial movements detected", "Consistent lighting patterns", "No digital artifacts found"],
          techniques: ["XceptionNet analysis", "FaceForensics++ validation", "MediaPipe verification"],
        },
        {
          type: "manipulated",
          confidence: 87,
          details: ["Inconsistent facial landmarks", "Digital compression artifacts", "Unnatural eye movements"],
          techniques: ["EfficientNet detection", "Intel FakeCatcher analysis", "CLIP verification"],
        },
        {
          type: "suspicious",
          confidence: 72,
          details: ["Some inconsistencies detected", "Requires manual review", "Borderline authenticity markers"],
          techniques: ["YOLOv8 analysis", "Deepfake detection models", "Frame-by-frame analysis"],
        },
      ]

      setResult(results[Math.floor(Math.random() * results.length)])
      setIsAnalyzing(false)
    }, 5000)
  }

  const getResultInfo = (type: DetectionResult["type"]) => {
    switch (type) {
      case "authentic":
        return {
          icon: <CheckCircle className="h-8 w-8 text-green-600" />,
          title: "Content Appears Authentic",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          textColor: "text-green-800",
        }
      case "manipulated":
        return {
          icon: <XCircle className="h-8 w-8 text-red-600" />,
          title: "Manipulation Detected",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          textColor: "text-red-800",
        }
      case "suspicious":
        return {
          icon: <AlertTriangle className="h-8 w-8 text-yellow-600" />,
          title: "Suspicious Content",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          textColor: "text-yellow-800",
        }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Shield className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Deepfake & Media Authentication</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Advanced AI detection for manipulated media in health content using cutting-edge deepfake detection
            technology
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Media for Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-400 transition-colors">
                <div className="space-y-4">
                  <div className="flex justify-center space-x-4">
                    <Camera className="h-12 w-12 text-gray-400" />
                    <Video className="h-12 w-12 text-gray-400" />
                    <Eye className="h-12 w-12 text-gray-400" />
                  </div>
                  <div>
                    <label htmlFor="media-upload" className="cursor-pointer">
                      <span className="text-emerald-600 hover:text-emerald-700 font-semibold">Click to upload</span> or
                      drag and drop
                    </label>
                    <p className="text-sm text-gray-500 mt-2">
                      Images: JPG, PNG, GIF | Videos: MP4, AVI, MOV (max 50MB)
                    </p>
                  </div>
                  <input
                    id="media-upload"
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    accept="image/*,video/*"
                  />
                </div>
              </div>

              {selectedFile && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <p className="text-emerald-800 font-medium">Selected file:</p>
                  <p className="text-emerald-700 text-sm">
                    {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                </div>
              )}

              <Button
                onClick={handleAnalyze}
                disabled={!selectedFile || isAnalyzing}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Media"}
              </Button>

              {/* Analysis Progress */}
              {isAnalyzing && (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Analysis Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="text-center text-sm text-gray-500">Running deepfake detection algorithms...</div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Detection Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!result && !isAnalyzing && (
                <div className="text-center py-12 text-gray-500">
                  <Eye className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Upload media to begin authenticity analysis</p>
                </div>
              )}

              {result && (
                <div className="space-y-6">
                  {/* Main Result */}
                  <div
                    className={`p-6 rounded-lg border-2 ${getResultInfo(result.type).bgColor} ${getResultInfo(result.type).borderColor}`}
                  >
                    <div className="text-center">
                      {getResultInfo(result.type).icon}
                      <h3 className={`text-xl font-bold mt-2 ${getResultInfo(result.type).textColor}`}>
                        {getResultInfo(result.type).title}
                      </h3>
                      <Badge className="mt-2">{result.confidence}% confidence</Badge>
                    </div>
                  </div>

                  {/* Analysis Details */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Detection Details:</h4>
                      <ul className="space-y-1">
                        {result.details.map((detail, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                            <span className="text-emerald-600 mt-1">•</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Analysis Techniques Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.techniques.map((technique, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {technique}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Technology Information */}
        <Card className="mt-8 bg-gray-50">
          <CardHeader>
            <CardTitle>Advanced Detection Technology</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-sm">XceptionNet</h3>
                <p className="text-xs text-gray-600">Trained on FaceForensics++ dataset</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Eye className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-sm">Intel FakeCatcher</h3>
                <p className="text-xs text-gray-600">Facial manipulation detection</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Camera className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-sm">YOLOv8</h3>
                <p className="text-xs text-gray-600">Fake watermark detection</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Video className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-sm">CLIP Analysis</h3>
                <p className="text-xs text-gray-600">Image-caption context verification</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
