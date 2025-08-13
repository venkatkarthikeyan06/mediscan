"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Video, CalendarIcon, Clock, Leaf, Car, Users, Phone, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function TelehealthPage() {
  const { toast } = useToast()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [appointmentType, setAppointmentType] = useState("")
  const [symptoms, setSymptoms] = useState("")

  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      specialty: "Family Medicine",
      rating: 4.9,
      nextAvailable: "Today 2:00 PM",
      carbonSaved: "12.5 kg CO₂",
      consultationFee: "$75",
    },
    {
      name: "Dr. Michael Chen",
      specialty: "Internal Medicine",
      rating: 4.8,
      nextAvailable: "Tomorrow 10:00 AM",
      carbonSaved: "15.2 kg CO₂",
      consultationFee: "$85",
    },
    {
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      rating: 4.9,
      nextAvailable: "Today 4:30 PM",
      carbonSaved: "8.7 kg CO₂",
      consultationFee: "$70",
    },
  ]

  const upcomingAppointments = [
    {
      doctor: "Dr. Sarah Johnson",
      date: "Today",
      time: "2:00 PM",
      type: "Follow-up Consultation",
      platform: "Video Call",
    },
    {
      doctor: "Dr. Michael Chen",
      date: "Tomorrow",
      time: "10:00 AM",
      type: "General Checkup",
      platform: "Phone Call",
    },
  ]

  const bookAppointment = (doctorName: string) => {
    toast({
      title: "Appointment Booking",
      description: `Booking appointment with ${doctorName}...`,
    })
  }

  const joinCall = (doctorName: string) => {
    toast({
      title: "Joining Call",
      description: `Connecting to video call with ${doctorName}...`,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Video className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">Telehealth Integration</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Reduce travel emissions through virtual consultations while maintaining quality healthcare
            </p>
          </div>

          {/* Environmental Impact Banner */}
          <Card className="mb-8 bg-gradient-to-r from-green-100 to-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Leaf className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-800">Your Environmental Impact</h3>
                    <p className="text-green-700">You've saved 127.3 kg CO₂ through telehealth consultations</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">15</div>
                  <p className="text-sm text-green-700">Virtual appointments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="book" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="book">Book Appointment</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="doctors">Find Doctors</TabsTrigger>
              <TabsTrigger value="impact">Environmental Impact</TabsTrigger>
            </TabsList>

            <TabsContent value="book" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Schedule Virtual Consultation</CardTitle>
                    <CardDescription>Book an eco-friendly telehealth appointment</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="appointment-type">Appointment Type</Label>
                      <Select value={appointmentType} onValueChange={setAppointmentType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select consultation type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Consultation</SelectItem>
                          <SelectItem value="followup">Follow-up Visit</SelectItem>
                          <SelectItem value="prescription">Prescription Renewal</SelectItem>
                          <SelectItem value="mental-health">Mental Health</SelectItem>
                          <SelectItem value="specialist">Specialist Referral</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="symptoms">Symptoms or Concerns</Label>
                      <Textarea
                        id="symptoms"
                        placeholder="Describe your symptoms or reason for consultation..."
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Preferred Date</Label>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border"
                      />
                    </div>

                    <Button className="w-full">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Find Available Times
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Why Choose Telehealth?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <Leaf className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-green-800">Environmental Benefits</h4>
                        <p className="text-sm text-green-700">Average 8.5 kg CO₂ saved per virtual appointment</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-800">Time Savings</h4>
                        <p className="text-sm text-blue-700">No travel time, parking, or waiting room delays</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                      <Users className="h-5 w-5 text-purple-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-purple-800">Accessibility</h4>
                        <p className="text-sm text-purple-700">Healthcare access from anywhere, reducing barriers</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="upcoming" className="space-y-6">
              <div className="space-y-4">
                {upcomingAppointments.map((appointment, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-blue-100 rounded-full">
                            {appointment.platform === "Video Call" ? (
                              <Video className="h-5 w-5 text-blue-600" />
                            ) : (
                              <Phone className="h-5 w-5 text-blue-600" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold">{appointment.doctor}</h3>
                            <p className="text-gray-600">{appointment.type}</p>
                            <p className="text-sm text-gray-500">
                              {appointment.date} at {appointment.time}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                          <Button onClick={() => joinCall(appointment.doctor)}>
                            <Video className="h-4 w-4 mr-2" />
                            Join Call
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="doctors" className="space-y-6">
              <div className="grid gap-4">
                {doctors.map((doctor, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{doctor.name}</h3>
                            <p className="text-gray-600">{doctor.specialty}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <Badge variant="secondary">★ {doctor.rating}</Badge>
                              <span className="text-sm text-gray-500">Next: {doctor.nextAvailable}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-green-600">{doctor.consultationFee}</div>
                          <p className="text-sm text-green-600">Saves {doctor.carbonSaved}</p>
                          <Button className="mt-2" onClick={() => bookAppointment(doctor.name)}>
                            Book Appointment
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="impact" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Car className="h-5 w-5 text-red-500" />
                      Travel Avoided
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-red-500 mb-2">342 miles</div>
                    <p className="text-sm text-gray-600">Total distance saved through virtual appointments</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-green-500" />
                      Carbon Footprint
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-500 mb-2">127.3 kg</div>
                    <p className="text-sm text-gray-600">CO₂ emissions prevented this year</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-500" />
                      Time Saved
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-500 mb-2">18.5 hrs</div>
                    <p className="text-sm text-gray-600">Total time saved from travel and waiting</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Environmental Comparison</CardTitle>
                  <CardDescription>Telehealth vs Traditional In-Person Visits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-green-800">Virtual Consultation</h4>
                        <p className="text-sm text-green-700">Average carbon footprint per visit</p>
                      </div>
                      <div className="text-2xl font-bold text-green-600">0.1 kg CO₂</div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-red-800">In-Person Visit</h4>
                        <p className="text-sm text-red-700">Average carbon footprint per visit</p>
                      </div>
                      <div className="text-2xl font-bold text-red-600">8.6 kg CO₂</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
