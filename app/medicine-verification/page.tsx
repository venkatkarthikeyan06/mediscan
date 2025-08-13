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
        const allMedicines = [
          {
            name: "Paracetamol 500mg",
            brand: "Crocin",
            manufacturer: "GSK",
            classification: "Good",
            safety: "Safe for general use",
            prescribedBy: "Dr. Rajesh Kumar",
            dosage: "500mg twice daily",
            quantity: "20 tablets",
            refills: "3 remaining",
            verified: true,
            fda_approved: true,
            interactions: ["Alcohol", "Warfarin"],
            warnings: ["Do not exceed 4g per day", "Avoid alcohol consumption"],
          },
          {
            name: "Aspirin 75mg",
            brand: "Disprin",
            manufacturer: "Reckitt Benckiser",
            classification: "Good",
            safety: "Safe when used as directed",
            prescribedBy: "Dr. Priya Sharma",
            dosage: "75mg once daily",
            quantity: "30 tablets",
            refills: "2 remaining",
            verified: true,
            fda_approved: true,
            interactions: ["Blood thinners", "NSAIDs"],
            warnings: ["Take with food", "Monitor for bleeding"],
          },
          {
            name: "Tramadol 50mg",
            brand: "Ultram",
            manufacturer: "Janssen",
            classification: "Harmful",
            safety: "Potentially addictive - use with caution",
            prescribedBy: "Dr. Amit Patel",
            dosage: "50mg as needed",
            quantity: "10 tablets",
            refills: "0 remaining",
            verified: true,
            fda_approved: true,
            interactions: ["Alcohol", "Antidepressants", "Sedatives"],
            warnings: ["Risk of addiction", "May cause drowsiness", "Do not drive"],
          },
          {
            name: "Ibuprofen 400mg",
            brand: "Brufen",
            manufacturer: "Abbott",
            classification: "Good",
            safety: "Safe for short-term use",
            prescribedBy: "Dr. Sunita Reddy",
            dosage: "400mg three times daily",
            quantity: "15 tablets",
            refills: "1 remaining",
            verified: true,
            fda_approved: true,
            interactions: ["Blood pressure medications", "Aspirin"],
            warnings: ["Take with food", "May cause stomach upset"],
          },
          {
            name: "Codeine 30mg",
            brand: "Tylenol #3",
            manufacturer: "Johnson & Johnson",
            classification: "Harmful",
            safety: "Controlled substance - high addiction risk",
            prescribedBy: "Dr. Vikram Singh",
            dosage: "30mg every 6 hours",
            quantity: "12 tablets",
            refills: "0 remaining",
            verified: true,
            fda_approved: true,
            interactions: ["Alcohol", "Sedatives", "MAO inhibitors"],
            warnings: ["Highly addictive", "Respiratory depression risk", "Avoid alcohol"],
          },
          {
            name: "Metformin 850mg",
            brand: "Glucophage",
            manufacturer: "Bristol-Myers Squibb",
            classification: "Good",
            safety: "Safe and effective for diabetes",
            prescribedBy: "Dr. Kavitha Nair",
            dosage: "850mg twice daily",
            quantity: "60 tablets",
            refills: "5 remaining",
            verified: true,
            fda_approved: true,
            interactions: ["Contrast dyes", "Alcohol"],
            warnings: ["Take with meals", "Monitor kidney function"],
          },
        ]

        // Randomly select 2-4 medicines
        const numberOfMedicines = Math.floor(Math.random() * 3) + 2 // 2-4 medicines
        const shuffled = allMedicines.sort(() => 0.5 - Math.random())
        const selectedMedicines = shuffled.slice(0, numberOfMedicines)

        setAnalysisResult({
          medicines: selectedMedicines,
          totalFound: numberOfMedicines,
          analysisComplete: true,
        })
        setLoading(false)

        toast({
          title: "Prescription Analyzed",
          description: `Found ${numberOfMedicines} medicines in your prescription.`,
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
                <CheckCircle className="h-5 w-5 text-green-600" />
                Prescription Analysis - {analysisResult.totalFound} Medicines Found
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {analysisResult.medicines.map((medicine: any, index: number) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{medicine.name}</h3>
                    <p className="text-gray-600">{medicine.brand}</p>
                    <p className="text-sm text-gray-500">by {medicine.manufacturer}</p>
                    <p className="text-sm text-blue-600">Prescribed by {medicine.prescribedBy}</p>
                  </div>

                  <div className="flex gap-2">
                    <Badge variant={medicine.verified ? "default" : "destructive"}>
                      {medicine.verified ? "Prescription Verified" : "Not Verified"}
                    </Badge>
                    <Badge variant={medicine.classification === "Good" ? "default" : "destructive"}>
                      {medicine.classification}
                    </Badge>
                    {medicine.fda_approved && <Badge variant="secondary">FDA Approved</Badge>}
                  </div>

                  <div className="grid grid-cols-1 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Safety:</span>
                      <span className={medicine.classification === "Good" ? "text-green-600" : "text-red-600"}>
                        {medicine.safety}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Dosage:</span>
                      <span>{medicine.dosage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Quantity:</span>
                      <span>{medicine.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Refills:</span>
                      <span>{medicine.refills}</span>
                    </div>
                  </div>

                  {medicine.interactions.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                        Drug Interactions
                      </h4>
                      <ul className="space-y-1">
                        {medicine.interactions.map((interaction: string, idx: number) => (
                          <li key={idx} className="text-sm text-orange-700 bg-orange-50 p-2 rounded">
                            Avoid: {interaction}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {medicine.warnings.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        Important Warnings
                      </h4>
                      <ul className="space-y-1">
                        {medicine.warnings.map((warning: string, idx: number) => (
                          <li key={idx} className="text-sm text-yellow-700 bg-yellow-50 p-2 rounded">
                            {warning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-4 border-t">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Save All to Medicine Cabinet</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
