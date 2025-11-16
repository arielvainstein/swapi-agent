/**
 * PageHeader Component
 * Consistent page title and description component
 */

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface BackButton {
  label: string;
  href: string;
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  backButton?: BackButton;
}

export function PageHeader({
  title,
  description,
  actions,
  backButton,
}: PageHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Back Button */}
      {backButton && (
        <Link href={backButton.href}>
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft size={16} />
            {backButton.label}
          </Button>
        </Link>
      )}

      {/* Header Content */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      <Separator />
    </div>
  );
}

