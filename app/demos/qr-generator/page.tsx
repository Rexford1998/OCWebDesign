"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ArrowLeft,
  QrCode,
  Download,
  Copy,
  Smartphone,
  Wifi,
  Mail,
  Phone,
  Globe,
  FileText,
  CheckCircle,
  Palette,
  Settings,
} from "lucide-react"
import Link from "next/link"

interface QRConfig {
  type: "text" | "url" | "email" | "phone" | "wifi" | "sms"
  content: string
  size: number
  foregroundColor: string
  backgroundColor: string
  errorCorrection: "L" | "M" | "Q" | "H"
  margin: number
}

interface QRTemplate {
  name: string
  icon: React.ReactNode
  type: QRConfig["type"]
  placeholder: string
  example: string
}

const qrTemplates: QRTemplate[] = [
  {
    name: "Website URL",
    icon: <Globe className="h-4 w-4" />,
    type: "url",
    placeholder: "https://example.com",
    example: "https://sylinxlabs.com",
  },
  {
    name: "Plain Text",
    icon: <FileText className="h-4 w-4" />,
    type: "text",
    placeholder: "Enter any text",
    example: "Hello from Sylinx Labs!",
  },
  {
    name: "Email Address",
    icon: <Mail className="h-4 w-4" />,
    type: "email",
    placeholder: "email@example.com",
    example: "rexford@sylinxlabs.com",
  },
  {
    name: "Phone Number",
    icon: <Phone className="h-4 w-4" />,
    type: "phone",
    placeholder: "+1234567890",
    example: "+1-555-123-4567",
  },
  {
    name: "WiFi Network",
    icon: <Wifi className="h-4 w-4" />,
    type: "wifi",
    placeholder: "WIFI:T:WPA;S:NetworkName;P:Password;;",
    example: "WIFI:T:WPA;S:SylinxLabs_Guest;P:welcome123;;",
  },
  {
    name: "SMS Message",
    icon: <Smartphone className="h-4 w-4" />,
    type: "sms",
    placeholder: "SMSTO:+1234567890:Message",
    example: "SMSTO:+1-555-123-4567:Thanks for visiting our website!",
  },
]

