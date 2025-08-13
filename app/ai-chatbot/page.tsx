"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, Mic, MicOff, Upload, Bot, User, ExternalLink, HelpCircle } from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  sources?: Array<{ title: string; url: string; organization: string }>
  confidence?: number
}

export default function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm MediScan's AI health assistant. I can help you verify health information, debunk medical myths, and provide evidence-based answers. Try asking about common health myths or click an example below!",
      timestamp: new Date(),
      confidence: 100,
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const generateHealthResponse = (
    query: string,
  ): { content: string; sources: Array<{ title: string; url: string; organization: string }>; confidence: number } => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("vaccine") && (lowerQuery.includes("autism") || lowerQuery.includes("cause"))) {
      return {
        content:
          "This is FALSE. Extensive scientific research has definitively shown that vaccines do not cause autism. The original study claiming this link was fraudulent and has been retracted. Multiple large-scale studies involving millions of children have found no connection between vaccines and autism.",
        sources: [
          { title: "Vaccines and Autism: What You Should Know", url: "#", organization: "CDC" },
          { title: "MMR Vaccine and Autism", url: "#", organization: "WHO" },
          { title: "Autism and Vaccines Research", url: "#", organization: "American Academy of Pediatrics" },
        ],
        confidence: 98,
      }
    } else if (lowerQuery.includes("msg") || lowerQuery.includes("monosodium glutamate")) {
      return {
        content:
          "MSG is SAFE for most people. The FDA classifies MSG as 'generally recognized as safe.' While some people report sensitivity, scientific studies have not found consistent evidence of adverse reactions in controlled settings. MSG occurs naturally in many foods like tomatoes and cheese.",
        sources: [
          { title: "MSG: Examining the Myths", url: "#", organization: "FDA" },
          { title: "Monosodium Glutamate Safety", url: "#", organization: "Mayo Clinic" },
          { title: "MSG Research Review", url: "#", organization: "International Food Information Council" },
        ],
        confidence: 95,
      }
    } else if (lowerQuery.includes("detox") || lowerQuery.includes("cleanse")) {
      return {
        content:
          "Most commercial detox products are UNNECESSARY. Your liver and kidneys naturally detoxify your body very effectively. There's limited scientific evidence supporting commercial detox diets or products. A healthy diet, adequate water intake, and regular exercise support your body's natural detoxification processes.",
        sources: [
          { title: "The Truth About Detox Diets", url: "#", organization: "Harvard Health" },
          { title: "Detoxification: What You Need to Know", url: "#", organization: "NIH" },
          { title: "Liver Detoxification", url: "#", organization: "American Liver Foundation" },
        ],
        confidence: 92,
      }
    } else if (lowerQuery.includes("microwave") && lowerQuery.includes("radiation")) {
      return {
        content:
          "Microwave ovens are SAFE when used properly. They use non-ionizing radiation, which doesn't have enough energy to damage DNA. The radiation is contained within the oven, and properly functioning microwaves pose no health risk. They don't make food radioactive or significantly reduce nutritional value.",
        sources: [
          { title: "Microwave Oven Safety", url: "#", organization: "FDA" },
          { title: "Radiation from Microwave Ovens", url: "#", organization: "WHO" },
          {
            title: "Microwave Cooking and Nutrition",
            url: "#",
            organization: "Harvard T.H. Chan School of Public Health",
          },
        ],
        confidence: 96,
      }
    } else if (lowerQuery.includes("gluten") && !lowerQuery.includes("celiac")) {
      return {
        content:
          "Gluten is SAFE for most people. Only about 1% of the population has celiac disease, and a small percentage may have non-celiac gluten sensitivity. For the majority of people, gluten-containing foods like whole grains provide important nutrients and fiber. Avoiding gluten unnecessarily may lead to nutritional deficiencies.",
        sources: [
          { title: "Gluten-Free Diet: What You Need to Know", url: "#", organization: "Mayo Clinic" },
          { title: "Celiac Disease and Gluten Sensitivity", url: "#", organization: "NIH" },
          { title: "The Gluten-Free Trend", url: "#", organization: "Harvard Health" },
        ],
        confidence: 94,
      }
    } else if (lowerQuery.includes("sugar") && lowerQuery.includes("hyperactive")) {
      return {
        content:
          "This is largely a MYTH. Multiple controlled studies have found no consistent link between sugar consumption and hyperactivity in children. The belief may persist due to confirmation bias and the exciting environments where sugary treats are often consumed (parties, celebrations).",
        sources: [
          { title: "Sugar and Hyperactivity in Children", url: "#", organization: "American Academy of Pediatrics" },
          { title: "Diet and ADHD: The Research", url: "#", organization: "CDC" },
          { title: "Sugar Myths Debunked", url: "#", organization: "Harvard Health" },
        ],
        confidence: 91,
      }
    } else if (lowerQuery.includes("organic") && lowerQuery.includes("pesticide")) {
      return {
        content:
          "Both organic and conventional foods can be SAFE when properly washed. While organic foods have lower pesticide residues, conventional produce pesticide levels are typically well below safety limits set by regulatory agencies. The health benefits of eating fruits and vegetables far outweigh pesticide concerns for both organic and conventional produce.",
        sources: [
          { title: "Organic vs. Conventional Foods", url: "#", organization: "Mayo Clinic" },
          { title: "Pesticide Residues in Food", url: "#", organization: "FDA" },
          { title: "Dirty Dozen and Clean Fifteen", url: "#", organization: "Environmental Working Group" },
        ],
        confidence: 89,
      }
    } else if (lowerQuery.includes("cracking") && lowerQuery.includes("knuckle")) {
      return {
        content:
          "Knuckle cracking is generally HARMLESS. The popping sound comes from gas bubbles in joint fluid, not bones breaking. Studies have not found increased risk of arthritis from habitual knuckle cracking, though it may cause temporary joint swelling or reduced grip strength in some people.",
        sources: [
          { title: "Knuckle Cracking and Arthritis", url: "#", organization: "Harvard Health" },
          { title: "Joint Popping: What It Means", url: "#", organization: "Mayo Clinic" },
          { title: "Arthritis Myths and Facts", url: "#", organization: "Arthritis Foundation" },
        ],
        confidence: 87,
      }
    } else {
      return {
        content:
          "I'd be happy to help verify that health information! Could you provide more specific details about the health claim or myth you'd like me to address? I can help fact-check medical information, debunk common health myths, or provide evidence-based answers to health questions.",
        sources: [
          { title: "Health Information Guidelines", url: "#", organization: "NIH" },
          { title: "Evaluating Health Information", url: "#", organization: "MedlinePlus" },
          { title: "Evidence-Based Medicine", url: "#", organization: "Cochrane Library" },
        ],
        confidence: 85,
      }
    }
  }

  const exampleQuestions = [
    "Do vaccines cause autism?",
    "Is MSG dangerous to eat?",
    "Do detox diets actually work?",
    "Are microwave ovens harmful due to radiation?",
    "Is gluten bad for everyone?",
    "Does sugar make children hyperactive?",
    "Are organic foods always healthier?",
    "Does cracking knuckles cause arthritis?",
  ]

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !selectedFile) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: selectedFile ? `[File: ${selectedFile.name}] ${inputMessage}` : inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentQuery = inputMessage
    setInputMessage("")
    setSelectedFile(null)
    setIsProcessing(true)

    setTimeout(() => {
      const response = generateHealthResponse(currentQuery)
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: response.content,
        timestamp: new Date(),
        sources: response.sources,
        confidence: response.confidence,
      }
      setMessages((prev) => [...prev, botResponse])
      setIsProcessing(false)
    }, 2000)
  }

  const handleExampleClick = (question: string) => {
    setInputMessage(question)
  }

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording)
    // Voice recording logic would go here
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <MessageCircle className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Myth-Busting Chatbot</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conversational AI that answers health questions with verified sources in real time
          </p>
        </div>

        <Card className="mb-6 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-emerald-600" />
              Try These Example Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {exampleQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleExampleClick(question)}
                  className="text-left justify-start h-auto py-2 px-3 text-sm"
                >
                  {question}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-emerald-600" />
              Health Information Assistant
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-lg">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === "user" ? "bg-emerald-600 text-white" : "bg-white border shadow-sm"
                    }`}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      {message.type === "bot" ? (
                        <Bot className="h-4 w-4 text-emerald-600 mt-0.5" />
                      ) : (
                        <User className="h-4 w-4 text-white mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm">{message.content}</p>
                        {message.confidence && (
                          <Badge variant="outline" className="mt-2 text-xs">
                            {message.confidence}% confidence
                          </Badge>
                        )}
                      </div>
                    </div>

                    {message.sources && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs font-semibold text-gray-600 mb-2">Verified Sources:</p>
                        <div className="space-y-1">
                          {message.sources.map((source, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs">
                              <ExternalLink className="h-3 w-3" />
                              <span className="font-medium">{source.title}</span>
                              <span className="text-gray-500">- {source.organization}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-white border shadow-sm p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4 text-emerald-600" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* File Upload Preview */}
            {selectedFile && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                <p className="text-emerald-800 text-sm">
                  📎 Selected file: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              </div>
            )}

            {/* Input Area */}
            <div className="flex gap-2">
              <div className="flex-1 flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about health myths, medical claims, or request fact-checking..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />

                {/* Voice Input */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleVoiceToggle}
                  className={isRecording ? "bg-red-100 border-red-300" : ""}
                >
                  {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>

                {/* File Upload */}
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.mp3,.mp4"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button onClick={handleSendMessage} className="bg-emerald-600 hover:bg-emerald-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {/* Features */}
            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4 text-center">
                  <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-blue-800">Real-time Verification</h3>
                  <p className="text-xs text-blue-700">Instant fact-checking with sources</p>
                </CardContent>
              </Card>
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-4 text-center">
                  <Mic className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-purple-800">Voice & Audio</h3>
                  <p className="text-xs text-purple-700">Speech-to-text processing</p>
                </CardContent>
              </Card>
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4 text-center">
                  <Upload className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-800">Multi-format Input</h3>
                  <p className="text-xs text-green-700">Text, audio, video, images</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
