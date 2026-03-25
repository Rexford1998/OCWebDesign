"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Upload, X } from "lucide-react"

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  subject: string
  message: string
  budget: string
  timeline: string
  services: string[]
  newsletter: boolean
  file: File | null
}

interface FormErrors {
  [key: string]: string
}

const serviceOptions = [
  "Web Development",
  "Mobile App Development",
  "E-commerce Solutions",
  "UI/UX Design",
  "SEO Optimization",
  "Digital Marketing",
]

export default function ContactForm() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    budget: "",
    timeline: "",
    services: [],
    newsletter: false,
    file: null,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const validateField = (name: string, value: any): string => {
    switch (name) {
      case "firstName":
      case "lastName":
        return value.trim() === "" ? "This field is required" : ""
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (value.trim() === "") return "Email is required"
        if (!emailRegex.test(value)) return "Please enter a valid email address"
        return ""
      case "phone":
        const phoneRegex = /^\+?[\d\s\-$$$$]{10,}$/
        if (value.trim() === "") return "Phone number is required"
        if (!phoneRegex.test(value)) return "Please enter a valid phone number"
        return ""
      case "subject":
        return value.trim() === "" ? "Subject is required" : ""
      case "message":
        if (value.trim() === "") return "Message is required"
        if (value.trim().length < 10) return "Message must be at least 10 characters"
        return ""
      default:
        return ""
    }
  }

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Real-time validation
    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    if (file && file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, file: "File size must be less than 5MB" }))
      return
    }
    setFormData((prev) => ({ ...prev, file }))
    setErrors((prev) => ({ ...prev, file: "" }))
  }

  const removeFile = () => {
    setFormData((prev) => ({ ...prev, file: null }))
  }

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, "")
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`
    }
    return value
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    Object.keys(formData).forEach((key) => {
      if (key !== "services" && key !== "newsletter" && key !== "file") {
        const error = validateField(key, formData[key as keyof FormData])
        if (error) newErrors[key] = error
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus("idle")

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate random success/failure for demo
      if (Math.random() > 0.2) {
        setSubmitStatus("success")
        // Reset form on success
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          subject: "",
          message: "",
          budget: "",
          timeline: "",
          services: [],
          newsletter: false,
          file: null,
        })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Contact Form</h1>
          <p className="text-gray-600">Advanced form validation and submission handling</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="text-cyan-600" size={20} />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-gray-600">rexford@sylinxlabs.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-cyan-600" size={20} />
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-sm text-gray-600">(714) 555-0123</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-cyan-600" size={20} />
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-sm text-gray-600">Orange County, CA</div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Business Hours</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>Monday - Friday: 9:00 AM - 6:00 PM</div>
                    <div>Saturday: 10:00 AM - 4:00 PM</div>
                    <div>Sunday: Closed</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className={errors.firstName ? "border-red-500" : ""}
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className={errors.lastName ? "border-red-500" : ""}
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => {
                          const formatted = formatPhone(e.target.value)
                          handleInputChange("phone", formatted)
                        }}
                        placeholder="(555) 123-4567"
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      className={errors.subject ? "border-red-500" : ""}
                    />
                    {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                  </div>

                  {/* Budget and Timeline */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="budget">Budget Range</Label>
                      <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-5k">Under $5,000</SelectItem>
                          <SelectItem value="5k-15k">$5,000 - $15,000</SelectItem>
                          <SelectItem value="15k-50k">$15,000 - $50,000</SelectItem>
                          <SelectItem value="over-50k">Over $50,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="timeline">Project Timeline</Label>
                      <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asap">ASAP</SelectItem>
                          <SelectItem value="1-3-months">1-3 months</SelectItem>
                          <SelectItem value="3-6-months">3-6 months</SelectItem>
                          <SelectItem value="6-plus-months">6+ months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Services */}
                  <div>
                    <Label>Services Needed</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {serviceOptions.map((service) => (
                        <div key={service} className="flex items-center space-x-2">
                          <Checkbox
                            id={service}
                            checked={formData.services.includes(service)}
                            onCheckedChange={() => handleServiceToggle(service)}
                          />
                          <Label htmlFor={service} className="text-sm">
                            {service}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* File Upload */}
                  <div>
                    <Label htmlFor="file">Attach File (Optional)</Label>
                    <div className="mt-2">
                      {formData.file ? (
                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                          <Upload size={16} />
                          <span className="text-sm flex-1">{formData.file.name}</span>
                          <Button type="button" variant="ghost" size="sm" onClick={removeFile}>
                            <X size={16} />
                          </Button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Upload className="mx-auto text-gray-400 mb-2" size={24} />
                          <div className="text-sm text-gray-600 mb-2">Drop files here or click to upload</div>
                          <input
                            type="file"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="file-upload"
                            accept=".pdf,.doc,.docx,.txt,.jpg,.png"
                          />
                          <Button type="button" variant="outline" size="sm" asChild>
                            <label htmlFor="file-upload" className="cursor-pointer">
                              Choose File
                            </label>
                          </Button>
                          <div className="text-xs text-gray-500 mt-1">Max file size: 5MB</div>
                        </div>
                      )}
                      {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className={errors.message ? "border-red-500" : ""}
                      placeholder="Tell us about your project..."
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>

                  {/* Newsletter */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="newsletter"
                      checked={formData.newsletter}
                      onCheckedChange={(checked) => handleInputChange("newsletter", checked)}
                    />
                    <Label htmlFor="newsletter" className="text-sm">
                      Subscribe to our newsletter for updates and tips
                    </Label>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-cyan-600 hover:bg-cyan-700">
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send size={16} className="mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>

                  {/* Status Messages */}
                  {submitStatus === "success" && (
                    <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                      <CheckCircle size={20} />
                      <span>Message sent successfully! We'll get back to you soon.</span>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                      <AlertCircle size={20} />
                      <span>Failed to send message. Please try again or contact us directly.</span>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Demo Info */}
        <Card className="mt-8 border-cyan-200 bg-cyan-50">
          <CardContent className="p-6">
            <h3 className="font-semibold text-cyan-900 mb-2">Demo Features</h3>
            <ul className="text-sm text-cyan-800 space-y-1">
              <li>• Real-time form validation with custom error messages</li>
              <li>• Advanced input formatting (phone numbers, email validation)</li>
              <li>• File upload with size validation and preview</li>
              <li>• Multi-select checkboxes and dropdown selections</li>
              <li>• Form submission with loading states and feedback</li>
              <li>• Professional contact form design with accessibility features</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
