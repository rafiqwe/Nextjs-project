
import React from 'react'
import Videos from './Videos'
import { apiClient } from '@/lib/api-client'

const AllVideos = async () => {

    // const res = await fetch('http://localhost:3000/api/video')
    // console.log(data);
    

  return (
    <div>
      <h1 className=' mt-5 capitalize font-bold text-2xl'>top videos ⤵️</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  gap-3'>
     
        <Videos title='hello' createBy='muhammad rabbi' />      
        <Videos title='hello' createBy='muhammad rabbi' />      
      </div>
    </div>
  )
}

export default AllVideos