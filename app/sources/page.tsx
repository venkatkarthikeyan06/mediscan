import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, ExternalLink, ArrowLeft, CheckCircle, Star, Calendar, BookOpen, Globe, Award } from "lucide-react"
import NextLink from "next/link"

interface Source {
  id: string
  title: string
  organization: string
  type: "guideline" | "research" | "database" | "report"
  url: string
  publishedDate: string
  relevanceScore: number
  summary: string
  logo?: string
}

const sources: Source[] = [
  {
    id: "1",
    title: "COVID-19 Vaccine Safety and Effectiveness",
    organization: "World Health Organization (WHO)",
    type: "guideline",
    url: "https://www.who.int/news-room/feature-stories/detail/vaccine-efficacy-effectiveness-and-protection",
    publishedDate: "2024-01-15",
    relevanceScore: 98,
    summary:
      "Comprehensive analysis of COVID-19 vaccine safety data from global surveillance systems, confirming high safety profile and effectiveness.",
  },
  {
    id: "2",
    title: "Vaccine Safety Monitoring Systems",
    organization: "Centers for Disease Control and Prevention (CDC)",
    type: "database",
    url: "https://www.cdc.gov/vaccinesafety/ensuringsafety/monitoring/index.html",
    publishedDate: "2024-02-08",
    relevanceScore: 95,
    summary: "Real-time monitoring data from VAERS and VSD systems showing continuous safety surveillance of vaccines.",
  },
  {
    id: "3",
    title: "mRNA Vaccine Mechanisms and Safety Profile",
    organization: "PubMed - Nature Medicine",
    type: "research",
    url: "https://pubmed.ncbi.nlm.nih.gov/example-study",
    publishedDate: "2023-11-22",
    relevanceScore: 92,
    summary:
      "Peer-reviewed study examining the molecular mechanisms of mRNA vaccines and their safety profile in large population studies.",
  },
  {
    id: "4",
    title: "Global Vaccine Safety Initiative Report",
    organization: "FDA - U.S. Food and Drug Administration",
    type: "report",
    url: "https://www.fda.gov/vaccines-blood-biologics/safety-availability-biologics",
    publishedDate: "2024-01-30",
    relevanceScore: 89,
    summary:
      "Annual safety report analyzing adverse events and safety signals from vaccine administration across multiple countries.",
  },
  {
    id: "5",
    title: "Immunization Safety Review Committee",
    organization: "Institute of Medicine (IOM)",
    type: "guideline",
    url: "https://www.nationalacademies.org/our-work/immunization-safety-review",
    publishedDate: "2023-12-10",
    relevanceScore: 87,
    summary: "Independent review of vaccine safety evidence by leading medical experts and epidemiologists.",
  },
  {
    id: "6",
    title: "Cochrane Systematic Review: Vaccine Safety",
    organization: "Cochrane Library",
    type: "research",
    url: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD004407.pub5/full",
    publishedDate: "2023-09-15",
    relevanceScore: 94,
    summary:
      "Meta-analysis of randomized controlled trials examining vaccine safety across different populations and age groups.",
  },
]

const getTypeInfo = (type: Source["type"]) => {
  switch (type) {
    case "guideline":
      return { icon: <BookOpen className="h-4 w-4" />, color: "bg-blue-100 text-blue-800", label: "Guideline" }
    case "research":
      return { icon: <Star className="h-4 w-4" />, color: "bg-purple-100 text-purple-800", label: "Research" }
    case "database":
      return { icon: <Globe className="h-4 w-4" />, color: "bg-green-100 text-green-800", label: "Database" }
    case "report":
      return { icon: <Award className="h-4 w-4" />, color: "bg-orange-100 text-orange-800", label: "Report" }
  }
}

const getOrganizationLogo = (organization: string) => {
  if (organization.includes("WHO")) return "🏥"
  if (organization.includes("CDC")) return "🏛️"
  if (organization.includes("PubMed") || organization.includes("Nature")) return "📚"
  if (organization.includes("FDA")) return "⚕️"
  if (organization.includes("Institute")) return "🎓"
  if (organization.includes("Cochrane")) return "🔬"
  return "📋"
}

