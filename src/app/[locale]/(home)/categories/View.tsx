"use client";

import { useState, useMemo, useEffect } from "react";
import {
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
  MapPin,
  Camera,
  Car,
  Code,
  Megaphone,
  SlidersHorizontal,
  Layers,
  Filter,
  X,
  Grid3x3,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CategoryCard from "./_components/CategoryCard";
import {
  CategoryWithCount,
  DistinctCategory,
  getActiveCategories,
  getDistinctCategoriesWithCount,
} from "@/actions/categories";

// Color schemes for categories
const colorSchemes = [
  {
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  {
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    textColor: "text-purple-600 dark:text-purple-400",
  },
  {
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    textColor: "text-green-600 dark:text-green-400",
  },
  {
    color: "from-orange-500 to-red-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    textColor: "text-orange-600 dark:text-orange-400",
  },
  {
    color: "from-red-500 to-rose-600",
    bgColor: "bg-red-50 dark:bg-red-900/20",
    textColor: "text-red-600 dark:text-red-400",
  },
  {
    color: "from-yellow-500 to-amber-600",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    textColor: "text-yellow-600 dark:text-yellow-400",
  },
  {
    color: "from-indigo-500 to-blue-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    textColor: "text-indigo-600 dark:text-indigo-400",
  },
  {
    color: "from-teal-500 to-cyan-600",
    bgColor: "bg-teal-50 dark:bg-teal-900/20",
    textColor: "text-teal-600 dark:text-teal-400",
  },
  {
    color: "from-gray-500 to-slate-600",
    bgColor: "bg-gray-50 dark:bg-gray-900/20",
    textColor: "text-gray-600 dark:text-gray-400",
  },
  {
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-50 dark:bg-violet-900/20",
    textColor: "text-violet-600 dark:text-violet-400",
  },
  {
    color: "from-pink-500 to-rose-600",
    bgColor: "bg-pink-50 dark:bg-pink-900/20",
    textColor: "text-pink-600 dark:text-pink-400",
  },
  {
    color: "from-emerald-500 to-green-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
];

type FilterOption = {
  id: string;
  label: string;
  count: number;
};

export default function CategoriesPage({
  categoriesData,
  distinctCategories,
}: {
  categoriesData: CategoryWithCount[];
  distinctCategories: DistinctCategory[];
}) {
  const transformedCategories = categoriesData.map((category, index) => ({
    id: category.id,
    name: category.name,
    icon: category.icon,
    description:
      category.description || `Explore ${category.name} professionals`,
    count: `${category._count.professionals} ${
      category._count.professionals === 1 ? "Professional" : "Professionals"
    }`,
    slug: category.name.toLowerCase().replace(/\s+/g, "-"),
    ...colorSchemes[index % colorSchemes.length],
  }));

          // Set filter options with "All Categories" at the beginning
        const filters: FilterOption[] = [
          {
            id: "all",
            label: "All Categories",
            count: categoriesData.length,
          },
          ...distinctCategories
            .filter((cat) => cat.count > 0) // Only show categories with professionals
            .map((cat) => ({
              id: cat.id,
              label: cat.name,
              count: cat.count,
            })),
        ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);



  const filteredCategories = useMemo(() => {
    let filtered = transformedCategories;

    // Apply category filter
    if (selectedFilter !== "all") {
      filtered = filtered.filter((cat) => cat.id === selectedFilter);
    }

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(
        (cat) =>
          cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cat.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [searchQuery, selectedFilter, transformedCategories]);

  const FilterContent = () => (
    <div>
      <div>
        <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
            <Layers className="h-4 w-4 text-primary" />
          </div>
          Filter by Category
        </h2>
        <div className="space-y-1.5">
          {filters.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                setSelectedFilter(option.id);
                setIsFilterSheetOpen(false);
              }}
              className={`group flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                selectedFilter === option.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              <span className="truncate">{option.label}</span>
              <Badge
                variant={selectedFilter === option.id ? "secondary" : "outline"}
                className="text-xs font-semibold"
              >
                {option.count}
              </Badge>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  if (isLoading && filteredCategories.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="relative mx-auto mb-6 h-16 w-16">
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary/30 border-t-primary"></div>
            <div className="absolute inset-2 animate-pulse rounded-full bg-primary/10"></div>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            Loading categories...
          </h3>
          <p className="text-sm text-muted-foreground">Please wait a moment</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 relative z-10">
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
                  {selectedFilter !== "all" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedFilter("all")}
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
            {/* Enhanced Header */}
            <div className="mb-10 relative">
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border-2 border-border/50 shadow-lg">
                <div className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-blue-500 to-indigo-600 shadow-lg ring-4 ring-primary/10">
                  <Grid3x3 className="h-8 w-8 text-white" />
                  <div className="absolute -inset-1 bg-gradient-to-br from-primary to-indigo-600 rounded-2xl blur opacity-30"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">
                      Discover Professional Services
                    </h2>
                  </div>
                  <p className="text-base text-muted-foreground">
                    Browse verified professionals across multiple domains. Find
                    trusted experts for your needs.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8 flex gap-3">
              {/* Enhanced Mobile Filter Button - Only visible on mobile */}
              <Sheet
                open={isFilterSheetOpen}
                onOpenChange={setIsFilterSheetOpen}
              >
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="lg:hidden flex-shrink-0 h-11 w-11 border-2 hover:border-primary hover:bg-primary/5 transition-all duration-200 relative"
                  >
                    <SlidersHorizontal className="h-5 w-5" />
                    {selectedFilter !== "all" && (
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
                  placeholder="Search categories by name or description..."
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

            {/* Enhanced Active Filter Badge */}
            {selectedFilter !== "all" && (
              <div className="mb-5 flex flex-wrap items-center gap-2 p-4 rounded-xl bg-primary/5 border border-primary/20 animate-in fade-in slide-in-from-top-2 duration-300">
                <span className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                  <Filter className="h-4 w-4 text-primary" />
                  Active filter:
                </span>
                <Badge
                  variant="secondary"
                  className="gap-1.5 pl-2 pr-1 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
                  onClick={() => setSelectedFilter("all")}
                >
                  <span className="font-medium">
                    {filters.find((f) => f.id === selectedFilter)?.label}
                  </span>
                  <button className="ml-1 flex h-4 w-4 items-center justify-center rounded-full hover:bg-primary-foreground/20 transition-colors">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedFilter("all")}
                  className="h-7 px-3 text-xs font-semibold hover:bg-destructive/10 hover:text-destructive ml-auto"
                >
                  <X className="mr-1 h-3 w-3" />
                  Clear filter
                </Button>
              </div>
            )}

            {/* Enhanced Results Count */}
            <div className="mb-6 flex items-center justify-between p-4 rounded-xl bg-muted/50 backdrop-blur-sm border border-border/50">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Grid3x3 className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm font-semibold text-foreground">
                  <span className="text-primary">
                    {filteredCategories.length}
                  </span>{" "}
                  {filteredCategories.length === 1 ? "category" : "categories"}{" "}
                  available
                </p>
              </div>
              {searchQuery && (
                <Badge variant="outline" className="text-xs">
                  Search active
                </Badge>
              )}
            </div>

            {/* Enhanced Categories Grid */}
            {filteredCategories.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {filteredCategories.map((category, index) => (
                  <div
                    key={category.id}
                    className="animate-in fade-in slide-in-from-bottom-2"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animationFillMode: "backwards",
                    }}
                  >
                    <CategoryCard category={category} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/50 bg-card/50 backdrop-blur-sm py-16 px-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="relative mb-6">
                  <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-destructive/10">
                    <X className="h-4 w-4 text-destructive" />
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-bold text-foreground">
                  No categories found
                </h3>
                <p className="text-sm text-muted-foreground mb-4 text-center max-w-md">
                  {searchQuery
                    ? "We couldn't find any categories matching your search. Try different keywords."
                    : "No categories available at the moment. Please check back later."}
                </p>
                {(selectedFilter !== "all" || searchQuery) && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedFilter("all");
                      setSearchQuery("");
                    }}
                    className="mt-2"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Clear all filters
                  </Button>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}
