"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { addDays, addMinutes, endOfDay, format, isBefore } from "date-fns";
import { deductCreditsForAppointment } from "./credits";
import { revalidatePath } from "next/cache";
import { Auth } from "@vonage/auth";
import { Vonage } from "@vonage/server-sdk";

// Initialize Vonage Video API client

const credentials = new Auth({
  applicationId: process.env.NEXT_PUBLIC_VONAGE_APPLICATION_ID,
  privateKey: process.env.VONAGE_PRIVATE_KEY,
});

const options = {};
const vonage = new Vonage(credentials, options);

export async function getDoctorbyId(doctorId) {
  try {
    const doctor = await db.user.findUnique({
      where: {
        id: doctorId,
        role: "DOCTOR",
        verificationStatus: "VERIFIED",
      },
    });

    if (!doctor) {
      throw new Error("Doctor not found or not verified");
    }

    return { doctor };
  } catch (error) {
    throw new Error("Error fetching doctor: " + error.message);
  }
}

export async function getAvailableTimeSlots(doctorId) {
  try {
    const doctor = await db.user.findUnique({
      where: {
        id: doctorId,
        role: "DOCTOR",
        verificationStatus: "VERIFIED",
      },
    });

    if (!doctor) {
      throw new Error("Doctor not found or not verified");
    }

    const availability = await db.availability.findFirst({
      where: {
        doctorId: doctor.id,
        status: "AVAILABLE",
      },
    });

    if (!availability) {
      throw new Error("No available time slots found for this doctor");
    }

    const now = new Date();
    const days = [now, addDays(now, 1), addDays(now, 2), addDays(now, 3)];
    const lastDay = endOfDay(days[3]);

    const existingAppointments = await db.appointment.findMany({
      where: {
        doctorId: doctor.id,
        status: "SCHEDULED",
        startTime: {
          lte: lastDay,
        },
      },
    });

    const availableSlotsByDay = {};

    for (let day of days) {
      const dayString = format(day, "yyyy-MM-dd");
      availableSlotsByDay[dayString] = [];

      //create a copy of the availablity start/end time for the day

      const availabilityStart = new Date(availability.startTime);
      const availabilityEnd = new Date(availability.endTime);

      //Set the day to the current day we are processing
      availabilityStart.setFullYear(
        day.getFullYear(),
        day.getMonth(),
        day.getDate(),
      );
      availabilityEnd.setFullYear(
        day.getFullYear(),
        day.getMonth(),
        day.getDate(),
      );

      let current = new Date(availabilityStart);
      const end = new Date(availabilityEnd);

      while (
        isBefore(
          addMinutes(current, 30),
          end || +addMinutes(current, 30) === +end,
        )
      ) {
        const next = addMinutes(current, 30);
        if (isBefore(current, now)) {
          current = next;
          continue;
        }

        const overlaps = existingAppointments.some((appointment) => {
          const aStart = new Date(appointment.startTime);
          const aEnd = new Date(appointment.endTime);

          return (
            (current >= aStart && current < aEnd) ||
            (next > aStart && next <= aEnd) ||
            (current <= aStart && next >= aEnd)
          );
        });

        if (!overlaps) {
          availableSlotsByDay[dayString].push({
            startTime: current.toISOString(),
            endTime: next.toISOString(),
            formatted: `${format(current, "h:mm a")} - ${format(next, "h:mm a")}`,
            day: format(current, "EEEE, MMMM d"),
          });
        }

        current = next;
      }
    }

    //convert to array of slots group by day easier consumptiion in ui

    const result = Object.entries(availableSlotsByDay).map(([date, slots]) => ({
      date,
      displayDate:
        slots.length > 0
          ? slots[0].day
          : format(new Date(date), "EEEE, MMMM d"),
      slots,
    }));

    return { days: result };
  } catch (error) {
    throw new Error("Error fetching doctor: " + error.message);
  }
}

/**
 * Book a new appointment with a doctor
 */

export async function bookAppointment(formData) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    //Get the patient user

    const patient = await db.user.findUnique({
      where: {
        clerkUserId: userId,
        role: "PATIENT",
      },
    });

    if (!patient) {
      throw new Error("Patient not found");
    }

    //Parse the form data

    const doctorId = formData.get("doctorId");
    const startTime = new Date(formData.get("startTime"));
    const endTime = new Date(formData.get("endTime"));
    const patientDescription = formData.get("description") || null;

    if (!doctorId || !startTime || !endTime) {
      throw new Error("Missing required fields");
    }

    const doctor = await db.user.findUnique({
      where: {
        id: doctorId,
        role: "DOCTOR",
        verificationStatus: "VERIFIED",
      },
    });

    if (!doctor) {
      throw new Error("Doctor not found or not verified");
    }

    if (patient.credits < 2) {
      throw new Error("Insufficient credits");
    }

    const overlappingAppointment = await db.appointment.findUnique({
      where: {
        doctorID: doctorId,
        status: "SCHEDULED",
        OR: [
          {
            //New appointment starts during an existing appointment

            startTime: {
              lte: startTime,
            },
            endTime: {
              gt: startTime,
            },
          },
          {
            //New appointment ends during an existing appointment

            startTime: {
              lt: endTime,
            },
            endTime: {
              gte: endTime,
            },
          },
          {
            //New appointment completely overlaps an existing appointment

            startTime: {
              gte: startTime,
            },
            endTime: {
              lte: endTime,
            },
          },
        ],
      },
    });

    if (overlappingAppointment) {
      throw new Error("Time slot is already booked");
    }

    const sessionId = await createVideosession();

    const result = await db.$transaction(async (tx) => {
      const { success, error } = await deductCreditsForAppointment(
        patient.id,
        doctor.id,
      );

      if (!success) {
        throw new Error(error || "Failed to deduct credits");
      }

      const appointment = await tx.appointment.create({
        data: {
          doctorId: doctor.id,
          patientId: patient.id,
          startTime,
          endTime,
          patientDescription,
          videoSessionId: sessionId, // vonage session id for video call
          status: "SCHEDULED",
        },
      });

      return { appointment };
    });

    revalidatePath("/appointments");

    return { success: true, appointement: result.appointement };
  } catch (error) {
    throw new Error("Failed to book appointment" + error.message);
  }
}

/**
 * Generate a Vonage Video API session
 */

async function createVideosession() {
  try {
    const session = await vonage.video.createSession({
      mediaMode: "routed",
    });

    return session.sessionId;
  } catch (error) {
    throw new Error("Failed to create video session" + error.message)
  }
}
