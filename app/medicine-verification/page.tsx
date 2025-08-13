"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pill, Upload, AlertTriangle, CheckCircle, FileImage } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function MedicineVerification() {
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check file type
      if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a JPG or PNG image of your prescription.",
          variant: "destructive",
        })
        return
      }

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      // Simulate prescription analysis
      setLoading(true)
      setTimeout(() => {
        const medicines = [
          {
            name: "Lisinopril 10mg",
            brand: "Prinivil",
            manufacturer: "Merck & Co.",
            prescribedBy: "Dr. Sarah Johnson",
            dosage: "10mg once daily",
            quantity: "30 tablets",
            refills: "2 remaining",
            verified: true,
            fda_approved: true,
            interactions: ["Potassium supplements", "NSAIDs"],
            warnings: ["Monitor blood pressure regularly", "Avoid potassium-rich foods", "May cause dizziness"],
          },
          {
            name: "Metformin 500mg",
            brand: "Glucophage",
            manufacturer: "Bristol-Myers Squibb",
            prescribedBy: "Dr. Sarah Johnson",
            dosage: "500mg twice daily",
            quantity: "60 tablets",
            refills: "5 remaining",
            verified: true,
            fda_approved: true,
            interactions: ["Alcohol", "Contrast dyes"],
            warnings: ["Take with meals", "Monitor kidney function", "May cause stomach upset"],
          },
        ]

        const randomMedicine = medicines[Math.floor(Math.random() * medicines.length)]
        setAnalysisResult(randomMedicine)
        setLoading(false)

        toast({
          title: "Prescription Analyzed",
          description: "Successfully extracted medication information from your prescription.",
        })
      }, 3000)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Pill className="h-8 w-8 text-emerald-600" />
          <h1 className="text-3xl font-bold text-gray-900">Medicine Verification</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload a photo of your prescription to verify medicine authenticity and check for safety information.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload Prescription Photo</CardTitle>
            <CardDescription>Take a clear photo of your prescription label (JPG, PNG formats)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              {uploadedImage ? (
                <div className="space-y-4">
                  <img
                    src={uploadedImage || "/placeholder.svg"}
                    alt="Uploaded prescription"
                    className="max-w-full h-32 object-contain mx-auto rounded"
                  />
                  <p className="text-sm text-green-600">Prescription photo uploaded successfully</p>
                </div>
              ) : (
                <>
                  <FileImage className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Upload a clear photo of your prescription label</p>
                </>
              )}

              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleFileUpload}
                className="hidden"
                id="prescription-upload"
                disabled={loading}
              />
              <label htmlFor="prescription-upload">
                <Button asChild disabled={loading} className="bg-emerald-600 hover:bg-emerald-700">
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    {loading ? "Analyzing..." : uploadedImage ? "Upload Different Photo" : "Upload Prescription"}
                  </span>
                </Button>
              </label>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500">Supported formats: JPG, PNG • Max size: 10MB</p>
              <p className="text-xs text-gray-400 mt-1">Ensure prescription label is clearly visible and readable</p>
            </div>
          </CardContent>
        </Card>

        {analysisResult && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {analysisResult.verified ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                )}
                Prescription Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{analysisResult.name}</h3>
                <p className="text-gray-600">{analysisResult.brand}</p>
                <p className="text-sm text-gray-500">by {analysisResult.manufacturer}</p>
                <p className="text-sm text-blue-600">Prescribed by {analysisResult.prescribedBy}</p>
              </div>

              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Dosage:</span>
                  <span>{analysisResult.dosage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Quantity:</span>
                  <span>{analysisResult.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Refills:</span>
                  <span>{analysisResult.refills}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Badge variant={analysisResult.verified ? "default" : "destructive"}>
                  {analysisResult.verified ? "Prescription Verified" : "Not Verified"}
                </Badge>
                {analysisResult.fda_approved && <Badge variant="secondary">FDA Approved</Badge>}
              </div>

              {analysisResult.interactions.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    Drug Interactions
                  </h4>
                  <ul className="space-y-1">
                    {analysisResult.interactions.map((interaction: string, index: number) => (
                      <li key={index} className="text-sm text-orange-700 bg-orange-50 p-2 rounded">
                        Avoid: {interaction}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {analysisResult.warnings.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    Important Warnings
                  </h4>
                  <ul className="space-y-1">
                    {analysisResult.warnings.map((warning: string, index: number) => (
                      <li key={index} className="text-sm text-yellow-700 bg-yellow-50 p-2 rounded">
                        {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4 border-t">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Save to Medicine Cabinet</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
