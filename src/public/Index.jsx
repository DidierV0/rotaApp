import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Action from './pages/Actions'
import Detail from './pages/Detail'


const Index = () => {
  return (
    <Routes>
        <Route index element={<Home/>}/>
        <Route path='/Login' element={<Login/>} />
        <Route path='/Actions' element={<Action/>} />
        <Route path='/detail/:id' element={<Detail/>} />
    </Routes>
  )
}

export default Index