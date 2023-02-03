import React, { useState } from "react"
import Image from 'next/image'
import axios from "axios"


export default function Home() {

  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await axios.post<string>("http://localhost:5000/generate", { description })
      const url = response.data
      setImageUrl(url)
    } catch (error) {
      console.error(error)
    }
  }
  
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center">
      <form className="flex flex-col items-center justify-center w-full" onSubmit={handleSubmit}>
        <h1 className="text-3xl m-4 text-violet-500 font-bold">Description</h1>
        
        <textarea
          className="bg-slate-100 p-4 mb-8 w-[50%]"
          id="description"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value)
          }}
        />

        <button 
          className="bg-violet-500 text-white p-4 rounded"
          type="submit" >Generate Image</button>
      
      </form>

      <div className="text-xl m-4 ">  
        { imageUrl !== '' ? 
            <>
              <a className="cursor-pointer text-blue-500 m-4 hover:text-violet-500" href={imageUrl}>Generated Image, click here</a>
            </>
          : <p className="text-gray-500 m-4">Waiting generate image...</p> }
      </div>

      <div className="reset">
        <span 
          className="font-bold cursor-pointer bg-red-500 text-white p-2 rounded"
          onClick={() => { 
            setImageUrl("") 
            setDescription("")
          }}>Reset</span>
      </div>
    </div>
  )
}
