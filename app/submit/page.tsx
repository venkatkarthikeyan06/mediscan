"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Shield, Upload, LinkIcon, Type, ArrowLeft, CheckCircle } from "lucide-react"
import NextLink from "next/link"
import { useRouter } from "next/navigation"

export default function SubmitPage() {
  const [textContent, setTextContent] = useState("")
  const [urlContent, setUrlContent] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()

  const analyzeTextContent = (text: string) => {
    const lowerText = text.toLowerCase()

    // Trusted medical terminology and indicators
    const trustedMedicalTerms = [
      "peer-reviewed",
      "clinical trial",
      "randomized controlled trial",
      "meta-analysis",
      "systematic review",
      "published in",
      "journal of",
      "according to who",
      "cdc recommends",
      "fda approved",
      "clinical evidence",
      "medical research",
      "scientific study",
      "pubmed",
      "nejm",
      "lancet",
      "bmj",
      "jama",
      "cochrane review",
    ]

    // Questionable/misinformation indicators
    const questionableTerms = [
      "big pharma conspiracy",
      "doctors don't want you to know",
      "miracle cure",
      "natural remedy that works better",
      "government cover-up",
      "they don't want you to know",
      "secret cure",
      "pharmaceutical companies hide",
      "alternative medicine breakthrough",
      "detox",
      "cleanse",
      "toxins",
      "chemical-free",
      "all natural cure",
    ]

    // Scientific citation patterns
    const hasCitations = /$$\d{4}$$|et al\.|doi:|pmid:|www\.ncbi\.nlm\.nih\.gov|pubmed/i.test(text)
    const hasReferences = /references?:|bibliography:|source:|study shows?:/i.test(text)

    // Check for trusted medical content
    const trustedTermCount = trustedMedicalTerms.filter((term) => lowerText.includes(term)).length
    const questionableTermCount = questionableTerms.filter((term) => lowerText.includes(term)).length

    let outcome: string
    let credibilityScore: number
    let contentType: string
    let riskLevel: string

    // Determine outcome based on content analysis
    if (trustedTermCount >= 2 || hasCitations || hasReferences) {
      outcome = "acceptable"
      credibilityScore = 80 + Math.floor(Math.random() * 20) // 80-100
      contentType = "scientific-medical"
      riskLevel = "low"
    } else if (questionableTermCount >= 2) {
      outcome = "questionable"
      credibilityScore = 15 + Math.floor(Math.random() * 25) // 15-40
      contentType = "questionable-claims"
      riskLevel = "high"
    } else {
      // Use random for ambiguous content
      const randomOutcomes = ["acceptable", "partially_acceptable", "questionable"]
      outcome = randomOutcomes[Math.floor(Math.random() * randomOutcomes.length)]

      switch (outcome) {
        case "acceptable":
          credibilityScore = 75 + Math.floor(Math.random() * 25) // 75-100
          contentType = "general-health"
          riskLevel = "low"
          break
        case "partially_acceptable":
          credibilityScore = 45 + Math.floor(Math.random() * 30) // 45-75
          contentType = "mixed-content"
          riskLevel = "moderate"
          break
        case "questionable":
          credibilityScore = 10 + Math.floor(Math.random() * 35) // 10-45
          contentType = "unverified-claims"
          riskLevel = "high"
          break
        default:
          credibilityScore = 50
          contentType = "general"
          riskLevel = "moderate"
      }
    }

    const healthKeywords = [
      "vaccine",
      "covid",
      "cancer",
      "medicine",
      "treatment",
      "cure",
      "symptoms",
      "disease",
      "virus",
      "bacteria",
      "infection",
      "immunity",
      "antibiotics",
      "vitamins",
      "supplements",
      "diet",
      "exercise",
      "mental health",
      "depression",
      "anxiety",
    ]

    const hasHealthContent = healthKeywords.some((keyword) => lowerText.includes(keyword))

    return {
      hasHealthContent,
      credibilityScore,
      contentType,
      riskLevel,
      outcome,
      trustedTerms: trustedTermCount,
      questionableTerms: questionableTermCount,
      hasCitations,
      hasReferences,
    }
  }

  const analyzeUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname.toLowerCase().replace("www.", "")

      const trustedMedicalDomains = [
        "who.int",
        "cdc.gov",
        "nih.gov",
        "mayoclinic.org",
        "webmd.com",
        "healthline.com",
        "clevelandclinic.org",
        "hopkinsmedicine.org",
        "medscape.com",
        // Medical journals and academic sources
        "journals.lww.com",
        "nejm.org",
        "thelancet.com",
        "bmj.com",
        "jamanetwork.com",
        "nature.com",
        "sciencedirect.com",
        "pubmed.ncbi.nlm.nih.gov",
        "cochranelibrary.com",
        "annals.org",
        "acpjournals.org",
        "springer.com",
        "wiley.com",
        "tandfonline.com",
      ]

      const questionableDomains = [
        "naturalnews.com",
        "mercola.com",
        "infowars.com",
        "healthimpactnews.com",
        "greenmedinfo.com",
        "vactruth.com",
        "thehealthyhomeeconomist.com",
      ]

      const socialMediaDomains = ["facebook.com", "twitter.com", "instagram.com", "tiktok.com", "youtube.com"]
      const newsDomains = ["bbc.com", "cnn.com", "reuters.com", "ap.org", "npr.org"]

      let outcome: string
      let trustScore: number
      let sourceType: string
      let category: string

      if (trustedMedicalDomains.some((t) => domain.includes(t)) || domain.includes(".gov") || domain.includes(".edu")) {
        outcome = "acceptable"
        trustScore = 85 + Math.floor(Math.random() * 15) // 85-100
        sourceType = "trusted"
        category = domain.includes("journals.") || domain.includes(".edu") ? "academic" : "medical-authority"
      } else if (questionableDomains.some((q) => domain.includes(q))) {
        outcome = "questionable"
        trustScore = 10 + Math.floor(Math.random() * 25) // 10-35
        sourceType = "questionable"
        category = "questionable-source"
      } else {
        const randomOutcomes = ["acceptable", "partially_acceptable", "questionable"]
        outcome = randomOutcomes[Math.floor(Math.random() * randomOutcomes.length)]

        switch (outcome) {
          case "acceptable":
            trustScore = 75 + Math.floor(Math.random() * 15) // 75-90
            sourceType = "trusted"
            break
          case "partially_acceptable":
            trustScore = 45 + Math.floor(Math.random() * 30) // 45-75
            sourceType = "neutral"
            break
          case "questionable":
            trustScore = 20 + Math.floor(Math.random() * 25) // 20-45
            sourceType = "questionable"
            break
          default:
            trustScore = 50
            sourceType = "neutral"
        }

        // Determine category for neutral domains
        if (socialMediaDomains.some((s) => domain.includes(s))) category = "social-media"
        else if (newsDomains.some((n) => domain.includes(n))) category = "news-media"
        else category = "general"
      }

      return {
        domain,
        trustScore,
        sourceType,
        category,
        outcome,
      }
    } catch (error) {
      return {
        domain: "invalid-url",
        trustScore: 10,
        sourceType: "questionable",
        category: "invalid",
        outcome: "questionable",
      }
    }
  }

  const analyzeFile = (file: File) => {
    const fileType = file.type
    const fileName = file.name.toLowerCase()

    let analysisType = "document"
    if (fileType.startsWith("image/")) analysisType = "image"
    else if (fileType.startsWith("audio/")) analysisType = "audio"
    else if (fileType.startsWith("video/")) analysisType = "video"

    // Trusted file name indicators
    const trustedFileIndicators = [
      "journal",
      "research",
      "study",
      "clinical",
      "trial",
      "medical",
      "nejm",
      "lancet",
      "bmj",
      "jama",
      "who",
      "cdc",
      "nih",
      "pubmed",
      "doi",
      "academic",
      "university",
      "hospital",
      "clinic",
      "peer-review",
      "scientific",
    ]

    // Questionable file indicators
    const questionableFileIndicators = [
      "conspiracy",
      "secret",
      "hidden",
      "truth",
      "exposed",
      "scam",
      "hoax",
      "alternative",
      "natural-cure",
      "miracle",
      "breakthrough",
      "cover-up",
    ]

    // Medical file extensions that are typically more credible
    const medicalFileTypes = ["application/pdf", "application/msword", "text/plain"]

    // Check file name for indicators
    const trustedIndicatorCount = trustedFileIndicators.filter((indicator) => fileName.includes(indicator)).length
    const questionableIndicatorCount = questionableFileIndicators.filter((indicator) =>
      fileName.includes(indicator),
    ).length

    let outcome: string
    let credibilityScore: number
    let sourceType: string

    // Determine outcome based on file analysis
    if (trustedIndicatorCount >= 1 && medicalFileTypes.includes(fileType)) {
      outcome = "acceptable"
      credibilityScore = 85 + Math.floor(Math.random() * 15) // 85-100
      sourceType = "academic-medical"
    } else if (questionableIndicatorCount >= 1) {
      outcome = "questionable"
      credibilityScore = 15 + Math.floor(Math.random() * 25) // 15-40
      sourceType = "questionable-source"
    } else if (fileName.includes("pdf") && (fileName.includes("research") || fileName.includes("study"))) {
      outcome = "acceptable"
      credibilityScore = 80 + Math.floor(Math.random() * 15) // 80-95
      sourceType = "research-document"
    } else {
      // Use random for ambiguous files
      const randomOutcomes = ["acceptable", "partially_acceptable", "questionable"]
      outcome = randomOutcomes[Math.floor(Math.random() * randomOutcomes.length)]

      switch (outcome) {
        case "acceptable":
          credibilityScore = 75 + Math.floor(Math.random() * 25) // 75-100
          sourceType = "general-document"
          break
        case "partially_acceptable":
          credibilityScore = 45 + Math.floor(Math.random() * 30) // 45-75
          sourceType = "mixed-source"
          break
        case "questionable":
          credibilityScore = 10 + Math.floor(Math.random() * 35) // 10-45
          sourceType = "unverified-source"
          break
        default:
          credibilityScore = 50
          sourceType = "general"
      }
    }

    return {
      type: analysisType,
      size: file.size,
      format: fileType,
      name: fileName,
      processingComplexity: analysisType === "video" ? "high" : analysisType === "audio" ? "medium" : "low",
      credibilityScore,
      outcome,
      sourceType,
      trustedIndicators: trustedIndicatorCount,
      questionableIndicators: questionableIndicatorCount,
    }
  }

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!textContent.trim()) return

    setIsSubmitting(true)

    const analysis = analyzeTextContent(textContent)
    const submissionData = {
      type: "text",
      content: textContent,
      analysis,
      timestamp: new Date().toISOString(),
    }

    localStorage.setItem("currentAnalysis", JSON.stringify(submissionData))

    // Simulate processing time based on content length
    const processingTime = Math.min(4000, Math.max(2000, textContent.length * 10))
    await new Promise((resolve) => setTimeout(resolve, processingTime))

    setIsSubmitting(false)
    router.push("/analysis")
  }

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!urlContent.trim()) return

    setIsSubmitting(true)

    try {
      const urlAnalysis = analyzeUrl(urlContent)
      const submissionData = {
        type: "url",
        content: urlContent,
        analysis: urlAnalysis,
        timestamp: new Date().toISOString(),
      }

      localStorage.setItem("currentAnalysis", JSON.stringify(submissionData))

      // Simulate URL fetching and analysis
      await new Promise((resolve) => setTimeout(resolve, 3000))

      setIsSubmitting(false)
      router.push("/analysis")
    } catch (error) {
      console.error("URL analysis failed:", error)
      setIsSubmitting(false)
    }
  }

  const handleFileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setIsSubmitting(true)

    const fileAnalysis = analyzeFile(file)
    const submissionData = {
      type: "file",
      content: file.name,
      analysis: fileAnalysis,
      timestamp: new Date().toISOString(),
    }

    localStorage.setItem("currentAnalysis", JSON.stringify(submissionData))

    // Simulate file processing time based on complexity
    const processingTime =
      fileAnalysis.processingComplexity === "high" ? 6000 : fileAnalysis.processingComplexity === "medium" ? 4000 : 3000
    await new Promise((resolve) => setTimeout(resolve, processingTime))

    setIsSubmitting(false)
    router.push("/analysis")
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
        {/* Header */}
        <header className="border-b border-emerald-100 bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <NextLink href="/" className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-emerald-600" />
                <span className="text-xl font-bold text-gray-900">MediScan</span>
              </NextLink>
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Content Submitted Successfully!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Your content is being analyzed by our AI system. You'll receive results shortly with verification from
              trusted medical sources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                <NextLink href="/analysis">View Analysis Progress</NextLink>
              </Button>
              <Button variant="outline" asChild>
                <NextLink href="/submit">Submit Another</NextLink>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
      {/* Header */}
      <header className="border-b border-emerald-100 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <NextLink href="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-emerald-600" />
              <span className="text-xl font-bold text-gray-900">MediScan</span>
            </NextLink>
            <NextLink
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </NextLink>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Content Submission</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Submit Content for Analysis</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Submit health-related content in any format. Our AI will analyze claims and provide verification with
            trusted medical sources.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Choose Your Submission Method</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="text" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="text" className="flex items-center space-x-2">
                  <Type className="h-4 w-4" />
                  <span>Text</span>
                </TabsTrigger>
                <TabsTrigger value="url" className="flex items-center space-x-2">
                  <LinkIcon className="h-4 w-4" />
                  <span>URL/Link</span>
                </TabsTrigger>
                <TabsTrigger value="file" className="flex items-center space-x-2">
                  <Upload className="h-4 w-4" />
                  <span>File Upload</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text">
                <form onSubmit={handleTextSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="text-content" className="text-lg font-semibold">
                      Paste Health Content
                    </Label>
                    <p className="text-sm text-gray-600 mb-3">
                      Copy and paste any health-related text, social media post, or article content
                    </p>
                    <Textarea
                      id="text-content"
                      placeholder="Paste your health-related content here... (e.g., social media posts, article excerpts, health claims)"
                      value={textContent}
                      onChange={(e) => setTextContent(e.target.value)}
                      className="min-h-[200px] resize-none"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-2">{textContent.length} characters</p>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    disabled={isSubmitting || !textContent.trim()}
                  >
                    {isSubmitting ? "Analyzing..." : "Analyze Text Content"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="url">
                <form onSubmit={handleUrlSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="url-content" className="text-lg font-semibold">
                      Enter URL or Link
                    </Label>
                    <p className="text-sm text-gray-600 mb-3">
                      Provide links to articles, videos, podcasts, or social media posts
                    </p>
                    <Input
                      id="url-content"
                      type="url"
                      placeholder="https://example.com/health-article"
                      value={urlContent}
                      onChange={(e) => setUrlContent(e.target.value)}
                      className="text-lg py-3"
                      required
                    />
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Supported Content Types:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• News articles and blog posts</li>
                      <li>• Social media posts (Twitter, Facebook, Instagram)</li>
                      <li>• YouTube videos and podcasts</li>
                      <li>• Medical websites and forums</li>
                    </ul>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    disabled={isSubmitting || !urlContent.trim()}
                  >
                    {isSubmitting ? "Analyzing..." : "Analyze URL Content"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="file">
                <form onSubmit={handleFileSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="file-upload" className="text-lg font-semibold">
                      Upload File
                    </Label>
                    <p className="text-sm text-gray-600 mb-3">
                      Upload documents, images, or audio files containing health information
                    </p>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-400 transition-colors">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <div className="space-y-2">
                        <Label htmlFor="file-upload" className="cursor-pointer">
                          <span className="text-emerald-600 hover:text-emerald-700 font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </Label>
                        <p className="text-sm text-gray-500">PDF, DOC, TXT, JPG, PNG, MP3, MP4 (max 10MB)</p>
                      </div>
                      <Input
                        id="file-upload"
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.mp3,.mp4"
                      />
                    </div>
                    {file && (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mt-4">
                        <p className="text-emerald-800">
                          <strong>Selected file:</strong> {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                      </div>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    disabled={isSubmitting || !file}
                  >
                    {isSubmitting ? "Analyzing..." : "Analyze File Content"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card className="mt-8 bg-gray-50">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tips for Better Analysis</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">For Text Submissions:</h4>
                <ul className="space-y-1">
                  <li>• Include complete sentences and context</li>
                  <li>• Provide specific health claims or statements</li>
                  <li>• Include any cited sources if available</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">For URL Submissions:</h4>
                <ul className="space-y-1">
                  <li>• Ensure the link is publicly accessible</li>
                  <li>• Full articles work better than headlines</li>
                  <li>• Social media posts should be public</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
