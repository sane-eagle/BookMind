import { useEffect, useState } from "react"
import "./Hero.css"

const Hero = ({ onMlSearch }) => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [mlQuery, setMlQuery] = useState("")

  const placeholders = [
    "Search for mystery novels...",
    "Find books about adventure...",
    "Discover romance stories...",
    "Explore science fiction...",
    "Look for fantasy worlds...",
    "Search by your favorite author...",
    "Find books that inspire you...",
    "Discover thriller masterpieces..."
  ]

  // Typewriter effect (UNCHANGED)
  useEffect(() => {
    const currentText = placeholders[placeholderIndex]
    const timeout = isDeleting ? 50 : 100

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setPlaceholderIndex((prev) => (prev + 1) % placeholders.length)
        }
      }
    }, timeout)

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, placeholderIndex])

  return (
    <div className="hero-container">
      {/* ---------------- AI SEARCH BOX (UNCHANGED) ---------------- */}
      <div className="ai-search-container animate-on-scroll">
        <div className="ai-search-glow"></div>

        <input
          type="text"
          className="ai-search-input"
          value={mlQuery}
          onChange={(e) => setMlQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && mlQuery.trim()) {
              onMlSearch(mlQuery.trim())
              setMlQuery("")
              window.location.href = "#home"
            }
          }}
          onFocus={(e) =>
            e.target.parentElement.classList.add("focused")
          }
          onBlur={(e) =>
            e.target.parentElement.classList.remove("focused")
          }
        />

        <div className="placeholder-text">
          {displayText}
          <span className="cursor">|</span>
        </div>

        <div className="ai-search-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>

        <div className="ai-particles">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* ---------------- BOOK IMAGE / GIF (RESTORED) ---------------- */}
      <div className="book-container">
        <div className="book">
          <div className="book__pg-shadow"></div>
          <div className="book__pg"></div>
          <div className="book__pg book__pg--2"></div>
          <div className="book__pg book__pg--3"></div>
          <div className="book__pg book__pg--4"></div>
          <div className="book__pg book__pg--5"></div>
        </div>
      </div>

      {/* ---------------- TEXT + EXPLORE BUTTON (RESTORED) ---------------- */}
      <div className="animate-on-scroll">
        <p>
          This Web page is the home for all book lovers. Come explore and find your
          books which express your thoughts and feelings. Shape your mind with the
          best books.
        </p>
        <button
          className="explore-button"
          onClick={() => {
            window.location.href = "#home"
          }}
        >
          Explore
        </button>
      </div>
    </div>
  )
}

export default Hero
