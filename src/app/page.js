"use client"

import { useState } from "react"

const Page = ()=>{

  const [image, setImage] = useState("")
  const [uploadedImage, setUploadedImage] = useState("")
  
  const handleImageValue = (e)=>{
    const files = e.target.files[0]
    setImage(files)

  }

  const uploadImage = async()=>{

    if(!image){
      alert("Please Select an Image Before Uploading")
    }

    const formData = new FormData();
    formData.append(`file`, image)
    formData.append('upload_preset', 'lsdifnsl')
    formData.append('cloud_name', 'dvqlgaqsy')

    try{
      const get = await fetch("https://api.cloudinary.com/v1_1/dvqlgaqsy/image/upload",{
        method:"POST",
        body:formData,
      })

      const getJSON = await get.json()
      console.log(getJSON)
      setUploadedImage(getJSON.secure_url)
      setImage('')
    }catch (error){
      console.log("ERROR")
    }
  }

  console.log(image)
  return(
    <div>
      <div>
          <input type="file" onChange={(e)=>{handleImageValue(e)}} accept="image/*" />
          <button onClick={()=>uploadImage()}>Upload Image</button>
      </div>
      {
        uploadedImage? 
        <div>
          <h1>Uploaded Image</h1>
          <img src= {uploadedImage} alt="Uploaded"/>
        </div>:""
      }
    </div>
  )
}

export default Page;