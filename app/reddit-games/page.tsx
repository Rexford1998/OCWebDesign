import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Reddit Game Development | Rexford Ray",
  description:
    "Follow Reddit game development communities and progress updates from Rexford Ray projects.",
  keywords: [
    "Reddit game development",
    "indie game dev subreddit",
    "Rexford Ray Reddit games",
    "Orange County indie game developer",
    "game development community",
  ],
}

const redditGames = [
  {
    name: "Space Ranger",
    href: "https://www.reddit.com/r/space_ranger_69_dev/",
    tags: ["Game Dev", "Space", "Adventure"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Mar%2030%2C%202026%20at%2003_11_12%20PM-ZANyLzCu7zsheM2I72AO9alXC5UkRz.png",
  },
  {
    name: "Swamp Master 22",
    href: "https://www.reddit.com/r/swamp_master_22_dev/",
    tags: ["Game Dev", "Swamp", "Survival"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Apr%202%2C%202026%20at%2002_31_44%20AM-dWDT4iCNWeUtRKYFfmMnsxZdDjzwgN.png",
  },
  {
    name: "TinyEye 11",
    href: "https://www.reddit.com/r/tinyeye_11_dev/",
    tags: ["Game Dev", "Vision", "Indie"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Mar%2029%2C%202026%20at%2009_37_06%20PM-YWvlwSOweuZKTG3JahYHJJsbbqAcRR.png",
  },
]

export default function RedditGamesPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container mx-auto max-w-7xl py-16 px-4">
    <main className="min-h-screen bg-background py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold mb-4">Reddit Game Development</h1>
        <p className="text-muted-foreground text-lg mb-10">Dedicated page with subreddit links for each game community.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {redditGames.map((game) => (
            <Card key={game.name}>
              <CardHeader>
                <div className="w-full h-52 rounded-lg overflow-hidden border mb-4">
                  <img src={game.image} alt={`${game.name} artwork`} className="w-full h-full object-cover" />
                </div>
                <CardTitle>{game.name}</CardTitle>
                <CardDescription>Follow updates, progress logs, and community discussion.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  {game.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button asChild className="w-full">
                  <Link href={game.href} target="_blank">
                    Open Subreddit Link
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
