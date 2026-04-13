'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SiteHeader } from '@/components/site-header'
import { Loader2, Sparkles } from 'lucide-react'

export default function QuotePage() {
  const [projectDetails, setProjectDetails] = useState('')
  const [quote, setQuote] = useState<{ hours: number; cost: number } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerateQuote = async () => {
    if (!projectDetails.trim()) {
      setError('Please enter project details')
      return
    }

    setLoading(true)
    setError(null)
    setQuote(null)

    try {
      const response = await fetch('/api/generate-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectDetails }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate quote')
      }

      const data = await response.json()
      setQuote(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Generate Quote</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Describe your project and get an instant AI-powered quote based on estimated hours at $40/hour
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>
                Enter a detailed description of your project requirements and features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="details" className="text-sm font-medium">
                  Describe Your Project
                </label>
                <Textarea
                  id="details"
                  placeholder="e.g., I need a landing page with hero section, pricing table, contact form, and mobile responsiveness. Should include dark mode toggle..."
                  value={projectDetails}
                  onChange={(e) => setProjectDetails(e.target.value)}
                  className="min-h-32 resize-none"
                />
              </div>

              <Button
                onClick={handleGenerateQuote}
                disabled={loading}
                size="lg"
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Quote
                  </>
                )}
              </Button>

              {error && (
                <div className="bg-destructive/10 border border-destructive rounded-lg p-4 text-destructive">
                  {error}
                </div>
              )}

              {quote && (
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Estimated Hours</p>
                    <p className="text-3xl font-bold text-primary">{quote.hours.toFixed(1)} hours</p>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Total Cost (@ $40/hr)</p>
                    <p className="text-4xl font-bold">${quote.cost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
