import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Pricing | Rexford Ray",
  description:
    "Web development pricing page for Rexford Ray with hourly rate, free quotes, and direct contact links.",
  keywords: [
    "web development pricing Orange County",
    "Rexford Ray pricing",
    "website development hourly rate",
    "free web development quote",
    "SEO web developer pricing",
  ],
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background py-16 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold mb-6">Pricing</h1>
        <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
          Transparent pricing for modern websites, APIs, AI integrations, and full-stack development.
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

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="text-lg px-10 py-6">
            <Link href="mailto:rexford@sylinxlabs.com">
              Request Site Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-10 py-6">
            <Link href="https://ocwebdesign.tech" target="_blank">
              Visit Main Site Link
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
