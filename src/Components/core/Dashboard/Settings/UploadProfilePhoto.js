import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconButton from '../../../common/IconButton'
import { FiUpload } from "react-icons/fi"
import { updateDisplayPicture } from '../../../../Services/operations/settingAPI'

const UploadProfilePhoto = () => {
    const {token} = useSelector((state)=>state.auth)
    const {user} = useSelector((state)=>state.profile)
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false)
    const [imageFile, setImageFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(null)
  
    const fileInputRef = useRef(null)
  
    const handleClick = () => {
      fileInputRef.current.click()
    }
  
    const handleFileChange = (e) => {
      const file = e.target.files[0]
    //   console.log(file)
      if (file) {
        setImageFile(file)
        previewFile(file)
      }
    }
  
    const previewFile = (file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setPreviewSource(reader.result)
      }
    }
  
    const handleFileUpload = () => {
      try {
        console.log("uploading...")
        setLoading(true)
        const formData = new FormData()
        formData.append("Image_url", imageFile)
        dispatch(updateDisplayPicture(token, formData)).then(() => {
          setLoading(false)
        })
      } catch (error) {
        console.log("ERROR MESSAGE - ", error.message)
      }
    }
  
    useEffect(() => {
      if (imageFile) {
        previewFile(imageFile)
      }
    }, [imageFile])

  return (
    <div className='font-inter'>
        <div className='flex items-center mt-12 mb-10 bg-richblack-800 rounded-lg py-6 px-10 border border-richblack-600 gap-x-5'>
            <img className='rounded-full w-20 h-20' src={user.image}/>
            <div>
                <h1 className='text-richblack-25'>Change Profile Picture</h1>
                <div className="flex flex-row gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />
              <button
                onClick={handleClick}
                disabled={loading}
                className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
              >
                Select
              </button>
              <IconButton
                text={loading ? "Uploading..." : "Upload"}
                onclick={handleFileUpload}
                customClasses="bg-yellow-50 text-center text-black flex rounded-md px-2 justify-center items-center gap-x-2 -py-1"
              >
                {!loading && (
                  <FiUpload className="text-lg text-richblack-900" />
                )}
              </IconButton>
            </div>
            </div>
        </div>
    </div>
  )
}

export default UploadProfilePhoto