import express, { json } from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});
app.use(json());

dotenv.config();

// Define mappings for genres and emotions
const predefinedCategories = {
  genres: {
    adventure: "adventure",
    fantasy: "fantasy",
    mystery: "mystery",
    romance: "romance",
    "science fiction": "science+fiction",
    thriller: "thriller",
  },
  emotions: {
    happy: "happiness+positive",
    sad: "grief+melancholy",
    anxiety: "self-help+calm",
    motivated: "inspiration+motivation",
    inspirational: "biography+success",
  },
};

// Route to handle book search queries
app.get("/api/books", async (req, res) => {
  const { query, type } = req.query; // Query and type (genre, emotion, name, or author)
  const API_KEY = process.env.GOOGLE_API_KEY; // Google Books API key

  let searchTerm = query;

  // Map query to predefined categories if type is provided
  if (type === "genre") {
    searchTerm = predefinedCategories.genres[query.toLowerCase()] || query;
  } else if (type === "emotion") {
    searchTerm = predefinedCategories.emotions[query.toLowerCase()] || query;
  } else if (type === "author") {
    // Search by author
    searchTerm = `inauthor:${query}`;
  } else if (type === "name") {
    // Search by book title
    searchTerm = `intitle:${query}`;
  }

  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${API_KEY}`,
    );
    res.status(200).json(response.data); // Send response to the frontend
  } catch (error) {
    console.error(
      "Error fetching data from Google Books API:",
      error.response ? error.response.data : error.message,
    );
    res
      .status(500)
      .json({ error: "Failed to fetch data from Google Books API" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:5173`);
});
