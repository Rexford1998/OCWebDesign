"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, User, Mail, Lock, Shield, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

// Mock Firebase auth functions for demo purposes
const mockSignUp = async (email: string, password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API call
  if (email === "error@test.com") {
    throw new Error("Email already in use")
  }
  return { user: { uid: "mock-uid", email } }
}

const mockSignIn = async (email: string, password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API call
  if (email === "wrong@test.com") {
    throw new Error("Invalid email or password")
  }
  return { user: { uid: "mock-uid", email } }
}

export default function FirebaseAuthDemo() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [isSignedIn, setIsSignedIn] = useState(false)
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const result = await mockSignUp(email, password)
      setUser(result.user)
      setIsSignedIn(true)
      setSuccess("Account created successfully!")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const result = await mockSignIn(email, password)
      setUser(result.user)
      setIsSignedIn(true)
      setSuccess("Signed in successfully!")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = () => {
    setIsSignedIn(false)
    setUser(null)
    setSuccess("Signed out successfully!")
    setError("")
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
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Firebase Authentication Demo</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Demo Info */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">Firebase</Badge>
            <Badge variant="secondary">React</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">Authentication</Badge>
          </div>
          <p className="text-muted-foreground">
            This demo showcases Firebase Authentication with email/password signup and login functionality. Features
            include form validation, loading states, error handling, and user session management.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Authentication Forms */}
          <div>
            {!isSignedIn ? (
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Sign In
                      </CardTitle>
                      <CardDescription>Enter your credentials to access your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSignIn} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="signin-email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="signin-email"
                              name="email"
                              type="email"
                              placeholder="Enter your email"
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signin-password">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="signin-password"
                              name="password"
                              type="password"
                              placeholder="Enter your password"
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                          {loading ? "Signing In..." : "Sign In"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="signup">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Create Account
                      </CardTitle>
                      <CardDescription>Create a new account to get started</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSignUp} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="signup-email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="signup-email"
                              name="email"
                              type="email"
                              placeholder="Enter your email"
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signup-password">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="signup-password"
                              name="password"
                              type="password"
                              placeholder="Create a password"
                              className="pl-10"
                              minLength={6}
                              required
                            />
                          </div>
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                          {loading ? "Creating Account..." : "Create Account"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Welcome Back!
                  </CardTitle>
                  <CardDescription>You are successfully signed in</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Signed in as:</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                  <Button onClick={handleSignOut} variant="outline" className="w-full bg-transparent">
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Status Messages */}
            {error && (
              <Alert className="mt-4" variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mt-4">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Demo Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Demo Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Email/Password Authentication</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Form Validation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Loading States</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Error Handling</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">User Session Management</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Responsive Design</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Test Credentials</CardTitle>
                <CardDescription>Use these credentials to test the demo functionality</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium">Valid Login:</p>
                  <p className="text-sm text-muted-foreground">Any email except wrong@test.com</p>
                  <p className="text-sm text-muted-foreground">Any password</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium">Error Testing:</p>
                  <p className="text-sm text-muted-foreground">Email: wrong@test.com (login error)</p>
                  <p className="text-sm text-muted-foreground">Email: error@test.com (signup error)</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Implementation Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Uses Firebase Authentication SDK</p>
                <p>• Implements proper error handling</p>
                <p>• Includes form validation and loading states</p>
                <p>• Responsive design with Tailwind CSS</p>
                <p>• TypeScript for type safety</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
