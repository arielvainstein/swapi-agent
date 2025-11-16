/**
 * CharacterCard Component
 * Displays a character card with key information
 */

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Ruler, Weight } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Person } from "@/lib/types";
import { extractIdFromUrl } from "@/lib/api";

export interface CharacterCardProps {
  character: Person;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const router = useRouter();
  const characterId = extractIdFromUrl(character.url);

  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50"
      onClick={() => router.push(`/characters/${characterId}`)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {character.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {/* Name and Gender */}
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg truncate">{character.name}</CardTitle>
            <Badge variant="secondary" className="mt-1">
              {character.gender}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Birth Year */}
        {character.birth_year !== "unknown" && (
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Born:</span>
            <span className="font-medium">{character.birth_year}</span>
          </div>
        )}

        {/* Height */}
        {character.height !== "unknown" && (
          <div className="flex items-center gap-2 text-sm">
            <Ruler className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Height:</span>
            <span className="font-medium">{character.height} cm</span>
          </div>
        )}

        {/* Mass */}
        {character.mass !== "unknown" && (
          <div className="flex items-center gap-2 text-sm">
            <Weight className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Mass:</span>
            <span className="font-medium">{character.mass} kg</span>
          </div>
        )}

        {/* Physical Traits */}
        <div className="flex flex-wrap gap-1 pt-2 border-t">
          {character.hair_color !== "n/a" && character.hair_color !== "none" && (
            <Badge variant="outline" className="text-xs">
              {character.hair_color} hair
            </Badge>
          )}
          {character.eye_color !== "unknown" && (
            <Badge variant="outline" className="text-xs">
              {character.eye_color} eyes
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

