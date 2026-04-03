import { TabsContent } from '@/components/ui/tabs'
import React from 'react'
import { getPendingDoctors, getVerifiedDoctors } from '../../../../actions/admin'
import PendngDoctors from './_components/pendng-doctors'
import VerifiedDoctors from './_components/verified-doctors'


const AdminPage = async() => {

    const [pendingDoctorsData, verifiedDoctorsData] = await Promise.all([
        getPendingDoctors(),
        getVerifiedDoctors(),
        // getPendingPayouts(),
    ])

  return (
    <>
        <TabsContent value="pending" className="border-none">
          <PendngDoctors doctors={pendingDoctorsData.doctors || []} />
        </TabsContent>
        <TabsContent value="doctors" className="border-none">
          <VerifiedDoctors doctors={verifiedDoctorsData.doctors || []}/>
        </TabsContent>
        <TabsContent value="payouts" className="border-none">Payouts</TabsContent>
    </>
  )
}

export default AdminPage