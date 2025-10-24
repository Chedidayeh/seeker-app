"use client";

import {
  MapPin,
  ChevronLeft,
  Briefcase,
  Award,
  CheckCircle2,
  MessageSquare,
  Mail,
  Linkedin,
  Users,
  Globe,
  Instagram,
  Phone,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { type ProfessionalWithDetails } from "@/actions/professionals";
import { useRouter } from "next/navigation";

export default function ProfessionalProfilePage({
  professional,
}: {
  professional: ProfessionalWithDetails;
}) {
  const router = useRouter();

  const initials =
    professional?.full_name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "??";
  const city = professional?.city
    ? `${professional.city}`
    : professional?.city || "City not specified";
  const location = professional?.address || "Location not specified";


  function formatTunisianPhone(phone: string) {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, "");

  // If the number already includes the country code
  if (digits.startsWith("216") && digits.length === 11) {
    return `+216 ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
  }

  // If the number starts with 0 and is 8 digits long (local Tunisian format)
  if (digits.startsWith("0") && digits.length === 8) {
    return `+216 ${digits.slice(1, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  }

  // If it’s already 8 digits (without 0)
  if (digits.length === 8) {
    return `+216 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
  }

  // Fallback – return as is
  return phone;
}

  return (
    <section className="min-h-screen py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 group"
        >
          <ChevronLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back
        </Button>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Enhanced Profile Header Card */}
            <Card className="border-2 border-border/50 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden relative">
              {/* Header Background Gradient */}

              <CardContent className="p-8 relative">
                <div className="flex flex-col gap-6 sm:flex-row">
                  {/* Enhanced Avatar */}
                  <div className="relative flex-shrink-0">
                    <Avatar className="h-32 w-32 ring-4 ring-border group-hover:ring-primary/50 transition-all duration-300 shadow-lg">
                      <AvatarImage
                        src={professional.image_url || "/placeholder.svg"}
                        alt={professional.full_name}
                        className="object-contain"
                      />
                      <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-primary via-blue-500 to-indigo-600 text-white">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex-1">
                    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-3xl font-bold text-foreground">
                            {professional.full_name}
                          </h2>
                        </div>
                        <p className="text-lg font-medium text-muted-foreground mb-3">
                          {professional.headline}
                        </p>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4 flex-shrink-0" />
                          <span className="text-sm font-medium">
                            {location}
                          </span>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className="text-sm font-semibold bg-primary/10 text-primary border-primary/20 px-3 py-1.5"
                      >
                        {professional.domain.name}
                      </Badge>
                    </div>

                    {professional.available && (
                      <Badge
                        variant="outline"
                        className="mb-4 text-sm font-medium text-green-600 bg-green-50 dark:bg-green-950 border-green-600/50"
                      >
                        <div className="mr-1.5 h-2 w-2 rounded-full bg-green-600 animate-pulse" />
                        Available for Work
                      </Badge>
                    )}

                    {/* Bio */}
                    {professional.bio && (
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                        {professional.bio}
                      </p>
                    )}

                    {/* Contact Methods */}
                    <div className="flex flex-wrap gap-2">
                      {professional.website && (
                        <a
                          href={professional.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Globe className="h-3.5 w-3.5" />
                          Website
                        </a>
                      )}
                      {professional.linkedin_url && (
                        <a
                          href={professional.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-blue-600 transition-colors"
                        >
                          <Linkedin className="h-3.5 w-3.5" />
                          LinkedIn
                        </a>
                      )}
                      {professional.instagram_url && (
                        <a
                          href={professional.instagram_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-pink-600 transition-colors"
                        >
                          <Instagram className="h-3.5 w-3.5" />
                          Instagram
                        </a>
                      )}
                      {professional.email && (
                        <a
                          href={`mailto:${professional.email}`}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          Email
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About Section */}
            {professional.bio && (
              <Card className="border-2 border-border/50 bg-card/50 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    About
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {professional.bio}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Professional Details */}
            <Card className="border-2 border-border/50 bg-card/50 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Professional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Category
                      </p>
                      <p className="text-base font-semibold text-foreground">
                        {professional.domain.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-500/10">
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Status
                      </p>
                      <p className="text-base font-semibold text-foreground">
                        {professional.available ? "Available" : "Not Available"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                      <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Location
                      </p>
                      <p className="text-base font-semibold text-foreground">
                        {location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-purple-500/10">
                      <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Expertise
                      </p>
                      <p className="text-base font-semibold text-foreground">
                        {professional.headline}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="border-2 border-border/50 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300 sticky top-8">
              <CardContent className="p-6 space-y-4">
                <div className="text-center pb-4 border-b border-border">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Mail className="h-6 w-6 text-primary" />
                    <h3 className="text-lg font-bold text-foreground">
                      Get in Touch
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Contact this professional directly
                  </p>
                  <div className="mt-2">
                    {professional.phone && (
                      <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                        <Phone className="h-4 w-4" />
          Phone: {formatTunisianPhone(professional.phone)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  {professional.email && (
                    <a href={`mailto:${professional.email}`}>
                      <Button className="w-full gap-2">
                        <Mail className="h-4 w-4" />
                        Send Email
                      </Button>
                    </a>
                  )}
                  {professional.phone && (
                    <a href={`tel:${professional.phone}`}>
                      <Button variant="outline" className="w-full gap-2">
                        <Phone className="h-4 w-4" />
                        Call Now
                      </Button>
                    </a>
                  )}
                  {!professional.email && !professional.phone && (
                    <Button className="w-full gap-2" disabled>
                      <MessageSquare className="h-4 w-4" />
                      Contact Information Not Available
                    </Button>
                  )}
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      {professional.available ? (
                        <span className="font-medium text-green-600 dark:text-green-400">
                          Currently Available
                        </span>
                      ) : (
                        <span className="font-medium text-muted-foreground">
                          Not Currently Available
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Specializes in{" "}
                      <span className="font-medium text-foreground">
                        {professional.domain.name}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Based in{" "}
                      <span className="font-medium text-foreground">
                        {city}
                      </span>
                    </span>
                  </div>
                </div>

                {(professional.website ||
                  professional.linkedin_url ||
                  professional.instagram_url) && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-sm font-medium text-foreground mb-3">
                        Connect Online
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {professional.website && (
                          <a
                            href={professional.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 min-w-[100px]"
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full gap-2"
                            >
                              <Globe className="h-4 w-4" />
                              Website
                              <ExternalLink className="h-3 w-3 ml-auto" />
                            </Button>
                          </a>
                        )}
                        {professional.linkedin_url && (
                          <a
                            href={professional.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 min-w-[100px]"
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full gap-2 hover:text-blue-600 hover:border-blue-600"
                            >
                              <Linkedin className="h-4 w-4" />
                              LinkedIn
                              <ExternalLink className="h-3 w-3 ml-auto" />
                            </Button>
                          </a>
                        )}
                        {professional.instagram_url && (
                          <a
                            href={professional.instagram_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 min-w-[100px]"
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full gap-2 hover:text-pink-600 hover:border-pink-600"
                            >
                              <Instagram className="h-4 w-4" />
                              Instagram
                              <ExternalLink className="h-3 w-3 ml-auto" />
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
