"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mic, MicOff, Volume2, VolumeX, RotateCcw, Languages, MessageSquare, Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function VoiceAssistantPage() {
  const [isListening, setIsListening] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("en-US")
  const [conversationHistory, setConversationHistory] = useState<
    Array<{ id: string; question: string; answer: string; timestamp: Date }>
  >([])

  const recognitionRef = useRef<any>(null)
  const synthRef = useRef<any>(null)

  const languages = [
    { code: "en-US", name: "English (US)", voice: "en-US" },
    { code: "es-ES", name: "Spanish", voice: "es-ES" },
    { code: "fr-FR", name: "French", voice: "fr-FR" },
    { code: "de-DE", name: "German", voice: "de-DE" },
    { code: "it-IT", name: "Italian", voice: "it-IT" },
    { code: "pt-BR", name: "Portuguese", voice: "pt-BR" },
    { code: "zh-CN", name: "Chinese", voice: "zh-CN" },
    { code: "ja-JP", name: "Japanese", voice: "ja-JP" },
  ]

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = selectedLanguage

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex
        const transcript = event.results[current][0].transcript
        setTranscript(transcript)

        if (event.results[current].isFinal) {
          processHealthQuery(transcript)
        }
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)
        toast({
          title: "Voice recognition error",
          description: "Please try again or check your microphone permissions.",
          variant: "destructive",
        })
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }

    // Initialize speech synthesis
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (synthRef.current) {
        synthRef.current.cancel()
      }
    }
  }, [selectedLanguage])

  const startListening = () => {
    if (recognitionRef.current) {
      setTranscript("")
      setResponse("")
      setIsListening(true)
      recognitionRef.current.lang = selectedLanguage
      recognitionRef.current.start()

      toast({
        title: "Listening...",
        description: "Speak your health question now.",
      })
    } else {
      toast({
        title: "Voice recognition not supported",
        description: "Please use a supported browser or type your question.",
        variant: "destructive",
      })
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsListening(false)
  }

  const processHealthQuery = async (query: string) => {
    setIsProcessing(true)

    try {
      // Simulate AI processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate health response based on query
      const healthResponse = generateHealthResponse(query)
      setResponse(healthResponse)

      // Add to conversation history
      const newEntry = {
        id: Date.now().toString(),
        question: query,
        answer: healthResponse,
        timestamp: new Date(),
      }
      setConversationHistory((prev) => [newEntry, ...prev.slice(0, 9)]) // Keep last 10

      // Speak the response
      speakResponse(healthResponse)
    } catch (error) {
      toast({
        title: "Processing error",
        description: "Unable to process your health query. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const generateHealthResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    // Symptoms and Common Conditions
    if (lowerQuery.includes("headache") || lowerQuery.includes("head pain")) {
      return "For headaches, try resting in a quiet, dark room, staying hydrated, and applying a cold or warm compress. Over-the-counter pain relievers like acetaminophen or ibuprofen can help. If headaches are severe, frequent, or accompanied by fever, vision changes, or neck stiffness, seek medical attention immediately."
    } else if (lowerQuery.includes("fever") || lowerQuery.includes("temperature")) {
      return "For fever, rest and stay hydrated with water, clear broths, or electrolyte solutions. Use fever reducers like acetaminophen or ibuprofen as directed. Seek medical attention if fever exceeds 103°F (39.4°C), persists for more than 3 days, or is accompanied by severe symptoms like difficulty breathing or persistent vomiting."
    } else if (lowerQuery.includes("cough") || lowerQuery.includes("cold")) {
      return "For cough and cold symptoms, get plenty of rest, drink warm fluids like tea with honey, and use a humidifier. Honey can help soothe throat irritation in adults and children over 1 year. See a doctor if symptoms worsen, persist beyond 10 days, or include high fever, difficulty breathing, or chest pain."
    } else if (lowerQuery.includes("sore throat") || lowerQuery.includes("throat pain")) {
      return "For sore throat, gargle with warm salt water, drink warm liquids, and use throat lozenges. Honey and warm tea can provide relief. Avoid smoking and irritants. See a healthcare provider if you have severe pain, difficulty swallowing, high fever, or white patches on your throat."
    } else if (lowerQuery.includes("nausea") || lowerQuery.includes("vomiting")) {
      return "For nausea, try sipping clear fluids, eating bland foods like crackers or toast, and avoiding strong odors. Ginger tea or ginger supplements may help. Rest and avoid solid foods until nausea subsides. Seek medical care if vomiting persists, you show signs of dehydration, or have severe abdominal pain."
    } else if (lowerQuery.includes("diarrhea") || lowerQuery.includes("stomach")) {
      return "For diarrhea, stay hydrated with water, clear broths, or oral rehydration solutions. Eat bland foods like bananas, rice, applesauce, and toast (BRAT diet). Avoid dairy, caffeine, and fatty foods. See a doctor if diarrhea persists more than 2 days, you have signs of dehydration, or experience severe abdominal pain or blood in stool."
    } else if (lowerQuery.includes("constipation")) {
      return "For constipation, increase fiber intake with fruits, vegetables, and whole grains. Drink plenty of water and stay physically active. Prunes and prune juice can be particularly helpful. If constipation persists for more than a few days or is accompanied by severe pain, consult a healthcare provider."
    } else if (lowerQuery.includes("insomnia") || lowerQuery.includes("sleep")) {
      return "For better sleep, maintain a regular sleep schedule, create a comfortable sleep environment, and avoid caffeine, large meals, and screens before bedtime. Try relaxation techniques like deep breathing or meditation. If sleep problems persist for more than a few weeks, consult a healthcare provider to rule out underlying conditions."
    }

    // Exercise and Fitness
    else if (lowerQuery.includes("exercise") || lowerQuery.includes("workout") || lowerQuery.includes("fitness")) {
      return "Regular exercise is crucial for health. Aim for at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity weekly, plus strength training twice a week. Start slowly and gradually increase intensity. Include activities you enjoy to maintain consistency. Consult a doctor before starting new exercise programs, especially if you have health conditions."
    } else if (lowerQuery.includes("weight loss") || lowerQuery.includes("lose weight")) {
      return "Healthy weight loss involves creating a moderate calorie deficit through balanced diet and regular exercise. Aim for 1-2 pounds per week. Focus on whole foods, portion control, and sustainable lifestyle changes rather than restrictive diets. Stay hydrated and get adequate sleep. Consult healthcare providers for personalized guidance."
    }

    // Nutrition and Diet
    else if (lowerQuery.includes("diet") || lowerQuery.includes("nutrition") || lowerQuery.includes("eating")) {
      return "A balanced diet includes fruits, vegetables, whole grains, lean proteins, and healthy fats. Aim for variety and moderation. Limit processed foods, added sugars, and excessive sodium. Stay hydrated with water. Consider consulting a registered dietitian for personalized nutrition advice based on your health needs and goals."
    } else if (lowerQuery.includes("vitamin") || lowerQuery.includes("supplement")) {
      return "Most people can get necessary vitamins from a balanced diet. Common supplements include vitamin D, B12 (especially for vegetarians), and folic acid for pregnant women. However, needs vary by individual. Consult healthcare providers before starting supplements, as some can interact with medications or be harmful in excess."
    } else if (lowerQuery.includes("water") || lowerQuery.includes("hydration")) {
      return "Adequate hydration is essential for health. Most adults need about 8 glasses (64 ounces) of water daily, but needs vary based on activity, climate, and individual factors. Signs of good hydration include pale yellow urine and feeling alert. Increase intake during exercise, hot weather, or illness."
    }

    // Mental Health
    else if (lowerQuery.includes("stress") || lowerQuery.includes("anxiety")) {
      return "For stress management, try deep breathing exercises, regular physical activity, adequate sleep, and time management techniques. Mindfulness, meditation, and talking to trusted friends or family can help. If stress or anxiety significantly impacts daily life, consider speaking with a mental health professional for additional support and strategies."
    } else if (lowerQuery.includes("depression") || lowerQuery.includes("sad")) {
      return "If you're experiencing persistent sadness, loss of interest in activities, or other symptoms of depression, it's important to seek professional help. Depression is treatable with therapy, medication, or both. Maintain social connections, regular exercise, and healthy routines. If you have thoughts of self-harm, contact emergency services or a crisis hotline immediately."
    }

    // Medications and Safety
    else if (lowerQuery.includes("medication") || lowerQuery.includes("medicine") || lowerQuery.includes("drug")) {
      return "Always take medications as prescribed by your healthcare provider. Don't share medications or take expired drugs. Store medications properly and keep them away from children. If you experience side effects or have questions about your medications, contact your pharmacist or doctor. Never stop prescribed medications without consulting your healthcare provider."
    } else if (lowerQuery.includes("allergy") || lowerQuery.includes("allergic")) {
      return "For mild allergic reactions, avoid the allergen and consider antihistamines. For severe reactions or anaphylaxis (difficulty breathing, swelling, rapid pulse), seek emergency medical care immediately. If you have known severe allergies, carry an epinephrine auto-injector and wear medical identification. Work with an allergist to identify triggers and develop management plans."
    }

    // Preventive Care
    else if (lowerQuery.includes("vaccine") || lowerQuery.includes("vaccination")) {
      return "Vaccines are safe and effective tools for preventing serious diseases. Follow recommended vaccination schedules for children and adults. Common adult vaccines include annual flu shots, COVID-19 boosters, and tetanus updates every 10 years. Consult healthcare providers about which vaccines are appropriate for your age, health status, and travel plans."
    } else if (lowerQuery.includes("checkup") || lowerQuery.includes("screening")) {
      return "Regular health checkups and screenings are important for early detection and prevention of health problems. Adults should have annual physical exams, blood pressure checks, cholesterol screening, and age-appropriate cancer screenings. Discuss with your healthcare provider which screenings are right for you based on your age, family history, and risk factors."
    }

    // Pregnancy and Women's Health
    else if (lowerQuery.includes("pregnancy") || lowerQuery.includes("pregnant")) {
      return "During pregnancy, maintain regular prenatal care, take prenatal vitamins with folic acid, eat a balanced diet, stay hydrated, and avoid alcohol, smoking, and certain medications. Get adequate rest and gentle exercise as approved by your healthcare provider. Contact your doctor immediately for severe symptoms like heavy bleeding, severe headaches, or persistent vomiting."
    }

    // Chronic Conditions
    else if (lowerQuery.includes("diabetes") || lowerQuery.includes("blood sugar")) {
      return "For diabetes management, monitor blood sugar levels as directed, take medications as prescribed, maintain a balanced diet, exercise regularly, and attend regular medical appointments. Learn to recognize signs of high and low blood sugar. Work with your healthcare team to develop a comprehensive management plan tailored to your needs."
    } else if (lowerQuery.includes("blood pressure") || lowerQuery.includes("hypertension")) {
      return "To manage blood pressure, maintain a healthy weight, exercise regularly, limit sodium intake, eat plenty of fruits and vegetables, limit alcohol, don't smoke, and manage stress. Take prescribed medications as directed and monitor blood pressure regularly. High blood pressure often has no symptoms, so regular monitoring is crucial."
    }

    // Emergency Situations
    else if (lowerQuery.includes("emergency") || lowerQuery.includes("urgent")) {
      return "For medical emergencies like chest pain, difficulty breathing, severe bleeding, loss of consciousness, or signs of stroke (face drooping, arm weakness, speech difficulty), call emergency services immediately. Don't delay seeking help for serious symptoms. When in doubt, it's better to seek emergency care than wait."
    }

    // Default Response
    else {
      return "I understand you're asking about health. While I can provide general wellness information and guidance on common health topics, please remember that this should not replace professional medical advice. For specific medical concerns, diagnosis, or treatment decisions, always consult qualified healthcare professionals. For emergencies, contact emergency services immediately."
    }
  }

  const speakResponse = (text: string) => {
    if (synthRef.current) {
      synthRef.current.cancel() // Stop any ongoing speech

      const utterance = new SpeechSynthesisUtterance(text)
      const selectedLang = languages.find((lang) => lang.code === selectedLanguage)
      utterance.lang = selectedLang?.voice || "en-US"
      utterance.rate = 0.9
      utterance.pitch = 1

      utterance.onstart = () => setIsPlaying(true)
      utterance.onend = () => setIsPlaying(false)
      utterance.onerror = () => {
        setIsPlaying(false)
        toast({
          title: "Speech synthesis error",
          description: "Unable to speak the response.",
          variant: "destructive",
        })
      }

      synthRef.current.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel()
      setIsPlaying(false)
    }
  }

  const clearConversation = () => {
    setConversationHistory([])
    setTranscript("")
    setResponse("")
    toast({
      title: "Conversation cleared",
      description: "Your conversation history has been reset.",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">AI Voice Health Assistant</h1>
          <p className="text-gray-600">Ask health questions using your voice in multiple languages</p>
        </div>

        {/* Language Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="h-5 w-5" />
              Language Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Select Language:</label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Voice Interface */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Voice Interface
            </CardTitle>
            <CardDescription>Click the microphone to ask your health question</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Voice Controls */}
            <div className="flex justify-center gap-4">
              <Button
                onClick={isListening ? stopListening : startListening}
                size="lg"
                className={`${isListening ? "bg-red-600 hover:bg-red-700" : "bg-emerald-600 hover:bg-emerald-700"} px-8`}
                disabled={isProcessing}
              >
                {isListening ? (
                  <>
                    <MicOff className="h-5 w-5 mr-2" />
                    Stop Listening
                  </>
                ) : (
                  <>
                    <Mic className="h-5 w-5 mr-2" />
                    Start Listening
                  </>
                )}
              </Button>

              <Button
                onClick={isPlaying ? stopSpeaking : () => response && speakResponse(response)}
                variant="outline"
                size="lg"
                disabled={!response || isProcessing}
              >
                {isPlaying ? (
                  <>
                    <VolumeX className="h-5 w-5 mr-2" />
                    Stop
                  </>
                ) : (
                  <>
                    <Volume2 className="h-5 w-5 mr-2" />
                    Speak Response
                  </>
                )}
              </Button>

              <Button onClick={clearConversation} variant="outline" size="lg">
                <RotateCcw className="h-5 w-5 mr-2" />
                Clear
              </Button>
            </div>

            {/* Status Indicators */}
            <div className="flex justify-center gap-4">
              {isListening && (
                <Badge variant="secondary" className="bg-red-100 text-red-800">
                  <Mic className="h-3 w-3 mr-1" />
                  Listening...
                </Badge>
              )}
              {isProcessing && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                  Processing...
                </Badge>
              )}
              {isPlaying && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Volume2 className="h-3 w-3 mr-1" />
                  Speaking...
                </Badge>
              )}
            </div>

            {/* Current Conversation */}
            {(transcript || response) && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                {transcript && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Your Question:</h4>
                    <p className="text-gray-700 bg-white p-3 rounded border">{transcript}</p>
                  </div>
                )}

                {response && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">AI Response:</h4>
                    <p className="text-gray-700 bg-white p-3 rounded border">{response}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Conversation History */}
        {conversationHistory.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Conversations</CardTitle>
              <CardDescription>Your last 10 health questions and responses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversationHistory.map((entry) => (
                  <div key={entry.id} className="border-l-4 border-emerald-500 pl-4 py-2">
                    <div className="text-sm text-gray-500 mb-1">{entry.timestamp.toLocaleString()}</div>
                    <div className="mb-2">
                      <span className="font-medium text-gray-900">Q: </span>
                      <span className="text-gray-700">{entry.question}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">A: </span>
                      <span className="text-gray-700">{entry.answer}</span>
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
                <MessageSquare className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-medium text-amber-900 mb-1">Important Health Notice</h4>
                <p className="text-amber-800 text-sm">
                  This AI assistant provides general health information only and should not replace professional medical
                  advice. For medical emergencies, contact emergency services immediately. Always consult healthcare
                  providers for diagnosis and treatment decisions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
