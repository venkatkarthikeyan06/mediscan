"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Search,
  Calendar,
  TrendingUp,
  FileText,
  ExternalLink,
  Filter,
  Download,
  Plus,
} from "lucide-react"
import NextLink from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

interface AnalysisRecord {
  id: string
  title: string
  type: "text" | "url" | "file"
  result: "true" | "partially-true" | "false"
  confidence: number
  analyzedAt: string
  content: string
  sources: number
  category: string
}

const mockAnalyses: AnalysisRecord[] = [
  {
    id: "1",
    title: "COVID-19 Vaccine Safety Claims",
    type: "text",
    result: "true",
    confidence: 94,
    analyzedAt: "2024-01-15T10:30:00Z",
    content: "mRNA vaccines have been proven safe and effective through extensive clinical trials...",
    sources: 8,
    category: "Vaccines",
  },
  {
    id: "2",
    title: "Natural Immunity vs Vaccination Article",
    type: "url",
    result: "partially-true",
    confidence: 78,
    analyzedAt: "2024-01-14T15:45:00Z",
    content: "https://example.com/natural-immunity-article",
    sources: 12,
    category: "Immunity",
  },
  {
    id: "3",
    title: "Vitamin D and COVID Prevention Study",
    type: "file",
    result: "false",
    confidence: 89,
    analyzedAt: "2024-01-13T09:15:00Z",
    content: "research-paper-vitamin-d.pdf",
    sources: 6,
    category: "Supplements",
  },
  {
    id: "4",
    title: "Mask Effectiveness Social Media Post",
    type: "text",
    result: "true",
    confidence: 91,
    analyzedAt: "2024-01-12T14:20:00Z",
    content: "Masks reduce transmission of respiratory droplets by up to 80%...",
    sources: 15,
    category: "Prevention",
  },
  {
    id: "5",
    title: "Hydroxychloroquine Treatment Claims",
    type: "url",
    result: "false",
    confidence: 96,
    analyzedAt: "2024-01-11T11:00:00Z",
    content: "https://example.com/hydroxychloroquine-study",
    sources: 20,
    category: "Treatments",
  },
]

const getResultInfo = (result: AnalysisRecord["result"]) => {
  switch (result) {
    case "true":
      return {
        icon: <CheckCircle className="h-5 w-5 text-green-600" />,
        label: "Verified True",
        color: "bg-green-100 text-green-800",
      }
    case "partially-true":
      return {
        icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
        label: "Partially True",
        color: "bg-yellow-100 text-yellow-800",
      }
    case "false":
      return {
        icon: <XCircle className="h-5 w-5 text-red-600" />,
        label: "Verified False",
        color: "bg-red-100 text-red-800",
      }
  }
}

const getTypeIcon = (type: AnalysisRecord["type"]) => {
  switch (type) {
    case "text":
      return <FileText className="h-4 w-4" />
    case "url":
      return <ExternalLink className="h-4 w-4" />
    case "file":
      return <Download className="h-4 w-4" />
  }
}

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const filteredAnalyses = mockAnalyses.filter((analysis) => {
    const matchesSearch =
      analysis.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      analysis.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = selectedFilter === "all" || analysis.result === selectedFilter
    return matchesSearch && matchesFilter
  })

  const stats = {
    total: mockAnalyses.length,
    verified: mockAnalyses.filter((a) => a.result === "true").length,
    partiallyTrue: mockAnalyses.filter((a) => a.result === "partially-true").length,
    false: mockAnalyses.filter((a) => a.result === "false").length,
    avgConfidence: Math.round(mockAnalyses.reduce((acc, a) => acc + a.confidence, 0) / mockAnalyses.length),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
      {/* Header */}
      <header className="border-b border-emerald-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <NextLink href="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-emerald-600" />
              <span className="text-xl font-bold text-gray-900">MediScan</span>
            </NextLink>
            <nav className="hidden md:flex space-x-6">
              <NextLink href="/submit" className="text-gray-600 hover:text-emerald-600 transition-colors">
                New Analysis
              </NextLink>
              <NextLink href="/sources" className="text-gray-600 hover:text-emerald-600 transition-colors">
                Sources
              </NextLink>
              <span className="text-emerald-600 font-semibold">Dashboard</span>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user.name || user.email.split("@")[0]}!
            </h1>
            <p className="text-gray-600">Track your health information verification history and insights</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 mt-4 md:mt-0" asChild>
            <NextLink href="/submit">
              <Plus className="h-4 w-4 mr-2" />
              New Analysis
            </NextLink>
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Analyses</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">{stats.verified}</div>
              <div className="text-sm text-gray-600">Verified True</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-1">{stats.partiallyTrue}</div>
              <div className="text-sm text-gray-600">Partially True</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600 mb-1">{stats.false}</div>
              <div className="text-sm text-gray-600">Verified False</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600 mb-1">{stats.avgConfidence}%</div>
              <div className="text-sm text-gray-600">Avg Confidence</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search analyses by title or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">All Results</option>
                  <option value="true">Verified True</option>
                  <option value="partially-true">Partially True</option>
                  <option value="false">Verified False</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analysis History */}
        <Tabs defaultValue="recent" className="space-y-6">
          <TabsList>
            <TabsTrigger value="recent">Recent Analyses</TabsTrigger>
            <TabsTrigger value="categories">By Category</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="space-y-4">
            {filteredAnalyses.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <Search className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No analyses found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredAnalyses.map((analysis) => {
                const resultInfo = getResultInfo(analysis.result)
                return (
                  <Card key={analysis.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="text-gray-400">{getTypeIcon(analysis.type)}</div>
                            <h3 className="text-lg font-semibold text-gray-900">{analysis.title}</h3>
                            <Badge className={resultInfo.color}>
                              {resultInfo.icon}
                              <span className="ml-1">{resultInfo.label}</span>
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-3 line-clamp-2">{analysis.content}</p>
                          <div className="flex items-center space-x-6 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(analysis.analyzedAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <TrendingUp className="h-4 w-4" />
                              <span>{analysis.confidence}% confidence</span>
                            </div>
                            <div>
                              <span>{analysis.sources} sources</span>
                            </div>
                            <Badge variant="outline">{analysis.category}</Badge>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <Button variant="outline" size="sm" asChild>
                            <NextLink href="/sources">View Sources</NextLink>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <NextLink href="/analysis">Re-analyze</NextLink>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {["Vaccines", "Immunity", "Supplements", "Prevention", "Treatments"].map((category) => {
                const categoryAnalyses = mockAnalyses.filter((a) => a.category === category)
                const trueCount = categoryAnalyses.filter((a) => a.result === "true").length
                const falseCount = categoryAnalyses.filter((a) => a.result === "false").length
                const partialCount = categoryAnalyses.filter((a) => a.result === "partially-true").length

                return (
                  <Card key={category}>
                    <CardHeader>
                      <CardTitle className="text-lg">{category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Total Analyses</span>
                          <span className="font-semibold">{categoryAnalyses.length}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-green-600">Verified True</span>
                            <span>{trueCount}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-yellow-600">Partially True</span>
                            <span>{partialCount}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-red-600">Verified False</span>
                            <span>{falseCount}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Analysis Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Most Analyzed Category</span>
                      <Badge>Vaccines</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Highest Accuracy Rate</span>
                      <span className="font-semibold text-emerald-600">94%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Average Sources per Analysis</span>
                      <span className="font-semibold">12.2</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Analyses This Week</span>
                      <span className="font-semibold">3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Most Common Result</span>
                      <Badge className="bg-green-100 text-green-800">Verified True</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Avg Analysis Time</span>
                      <span className="font-semibold">12s</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
