import React from 'react'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import { Route, Routes } from 'react-router-dom'

const Index = () => {
  return (
    <Routes>
        <Route index element={<Dashboard/>}/>
        <Route path='/about' element={<About/>} />

    </Routes>
  )
}

export default Index