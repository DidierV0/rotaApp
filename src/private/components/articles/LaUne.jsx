import React from 'react'
import CardUne from '../../common/CardUne'

const LaUne = () => {

  
  return (
    <>
    <div className=' text-white'>
      <h1 className=' text-3xl'>A la Une</h1>
    </div>
    <div className='flex justify-around mt-10'>
      <div className=' w-1/4'><CardUne docId ="FKgxM92i9OWUQOiDJNgG"  /></div>
      <div className=' w-1/4'><CardUne docId ="fhVzP8b3jhGhIrfaqTLe"  /></div>
      <div className=' w-1/4'><CardUne docId ="sDql32Z1KgcHl3wheugg"  /></div>
    </div>
    </>
  )
}

export default LaUne