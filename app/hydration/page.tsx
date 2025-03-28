"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Droplet, Plus, Minus, TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useToast } from "@/hooks/use-toast"

export default function HydrationPage() {
  const { toast } = useToast()
  const [currentWater, setCurrentWater] = useState(0)
  const [dailyGoal, setDailyGoal] = useState(2500) // in ml
  const [waterHistory, setWaterHistory] = useState([
    { day: "Mon", amount: 2000 },
    { day: "Tue", amount: 2200 },
    { day: "Wed", amount: 1800 },
    { day: "Thu", amount: 2500 },
    { day: "Fri", amount: 2300 },
    { day: "Sat", amount: 2100 },
    { day: "Sun", amount: 0 },
  ])

  useEffect(() => {
    // In a real app, this would fetch from an API
    setCurrentWater(1200) // Example: already drank 1200ml today
  }, [])

  const addWater = (amount: number) => {
    const newAmount = Math.max(0, currentWater + amount)
    setCurrentWater(newAmount)

    // Update today's value in the history
    const today = new Date().getDay()
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const todayName = dayNames[today]

    const updatedHistory = [...waterHistory]
    const todayIndex = updatedHistory.findIndex((item) => item.day === todayName)
    if (todayIndex !== -1) {
      updatedHistory[todayIndex].amount = newAmount
      setWaterHistory(updatedHistory)
    }

    if (amount > 0) {
      toast({
        title: "Water added",
        description: `Added ${amount}ml of water to your daily intake.`,
      })
    } else {
      toast({
        title: "Water removed",
        description: `Removed ${Math.abs(amount)}ml of water from your daily intake.`,
      })
    }
  }

  const percentComplete = Math.min(100, Math.round((currentWater / dailyGoal) * 100))

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold neon-text">Hydration Tracker</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glassmorphic lg:col-span-2">
          <CardHeader>
            <CardTitle>Today's Hydration</CardTitle>
            <CardDescription>Track your water intake throughout the day</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center">
              <div className="relative h-48 w-48">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <div className="text-4xl font-bold text-neon-blue">{currentWater}ml</div>
                  <div className="text-sm text-white/70">of {dailyGoal}ml goal</div>
                </div>
                <svg className="h-full w-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="8" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#00F0FF"
                    strokeWidth="8"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * percentComplete) / 100}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-white/70">
                  {percentComplete < 50
                    ? "You're falling behind on your water intake today."
                    : percentComplete < 100
                      ? "You're doing well, keep drinking water!"
                      : "Great job! You've reached your water goal for today."}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => addWater(250)}
                className="flex items-center gap-2 bg-neon-blue/80 hover:bg-neon-blue animate-glow" style={{ backgroundColor: '#00f0ff' }}
              >
                <Plus className="h-4 w-4" />
                <Droplet className="h-4 w-4" />
                250ml
              </Button>
              <Button
                onClick={() => addWater(500)}
                className="flex items-center gap-2 hover:bg-neon-blue animate-glow" style={{ backgroundColor: '#00f0ff' }}
              >
                <Plus className="h-4 w-4" />
                <Droplet className="h-4 w-4" />
                500ml
              </Button>
              <Button
                onClick={() => addWater(1000)}
                className="flex items-center gap-2 bg-neon-blue/80 hover:bg-neon-blue animate-glow" style={{ backgroundColor: '#00f0ff' }}
              >
                <Plus className="h-4 w-4" />
                <Droplet className="h-4 w-4" />
                1000ml
              </Button>
              <Button
                onClick={() => addWater(-250)}
                variant="outline"
                className="flex items-center gap-2 border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10"
              >
                <Minus className="h-4 w-4" />
                250ml
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Current: {currentWater}ml</span>
                <span>Goal: {dailyGoal}ml</span>
              </div>
              <Progress value={percentComplete} className="h-2" />
              <div className="flex justify-between text-xs text-white/70">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphic">
          <CardHeader>
            <CardTitle>Hydration Tips</CardTitle>
            <CardDescription>Stay hydrated throughout the day</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-neon-blue/20 p-3">
              <h3 className="font-medium text-neon-blue">Morning Routine</h3>
              <p className="mt-1 text-sm text-white/70">
                Start your day with a glass of water to kickstart your metabolism.
              </p>
            </div>

            <div className="rounded-lg border border-neon-blue/20 p-3">
              <h3 className="font-medium text-neon-blue">Workout Hydration</h3>
              <p className="mt-1 text-sm text-white/70">
                Drink 500ml of water 2 hours before exercise and 250ml every 15 minutes during workout.
              </p>
            </div>

            <div className="rounded-lg border border-neon-blue/20 p-3">
              <h3 className="font-medium text-neon-blue">Hydration Foods</h3>
              <p className="mt-1 text-sm text-white/70">
                Eat water-rich foods like cucumber, watermelon, and oranges to boost hydration.
              </p>
            </div>

            <div className="rounded-lg border border-neon-blue/20 p-3">
              <h3 className="font-medium text-neon-blue">Set Reminders</h3>
              <p className="mt-1 text-sm text-white/70">Set hourly reminders to drink water throughout your workday.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glassmorphic">
        <CardHeader>
          <CardTitle>Weekly Hydration</CardTitle>
          <CardDescription>Your water intake over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              amount: {
                label: "Water (ml)",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={waterHistory}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="day" className="text-xs" />
                <YAxis className="text-xs" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="amount" name="Water Intake" fill="var(--color-amount)" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glassmorphic">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Average Daily Intake</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold text-neon-blue">2,130ml</div>
              <div className="ml-2 flex items-center text-neon-green">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs">+5%</span>
              </div>
            </div>
            <p className="text-xs text-white/70 mt-1">Compared to last week</p>
          </CardContent>
        </Card>

        <Card className="glassmorphic">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neon-purple">5 days</div>
            <p className="text-xs text-white/70 mt-1">Consecutive days meeting your goal</p>
          </CardContent>
        </Card>

        <Card className="glassmorphic">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Hydration Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neon-green">8.5/10</div>
            <p className="text-xs text-white/70 mt-1">Based on consistency and goal achievement</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

