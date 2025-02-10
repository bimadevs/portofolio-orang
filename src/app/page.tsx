'use client'

import { useEffect } from 'react'
import Navbar from './components/navbar'
import Hero from './components/hero'
import About from './components/about'
import Work from './components/work'
import Achievements from './components/achievements'
import Projects from './components/projects'

export default function Home() {
  useEffect(() => {
    // Initialize AOS
    if (typeof window !== 'undefined') {
      const AOS = require('aos')
      AOS.init({
        duration: 1000,
        once: true,
        offset: 100
      })
    }
  }, [])

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Work />
      <Achievements />
      <Projects />
    </>
  )
}