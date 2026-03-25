"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, X, Heart, Download, Eye, Filter } from "lucide-react"

// Mock image data
const mockImages = [
  {
    id: 1,
    src: "/modern-architecture-building.png",
    title: "Modern Architecture",
    category: "Architecture",
    tags: ["modern", "building", "design"],
    likes: 124,
    views: 1250,
  },
  {
    id: 2,
    src: "/mountain-landscape.png",
    title: "Mountain Landscape",
    category: "Nature",
    tags: ["landscape", "mountain", "nature"],
    likes: 89,
    views: 890,
  },
  {
    id: 3,
    src: "/abstract-digital-composition.png",
    title: "Digital Abstract",
    category: "Art",
    tags: ["abstract", "digital", "colorful"],
    likes: 156,
    views: 2100,
  },
  {
    id: 4,
    src: "/urban-street-photography.png",
    title: "Urban Street",
    category: "Photography",
    tags: ["street", "urban", "city"],
    likes: 203,
    views: 1800,
  },
  {
    id: 5,
    src: "/minimalist-interior.png",
    title: "Minimalist Interior",
    category: "Architecture",
    tags: ["interior", "minimalist", "clean"],
    likes: 178,
    views: 1650,
  },
  {
    id: 6,
    src: "/ocean-waves-sunset.png",
    title: "Ocean Sunset",
    category: "Nature",
    tags: ["ocean", "sunset", "waves"],
    likes: 267,
    views: 3200,
  },
  {
    id: 7,
    src: "/geometric-pattern.png",
    title: "Geometric Patterns",
    category: "Art",
    tags: ["geometric", "pattern", "design"],
    likes: 134,
    views: 1100,
  },
  {
    id: 8,
    src: "/portrait-photography-black-white.png",
    title: "Portrait Study",
    category: "Photography",
    tags: ["portrait", "black-white", "studio"],
    likes: 298,
    views: 2800,
  },
  {
    id: 9,
    src: "/forest-trees-nature.png",
    title: "Forest Path",
    category: "Nature",
    tags: ["forest", "trees", "path"],
    likes: 145,
    views: 1400,
  },
  {
    id: 10,
    src: "/watercolor-painting-art.png",
    title: "Watercolor Dreams",
    category: "Art",
    tags: ["watercolor", "painting", "artistic"],
    likes: 189,
    views: 1900,
  },
  {
    id: 11,
    src: "/architecture-glass-building.png",
    title: "Glass Architecture",
    category: "Architecture",
    tags: ["glass", "modern", "reflection"],
    likes: 167,
    views: 1550,
  },
  {
    id: 12,
    src: "/macro-flower.png",
    title: "Macro Flower",
    category: "Photography",
    tags: ["macro", "flower", "detail"],
    likes: 223,
    views: 2300,
  },
]

const categories = ["All", "Architecture", "Nature", "Art", "Photography"]

export default function ImageGallery() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedImage, setSelectedImage] = useState<(typeof mockImages)[0] | null>(null)
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set())
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("masonry")

  const filteredImages = useMemo(() => {
    return mockImages.filter((image) => {
      const matchesCategory = selectedCategory === "All" || image.category === selectedCategory
      const matchesSearch =
        searchQuery === "" ||
        image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        image.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  const toggleLike = (imageId: number) => {
    setLikedImages((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(imageId)) {
        newSet.delete(imageId)
      } else {
        newSet.add(imageId)
      }
      return newSet
    })
  }

  const openLightbox = (image: (typeof mockImages)[0]) => {
    setSelectedImage(image)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Image Gallery</h1>
          <p className="text-gray-600">Filterable gallery with advanced image handling</p>
        </div>

        {/* Controls */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search images..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-cyan-600 hover:bg-cyan-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex justify-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              onClick={() => setViewMode("grid")}
              size="sm"
              className={viewMode === "grid" ? "bg-cyan-600 hover:bg-cyan-700" : ""}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === "masonry" ? "default" : "outline"}
              onClick={() => setViewMode("masonry")}
              size="sm"
              className={viewMode === "masonry" ? "bg-cyan-600 hover:bg-cyan-700" : ""}
            >
              Masonry
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-6">
          <p className="text-gray-600">
            Showing {filteredImages.length} of {mockImages.length} images
          </p>
        </div>

        {/* Image Grid */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
          }
        >
          {filteredImages.map((image) => (
            <Card
              key={image.id}
              className={`group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden ${
                viewMode === "masonry" ? "break-inside-avoid mb-6" : ""
              }`}
              onClick={() => openLightbox(image)}
            >
              <div className="relative">
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.title}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                    <Button size="sm" variant="secondary" onClick={(e) => e.stopPropagation()}>
                      <Eye size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleLike(image.id)
                      }}
                    >
                      <Heart size={16} className={likedImages.has(image.id) ? "fill-red-500 text-red-500" : ""} />
                    </Button>
                    <Button size="sm" variant="secondary" onClick={(e) => e.stopPropagation()}>
                      <Download size={16} />
                    </Button>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{image.title}</h3>
                <div className="flex flex-wrap gap-1 mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {image.category}
                  </Badge>
                  {image.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Heart size={14} />
                    {image.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye size={14} />
                    {image.views}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <Filter className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No images found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <Button
                variant="ghost"
                size="sm"
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white hover:text-gray-300"
              >
                <X size={24} />
              </Button>
              <img
                src={selectedImage.src || "/placeholder.svg"}
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">{selectedImage.title}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge className="bg-cyan-600">{selectedImage.category}</Badge>
                  {selectedImage.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-white border-white">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <Heart size={14} />
                    {selectedImage.likes} likes
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye size={14} />
                    {selectedImage.views} views
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Demo Info */}
        <Card className="mt-8 border-cyan-200 bg-cyan-50">
          <CardContent className="p-6">
            <h3 className="font-semibold text-cyan-900 mb-2">Demo Features</h3>
            <ul className="text-sm text-cyan-800 space-y-1">
              <li>• Advanced filtering by category and search functionality</li>
              <li>• Responsive masonry and grid layout options</li>
              <li>• Interactive lightbox modal for full-size viewing</li>
              <li>• Like/favorite system with persistent state</li>
              <li>• Hover effects and smooth animations</li>
              <li>• Professional gallery UI with metadata display</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
