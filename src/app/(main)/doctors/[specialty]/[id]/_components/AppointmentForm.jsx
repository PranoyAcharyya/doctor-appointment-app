"use client"
import React, { useState } from 'react'
import useFetch from '../../../../../../../hooks/use-fetch'
import { bookAppointment } from '../../../../../../../actions/appointment'

const AppointmentForm = ({doctorId,slot,onBack,onComplete}) => {
  const [description,setDescription] = useState("")
  const {loading,data,fn:submitBooking} = useFetch(bookAppointment);
  return (
    <div>AppointmentForm</div>
  )
}

export default AppointmentForm