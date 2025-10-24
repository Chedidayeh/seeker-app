"use client"

import { useState, useMemo, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  Search,
  MapPin,
  SlidersHorizontal,
  ChevronLeft,
  Filter,
  X,
  Users,
  Sparkles,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import ProfessionalCard from "../../professionals/_components/ProfessionalCard"
import { getCategoryById } from "@/actions/categories"
import { getProfessionalsByDomainId, getDistinctLocations, ProfessionalWithDetails, LocationOption } from "@/actions/professionals"
import type { CategoryWithCount } from "@/actions/categories"




export default function CategoryViewPage(
  { categoryData,
    professionalsData,
    locationsData,
  } : {
    categoryData: CategoryWithCount,
    professionalsData: ProfessionalWithDetails[],
    locationsData: LocationOption[],
  }
) {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false)
  


  const filteredProfessionals = useMemo(() => {
    let filtered = professionalsData

    // Apply location filter
    if (selectedLocation !== "all") {
      const selectedLocationLabel = locationsData.find((c) => c.id === selectedLocation)?.label
      filtered = filtered.filter((prof) => prof.city === selectedLocationLabel)
    }

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(
        (prof) =>
          prof.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prof.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prof.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prof.domain.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return filtered
  }, [searchQuery, selectedLocation, professionalsData, locationsData])

  const FilterContent = () => (
    <>
      <div className="">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
            <MapPin className="h-4 w-4 text-primary" />
          </div>
          Location
        </h2>
        <div className="max-h-64 space-y-1.5 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border hover:scrollbar-thumb-muted-foreground">
          <button
            onClick={() => {
              setSelectedLocation("all")
              setIsFilterSheetOpen(false)
            }}
            className={`group flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${selectedLocation === "all"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
          >
            <span className="truncate">All Locations</span>
            <Badge variant={selectedLocation === "all" ? "secondary" : "outline"} className="text-xs font-semibold">
              {professionalsData.length}
            </Badge>
          </button>
          {locationsData.map((location) => (
            <button
              key={location.id}
              onClick={() => {
                setSelectedLocation(location.id)
                setIsFilterSheetOpen(false)
              }}
              className={`group flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${selectedLocation === location.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
            >
              <span className="truncate">{location.label}</span>
              <Badge variant={selectedLocation === location.id ? "secondary" : "outline"} className="text-xs font-semibold">
                {location.count}
              </Badge>
            </button>
          ))}
        </div>
      </div>
    </>
  )





  return (
    <section className="min-h-screen py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 relative z-10">

        {/* Enhanced Category Header */}
        <div className="mb-10 relative">
          <div className="flex items-center justify-center gap-6 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border-2 border-border/50 shadow-lg">
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-4xl font-bold tracking-tight text-foreground">{categoryData.name}</h2>
              </div>
              <p className="text-base text-muted-foreground mb-3 max-w-2xl">
                {categoryData.description || `Find professional ${categoryData.name} experts`}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Enhanced Desktop Sidebar - Hidden on mobile */}
          <aside className="hidden lg:block w-full lg:w-64 lg:flex-shrink-0">
            <div className="sticky top-8">
              <div className="rounded-xl border-2 border-border/50 bg-card/50 backdrop-blur-sm p-5 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Filter className="h-4 w-4 text-primary" />
                    Filters
                  </h3>
                  {selectedLocation !== "all" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedLocation("all")}
                      className="h-7 px-2 text-xs hover:bg-destructive/10 hover:text-destructive"
                    >
                      Clear
                    </Button>
                  )}
                </div>
                <FilterContent />
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-6 flex gap-3">
              {/* Enhanced Mobile Filter Button */}
              <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="lg:hidden flex-shrink-0 h-11 w-11 border-2 hover:border-primary hover:bg-primary/5 transition-all duration-200 relative"
                  >
                    <SlidersHorizontal className="h-5 w-5" />
                    {selectedLocation !== "all" && (
                      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                        1
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 sm:w-96">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <Filter className="h-5 w-5 text-primary" />
                      Filters
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Enhanced Search Bar */}
              <div className="relative flex-1">
                                <Input
                  type="text"
                  placeholder="Search professionals by name, title, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-11 pl-12 pr-4 bg-card/50 backdrop-blur-sm border-2 border-border/50 focus:border-primary text-foreground placeholder:text-muted-foreground rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-muted hover:bg-muted-foreground/20 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Enhanced Active Filters Display */}
            {selectedLocation !== "all" && (
              <div className="mb-5 flex flex-wrap items-center gap-2 p-4 rounded-xl bg-primary/5 border border-primary/20 animate-in fade-in slide-in-from-top-2 duration-300">
                <span className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                  <Filter className="h-4 w-4 text-primary" />
                  Active filters:
                </span>
                {selectedLocation !== "all" && (
                  <Badge variant="secondary" className="gap-1.5 pl-2 pr-1 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
                    <MapPin className="h-3.5 w-3.5" />
                    <span className="font-medium">{locationsData.find((c) => c.id === selectedLocation)?.label}</span>
                    <button 
                      onClick={() => setSelectedLocation("all")} 
                      className="ml-1 flex h-4 w-4 items-center justify-center rounded-full hover:bg-primary-foreground/20 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedLocation("all")
                  }}
                  className="h-7 px-3 text-xs font-semibold hover:bg-destructive/10 hover:text-destructive ml-auto"
                >
                  <X className="mr-1 h-3 w-3" />
                  Clear all
                </Button>
              </div>
            )}

            {/* Enhanced Results Count */}
            <div className="mb-6 flex items-center justify-between p-4 rounded-xl bg-muted/50 backdrop-blur-sm border border-border/50">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm font-semibold text-foreground">
                  <span className="text-primary">{filteredProfessionals.length}</span>{" "}
                  {filteredProfessionals.length === 1 ? "professional" : "professionals"} found
                </p>
              </div>
              {searchQuery && (
                <Badge variant="outline" className="text-xs">
                  Search active
                </Badge>
              )}
            </div>

            {/* Professionals List */}
            {filteredProfessionals.length > 0 ? (
              <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {filteredProfessionals.map((professional, index) => (
                  <div 
                    key={professional.id}
                    className="animate-in fade-in slide-in-from-bottom-2"
                    style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
                  >
                    <ProfessionalCard professional={professional} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/50 bg-card/50 backdrop-blur-sm py-16 px-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="relative mb-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                    <Search className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-destructive/10">
                    <X className="h-4 w-4 text-destructive" />
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-bold text-foreground">No professionals found</h3>
                <p className="text-sm text-muted-foreground mb-4 text-center max-w-md">
                  We couldn't find any professionals matching your criteria. Try adjusting your search or filters.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedLocation("all")
                  }}
                  className="mt-2"
                >
                  <X className="mr-2 h-4 w-4" />
                  Clear filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  )
}