export default function SourcesPage() {
  const sortedSources = sources.sort((a, b) => b.relevanceScore - a.relevanceScore)

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
              href="/analysis"
              className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Analysis</span>
            </NextLink>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Verification Sources</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Trusted Medical Sources</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our AI analysis is backed by references from the world's most trusted medical organizations and
            peer-reviewed research. All sources are verified and up-to-date.
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-emerald-600 mb-2">{sources.length}</div>
              <div className="text-sm text-gray-600">Total Sources</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-emerald-600 mb-2">
                {Math.round(sources.reduce((acc, s) => acc + s.relevanceScore, 0) / sources.length)}%
              </div>
              <div className="text-sm text-gray-600">Avg. Relevance</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-emerald-600 mb-2">
                {new Set(sources.map((s) => s.organization)).size}
              </div>
              <div className="text-sm text-gray-600">Organizations</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-emerald-600 mb-2">2024</div>
              <div className="text-sm text-gray-600">Latest Update</div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="secondary" className="cursor-pointer hover:bg-emerald-100">
              All Sources
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-emerald-50">
              Guidelines
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-emerald-50">
              Research
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-emerald-50">
              Databases
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-emerald-50">
              Reports
            </Badge>
          </div>
        </div>

        {/* Sources List */}
        <div className="space-y-6">
          {sortedSources.map((source) => {
            const typeInfo = getTypeInfo(source.type)
            return (
              <Card key={source.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{getOrganizationLogo(source.organization)}</span>
                        <div>
                          <CardTitle className="text-xl text-gray-900 leading-tight">{source.title}</CardTitle>
                          <p className="text-sm text-gray-600 mt-1">{source.organization}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 mt-3">
                        <Badge className={typeInfo.color}>
                          {typeInfo.icon}
                          <span className="ml-1">{typeInfo.label}</span>
                        </Badge>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(source.publishedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <CheckCircle className="h-4 w-4 text-emerald-600" />
                          <span>{source.relevanceScore}% relevant</span>
                        </div>
                      </div>
                    </div>
                    <Button asChild className="bg-emerald-600 hover:bg-emerald-700 ml-4">
                      <a href={source.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Source
                      </a>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{source.summary}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Trusted Organizations */}
        <Card className="mt-12 bg-gray-50">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Our Trusted Partners</CardTitle>
            <p className="text-center text-gray-600">
              We source information from the world's leading health organizations
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg">
                <span className="text-2xl">🏥</span>
                <div>
                  <h3 className="font-semibold">World Health Organization</h3>
                  <p className="text-sm text-gray-600">Global health authority</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg">
                <span className="text-2xl">🏛️</span>
                <div>
                  <h3 className="font-semibold">CDC</h3>
                  <p className="text-sm text-gray-600">Disease control & prevention</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg">
                <span className="text-2xl">📚</span>
                <div>
                  <h3 className="font-semibold">PubMed</h3>
                  <p className="text-sm text-gray-600">Medical literature database</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg">
                <span className="text-2xl">⚕️</span>
                <div>
                  <h3 className="font-semibold">FDA</h3>
                  <p className="text-sm text-gray-600">Food & drug administration</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg">
                <span className="text-2xl">🔬</span>
                <div>
                  <h3 className="font-semibold">Cochrane</h3>
                  <p className="text-sm text-gray-600">Systematic reviews</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg">
                <span className="text-2xl">🎓</span>
                <div>
                  <h3 className="font-semibold">Medical Institutes</h3>
                  <p className="text-sm text-gray-600">Research institutions</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quality Standards */}
        <Card className="mt-8 border-emerald-200 bg-emerald-50">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Our Quality Standards
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-emerald-700">
              <div>
                <h4 className="font-semibold mb-2">Source Verification:</h4>
                <ul className="space-y-1">
                  <li>• Only peer-reviewed publications</li>
                  <li>• Government health agencies</li>
                  <li>• Established medical organizations</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Content Standards:</h4>
                <ul className="space-y-1">
                  <li>• Published within last 5 years</li>
                  <li>• Minimum relevance score of 80%</li>
                  <li>• Regular updates and reviews</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
            <NextLink href="/analysis">Back to Analysis</NextLink>
          </Button>
          <Button variant="outline" asChild>
            <NextLink href="/submit">Analyze New Content</NextLink>
          </Button>
          <Button variant="outline" asChild>
            <NextLink href="/dashboard">View Dashboard</NextLink>
          </Button>
        </div>
      </div>
    </div>
  )
}
