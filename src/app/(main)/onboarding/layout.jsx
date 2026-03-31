import React from "react";
import { getCurrentUser } from "../../../../actions/onBoarding";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Onboarding - Medimeet",
  description:
    "Join Medimeet and connect with top healthcare professionals for personalized consultations. Sign up now to experience affordable, convenient, and high-quality healthcare from the comfort of your home.",
};

const onboardingLayout = async ({ children }) => {
  const user = await getCurrentUser();
  if (user) {
    if (user.role === "PATIENT") {
      redirect("/doctors");
    } else if (user.role === "DOCTOR") {
      // Check verification status for doctors
      if (user.verificationStatus === "VERIFIED") {
        redirect("/doctor");
      } else {
        redirect("/doctor/verification");
      }
    } else if (user.role === "ADMIN") {
      redirect("/admin");
    }
  }

  return (
    <>
      <div className="container mx-auto px-4 pt-40 pb-12 relative isolate">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-green-300 via-emerald-200 to-green-100 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
          />
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">
              Welcome to <span className="text-green-500">MediMeet</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Tell us how you want to use the platform
            </p>
          </div>

          {children}
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-green-200 via-emerald-200 to-green-300 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72rem]"
          />
        </div>
      </div>
    </>
  );
};

export default onboardingLayout;
