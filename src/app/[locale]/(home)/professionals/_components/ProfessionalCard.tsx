import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Award,
  Briefcase,
  CheckCircle2,
  Clock,
  MapPin,
  Star,
  Globe,
  Linkedin,
  Instagram,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import React from "react";

interface Professional {
  id: string;
  full_name: string;
  headline: string;
  bio: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  linkedin_url: string | null;
  instagram_url: string | null;
  city: string | null;
  image_url: string | null;
  available: boolean;
  domain: {
    id: string;
    name: string;
  };
}

export default function ProfessionalCard({
  professional,
}: {
  professional: Professional;
}) {
  const location = professional.city
    ? `${professional.city}`
    : professional.city || "Location not specified";

  const initials = professional.full_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="group border-border bg-card/50 transition-all hover:border-muted-foreground/50 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row">
          {/* Avatar */}
          <Avatar className="h-20 w-20 border flex-shrink-0">
            <AvatarImage
              src={professional.image_url || "/placeholder.svg"}
              alt={professional.full_name}
              className="object-contain"
            />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-lg font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>

          {/* Professional Info */}
          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {professional.full_name}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {professional.headline}
                </p>
              </div>
              <Badge variant="secondary" className="text-xs">
                {professional.domain.name}
              </Badge>
            </div>

            {/* Location */}
            <div className="mb-3 flex flex-wrap items-center justify-between gap-4 text-sm">
              <div className="flex gap-2">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{location}</span>
                </div>
                {professional.available && (
                  <Badge
                    variant="outline"
                    className="text-xs text-green-600 border-green-600"
                  >
                    Available
                  </Badge>
                )}
              </div>

              <div className="flex gap-2">
                <Link href={`/professionals/${professional.id}`}>
                  <Button
                    variant="outline"
                    className="flex-1 sm:flex-initial bg-transparent"
                  >
                    View Profile <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Bio */}
            {professional.bio && (
              <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                {professional.bio}
              </p>
            )}

            {/* Social Links */}
            <div className="mb-4 flex flex-wrap gap-2">
              {professional.website && (
                <a
                  href={professional.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Globe className="h-3 w-3" />
                  Website
                </a>
              )}
              {professional.linkedin_url && (
                <a
                  href={professional.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-blue-600 transition-colors"
                >
                  <Linkedin className="h-3 w-3" />
                  LinkedIn
                </a>
              )}
              {professional.instagram_url && (
                <a
                  href={professional.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-pink-600 transition-colors"
                >
                  <Instagram className="h-3 w-3" />
                  Instagram
                </a>
              )}
            </div>

            {/* Actions */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
