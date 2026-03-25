"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, RotateCcw, Plus, Trash2, Play, Trophy, Settings, Zap, CheckCircle } from "lucide-react"
import Link from "next/link"

interface WheelSegment {
  id: string
  text: string
  color: string
}

const defaultSegments: WheelSegment[] = [
  { id: "1", text: "Prize 1", color: "#FF6B6B" },
  { id: "2", text: "Prize 2", color: "#4ECDC4" },
  { id: "3", text: "Prize 3", color: "#45B7D1" },
  { id: "4", text: "Prize 4", color: "#96CEB4" },
  { id: "5", text: "Prize 5", color: "#FFEAA7" },
  { id: "6", text: "Prize 6", color: "#DDA0DD" },
  { id: "7", text: "Prize 7", color: "#98D8C8" },
  { id: "8", text: "Prize 8", color: "#F7DC6F" },
]

const generateColors = (count: number): string[] => {
  const colors = []
  for (let i = 0; i < count; i++) {
    const hue = (i * 360) / count
    colors.push(`hsl(${hue}, 70%, 60%)`)
  }
  return colors
}

export default function WheelSpinnerDemo() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [segments, setSegments] = useState<WheelSegment[]>(defaultSegments)
  const [isSpinning, setIsSpinning] = useState(false)
  const [winner, setWinner] = useState<string | null>(null)
  const [newSegmentText, setNewSegmentText] = useState("")
  const [rotation, setRotation] = useState(0)
  const [spinHistory, setSpinHistory] = useState<string[]>([])

  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 10

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw segments
    const anglePerSegment = (2 * Math.PI) / segments.length

    segments.forEach((segment, index) => {
      const startAngle = index * anglePerSegment + rotation
      const endAngle = startAngle + anglePerSegment

      // Draw segment
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.fillStyle = segment.color
      ctx.fill()
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 3
      ctx.stroke()

      // Draw text
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(startAngle + anglePerSegment / 2)
      ctx.textAlign = "center"
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 16px Arial"
      ctx.shadowColor = "rgba(0,0,0,0.5)"
      ctx.shadowBlur = 2
      ctx.fillText(segment.text, radius * 0.7, 5)
      ctx.restore()
    })

    // Draw center circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI)
    ctx.fillStyle = "#333"
    ctx.fill()
    ctx.strokeStyle = "#fff"
    ctx.lineWidth = 3
    ctx.stroke()

    // Draw pointer
    ctx.beginPath()
    ctx.moveTo(centerX + radius - 10, centerY)
    ctx.lineTo(centerX + radius + 20, centerY - 15)
    ctx.lineTo(centerX + radius + 20, centerY + 15)
    ctx.closePath()
    ctx.fillStyle = "#333"
    ctx.fill()
    ctx.strokeStyle = "#fff"
    ctx.lineWidth = 2
    ctx.stroke()
  }, [segments, rotation])

  useEffect(() => {
    drawWheel()
  }, [drawWheel])

  const spinWheel = () => {
    if (isSpinning || segments.length === 0) return

    setIsSpinning(true)
    setWinner(null)

    // Random spin amount (multiple full rotations + random angle)
    const spinAmount = Math.random() * 2 * Math.PI + 4 * Math.PI
    const finalRotation = rotation + spinAmount

    // Animate the spin
    const duration = 3000 // 3 seconds
    const startTime = Date.now()
    const startRotation = rotation

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for realistic deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentRotation = startRotation + spinAmount * easeOut

      setRotation(currentRotation)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        // Determine winner
        const normalizedRotation = ((currentRotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
        const anglePerSegment = (2 * Math.PI) / segments.length
        const winnerIndex = Math.floor((2 * Math.PI - normalizedRotation) / anglePerSegment) % segments.length
        const winnerSegment = segments[winnerIndex]

        setWinner(winnerSegment.text)
        setSpinHistory((prev) => [winnerSegment.text, ...prev.slice(0, 4)])
        setIsSpinning(false)
      }
    }

    animate()
  }

  const addSegment = () => {
    if (!newSegmentText.trim()) return

    const colors = generateColors(segments.length + 1)
    const newSegment: WheelSegment = {
      id: Date.now().toString(),
      text: newSegmentText.trim(),
      color: colors[segments.length],
    }

    setSegments([...segments, newSegment])
    setNewSegmentText("")
  }

  const removeSegment = (id: string) => {
    if (segments.length <= 2) return // Keep at least 2 segments
    setSegments(segments.filter((segment) => segment.id !== id))
  }

  const resetWheel = () => {
    setSegments(defaultSegments)
    setRotation(0)
    setWinner(null)
    setSpinHistory([])
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Random Wheel Spinner Demo</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Demo Info */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">Canvas API</Badge>
            <Badge variant="secondary">Animations</Badge>
            <Badge variant="secondary">React</Badge>
            <Badge variant="secondary">Interactive</Badge>
          </div>
          <p className="text-muted-foreground">
            Interactive spinning wheel for contests, decision making, and random selection. Features smooth animations,
            customizable segments, and realistic physics simulation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Wheel */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Spin the Wheel!</span>
                  <Button
                    onClick={spinWheel}
                    disabled={isSpinning || segments.length === 0}
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    {isSpinning ? "Spinning..." : "SPIN"}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-6">
                  <div className="relative">
                    <canvas
                      ref={canvasRef}
                      width={400}
                      height={400}
                      className="border border-border rounded-full shadow-lg"
                    />
                    {isSpinning && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/50 text-white px-4 py-2 rounded-lg font-bold">Spinning...</div>
                      </div>
                    )}
                  </div>

                  {winner && (
                    <Alert className="max-w-md">
                      <Trophy className="h-4 w-4" />
                      <AlertDescription className="font-semibold">
                        🎉 Winner: <span className="text-primary">{winner}</span>
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex gap-2">
                    <Button onClick={resetWheel} variant="outline" disabled={isSpinning}>
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            {/* Add Segment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Customize Wheel
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newSegment">Add New Segment</Label>
                  <div className="flex gap-2">
                    <Input
                      id="newSegment"
                      value={newSegmentText}
                      onChange={(e) => setNewSegmentText(e.target.value)}
                      placeholder="Enter segment text"
                      onKeyPress={(e) => e.key === "Enter" && addSegment()}
                      disabled={isSpinning}
                    />
                    <Button onClick={addSegment} size="sm" disabled={!newSegmentText.trim() || isSpinning}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Current Segments ({segments.length})</Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {segments.map((segment) => (
                      <div key={segment.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: segment.color }} />
                          <span className="text-sm">{segment.text}</span>
                        </div>
                        <Button
                          onClick={() => removeSegment(segment.id)}
                          size="sm"
                          variant="ghost"
                          disabled={segments.length <= 2 || isSpinning}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Spin History */}
            {spinHistory.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Winners</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {spinHistory.map((winner, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                        <span className="text-sm">{winner}</span>
                        <Badge variant="outline">#{spinHistory.length - index}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Demo Features */}
            <Card>
              <CardHeader>
                <CardTitle>Demo Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Canvas API Drawing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Smooth Animations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Physics Simulation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Dynamic Segments</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Winner History</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Responsive Design</span>
                </div>
              </CardContent>
            </Card>

            {/* Use Cases */}
            <Card>
              <CardHeader>
                <CardTitle>Use Cases</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Contest giveaways</p>
                <p>• Decision making tools</p>
                <p>• Team building activities</p>
                <p>• Random selection</p>
                <p>• Educational games</p>
                <p>• Event entertainment</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
