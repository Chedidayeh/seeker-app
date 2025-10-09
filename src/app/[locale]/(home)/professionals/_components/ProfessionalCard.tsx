import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { Award, Briefcase, CheckCircle2, Clock, LucideProps, MapPin, Star } from 'lucide-react';
import Link from 'next/link';
import React, { ForwardRefExoticComponent, RefAttributes } from 'react'

interface professionals {
  id: string;
  name: string;
  title: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  location: string;
  avatar: string;
  verified: boolean;
  yearsExperience: number;
  completedProjects: number;
  responseTime: string;
  specialties: string[];
}

export default function ProfessionalCard({ professional }: { professional: professionals }) {
  return (
    <Card
    key={professional.id}
    className="group cursor-pointer border-border bg-card transition-all hover:border-muted-foreground/50 hover:shadow-lg"
  >
    <CardContent className="p-6">
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Avatar */}
        <Avatar className="h-20 w-20 flex-shrink-0">
          <AvatarImage src={professional.avatar || "/placeholder.svg"} alt={professional.name} />
          <AvatarFallback>
            {professional.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        {/* Professional Info */}
        <div className="flex-1">
          <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {professional.name}
                </h3>
                {professional.verified && <CheckCircle2 className="h-5 w-5 text-blue-500" />}
              </div>
              <p className="text-sm text-muted-foreground">{professional.title}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-semibold text-foreground">
                ${professional.hourlyRate}
                <span className="text-sm font-normal text-muted-foreground">/hr</span>
              </p>
            </div>
          </div>

          {/* Rating and Location */}
          <div className="mb-3 flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-foreground">{professional.rating}</span>
              <span className="text-muted-foreground">({professional.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{professional.location}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Award className="h-4 w-4" />
              <span>{professional.yearsExperience} years experience</span>
            </div>
            <div className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              <span>{professional.completedProjects} projects</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Responds in {professional.responseTime}</span>
            </div>
          </div>

          {/* Specialties */}
          <div className="mb-4 flex flex-wrap gap-2">
            {professional.specialties.map((specialty) => (
              <Badge key={specialty} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button className="flex-1 sm:flex-initial">Contact Professional</Button>
            <Link href={`/professionals/${professional.id}`}>
              <Button variant="outline" className="flex-1 sm:flex-initial bg-transparent">
                View Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
  )
}
