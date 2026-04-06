// "use client"
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { checkUser } from "@/lib/checkUser";
import {
  Calendar,
  CreditCard,
  ShieldCheck,
  Stethoscope,
  StethoscopeIcon,
  User,
} from "lucide-react";
import { checkAndAllocateCredits } from "../../actions/credits";
import { Badge } from "./ui/badge";

const Header = async () => {
  let user = await checkUser();

  if (user?.role === "PATIENT") {
    user = (await checkAndAllocateCredits(user)) || user;
  }

  return (
    <header className="fixed top-0 w-full border-b bg-background/30 dark:bg-background/0 backdrop-blur-md z-10">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={"/"}>
          <Image
            src="/logo-single.png"
            alt="medimeet logo"
            height={60}
            width={200}
            className="h-10 w-auto object-contain"
            loading="eager"
          />
        </Link>
        <div className="flex items-center space-x-4">
          <Show when="signed-out">
            <SignInButton>
              <Button variant="outlined">Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button variant="secondary">Sign Up</Button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
             {/* Doctor Links */}

            {user?.role === "DOCTOR" && (
              <Link href="/doctor">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center gap-2"
                >
                  <StethoscopeIcon className="h-4 w-4" />
                  Doctor Dashboard
                </Button>
                <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                  <Stethoscope className="h-4 w-4" />
                </Button>
              </Link>
            )}

            {/* Patient Links */}
            {user?.role === "PATIENT" && (
              <Link href="/appointments">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  My Appointments
                </Button>
                <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                  <Calendar className="h-4 w-4" />
                </Button>
              </Link>
            )}

            {/* Admin Links */}
            {user?.role === "ADMIN" && (
              <Link href="/admin">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center gap-2"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Admin Dashboard
                </Button>
                <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                  <ShieldCheck className="h-4 w-4" />
                </Button>
              </Link>
            )}

            {/* Unassigned Role */}
            {user?.role === "UNASSIGNED" && (
              <Link href="/onboarding">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Complete Profile
                </Button>
                <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                  <User className="h-4 w-4" />
                </Button>
              </Link>
            )}

            {(!user || user?.role !== "ADMIN") && (
              <Link href={user?.role === "PATIENT" ? "/pricing" : "/doctor"}>
                <Badge
                  variant="outline"
                  className="h-9 bg-emerald-900/20 border-emerald-700/30 px-3 py-1 flex items-center gap-2"
                >
                  <CreditCard className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">
                    {user && user.role !== "ADMIN" ? (
                      <>
                        {user.credits}{" "}
                        <span className="hidden md:inline">
                          {user?.role === "PATIENT"
                            ? "Credits"
                            : "Earned Credits"}
                        </span>
                      </>
                    ) : (
                      <>Pricing</>
                    )}
                  </span>
                </Badge>
              </Link>
            )}

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </Show>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
