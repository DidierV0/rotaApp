import React from 'react'
import BoardForm from '../../common/BoardForm'
import BoardList from '../../common/BoardList'

const Bureau = () => {
  return (

    <div className=' text-white'>
      <h1 className=' text-3xl'>Bureau</h1>
      <div className='flex justify-around'>
        <div>
          <p className=' mt-10 text-xl'>Ajouter un membre</p>
          <BoardForm/>
        </div>
        <div>
          <p className=' mt-10 text-xl'>Liste des membres</p>
          <BoardList/>
        </div>
      </div>
    </div>
  )
}

export default Bureau