"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SPECIALTIES } from "@/lib/specialities";
import { MagicCard } from "@/components/ui/magic-card";
import { useTheme } from "next-themes";

export default function DoctorsPage() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const isDark = mounted
    ? (theme === "system" ? systemTheme : theme) === "dark"
    : true;

  return (
    <div className="mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Find Your Doctor</h1>
        <p className="text-muted-foreground text-lg">
          Browse by specialty or view all available healthcare providers
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {SPECIALTIES.map((specialty) => (
          <Link key={specialty.name} href={`/doctors/${specialty.name}`}>
            <MagicCard
              mode="orb"
              glowFrom={isDark ? "#022C22" : "#CCFBF1"}
             glowTo={isDark ? "#0D9488" : "#5EEAD4"}
              className="p-0 rounded-2xl"
            >
              <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                <div className="w-12 h-12 rounded-full  dark:bg-emerald-900/20 flex items-center justify-center mb-4">
                  <div className="text-blue-400 dark:text-emerald-400">{specialty.icon}</div>
                </div>
                <h3 className="font-medium">{specialty.name}</h3>
              </CardContent>
            </MagicCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
