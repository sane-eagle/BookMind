import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react"
import axios from "axios"
import "./Home.css"
import Result from "./Result"
import "bootstrap/dist/css/bootstrap.min.css"

const Home = forwardRef((props, ref) => {
  const [books, setBooks] = useState([])
  const [searchCategory, setSearchCategory] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const resultRef = useRef(null)

  /* ---------------- Scroll animation (UNCHANGED) ---------------- */
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".animate-on-scroll")
      elements.forEach((element) => {
        const position = element.getBoundingClientRect()
        if (position.top < window.innerHeight && position.bottom >= 0) {
          element.classList.add("animate-fade-in")
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  /* ---------------- Auto-scroll (UNCHANGED) ---------------- */
  useEffect(() => {
    if (books.length > 0 && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [books])

  /* ---------------- EXISTING search (GENRES / EMOTIONS) ---------------- */
  const handleSearch = async (query, type) => {
    setIsLoading(true)
    const url = `https://bookified-backend.onrender.com/api/books?query=${query}&type=${type}`

    try {
      const response = await axios.get(url)
      setBooks(response.data.items || [])
      setSearchCategory(query)
    } catch (error) {
      console.error("Error fetching books:", error)
    } finally {
      setIsLoading(false)
    }
  }

  /* ---------------- ML SEARCH ONLY (NEW, LOGIC ONLY) ---------------- */
  const handleMlSearch = async (query) => {
    setIsLoading(true)
    setSearchCategory(`AI results for "${query}"`)

    try {
      const recRes = await fetch(
        "https://bookmind-production-2165.up.railway.app/recommend",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookName: query }),
        }
      )

      const recData = await recRes.json()
      const recommendations = recData.recommended_books || []

      const googleResults = await Promise.all(
        recommendations.map((b) =>
          fetch(
            `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
              b.title
            )}&key=${import.meta.env.VITE_GOOGLE_BOOKS_KEY}`
          ).then((r) => r.json())
        )
      )

      setBooks(googleResults.flatMap((r) => r.items || []))
    } catch (err) {
      console.error("ML search failed:", err)
    } finally {
      setIsLoading(false)
    }
  }

  /* ---------------- EXPOSE ML SEARCH TO HERO ---------------- */
  useImperativeHandle(ref, () => ({
    mlSearch: handleMlSearch,
  }))

  /* ---------------- JSX BELOW IS 100% ORIGINAL ---------------- */
  return (
    <div id="home">
      <h1 className="title animate-on-scroll">
        Explore Your Favorite Books
      </h1>
      <p className="animate-on-scroll">
        Find your Favorite Books and add them to your shelf
      </p>

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

      {/* RESULT WRAPPER — THIS is what keeps books boxed */}
      <div ref={resultRef}>
        <Result books={books} searchCategory={searchCategory} />
      </div>
    </div>
  )
})

export default Home
