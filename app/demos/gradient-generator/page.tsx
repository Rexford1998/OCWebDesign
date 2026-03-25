"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Palette, Copy, Download, RotateCcw, Plus, Trash2, CheckCircle, Code, Eye } from "lucide-react"
import Link from "next/link"

interface ColorStop {
  id: string
  color: string
  position: number
}

interface GradientConfig {
  type: "linear" | "radial" | "conic"
  angle: number
  colorStops: ColorStop[]
  radialShape: "circle" | "ellipse"
  radialSize: "closest-side" | "closest-corner" | "farthest-side" | "farthest-corner"
  centerX: number
  centerY: number
}

const presetGradients = [
  {
    name: "Sunset",
    config: {
      type: "linear" as const,
      angle: 45,
      colorStops: [
        { id: "1", color: "#ff9a9e", position: 0 },
        { id: "2", color: "#fecfef", position: 50 },
        { id: "3", color: "#fecfef", position: 100 },
      ],
    },
  },
  {
    name: "Ocean",
    config: {
      type: "linear" as const,
      angle: 135,
      colorStops: [
        { id: "1", color: "#667eea", position: 0 },
        { id: "2", color: "#764ba2", position: 100 },
      ],
    },
  },
  {
    name: "Forest",
    config: {
      type: "linear" as const,
      angle: 90,
      colorStops: [
        { id: "1", color: "#134e5e", position: 0 },
        { id: "2", color: "#71b280", position: 100 },
      ],
    },
  },
  {
    name: "Fire",
    config: {
      type: "radial" as const,
      angle: 0,
      colorStops: [
        { id: "1", color: "#ff416c", position: 0 },
        { id: "2", color: "#ff4b2b", position: 100 },
      ],
    },
  },
  {
    name: "Purple Haze",
    config: {
      type: "linear" as const,
      angle: 45,
      colorStops: [
        { id: "1", color: "#667eea", position: 0 },
        { id: "2", color: "#764ba2", position: 100 },
      ],
    },
  },
  {
    name: "Mint",
    config: {
      type: "linear" as const,
      angle: 135,
      colorStops: [
        { id: "1", color: "#2af598", position: 0 },
        { id: "2", color: "#009efd", position: 100 },
      ],
    },
  },
]

