"use client"

import { useEffect } from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Users, Mail, Building, CheckCircle, TrendingUp, Target, BarChart3 } from "lucide-react"
import Link from "next/link"

// Form validation schema
const leadSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  company: z.string().min(2, "Company name is required"),
  jobTitle: z.string().min(2, "Job title is required"),
  industry: z.string().min(1, "Please select an industry"),
  companySize: z.string().min(1, "Please select company size"),
  budget: z.string().min(1, "Please select a budget range"),
  timeline: z.string().min(1, "Please select a timeline"),
  projectType: z.array(z.string()).min(1, "Please select at least one project type"),
  message: z.string().min(10, "Please provide more details about your project"),
  newsletter: z.boolean().optional(),
})

type LeadFormData = z.infer<typeof leadSchema>

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "E-commerce",
  "Education",
  "Real Estate",
  "Manufacturing",
  "Consulting",
  "Other",
]

const companySizes = ["1-10", "11-50", "51-200", "201-1000", "1000+"]

const budgetRanges = ["$5K-$15K", "$15K-$50K", "$50K-$100K", "$100K+", "Not sure"]

const timelines = ["ASAP", "1-3 months", "3-6 months", "6+ months", "Just exploring"]

const projectTypes = [
  "Website Development",
  "E-commerce Platform",
  "Web Application",
  "Mobile App",
  "AI Integration",
  "Database Design",
  "API Development",
  "Maintenance & Support",
]

