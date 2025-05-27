// src/App.jsx

import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
import gsap from 'gsap'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then(userData => {
        if (userData) dispatch(login({ userData }))
        else dispatch(logout())
      })
      .finally(() => setLoading(false))
  }, [dispatch])

  // COUNTER FUNCTION
  function time() {
    let a = 0
    const intervalID = setInterval(() => {
      a = Math.min(a + Math.floor(Math.random() * 20 + 1), 100)
      document.querySelector(".loader h1").innerText = a + "%"
      if (a === 100) clearInterval(intervalID)
    }, 150)
  }

  // FIRE TIMELINE ONCE WHEN loading FLIPS FALSE
  useEffect(() => {
    if (!loading) {
      const tl = gsap.timeline()
      tl.to(".loader h1", {
        scale: 1.5,
        delay: 0.5,
        duration: 1,
        onStart: time,           // ← pass the function, not time()
      })
      tl.to(".loader", {
        top: "-100vh",
        delay: 0.5,
        duration: 1,
      })
    }
  }, [loading])

  // only render once loading flips false; this ensures loader is in the DOM
  if (loading) return null

  return (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className="loader">
        <h1>0%</h1>
      </div>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
