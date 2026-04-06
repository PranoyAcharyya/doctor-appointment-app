import React from "react";
import { getAvailableTimeSlots, getDoctorbyId } from "../../../../../../actions/appointment";
import { redirect } from "next/navigation";
import DoctorProfileComponent from "./_components/DoctorProfileComponent";


const DoctorProfile = async ({ params }) => {
  const { id } = await params;

  try {

    const [doctorData,slotData] = await Promise.all([
        getDoctorbyId(id),
        getAvailableTimeSlots(id),
    ])

    return <DoctorProfileComponent doctor={doctorData.doctor} availableDays={slotData.days||[]}/> ;
  } catch (error) {
    console.log("Error loading doctor profile:",error);
    redirect("/doctors")
  }
};

export default DoctorProfile;
