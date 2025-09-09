import React from 'react'
import AllVideos from './components/AllVideos'

const Home = () => {



  return (
    <div className='w-[95%] mx-auto'>
      <div className='mt-10 text-center text-3xl font-bold text-slate-300'>
        <h1>See All <span className='text-rose-400'>Videos</span></h1>
      </div>
      <div>
        <AllVideos/>
      </div>
    </div>
  )
}

export default Home