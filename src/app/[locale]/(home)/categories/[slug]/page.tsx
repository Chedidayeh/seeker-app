"use client"

import { useState, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  Search,
  Star,
  MapPin,
  DollarSign,
  SlidersHorizontal,
  ChevronLeft,
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
import Link from "next/link"
import ProfessionalCard from "../../professionals/_components/ProfessionalCard"

// Category data matching the main categories page
const categoryData: Record<
  string,
  {
    name: string
    description: string
    icon: any
    color: string
    bgColor: string
    textColor: string
  }
> = {
  legal: {
    name: "Legal Services",
    description: "Attorneys, paralegals, and legal consultants",
    icon: Scale,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  financial: {
    name: "Financial Services",
    description: "Accountants, financial advisors, and tax professionals",
    icon: DollarSign,
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    textColor: "text-green-600 dark:text-green-400",
  },
  home: {
    name: "Home Improvement",
    description: "Contractors, electricians, plumbers, and renovators",
    icon: Home,
    color: "from-yellow-500 to-amber-600",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    textColor: "text-yellow-600 dark:text-yellow-400",
  },
  health: {
    name: "Health & Wellness",
    description: "Therapists, nutritionists, and wellness coaches",
    icon: Heart,
    color: "from-red-500 to-rose-600",
    bgColor: "bg-red-50 dark:bg-red-900/20",
    textColor: "text-red-600 dark:text-red-400",
  },
  creative: {
    name: "Creative Services",
    description: "Designers, photographers, and content creators",
    icon: Palette,
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    textColor: "text-purple-600 dark:text-purple-400",
  },
  business: {
    name: "Business Consulting",
    description: "Strategy consultants, coaches, and advisors",
    icon: Briefcase,
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-50 dark:bg-violet-900/20",
    textColor: "text-violet-600 dark:text-violet-400",
  },
  technical: {
    name: "Technical Services",
    description: "IT support, software developers, and tech consultants",
    icon: Wrench,
    color: "from-gray-500 to-slate-600",
    bgColor: "bg-gray-50 dark:bg-gray-900/20",
    textColor: "text-gray-600 dark:text-gray-400",
  },
  education: {
    name: "Education & Tutoring",
    description: "Tutors, instructors, and educational consultants",
    icon: GraduationCap,
    color: "from-indigo-500 to-blue-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    textColor: "text-indigo-600 dark:text-indigo-400",
  },
  marketing: {
    name: "Marketing & PR",
    description: "Marketers, PR specialists, and brand strategists",
    icon: Megaphone,
    color: "from-orange-500 to-red-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    textColor: "text-orange-600 dark:text-orange-400",
  },
  hr: {
    name: "Human Resources",
    description: "Recruiters, HR consultants, and talent managers",
    icon: Users,
    color: "from-gray-500 to-slate-600",
    bgColor: "bg-gray-50 dark:bg-gray-900/20",
    textColor: "text-gray-600 dark:text-gray-400",
  },
  insurance: {
    name: "Insurance Services",
    description: "Insurance agents and risk management consultants",
    icon: Shield,
    color: "from-teal-500 to-cyan-600",
    bgColor: "bg-teal-50 dark:bg-teal-900/20",
    textColor: "text-teal-600 dark:text-teal-400",
  },
  events: {
    name: "Event Planning",
    description: "Event planners, coordinators, and venue specialists",
    icon: Sparkles,
    color: "from-emerald-500 to-green-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  realestate: {
    name: "Real Estate",
    description: "Real estate agents, property managers, and appraisers",
    icon: Home,
    color: "from-teal-500 to-cyan-600",
    bgColor: "bg-teal-50 dark:bg-teal-900/20",
    textColor: "text-teal-600 dark:text-teal-400",
  },
  automotive: {
    name: "Automotive Services",
    description: "Mechanics, auto detailers, and vehicle specialists",
    icon: Car,
    color: "from-gray-500 to-slate-600",
    bgColor: "bg-gray-50 dark:bg-gray-900/20",
    textColor: "text-gray-600 dark:text-gray-400",
  },
  photography: {
    name: "Photography & Video",
    description: "Professional photographers and videographers",
    icon: Camera,
    color: "from-pink-500 to-rose-600",
    bgColor: "bg-pink-50 dark:bg-pink-900/20",
    textColor: "text-pink-600 dark:text-pink-400",
  },
  technology: {
    name: "Technology & IT",
    description: "Software developers, IT support, and tech consultants",
    icon: Code,
    color: "from-emerald-500 to-green-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
}

// Mock professionals data
const mockProfessionals = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "Senior Attorney",
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

export default function CategoryViewPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 500])
  const [selectedSort, setSelectedSort] = useState("recommended")
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false)

  const category = categoryData[slug]

  const Icon = category?.icon

  const filteredProfessionals = useMemo(() => {
    let filtered = mockProfessionals

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
  }, [searchQuery, selectedLocation, priceRange, selectedSort])

  const FilterContent = () => (
    <>
      <div className="">
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
              className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${selectedLocation === city.id
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

  if (!category) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground">Category not found</h1>
          <Button onClick={() => router.push("/categories")} className="mt-4">
            Back to Categories
          </Button>
        </div>
      </div>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />


      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.push("/categories")}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Categories
        </Button>

        {/* Category Header */}
        <div className="mb-8 flex items-start gap-4">
          <div className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl ${category.bgColor}`}>
            <Icon className={`h-8 w-8 ${category.textColor}`} />
          </div>
          <div>
            <h2 className="mb-2 text-3xl font-semibold tracking-tight text-foreground text-balance">{category.name}</h2>
            <p className="text-muted-foreground text-pretty">{category.description}</p>
          </div>
        </div>

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
                  placeholder="Search professionals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Active Filters Display */}
            {(selectedLocation !== "all" || priceRange[0] !== 0 || priceRange[1] !== 500) && (
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground">Active filters:</span>
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