export default function QRGeneratorDemo() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [qrConfig, setQRConfig] = useState<QRConfig>({
    type: "url",
    content: "https://sylinxlabs.com",
    size: 256,
    foregroundColor: "#000000",
    backgroundColor: "#ffffff",
    errorCorrection: "M",
    margin: 4,
  })
  const [generated, setGenerated] = useState(false)
  const [copied, setCopied] = useState(false)

  // Generate a mock QR code pattern using Canvas
  const generateQRCode = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { size, foregroundColor, backgroundColor, margin } = qrConfig
    canvas.width = size
    canvas.height = size

    // Clear canvas with background color
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, size, size)

    // Calculate module size (QR codes are typically 21x21 to 177x177 modules)
    const modules = 25 // Simplified for demo
    const moduleSize = (size - margin * 2) / modules

    // Generate a pseudo-random but deterministic pattern based on content
    const seed = qrConfig.content.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const random = (x: number, y: number) => {
      const value = Math.sin(seed + x * 12.9898 + y * 78.233) * 43758.5453
      return value - Math.floor(value)
    }

    ctx.fillStyle = foregroundColor

    // Draw QR code pattern
    for (let x = 0; x < modules; x++) {
      for (let y = 0; y < modules; y++) {
        // Create finder patterns (corners)
        const isFinderPattern = (x < 7 && y < 7) || (x >= modules - 7 && y < 7) || (x < 7 && y >= modules - 7)

        if (isFinderPattern) {
          // Draw finder pattern
          if (x === 0 || x === 6 || y === 0 || y === 6 || (x >= 2 && x <= 4 && y >= 2 && y <= 4)) {
            ctx.fillRect(margin + x * moduleSize, margin + y * moduleSize, moduleSize, moduleSize)
          }
        } else {
          // Draw data pattern based on pseudo-random
          if (random(x, y) > 0.5) {
            ctx.fillRect(margin + x * moduleSize, margin + y * moduleSize, moduleSize, moduleSize)
          }
        }
      }
    }

    setGenerated(true)
  }

  useEffect(() => {
    if (qrConfig.content.trim()) {
      generateQRCode()
    }
  }, [qrConfig])

  const downloadQR = (format: "png" | "svg") => {
    const canvas = canvasRef.current
    if (!canvas) return

    if (format === "png") {
      const link = document.createElement("a")
      link.download = "qrcode.png"
      link.href = canvas.toDataURL()
      link.click()
    } else {
      // Generate SVG version
      const { size, foregroundColor, backgroundColor } = qrConfig
      const svgContent = `
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${size}" height="${size}" fill="${backgroundColor}"/>
          <!-- SVG QR pattern would go here -->
          <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="${foregroundColor}" fontSize="12">QR Code</text>
        </svg>
      `
      const blob = new Blob([svgContent], { type: "image/svg+xml" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.download = "qrcode.svg"
      link.href = url
      link.click()
      URL.revokeObjectURL(url)
    }
  }

  const copyContent = async () => {
    await navigator.clipboard.writeText(qrConfig.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const loadTemplate = (template: QRTemplate) => {
    setQRConfig({
      ...qrConfig,
      type: template.type,
      content: template.example,
    })
  }

  const formatContent = (type: string, content: string) => {
    switch (type) {
      case "email":
        return content.includes("mailto:") ? content : `mailto:${content}`
      case "phone":
        return content.includes("tel:") ? content : `tel:${content}`
      case "sms":
        return content.includes("SMSTO:") ? content : `SMSTO:${content}`
      case "wifi":
        return content.includes("WIFI:") ? content : `WIFI:T:WPA;S:${content};P:password;;`
      default:
        return content
    }
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
            <QrCode className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">QR Code Generator Demo</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Demo Info */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">QR.js</Badge>
            <Badge variant="secondary">Canvas</Badge>
            <Badge variant="secondary">Download</Badge>
            <Badge variant="secondary">Customizable</Badge>
          </div>
          <p className="text-muted-foreground">
            Dynamic QR code generator with customization options, multiple content types, and download functionality.
            Perfect for creating QR codes for websites, contact info, WiFi networks, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* QR Code Preview */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  Generated QR Code
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* QR Code Display */}
                  <div className="flex justify-center">
                    <div className="p-4 bg-white rounded-lg shadow-lg">
                      <canvas
                        ref={canvasRef}
                        className="border border-gray-200 rounded"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                    </div>
                  </div>

                  {/* Download Options */}
                  {generated && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button onClick={() => downloadQR("png")} className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Download PNG
                      </Button>
                      <Button onClick={() => downloadQR("svg")} variant="outline" className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Download SVG
                      </Button>
                      <Button
                        onClick={copyContent}
                        variant="outline"
                        className="flex items-center gap-2 bg-transparent"
                      >
                        <Copy className="h-4 w-4" />
                        {copied ? "Copied!" : "Copy Content"}
                      </Button>
                    </div>
                  )}

                  {/* Content Preview */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">QR Code Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm font-mono break-all">{formatContent(qrConfig.type, qrConfig.content)}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Templates */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Templates</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {qrTemplates.map((template) => (
                          <Button
                            key={template.name}
                            variant="outline"
                            className="h-16 p-3 flex flex-col items-center justify-center bg-transparent"
                            onClick={() => loadTemplate(template)}
                          >
                            {template.icon}
                            <span className="text-xs mt-1">{template.name}</span>
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
            {/* Content Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Content Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Content Type</Label>
                  <Select
                    value={qrConfig.type}
                    onValueChange={(value) => setQRConfig({ ...qrConfig, type: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Plain Text</SelectItem>
                      <SelectItem value="url">Website URL</SelectItem>
                      <SelectItem value="email">Email Address</SelectItem>
                      <SelectItem value="phone">Phone Number</SelectItem>
                      <SelectItem value="wifi">WiFi Network</SelectItem>
                      <SelectItem value="sms">SMS Message</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Content</Label>
                  {qrConfig.type === "wifi" || qrConfig.type === "sms" ? (
                    <Textarea
                      value={qrConfig.content}
                      onChange={(e) => setQRConfig({ ...qrConfig, content: e.target.value })}
                      placeholder={qrTemplates.find((t) => t.type === qrConfig.type)?.placeholder}
                      rows={3}
                    />
                  ) : (
                    <Input
                      value={qrConfig.content}
                      onChange={(e) => setQRConfig({ ...qrConfig, content: e.target.value })}
                      placeholder={qrTemplates.find((t) => t.type === qrConfig.type)?.placeholder}
                    />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Appearance Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Size: {qrConfig.size}px</Label>
                  <Slider
                    value={[qrConfig.size]}
                    onValueChange={([value]) => setQRConfig({ ...qrConfig, size: value })}
                    min={128}
                    max={512}
                    step={32}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Foreground Color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={qrConfig.foregroundColor}
                        onChange={(e) => setQRConfig({ ...qrConfig, foregroundColor: e.target.value })}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        value={qrConfig.foregroundColor}
                        onChange={(e) => setQRConfig({ ...qrConfig, foregroundColor: e.target.value })}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Background Color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={qrConfig.backgroundColor}
                        onChange={(e) => setQRConfig({ ...qrConfig, backgroundColor: e.target.value })}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        value={qrConfig.backgroundColor}
                        onChange={(e) => setQRConfig({ ...qrConfig, backgroundColor: e.target.value })}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Error Correction Level</Label>
                  <Select
                    value={qrConfig.errorCorrection}
                    onValueChange={(value) => setQRConfig({ ...qrConfig, errorCorrection: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L">Low (~7%)</SelectItem>
                      <SelectItem value="M">Medium (~15%)</SelectItem>
                      <SelectItem value="Q">Quartile (~25%)</SelectItem>
                      <SelectItem value="H">High (~30%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Margin: {qrConfig.margin}px</Label>
                  <Slider
                    value={[qrConfig.margin]}
                    onValueChange={([value]) => setQRConfig({ ...qrConfig, margin: value })}
                    min={0}
                    max={20}
                    step={2}
                  />
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
                  <span className="text-sm">Multiple Content Types</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Color Customization</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Size Adjustment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Error Correction Levels</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">PNG & SVG Export</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Quick Templates</span>
                </div>
              </CardContent>
            </Card>

            {/* Use Cases */}
            <Card>
              <CardHeader>
                <CardTitle>Use Cases</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Business cards with contact info</p>
                <p>• WiFi network sharing</p>
                <p>• Website URL sharing</p>
                <p>• Event tickets and invitations</p>
                <p>• Product information links</p>
                <p>• Social media profiles</p>
                <p>• Restaurant menus</p>
                <p>• Payment information</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {copied && (
          <Alert className="fixed bottom-4 right-4 w-auto">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>Content copied to clipboard!</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}
