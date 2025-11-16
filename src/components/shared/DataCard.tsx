/**
 * DataCard Component
 * Generic card for displaying data with title and content
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface DataCardProps {
  title: string;
  children: React.ReactNode;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  footer?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function DataCard({
  title,
  children,
  badge,
  badgeVariant = "default",
  footer,
  onClick,
  className,
}: DataCardProps) {
  return (
    <Card
      className={cn(
        "transition-all",
        onClick && "cursor-pointer hover:shadow-md hover:border-primary/50",
        className
      )}
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          {badge && <Badge variant={badgeVariant}>{badge}</Badge>}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
        {footer && (
          <div className="pt-4 border-t text-sm text-muted-foreground">
            {footer}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