export default function GradientGeneratorDemo() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [gradient, setGradient] = useState<GradientConfig>({
    type: "linear",
    angle: 45,
    colorStops: [
      { id: "1", color: "#667eea", position: 0 },
      { id: "2", color: "#764ba2", position: 100 },
    ],
    radialShape: "circle",
    radialSize: "farthest-corner",
    centerX: 50,
    centerY: 50,
  })

  const [cssCode, setCssCode] = useState("")
  const [copied, setCopied] = useState(false)

  const generateCSS = () => {
    const { type, angle, colorStops, radialShape, radialSize, centerX, centerY } = gradient

    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position)
    const colorString = sortedStops.map((stop) => `${stop.color} ${stop.position}%`).join(", ")

    let css = ""

    switch (type) {
      case "linear":
        css = `background: linear-gradient(${angle}deg, ${colorString});`
        break
      case "radial":
        css = `background: radial-gradient(${radialShape} ${radialSize} at ${centerX}% ${centerY}%, ${colorString});`
        break
      case "conic":
        css = `background: conic-gradient(from ${angle}deg at ${centerX}% ${centerY}%, ${colorString});`
        break
    }

    return css
  }

  useEffect(() => {
    setCssCode(generateCSS())
  }, [gradient])

  const addColorStop = () => {
    const newStop: ColorStop = {
      id: Date.now().toString(),
      color: "#ffffff",
      position: 50,
    }
    setGradient((prev) => ({
      ...prev,
      colorStops: [...prev.colorStops, newStop],
    }))
  }

  const removeColorStop = (id: string) => {
    if (gradient.colorStops.length <= 2) return
    setGradient((prev) => ({
      ...prev,
      colorStops: prev.colorStops.filter((stop) => stop.id !== id),
    }))
  }

  const updateColorStop = (id: string, updates: Partial<ColorStop>) => {
    setGradient((prev) => ({
      ...prev,
      colorStops: prev.colorStops.map((stop) => (stop.id === id ? { ...stop, ...updates } : stop)),
    }))
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(cssCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadCSS = () => {
    const blob = new Blob([cssCode], { type: "text/css" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "gradient.css"
    a.click()
    URL.revokeObjectURL(url)
  }

  const loadPreset = (preset: (typeof presetGradients)[0]) => {
    setGradient({
      ...gradient,
      ...preset.config,
      radialShape: gradient.radialShape,
      radialSize: gradient.radialSize,
      centerX: gradient.centerX,
      centerY: gradient.centerY,
    })
  }

  const resetGradient = () => {
    setGradient({
      type: "linear",
      angle: 45,
      colorStops: [
        { id: "1", color: "#667eea", position: 0 },
        { id: "2", color: "#764ba2", position: 100 },
      ],
      radialShape: "circle",
      radialSize: "farthest-corner",
      centerX: 50,
      centerY: 50,
    })
  }

  const gradientStyle = {
    background: cssCode.replace("background: ", "").replace(";", ""),
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
            <Palette className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Gradient Generator Demo</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Demo Info */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">CSS-in-JS</Badge>
            <Badge variant="secondary">Color Theory</Badge>
            <Badge variant="secondary">Export</Badge>
            <Badge variant="secondary">Interactive</Badge>
          </div>
          <p className="text-muted-foreground">
            Professional CSS gradient generator with live preview, multiple gradient types, and code export
            functionality. Create beautiful gradients for your web projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Large Preview */}
                  <div className="relative">
                    <div className="w-full h-64 rounded-lg border border-border shadow-lg" style={gradientStyle} />
                    <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
                      {gradient.type} gradient
                    </div>
                  </div>

                  {/* CSS Code */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Code className="h-5 w-5" />
                          Generated CSS
                        </span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={copyToClipboard}>
                            <Copy className="h-4 w-4 mr-2" />
                            {copied ? "Copied!" : "Copy"}
                          </Button>
                          <Button variant="outline" size="sm" onClick={downloadCSS}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted p-4 rounded-lg">
                        <code className="text-sm font-mono break-all">{cssCode}</code>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Preset Gradients */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Preset Gradients</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {presetGradients.map((preset) => (
                          <Button
                            key={preset.name}
                            variant="outline"
                            className="h-16 p-2 flex flex-col items-center justify-center bg-transparent"
                            onClick={() => loadPreset(preset)}
                          >
                            <div
                              className="w-full h-8 rounded mb-1"
                              style={{
                                background: `linear-gradient(${preset.config.angle}deg, ${preset.config.colorStops
                                  .map((stop) => `${stop.color} ${stop.position}%`)
                                  .join(", ")})`,
                              }}
                            />
                            <span className="text-xs">{preset.name}</span>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Gradient Controls
                  <Button variant="outline" size="sm" onClick={resetGradient}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={gradient.type} onValueChange={(value) => setGradient({ ...gradient, type: value as any })}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="linear">Linear</TabsTrigger>
                    <TabsTrigger value="radial">Radial</TabsTrigger>
                    <TabsTrigger value="conic">Conic</TabsTrigger>
                  </TabsList>

                  <TabsContent value="linear" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Angle: {gradient.angle}°</Label>
                      <Slider
                        value={[gradient.angle]}
                        onValueChange={([value]) => setGradient({ ...gradient, angle: value })}
                        max={360}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="radial" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Shape</Label>
                        <Select
                          value={gradient.radialShape}
                          onValueChange={(value) => setGradient({ ...gradient, radialShape: value as any })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="circle">Circle</SelectItem>
                            <SelectItem value="ellipse">Ellipse</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Size</Label>
                        <Select
                          value={gradient.radialSize}
                          onValueChange={(value) => setGradient({ ...gradient, radialSize: value as any })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="closest-side">Closest Side</SelectItem>
                            <SelectItem value="closest-corner">Closest Corner</SelectItem>
                            <SelectItem value="farthest-side">Farthest Side</SelectItem>
                            <SelectItem value="farthest-corner">Farthest Corner</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Center X: {gradient.centerX}%</Label>
                      <Slider
                        value={[gradient.centerX]}
                        onValueChange={([value]) => setGradient({ ...gradient, centerX: value })}
                        max={100}
                        step={1}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Center Y: {gradient.centerY}%</Label>
                      <Slider
                        value={[gradient.centerY]}
                        onValueChange={([value]) => setGradient({ ...gradient, centerY: value })}
                        max={100}
                        step={1}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="conic" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Start Angle: {gradient.angle}°</Label>
                      <Slider
                        value={[gradient.angle]}
                        onValueChange={([value]) => setGradient({ ...gradient, angle: value })}
                        max={360}
                        step={1}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Center X: {gradient.centerX}%</Label>
                      <Slider
                        value={[gradient.centerX]}
                        onValueChange={([value]) => setGradient({ ...gradient, centerX: value })}
                        max={100}
                        step={1}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Center Y: {gradient.centerY}%</Label>
                      <Slider
                        value={[gradient.centerY]}
                        onValueChange={([value]) => setGradient({ ...gradient, centerY: value })}
                        max={100}
                        step={1}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Color Stops */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Color Stops
                  <Button variant="outline" size="sm" onClick={addColorStop}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {gradient.colorStops
                    .sort((a, b) => a.position - b.position)
                    .map((stop) => (
                      <div key={stop.id} className="space-y-2 p-3 border border-border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded border" style={{ backgroundColor: stop.color }} />
                            <span className="text-sm font-medium">{stop.position}%</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeColorStop(stop.id)}
                            disabled={gradient.colorStops.length <= 2}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Input
                            type="color"
                            value={stop.color}
                            onChange={(e) => updateColorStop(stop.id, { color: e.target.value })}
                            className="w-full h-10"
                          />
                          <Slider
                            value={[stop.position]}
                            onValueChange={([value]) => updateColorStop(stop.id, { position: value })}
                            max={100}
                            step={1}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Demo Features */}
            <Card>
              <CardHeader>
                <CardTitle>Demo Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Live Preview</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Multiple Gradient Types</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Color Stop Management</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">CSS Code Generation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Copy & Download</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Preset Gradients</span>
                </div>
              </CardContent>
            </Card>

            {/* Usage Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Usage Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Use 2-3 colors for best results</p>
                <p>• Linear gradients work great for backgrounds</p>
                <p>• Radial gradients create spotlight effects</p>
                <p>• Conic gradients are perfect for progress indicators</p>
                <p>• Adjust color stop positions for smooth transitions</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {copied && (
          <Alert className="fixed bottom-4 right-4 w-auto">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>CSS code copied to clipboard!</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}
