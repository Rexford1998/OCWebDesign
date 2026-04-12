import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Mobile Development | Rexford Ray",
  description:
    "SwiftUI and iOS mobile app development portfolio by Rexford Ray in Orange County, including App Store projects and direct site links.",
  keywords: [
    "mobile development Orange County",
    "iOS app developer Orange County",
    "SwiftUI developer California",
    "Rexford Ray mobile apps",
    "App Store app development",
  ],
}

export default function MobileDevelopmentPage() {
  return (
    <main className="min-h-screen bg-background py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold mb-4">Mobile Development</h1>
        <p className="text-muted-foreground text-lg mb-10">SwiftUI and iOS app development expertise with direct App Store links.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Kash Kitchen</CardTitle>
              <CardDescription>Native iOS ordering app built in SwiftUI.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary">SwiftUI</Badge>
                <Badge variant="secondary">iOS Development</Badge>
                <Badge variant="secondary">Food Delivery</Badge>
              </div>
              <Button asChild className="w-full">
                <Link href="https://apps.apple.com/us/app/kash-kitchen/id6739987474" target="_blank">
                  Visit App Store Link
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>GeoSnap: 4 Clues 1 Continent</CardTitle>
              <CardDescription>Educational geography trivia game built with SwiftUI.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary">SwiftUI</Badge>
                <Badge variant="secondary">Trivia Game</Badge>
                <Badge variant="secondary">Geography</Badge>
              </div>
              <Button asChild className="w-full">
                <Link href="https://apps.apple.com/us/app/geosnap-4-clues-1-continent/id6761042906" target="_blank">
                  Visit App Store Link
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
