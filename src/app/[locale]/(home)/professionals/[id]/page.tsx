
import {
  ChevronLeft,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { getProfessionalById } from "@/actions/professionals"
import ProfessionalProfilePage from "./View"
import Link from "next/link"


export default async function Page(params: { params: { id: string } }) {
        const professional = await getProfessionalById(params.params.id)


  if (!professional) {
    return (
      <section className="min-h-screen py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        
        <div className="flex min-h-[60vh] items-center justify-center relative z-10">
          <div className="text-center space-y-4">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
              <Users className="h-10 w-10 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Professional not found</h1>
            <p className="text-muted-foreground">The professional you're looking for doesn't exist or has been removed.</p>
            <Link href="/professionals">
            <Button  className="mt-6">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Browse All Professionals
            </Button>
            </Link>

          </div>
        </div>
      </section>
    )
  }

  return (
     <ProfessionalProfilePage professional={professional} />
  )
}
