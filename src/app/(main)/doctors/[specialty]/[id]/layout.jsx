import React from "react";

import { redirect } from "next/navigation";
import { PageHeader } from "@/components/Page-header";
import { getDoctorbyId } from "../../../../../../actions/appointment";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { doctor } = await getDoctorbyId(id);

  return {
    title: `Dr. ${doctor.name} - Medimeet`,
    description: `Book and appointment with Dr.${doctor.name},${doctor.specialty} specialist with ${doctor.experience} years of experience`,
  };
}

const DoctorProfileLayout = async ({ children, params }) => {
  const { id } = await params;
  const { doctor } = await getDoctorbyId(id);

  if (!doctor) redirect("/doctors");

  return (
    <>
      <div className="container mx-auto px-4 pt-24 pb-8">
        <PageHeader 
        title={`Dr ${doctor.name}`} 
        backLink={`/doctors/${doctor.specialty}`}
        backLabel={`Back to ${doctor.specialty}`}
        />
        {children}
      </div>
    </>
  );
};

export default DoctorProfileLayout;
