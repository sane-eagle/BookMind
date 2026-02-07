import "./index.css"
import React, { useRef } from "react"
import NavBar from "./Components/NavBar"
import Hero from "./Components/Hero"
import Home from "./Components/Home"
import Footer from "./Components/Footer"

const App = () => {
  const homeRef = useRef(null)

  return (
    <div className="app-wrapper">
      <NavBar />
      <Hero onMlSearch={(query) => homeRef.current?.mlSearch(query)} />
      <Home ref={homeRef} />
      <Footer />
    </div>
  )
}

export default App
