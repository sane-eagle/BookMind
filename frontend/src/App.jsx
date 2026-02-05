import "./index.css"
import React from "react"
import NavBar from "./Components/NavBar"
import Hero from "./Components/Hero"
import Home from "./Components/Home"
import Footer from "./Components/Footer"

const App = () => {
  return (
    <div className="app-wrapper">
      <NavBar />
      <Hero />
      <Home />
      <Footer />
    </div>
  )
}

export default App

