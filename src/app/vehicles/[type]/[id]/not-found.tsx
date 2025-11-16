/**
 * Vehicle/Starship Not Found Page
 * Displayed when a vehicle or starship ID doesn&apos;t exist
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Rocket, ArrowLeft } from "lucide-react";

export default function VehicleNotFound() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="rounded-full bg-destructive/10 p-6">
          <Rocket size={64} className="text-destructive" />
        </div>
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Vehicle Not Found</h1>
          <p className="text-muted-foreground max-w-md">
            The vehicle or starship you&apos;re looking for doesn&apos;t exist in our database. 
            Perhaps it&apos;s been scrapped for parts.
          </p>
        </div>

        <div className="flex gap-4">
          <Link href="/vehicles">
            <Button variant="default" className="gap-2">
              <ArrowLeft size={16} />
              Back to Vehicles
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

