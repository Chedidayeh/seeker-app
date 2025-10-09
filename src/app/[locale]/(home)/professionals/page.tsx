"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  Star,
  MapPin,
  DollarSign,
  SlidersHorizontal,
  Briefcase,
  Award,
  Clock,
  CheckCircle2,
  Scale,
  Home,
  Heart,
  Palette,
  Wrench,
  GraduationCap,
  Users,
  Shield,
  Sparkles,
  Camera,
  Car,
  Code,
  Megaphone,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import ProfessionalCard from "./_components/ProfessionalCard"

// Categories data
const categories = [
  { id: "all", label: "All Categories", icon: Briefcase },
  { id: "legal", label: "Legal Services", icon: Scale },
  { id: "financial", label: "Financial Services", icon: DollarSign },
  { id: "home", label: "Home Improvement", icon: Home },
  { id: "health", label: "Health & Wellness", icon: Heart },
  { id: "creative", label: "Creative Services", icon: Palette },
  { id: "business", label: "Business Consulting", icon: Briefcase },
  { id: "technical", label: "Technical Services", icon: Wrench },
  { id: "education", label: "Education & Tutoring", icon: GraduationCap },
  { id: "marketing", label: "Marketing & PR", icon: Megaphone },
  { id: "hr", label: "Human Resources", icon: Users },
  { id: "insurance", label: "Insurance Services", icon: Shield },
  { id: "events", label: "Event Planning", icon: Sparkles },
  { id: "photography", label: "Photography & Video", icon: Camera },
  { id: "automotive", label: "Automotive Services", icon: Car },
  { id: "technology", label: "Technology & IT", icon: Code },
]

const cities = [
  { id: "all", label: "All Locations" },
  { id: "new-york", label: "New York, NY" },
  { id: "los-angeles", label: "Los Angeles, CA" },
  { id: "chicago", label: "Chicago, IL" },
  { id: "houston", label: "Houston, TX" },
  { id: "phoenix", label: "Phoenix, AZ" },
  { id: "philadelphia", label: "Philadelphia, PA" },
  { id: "san-antonio", label: "San Antonio, TX" },
  { id: "san-diego", label: "San Diego, CA" },
  { id: "dallas", label: "Dallas, TX" },
  { id: "austin", label: "Austin, TX" },
]

const sortOptions = [
  { id: "recommended", label: "Recommended" },
  { id: "rating", label: "Highest Rated" },
  { id: "price-low", label: "Price: Low to High" },
  { id: "price-high", label: "Price: High to Low" },
  { id: "experience", label: "Most Experience" },
]

