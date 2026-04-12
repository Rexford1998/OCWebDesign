import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Roblox Game Development | Rexford Ray",
  description:
    "Roblox game development page with direct game links and gameplay highlights from Rexford Ray projects.",
  keywords: [
    "Roblox game development",
    "Roblox developer Orange County",
    "Swamp Time Roblox",
    "multiplayer Roblox game",
    "Rexford Ray Roblox games",
  ],
}

export default function RobloxGamesPage() {
  return (
    <main className="min-h-screen bg-background py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Roblox Game Development</h1>
        <p className="text-muted-foreground text-lg mb-10">Dedicated Roblox project page with direct game link.</p>

        <Card>
          <CardHeader>
            <CardTitle>Swamp Time</CardTitle>
            <CardDescription>
              Multiplayer swamp adventure with exploration-focused gameplay on Roblox.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="secondary">Roblox</Badge>
              <Badge variant="secondary">Game Dev</Badge>
              <Badge variant="secondary">Multiplayer</Badge>
            </div>
            <Button asChild className="w-full">
              <Link href="https://www.roblox.com/games/88192934865627/Swamp-Time" target="_blank">
                Open Roblox Game Link
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
