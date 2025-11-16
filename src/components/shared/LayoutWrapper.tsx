/**
 * LayoutWrapper Component
 * Wraps the entire app with navigation and AI chat
 */

"use client";

import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { AIChat } from "./AIChat";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header onMenuClick={() => setIsSidebarOpen(true)} />

      {/* Sidebar (Mobile) */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* AI Chat Bubble */}
      <AIChat />
    </div>
  );
}