// Mock professionals data with categories
const mockProfessionals = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "Senior Attorney",
    category: "legal",
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 250,
    location: "New York, NY",
    avatar: "/professional-woman-diverse.png",
    verified: true,
    yearsExperience: 12,
    completedProjects: 340,
    responseTime: "1 hour",
    specialties: ["Corporate Law", "Contract Review", "Legal Consulting"],
  },
  {
    id: "2",
    name: "Michael Chen",
    title: "Tax Consultant",
    category: "financial",
    rating: 4.8,
    reviewCount: 89,
    hourlyRate: 180,
    location: "Los Angeles, CA",
    avatar: "/professional-man.jpg",
    verified: true,
    yearsExperience: 8,
    completedProjects: 215,
    responseTime: "2 hours",
    specialties: ["Tax Planning", "Financial Advisory", "Business Strategy"],
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    title: "Licensed Contractor",
    category: "home",
    rating: 5.0,
    reviewCount: 203,
    hourlyRate: 120,
    location: "Chicago, IL",
    avatar: "/professional-woman-contractor.png",
    verified: true,
    yearsExperience: 15,
    completedProjects: 450,
    responseTime: "30 min",
    specialties: ["Home Renovation", "Kitchen Remodeling", "Bathroom Design"],
  },
  {
    id: "4",
    name: "David Park",
    title: "Wellness Coach",
    category: "health",
    rating: 4.7,
    reviewCount: 156,
    hourlyRate: 95,
    location: "Houston, TX",
    avatar: "/professional-wellness-coach.jpg",
    verified: true,
    yearsExperience: 6,
    completedProjects: 280,
    responseTime: "1 hour",
    specialties: ["Nutrition Planning", "Fitness Coaching", "Mental Wellness"],
  },
  {
    id: "5",
    name: "Jessica Martinez",
    title: "Brand Designer",
    category: "creative",
    rating: 4.9,
    reviewCount: 178,
    hourlyRate: 150,
    location: "Phoenix, AZ",
    avatar: "/professional-designer-woman.png",
    verified: true,
    yearsExperience: 10,
    completedProjects: 390,
    responseTime: "2 hours",
    specialties: ["Brand Identity", "Logo Design", "Marketing Materials"],
  },
  {
    id: "6",
    name: "Robert Williams",
    title: "Business Strategist",
    category: "business",
    rating: 4.8,
    reviewCount: 92,
    hourlyRate: 220,
    location: "Philadelphia, PA",
    avatar: "/professional-businessman.png",
    verified: true,
    yearsExperience: 14,
    completedProjects: 267,
    responseTime: "3 hours",
    specialties: ["Growth Strategy", "Market Analysis", "Business Planning"],
  },
  {
    id: "7",
    name: "Amanda Foster",
    title: "IT Support Specialist",
    category: "technical",
    rating: 4.6,
    reviewCount: 134,
    hourlyRate: 110,
    location: "San Antonio, TX",
    avatar: "/professional-woman-diverse.png",
    verified: true,
    yearsExperience: 7,
    completedProjects: 298,
    responseTime: "1 hour",
    specialties: ["Network Security", "Cloud Solutions", "Tech Support"],
  },
  {
    id: "8",
    name: "James Thompson",
    title: "Math Tutor",
    category: "education",
    rating: 4.9,
    reviewCount: 211,
    hourlyRate: 75,
    location: "San Diego, CA",
    avatar: "/professional-man.jpg",
    verified: true,
    yearsExperience: 9,
    completedProjects: 520,
    responseTime: "30 min",
    specialties: ["Calculus", "Algebra", "Test Prep"],
  },
  {
    id: "9",
    name: "Lisa Anderson",
    title: "Marketing Strategist",
    category: "marketing",
    rating: 4.8,
    reviewCount: 167,
    hourlyRate: 165,
    location: "Dallas, TX",
    avatar: "/professional-designer-woman.png",
    verified: true,
    yearsExperience: 11,
    completedProjects: 345,
    responseTime: "2 hours",
    specialties: ["Digital Marketing", "SEO", "Content Strategy"],
  },
  {
    id: "10",
    name: "Kevin Brown",
    title: "HR Consultant",
    category: "hr",
    rating: 4.7,
    reviewCount: 98,
    hourlyRate: 140,
    location: "Austin, TX",
    avatar: "/professional-businessman.png",
    verified: true,
    yearsExperience: 13,
    completedProjects: 234,
    responseTime: "3 hours",
    specialties: ["Recruitment", "Employee Relations", "HR Policy"],
  },
  {
    id: "11",
    name: "Rachel Green",
    title: "Insurance Agent",
    category: "insurance",
    rating: 4.8,
    reviewCount: 145,
    hourlyRate: 130,
    location: "New York, NY",
    avatar: "/professional-woman-diverse.png",
    verified: true,
    yearsExperience: 10,
    completedProjects: 312,
    responseTime: "1 hour",
    specialties: ["Life Insurance", "Health Insurance", "Risk Management"],
  },
  {
    id: "12",
    name: "Daniel Lee",
    title: "Event Planner",
    category: "events",
    rating: 4.9,
    reviewCount: 189,
    hourlyRate: 125,
    location: "Los Angeles, CA",
    avatar: "/professional-man.jpg",
    verified: true,
    yearsExperience: 8,
    completedProjects: 276,
    responseTime: "2 hours",
    specialties: ["Corporate Events", "Weddings", "Conference Planning"],
  },
]

