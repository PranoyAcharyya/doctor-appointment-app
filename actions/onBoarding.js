"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";

export async function setUserRole(formData) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  //find user in database

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found in database");

  const role = formData.get("role");

  if (!role || !["PATIENT", "DOCTOR"].includes(role)) {
    throw new Error("Invalid role selected");
  }

  try {
    if (role === "PATIENT") {
      await db.user.update({
        where: {
          clerkUserId: userId,
        },
        data: {
          role: "PATIENT",
        },
      });

      revalidatePath("/");
      return { success: true, redirect: "/doctors" };
    }

    if (role === "DOCTOR") {
      const specialty = formData.get("specialty");
      const experience = parseInt(formData.get("experience"), 10);
      const credentialUrl = formData.get("credentialUrl");
      const description = formData.get("description");

      if (!specialty || !experience || !credentialUrl || !description) {
        throw new Error("All fields are required for doctors");
      }

      await db.user.update({
        where: {
          clerkUserId: userId,
        },
        data: {
          role: "DOCTOR",
          specialty,
          experience,
          credentialUrl,
          description,
          verificationStatus: "PENDING",
        },
      });

      revalidatePath("/");
      return { success: true, redirect: "/doctor/verification" };
    }
  } catch (error) {
    console.log("failed to set user role", error);
    throw new Error("Failed to set user role: " + error.message);
  }
}



export async function getCurrentUser() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    return user;
  } catch (error) {
    console.error("Failed to get user information:", error);
    return null;
  }
}
