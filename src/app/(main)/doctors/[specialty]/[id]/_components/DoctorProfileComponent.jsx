"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  User,
  Calendar,
  Clock,
  Medal,
  FileText,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/ui/magic-card";
import { useTheme } from "next-themes";

const DoctorProfileComponent = ({ doctor, availableDays }) => {
  const [showBooking, setShowBooking] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, systemTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);
  const isDark = mounted
    ? (theme === "system" ? systemTheme : theme) === "dark"
    : true;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-1">
        <div className="md:sticky md:top-24">
          <MagicCard
            mode="orb"
             glowFrom={isDark ? "#022C22" : "#CCFBF1"}
             glowTo={isDark ? "#0D9488" : "#5EEAD4"}
            className="p-3 rounded-2xl"
          >
            <CardContent className="pt-6">
              <div>
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 bg-emerald-900/20">
                    {doctor.imageUrl ? (
                      <Image
                        src={doctor.imageUrl}
                        alt={doctor.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="h-16 w-16 text-emerald-400" />
                      </div>
                    )}
                  </div>

                  <h2 className="text-xl font-bold  mb-1">Dr. {doctor.name}</h2>

                  <Badge
                    variant="outline"
                    className="bg-emerald-900/20 border-emerald-900/30 text-emerald-400 mb-4"
                  >
                    {doctor.specialty}
                  </Badge>

                  <div className="flex items-center justify-center mb-2">
                    <Medal className="h-4 w-4 text-emerald-400 mr-2" />
                    <span className="text-muted-foreground">
                      {doctor.experience} years experience
                    </span>
                  </div>

                  <Button
                    // onClick={toggleBooking}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 mt-4"
                  >
                    {showBooking ? (
                      <>
                        Hide Booking
                        <ChevronUp className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Book Appointment
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </MagicCard>
        </div>
      </div>
      <div className="md:col-span-3 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              About {doctor.name}
            </CardTitle>
            <CardDescription>{doctor.specialty}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DoctorProfileComponent;
