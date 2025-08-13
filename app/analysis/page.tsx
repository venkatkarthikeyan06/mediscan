"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowLeft,
  RefreshCw,
  Clock,
  Brain,
  Search,
  FileText,
  Link,
  Upload,
} from "lucide-react"
import NextLink from "next/link"

type AnalysisStage = "processing" | "analyzing" | "verifying" | "complete"
type VerificationResult = "true" | "partially-true" | "false" | null

interface SubmissionData {
  type: "text" | "url" | "file"
  content: string
  analysis: any
  timestamp: string
}

interface ResourceRecommendation {
  trustedSources: Array<{
    name: string
    url: string
    description: string
  }>
  searchQuery: string
  recommendationReason: string
}

export default function AnalysisPage() {
  const [stage, setStage] = useState<AnalysisStage>("processing")
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<VerificationResult>(null)
  const [analysisTime, setAnalysisTime] = useState(0)
  const [submissionData, setSubmissionData] = useState<SubmissionData | null>(null)
  const [resourceRecommendations, setResourceRecommendations] = useState<ResourceRecommendation | null>(null)

  // Load submission data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("currentAnalysis")
    if (storedData) {
      const data = JSON.parse(storedData) as SubmissionData
      setSubmissionData(data)

      if (data.analysis.outcome) {
        switch (data.analysis.outcome) {
          case "acceptable":
            setResult("true")
            break
          case "partially_acceptable":
            setResult("partially-true")
            break
          case "questionable":
            setResult("false")
            break
          default:
            setResult("partially-true")
        }
      } else {
        // Fallback for old analysis format
        if (data.type === "text") {
          const score = data.analysis.credibilityScore
          if (score >= 70) setResult("true")
          else if (score >= 40) setResult("partially-true")
          else setResult("false")
        } else if (data.type === "url") {
          const trustScore = data.analysis.trustScore
          if (trustScore >= 70) setResult("true")
          else if (trustScore >= 40) setResult("partially-true")
          else setResult("false")
        } else if (data.type === "file") {
          const score = data.analysis.credibilityScore || 50
          if (score >= 70) setResult("true")
          else if (score >= 40) setResult("partially-true")
          else setResult("false")
        }
      }

      generateResourceRecommendations(data)
    }
  }, [])

  const generateResourceRecommendations = (data: SubmissionData) => {
    const detailedFindings = getDetailedFindings(data)
    if (!detailedFindings) return

    const score = detailedFindings.score

    // Only show resources for partially acceptable or questionable content
    if (score >= 70) return

    const trustedMedicalSources = [
      {
        name: "WebMD",
        url: "https://www.webmd.com/",
        description: "Comprehensive health information and medical guidance",
      },
      {
        name: "Mayo Clinic",
        url: "https://www.mayoclinic.org/",
        description: "Expert medical advice and health information",
      },
      {
        name: "Healthline",
        url: "https://www.healthline.com/",
        description: "Evidence-based health and wellness content",
      },
      {
        name: "Medscape",
        url: "https://www.medscape.com/",
        description: "Medical news and professional resources",
      },
      {
        name: "Cleveland Clinic",
        url: "https://my.clevelandclinic.org/",
        description: "Medical expertise and patient care information",
      },
      {
        name: "NIH (National Institutes of Health)",
        url: "https://www.nih.gov/",
        description: "Federal medical research and health information",
      },
      {
        name: "WHO (World Health Organization)",
        url: "https://www.who.int/",
        description: "Global health guidance and disease information",
      },
      {
        name: "Johns Hopkins Medicine",
        url: "https://www.hopkinsmedicine.org/",
        description: "Medical research and clinical expertise",
      },
    ]

    const analysisId = data.timestamp
    const storedResourcesKey = `resources_${analysisId}`
    const existingResources = localStorage.getItem(storedResourcesKey)

    if (existingResources) {
      setResourceRecommendations(JSON.parse(existingResources))
      return
    }

    const lastResources = JSON.parse(localStorage.getItem("lastRecommendedResources") || "[]")
    const availableResources = trustedMedicalSources.filter((resource) => !lastResources.includes(resource.name))
    const resourcesToUse = availableResources.length >= 3 ? availableResources : trustedMedicalSources
    const shuffledSources = [...resourcesToUse].sort(() => Math.random() - 0.5).slice(0, 3)

    // Update last recommended resources
    const currentResourceNames = shuffledSources.map((r) => r.name)
    localStorage.setItem("lastRecommendedResources", JSON.stringify(currentResourceNames))

    let searchTopic = "health information"
    const content = data.content.toLowerCase()

    if (content.includes("vaccine") || content.includes("covid")) {
      searchTopic = "vaccine safety"
    } else if (content.includes("diet") || content.includes("nutrition")) {
      searchTopic = "nutrition facts"
    } else if (content.includes("mental") || content.includes("depression")) {
      searchTopic = "mental health"
    } else if (content.includes("cancer")) {
      searchTopic = "cancer information"
    } else if (content.includes("heart")) {
      searchTopic = "heart health"
    } else if (content.includes("diabetes")) {
      searchTopic = "diabetes management"
    }

    const recommendations = {
      trustedSources: shuffledSources,
      searchQuery: `${searchTopic} site:mayoclinic.org OR site:webmd.com OR site:nih.gov OR site:who.int`,
      recommendationReason: score < 40 ? "questionable" : "partially_acceptable",
    }

    localStorage.setItem(storedResourcesKey, JSON.stringify(recommendations))
    setResourceRecommendations(recommendations)
  }

  // Simulate analysis progress
  useEffect(() => {
    const timer = setInterval(() => {
      setAnalysisTime((prev) => prev + 1)
    }, 1000)

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 25 && stage === "processing") return prev + 2
        if (prev < 60 && stage === "analyzing") return prev + 1.5
        if (prev < 90 && stage === "verifying") return prev + 1
        if (prev < 100 && stage === "complete") return prev + 2
        return prev
      })
    }, 200)

    // Stage progression
    const stageTimer = setTimeout(
      () => {
        if (stage === "processing") {
          setStage("analyzing")
        } else if (stage === "analyzing") {
          setStage("verifying")
        } else if (stage === "verifying") {
          setStage("complete")
          setProgress(100)
        }
      },
      stage === "processing" ? 3000 : stage === "analyzing" ? 4000 : 3000,
    )

    return () => {
      clearInterval(timer)
      clearInterval(progressTimer)
      clearTimeout(stageTimer)
    }
  }, [stage])

  const getStageInfo = (currentStage: AnalysisStage) => {
    const contentTypeText =
      submissionData?.type === "text"
        ? "text content"
        : submissionData?.type === "url"
          ? "web content"
          : submissionData?.type === "file"
            ? "uploaded file"
            : "content"

    switch (currentStage) {
      case "processing":
        return {
          title: "Processing Content",
          description: `Extracting and parsing health claims from your ${contentTypeText}`,
          icon:
            submissionData?.type === "text" ? (
              <FileText className="h-6 w-6" />
            ) : submissionData?.type === "url" ? (
              <Link className="h-6 w-6" />
            ) : (
              <Upload className="h-6 w-6" />
            ),
        }
      case "analyzing":
        return {
          title: "AI Analysis",
          description: "Analyzing claims against medical knowledge base",
          icon: <Brain className="h-6 w-6" />,
        }
      case "verifying":
        return {
          title: "Source Verification",
          description: "Cross-referencing with trusted medical sources",
          icon: <Search className="h-6 w-6" />,
        }
      case "complete":
        return {
          title: "Analysis Complete",
          description: "Verification results are ready",
          icon: <CheckCircle className="h-6 w-6" />,
        }
    }
  }

  const getResultInfo = (resultType: VerificationResult) => {
    switch (resultType) {
      case "true":
        return {
          title: "Verified as Credible",
          description: "This health information appears to be supported by credible sources",
          icon: <CheckCircle className="h-8 w-8 text-green-600" />,
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          textColor: "text-green-800",
        }
      case "partially-true":
        return {
          title: "Partially Credible",
          description: "Some claims appear credible, but others need verification or context",
          icon: <AlertTriangle className="h-8 w-8 text-yellow-600" />,
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          textColor: "text-yellow-800",
        }
      case "false":
        return {
          title: "Questionable Content",
          description: "This content contains claims that may not be supported by credible sources",
          icon: <XCircle className="h-8 w-8 text-red-600" />,
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          textColor: "text-red-800",
        }
      default:
        return null
    }
  }

  const getDetailedFindings = (data?: SubmissionData) => {
    const dataToUse = data || submissionData
    if (!dataToUse) return null

    if (dataToUse.type === "text") {
      const analysis = dataToUse.analysis
      const score = analysis.credibilityScore

      return {
        score,
        findings:
          score >= 70
            ? [
                "Content contains health-related information with credible language patterns",
                "No obvious misinformation flags detected",
                "Language suggests evidence-based approach",
                "Appropriate length and context provided",
              ]
            : score >= 40
              ? [
                  "Mixed credibility indicators found",
                  "Some health claims may need additional verification",
                  "Content length and context could be improved",
                  "Recommend consulting healthcare professionals",
                ]
              : [
                  "Multiple misinformation warning signs detected",
                  "Content may contain unsubstantiated health claims",
                  "Language patterns suggest potential misinformation",
                  "Strong recommendation to verify with medical professionals",
                ],
        contentType: analysis.contentType,
        riskLevel: analysis.riskLevel,
      }
    } else if (dataToUse.type === "url") {
      const analysis = dataToUse.analysis
      const trustScore = analysis.trustScore

      return {
        score: trustScore,
        findings:
          trustScore >= 70
            ? [
                `Source domain (${analysis.domain}) appears to be from a trusted source`,
                "Domain has good reputation for health information",
                "URL structure suggests legitimate content",
                "Recommended to verify specific claims within the content",
              ]
            : trustScore >= 40
              ? [
                  `Source domain (${analysis.domain}) has neutral reputation`,
                  "Content should be cross-referenced with trusted sources",
                  "Domain may contain both accurate and inaccurate information",
                  "Exercise caution and verify claims independently",
                ]
              : [
                  `Source domain (${analysis.domain}) may have credibility concerns`,
                  "Domain has been associated with questionable health information",
                  "High recommendation to verify claims with trusted medical sources",
                  "Consider consulting healthcare professionals before acting on information",
                ],
        sourceType: analysis.sourceType,
        domain: analysis.domain,
      }
    } else if (dataToUse.type === "file") {
      const analysis = dataToUse.analysis
      const score = analysis.credibilityScore || 50

      return {
        score,
        findings: [
          `File type: ${analysis.type} (${analysis.format})`,
          `Processing complexity: ${analysis.processingComplexity}`,
          `File size: ${(analysis.size / 1024 / 1024).toFixed(2)} MB`,
          "File content analysis completed - verify claims with healthcare professionals",
        ],
        fileType: analysis.type,
        processingComplexity: analysis.processingComplexity,
      }
    }

    return null
  }

  const currentStageInfo = getStageInfo(stage)
  const resultInfo = result ? getResultInfo(result) : null
  const detailedFindings = getDetailedFindings()

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
              href="/submit"
              className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>New Analysis</span>
            </NextLink>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Submission Info */}
        {submissionData && (
          <Card className="mb-6 bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                {submissionData.type === "text" && <FileText className="h-5 w-5 text-blue-600" />}
                {submissionData.type === "url" && <Link className="h-5 w-5 text-blue-600" />}
                {submissionData.type === "file" && <Upload className="h-5 w-5 text-blue-600" />}
                <div>
                  <h3 className="font-semibold text-blue-800 capitalize">{submissionData.type} Analysis</h3>
                  <p className="text-sm text-blue-700 truncate max-w-md">
                    {submissionData.type === "text"
                      ? `"${submissionData.content.substring(0, 100)}${submissionData.content.length > 100 ? "..." : ""}"`
                      : submissionData.content}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Analysis Progress */}
        {stage !== "complete" && (
          <Card className="mb-8 shadow-lg">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="animate-spin">
                  <RefreshCw className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle className="text-2xl">AI Analysis in Progress</CardTitle>
              </div>
              <p className="text-gray-600">Our AI is analyzing your health content against trusted medical sources</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-3" />
              </div>

              {/* Current Stage */}
              <Card className="bg-emerald-50 border-emerald-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-emerald-600">{currentStageInfo.icon}</div>
                    <div>
                      <h3 className="font-semibold text-emerald-800">{currentStageInfo.title}</h3>
                      <p className="text-sm text-emerald-700">{currentStageInfo.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Analysis Steps */}
              <div className="grid md:grid-cols-3 gap-4">
                <div
                  className={`p-4 rounded-lg border ${stage === "processing" ? "bg-emerald-50 border-emerald-200" : progress > 25 ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText
                      className={`h-5 w-5 ${stage === "processing" ? "text-emerald-600" : progress > 25 ? "text-green-600" : "text-gray-400"}`}
                    />
                    <span className="font-semibold text-sm">Processing</span>
                  </div>
                  <p className="text-xs text-gray-600">Extracting health claims</p>
                </div>
                <div
                  className={`p-4 rounded-lg border ${stage === "analyzing" ? "bg-emerald-50 border-emerald-200" : progress > 60 ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Brain
                      className={`h-5 w-5 ${stage === "analyzing" ? "text-emerald-600" : progress > 60 ? "text-green-600" : "text-gray-400"}`}
                    />
                    <span className="font-semibold text-sm">AI Analysis</span>
                  </div>
                  <p className="text-xs text-gray-600">Fact-checking claims</p>
                </div>
                <div
                  className={`p-4 rounded-lg border ${stage === "verifying" ? "bg-emerald-50 border-emerald-200" : progress > 90 ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Search
                      className={`h-5 w-5 ${stage === "verifying" ? "text-emerald-600" : progress > 90 ? "text-green-600" : "text-gray-400"}`}
                    />
                    <span className="font-semibold text-sm">Verification</span>
                  </div>
                  <p className="text-xs text-gray-600">Cross-referencing sources</p>
                </div>
              </div>

              {/* Analysis Time */}
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>Analysis time: {analysisTime}s</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Display */}
        {stage === "complete" && result && resultInfo && detailedFindings && (
          <div className="space-y-8">
            {/* Main Result */}
            <Card className={`shadow-lg ${resultInfo.bgColor} ${resultInfo.borderColor} border-2`}>
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-4">{resultInfo.icon}</div>
                <CardTitle className={`text-3xl ${resultInfo.textColor}`}>{resultInfo.title}</CardTitle>
                <p className={`text-lg ${resultInfo.textColor} opacity-80`}>{resultInfo.description}</p>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <Badge className={`${resultInfo.bgColor} ${resultInfo.textColor} text-sm px-4 py-2`}>
                    Analysis completed in {analysisTime} seconds
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Analysis */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Detailed Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Key Findings */}
                <div className={`${resultInfo.bgColor} border ${resultInfo.borderColor} rounded-lg p-4`}>
                  <h3 className={`font-semibold ${resultInfo.textColor} mb-2`}>Key Findings</h3>
                  <ul className={`text-sm ${resultInfo.textColor} space-y-1`}>
                    {detailedFindings.findings.map((finding, index) => (
                      <li key={index}>• {finding}</li>
                    ))}
                  </ul>
                </div>

                {/* Confidence Score */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Analysis Confidence</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Confidence Level</span>
                      <span>{detailedFindings.score}%</span>
                    </div>
                    <Progress value={detailedFindings.score} className="h-2" />
                    <p className="text-xs text-gray-600">Based on content analysis and source verification patterns</p>
                  </div>
                </div>

                {/* Content Details */}
                {submissionData && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 mb-3">Content Analysis Details</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-blue-700">Content Type:</span>
                        <p className="text-blue-600 capitalize">{submissionData.type}</p>
                      </div>
                      {submissionData.type === "text" && (
                        <>
                          <div>
                            <span className="font-medium text-blue-700">Content Category:</span>
                            <p className="text-blue-600">{detailedFindings.contentType}</p>
                          </div>
                          <div>
                            <span className="font-medium text-blue-700">Risk Level:</span>
                            <p className="text-blue-600 capitalize">{detailedFindings.riskLevel}</p>
                          </div>
                        </>
                      )}
                      {submissionData.type === "url" && (
                        <>
                          <div>
                            <span className="font-medium text-blue-700">Source Type:</span>
                            <p className="text-blue-600 capitalize">{detailedFindings.sourceType}</p>
                          </div>
                          <div>
                            <span className="font-medium text-blue-700">Domain:</span>
                            <p className="text-blue-600">{detailedFindings.domain}</p>
                          </div>
                        </>
                      )}
                      {submissionData.type === "file" && (
                        <>
                          <div>
                            <span className="font-medium text-blue-700">File Type:</span>
                            <p className="text-blue-600 capitalize">{detailedFindings.fileType}</p>
                          </div>
                          <div>
                            <span className="font-medium text-blue-700">Processing:</span>
                            <p className="text-blue-600 capitalize">
                              {detailedFindings.processingComplexity} complexity
                            </p>
                          </div>
                        </>
                      )}
                      <div>
                        <span className="font-medium text-blue-700">Analyzed:</span>
                        <p className="text-blue-600">{new Date(submissionData.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {resourceRecommendations && (
              <Card className="shadow-lg border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-800 flex items-center gap-2">
                    <AlertTriangle className="h-6 w-6" />
                    Recommended Trusted Alternatives
                  </CardTitle>
                  <p className="text-orange-700">
                    {result === "partially-true"
                      ? "Since this content has mixed credibility, here are trusted sources for verification:"
                      : "Since this content has credibility concerns, here are trusted alternatives:"}
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Trusted Medical Sources */}
                  <div>
                    <h3 className="font-semibold text-orange-800 mb-3">Trusted Medical Sources</h3>
                    <div className="grid gap-3">
                      {resourceRecommendations.trustedSources.map((source, index) => (
                        <div key={index} className="bg-white border border-orange-200 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{source.name}</h4>
                              <p className="text-sm text-gray-600 mt-1">{source.description}</p>
                            </div>
                            <Button
                              size="sm"
                              className="ml-3 bg-emerald-600 hover:bg-emerald-700"
                              onClick={() => window.open(source.url, "_blank")}
                            >
                              Visit
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Alternative Search Suggestion */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 mb-2">Fact-Check This Topic</h3>
                    <p className="text-sm text-blue-700 mb-3">
                      Search for fact-checks and reliable information about this health topic:
                    </p>
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() =>
                        window.open(
                          `https://www.google.com/search?q=${encodeURIComponent(resourceRecommendations.searchQuery)}`,
                          "_blank",
                        )
                      }
                    >
                      Search Trusted Sources
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
                <NextLink href="/sources">View Verification Sources</NextLink>
              </Button>
              <Button variant="outline" asChild>
                <NextLink href="/submit">Analyze New Content</NextLink>
              </Button>
              <Button variant="outline" asChild>
                <NextLink href="/dashboard">Save to Dashboard</NextLink>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
