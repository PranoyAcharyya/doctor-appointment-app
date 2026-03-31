import React from 'react'
import { getCurrentUser } from '../../../../../actions/onBoarding';
import { redirect } from 'next/navigation';


const VerificationPage = async () => {
    const user = await getCurrentUser();
    if(user?.verificationStatus === "VERIFIED"){
        redirect("/doctor");
    }
    const isRejected = user?.verificationStatus === "REJECTED";
    
  return (
    <div>page</div>
  )
}

export default VerificationPage