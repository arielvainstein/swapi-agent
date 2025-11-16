/**
 * Planet Not Found Page
 * Displayed when a planet ID doesn&apos;t exist
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Globe, ArrowLeft } from "lucide-react";

export default function PlanetNotFound() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="rounded-full bg-destructive/10 p-6">
          <Globe size={64} className="text-destructive" />
        </div>
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Planet Not Found</h1>
          <p className="text-muted-foreground max-w-md">
            The planet you&apos;re looking for doesn&apos;t exist in our database. 
            It may have been destroyed by the Death Star.
          </p>
        </div>

        <div className="flex gap-4">
          <Link href="/planets">
            <Button variant="default" className="gap-2">
              <ArrowLeft size={16} />
              Back to Planets
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

