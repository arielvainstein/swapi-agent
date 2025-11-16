/**
 * Character Not Found Page
 * Displayed when a character ID doesn't exist
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserX, ArrowLeft } from "lucide-react";

export default function CharacterNotFound() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="rounded-full bg-destructive/10 p-6">
          <UserX size={64} className="text-destructive" />
        </div>
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Character Not Found</h1>
          <p className="text-muted-foreground max-w-md">
            The character you&apos;re looking for doesn&apos;t exist in our galaxy. 
            Perhaps they&apos;re hiding in a galaxy far, far away.
          </p>
        </div>

        <div className="flex gap-4">
          <Link href="/characters">
            <Button variant="default" className="gap-2">
              <ArrowLeft size={16} />
              Back to Characters
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

