import "./Result.css"

const Result = ({ books = [], searchCategory }) => {
  return (
    <div className="result-container">
      {books.length > 0 && (
        <>
          <h2>
            Results for "
            {searchCategory
              ? searchCategory.charAt(0).toUpperCase() +
                searchCategory.slice(1)
              : "Search"}
            ":
          </h2>

          <div className="result-grid">
            {books.map((book, index) => {
              // 🔒 DEFENSIVE READ (NO STRUCTURE CHANGE)
              const volumeInfo = book.volumeInfo || book

              const title =
                volumeInfo.title || "Unknown Title"

              const image =
                volumeInfo.imageLinks?.thumbnail ||
                volumeInfo.image ||
                "/placeholder.svg?height=200&width=150"

              const authors =
                volumeInfo.authors?.join(", ") ||
                volumeInfo.author ||
                "Unknown Author"

              return (
                <div className="result-item" key={book.id || index}>
                  <h3>{title}</h3>

                  <div className="image-container">
                    <img
                      src={image}
                      alt={title}
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src =
                          "/placeholder.svg?height=200&width=150"
                      }}
                    />
                  </div>

                  <p>{authors}</p>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

export default Result
