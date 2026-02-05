import { useState, useRef, useEffect } from "react"
import axios from "axios"
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"
import "./Home.css"
import Result from "./Result"
import "bootstrap/dist/css/bootstrap.min.css"

const Home = () => {
  const [books, setBooks] = useState([])
  const [searchCategory, setSearchCategory] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const resultRef = useRef(null) // Reference for the Result component

  // Add animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".animate-on-scroll")
      elements.forEach((element) => {
        const position = element.getBoundingClientRect()
        // If element is in viewport
        if (position.top < window.innerHeight && position.bottom >= 0) {
          element.classList.add("animate-fade-in")
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    // Trigger once on load
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to Result component whenever books update
  useEffect(() => {
    if (books.length > 0 && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [books])

  // Function to fetch books
  const handleSearch = async (query, type = "") => {
    setIsLoading(true)
    //const url = `http://localhost:5001/api/books?query=${query}&type=${type}`;
    const url = `https://bookified-backend.onrender.com/api/books?query=${query}&type=${type}`

    try {
      const response = await axios.get(url)
      setBooks(response.data.items || [])
      setSearchCategory(query)

      // Scroll to the Result component after fetching data
      if (resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: "smooth" })
      }
    } catch (error) {
      console.error("Error fetching books:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleSearchByType = (type) => {
    if (searchQuery.trim() !== "") {
      handleSearch(searchQuery, type)
    }
  }

  return (
    <div id="home">
      <h1 className="title animate-on-scroll">Explore Your Favorite Books</h1>
      <p className="animate-on-scroll">Find your Favorite Books and add them to your shelf</p>

      <div className="genre-container animate-on-scroll" id="genres">
        <h2>Choose the books from the following genres:</h2>
        <div className="button-grid">
          <button className="genre-button adventure" onClick={() => handleSearch("adventure", "genre")}>
            Adventure
          </button>
          <button className="genre-button fantasy" onClick={() => handleSearch("fantasy", "genre")}>
            Fantasy
          </button>
          <button className="genre-button mystery" onClick={() => handleSearch("mystery", "genre")}>
            Mystery
          </button>
          <button className="genre-button romance" onClick={() => handleSearch("romance", "genre")}>
            Romance
          </button>
          <button className="genre-button science-fiction" onClick={() => handleSearch("science fiction", "genre")}>
            Science Fiction
          </button>
          <button className="genre-button thriller" onClick={() => handleSearch("thriller", "genre")}>
            Thriller
          </button>
        </div>
      </div>

      <div className="emotion-container animate-on-scroll" id="emotions">
        <h2>Choose the books based on the emotions you feel today:</h2>
        <div className="button-grid">
          <button className="emotion-button happy" onClick={() => handleSearch("happy", "emotion")}>
            Happy
          </button>
          <button className="emotion-button sad" onClick={() => handleSearch("sad", "emotion")}>
            Sad
          </button>
          <button className="emotion-button anxiety" onClick={() => handleSearch("anxiety", "emotion")}>
            Anxiety
          </button>
          <button className="emotion-button motivated" onClick={() => handleSearch("motivated", "emotion")}>
            Motivated
          </button>
          <button className="emotion-button inspire" onClick={() => handleSearch("inspirational", "emotion")}>
            Inspirational
          </button>
        </div>
      </div>

      {/* Reference the Result component */}
      <div ref={resultRef}>
        <Result books={books} searchCategory={searchCategory} />
      </div>
    </div>
  )
}

export default Home

