"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  Star,
  MapPin,
  ChevronLeft,
  Briefcase,
  Award,
  Clock,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Mail,
  Linkedin,
  Twitter,
  ThumbsUp,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

// Mock professional data
const professionalData: Record<string, any> = {
  "1": {
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
    about:
      "With over 12 years of experience in corporate law, I specialize in helping businesses navigate complex legal challenges. My approach combines deep legal expertise with practical business acumen to deliver solutions that protect your interests while enabling growth. I've successfully represented clients ranging from startups to Fortune 500 companies.",
    languages: ["English", "Spanish"],
    education: [
      {
        degree: "Juris Doctor (J.D.)",
        institution: "Harvard Law School",
        year: "2011",
      },
      {
        degree: "Bachelor of Arts in Political Science",
        institution: "Yale University",
        year: "2008",
      },
    ],
    certifications: ["Licensed Attorney - New York State Bar", "Certified Corporate Counsel"],
    services: [
      {
        name: "Contract Review & Drafting",
        description: "Comprehensive review and drafting of business contracts",
        price: 250,
        duration: "1 hour",
      },
      {
        name: "Legal Consultation",
        description: "Strategic legal advice for business decisions",
        price: 300,
        duration: "1 hour",
      },
      {
        name: "Corporate Compliance",
        description: "Ensure your business meets all regulatory requirements",
        price: 275,
        duration: "1 hour",
      },
    ],
    portfolio: [
      {
        title: "Tech Startup Acquisition",
        description: "Led legal team for $50M acquisition deal",
        image: "/legal-documents-stack.png",
      },
      {
        title: "International Trade Agreement",
        description: "Negotiated multi-million dollar trade contracts",
        image: "/business-meeting-collaboration.png",
      },
      {
        title: "Corporate Restructuring",
        description: "Guided Fortune 500 company through major restructuring",
        image: "/modern-corporate-office.png",
      },
    ],
    reviews: [
      {
        id: "1",
        author: "Michael Thompson",
        avatar: "/diverse-businessman.png",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Sarah provided exceptional legal guidance during our company's acquisition. Her attention to detail and strategic thinking were invaluable. Highly recommended!",
        helpful: 24,
      },
      {
        id: "2",
        author: "Jennifer Lee",
        avatar: "/confident-businesswoman.png",
        rating: 5,
        date: "1 month ago",
        comment:
          "Outstanding attorney! Sarah helped us navigate complex contract negotiations with ease. Her expertise and professionalism are top-notch.",
        helpful: 18,
      },
      {
        id: "3",
        author: "Robert Garcia",
        avatar: "/professional-man.jpg",
        rating: 4,
        date: "2 months ago",
        comment:
          "Very knowledgeable and responsive. Sarah helped our startup with incorporation and contract templates. Great value for the investment.",
        helpful: 12,
      },
    ],
    availability: {
      monday: ["9:00 AM - 5:00 PM"],
      tuesday: ["9:00 AM - 5:00 PM"],
      wednesday: ["9:00 AM - 5:00 PM"],
      thursday: ["9:00 AM - 5:00 PM"],
      friday: ["9:00 AM - 3:00 PM"],
      saturday: [],
      sunday: [],
    },
    stats: {
      onTimeDelivery: 98,
      clientSatisfaction: 96,
      repeatClients: 85,
    },
  },
}

