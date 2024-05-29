import React from 'react'
import DeleteAccount from './DeleteAccount'
import ChangePassword from './ChangePassword'
import UpdateAdditionalDetails from './UpdateAdditionalDetails'
import UploadProfilePhoto from './UploadProfilePhoto'

const Settings = () => {
  return (
    <div className='text-white'>
        <h1 className='text-3xl font-semibold'>Edit Profile</h1>
        <UploadProfilePhoto/>
        <UpdateAdditionalDetails/>
        <ChangePassword/>
        <DeleteAccount/>
    </div>
  )
}

export default Settings