import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code2, Sparkles, Zap, Globe, Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"

const demos = [
  {
    title: "Firebase Authentication",
    description: "Secure user signup and login system with real-time authentication",
    tech: ["Firebase", "React", "TypeScript"],
    href: "/demos/firebase-auth",
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "Lead Generation System",
    description: "Advanced form with validation, analytics, and CRM integration",
    tech: ["React Hook Form", "Zod", "Analytics"],
    href: "/demos/lead-generation",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Random Wheel Spinner",
    description: "Interactive spinning wheel for contests and decision making",
    tech: ["Canvas API", "Animations", "React"],
    href: "/demos/wheel-spinner",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Gradient Generator",
    description: "CSS gradient creator with live preview and code export",
    tech: ["CSS-in-JS", "Color Theory", "Export"],
    href: "/demos/gradient-generator",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    title: "QR Code Generator",
    description: "Dynamic QR code creation with customization options",
    tech: ["QR.js", "Canvas", "Download"],
    href: "/demos/qr-generator",
    gradient: "from-teal-500 to-blue-500",
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather data with interactive maps and forecasts",
    tech: ["Weather API", "Maps", "Charts"],
    href: "/demos/weather-dashboard",
    gradient: "from-sky-500 to-blue-500",
  },
  {
    title: "Contact Form Validation",
    description: "Multi-step form with real-time validation and email integration",
    tech: ["Multi-step", "Validation", "Email API"],
    href: "/demos/contact-form",
    gradient: "from-amber-500 to-orange-500",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-mono">Rexford Ray</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="#demos" className="text-muted-foreground hover:text-foreground transition-colors">
              Demos
            </Link>
            <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="w-24 h-24 md:w-32 md:h-32">
              <img
                src="/comptia-security-plus.svg"
                alt="CompTIA Security+ Certified"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="h-6 w-6 text-primary" />
            <Badge variant="secondary" className="text-sm">
              Orange County Web Developer
            </Badge>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Cutting-Edge Web Development
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Professional HTML websites with RESTful APIs, Twilio integration, Firebase backend, webhooks, Stripe Connect
            payments, AI ChatGPT/Anthropic integration, and SEO AMP pages. Fast delivery, innovative solutions.
          </p>
        </div>
      </section>

      {/* Live Projects Section */}
      <section id="live-projects" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Live Projects</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real-world applications currently serving users and businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-full h-80 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 mb-6 overflow-hidden border">
                  <iframe
                    src="https://kashkitchen.com"
                    className="w-full h-full border-0 rounded-lg scale-75 origin-top-left"
                    style={{ width: "133%", height: "133%" }}
                    title="Kash Kitchen Preview"
                  />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors text-2xl">
                  <Link href="https://kashkitchen.com" target="_blank" className="flex items-center gap-2">
                    Kash Kitchen
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  MEHKO platform for selling food in California. Complete e-commerce solution with vendor management,
                  payment processing, and delivery coordination for local food businesses.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary" className="text-sm">
                    E-commerce
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    Payment Processing
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    Vendor Management
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    California Food
                  </Badge>
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link href="https://kashkitchen.com" target="_blank">
                    Visit Live Site
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-full h-80 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 mb-6 overflow-hidden border">
                  <iframe
                    src="https://convoninja.org"
                    className="w-full h-full border-0 rounded-lg scale-75 origin-top-left"
                    style={{ width: "133%", height: "133%" }}
                    title="Convo Ninja Preview"
                  />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors text-2xl">
                  <Link href="https://convoninja.org" target="_blank" className="flex items-center gap-2">
                    Convo Ninja
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Interactive platform for improving social skills and conversation abilities. Features practice
                  scenarios, AI-powered feedback, and personalized learning paths for social skill development.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary" className="text-sm">
                    Social Skills
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    AI Feedback
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    Learning Platform
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    Interactive
                  </Badge>
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link href="https://convoninja.org" target="_blank">
                    Visit Live Site
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-full h-80 rounded-lg bg-gradient-to-br from-green-500 to-teal-500 mb-6 overflow-hidden border">
                  <iframe
                    src="https://v0-myisotopetracker-website.vercel.app"
                    className="w-full h-full border-0 rounded-lg scale-75 origin-top-left"
                    style={{ width: "133%", height: "133%" }}
                    title="myIsotopeTracker Preview"
                  />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors text-2xl">
                  <Link
                    href="https://v0-myisotopetracker-website.vercel.app"
                    target="_blank"
                    className="flex items-center gap-2"
                  >
                    myIsotopeTracker
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Medical transportation and logistics tracking platform. Comprehensive solution for tracking medical
                  isotopes, managing delivery schedules, and ensuring compliance with healthcare regulations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary" className="text-sm">
                    Medical Logistics
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    Real-time Tracking
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    Compliance
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    Healthcare
                  </Badge>
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link href="https://v0-myisotopetracker-website.vercel.app" target="_blank">
                    Visit Live Site
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-full h-80 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 mb-6 overflow-hidden border">
                  <iframe
                    src="https://abtesting.me"
                    className="w-full h-full border-0 rounded-lg scale-75 origin-top-left"
                    style={{ width: "133%", height: "133%" }}
                    title="ABTesting.me Preview"
                  />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors text-2xl">
                  <Link href="https://abtesting.me" target="_blank" className="flex items-center gap-2">
                    ABTesting.me
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Real-world A/B testing platform where users compare two photos with variations to get crowd feedback.
                  Perfect for testing new designs, hairstyles, product photos, or marketing concepts with community
                  input.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary" className="text-sm">
                    A/B Testing
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    Crowd Feedback
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    Photo Comparison
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    Community
                  </Badge>
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link href="https://abtesting.me" target="_blank">
                    Visit Live Site
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-full h-80 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 mb-6 overflow-hidden border">
                  <iframe
                    src="https://v0-tensorflow-sketch-learner.vercel.app/"
                    className="w-full h-full border-0 rounded-lg scale-75 origin-top-left"
                    style={{ width: "133%", height: "133%" }}
                    title="TensorFlow Sketch Learner Preview"
                  />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors text-2xl">
                  <Link
                    href="https://v0-tensorflow-sketch-learner.vercel.app/"
                    target="_blank"
                    className="flex items-center gap-2"
                  >
                    TensorFlow Sketch Learner
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  AI-powered sketch recognition platform using TensorFlow.js. Interactive machine learning application
                  that learns from user drawings and provides real-time feedback for educational and creative purposes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary" className="text-sm">
                    TensorFlow.js
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    Machine Learning
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    AI Recognition
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    Interactive
                  </Badge>
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link href="https://v0-tensorflow-sketch-learner.vercel.app/" target="_blank">
                    Visit Live Site
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mobile App Store Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Mobile Development</h2>
            <p className="text-xl text-muted-foreground">SwiftUI and iOS app development expertise</p>
          </div>

          <Card className="group hover:shadow-lg transition-all duration-300 max-w-2xl mx-auto">
            <CardHeader>
              <div className="w-full h-96 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 mb-6 overflow-hidden border flex items-center justify-center">
                <img
                  src="/app-store-screenshot.png"
                  alt="Kash Kitchen App Store Page"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <CardTitle className="group-hover:text-primary transition-colors text-2xl text-center">
                <Link
                  href="https://apps.apple.com/us/app/kash-kitchen/id6739987474"
                  target="_blank"
                  className="flex items-center justify-center gap-2"
                >
                  Kash Kitchen Mobile App
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </CardTitle>
              <CardDescription className="text-base leading-relaxed text-center">
                Native iOS application built with SwiftUI for the Kash Kitchen platform. Features seamless mobile
                ordering, real-time order tracking, push notifications, and optimized user experience for food delivery
                on mobile devices.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-6 justify-center">
                <Badge variant="secondary" className="text-sm">
                  SwiftUI
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  iOS Development
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  Mobile UX/UI
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  Push Notifications
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  Real-time Updates
                </Badge>
              </div>
              <div className="text-center space-y-4">
                <p className="text-muted-foreground text-sm">
                  Demonstrates expertise in native iOS development, SwiftUI framework, mobile app architecture, App
                  Store deployment, and creating seamless mobile experiences that complement web platforms.
                </p>
                <Button asChild className="w-full" size="lg">
                  <Link href="https://apps.apple.com/us/app/kash-kitchen/id6739987474" target="_blank">
                    View on App Store
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Demo Projects Section */}
      <section id="demos" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Interactive Demo Projects</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore real-world examples showcasing modern web technologies and innovative solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demos.map((demo, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm"
              >
                <CardHeader>
                  <div
                    className={`w-full h-32 rounded-lg bg-gradient-to-br ${demo.gradient} mb-4 flex items-center justify-center`}
                  >
                    <Globe className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">{demo.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{demo.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {demo.tech.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button asChild className="w-full group-hover:bg-primary/90 transition-colors">
                    <Link href={demo.href}>
                      View Demo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Sylinx Labs?</h2>
            <p className="text-xl text-muted-foreground">
              We specialize in rapid adoption of cutting-edge technologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Quick turnaround times with modern development practices and AI-assisted coding
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cutting Edge</h3>
              <p className="text-muted-foreground">
                Latest technologies including AI integration, modern frameworks, and advanced APIs
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Orange County Local</h3>
              <p className="text-muted-foreground">
                Based in OC, providing personalized service and understanding of local business needs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let's discuss how we can bring your vision to life with modern web technologies
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-5 w-5" />
              <span>rexford@sylinxlabs.com</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-5 w-5" />
              <span>949.447.7571</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <span>Orange County, CA</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
            <Zap className="h-5 w-5" />
            <span className="font-medium">Available 24/7 - Always Ready to Help</span>
          </div>

          <Button size="lg" asChild>
            <Link href="mailto:rexford@sylinxlabs.com">
              Get In Touch
              <Mail className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 Rexford Ray - Sylinx Labs. Professional web development services in Orange County.</p>
        </div>
      </footer>
    </div>
  )
}