export default function ProfessionalsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 500])
  const [selectedSort, setSelectedSort] = useState("recommended")
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false)

  const filteredProfessionals = useMemo(() => {
    let filtered = mockProfessionals

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((prof) => prof.category === selectedCategory)
    }

    // Apply location filter
    if (selectedLocation !== "all") {
      filtered = filtered.filter((prof) => prof.location === cities.find((c) => c.id === selectedLocation)?.label)
    }

    // Apply price range filter
    filtered = filtered.filter((prof) => prof.hourlyRate >= priceRange[0] && prof.hourlyRate <= priceRange[1])

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(
        (prof) =>
          prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prof.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prof.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Apply sorting
    switch (selectedSort) {
      case "rating":
        filtered = [...filtered].sort((a, b) => b.rating - a.rating)
        break
      case "price-low":
        filtered = [...filtered].sort((a, b) => a.hourlyRate - b.hourlyRate)
        break
      case "price-high":
        filtered = [...filtered].sort((a, b) => b.hourlyRate - a.hourlyRate)
        break
      case "experience":
        filtered = [...filtered].sort((a, b) => b.yearsExperience - a.yearsExperience)
        break
    }

    return filtered
  }, [searchQuery, selectedCategory, selectedLocation, priceRange, selectedSort])

  const FilterContent = () => (
    <>
      <div>
        <h2 className="mb-4 text-sm font-medium text-foreground">Categories</h2>
        <div className="max-h-64 space-y-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border hover:scrollbar-thumb-muted-foreground">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id)
                  setIsFilterSheetOpen(false)
                }}
                className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                  selectedCategory === category.id
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="truncate">{category.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
          <MapPin className="h-4 w-4" />
          Location
        </h2>
        <div className="max-h-64 space-y-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border hover:scrollbar-thumb-muted-foreground">
          {cities.map((city) => (
            <button
              key={city.id}
              onClick={() => {
                setSelectedLocation(city.id)
                setIsFilterSheetOpen(false)
              }}
              className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${
                selectedLocation === city.id
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              }`}
            >
              <span className="truncate">{city.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
          <DollarSign className="h-4 w-4" />
          Hourly Rate
        </h2>
        <div className="space-y-4">
          <Slider value={priceRange} onValueChange={setPriceRange} max={500} step={10} className="w-full" />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}+</span>
          </div>
        </div>
      </div>

    </>
  )

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
    <div className="absolute inset-0 bg-grid-pattern opacity-5" />


      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Desktop Sidebar - Hidden on mobile */}
          <aside className="hidden lg:block w-full lg:w-64 lg:flex-shrink-0">
                        <div className="sticky top-8 rounded-lg overflow-hidden p-1">
                            <div className="space-y-6 border-2 p-4 rounded-lg bg-card">
                                <FilterContent />
                            </div>
                        </div>
                    </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-8">
              <h2 className="mb-2 text-2xl font-semibold tracking-tight text-blue-600 text-balance">
                Find Your Perfect Professional
              </h2>
              <p className="text-muted-foreground text-pretty">
                Browse thousands of verified professionals across all categories. Filter by location, rate, and
                expertise.
              </p>
            </div>

            <div className="mb-6 flex gap-2">
              {/* Mobile Filter Button */}
              <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="lg:hidden flex-shrink-0 bg-transparent">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search professionals by name, title, or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Active Filters Display */}
            {(selectedCategory !== "all" ||
              selectedLocation !== "all" ||
              priceRange[0] !== 0 ||
              priceRange[1] !== 500) && (
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {selectedCategory !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    {categories.find((c) => c.id === selectedCategory)?.label}
                    <button onClick={() => setSelectedCategory("all")} className="ml-1 hover:text-foreground">
                      ×
                    </button>
                  </Badge>
                )}
                {selectedLocation !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    <MapPin className="h-3 w-3" />
                    {cities.find((c) => c.id === selectedLocation)?.label}
                    <button onClick={() => setSelectedLocation("all")} className="ml-1 hover:text-foreground">
                      ×
                    </button>
                  </Badge>
                )}
                {(priceRange[0] !== 0 || priceRange[1] !== 500) && (
                  <Badge variant="secondary" className="gap-1">
                    ${priceRange[0]} - ${priceRange[1]}
                    <button onClick={() => setPriceRange([0, 500])} className="ml-1 hover:text-foreground">
                      ×
                    </button>
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory("all")
                    setSelectedLocation("all")
                    setPriceRange([0, 500])
                  }}
                  className="h-6 px-2 text-xs"
                >
                  Clear all
                </Button>
              </div>
            )}

            {/* Results Count */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {filteredProfessionals.length}{" "}
                {filteredProfessionals.length === 1 ? "professional" : "professionals"}
              </p>
            </div>

            {/* Professionals List */}
            {filteredProfessionals.length > 0 ? (
              <div className="space-y-4">
                {filteredProfessionals.map((professional) => (
                  <ProfessionalCard professional={professional} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card py-12">
                <Search className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-medium text-foreground">No professionals found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  )
}
