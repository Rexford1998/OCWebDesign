import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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
  },
  {
    name: "Swamp Master 22",
    href: "https://www.reddit.com/r/swamp_master_22_dev/",
    tags: ["Game Dev", "Swamp", "Survival"],
  },
  {
    name: "TinyEye 11",
    href: "https://www.reddit.com/r/tinyeye_11_dev/",
    tags: ["Game Dev", "Vision", "Indie"],
  },
]

export default function RedditGamesPage() {
  return (
    <main className="min-h-screen bg-background py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold mb-4">Reddit Game Development</h1>
        <p className="text-muted-foreground text-lg mb-10">Dedicated page with subreddit links for each game community.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {redditGames.map((game) => (
            <Card key={game.name}>
              <CardHeader>
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
