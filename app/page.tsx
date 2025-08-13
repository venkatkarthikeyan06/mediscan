import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, CheckCircle, AlertTriangle, XCircle, Users, Database, Zap } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
              AI-Powered Health Verification
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Empowering You Against <span className="text-emerald-600">Health Misinformation</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Leverage AI to discern fact from fiction in health information. Get instant analysis of articles, social
              media posts, and health claims with references from trusted medical sources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg" asChild>
                <Link href="/submit">Submit Content for Analysis</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-3 text-lg bg-transparent"
                asChild
              >
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Health Misinformation Crisis</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              False health information spreads faster than facts, putting lives at risk. Our AI-powered system helps you
              verify health claims instantly.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">73% of People</h3>
                <p className="text-gray-600">encounter health misinformation online weekly</p>
              </CardContent>
            </Card>
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-6 text-center">
                <XCircle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">6x Faster</h3>
                <p className="text-gray-600">False information spreads compared to accurate health facts</p>
              </CardContent>
            </Card>
            <Card className="border-emerald-200 bg-emerald-50">
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Solution</h3>
                <p className="text-gray-600">Instant AI verification with trusted medical sources</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How MediScan Works</h2>{" "}
            {/* Changed HealthVerify to MediScan */}
            <p className="text-lg text-gray-600">Simple, fast, and reliable health information verification</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Submit Content</h3>
              <p className="text-gray-600">
                Paste text, upload files, or share links to articles, social media posts, or videos
              </p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Analysis</h3>
              <p className="text-gray-600">Our AI analyzes claims against trusted medical databases and research</p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Results</h3>
              <p className="text-gray-600">Receive clear verification with sources from WHO, CDC, and PubMed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-lg text-gray-600">Everything you need to verify health information</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Zap className="h-10 w-10 text-emerald-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Analysis</h3>
                <p className="text-gray-600">Get verification results in seconds, not hours</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Database className="h-10 w-10 text-emerald-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Trusted Sources</h3>
                <p className="text-gray-600">References from WHO, CDC, PubMed, and peer-reviewed journals</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Users className="h-10 w-10 text-emerald-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Multiple Formats</h3>
                <p className="text-gray-600">Analyze text, articles, social media posts, and video content</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Fight Health Misinformation?</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust MediScan to separate health facts from fiction{" "}
            {/* Changed HealthVerify to MediScan */}
          </p>
          <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3 text-lg" asChild>
            <Link href="/submit">Start Verifying Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-emerald-400" />
                <span className="text-lg font-bold">MediScan</span> {/* Changed HealthVerify to MediScan */}
              </div>
              <p className="text-gray-400">Fighting health misinformation with AI-powered verification.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MediScan. All rights reserved.</p> {/* Changed HealthVerify to MediScan */}
          </div>
        </div>
      </footer>
    </div>
  )
}