export default function ProfessionalProfilePage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [activeTab, setActiveTab] = useState("overview")

  const professional = professionalData[id]

  if (!professional) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground">Professional not found</h1>
          <Button onClick={() => router.back()} className="mt-4">
            Go Back
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
          onClick={() => router.back()}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </Button>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header Card */}
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <div className="flex flex-col gap-6 sm:flex-row">
                  <Avatar className="h-32 w-32 flex-shrink-0">
                    <AvatarImage src={professional.avatar || "/placeholder.svg"} alt={professional.name} />
                    <AvatarFallback className="text-2xl">
                      {professional.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-3xl font-semibold text-foreground text-balance">{professional.name}</h2>
                          {professional.verified && (
                            <Badge variant="secondary" className="gap-1 bg-blue-50 text-blue-600 dark:bg-blue-900/20">
                              <CheckCircle2 className="h-3 w-3" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-lg text-muted-foreground mb-2">{professional.title}</p>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{professional.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4 flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-lg font-semibold text-foreground">{professional.rating}</span>
                        <span className="text-sm text-muted-foreground">({professional.reviewCount} reviews)</span>
                      </div>
                      <Separator orientation="vertical" className="h-6" />
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Award className="h-4 w-4" />
                        <span className="text-sm">{professional.yearsExperience} years experience</span>
                      </div>
                      <Separator orientation="vertical" className="h-6" />
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Briefcase className="h-4 w-4" />
                        <span className="text-sm">{professional.completedProjects} projects</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {professional.specialties.map((specialty: string) => (
                        <Badge key={specialty} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-muted">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 mt-6">
                {/* About */}
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed text-pretty">{professional.about}</p>
                  </CardContent>
                </Card>

                {/* Stats */}
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle>Performance Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">On-Time Delivery</span>
                        <span className="text-sm font-medium text-foreground">
                          {professional.stats.onTimeDelivery}%
                        </span>
                      </div>
                      <Progress value={professional.stats.onTimeDelivery} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Client Satisfaction</span>
                        <span className="text-sm font-medium text-foreground">
                          {professional.stats.clientSatisfaction}%
                        </span>
                      </div>
                      <Progress value={professional.stats.clientSatisfaction} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Repeat Clients</span>
                        <span className="text-sm font-medium text-foreground">{professional.stats.repeatClients}%</span>
                      </div>
                      <Progress value={professional.stats.repeatClients} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Education */}
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle>Education</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {professional.education.map((edu: any, index: number) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
                          <Award className="h-5 w-5 text-secondary-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{edu.degree}</p>
                          <p className="text-sm text-muted-foreground">{edu.institution}</p>
                          <p className="text-xs text-muted-foreground">{edu.year}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Certifications */}
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle>Certifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {professional.certifications.map((cert: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <span className="text-sm text-foreground">{cert}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="services" className="space-y-4 mt-6">
                {professional.services.map((service: any, index: number) => (
                  <Card
                    key={index}
                    className="border-border bg-card hover:border-muted-foreground/50 transition-colors"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground mb-2">{service.name}</h3>
                          <p className="text-sm text-muted-foreground mb-3 text-pretty">{service.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{service.duration}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-start sm:items-end gap-2">
                          <p className="text-2xl font-semibold text-foreground">
                            ${service.price}
                            <span className="text-sm font-normal text-muted-foreground">/hr</span>
                          </p>
                          <Button size="sm">Book Service</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="portfolio" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  {professional.portfolio.map((item: any, index: number) => (
                    <Card key={index} className="border-border bg-card overflow-hidden group cursor-pointer">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground text-pretty">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4 mt-6">
                {professional.reviews.map((review: any) => (
                  <Card key={review.id} className="border-border bg-card">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <Avatar className="h-10 w-10 flex-shrink-0">
                          <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.author} />
                          <AvatarFallback>
                            {review.author
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-medium text-foreground">{review.author}</p>
                              <p className="text-xs text-muted-foreground">{review.date}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-3 text-pretty">
                            {review.comment}
                          </p>
                          <Button variant="ghost" size="sm" className="h-8 gap-1 text-muted-foreground">
                            <ThumbsUp className="h-3 w-3" />
                            Helpful ({review.helpful})
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="border-border bg-card sticky top-8">
              <CardContent className="p-6 space-y-4">
                <div className="text-center pb-4 border-b border-border">
                  <p className="text-3xl font-semibold text-foreground mb-1">
                    ${professional.hourlyRate}
                    <span className="text-base font-normal text-muted-foreground">/hour</span>
                  </p>
                  <p className="text-sm text-muted-foreground">Starting rate</p>
                </div>

                <div className="space-y-2">
                  <Button className="w-full gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="w-full gap-2 bg-transparent">
                    <Calendar className="h-4 w-4" />
                    Schedule Consultation
                  </Button>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Responds in</span>
                    <span className="font-medium text-foreground">{professional.responseTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-muted-foreground">
                      <span className="font-medium text-foreground">{professional.stats.repeatClients}%</span> repeat
                      clients
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      <span className="font-medium text-foreground">{professional.completedProjects}</span> projects
                      completed
                    </span>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Languages</p>
                  <div className="flex flex-wrap gap-2">
                    {professional.languages.map((lang: string) => (
                      <Badge key={lang} variant="secondary">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />
                <div className="gap-2 space-x-2">

                <Button variant="outline" size="icon" className="bg-transparent">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="bg-transparent">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="bg-transparent">
                  <Mail className="h-4 w-4" />
                </Button>
                </div>

              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </section>
  )
}
