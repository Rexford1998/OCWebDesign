import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code2, Sparkles, Zap, Globe, Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"

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

      {/* Live Projects Section */}
      <section id="live-projects" className="py-20 px-4 bg-muted/30">
        <div className="flex items-center justify-center gap-2 mb-10">
          <Sparkles className="h-6 w-6 text-primary" />
          <Badge variant="secondary" className="text-sm">
            Orange County Web Developer
          </Badge>
        </div>
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

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-full h-80 rounded-lg bg-gradient-to-br from-amber-500 to-pink-500 mb-6 overflow-hidden border">
                  <iframe
                    src="https://v0-mathematical-board-game.vercel.app"
                    className="w-full h-full border-0 rounded-lg scale-75 origin-top-left"
                    style={{ width: "133%", height: "133%" }}
                    title="Mathematical Board Game Preview"
                  />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors text-2xl">
                  <Link
                    href="https://v0-mathematical-board-game.vercel.app"
                    target="_blank"
                    className="flex items-center gap-2"
                  >
                    Math Board Game
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Interactive mathematical board game designed for children. Features AI-powered bots as opponents,
                  colorful animations, and engaging gameplay to make learning math fun and educational.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary" className="text-sm">
                    React
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    AI Bots
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    Kids Education
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    Animations
                  </Badge>
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link href="https://v0-mathematical-board-game.vercel.app" target="_blank">
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
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Mobile Development</h2>
            <p className="text-xl text-muted-foreground">SwiftUI and iOS app development expertise</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-full h-64 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 mb-6 overflow-hidden border flex items-center justify-center">
                  <img
                    src="/app-store-screenshot.png"
                    alt="Kash Kitchen App Store Page"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors text-2xl">
                  <Link
                    href="https://apps.apple.com/us/app/kash-kitchen/id6739987474"
                    target="_blank"
                    className="flex items-center gap-2"
                  >
                    Kash Kitchen
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Native iOS application built with SwiftUI for the Kash Kitchen platform. Features seamless mobile
                  ordering, real-time order tracking, push notifications, and optimized user experience for food delivery.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary" className="text-sm">SwiftUI</Badge>
                  <Badge variant="secondary" className="text-sm">iOS Development</Badge>
                  <Badge variant="secondary" className="text-sm">Food Delivery</Badge>
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link href="https://apps.apple.com/us/app/kash-kitchen/id6739987474" target="_blank">
                    View on App Store
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-full h-64 rounded-lg bg-gradient-to-br from-blue-500 to-teal-500 mb-6 overflow-hidden border flex items-center justify-center">
                  <Globe className="h-24 w-24 text-white" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors text-2xl">
                  <Link
                    href="https://apps.apple.com/us/app/geosnap-4-clues-1-continent/id6761042906"
                    target="_blank"
                    className="flex items-center gap-2"
                  >
                    GeoSnap: 4 Clues 1 Continent
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Fun geography trivia game where players guess the continent based on 4 visual clues. Educational and entertaining mobile game built with SwiftUI for all ages.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary" className="text-sm">SwiftUI</Badge>
                  <Badge variant="secondary" className="text-sm">Trivia Game</Badge>
                  <Badge variant="secondary" className="text-sm">Geography</Badge>
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link href="https://apps.apple.com/us/app/geosnap-4-clues-1-continent/id6761042906" target="_blank">
                    View on App Store
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reddit Games Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Reddit Game Development</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Follow the development journey of our games on Reddit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-full h-48 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 mb-6 flex items-center justify-center">
                  <svg className="h-20 w-20 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                  </svg>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors text-2xl">
                  <Link href="https://www.reddit.com/r/space_ranger_69_dev/" target="_blank" className="flex items-center gap-2">
                    Space Ranger 69
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Follow the development of Space Ranger 69, an exciting space adventure game. Join the community for updates, sneak peeks, and development discussions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary" className="text-sm">Game Dev</Badge>
                  <Badge variant="secondary" className="text-sm">Space</Badge>
                  <Badge variant="secondary" className="text-sm">Adventure</Badge>
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link href="https://www.reddit.com/r/space_ranger_69_dev/" target="_blank">
                    Join Subreddit
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-full h-48 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 mb-6 flex items-center justify-center">
                  <svg className="h-20 w-20 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                  </svg>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors text-2xl">
                  <Link href="https://www.reddit.com/r/swamp_master_22_dev/" target="_blank" className="flex items-center gap-2">
                    Swamp Master 22
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Dive into the development of Swamp Master 22, a unique swamp-themed game. Get behind-the-scenes content, development logs, and community feedback.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary" className="text-sm">Game Dev</Badge>
                  <Badge variant="secondary" className="text-sm">Swamp</Badge>
                  <Badge variant="secondary" className="text-sm">Survival</Badge>
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link href="https://www.reddit.com/r/swamp_master_22_dev/" target="_blank">
                    Join Subreddit
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-full h-48 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 mb-6 flex items-center justify-center">
                  <svg className="h-20 w-20 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                  </svg>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors text-2xl">
                  <Link href="https://www.reddit.com/r/tinyeye_11_dev/" target="_blank" className="flex items-center gap-2">
                    TinyEye 11
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Explore the creation of TinyEye 11, an innovative vision-based game. Follow along for gameplay reveals, art updates, and development milestones.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary" className="text-sm">Game Dev</Badge>
                  <Badge variant="secondary" className="text-sm">Vision</Badge>
                  <Badge variant="secondary" className="text-sm">Indie</Badge>
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link href="https://www.reddit.com/r/tinyeye_11_dev/" target="_blank">
                    Join Subreddit
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-full h-48 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 mb-6 flex items-center justify-center">
                  <svg className="h-20 w-20 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                  </svg>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors text-2xl">
                  <Link href="https://www.reddit.com/r/collect_karma_dev/" target="_blank" className="flex items-center gap-2">
                    Collect Karma
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Join the Collect Karma community and experience a unique 3D modeling corral game. Follow development updates, share ideas, and be part of the creative process.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary" className="text-sm">Game Dev</Badge>
                  <Badge variant="secondary" className="text-sm">3D Modeling</Badge>
                  <Badge variant="secondary" className="text-sm">Corral</Badge>
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link href="https://www.reddit.com/r/collect_karma_dev/" target="_blank">
                    Join Subreddit
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-full h-48 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 mb-6 flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Apr%201%2C%202026%20at%2009_10_44%20PM-7GG5toYFuG8Lb45wXSvoEMl8hbaDp2.png"
                    alt="Kitty Crush mascot"
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors text-2xl">
                  <Link href="https://www.reddit.com/r/kitty_crush_1_dev/" target="_blank" className="flex items-center gap-2">
                    Kitty Crush
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Discover Kitty Crush, an adorable candy crush-style game. Join the community for updates, gameplay tips, and development insights into this fun puzzle game.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary" className="text-sm">Game Dev</Badge>
                  <Badge variant="secondary" className="text-sm">Puzzle</Badge>
                  <Badge variant="secondary" className="text-sm">Casual</Badge>
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link href="https://www.reddit.com/r/kitty_crush_1_dev/" target="_blank">
                    Join Subreddit
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Roblox Games Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Roblox Game Development</h2>
            <p className="text-xl text-muted-foreground">Immersive gaming experiences on the Roblox platform</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-full h-48 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Apr%202%2C%202026%20at%2002_33_03%20AM-45J2UCAvg4qbo2exLxqFstnO9VmzZl.png"
                    alt="Swamp Time game artwork"
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors text-2xl">
                  <Link href="https://www.roblox.com/games/88192934865627/Swamp-Time" target="_blank" className="flex items-center gap-2">
                    Swamp Time
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  An immersive Roblox game set in a swamp environment. Experience adventure and exploration in this multiplayer world with engaging gameplay and unique mechanics.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary" className="text-sm">Roblox</Badge>
                  <Badge variant="secondary" className="text-sm">Game Dev</Badge>
                  <Badge variant="secondary" className="text-sm">Multiplayer</Badge>
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link href="https://www.roblox.com/games/88192934865627/Swamp-Time" target="_blank">
                    Play on Roblox
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing & Services Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Cutting-Edge Web Development</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Professional HTML websites with RESTful APIs, Twilio integration, Firebase backend, webhooks, Stripe Connect payments, AI ChatGPT/Anthropic integration, and SEO AMP pages. Fast delivery, innovative solutions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
            <div className="flex items-center gap-3 bg-primary/10 border border-primary/20 rounded-xl px-8 py-5">
              <span className="text-4xl font-bold text-primary">$40</span>
              <span className="text-lg text-muted-foreground">/hour</span>
            </div>
            <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-xl px-8 py-5">
              <Sparkles className="h-6 w-6 text-green-500" />
              <span className="text-lg font-semibold text-green-600 dark:text-green-400">Free Quotes</span>
            </div>
          </div>

          <Button asChild size="lg" className="text-lg px-10 py-6">
            <Link href="#contact">
              Get Your Free Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-muted/30">
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
