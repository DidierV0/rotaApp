import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../common/Header'
import Navbar from '../common/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Project from '../components/Project'
import Contact from '../components/Contact'
import Footer from '../common/Footer'

const Home = () => {
  return (
    <>
    <div className=' w-screen flex flex-col items-end px-0'>
      
      <div className=' max-lg:hidden flex justify-end items-center pr-10 fixed z-30 mt-72'><Navbar/></div>
      <div className=' relative z-20'><Hero/></div>
      <div className=' relative z-20'><About/></div>
      <div className=' relative z-20'><Project/></div>
      <div className=' relative z-20'><Contact/></div>
      <div className=' relative z-20'><Footer/></div>
      
    </div>
    </>
  )
}

export default Home