export default function LeadGenerationDemo() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [leadScore, setLeadScore] = useState(0)
  const [analytics, setAnalytics] = useState({
    formViews: 1247,
    submissions: 89,
    conversionRate: 7.1,
    avgLeadScore: 72,
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      projectType: [],
      newsletter: false,
    },
  })

  const watchedFields = watch()

  // Calculate lead score based on form data
  const calculateLeadScore = (data: Partial<LeadFormData>) => {
    let score = 0

    // Budget scoring
    if (data.budget === "$100K+") score += 30
    else if (data.budget === "$50K-$100K") score += 25
    else if (data.budget === "$15K-$50K") score += 20
    else if (data.budget === "$5K-$15K") score += 15

    // Timeline scoring
    if (data.timeline === "ASAP") score += 25
    else if (data.timeline === "1-3 months") score += 20
    else if (data.timeline === "3-6 months") score += 15
    else if (data.timeline === "6+ months") score += 10

    // Company size scoring
    if (data.companySize === "1000+") score += 20
    else if (data.companySize === "201-1000") score += 15
    else if (data.companySize === "51-200") score += 12
    else if (data.companySize === "11-50") score += 8
    else if (data.companySize === "1-10") score += 5

    // Project type scoring
    const highValueTypes = ["AI Integration", "Web Application", "E-commerce Platform"]
    const selectedHighValue = data.projectType?.filter((type) => highValueTypes.includes(type)) || []
    score += selectedHighValue.length * 10

    // Industry scoring
    const highValueIndustries = ["Technology", "Finance", "Healthcare"]
    if (data.industry && highValueIndustries.includes(data.industry)) score += 15

    return Math.min(score, 100)
  }

  // Update lead score when form changes
  useEffect(() => {
    const score = calculateLeadScore(watchedFields)
    setLeadScore(score)
  }, [watchedFields])

  const onSubmit = async (data: LeadFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate analytics tracking
    setAnalytics((prev) => ({
      ...prev,
      submissions: prev.submissions + 1,
      conversionRate: ((prev.submissions + 1) / prev.formViews) * 100,
    }))

    setIsSubmitted(true)
  }

  const getLeadQuality = (score: number) => {
    if (score >= 80) return { label: "Hot Lead", color: "text-red-500", bg: "bg-red-50" }
    if (score >= 60) return { label: "Warm Lead", color: "text-orange-500", bg: "bg-orange-50" }
    if (score >= 40) return { label: "Cold Lead", color: "text-blue-500", bg: "bg-blue-50" }
    return { label: "Low Quality", color: "text-gray-500", bg: "bg-gray-50" }
  }

  if (isSubmitted) {
    const quality = getLeadQuality(leadScore)
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Portfolio
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">Lead Generation System</h1>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-2xl text-center">
          <Card>
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <CardTitle className="text-2xl">Thank You!</CardTitle>
              <CardDescription>Your information has been successfully submitted</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg ${quality.bg}`}>
                  <p className="text-sm text-muted-foreground">Lead Score</p>
                  <p className={`text-2xl font-bold ${quality.color}`}>{leadScore}/100</p>
                </div>
                <div className={`p-4 rounded-lg ${quality.bg}`}>
                  <p className="text-sm text-muted-foreground">Quality</p>
                  <p className={`text-lg font-semibold ${quality.color}`}>{quality.label}</p>
                </div>
              </div>
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  We'll review your requirements and get back to you within 24 hours with a detailed proposal.
                </AlertDescription>
              </Alert>
              <Button asChild>
                <Link href="/">Return to Portfolio</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
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
            <Users className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Lead Generation System Demo</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Demo Info */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">React Hook Form</Badge>
            <Badge variant="secondary">Zod Validation</Badge>
            <Badge variant="secondary">Analytics</Badge>
            <Badge variant="secondary">Lead Scoring</Badge>
          </div>
          <p className="text-muted-foreground">
            Advanced lead generation form with real-time validation, lead scoring, and analytics tracking. Features
            multi-field validation, conditional logic, and automated lead qualification.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Get Your Free Web Development Quote</CardTitle>
                <CardDescription>
                  Tell us about your project and we'll provide a detailed proposal within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          {...register("firstName")}
                          placeholder="John"
                          className={errors.firstName ? "border-red-500" : ""}
                        />
                        {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          {...register("lastName")}
                          placeholder="Doe"
                          className={errors.lastName ? "border-red-500" : ""}
                        />
                        {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register("email")}
                          placeholder="john@company.com"
                          className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                          id="phone"
                          {...register("phone")}
                          placeholder="(555) 123-4567"
                          className={errors.phone ? "border-red-500" : ""}
                        />
                        {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Company Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      Company Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company *</Label>
                        <Input
                          id="company"
                          {...register("company")}
                          placeholder="Acme Corp"
                          className={errors.company ? "border-red-500" : ""}
                        />
                        {errors.company && <p className="text-sm text-red-500">{errors.company.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="jobTitle">Job Title *</Label>
                        <Input
                          id="jobTitle"
                          {...register("jobTitle")}
                          placeholder="CEO"
                          className={errors.jobTitle ? "border-red-500" : ""}
                        />
                        {errors.jobTitle && <p className="text-sm text-red-500">{errors.jobTitle.message}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="industry">Industry *</Label>
                        <Select onValueChange={(value) => setValue("industry", value)}>
                          <SelectTrigger className={errors.industry ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            {industries.map((industry) => (
                              <SelectItem key={industry} value={industry}>
                                {industry}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.industry && <p className="text-sm text-red-500">{errors.industry.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="companySize">Company Size *</Label>
                        <Select onValueChange={(value) => setValue("companySize", value)}>
                          <SelectTrigger className={errors.companySize ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            {companySizes.map((size) => (
                              <SelectItem key={size} value={size}>
                                {size} employees
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.companySize && <p className="text-sm text-red-500">{errors.companySize.message}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Project Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Project Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="budget">Budget Range *</Label>
                        <Select onValueChange={(value) => setValue("budget", value)}>
                          <SelectTrigger className={errors.budget ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select budget" />
                          </SelectTrigger>
                          <SelectContent>
                            {budgetRanges.map((budget) => (
                              <SelectItem key={budget} value={budget}>
                                {budget}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.budget && <p className="text-sm text-red-500">{errors.budget.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timeline">Timeline *</Label>
                        <Select onValueChange={(value) => setValue("timeline", value)}>
                          <SelectTrigger className={errors.timeline ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            {timelines.map((timeline) => (
                              <SelectItem key={timeline} value={timeline}>
                                {timeline}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.timeline && <p className="text-sm text-red-500">{errors.timeline.message}</p>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Project Type * (Select all that apply)</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {projectTypes.map((type) => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox
                              id={type}
                              onCheckedChange={(checked) => {
                                const current = watchedFields.projectType || []
                                if (checked) {
                                  setValue("projectType", [...current, type])
                                } else {
                                  setValue(
                                    "projectType",
                                    current.filter((t) => t !== type),
                                  )
                                }
                              }}
                            />
                            <Label htmlFor={type} className="text-sm">
                              {type}
                            </Label>
                          </div>
                        ))}
                      </div>
                      {errors.projectType && <p className="text-sm text-red-500">{errors.projectType.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Project Description *</Label>
                      <Textarea
                        id="message"
                        {...register("message")}
                        placeholder="Tell us more about your project requirements, goals, and any specific features you need..."
                        rows={4}
                        className={errors.message ? "border-red-500" : ""}
                      />
                      {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
                    </div>
                  </div>

                  {/* Newsletter */}
                  <div className="flex items-center space-x-2">
                    <Checkbox id="newsletter" {...register("newsletter")} />
                    <Label htmlFor="newsletter" className="text-sm">
                      Subscribe to our newsletter for web development tips and updates
                    </Label>
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Get My Free Quote"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Lead Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Lead Score
                </CardTitle>
                <CardDescription>Real-time qualification based on your responses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{leadScore}/100</span>
                    <Badge variant={leadScore >= 60 ? "default" : "secondary"}>{getLeadQuality(leadScore).label}</Badge>
                  </div>
                  <Progress value={leadScore} className="w-full" />
                  <div className="text-sm text-muted-foreground">
                    <p>Score factors:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Budget range (30 pts max)</li>
                      <li>Timeline urgency (25 pts max)</li>
                      <li>Company size (20 pts max)</li>
                      <li>Project complexity (25 pts max)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Form Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{analytics.formViews}</p>
                      <p className="text-sm text-muted-foreground">Views</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-500">{analytics.submissions}</p>
                      <p className="text-sm text-muted-foreground">Submissions</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-accent">{analytics.conversionRate.toFixed(1)}%</p>
                    <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold">{analytics.avgLeadScore}</p>
                    <p className="text-sm text-muted-foreground">Avg Lead Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Demo Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Advanced Form Validation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Real-time Lead Scoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Analytics Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Multi-field Validation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Responsive Design</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
