/**
 * LastUpdated Component
 * Displays when the dashboard was last updated
 */

"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export function LastUpdated() {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <Clock className="h-3 w-3" />
      <span>Last updated: {timeString || "Loading..."}</span>
    </div>
  );
}

