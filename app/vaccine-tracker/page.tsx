"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calendar, Shield, Plus, Bell, Trash2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function VaccineTracker() {
  const [vaccines, setVaccines] = useState([
    { id: 1, name: "COVID-19 Booster", lastDate: "2024-01-15", nextDue: "2024-07-15", status: "due-soon" },
    { id: 2, name: "Flu Shot", lastDate: "2023-10-20", nextDue: "2024-10-20", status: "current" },
    { id: 3, name: "Tetanus", lastDate: "2019-03-10", nextDue: "2029-03-10", status: "current" },
  ])

  const [newVaccine, setNewVaccine] = useState({ name: "", lastDate: "", nextDue: "" })
  const [reminders, setReminders] = useState({ email: false, sms: false })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "overdue":
        return "bg-red-100 text-red-800"
      case "due-soon":
        return "bg-yellow-100 text-yellow-800"
      case "current":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const calculateStatus = (nextDue: string) => {
    const today = new Date()
    const dueDate = new Date(nextDue)
    const diffTime = dueDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return "overdue"
    if (diffDays <= 30) return "due-soon"
    return "current"
  }

  const handleAddVaccine = () => {
    if (!newVaccine.name || !newVaccine.lastDate || !newVaccine.nextDue) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to add a vaccine record.",
        variant: "destructive",
      })
      return
    }

    const status = calculateStatus(newVaccine.nextDue)
    const vaccine = {
      id: Date.now(),
      ...newVaccine,
      status,
    }

    setVaccines([...vaccines, vaccine])
    setNewVaccine({ name: "", lastDate: "", nextDue: "" })
    setIsAddDialogOpen(false)

    toast({
      title: "Vaccine Added",
      description: `${newVaccine.name} has been added to your records.`,
    })
  }

  const handleDeleteVaccine = (id: number) => {
    setVaccines(vaccines.filter((v) => v.id !== id))
    toast({
      title: "Record Deleted",
      description: "Vaccine record has been removed.",
    })
  }

  const toggleReminder = (type: "email" | "sms") => {
    setReminders((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))

    toast({
      title: `${type.toUpperCase()} Reminders ${!reminders[type] ? "Enabled" : "Disabled"}`,
      description: `You will ${!reminders[type] ? "now receive" : "no longer receive"} ${type} notifications.`,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Shield className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Vaccine Tracker</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Keep track of your immunizations and never miss important vaccine updates
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Your Vaccine Records
              </CardTitle>
              <CardDescription>Track your vaccination history and upcoming due dates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {vaccines.map((vaccine) => (
                <div key={vaccine.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold">{vaccine.name}</h3>
                    <p className="text-sm text-gray-600">Last: {vaccine.lastDate}</p>
                    <p className="text-sm text-gray-600">Next: {vaccine.nextDue}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(vaccine.status)}>
                      {vaccine.status === "current"
                        ? "Current"
                        : vaccine.status === "due-soon"
                          ? "Due Soon"
                          : "Overdue"}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteVaccine(vaccine.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Vaccine
              </CardTitle>
              <CardDescription>Record a new vaccination or update existing records</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="vaccine-name">Vaccine Name</Label>
                <Input
                  id="vaccine-name"
                  placeholder="e.g., COVID-19, Flu Shot"
                  value={newVaccine.name}
                  onChange={(e) => setNewVaccine({ ...newVaccine, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="vaccine-date">Date Received</Label>
                <Input
                  id="vaccine-date"
                  type="date"
                  value={newVaccine.lastDate}
                  onChange={(e) => setNewVaccine({ ...newVaccine, lastDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="next-due">Next Due Date</Label>
                <Input
                  id="next-due"
                  type="date"
                  value={newVaccine.nextDue}
                  onChange={(e) => setNewVaccine({ ...newVaccine, nextDue: e.target.value })}
                />
              </div>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={handleAddVaccine}>
                Add Vaccine Record
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Reminder Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center justify-between">
                <span>Email Reminders</span>
                <Button
                  variant={reminders.email ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleReminder("email")}
                >
                  {reminders.email ? "Enabled" : "Enable"}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span>SMS Notifications</span>
                <Button variant={reminders.sms ? "default" : "outline"} size="sm" onClick={() => toggleReminder("sms")}>
                  {reminders.sms ? "Enabled" : "Enable"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
