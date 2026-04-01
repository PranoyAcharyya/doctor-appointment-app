import React from 'react'
import { verifyAdmin } from '../../../../actions/admin'

export const metadata = {
    title: "Admin Settings - Medimeet",
    description: "Admin dashboard for managing doctors and appointments"
}

const AdminLayout = async() => {

    const isAdmin = await verifyAdmin();

  return (
    <div>layout</div>
  )
}

export default AdminLayout;