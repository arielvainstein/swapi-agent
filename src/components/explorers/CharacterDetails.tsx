/**
 * CharacterDetails Component
 * Displays comprehensive character information
 */

"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Calendar,
  Ruler,
  Weight,
  Eye,
  Palette,
  MapPin,
  Film,
  Rocket,
  Car,
} from "lucide-react";
import type { Person } from "@/lib/types";

interface CharacterDetailsProps {
  character: Person;
}

interface DetailRowProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  variant?: "default" | "highlight";
}

function DetailRow({ icon, label, value, variant = "default" }: DetailRowProps) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
      <div className="mt-0.5 text-muted-foreground">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p
          className={`text-base font-semibold ${
            variant === "highlight" ? "text-primary" : ""
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

interface InfoSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function InfoSection({ title, icon, children }: InfoSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="text-primary">{icon}</div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export function CharacterDetails({ character }: CharacterDetailsProps) {
  // Helper to get gender badge color
  const getGenderColor = (gender: string) => {
    switch (gender.toLowerCase()) {
      case "male":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
      case "female":
        return "bg-pink-500/10 text-pink-700 dark:text-pink-400";
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
    }
  };

  // Extract ID from URL for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6">
      {/* Character Header Card */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="flex justify-center md:justify-start">
            <Avatar className="h-32 w-32 border-4 border-primary/20">
              <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-primary/20 to-primary/10">
                {getInitials(character.name)}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Header Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{character.name}</h1>
              <div className="flex flex-wrap gap-2">
                <Badge className={getGenderColor(character.gender)}>
                  {character.gender}
                </Badge>
                {character.birth_year !== "unknown" && (
                  <Badge variant="outline">Born {character.birth_year}</Badge>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">
                  {character.films.length}
                </p>
                <p className="text-xs text-muted-foreground">Films</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">
                  {character.starships.length}
                </p>
                <p className="text-xs text-muted-foreground">Starships</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">
                  {character.vehicles.length}
                </p>
                <p className="text-xs text-muted-foreground">Vehicles</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">
                  {character.species.length || 1}
                </p>
                <p className="text-xs text-muted-foreground">Species</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Physical Characteristics */}
      <Card className="p-6">
        <InfoSection title="Physical Characteristics" icon={<User size={20} />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <DetailRow
              icon={<Ruler size={18} />}
              label="Height"
              value={
                character.height !== "unknown"
                  ? `${character.height} cm`
                  : "Unknown"
              }
            />
            <DetailRow
              icon={<Weight size={18} />}
              label="Mass"
              value={
                character.mass !== "unknown"
                  ? `${character.mass} kg`
                  : "Unknown"
              }
            />
            <DetailRow
              icon={<Palette size={18} />}
              label="Hair Color"
              value={character.hair_color}
            />
            <DetailRow
              icon={<Palette size={18} />}
              label="Skin Color"
              value={character.skin_color}
            />
            <DetailRow
              icon={<Eye size={18} />}
              label="Eye Color"
              value={character.eye_color}
            />
            <DetailRow
              icon={<Calendar size={18} />}
              label="Birth Year"
              value={character.birth_year}
            />
          </div>
        </InfoSection>
      </Card>

      {/* Origin & Associations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <InfoSection title="Origin" icon={<MapPin size={20} />}>
            <DetailRow
              icon={<MapPin size={18} />}
              label="Homeworld"
              value={character.homeworld ? "View Homeworld" : "Unknown"}
              variant="highlight"
            />
          </InfoSection>
        </Card>

        <Card className="p-6">
          <InfoSection title="Appearances" icon={<Film size={20} />}>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Film size={18} className="text-muted-foreground" />
                  <span className="font-medium">Films</span>
                </div>
                <Badge>{character.films.length}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Rocket size={18} className="text-muted-foreground" />
                  <span className="font-medium">Starships</span>
                </div>
                <Badge>{character.starships.length}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Car size={18} className="text-muted-foreground" />
                  <span className="font-medium">Vehicles</span>
                </div>
                <Badge>{character.vehicles.length}</Badge>
              </div>
            </div>
          </InfoSection>
        </Card>
      </div>

      <Separator />

      {/* Metadata */}
      <Card className="p-4 bg-muted/30">
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          <div>
            <span className="font-medium">Created:</span>{" "}
            {new Date(character.created).toLocaleDateString()}
          </div>
          <div>
            <span className="font-medium">Last Modified:</span>{" "}
            {new Date(character.edited).toLocaleDateString()}
          </div>
          <div>
            <span className="font-medium">URL:</span>{" "}
            <code className="text-xs">{character.url}</code>
          </div>
        </div>
      </Card>
    </div>
  );
}

