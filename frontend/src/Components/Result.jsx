import "./Result.css"

const Result = ({ books = [], searchCategory }) => {
  return (
    <div className="result-container">
      {books.length > 0 && (
        <>
          <h2>Results for "{searchCategory.charAt(0).toUpperCase() + searchCategory.slice(1)}":</h2>
          <div className="result-grid">
            {books.map((book) => (
              <div className="result-item" key={book.id}>
                <h3>{book.volumeInfo.title}</h3>
                <div className="image-container">
                  <img
                    src={book.volumeInfo.imageLinks?.thumbnail || "/placeholder.svg?height=200&width=150"}
                    alt={book.volumeInfo.title}
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = "/placeholder.svg?height=200&width=150"
                    }}
                  />
                </div>
                <p>{book.volumeInfo.authors?.join(", ") || "Unknown Author"}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Result

