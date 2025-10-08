"use client"

import { useState, useMemo } from "react"
import {
    Search,
    Briefcase,
    Scale,
    DollarSign,
    Home,
    Heart,
    Palette,
    Wrench,
    GraduationCap,
    Users,
    Shield,
    Sparkles,
    MapPin,
    Camera,
    Car,
    Code,
    Megaphone,
    SlidersHorizontal,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet" // Added Sheet component
import { ScrollArea } from "@/components/ui/scroll-area"
import CategoryCard from "./_components/CategoryCard"

const categories = [
    {
        id: 1,
        name: "Legal Services",
        description: "Attorneys, paralegals, and legal consultants",
        icon: Scale,
        slug: "legal",
        count: "2,500+ professionals",
        tags: ["Verified", "Popular"],
        location: "New York, NY",
        color: "from-blue-500 to-indigo-600",
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
        textColor: "text-blue-600 dark:text-blue-400",
    },
    {
        id: 2,
        name: "Financial Services",
        description: "Accountants, financial advisors, and tax professionals",
        icon: DollarSign,
        tags: ["Verified"],
        count: "2,500+ professionals",

        location: "Los Angeles, CA",
        color: "from-green-500 to-emerald-600",
        bgColor: "bg-green-50 dark:bg-green-900/20",
        textColor: "text-green-600 dark:text-green-400",
    },
    {
        id: 3,
        name: "Home Improvement",
        description: "Contractors, electricians, plumbers, and renovators",
        icon: Home,
        count: "2,500+ professionals",

        tags: ["Popular"],
        location: "Chicago, IL",
        color: "from-yellow-500 to-amber-600",
        bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
        textColor: "text-yellow-600 dark:text-yellow-400",
    },
    {
        id: 4,
        name: "Health & Wellness",
        description: "Therapists, nutritionists, and wellness coaches",
        icon: Heart,
        count: "2,500+ professionals",

        tags: ["Verified", "Trending"],
        location: "Houston, TX",
        color: "from-red-500 to-rose-600",
        bgColor: "bg-red-50 dark:bg-red-900/20",
        textColor: "text-red-600 dark:text-red-400",
    },
    {
        id: 5,
        name: "Creative Services",
        description: "Designers, photographers, and content creators",
        icon: Palette,
        count: "2,500+ professionals",

        tags: ["Popular"],
        location: "Phoenix, AZ",
        color: "from-purple-500 to-pink-600",
        bgColor: "bg-purple-50 dark:bg-purple-900/20",
        textColor: "text-purple-600 dark:text-purple-400",
    },
    {
        id: 6,
        name: "Business Consulting",
        description: "Strategy consultants, coaches, and advisors",
        icon: Briefcase,
        tags: [],
        count: "2,500+ professionals",
        location: "Philadelphia, PA",
        color: "from-violet-500 to-purple-600",
        bgColor: "bg-violet-50 dark:bg-violet-900/20",
        textColor: "text-violet-600 dark:text-violet-400",
    },
    {
        id: 7,
        name: "Technical Services",
        description: "IT support, software developers, and tech consultants",
        icon: Wrench,
        count: "2,500+ professionals",
        tags: ["Trending"],
        location: "San Antonio, TX",
        color: "from-gray-500 to-slate-600",
        bgColor: "bg-gray-50 dark:bg-gray-900/20",
        textColor: "text-gray-600 dark:text-gray-400",
    },
    {
        id: 8,
        name: "Education & Tutoring",
        description: "Tutors, instructors, and educational consultants",
        icon: GraduationCap,
        tags: ["Popular"],
        count: "2,500+ professionals",
        location: "San Diego, CA",
        color: "from-indigo-500 to-blue-600",
        bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
        textColor: "text-indigo-600 dark:text-indigo-400",
    },
    {
        id: 9,
        name: "Marketing & PR",
        description: "Marketers, PR specialists, and brand strategists",
        icon: Megaphone,
        count: "2,500+ professionals",
        tags: ["Verified"],
        location: "Dallas, TX",
        color: "from-orange-500 to-red-600",
        bgColor: "bg-orange-50 dark:bg-orange-900/20",
        textColor: "text-orange-600 dark:text-orange-400",
    },
    {
        id: 10,
        name: "Human Resources",
        description: "Recruiters, HR consultants, and talent managers",
        icon: Users,
        tags: [],
        count: "2,500+ professionals",
        location: "Austin, TX",
        color: "from-gray-500 to-slate-600",
        bgColor: "bg-gray-50 dark:bg-gray-900/20",
        textColor: "text-gray-600 dark:text-gray-400",
    },
    {
        id: 11,
        name: "Insurance Services",
        description: "Insurance agents and risk management consultants",
        icon: Shield,
        count: "2,500+ professionals",
        tags: ["Verified"],
        location: "New York, NY",
        color: "from-teal-500 to-cyan-600",
        bgColor: "bg-teal-50 dark:bg-teal-900/20",
        textColor: "text-teal-600 dark:text-teal-400",
    },
    {
        id: 12,
        name: "Event Planning",
        description: "Event planners, coordinators, and venue specialists",
        icon: Sparkles,
        count: "2,500+ professionals",
        tags: ["Popular"],
        location: "Los Angeles, CA",
        color: "from-emerald-500 to-green-600",
        bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
        textColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
        id: 13,
        name: "Real Estate",
        description: "Real estate agents, property managers, and appraisers",
        icon: Home,
        count: "2,500+ professionals",
        tags: ["Verified"],
        location: "Philadelphia, PA",
        color: "from-teal-500 to-cyan-600",
        bgColor: "bg-teal-50 dark:bg-teal-900/20",
        textColor: "text-teal-600 dark:text-teal-400",
    },
    {
        id: 14,
        name: "Automotive Services",
        description: "Mechanics, auto detailers, and vehicle specialists",
        icon: Car,
        count: "2,500+ professionals",
        tags: ["Trending"],
        location: "San Antonio, TX",
        color: "from-gray-500 to-slate-600",
        bgColor: "bg-gray-50 dark:bg-gray-900/20",
        textColor: "text-gray-600 dark:text-gray-400",
    },
    {
        id: 15,
        name: "Photography & Video",
        description: "Professional photographers and videographers",
        icon: Camera,
        count: "2,500+ professionals",
        tags: ["Verified"],
        location: "New York, NY",
        color: "from-pink-500 to-rose-600",
        bgColor: "bg-pink-50 dark:bg-pink-900/20",
        textColor: "text-pink-600 dark:text-pink-400",
    },
    {
        id: 16,
        name: "Technology & IT",
        description: "Software developers, IT support, and tech consultants",
        icon: Code,
        count: "2,500+ professionals",
        tags: ["Popular"],
        location: "Los Angeles, CA",
        color: "from-emerald-500 to-green-600",
        bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
        textColor: "text-emerald-600 dark:text-emerald-400",
    },
]

const filterOptions = [
    { id: "all", label: "All Categories", count: categories.length },
    { id: "verified", label: "Verified Only", count: categories.filter((c) => c.tags.includes("Verified")).length },
    { id: "popular", label: "Popular", count: categories.filter((c) => c.tags.includes("Popular")).length },
    { id: "trending", label: "Trending", count: categories.filter((c) => c.tags.includes("Trending")).length },
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

export default function CategoriesPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedFilter, setSelectedFilter] = useState("all")
    const [selectedLocation, setSelectedLocation] = useState("all")
    const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false) // Added state for mobile filter sheet

    const filteredCategories = useMemo(() => {
        let filtered = categories

        // Apply filter
        if (selectedFilter !== "all") {
            const filterMap: Record<string, string> = {
                verified: "Verified",
                popular: "Popular",
                trending: "Trending",
            }
            filtered = filtered.filter((cat) => cat.tags.includes(filterMap[selectedFilter]))
        }

        // Apply location filter
        if (selectedLocation !== "all") {
            filtered = filtered.filter((cat) => cat.location === cities.find((c) => c.id === selectedLocation)?.label)
        }

        // Apply search
        if (searchQuery) {
            filtered = filtered.filter(
                (cat) =>
                    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    cat.description.toLowerCase().includes(searchQuery.toLowerCase()),
            )
        }

        return filtered
    }, [searchQuery, selectedFilter, selectedLocation])

    const FilterContent = () => (
        <div>
            <div >
                <h2 className="mb-4 text-sm font-medium text-foreground">Filter Categories</h2>
                <div className="space-y-1">
                    {filterOptions.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => {
                                setSelectedFilter(option.id)
                                setIsFilterSheetOpen(false) // Close sheet on mobile after selection
                            }}
                            className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${selectedFilter === option.id
                                ? "bg-secondary text-secondary-foreground"
                                : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                                }`}
                        >
                            <span>{option.label}</span>
                            <span className="text-xs">{option.count}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-4">
                <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
                    <MapPin className="h-4 w-4" />
                    Location
                </h2>
                <div className="max-h-64 space-y-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border hover:scrollbar-thumb-muted-foreground">
                    <div className="space-y-1">
                        {cities.map((city) => (
                            <button
                                key={city.id}
                                onClick={() => {
                                    setSelectedLocation(city.id)
                                    setIsFilterSheetOpen(false) // Close sheet on mobile after selection
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
            </div>

        </div>
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
                                Discover Professional Services
                            </h2>
                            <p className="text-muted-foreground text-pretty">
                                Browse verified professionals across multiple domains. Find trusted experts for your needs.
                            </p>
                        </div>

                        <div className="mb-8 flex gap-2">
                            {/* Mobile Filter Button - Only visible on mobile */}
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
                                    placeholder="Search categories..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground"
                                />
                            </div>
                        </div>

                        {/* Active Filters Display */}
                        {(selectedFilter !== "all" || selectedLocation !== "all") && (
                            <div className="mb-4 flex flex-wrap items-center gap-2">
                                <span className="text-sm text-muted-foreground">Active filters:</span>
                                {selectedFilter !== "all" && (
                                    <Badge variant="secondary" className="gap-1">
                                        {filterOptions.find((f) => f.id === selectedFilter)?.label}
                                        <button onClick={() => setSelectedFilter("all")} className="ml-1 hover:text-foreground">
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
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setSelectedFilter("all")
                                        setSelectedLocation("all")
                                    }}
                                    className="h-6 px-2 text-xs"
                                >
                                    Clear all
                                </Button>
                            </div>
                        )}

                        {/* Results Count */}
                        <div className="mb-4 flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Showing {filteredCategories.length} {filteredCategories.length === 1 ? "category" : "categories"}
                                {selectedLocation !== "all" && (
                                    <span className="ml-1">in {cities.find((c) => c.id === selectedLocation)?.label}</span>
                                )}
                            </p>
                        </div>

                        {/* Categories Grid */}
                        {filteredCategories.length > 0 ? (
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                                {filteredCategories.map((category) => (
                                    <CategoryCard key={category.id} category={category} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card py-12">
                                <Search className="mb-4 h-12 w-12 text-muted-foreground" />
                                <h3 className="mb-2 text-lg font-medium text-foreground">No categories found</h3>
                                <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </section>
    )
}
