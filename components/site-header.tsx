import Link from "next/link"
import { Code2 } from "lucide-react"

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/mobile-development", label: "Mobile Development" },
  { href: "/reddit-games", label: "Reddit Games" },
  { href: "/roblox-games", label: "Roblox Games" },
  { href: "/quote", label: "Generate Quote" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
]

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Code2 className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold font-mono">Rexford Ray</span>
        </div>

        <nav className="hidden lg:flex items-center gap-6">
          {navigationLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="w-20 h-20 md:w-24 md:h-24">
          <img
            src="/comptia-security-plus.svg"
            alt="CompTIA Security+ Certified"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </header>
  )
}
